<template>
  <dialog
    ref="modalRef"
    class="swipe-modal modal-style"
    @click="handleClickDialog"
  >
    <div
      tabindex="-1"
      class="swipe-modal-content"
      @click="handleClickContent"
    >
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
        <slot
          v-if="isDragHandle"
          name="drag-handle"
        >
          <div class="swipe-modal-drag-handle" />
        </slot>
      </div>
      <div
        ref="panelRef"
        class="panel"
      >
        <slot />
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { HTMLAttributes } from "vue"

// types
type PropsType = {
  /**
   * Unique class of panel section.
   *
   * @default undefined
   */
  class?: HTMLAttributes["class"]
  /**
   * Whether to display the backdrop.
   *
   * @default true
   */
  isBackdrop?: boolean
  /**
   * Whether to display the drag handle.
   *
   * @default true
   */
  isDragHandle?: boolean
  /**
   * Whether to disable swipe and back drop click events.
   *
   * @default false
   */
  isPersistent?: boolean
  /**
   * Whether to disable scroll of the background.
   *
   *  @default true
   */
  isScrollLock?: boolean
  /**
   * Whether to display the modal.  = `v-model`
   *
   * @default false
   */
  modelValue?: boolean
  /**
   * Modal upper edge position.
   *
   * - `auto`: Automatically calculates the display position based on the height of the content in the modal.
   * - `String` : [\<length>](https://developer.mozilla.org/ja/docs/Web/CSS/length) data type
   *
   * @default undefined
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  snapPoint?: "auto" | String
}

type EmitsType = {
  (e: "update:modelValue", value: boolean): void
}

const props = withDefaults(defineProps<PropsType>(), {
  class: undefined,
  isBackdrop: true,
  isDragHandle: true,
  isPersistent: false,
  isScrollLock: true,
  modelValue: false,
  snapPoint: undefined,
})

const emit = defineEmits<EmitsType>()

// variables

/**
 * dialog element の ref
 */
const modalRef = ref<HTMLDialogElement | null>(null)

/**
 * モーダルのコンテンツ部分の ref
 */
const panelRef = ref<HTMLDivElement | null>(null)

/**
 * 双方向バインディング用変数
 */
const vModel = useVModel(props, "modelValue", emit)

/**
 * モーダルの配置位置
 */
const bottom = ref<string>("-100%")

/**
 * ドラッグハンドルをクリック中かどうか
 */
const isMouseDown = ref<boolean>(false)

/**
 * ドラッグ開始時のポインターの位置
 */
const startPositionY = ref<number>(0)

/**
 * ドラッグ開始位置からの移動量
 */
const movementAmountY = ref<number>(0)

/**
 * モーダルの配置位置の状態
 * - `full`: モーダルが全画面表示されている状態
 * - `snap`: モーダルがスナップポイントまで表示されている状態
 * - `close`: モーダルが閉じられている状態
 */
const positionStatus = ref<"full" | "snap" | "close">("close")

/**
 * snapPoint が指定されている場合のモーダルの配置位置
 */
const snapPointPosition = computed(() => {
  if (!props.snapPoint) return `0px`

  if (props.snapPoint === "auto") {
    const panelRefHeight = panelRef.value?.getBoundingClientRect().height || 0
    return `calc(${panelRefHeight}px + 36px - 100%)`
  }

  return `calc(${props.snapPoint} - 100%)`
})

// functions

/**
 * ドラッグ開始時の処理
 */
const handlePointerDown = ({
  mouseEvent,
  touchEvent,
  eventType,
}:
  | { mouseEvent: MouseEvent; touchEvent?: never; eventType: "mouse" }
  | { mouseEvent?: never; touchEvent: TouchEvent; eventType: "touch" }) => {
  if (eventType === "mouse") {
    startPositionY.value = mouseEvent.y
  } else {
    startPositionY.value = touchEvent.touches[0].clientY
  }

  isMouseDown.value = true
}

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
  if (!isMouseDown.value) return

  //ドラッグ開始位置からの移動量を計算
  if (eventType === "mouse") {
    movementAmountY.value = startPositionY.value - mouseEvent.y
  } else {
    movementAmountY.value = startPositionY.value - touchEvent.touches[0].clientY
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
    return (bottom.value = `calc(${snapPointPosition.value} + ${movementAmountY.value}px)`)
  }

  // モーダルの位置をポインターの位置に合わせて更新
  return (bottom.value = `calc(0% + ${movementAmountY.value}px)`)
}

/**
 * ドラッグ終了時の処理
 */
const handlePointerUp = () => {
  isMouseDown.value = false

  modalRef.value?.style.removeProperty("user-select")

  // 移動量が abs(36px) より大きいの場合、アクションを起こす
  if (Math.abs(movementAmountY.value) > 36) {
    // 下方向にドラッグした場合
    if (movementAmountY.value < 0) {
      switch (positionStatus.value) {
        case "full":
          // snapPoint が指定されている場合は snapPoint までアニメーション
          if (props.snapPoint) return moveToSnapPointAnim()

          if (props.isPersistent) return cancelAnim()

          return (vModel.value = false)
        case "snap":
          if (props.isPersistent) return cancelAnim()

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

/**
 * アクションを起こさず、移動が開始させる前の位置までアニメーション
 */
const cancelAnim = () => {
  if (!modalRef.value) return

  const calcToPositionBottom = () => {
    if (positionStatus.value === "snap") {
      return props.snapPoint ? snapPointPosition.value : "0%"
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

/**
 * 現在のモーダルの配置位置から snapPoint までアニメーション
 */
const moveToSnapPointAnim = () => {
  if (!modalRef.value) return

  if (!props.snapPoint) return

  modalRef.value.animate(
    [
      { bottom: bottom.value },
      {
        bottom: snapPointPosition.value,
      },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    },
  ).onfinish = () => {
    movementAmountY.value = 0
    bottom.value = snapPointPosition.value
    positionStatus.value = "snap"
  }
}

/**
 * 現在のモーダルの配置位置からフルスクリーン表示までアニメーション
 */
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

const handleClickDialog = (event: MouseEvent) => {
  if (!props.isBackdrop) return

  if (event.target !== event.currentTarget) return

  if (props.isPersistent) return cancelAnim()

  vModel.value = false
}

const handleClickContent = (event: MouseEvent) => {
  event.stopPropagation()
}

/**
 * モーダルを開く
 */
const handleOpenModal = () => {
  if (!modalRef.value) return

  if (props.isBackdrop) {
    // dialog tag をモーダルとして開く
    modalRef.value.showModal()
  } else {
    // dialog tag をトーストとして開く
    modalRef.value.show()
  }

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
        bottom: snapPointPosition.value,
      },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    },
  ).onfinish = () => {
    positionStatus.value = props.snapPoint ? "snap" : "full"
    bottom.value = snapPointPosition.value
    if (props.isScrollLock) setPageScrollable("hidden")
  }
}

/**
 * モーダルを閉じる
 */
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

    setPageScrollable("reset")
  }
}

/**
 * 背景がスクロールできるかどうかを制御する
 */
const setPageScrollable = (scrollable: "auto" | "hidden" | "reset") => {
  if (scrollable === "reset") {
    document.documentElement.style.removeProperty("overflow")
    document.documentElement.style.removeProperty("overscroll-behavior-y")
    return
  }

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
// モーダルの表示状態を監視し、表示状態が変化したらモーダルを開くか閉じる
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

// props の isScrollLock を監視し、スクロールロックの状態を変更する
watch(
  () => props.isScrollLock,
  (value) => {
    if (value) {
      setPageScrollable("hidden")
    } else {
      setPageScrollable("auto")
    }
  },
)

// life cycle
onMounted(() => {
  if (!modalRef.value) return

  if (!vModel.value) {
    // モーダル内のエレメントを取得できるように display を none を無効化
    modalRef.value.style.setProperty("display", "initial")
    modalRef.value.style.setProperty("visibility", "hidden")
  }
})
</script>

<style lang="scss" scoped>
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
