import type { ComputedRef, Ref, WritableComputedRef } from "vue";
import { ref } from "vue";
import type { SwipeModalProps } from "../components/SwipeModal/SwipeModal.types";
import { useModalAnim } from "./useModalAnim";
import { useCssVar } from "./useCssVar";

interface UsePointerEventParameter {
	scopeName: string;
	positionStatus: Ref<"full" | "snap" | "close">;
	props: SwipeModalProps;

	refs: {
		modalRef: Ref<HTMLDialogElement | null>;
		panelRef: Ref<HTMLDivElement | null>;
	};
	vModel: WritableComputedRef<boolean>;
}

type handlePointerDownParameter =
	| { mouseEvent: MouseEvent; touchEvent?: never; eventType: "mouse" }
	| { mouseEvent?: never; touchEvent: TouchEvent; eventType: "touch" };

export const usePointerEvent = ({
	scopeName,
	positionStatus,
	props,
	refs: { modalRef },
	vModel,
}: UsePointerEventParameter) => {
	const {
		getCssVar,
		setCssVar,
	} = useCssVar({ scopeName });

	const {
		cancelAnim,
		moveToSnapPointAnim,
		moveToFullScreenAnim,
	} = useModalAnim({
		scopeName,
		positionStatus,
		props,
		refs: {
			modalRef,
		},
	});

	/**
	 * ドラッグハンドルをクリック中かどうか
	 */
	const isMouseDown = ref<boolean>(false);

	/**
	 * ドラッグ開始時のポインターの位置
	 */
	const startPositionY = ref<number>(0);

	/**
	 * ドラッグ開始時の処理
	 */
	const handlePointerDown = ({
		mouseEvent,
		touchEvent,
		eventType,
	}: handlePointerDownParameter) => {
		if (eventType === "mouse")
			startPositionY.value = mouseEvent.y;
		else startPositionY.value = touchEvent.touches[0].clientY;

		isMouseDown.value = true;
	};

	/**
	 * ドラッグ中の処理
	 */
	const handlePointerMove = ({
		mouseEvent,
		touchEvent,
		eventType,
	}:
		| { mouseEvent: MouseEvent; touchEvent?: never; eventType: "mouse" }
		| { mouseEvent?: never; touchEvent: TouchEvent; eventType: "touch" }) => {
		if (!isMouseDown.value)
			return;

		// ドラッグ開始位置からの移動量を計算
		if (eventType === "mouse") {
			setCssVar({
				name: "movementAmountY",
				value: (startPositionY.value - mouseEvent.y).toString(),
			});
		}
		else {
			setCssVar({
				name: "movementAmountY",
				value: (startPositionY.value - touchEvent.touches[0].clientY).toString(),
			});
		}

		// モーダルが最大限まで開いている場合は、上方向へのドラッグは無効
		if (
			(Number(getCssVar("movementAmountY")) > 0 && positionStatus.value === "full")
			|| (modalRef.value?.getBoundingClientRect().top || 0) < 0
		)
			return;

		// フルスクリーンで表示させない場合は、上方向へのドラッグは無効
		if (!props.isFullScreen && Number(getCssVar("movementAmountY")) > 0)
			return;

		modalRef.value?.style.setProperty("user-select", "none");

		// モーダルの位置をポインターの位置に合わせて更新（snapの場合）
		if (positionStatus.value === "snap") {
			setCssVar({
				name: "bottom",
				value: `calc(${getCssVar("snapPointPosition")} + ${getCssVar("movementAmountY")}px)`,
			});

			return;
		}

		// モーダルの位置をポインターの位置に合わせて更新
		setCssVar({
			name: "bottom",
			value: `calc(0% + ${getCssVar("movementAmountY")}px)`,
		});
	};

	/**
	 * ドラッグ終了時の処理
	 */
	const handlePointerUp = () => {
		isMouseDown.value = false;

		modalRef.value?.style.removeProperty("user-select");

		// 移動量が abs(36px) より大きいの場合、アクションを起こす
		if (Math.abs(Number(getCssVar("movementAmountY"))) > 36) {
		// 下方向にドラッグした場合
			if (Number(getCssVar("movementAmountY")) < 0) {
				switch (positionStatus.value) {
					case "full":
					// snapPoint が指定されている場合は snapPoint までアニメーション
						if (props.snapPoint)
							return moveToSnapPointAnim();

						if (props.isPersistent)
							return cancelAnim();

						return (vModel.value = false);
					case "snap":
						if (props.isPersistent)
							return cancelAnim();

						return (vModel.value = false);
					default:
						return;
				}
			}

			// 上方向にドラッグした場合
			switch (positionStatus.value) {
				case "snap":
					if (!props.isFullScreen)
						return cancelAnim();

					// snapPoint からドラッグされていた場合、フルスクリーン表示までアニメーション
					return moveToFullScreenAnim();
				default:
					return;
			}
		}

		// 移動量が 36px 以下の場合、元の表示位置まで戻る
		return cancelAnim();
	};

	return {
		isMouseDown,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
	};
};
