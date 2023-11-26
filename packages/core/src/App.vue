<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import SwipeModal from "./components/NewSwipeModal.vue"

const isOpen = ref(false)

const contentRef = ref<HTMLDivElement | null>(null)

const props = reactive({
  isDragHandle: true,
  isBackdrop: true,
  isPersistent: false,
  isScrollLock: true,
})

const array = computed(() => {
  return [...Array(100)].map((_, i) => i)
})
</script>

<template>
  <button @click="isOpen = !isOpen">open modal</button>
  <p>
    {{ isOpen }}
  </p>

  <div class="props-list">
    <div>
      <input
        v-model="props.isBackdrop"
        class="checkbox"
        type="checkbox"
      />
      <label for="checkbox">isBackdrop</label>
    </div>
    <div>
      <input
        v-model="props.isDragHandle"
        class="checkbox"
        type="checkbox"
      />
      <label for="checkbox">isDragHandle</label>
    </div>
    <div>
      <input
        v-model="props.isPersistent"
        class="checkbox"
        type="checkbox"
      />
      <label for="checkbox">isPersistent</label>
    </div>
    <div>
      <input
        v-model="props.isScrollLock"
        class="checkbox"
        type="checkbox"
      />
      <label for="checkbox">isScrollLock</label>
    </div>
  </div>

  <p
    v-for="item in array"
    :key="item"
  >
    {{ item }}
  </p>

  <button @click="isOpen = !isOpen">open modal</button>

  <SwipeModal
    v-model="isOpen"
    :snap-point="`${(contentRef?.getBoundingClientRect().height || 0) + 36}px`"
    :is-backdrop="props.isBackdrop"
    :is-drag-handle="props.isDragHandle"
    :is-persistent="props.isPersistent"
    :is-scroll-lock="props.isScrollLock"
  >
    <!-- <p
      v-for="item in array"
      :key="item"
    >
      {{ item }}
    </p> -->
    <div
      ref="contentRef"
      :style="{
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        outline: '1px solid red',
        outlineOffset: '-1px',
      }"
    >
      <button @click="isOpen = false">close modal</button>
      <h3>Red line is this element's area.</h3>
      height is auto.
    </div>
  </SwipeModal>
</template>

<style module lang="scss">
html {
  margin: 0;
}

.props-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-panel {
  box-sizing: border-box;
  width: 100%;
  height: 80dvh;
  color: white;
  background-color: #1d1b20;
  border-radius: 1rem 1rem 0 0;

  @media (prefers-color-scheme: light) {
    color: black;
    background-color: #f7f2fa;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
  }
}
</style>
