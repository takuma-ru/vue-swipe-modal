<script setup lang="ts">
import { ref } from "vue";
import { BottomSheet } from "../src/main";

const isOpen = ref(false);
</script>

<template>
  <h1>Vue</h1>
  <p>isOpen: {{ isOpen }}</p>
  <button @click="isOpen = true">open</button>

  <BottomSheet :open="isOpen" @on-close="isOpen = false">
    <div class="">
      <button @click="isOpen = false">close</button>
    </div>
  </BottomSheet>
</template>

<style scoped>
web-bottom-sheet::part(dialog) {
  background-color: #242424;
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;

  @media (prefers-color-scheme: light) {
    background-color: #ffffff;
  }
}
</style>
