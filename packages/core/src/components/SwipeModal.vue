<template>
  <dialog
    ref="modalRef"
    :class="[
      props.class,
      !props.class && $style['default-modal-style'],
      $style['swipe-modal'],
    ]"
    :open="modelValue"
    @close="modelValue = false"
  >
    <div
      :class="$style['swipe-modal-drag-handle-wrapper']"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <slot
        v-if="isDragHandle"
        name="drag-handle"
      >
        <div :class="$style['swipe-modal-drag-handle']" />
      </slot>
    </div>
    <div :class="$style['panel']">
      <slot />
    </div>
  </dialog>
  <div
    v-if="isBackdrop && modelValue"
    ref="backdropRef"
    :class="$style['wipe-modal-backdrop-wrapper']"
    @click="handleClickBackdrop"
  >
    <slot name="backdrop">
      <div :class="$style['swipe-modal-backdrop']" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { HTMLAttributes } from "vue"

// -- props, emits --

type PropsType = {
  modelValue: boolean
  isDragHandle?: boolean
  isBackdrop?: boolean
  isPersistent?: boolean
  isScrollLock?: boolean
  class?: HTMLAttributes["class"]
}

type EmitType = {
  (e: "update:modelValue", value: boolean): void
}

const props = withDefaults(defineProps<PropsType>(), {
  isDragHandle: true,
  isBackdrop: true,
  isPersistent: false,
  isScrollLock: true,
  class: undefined,
})

const emit = defineEmits<EmitType>()

// -- variables --

/**
 * 双方向バインディング用変数
 */
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value)
  },
})

/**
 * dialog element /<dialog> の ref
 */
const modalRef = ref<HTMLDialogElement | null>(null)
/**
 * backdrop element /<div> の ref
 */
const backdropRef = ref<HTMLDivElement | null>(null)
/**
 * 画面タップ中 or 左クリックが押下中かどうか
 */
const isMouseDown = ref<boolean>(false)
/**
 * スワイプ中 or ドラッグ中の移動量
 */
const movementAmountY = ref<number>(0)
/**
 * スワイプ or ドラッグ開始時の Y 座標
 */
const startPositionY = ref<number>(0)

const bottom = ref<string>("100%")

const { height: modalRefHeight } = useElementBounding(modalRef)

// -- functions --

/**
 * バックドロップをクリックしたときの処理
 */
const handleClickBackdrop = () => {
  if (props.isPersistent) return

  modelValue.value = false
}

/**
 * ドラッグ開始時の処理
 */
const handleMouseDown = (e: MouseEvent) => {
  startPositionY.value = e.y
  isMouseDown.value = true
}

/**
 * ドラッグ終了時の処理
 */
const handleMouseUp = () => {
  isMouseDown.value = false

  if (props.isPersistent) return cancelAnim()

  if (-movementAmountY.value > modalRefHeight.value / 4)
    return (modelValue.value = false)

  if (movementAmountY.value < 0) return cancelAnim()
}

/**
 * ドラッグ中の処理
 */
const handleMouseMove = (e: MouseEvent) => {
  if (!isMouseDown.value) return

  movementAmountY.value = startPositionY.value - e.y

  if (movementAmountY.value > 0) return

  modalRef.value?.style.setProperty("user-select", "none")

  return (bottom.value = `calc(0% + ${movementAmountY.value}px)`)
}

/**
 * スワイプ開始時の処理
 */
const handleTouchStart = (e: TouchEvent) => {
  modalRef.value?.style.removeProperty("user-select")

  startPositionY.value = e.touches[0].clientY
  isMouseDown.value = true
}

/**
 * スワイプ中の処理
 */
const handleTouchMove = (e: TouchEvent) => {
  if (!isMouseDown.value) return

  movementAmountY.value = startPositionY.value - e.touches[0].clientY

  if (movementAmountY.value > 0) return

  return (bottom.value = `calc(0% + ${movementAmountY.value}px)`)
}

/**
 * スワイプ終了時の処理
 */
const handleTouchEnd = () => {
  isMouseDown.value = false

  if (props.isPersistent) return cancelAnim()

  if (-movementAmountY.value > modalRefHeight.value / 4)
    return (modelValue.value = false)

  if (movementAmountY.value < 0) return cancelAnim()
}

/**
 * 変数の初期化
 */
const initVariables = () => {
  isMouseDown.value = false
  movementAmountY.value = 0
  startPositionY.value = 0
  bottom.value = "-100%"
}

/**
 * スワイプしたが閉じる判定の閾値に達しなかったときのアニメーション
 */
const cancelAnim = () => {
  if (!modalRef.value) return

  modalRef.value.animate(
    [
      { bottom: bottom.value },
      {
        bottom: "0px",
      },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    },
  ).onfinish = () => {
    movementAmountY.value = 0
    bottom.value = "0%"
  }
}

/**
 * モーダルを開くときのアニメーション
 */
const handleOpenModal = () => {
  if (!modalRef.value) return

  modalRef.value.style.removeProperty("display")
  setPageScrollable("hidden")

  const modalAnim = modalRef.value.animate(
    [
      {
        bottom: "-100%",
      },
      { bottom: "0%" },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    },
  )

  modalAnim.onfinish = () => {
    movementAmountY.value = 0
    bottom.value = "0%"
    modalAnim.cancel()
  }

  if (backdropRef.value) {
    backdropRef.value.animate(
      [
        { opacity: 0, backdropFilter: "blur(0)" },
        { opacity: 1, backdropFilter: "blur(1px)" },
      ],
      {
        duration: 300,
        easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
      },
    )
  }
}

/**
 * モーダルを閉じるときのアニメーション
 */
const handleCloseModal = () => {
  if (!modalRef.value) return

  const duration = 300

  if (backdropRef.value) {
    backdropRef.value.animate(
      [
        { opacity: 1, backdropFilter: "blur(1px)" },
        { opacity: 0, backdropFilter: "blur(0)" },
      ],
      {
        duration,
        easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
      },
    )
  }

  const closeAnim = modalRef.value.animate(
    [
      { bottom: `${movementAmountY.value}px` },
      {
        bottom: `-${modalRefHeight.value}px`,
      },
    ],
    {
      duration,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
      fill: "forwards",
    },
  )

  closeAnim.onfinish = () => {
    initVariables()
    closeAnim.cancel()
    setPageScrollable("auto")
    modalRef.value?.style.setProperty("display", "none")
  }
}

/**
 * 背景がスクロールできるかどうかを制御する
 */
const setPageScrollable = (scrollable: "auto" | "hidden") => {
  if (!props.isScrollLock) return

  let dv = window
  let xOffset, yOffset, de
  if (document.defaultView) {
    dv = document.defaultView
    xOffset = dv.pageXOffset
    yOffset = dv.pageYOffset
  } else {
    de = document.documentElement
    xOffset = de.scrollLeft
    yOffset = de.scrollTop
  }
  document.documentElement.style.overflow = scrollable
  document.documentElement.style.overscrollBehaviorY =
    scrollable === "auto" ? "auto" : "none"
  dv.scrollTo(xOffset, yOffset)
}

// -- life cycle --

watch(
  () => modelValue.value,
  (value) => {
    if (value) handleOpenModal()

    if (!value) handleCloseModal()
  },
)
</script>

<style module lang="scss">
.swipe-modal {
  position: fixed;
  bottom: v-bind("bottom");
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  border: none;

  > .panel {
    position: relative;
    overflow: auto;
  }
}

.default-modal-style {
  box-sizing: border-box;
  width: 100%;
  height: 50dvh;
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

.wipe-modal-backdrop-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.swipe-modal-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(1px);
}
</style>
