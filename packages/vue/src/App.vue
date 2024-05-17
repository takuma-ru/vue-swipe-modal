<script setup lang="ts">
import WebBottomSheet from "./components/WebBottomSheet.vue";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <button @click="isOpen = true">open</button>

  <WebBottomSheet :open="isOpen" snap-point="50%">
    <button @click="isOpen = false">close</button>
  </WebBottomSheet>
</template>

<style scoped>
</style>
