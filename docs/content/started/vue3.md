---
title: 'Get Started for vue3｜@takuma-ru/vue-swipe-modal'
---

# Get started - Vue.js 2.7 and Vue.js 3.x

### 1. Install
```cmd
yarn add @takuma-ru/vue-swipe-modal@^4.0.0
```

### 2. Done!
Import this library within a `<script>`.

You can use the `<swipe-modal>` in the vue file.

```vue{}[.vue file]
<template>
  <div>
    <button @click="isModal = true">open</button>
    <swipe-modal
      v-model="isModal"
      contents-height="50vh"
      border-top-radius="16px"
    >
      <p>contents</p>
    </swipe-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import swipeModal from '@takuma-ru/vue-swipe-modal'

const isModal = ref(false)
</script>
```