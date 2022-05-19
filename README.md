# @takuma-ru/vue-swpie-modal

## WERNING

I want to support vue2 and vue3 but I can't~!
It may not work properly for the time being: ....

## Description
Modal window that can be swiped to close.（Swipeable Bottom Sheet）

## DEMO
https://vue-swipe-modal.vercel.app/

## Getting Started
1. Install
- for Vue3
  ```md
  yarn add @takuma-ru/vue-swipe-modal@^3
  ```

- for Vue2
  ```md
  yarn add @takuma-ru/vue-swipe-modal@~2
  ```

2. Come on, let's use it.
```vue
<!-- for Vue3 -->
<template>
  <div>
    <button @click="modal = true">open</button>

    <swipe-modal
      v-model="modal"
      contents-height="50vh"
      border-top-radius="16px"
    >
      <h1>contents</h1>
    </swipe-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import swipeModal from '@takuma-ru/vue-swpie-modal'

const modal = ref(false)
</script>
```

## Props

#### Modal General
| Variable | Type | default | Details |
| --- | --- | --- | --- |
| **v-model** | Boolean | `false` | Control the opening and closing |
| **dark** | Boolean | `false` | Dark mode |

#### Background
| Variable | Type | default | Details |
| --- | --- | --- | --- |
| **persistent** | Boolean | `false` | Don't close it by pressing background (out of modal) |
| **backgroundColor** | String | `#80808080` | Background (out of modal) color |

#### Modal
| Variable | Type | default | Details |
| --- | --- | --- | --- |
| **fullscreen** | Boolean | `false` | Display in full screen mode (height: 100%)|
| **noTip** | Boolean | `false` | Don't show the chip at the top of the modal. |
| **contents-width** | String | `100%` | Width of the modal |
| **contents-height** | String | `30vh` | Height of the modal |
| **border-top-radius** | String | `null` | Radius at the top of the modal(This value takes precedence) |
| **border-top-left-radius** | String | `0px` | Modal upper left radius |
| **border-top-right-radius** | String | `0px` | Modal upper right radius |
| **contents-color** | String | `white` | Modal background color |
| **tip-color** | String | `#c8c8c8` | Tip chip color |
| **dark-contents-color** | String | `black` | Modal background color in dark mode |