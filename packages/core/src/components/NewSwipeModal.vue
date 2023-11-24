<template>
  <dialog
    ref="modalRef"
    :class="[
      props.class ? props.class : $style['default-modal-style'],
      $style['swipe-modal'],
    ]"
    @click="vModel = false"
  >
    <div
      tabindex="-1"
      @click="(event) => event.stopPropagation()"
    >
      <div
        :class="$style['swipe-modal-drag-handle-wrapper']"
        @mousedown="
          (e) =>
            handlePointerDown({
              MouseEvent: e,
              eventType: 'mouse',
            })
        "
        @mousemove="
          (e) =>
            handlePointerMove({
              MouseEvent: e,
              eventType: 'mouse',
            })
        "
        @mouseup="handlePointerUp"
        @touchstart="
          (e) =>
            handlePointerDown({
              TouchEvent: e,
              eventType: 'touch',
            })
        "
        @touchmove="
          (e) =>
            handlePointerMove({
              TouchEvent: e,
              eventType: 'touch',
            })
        "
        @touchend="handlePointerUp"
      >
        <slot name="drag-handle">
          <div :class="$style['swipe-modal-drag-handle']" />
        </slot>
      </div>
      <div :class="$style['panel']">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { HTMLAttributes } from "vue"

// types
type PropsType = {
  modelValue: boolean
  snapPoint?: string
  class?: HTMLAttributes["class"]
}

type EmitsType = {
  (e: "update:modelValue", value: boolean): void
}

const props = withDefaults(defineProps<PropsType>(), {
  modelValue: false,
  snapPoint: undefined,
  class: undefined,
})

const emit = defineEmits<EmitsType>()

// variables

/**
 * dialog element の ref
 */
const modalRef = ref<HTMLDialogElement | null>(null)

/**
 * 双方向バインディング用変数
 */
const vModel = useVModel(props, "modelValue", emit)

/**
 * モーダルの配置位置
 */
const bottom = ref<string>("-100%")

const isMouseDown = ref<boolean>(false)

const startPositionY = ref<number>(0)

const movementAmountY = ref<number>(0)

const positionStatus = ref<"full" | "snap" | "close">("close")

// functions

/**
 * ドラッグ開始時の処理
 */
const handlePointerDown = ({
  MouseEvent,
  TouchEvent,
  eventType,
}:
  | { MouseEvent: MouseEvent; TouchEvent?: never; eventType: "mouse" }
  | { MouseEvent?: never; TouchEvent: TouchEvent; eventType: "touch" }) => {
  if (eventType === "mouse") {
    startPositionY.value = MouseEvent.y
  } else {
    startPositionY.value = TouchEvent.touches[0].clientY
  }

  isMouseDown.value = true
}

/**
 * ドラッグ中の処理
 */
const handlePointerMove = ({
  MouseEvent,
  TouchEvent,
  eventType,
}:
  | { MouseEvent: MouseEvent; TouchEvent?: never; eventType: "mouse" }
  | { MouseEvent?: never; TouchEvent: TouchEvent; eventType: "touch" }) => {
  if (!isMouseDown.value) return

  //ドラッグ開始位置からの移動量を計算
  if (eventType === "mouse") {
    movementAmountY.value = startPositionY.value - MouseEvent.y
  } else {
    movementAmountY.value = startPositionY.value - TouchEvent.touches[0].clientY
  }

  // モーダルが最大限まで開いている場合は、上方向へのドラッグは無効
  if (
    (movementAmountY.value > 0 && positionStatus.value === "full") ||
    (modalRef.value?.getBoundingClientRect().top || 0) < 0
  )
    return

  modalRef.value?.style.setProperty("user-select", "none")

  // モーダルの位置をポインターの位置に合わせて更新（snapの場合）
  if (positionStatus.value === "snap") {
    return (bottom.value = `calc(calc(${props.snapPoint} - 100%) + ${movementAmountY.value}px)`)
  }

  // モーダルの位置をポインターの位置に合わせて更新
  return (bottom.value = `calc(0% + ${movementAmountY.value}px)`)
}

/**
 * ドラッグ終了時の処理
 */
const handlePointerUp = () => {
  isMouseDown.value = false

  // if (props.isPersistent) return cancelAnim()

  modalRef.value?.style.removeProperty("user-select")

  // 移動量が 36px より大きいの場合、アクションを起こす
  if (Math.abs(movementAmountY.value) > 36) {
    // 下方向にドラッグした場合
    if (movementAmountY.value < 0) {
      switch (positionStatus.value) {
        case "full":
          // snapPoint が指定されている場合は snapPoint までアニメーション
          if (props.snapPoint) {
            return moveToSnapPointAnim()
          }

          return (vModel.value = false)
        case "snap":
          return (vModel.value = false)
        default:
          return
      }
    }

    // 上方向にドラッグした場合
    switch (positionStatus.value) {
      case "snap":
        // snapPoint からドラッグされていた場合、フルスクリーン表示までアニメーション
        return moveToFullScreenAnim()
      default:
        return
    }
  }

  // 移動量が 36px 以下の場合、元の表示位置まで戻る
  return cancelAnim()
}

// アクションを起こさず、移動が開始させる前の位置までアニメーション
const cancelAnim = () => {
  if (!modalRef.value) return

  const calcToPositionBottom = () => {
    if (positionStatus.value === "snap") {
      return props.snapPoint ? `calc(${props.snapPoint} - 100%)` : "0%"
    }
    if (positionStatus.value === "full") {
      return "0%"
    }

    return "-100%"
  }

  modalRef.value.animate(
    [
      { bottom: bottom.value },
      {
        bottom: calcToPositionBottom(),
      },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    },
  ).onfinish = () => {
    movementAmountY.value = 0
    bottom.value = calcToPositionBottom()
  }
}

// 現在のモーダルの配置位置から snapPoint までアニメーション
const moveToSnapPointAnim = () => {
  if (!modalRef.value) return

  if (!props.snapPoint) return

  modalRef.value.animate(
    [
      { bottom: bottom.value },
      {
        bottom: `calc(${props.snapPoint} - 100%)`,
      },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    },
  ).onfinish = () => {
    movementAmountY.value = 0
    bottom.value = `calc(${props.snapPoint} - 100%)`
    positionStatus.value = "snap"
  }
}

// 現在のモーダルの配置位置からフルスクリーン表示までアニメーション
const moveToFullScreenAnim = () => {
  if (!modalRef.value) return

  modalRef.value.animate(
    [
      { bottom: bottom.value },
      {
        bottom: "0%",
      },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    },
  ).onfinish = () => {
    movementAmountY.value = 0
    bottom.value = "0%"
    positionStatus.value = "full"
  }
}

/**
 * モーダルを開く
 */
const handleOpenModal = () => {
  if (!modalRef.value) return

  // dialog tag をモーダルとして開く
  modalRef.value.showModal()
  modalRef.value?.style.setProperty("visibility", "visible")

  modalRef.value.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 200,
    pseudoElement: "::backdrop",
    easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
  })

  modalRef.value.animate(
    [
      {
        bottom: "-100%",
      },
      {
        bottom: props.snapPoint ? `calc(${props.snapPoint} - 100%)` : "0%",
      },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    },
  ).onfinish = () => {
    positionStatus.value = props.snapPoint ? "snap" : "full"
    bottom.value = `calc(${props.snapPoint} - 100%)`
    setPageScrollable("hidden")
  }
}

const handleCloseModal = () => {
  if (!modalRef.value) return

  modalRef.value.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 300,
    pseudoElement: "::backdrop",
    easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
  })

  modalRef.value.animate(
    [
      {
        bottom: bottom.value,
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
    bottom.value = "-100%"
    positionStatus.value = "close"
    isMouseDown.value = false
    modalRef.value?.close()
    modalRef.value?.style.setProperty("display", "initial")
    modalRef.value?.style.setProperty("visibility", "hidden")
    setPageScrollable("auto")
  }
}

/**
 * 背景がスクロールできるかどうかを制御する
 */
const setPageScrollable = (scrollable: "auto" | "hidden") => {
  // if (!props.isScrollLock) return

  let dv = window
  let xOffset, yOffset, de
  if (document.defaultView) {
    dv = document.defaultView
    xOffset = dv.scrollX
    yOffset = dv.scrollY
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

// watch
watch(
  () => vModel.value,
  (value) => {
    if (value) {
      handleOpenModal()
    } else {
      handleCloseModal()
    }
  },
)

// life cycle
onMounted(() => {
  if (!modalRef.value) return

  if (!vModel.value) {
    modalRef.value?.style.setProperty("display", "initial")
    modalRef.value?.style.setProperty("visibility", "hidden")
  }
})
</script>

<style lang="scss" module>
.swipe-modal {
  position: fixed;
  top: auto;
  bottom: v-bind("bottom");
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

  > .panel {
    max-height: calc(100% - 36px);
    overflow: scroll;
  }
}

.default-modal-style {
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
