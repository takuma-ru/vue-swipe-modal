<template>
  <div>
    <button @click="open()">open</button>
    {{ modal }}

    <swipe-modal
      v-model="modal.value"
      contents-height="50vh"
      border-top-radius="16px"
    >
      <p>contents</p>
    </swipe-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/composition-api';
import swipeModal from '@takuma-ru/vue-swipe-modal'
/* import swipeModal from '../../../lib' */

export default defineComponent({
  components: {
    swipeModal,
  },
  setup () {
    const modal = ref<boolean>(false)

    const open = () => {
      modal.value = true
    }

    return {
      modal,

      open,
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
