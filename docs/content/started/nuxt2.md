# Get started - Nuxt.js 2.x


### 1. Install
This library works with "@vue-composition-api", so it should be installed together.

```cmd
yarn add @takuma-ru/vue-swipe-modal@^4.0.0 @vue/composition-api
```

<br>

### 2. Add plugin file
Create a plugins folder and a file named `swipe-modal.js`.

Write the following code in the file you created.

```js [@/plugins/swipe-modal.js]
import Vue from 'vue'
import swipeModal from '@takuma-ru/vue-swipe-modal'

Vue.component('swipe-modal', swipeModal)
```

<br>

### 3. Update nuxt.config
Add the following code to the item named "plugins\[]".

```js [@/nuxt.config.js | .ts]
...

plugins: [
    { src: '@/plugins/swipe-modal.js', mode: 'client' },
],

...
```

<br>

### 4. Done!
You can use the `<swipe-modal>` tag in the vue file.

::alert
---
type: warn
---
Make sure to add the `<no-ssr>` tag at that time.
::

```vue [.vue file]
<template>
  <div>
    <button @click="modal = true">open</button>
    <no-ssr>
      <swipe-modal
        v-model="modal"
        contents-height="50vh"
        border-top-radius="16px"
      >
        <h1>contents</h1>
      </swipe-modal>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props) {
    const modal = ref(true)

    return { modal }
  },
})
</script>
```