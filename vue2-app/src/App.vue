<template>
  <div id="app">
    <button @click="model = true">open</button>
    <SipeModal
      v-model="model"
    >
      hello
    </SipeModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import SipeModal from '../../@takuma-ru/vue-swipe-modal/src/lib-components/SwipeModal.vue'

export default defineComponent({
  components: {
    SipeModal,
  },
  setup () {
    const model = ref<boolean>(false)

    return {
      model,
    }
  }
});
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
