<template>
  <div @mousemove="mouseMove">
    <div v-show="modal">
      <div
        id="modal_back"
        @click="persistent ? null : close()"
        :class="modal_anim ? `modal_back__open` : `modal_back__close`"
      />

      <div
        id="modal"
        :class="modal_anim ? `modal__open` : `modal__close`"
        :style="`
          bottom: ${movey};
          --movey: ${movey};
          --height: ${fullscreen ? '100%' : height};
          --width: ${width};
          --color: ${color};
          --radius: ${radius};
        `"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div
          v-show="!notip"
          ref="swipe"
          class="modal_deco_top"
          @mousedown="mouseDown"
          @mouseup="mouseUp"
        />
        <div id="modal_contents">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //bool
      down: false,
      modal_anim: false,
      top: true,
      //int
      position: 0,
      topY: null,
      startY: 0,
      moveY: 0,
      movey: 0,
    }
  },

  model: {
    prop: 'modal',
    event: 'change-modal',
  },

  props: {
    modal: Boolean,
    persistent: Boolean,
    dark: Boolean,
    notip: Boolean,
    fullscreen: Boolean,
    height: {
      type: String,
      default: '50vh'
    },
    width: {
      type: String,
      default: '50vw'
    },
    color: {
      type: String,
      default: '#FFFFFF'
    },
    radius: {
      type: String,
      default: '20px'
    },
  },

  computed: {
    styles () {
      return {
        '--movey': {
          type: String,
          default: this.movey,
        },
        '--height': {
          type: String,
          default: this.height,
        },
        '--width': {
          type: String,
          default: this.width,
        },
      }
    }
  },

  mounted() {
    document.querySelector(`#modal`).addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    document.querySelector(`#modal`).removeEventListener("scroll", this.handleScroll);
  },

  watch: {
    modal: function(newmodal) {
      if(newmodal) {
        this.open()
      }
    },
  },

  methods: {
    //common
    close_func() {
      this.down = false
      this.topY = null
      this.modal_height = 0
      document.querySelector(`#modal_contents`).scrollIntoView(true)
      this.startY = 0
      this.moveY = 0
      this.movey = 0
      document.body.classList.remove("modal-open")
      this.$emit('change-modal', false)
      //console.log('close')
    },
    close(){
      this.modal_anim = false
      setTimeout(this.close_func, 235)
    },
    open(){
      //console.log('open')
      this.modal_anim = true
      document.body.classList.add("modal-open")
      this.$emit('change-modal', true)
    },
    handleScroll() {
      const title = document.querySelector(`#modal_contents`);
      const rect = title.getBoundingClientRect().y;
      if(this.topY == null) {
        this.topY = rect
      }
      if (rect >= this.topY) {
        this.top = true
      }else {
        this.top = false
      }
      //console.log('topY: ' + this.topY + ' rect: ' + rect)
    },

    //mobile
    touchStart(e) {
      this.startY = e.touches[0].pageY
    },
    touchMove(e) {
      if(this.top) {
        this.moveY = -1 * (e.touches[0].pageY - this.startY)
        this.movey = this.moveY + 'px'
        if(this.moveY > 0) {
          this.moveY = 0
          this.movey = this.moveY + 'px'
        }
        //console.log('move:' + this.movey + '  height:' + window.outerHeight)
      }
    },
    touchEnd(e) {
      if(this.moveY < -1 * window.outerHeight / 8) {
        this.close()
      }else {
        this.moveY = 0
        this.movey = this.moveY + 'px'
      }
    },

    //PC
    mouseDown(e) {
      this.startY = e.pageY;
      this.down = true
      //console.log('mouseDown')
    },
    mouseMove(e) {
      if(this.down) {
        this.moveY = -1 * (e.pageY - this.startY)
        this.movey = this.moveY + 'px'
        if(this.moveY > 0) {
          this.moveY = 0
          this.movey = this.moveY + 'px'
        }
      }
    },
    mouseUp(e) {
      if(this.moveY < -1 * window.outerHeight / 8) {
        this.close()
      }else {
        this.moveY = 0
        this.movey = this.moveY + 'px'
      }
      this.down = false
      //console.log('mouseUp')
    },
  }
}
</script>

<style>
body.modal-open {
  overflow: hidden;
}

.modal_button {
  text-align: center;
}

#modal_back {
  z-index: 1;
  position: fixed;
  height: 100vh;
  width: 100vw;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  transition: all 0.25s;

  background-color: rgba(0, 0, 0, 0.7);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.modal_back__open {
  animation-name: backopen;
  animation-duration: 0.2s;
  animation-timing-function: ease;
}

.modal_back__close {
  animation-name: backclose;
  animation-duration: 0.25s;
  animation-timing-function: ease;
}

#modal {
  z-index: 2;
  display: block;
  position: fixed;
  height: var(--height);
  width: var(--width);

  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0%);

  border-radius: var(--radius) var(--radius) 0px 0px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);

  background-color: var(--color);

  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

#modal::-webkit-scrollbar {
  display: none;
}

.modal__open {
  animation-name: open;
  animation-duration: 0.15s;
  animation-timing-function: ease;
}

.modal__close {
  animation-name: close;
  animation-duration: 0.25s;
  animation-timing-function: ease;
}

.modal_deco_top {
  z-index: 2;
  position: sticky;
  top: 1vh;
  height: 0.7vh;
  width: 100%;

  padding-top: 1vh;
  padding-bottom: 1vh;
  cursor: s-resize;
}

.modal_deco_top::after {
  position: absolute;
  content:"";
  top: 0%;
  height: 0.7vh;
  width: 35px;
  background-color: rgb(200, 200, 200);

  margin-left: calc(50% - 17.5px);

  border-radius: 10px;
}

#modal_contents {
  width: 100%;
  height: 100%;
  padding: 2vh 2vw;
}

@keyframes open {
  0% {
    bottom: -100vh;
  }
  100% {
    bottom: 0%;
  }
}

@keyframes close {
  0% {
    bottom: var(--movey);
  }
  100% {
    bottom: -100vh;
  }
}

@keyframes backopen {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes backclose {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>