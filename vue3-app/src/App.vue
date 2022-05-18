<script setup lang="ts">
import { ref } from 'vue'
import SwipeModal from '../../@takuma-ru/vue-swipe-modal/src/lib-components/SwipeModal.vue'

const model = ref(false)

</script>

<template>
  <div>
    {{ model }}
    <button @click="model = true">open</button>
    <SwipeModal
      v-model="model"
    >
      hello
    </SwipeModal>

  </div>
</template>

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
