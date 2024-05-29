import type { Ref } from "vue";
import type { SwipeModalProps } from "../components/SwipeModal/SwipeModal.types";
import { ANIMATION_EASING } from "../constants";
import { removeWillChange, setWillChange } from "../utils/willChange";
import { useCssVar } from "./useCssVar";

interface UseModalAnimProps {
	scopeName: string;
	props: SwipeModalProps;
	positionStatus: Ref<"full" | "snap" | "close">;
	refs: {
		modalRef: Ref<HTMLDialogElement | null>;
	};
}

export const useModalAnim = ({
	scopeName,
	positionStatus,
	props,
	refs: {
		modalRef,
	},
}: UseModalAnimProps) => {
	const {
		getCssVar,
		setCssVar,
	} = useCssVar({ scopeName });

	/**
	 * アクションを起こさず、移動が開始させる前の位置までアニメーション
	 */
	const cancelAnim = () => {
		if (!modalRef.value)
			return;

		const calcToPositionBottom = () => {
			if (positionStatus.value === "snap")
				return props.snapPoint ? getCssVar("snapPointPosition") : "0%";

			if (positionStatus.value === "full")
				return "0%";

			return "-100%";
		};

		setWillChange(modalRef.value, "bottom");
		modalRef.value.animate(
			[
				{ bottom: getCssVar("bottom") },
				{
					bottom: calcToPositionBottom(),
				},
			],
			{
				duration: 300,
				easing: ANIMATION_EASING,
			},
		).onfinish = () => {
			setCssVar({
				name: "movementAmountY",
				value: "0",
			});
			setCssVar({
				name: "bottom",
				value: calcToPositionBottom(),
			});

			if (!modalRef.value)
				return;

			removeWillChange(modalRef.value);
		};
	};

	/**
	 * 現在のモーダルの配置位置から snapPoint までアニメーション
	 */
	const moveToSnapPointAnim = () => {
		if (!modalRef.value)
			return;

		if (!props.snapPoint)
			return;

		setWillChange(modalRef.value, "bottom");
		modalRef.value.animate(
			[
				{ bottom: getCssVar("bottom") },
				{
					bottom: getCssVar("snapPointPosition"),
				},
			],
			{
				duration: 300,
				easing: ANIMATION_EASING,
			},
		).onfinish = () => {
			setCssVar({
				name: "movementAmountY",
				value: "0",
			});
			setCssVar({
				name: "bottom",
				value: getCssVar("snapPointPosition"),
			});
			positionStatus.value = "snap";

			if (!modalRef.value)
				return;

			removeWillChange(modalRef.value);
		};
	};

	/**
	 * 現在のモーダルの配置位置からフルスクリーン表示までアニメーション
	 */
	const moveToFullScreenAnim = () => {
		if (!modalRef.value)
			return;

		setWillChange(modalRef.value, "bottom");
		modalRef.value.animate(
			[
				{ bottom: getCssVar("bottom") },
				{
					bottom: "0%",
				},
			],
			{
				duration: 300,
				easing: ANIMATION_EASING,
			},
		).onfinish = () => {
			setCssVar({
				name: "movementAmountY",
				value: "0",
			});
			setCssVar({
				name: "bottom",
				value: "0%",
			});
			positionStatus.value = "full";

			if (!modalRef.value)
				return;

			removeWillChange(modalRef.value);
		};
	};

	return {
		cancelAnim,
		moveToSnapPointAnim,
		moveToFullScreenAnim,
	};
};
