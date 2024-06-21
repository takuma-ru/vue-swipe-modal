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
    <div class="panel">
      <h3>@web-bottom-sheet/vue</h3>
      <button @click="isOpen = false">close</button>
    </div>
  </BottomSheet>
</template>

<style scoped>
web-bottom-sheet::part(dialog) {
  background-color: #242424;
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;
}

web-bottom-sheet::part(dialog):focus {
  outline-color: #646cff;
}

web-bottom-sheet::part(dialog)::backdrop {
  background-color: rgb(0 0 0 / 50%);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

@media (prefers-color-scheme: light) {
  web-bottom-sheet::part(dialog) {
    background-color: #ffffff;
  }
}
.panel {
  padding: 16px;
}
</style>
