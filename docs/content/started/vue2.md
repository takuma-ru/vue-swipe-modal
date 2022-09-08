---
title: 'Get Started for vue2｜@takuma-ru/vue-swipe-modal'
---

# Get started - Vue.js 2.x

### 1. Install
This library works with "@vue-composition-api", so it should be installed together.

```cmd
yarn add @takuma-ru/vue-swipe-modal@^4.0.0 @vue/composition-api
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
import swipeModal from '@takuma-ru/vue-swipe-modal'

export default defineComponent({
  components: {
    swipeModal,
  },

  setup(props) {
    const isModal = ref(true)

    return { isModal }
  },
})
</script>
```