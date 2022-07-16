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

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/composition-api';
import swipeModal from '@takuma-ru/vue-swipe-modal'

export default defineComponent({
  components: {
    swipeModal,
  },
  setup () {
    const modal = ref<boolean>(false)

    return {
      modal,
    }
  }
})
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
