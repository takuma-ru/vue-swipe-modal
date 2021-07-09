<template>
  <div @mousemove="mouseMove">
    <div v-if="!modal" class="modal_button">
      <button @click="open">
        <span>
          OPEN
        </span>
      </button>
    </div>
    <div v-else>
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
          --height: ${height};
          --width: ${width};
          --color: ${color};
          --radius: ${radius};
        `"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div
          v-if="!notip"
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
      position: 0,
      startY: 0,
      moveY: 0,
      modal: false,
      modal_anim: false,
      movey: 0,
      down: false,
    }
  },

  props: {
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
    persistent: Boolean,
    dark: Boolean,
    notip: Boolean,
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

  watch: {
  },

  methods: {
    //common
    close_func() {
      this.modal = false
      this.down = false
      this.startY = 0
      this.moveY = 0
      this.movey = 0
      document.body.classList.remove("modal-open")
      //console.log('close')
    },
    close(){
      this.modal_anim = false
      setTimeout(this.close_func, 235)
    },
    open(){
      //console.log('open')
      this.modal_anim = true
      this.modal = true
      document.body.classList.add("modal-open")
    },

    //mobile
    touchStart(e) {
      this.startY = e.touches[0].pageY
    },
    touchMove(e) {
      this.moveY = -1 * (e.touches[0].pageY - this.startY)
      this.movey = this.moveY + 'px'
      if(this.moveY > 0) {
        this.moveY = 0
        this.movey = this.moveY + 'px'
      }
      //console.log('move:' + this.movey + '  height:' + window.outerHeight)
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
  overscroll-behavior-y: contain;
  z-index: 2;
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
  position: relative;
  height: fit-content;
  width: 100%;

  padding: 20px 20px;
}

@keyframes open {
  0% {
    bottom: calc(-1 * var(--height));
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
    bottom: calc(-1 * var(--height));
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