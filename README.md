# vue_SwipeModal

## WARNING!
- #### The latest version is **2**.
  Note that the component names and available props are still different.
- #### New package name: @takuma-ru/vue-swipe-modal
  The name of this package has been changed!
  Install the package at the following link.
  [@takuma-ru/vue-swipe-modal(New package link)](https://www.npmjs.com/package/@takuma-ru/vue-swipe-modal)
- #### End of Support.
  **Version 2.0.5 and later** will not be supported due to the above package transition.
  For 2.0.5 and later, please use **@takuma-ru/vue-swpie-modal**.


## Description
Modal window that can be swiped to close.（Swipeable Bottom Sheet）

## DEMO
https://vue-swipe-modal.vercel.app/

## Getting Started
1. Install
```md
npm i @takuma-ru/vue-swipe-modal
```
```md
yarn add @takuma-ru/vue-swipe-modal
```

2. Come on, let's use it.
```vue
<template>
  <div>
    <button @click="modal = true">open</button>

    <swipe-modal
      v-model="modal"
      contents-height="80vh"
      contents-width="100%"
      border-top-radius="20px"
    >
      <h1>contents</h1>
    </swipe-modal>
  </div>
</template>

<script>
import swipeModal from 'nekoo_vue_swipemodal'
import 'nekoo_vue_swipemodal/dist/swipemodal.css'

export default {
  name: 'App',

  data() {
    return {
      modal: false
    }
  },

  components: {
    swipeModal
  }
}
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
