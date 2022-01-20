<template>
  <div
    id="modal"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
  >
    <transition name="swipe_modal_background">
      <div
        v-if="modal"
        class="modal_background"
        :style="{
          backgroundColor: backgroundColor,
        }"
        @mouseup="persistent ? null : close()"
      />
    </transition>
    <transition name="swipe_modal_contents">
      <div
        v-if="modal"
        ref="modal_contents"
        class="modal_contents"
        :style="{
          width: contentsWidth,
          '--contents-height': fullscreen
            ? '100vh'
            : modalHeight > 0
            ? modalHeight + 'px'
            : contentsHeight,
          borderTopLeftRadius: fullscreen
            ? '0px'
            : borderTopRadius
            ? borderTopRadius
            : borderTopLeftRadius,
          borderTopRightRadius: fullscreen
            ? '0px'
            : borderTopRadius
            ? borderTopRadius
            : borderTopRightRadius,
          backgroundColor: dark ? darkContentsColor : contentsColor,
          color: dark ? 'white' : 'back',
          '--contents-bottom-position': contentsBottomPosition,
        }"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div
          v-if="!noTip"
          class="modal_contents_chip"
          :style="{
            '--tip-color': tipColor,
          }"
          @mousedown="mouseDown"
        />
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modal',
    event: 'change-modal',
  },

  props: {
    // modal
    modal: Boolean,
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

  data() {
    return {
      isMouseDown: false,
      isTouch: false,

      modalQuery: null,
      modalHeight: 0,

      contentsBottomPosition: 0,
      startMovePosition: 0,
      nowMovePosition: 0,
    }
  },

  computed: {
    // TO-DO: バックイベント時にモーダルを閉じるようにする
    /* isOpen () {
      const name = 'a'
      const isOpen = this.$route.query.eval(name)
      console.log(isOpen)
      return isOpen === 'true' ? true : false
    }, */
  },

  watch: {
    modal(newmodal) {
      if (newmodal) {
        this.open()
      }
    },
  },

  methods: {
    // anim
    open() {
      this.init()
      document.documentElement.style.overflowY = 'hidden'
    },

    close() {
      this.isMouseDown = false
      this.isTouch = false
      document.documentElement.style.overflowY = 'auto'
      this.$emit('change-modal', false)
    },

    // track
    init() {
      this.isMouseDown = false
      this.isTouch = false
      this.modalQuery = null
      this.modalHeight = 0
      this.contentsBottomPosition = 0
      this.startMovePosition = 0
      this.nowMovePosition = 0
    },

    touchStart(e) {
      this.modalQuery = document.querySelector('.modal_contents')
      this.modalHeight = this.modalQuery.getBoundingClientRect().height
      if (this.modalQuery.scrollTop <= 0) {
        this.moveStartPosition = e.touches[0].pageY
        this.isTouch = true
      }
    },
    touchMove(e) {
      if (this.isTouch) {
        this.nowMovePosition = e.touches[0].pageY
        if (this.moveStartPosition - this.nowMovePosition <= 0) {
          this.contentsBottomPosition = this.moveStartPosition - this.nowMovePosition
        } else {
          this.contentsBottomPosition = 0 + 'px'
        }
        this.contentsBottomPosition = (this.moveStartPosition - this.nowMovePosition <= 0 ? this.moveStartPosition - this.nowMovePosition : 0) + 'px'
      }
    },
    touchEnd() {
      this.isTouch = false
      if (
        -1 * (this.moveStartPosition - this.nowMovePosition) >
        this.modalHeight * (1 / 8)
      ) {
        this.close()
      } else {
        this.contentsBottomPosition = 0 + 'px'
      }
    },

    mouseDown(e) {
      this.modalQuery = document.querySelector('.modal_contents')
      this.modalHeight = this.modalQuery.getBoundingClientRect().height
      this.moveStartPosition = e.pageY
      this.isMouseDown = true
    },
    mouseMove(e) {
      if (this.isMouseDown) {
        this.nowMovePosition = e.pageY
        this.contentsBottomPosition =
          (this.moveStartPosition - this.nowMovePosition <= 0
            ? this.moveStartPosition - this.nowMovePosition
            : 0) + 'px'
      }
    },
    mouseUp() {
      this.isMouseDown = false
      if (
        -1 * (this.moveStartPosition - this.nowMovePosition) >
        this.modalHeight * (1 / 8)
      ) {
        this.close()
      } else {
        this.contentsBottomPosition = 0 + 'px'
      }
    },
  },
}
</script>

<style lang="scss">
#modal {
  position: fixed;
  scrollbar-width: none;
}

.modal_background {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal_contents {
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

  &_chip {
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

.swipe_modal_background-enter-active,
.swipe_modal_background-leave-active {
  transition: all 0.15s ease-out;
}

.swipe_modal_background-enter,
.swipe_modal_background-leave-to {
  opacity: 0;
}

.swipe_modal_contents-enter-active {
  transition: all 0.2s ease-out;
}
.swipe_modal_contents-leave-active {
  transition: all 0.15s ease-out;
}

.swipe_modal_contents-enter {
  bottom: calc(-1 * var(--contents-height)) !important;
}
.swipe_modal_contents-enter-to {
  bottom: var(--contents-bottom-position) !important;
}

.swipe_modal_contents-leave {
  bottom: var(--contents-bottom-position) !important;
}
.swipe_modal_contents-leave-to {
  bottom: calc(-1 * var(--contents-height)) !important;
}
</style>