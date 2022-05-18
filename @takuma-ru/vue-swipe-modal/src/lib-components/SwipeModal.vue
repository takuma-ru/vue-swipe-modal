<template>
  <div
    id="swipe-modal"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
  >
    <transition name="swipe-modal-background" appear>
      <div
        v-if="modelValue"
        class="modal-background"
        :style="{
          backgroundColor: backgroundColor,
        }"
        @mouseup="persistent ? null : close()"
      />
    </transition>
    <transition name="swipe-modal-contents" appear>
      <div
        v-if="modelValue"
        ref="modal-contents"
        class="modal-contents"
        :style="`
          width: ${contentsWidth};
          --contents-height: ${fullscreen
            ? '100%'
            : modalHeight > 0
            ? modalHeight + 'px'
        : contentsHeight};
          border-top-left-radius: ${borderTopRadius
            ? borderTopRadius
        : borderTopLeftRadius};
          border-top-right-radius: ${borderTopRadius
            ? borderTopRadius
        : borderTopRightRadius};
          background-color: ${dark ? darkContentsColor : contentsColor};
          color: ${dark ? 'white' : 'back'};
          --contents-bottom-position: ${contentsBottomPosition};
        `"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div
          v-if="!noTip"
          class="modal-contents-chip"
          :style="`
            --tip-color: ${tipColor};
          `"
          @mousedown="mouseDown"
        />
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue-demi'
export default defineComponent({
  name: 'SwipeModal',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    // modal
    modelValue: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    // modal_background
    persistent: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '#80808080',
    },
    // modal_contents
    fullscreen: {
      type: Boolean,
      default: false,
    },
    noTip: {
      type: Boolean,
      default: false,
    },
    contentsWidth: {
      type: String,
      default: '100%',
    },
    contentsHeight: {
      type: String,
      default: '30vh',
    },
    borderTopRadius: {
      type: String,
      default: null,
    },
    borderTopLeftRadius: {
      type: String,
      default: '0px',
    },
    borderTopRightRadius: {
      type: String,
      default: '0px',
    },
    contentsColor: {
      type: String,
      default: 'white',
    },
    tipColor: {
      type: String,
      default: '#c8c8c8',
    },
    darkContentsColor: {
      type: String,
      default: 'black',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    // const
    const isMouseDown = ref<boolean>(false)
    const isTouch = ref<boolean>(false)
    const modalQuery = ref<any>(null)
    const modalHeight = ref<number>(0)
    const contentsBottomPosition = ref<string>('0px')
    const moveStartPosition = ref<number>(0)
    const nowMovePosition = ref<number>(0)

    // computed
    const modal = computed({
      get: () => props.modelValue,
      set: (value: any) => context.emit('update:modelValue', value),
    })

    // watch
    watch(modal, (newModal: any) => {
      if (newModal) {
        open()
      }
    })

    // methed
    const init = () => {
      isMouseDown.value = false
      isTouch.value = false
      modalQuery.value = null
      modalHeight.value = 0
      contentsBottomPosition.value = '0px'
      moveStartPosition.value = 0
      nowMovePosition.value = 0
    }
    const open = () => {
      init()
      document.documentElement.style.overflowY = 'hidden'
    }
    const close = () => {
      isMouseDown.value = false
      isTouch.value = false
      document.documentElement.style.overflowY = 'auto'
      context.emit('update:modelValue', false)
    }
    const mouseDown = (payload: MouseEvent) => {
      modalQuery.value = document.querySelector('.modal-contents')
      modalHeight.value = modalQuery.value.getBoundingClientRect().height
      moveStartPosition.value = payload.pageY
      isMouseDown.value = true
    }
    const mouseMove = (payload: MouseEvent) => {
      if (isMouseDown.value) {
        nowMovePosition.value = payload.pageY
        contentsBottomPosition.value = (
          moveStartPosition.value - nowMovePosition.value <= 0
            ? moveStartPosition.value - nowMovePosition.value
            : 0
        ) + 'px'
      }
    }
    const mouseUp = () => {
      isMouseDown.value = false
      if (-1 * (moveStartPosition.value - nowMovePosition.value) > modalHeight.value * (1 / 8)) {
        close()
      } else {
        contentsBottomPosition.value = 0 + 'px'
      }
    }
    const touchStart = (payload: TouchEvent) => {
      modalQuery.value = document.querySelector('.modal-contents')
      modalHeight.value = modalQuery.value.getBoundingClientRect().height
      if (modalQuery.value.scrollTop <= 0) {
        moveStartPosition.value = payload.touches[0].pageY
        isTouch.value = true
      }
    }
    const touchMove = (payload: TouchEvent) => {
      if (isTouch.value) {
        nowMovePosition.value = payload.touches[0].pageY
        if (moveStartPosition.value - nowMovePosition.value <= 0) {
          contentsBottomPosition.value = moveStartPosition.value - nowMovePosition.value + 'px'
        } else {
          contentsBottomPosition.value = 0 + 'px'
        }
        contentsBottomPosition.value = (moveStartPosition.value - nowMovePosition.value <= 0 ? moveStartPosition.value - nowMovePosition.value : 0) + 'px'
      }
    }
    const touchEnd = () => {
      isTouch.value = false
      if (
        -1 * (moveStartPosition.value - nowMovePosition.value) >
        modalHeight.value * (1 / 8)
      ) {
        close()
      } else {
        contentsBottomPosition.value = 0 + 'px'
      }
    }

    return {
      modalHeight,
      contentsBottomPosition,
      close,
      mouseDown,
      mouseMove,
      mouseUp,
      touchStart,
      touchMove,
      touchEnd,
    }
  },
})
</script>

<style lang="scss" scoped>
#swipe-modal {
  position: fixed;
  scrollbar-width: none;
  z-index: 15;
}
.modal-background {
  position: fixed;
  z-index: 11;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-contents {
  --contents-height: 30vh;
  --contents-bottom-position: 0%;
  position: fixed;
  z-index: 12;
  min-height: var(--contents-height);
  max-height: 100vh;
  bottom: var(--contents-bottom-position);
  left: 50%;
  transform: translateX(-50%) translateY(0%);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  filter: drop-shadow(0px 16px 40px rgba(0, 37, 80, 0.2));
  &::-webkit-scrollbar {
    width: 0px;
  }
  &-chip {
    --tip-color: #c8c8c8;
    z-index: 12;
    position: relative;
    top: 0px;
    height: 4px;
    width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: s-resize;
    &::after {
      position: absolute;
      content: '';
      top: 8px;
      height: 4px;
      width: 40px;
      background-color: var(--tip-color);
      margin-left: calc(50% - 17.5px);
      border-radius: 10px;
    }
  }
}
.swipe-modal-background {
  &-enter {
    & {
      opacity: 0;
    }
    &-from {
      opacity: 0;
    }
    &-active {
      transition: all 0.2s ease-out;
    }
    &-to {
      opacity: 1;
    }
  }
  &-leave {
    & {
      opacity: 1;
    }
    &-from {
      opacity: 1;
    }
    &-active {
      transition: all 0.2s ease-out;
    }
    &-to {
      opacity: 0;
    }
  }
}
.swipe-modal-contents {
  &-enter {
    & {
      bottom: calc(-1 * var(--contents-height)) !important;
    }
    &-from {
      bottom: calc(-1 * var(--contents-height)) !important;
    }
    &-active {
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }
    &-to {
      bottom: var(--contents-bottom-position) !important;
    }
  }
  &-leave {
    & {
      bottom: var(--contents-bottom-position) !important;
    }
    &-from {
      bottom: var(--contents-bottom-position) !important;
    }
    &-active {
      transition: all 0.25s cubic-bezier(.25,.8,.25,1);
    }
    &-to {
      bottom: calc(-1 * var(--contents-height)) !important;
    }
  }
}
</style>