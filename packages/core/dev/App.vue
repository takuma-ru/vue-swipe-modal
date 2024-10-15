<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
const isNestedOpen = ref(false);

const option = ref({
  isBackdrop: true,
  isDragHandle: true,
  isFullscreen: true,
  isPersistent: false,
  isScrollLock: true,
});
</script>

<template>
  <h2>@web-bottom-sheet/core</h2>

  <div class="input-checkbox">
    <label for="isBackdrop">isBackdrop</label>
    <input
      v-model="option.isBackdrop"
      id="isBackdrop"
      name="isBackdrop"
      type="checkbox"
    />
  </div>

  <div class="input-checkbox">
    <label for="isDragHandle">isDragHandle</label>
    <input
      v-model="option.isDragHandle"
      id="isDragHandle"
      name="isDragHandle"
      type="checkbox"
    />
  </div>

  <div class="input-checkbox">
    <label for="isFullscreen">isFullscreen</label>
    <input
      v-model="option.isFullscreen"
      id="isFullscreen"
      name="isFullscreen"
      type="checkbox"
    />
  </div>

  <div class="input-checkbox">
    <label for="isPersistent">isPersistent</label>
    <input
      v-model="option.isPersistent"
      id="isPersistent"
      name="isPersistent"
      type="checkbox"
    />
  </div>

  <div class="input-checkbox">
    <label for="isScrollLock">isScrollLock</label>
    <input
      v-model="option.isScrollLock"
      id="isScrollLock"
      name="isScrollLock"
      type="checkbox"
    />
  </div>

  <hr />

  <button @click="isOpen = true">open ({{ isOpen ? "opened" : "closed" }})</button>

  <web-bottom-sheet
    :open="isOpen"
    :is-backdrop="option.isBackdrop"
    :is-drag-handle="option.isDragHandle"
    :is-fullscreen="option.isFullscreen"
    :is-persistent="option.isPersistent"
    :is-scroll-lock="option.isScrollLock"
    @close="() => isOpen = false"
  >
    <div class="panel">
      <p>This is contents.</p>
      <button @click="
        (e) => {
          e.stopPropagation();
          isOpen = false;
        }
      ">close</button>
      <button
        @click="isNestedOpen = true"
      >
        Open nested bottom sheet
      </button>
      <h3>Web Bottom Sheet</h3>
      <p>
        This is a web component that mimics the native bottom sheet. It is
        implemented using Lit and TypeScript.
      </p>
      <web-bottom-sheet-snap-point></web-bottom-sheet-snap-point>
      <web-bottom-sheet
       :open="isNestedOpen"
       @close="() => isNestedOpen = false"
      >
        <div class="panel">
          <p>This is nested contents.</p>
          <button @click="(e) => {
            e.stopPropagation()
            isNestedOpen = false
          }">close</button>
          <p>This is nested contents.</p>
          <web-bottom-sheet-snap-point></web-bottom-sheet-snap-point>
        </div>
      </web-bottom-sheet>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>8</p>
      <p>9</p>
      <p>10</p>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>8</p>
      <p>9</p>
      <p>10</p>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>8</p>
      <p>9</p>
      <p>10</p>
    </div>
  </web-bottom-sheet>
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
