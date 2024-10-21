# @web-bottom-sheet/vue

## Description
Web modal component that can be opened and closed by swiping.

This package is the body of component, used as web-component.

## Installation
```bash
npm i @web-bottom-sheet/vue
```

## Usage
```vue
<script setup lang="ts">
import { BottomSheet } from "@web-bottom-sheet/vue";
import { ref } from "vue";

const isOpen = ref(false);

const handleOpen = () => {
  isOpen.value = true;
};

const handleClose = () => {
  isOpen.value = false;
};
</script>

<template>
  <button @click="handleOpen">
    open
  </button>

  <BottomSheet
    :open="isOpen"
    @close="handleClose"
  >
    <div class="panel">
      <p>This is contents.</p>
      <button @click="handleClose">
        close
      </button>
    </div>
  </BottomSheet>
</template>
```
