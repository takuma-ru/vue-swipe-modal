<template>
  <div
    id="swipe-modal"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
  >
    <transition name="swipe-modal-background" appear>
      <div
        v-if="modal"
        class="modal-background"
        :style="{
          backgroundColor: backgroundColor,
        }"
        @mouseup="persistent ? null : close()"
      />
    </transition>
    <transition name="swipe-modal-contents" appear>
      <div
        v-if="modal"
        ref="modal-contents"
        class="modal-contents"
        :style="`
          width: ${contentsWidth};
          --contents-height: ${fullscreen
            ? '100%'
            : modalHeight > 0
            ? modalHeight + 'px'
            : contentsHeight};
          border-top-left-radius: ${fullscreen
            ? '0px'
            : borderTopRadius
            ? borderTopRadius
            : borderTopLeftRadius};
          border-top-right-radius: ${fullscreen
            ? '0px'
            : borderTopRadius
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
            --tip-color: ${tipColor},
          `"
          @mousedown="mouseDown"
        />
        <slot />
        {{ modal }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'swipeModal',
  props: {
    // modal
    modal: {
      type: Boolean,
      default: false,
    },
    dark: Boolean,
    // modal_background
    persistent: Boolean,
    backgroundColor: {
      type: String,
      default: '#80808080',
    },
    // modal_contents
    fullscreen: Boolean,
    noTip: Boolean,
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
  emits: ['update:modal'],
  setup(props, ctx) {
    // const
    const modal = computed({
      get: () => props.modal,
      set: (value: any) => ctx.emit('update:modal', value),
    })
    const isMouseDown = ref<boolean>(false)
    const isTouch = ref<boolean>(false)
    const modalQuery = ref<any>(null)
    const modalHeight=  ref<number>(0)
    const contentsBottomPosition=  ref<string>('0px')
    const moveStartPosition = ref<number>(0)
    const nowMovePosition = ref<number>(0)


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
      ctx.emit('update:modal', false)
    }

    const mouseDown = () => {
      console.log('open')
    }
    const mouseMove = () => {
      console.log('open')
    }
    const mouseUp = () => {
      console.log('open')
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
  z-index: 5;
}
.modal-background {
  position: fixed;
  z-index: 1;
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
  z-index: 2;
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
  &::-webkit-scrollbar {
    width: 0px;
  }
  &-chip {
    --tip-color: #c8c8c8;
    z-index: 2;
    position: sticky;
    top: 0px;
    height: 4px;
    width: 100%;
    padding-top: 1vh;
    padding-bottom: 1vh;
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
    &-from {
      opacity: 0;
    }
    &-active {
      transition: all 0.15s ease-out;
    }
    &-to {
      opacity: 1;
    }
  }
  &-leave {
    &-from {
      opacity: 1;
    }
    &-active {
      transition: all 0.15s ease-out;
    }
    &-to {
      opacity: 0;
    }
  }
}

.swipe-modal-contents {
  &-enter {
    &-from {
      bottom: calc(-1 * var(--contents-height)) !important;
    }
    &-active {
      transition: all 0.2s ease-out;
    }
    &-to {
      bottom: var(--contents-bottom-position) !important;
    }
  }
  &-leave {
    &-from {
      bottom: var(--contents-bottom-position) !important;
    }
    &-active {
      transition: all 0.15s ease-out;
    }
    &-to {
      bottom: calc(-1 * var(--contents-height)) !important;
    }
  }
}
</style>