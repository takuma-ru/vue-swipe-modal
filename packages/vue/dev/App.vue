<script setup lang="ts">
import BottomSheet from "../src/components/BottomSheet.vue"
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <h1>Vue</h1>
  <p>isOpen: {{ isOpen }}</p>
  <button @click="isOpen = true">open</button>

  <BottomSheet :open="isOpen" snap-point="50%" @on-close="isOpen = false">
    <button @click="isOpen = false">close</button>
  </BottomSheet>
</template>

<style scoped>
</style>
