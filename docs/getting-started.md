---
next:
  text: 'Tutorial - Basic usage'
  link: '/tutorial/basic-usage.md'
---

# Getting Started

## 1. Install
Once you have created a project in vite or nuxt, run the following command.

::: code-group
```shell [npm]
npm i @takuma-ru/vue-swipe-modal
```

```shell [yarn]
yarn add @takuma-ru/vue-swipe-modal
```

```shell [pnpm]
pnpm add @takuma-ru/vue-swipe-modal
```

```shell [bun]
bun add @takuma-ru/vue-swipe-modal
```
:::

::: warning
vue2.x is not supported in the latest version (and will not be in the future). If you want to use this library with vue2.x, please install `4.0.7` or lower version.
```shell [npm]
npm i @takuma-ru/vue-swipe-modal@^4.0.7
```
:::

## 2. Use
Import and use the modal with the vue file you want to use.

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { SwipeModal } from "@takuma-ru/vue-swipe-modal"

const isOpen = ref(false)
</script>

<template>
  <button @click="isOpen = true">Open modal</button>
  <SwipeModal v-model="isOpen" class="modal">
    Modal content
  </SwipeModal>
</template>

<style lang="scss" scoped>
.modal {
  box-sizing: border-box;
  width: 100%;
  height: 50dvh;
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
```