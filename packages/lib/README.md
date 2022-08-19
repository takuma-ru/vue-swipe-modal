# @takuma-ru/vue-swpie-modal

![featureGraphic](https://user-images.githubusercontent.com/49429291/182005490-2e0631ca-8271-48e6-9282-25df81ba0f8f.png)

## Description
Modal window that can be swiped to close.（Swipeable Bottom Sheet）

## DEMO
[demo-link](https://vue-swipe-modal-vue2.vercel.app)

## Getting Started
#### 1. Install
```powershell
yarn add @takuma-ru/vue-swipe-modal@^4.0.0
```

#### 2. Come on, let's use it.
<details>
  <summary>Vue 3.x  /  Vue 2.7</summary>

  ```vue
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
  import swipeModal from '@takuma-ru/vue-swipe-modal'

  const modal = ref(false)
  </script>
  ```
</details>

<details>
  <summary>Vue 2.6 or lower (Composition API)</summary>

  ```vue
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

  <script lang="ts">
  import { defineComponent, ref, reactive } from '@vue/composition-api';
  import { swipeModal } from '@takuma-ru/vue-swipe-modal'

  export default defineComponent({
    components: {
      swipeModal,
    },
    setup () {
      const modal = ref<boolean>(false)

      return {
        modal,
      }
    }
  })
  </script>
  ```

</details>

<details>
  <summary>Nuxt 2.x</summary>

  ```vue
  <!-- for Vue2 -->
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

  <script lang="ts">
  import { defineComponent, ref, reactive } from '@vue/composition-api';
  import { swipeModal } from '@takuma-ru/vue-swipe-modal'

  export default defineComponent({
    components: {
      swipeModal,
    },
    setup () {
      const modal = ref<boolean>(false)

      return {
        modal,
      }
    }
  })
  </script>
  ```

</details>

## Props

#### General
| Variable | Type | default | Details |
| --- | --- | --- | --- |
| **v-model** | Boolean | `false` | Control the opening and closing |
| **dark** | Boolean | `false` | Dark mode |

#### Emit
| Function | Type | Details |
| --- | --- | --- |
| **@open** | Void | Function to execute when a modal is opened |
| **@close** | Void | Function to execute when the modal closes |

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
