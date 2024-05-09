<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { usePointerEvent } from "../../hooks/usePointerEvent";
import { useModalAnim } from "../../hooks/useModalAnim";
import { useCssVar } from "../../hooks/useCssVar";
import type { SwipeModalEmits, SwipeModalProps } from "./SwipeModal.types";

const props = withDefaults(defineProps<SwipeModalProps>(), {
	isBackdrop: true,
	isDragHandle: true,
	isFullScreen: true,
	isPersistent: false,
	isScrollLock: true,
	modelValue: false,
	snapPoint: undefined,
});

const emit = defineEmits<SwipeModalEmits>();

// variables

const scopeName = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

const {
	getCssVar,
	setCssVar,
	removeCssVar,
} = useCssVar({
	scopeName,
});

/**
 * dialog element の ref
 */
const modalRef = ref<HTMLDialogElement | null>(null);

/**
 * モーダルのコンテンツ部分の ref
 */
const panelRef = ref<HTMLDivElement | null>(null);

/**
 * 双方向バインディング用変数
 */
const vModel = useVModel(props, "modelValue", emit);

/**
 * モーダルの配置位置の状態
 * - `full`: モーダルが全画面表示されている状態
 * - `snap`: モーダルがスナップポイントまで表示されている状態
 * - `close`: モーダルが閉じられている状態
 */
const positionStatus = ref<"full" | "snap" | "close">("close");

/**
 * snapPoint が指定されている場合のモーダルの配置位置
 */
const snapPointPosition = computed(() => {
	if (!props.snapPoint)
		return `0px`;

	if (props.snapPoint === "auto") {
		const panelRefHeight = panelRef.value?.getBoundingClientRect().height || 0;
		return `calc(${panelRefHeight}px + 36px - 100%)`;
	}

	return `calc(${props.snapPoint} - 100%)`;
});

const {
	cancelAnim,
	moveToSnapPointAnim,
	moveToFullScreenAnim,
} = useModalAnim({
	scopeName,
	positionStatus,
	props,
	snapPointPosition,
	refs: {
		modalRef,
	},
});

const {
	isMouseDown,
	handlePointerDown,
	handlePointerMove,
	handlePointerUp,
} = usePointerEvent({
	vModel,
	scopeName,
	positionStatus,
	props,
	snapPointPosition,
	refs: {
		modalRef,
		panelRef,
	},
	useModalAnim: {
		moveToSnapPointAnim,
		moveToFullScreenAnim,
		cancelAnim,
	},
});

// functions

/**
 * 背景がスクロールできるかどうかを制御する
 */
const setPageScrollable = (scrollable: "auto" | "hidden" | "reset") => {
	if (scrollable === "reset") {
		document.documentElement.style.removeProperty("overflow");
		document.documentElement.style.removeProperty("overscroll-behavior-y");
		return;
	}

	let dv = window;
	let xOffset, yOffset, de;
	if (document.defaultView) {
		dv = document.defaultView;
		xOffset = dv.scrollX;
		yOffset = dv.scrollY;
	}
	else {
		de = document.documentElement;
		xOffset = de.scrollLeft;
		yOffset = de.scrollTop;
	}
	document.documentElement.style.overflow = scrollable;
	document.documentElement.style.overscrollBehaviorY
    = scrollable === "auto" ? "auto" : "none";
	dv.scrollTo(xOffset, yOffset);
};

const handleClickDialog = (event: MouseEvent) => {
	if (!props.isBackdrop)
		return;

	if (event.target !== event.currentTarget)
		return;

	if (props.isPersistent)
		return cancelAnim();

	vModel.value = false;
};

const handleClickContent = (event: MouseEvent) => {
	event.stopPropagation();
};

/**
 * モーダルを開く
 */
const handleOpenModal = () => {
	if (!modalRef.value)
		return;

	if (props.isBackdrop) {
		// dialog tag をモーダルとして開く
		modalRef.value.showModal();
	}
	else {
		// dialog tag をトーストとして開く
		modalRef.value.show();
	}

	modalRef.value?.style.setProperty("visibility", "visible");

	modalRef.value.animate([
		{ opacity: 0 },
		{ opacity: 1 },
	], {
		duration: 200,
		pseudoElement: "::backdrop",
		easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
	});

	modalRef.value.animate(
		[
			{
				bottom: "-100%",
			},
			{
				bottom: snapPointPosition.value,
			},
		],
		{
			duration: 300,
			easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
		},
	).onfinish = () => {
		positionStatus.value = props.snapPoint ? "snap" : "full";
		setCssVar({
			name: "bottom",
			value: snapPointPosition.value,
		});
		if (props.isScrollLock)
			setPageScrollable("hidden");
	};
};

/**
 * モーダルを閉じる
 */
const handleCloseModal = () => {
	if (!modalRef.value)
		return;

	modalRef.value.animate([
		{ opacity: 1 },
		{ opacity: 0 },
	], {
		duration: 300,
		pseudoElement: "::backdrop",
		easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
	});

	modalRef.value.animate(
		[
			{
				bottom: getCssVar("bottom"),
			},
			{
				bottom: "-100%",
			},
		],
		{
			duration: 300,
			easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
		},
	).onfinish = () => {
		setCssVar({
			name: "bottom",
			value: "-100%",
		});
		positionStatus.value = "close";
		isMouseDown.value = false;
		modalRef.value?.close();
		modalRef.value?.style.setProperty("display", "initial");
		modalRef.value?.style.setProperty("visibility", "hidden");

		setPageScrollable("reset");
	};
};

// watch
// モーダルの表示状態を監視し、表示状態が変化したらモーダルを開くか閉じる
watch(
	() => vModel.value,
	(value) => {
		if (value)
			handleOpenModal();
		else handleCloseModal();
	},
);

// props の isScrollLock を監視し、スクロールロックの状態を変更する
watch(
	() => props.isScrollLock,
	(value) => {
		if (value)
			setPageScrollable("hidden");
		else setPageScrollable("auto");
	},
);

// life cycle\
setCssVar({
	name: "bottom",
	value: "-100%",
});

setCssVar({
	name: "movementAmountY",
	value: "0",
});

onMounted(() => {
	if (!modalRef.value)
		return;

	modalRef.value.style.setProperty("bottom", `var(--${scopeName}-bottom)`);

	if (!vModel.value) {
		// モーダル内のエレメントを取得できるように display を none を無効化
		modalRef.value.style.setProperty("display", "initial");
		modalRef.value.style.setProperty("visibility", "hidden");
	}
});

onUnmounted(() => {
	removeCssVar("bottom");
	removeCssVar("movementAmountY");
});
</script>

<template>
	<dialog
		ref="modalRef"
		class="swipe-modal modal-style"
		@click="handleClickDialog"
	>
		<div tabindex="-1" class="swipe-modal-content" @click="handleClickContent">
			<div
				class="swipe-modal-drag-handle-wrapper"
				@mousedown="
					(e) =>
						handlePointerDown({
							mouseEvent: e,
							eventType: 'mouse',
						})
				"
				@mousemove="
					(e) =>
						handlePointerMove({
							mouseEvent: e,
							eventType: 'mouse',
						})
				"
				@mouseup="handlePointerUp"
				@touchstart="
					(e) =>
						handlePointerDown({
							touchEvent: e,
							eventType: 'touch',
						})
				"
				@touchmove="
					(e) =>
						handlePointerMove({
							touchEvent: e,
							eventType: 'touch',
						})
				"
				@touchend="handlePointerUp"
			>
				<slot v-if="isDragHandle" name="drag-handle">
					<div class="swipe-modal-drag-handle" />
				</slot>
			</div>
			<div ref="panelRef" class="panel">
				<slot />
			</div>
		</div>
	</dialog>
</template>

<style lang="scss" scoped>
.swipe-modal {
	position: fixed;
	top: auto;
	box-sizing: border-box;
	width: 100vw;
	max-width: 100vw;
	height: 100dvh;
	max-height: 100dvh;
	padding: 0;
	margin: 0;
	overflow: hidden;
	border: none;

	&::backdrop {
		background-color: rgb(0 0 0 / 50%);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
	}
}

.swipe-modal-content {
	width: 100%;
	height: 100%;

	> .panel {
		max-height: calc(100dvh - 36px);
		overflow-y: scroll;
	}
}

.modal-style {
	box-sizing: border-box;
	width: 100%;
	color: white;
	background-color: #1d1b20;
	border-radius: 1rem 1rem 0 0;

	@media (prefers-color-scheme: light) {
		color: black;
		background-color: #f7f2fa;
		box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
	}
}

.swipe-modal-drag-handle-wrapper {
	position: relative;
	top: 0;
	flex-shrink: 0;
	height: 36px;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
}

.swipe-modal-drag-handle {
	position: absolute;
	left: 50%;
	width: 32px;
	height: 4px;
	margin: 16px 0;
	content: "";
	background-color: #ccc;
	border-radius: 2px;
	transform: translateX(-50%);
}
</style>
