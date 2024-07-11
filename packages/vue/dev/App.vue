<script setup lang="ts">
import { ref } from "vue";
import { BottomSheet } from "../src/main";

const isOpen = ref(false);

const option = ref({
  snapPoint: "auto",
  isBackdrop: true,
  isDragHandle: true,
  isFullscreen: true,
  isPersistent: true,
  isScrollLock: true,
});
</script>

<template>
  <h2>@web-bottom-sheet/vue</h2>

  <div class="input-text">
    <label for="snapPoint">snapPoint</label>
    <input
      v-model="option.snapPoint"
      id="snapPoint"
      name="snapPoint"
      type="text"
    />
  </div>

  <div class="input-checkbox">
    <label for="isBackdrop">isBackdrop</label>
    <input
      v-model="option.isBackdrop"
      id="isBackdrop"
      name="isBackdrop"
      type="checkbox"
      checked
    />
  </div>

  <div class="input-checkbox">
    <label for="isDragHandle">isDragHandle</label>
    <input
      v-model="option.isDragHandle"
      id="isDragHandle"
      name="isDragHandle"
      type="checkbox"
      checked
    />
  </div>

  <div class="input-checkbox">
    <label for="isFullscreen">isFullscreen</label>
    <input
      v-model="option.isFullscreen"
      id="isFullscreen"
      name="isFullscreen"
      type="checkbox"
      checked
    />
  </div>

  <div class="input-checkbox">
    <label for="isPersistent">isPersistent</label>
    <input
      v-model="option.isPersistent"
      id="isPersistent"
      name="isPersistent"
      type="checkbox"
      checked
    />
  </div>

  <div class="input-checkbox">
    <label for="isScrollLock">isScrollLock</label>
    <input
      v-model="option.isScrollLock"
      id="isScrollLock"
      name="isScrollLock"
      type="checkbox"
      checked
    />
  </div>

  <hr />

  <button @click="isOpen = true">open</button>

  <BottomSheet
    :open="isOpen"
    @on-close="isOpen = false"
    :snap-point="option.snapPoint"
    :is-backdrop="option.isBackdrop"
    :is-drag-handle="option.isDragHandle"
    :is-fullscreen="option.isFullscreen"
    :is-persistent="option.isPersistent"
    :is-scroll-lock="option.isScrollLock"
  >
    <div class="panel">
      <p>This is contents.</p>
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
