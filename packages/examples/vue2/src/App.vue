<template>
  <div>
    <button @click="modal = true">open</button>

    <swipe-modal
      v-model="modal"
      contents-height="50vh"
      border-top-radius="16px"
    >
      <h1>contents</h1>
    </swipe-modal>
  </div>
</template>

<script>
import { swipeModal } from '../../../lib/dist/swipe-modal.es'

export default {
  name: 'App',
  components: {
    swipeModal,
  },
  data() {
    return {
      modal: false,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
