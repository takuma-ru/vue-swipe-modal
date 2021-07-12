<template>
  <div class="container">
    <div class="title">
      <Logo />
      <h1>
        SwipeModal Package
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
    <div class="modal_button">
      <button @click="modal2 = true">
        <span>
          modal2 OPEN
        </span>
      </button>
    </div>

    <Swipemodal
      v-model="modal"
      height="80vh"
      width="100%"
      radius="20px"
      fullscreen
    >
      <h1>modal 1</h1>
      <table>
        <tbody>
          <tr>
            <th>name</th> <th>value</th>
          </tr>
          <tr>
            <td>height</td> <td>80vh</td>
          </tr>
          <tr>
            <td>width</td> <td>100%</td>
          </tr>
          <tr>
            <td>radius</td> <td>20px</td>
          </tr>
          <tr>
            <td>fullscreen</td> <td>true</td>
          </tr>
          <tr>
            <td>notip</td> <td>false</td>
          </tr>
        </tbody>
      </table>
      <div v-for="i in 100" :key="i">
        {{ i }}
      </div>
    </Swipemodal>

    <Swipemodal
      v-model="modal2"
      height="auto"
      width="50%"
      radius="0px"
      notip
    >
      <h1>modal 2</h1>
      <table>
        <tbody>
          <tr>
            <th>name</th> <th>value</th>
          </tr>
          <tr>
            <td>height</td> <td>50vh</td>
          </tr>
          <tr>
            <td>width</td> <td>50%</td>
          </tr>
          <tr>
            <td>radius</td> <td>0px</td>
          </tr>
          <tr>
            <td>fullscreen</td> <td>false</td>
          </tr>
          <tr>
            <td>notip</td> <td>true</td>
          </tr>
        </tbody>
      </table>
    </Swipemodal>
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

table {
  border-collapse: collapse;
  margin: 2vmin;
}

th, td {
  border: 1px solid #333;
}
</style>
