<template>
  <div id="app">
    <button @click="open()">open</button>
    {{ modal }}

    <swipe-modal
      v-model="modal"
      contents-height="100%"
      border-top-radius="16px"
      @close="close()"
    >
      <p>contents</p>
    </swipe-modal>
  </div>
</template>

<script setup lang="ts">
/* import swipeModal from '../../../lib' */
import swipeModal from '@takuma-ru/vue-swipe-modal'
import { ref } from 'vue';

const modal = ref(false)

const open = () => {
  modal.value = true
}

const close = () => {
  console.log('close swipe-modal')
}

</script>

<style scoped>
#app {
  height: 100vh;
  padding: 0;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
