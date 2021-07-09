<template>
  <div class="container">
    <div class="title">
      <Logo />
      <h1>
        SwipeModal Package
      </h1>
      <h2>対応ブラウザ</h2>
      <p>Chromium（Chrome, Edge, Opera ...）</p>
      <p>Gecko（Firefox ...）</p>
      <p>Safari</p>
      <h2>対応OS</h2>
      <p>PC（Windows, macOS ...）</p>
      <p>モバイル端末（Android, iOS ...）</p>
      <h2>GitHub：<a href="https://github.com/takuma-ru/vue_SwipeModal">takuma-ru/vue_SwipeModal</a></h2>
    </div>

    <Swipemodal />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false
    }
  },

  methods: {
    open() {
      this.$refs.myBottomSheet.open();
    },
    close() {
      this.$refs.myBottomSheet.close();
    }
  }
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
</style>
