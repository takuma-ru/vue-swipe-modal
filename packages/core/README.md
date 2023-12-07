# @takuma-ru/vue-swipe-modal

![featureGraphic](https://user-images.githubusercontent.com/49429291/182005490-2e0631ca-8271-48e6-9282-25df81ba0f8f.png)
![npm](https://img.shields.io/npm/dt/@takuma-ru/vue-swipe-modal?style=flat-square)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@takuma-ru/vue-swipe-modal?style=flat-square)

## Description
Modal window that can be swiped to close.（Swipeable Bottom Sheet）<br>
<br>
⚠️ WARN ⚠️<br>
Due to the eol of vue2, vue2 is no longer supported. vue2 can be used with `v4.0.7` or earlier, but we are not responsible for any problems that may occur.


## DEMO
[Directory](https://github.com/takuma-ru/vue-swipe-modal/tree/main/demo/vue)

## Documentation

[vue-swipe-modal-docs.takumaru.dev](https://vue-swipe-modal-docs.takumaru.dev/)

## Getting Started
### 1. Install
#### vue3
```shell
npm i @takuma-ru/vue-swipe-modal@^5.0.0
```

#### vue2 (deprecated)
```shell
npm i @takuma-ru/vue-swipe-modal@^4.0.0 @vue/composition-api
```
### 2. Use
Import and use the modal with the vue file you want to use.

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { SwipeModal } from "@takuma-ru/vue-swipe-modal"

const isOpen = ref(false)
</script>

<template>
  <button @click="isOpen = true">Open modal</button>
  <SwipeModal
    v-model="isOpen"
    snapPoint="auto"
  >
    <button @click="isOpen = false">Close modal</button>
    Modal content
  </SwipeModal>
</template>

<style lang="scss" scoped>
:deep(.modal-style) {
  box-sizing: border-box;
  width: 100%;
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

## License
[MIT - Copyright (c) 2023 takuma-ru](https://github.com/takuma-ru/vue-swipe-modal/blob/main/LICENSE.md)