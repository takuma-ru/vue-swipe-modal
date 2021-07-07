<template>
  <div>
    <div v-if="!modal">
      <button @click="open">
        <span>
          swipemodal open
        </span>
      </button>
    </div>
    <div v-else>
      <div
        id="modal_back"
        @click="close"
        :class="modal_anim ? `modal_back__open` : `modal_back__close`"
      />

      <div
        id="modal"
        :class="modal_anim ? `modal__open` : `modal__close`"
        :style="`bottom: ${moveX}vh;`"
      >
        <div
          ref="swipe"
          @mouseover="over"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="/*touchEnd*/"
          class="modal_deco_top"
        />
        <div id="modal_contents">
          Hello
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
      startX: 0,
      moveX: 0,
      modal: false,
      modal_anim: false,
    }
  },
  props: [
    ],

  computed: {
    // バインドするスタイルを生成
    styles () {
      return {
        '--movex': this.moveX,
      }
    }
  },

  methods: {
    close_func() {
      this.modal = false
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
    },
    over() {
      console.log('over')
    },

    touchStart(e){
      this.startX = e.touches[0].pageX;
    },
    touchMove(e){
      this.moveX = e.touches[0].pageX - this.startX;
      if(this.moveX > 0) {
        this.moveX = 0
      }
        console.log('move:', this.moveX)
    },
  }
}
</script>

<style scoped>
#modal_back {
  z-index: 0;
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
  z-index: 1;
  position: fixed;
  height: 50vh;
  width: 100vw;

  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0%);

  border-radius: 20px 20px 0px 0px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);

  background-color: white;

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
  position: relative;
  height: 0.7vh;
  width: 100%;

  margin-top: 1vh;
  margin-bottom: 1vh;
}

.modal_deco_top::after {
  position: absolute;
  content:"";
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
    bottom: -50vh;
  }
  100% {
    bottom: 0%;
  }
}

@keyframes close {
  0% {
    bottom: 0%;
  }
  100% {
    bottom: -50vh;
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