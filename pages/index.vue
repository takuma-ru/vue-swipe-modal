<template>
  <div class="container">
    <div class="title">
      <h1>
        @takuma-ru/vue-swipe-modal
      </h1>
      <h2><a href="https://github.com/takuma-ru/vue_SwipeModal">GitHub</a></h2>
      <h2>対応ブラウザ</h2>
      <p>Chromium（Chrome, Edge, Opera ...）</p>
      <p>Gecko（Firefox ...）</p>
      <p>Safari</p>
      <h2>対応OS</h2>
      <p>PC（Windows, macOS ...）</p>
      <p>モバイル端末（Android, iOS ...）</p>
    </div>

    <div class="modal_button">
      <button @click="modal = true">
        <span>
          modal1 OPEN
        </span>
      </button>
    </div>

    <SwipeModal
      v-model="modal"
      border-top-radius="24px"
      contents-height="50vh"
    >
      <div style="padding: 24px">
        <div v-for="i in 100" :key="i">
          {{ i }}
        </div>
      </div>
    </SwipeModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      modal2: false
    }
  },
}
</script>

<style>
body {
  overscroll-behavior-y: none;
}

.container {
  position: relative;
  padding: 2vh 1vw;
  min-height: 150vh;
}
.title {
  text-align: center;
}

button {
  min-height: 3vh;
  margin: 1vh 1vw;

  border-radius: 5px;
  border-width: 1px;

  background-color: white;
  box-shadow: 0 2.5px 6px 0 rgba(0, 0, 0, .3);
}

button span {
  margin: 2vh 1vw;
}

table {
  border-collapse: collapse;
  margin: 2vmin;
}

th, td {
  border: 1px solid #333;
}
</style>
