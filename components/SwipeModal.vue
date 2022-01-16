<template>
  <div
    id="modal"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
  >
    <transition name="swipe_modal_background">
      <div
        v-if="isOpen"
        class="modal_background"
        :style="{
          backgroundColor: backgroundColor,
        }"
        @click="close()"
      />
    </transition>
    <transition name="swipe_modal_contents">
      <div
        v-if="isOpen"
        ref="modal_contents"
        class="modal_contents"
        :style="{
          width: contentsWidth,
          '--contents-height': contentsHeight,
          borderTopLeftRadius: borderTopRadius ? borderTopRadius : borderTopLeftRadius,
          borderTopRightRadius: borderTopRadius ? borderTopRadius : borderTopRightRadius,
          backgroundColor: contentsColor,
          '--contents-bottom-position': contentsBottomPosition,
        }"
        :mixins="[{
          created: open()
        }]"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div
          class="modal_contents_chip"
          @mousedown="mouseDown"
        />
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    // modal

    // modal_background
    backgroundColor: {
      type: String,
      default: '#80808080'
    },

    // modal_contents
    contentsWidth: {
      type: String,
      default: '100%'
    },
    contentsHeight: {
      type: String,
      default: '30vh'
    },
    borderTopRadius: {
      type: String,
      default: null
    },
    borderTopLeftRadius: {
      type: String,
      default: '0px'
    },
    borderTopRightRadius: {
      type: String,
      default: '0px'
    },
    contentsColor: {
      type: String,
      default: 'white'
    }
  },

  data () {
    return {
      isMouseDown: false,
      modalHeight: 0,
      contentsBottomPosition: 0,
      startMovePosition: 0,
      nowMovePosition: 0,
    }
  },

  computed: {
    isOpen () {
      const isOpen = this.$route.query.isOpen
      return isOpen === 'true' ? true : false
    },
  },

  watch: {
    isOpen (newVal, oldVal) {
      if (newVal != oldVal) {
        this.init()
      }
    }
  },

  methods: {
    // anim
    open () {
      document.documentElement.style.overflowY = 'hidden'
    },

    close () {
      this.isMouseDown = false
      document.documentElement.style.overflowY = 'auto'
      this.$router.push('')
    },

    // track
    init () {
      this.isMouseDown = false
      this.contentsBottomPosition = 0
    },

    touchStart(e) {
      const title = document.querySelector('.modal_contents')
      this.modalHeight = title.getBoundingClientRect().y
      this.moveStartPosition = e.touches[0].pageY
      this.isMouseDown = true
    },
    touchMove(e) {
      if (this.isMouseDown) {
        this.nowMovePosition = e.touches[0].pageY
        this.contentsBottomPosition = (this.moveStartPosition - this.nowMovePosition <= 0 ? this.moveStartPosition - this.nowMovePosition : 0) + 'px'
      }
    },
    touchEnd() {
      this.isMouseDown = false
      if (-1 * (this.moveStartPosition - this.nowMovePosition) > this.modalHeight * (1 / 8)) {
        this.close()
      } else {
        this.contentsBottomPosition = 0 + 'px'
      }
    },

    mouseDown (e) {
      const title = document.querySelector('.modal_contents')
      this.modalHeight = title.getBoundingClientRect().y
      this.moveStartPosition = e.pageY
      this.isMouseDown = true
    },
    mouseMove (e) {
      if (this.isMouseDown) {
        this.nowMovePosition = e.pageY
        this.contentsBottomPosition = (this.moveStartPosition - this.nowMovePosition <= 0 ? this.moveStartPosition - this.nowMovePosition : 0) + 'px'
      }
    },
    mouseUp () {
      this.isMouseDown = false
      if (-1 * (this.moveStartPosition - this.nowMovePosition) > this.modalHeight * (1 / 8)) {
        this.close()
      } else {
        this.contentsBottomPosition = 0 + 'px'
      }
      // console.log('mouseUp')
    }
  },
}
</script>

<style lang="scss">
#modal {
  position: fixed;
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
  /* width: 100%; */
  min-height: var(--contents-height);

  bottom: var(--contents-bottom-position);
  left: 50%;
  transform: translateX(-50%) translateY(0%);

  &_chip {
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
      content:'';
      top: 8px;
      height: 4px;
      width: 40px;
      background-color: rgb(200, 200, 200);

      margin-left: calc(50% - 17.5px);

      border-radius: 10px;
    }
  }
}

.swipe_modal_background-enter-active,
.swipe_modal_background-leave-active {
  transition: all 0.15s ease-out;
}

.swipe_modal_background-enter, .swipe_modal_background-leave-to {
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