# Custom style

## Panel
Override the style using `:deep()` functionality provided by Vue.

```vue{10-12}
<template>
  <main>
    <SwipeModal v-model="isOpen">
      modal content
    </SwipeModal>
  </main>
</template>

<style scoped>
:deep(.modal-style) {
  /* custom style */
}
</style>
```
::: danger
Do not specify `height`.
Modal height must be specified with [`snapPoint`](/documents/properties.html#snappoint) prop.
:::

## DragHandle
```vue{3-5}
<template>
  <SwipeModal v-model="isOpen">
    <template v-slot:drag-handle>
      <div class="/* custom drag-handle class name */" />
    </template>
  </SwipeModal>
</template>

<style module> or <style scoped>
./* class name */ {
  /* custom style */
}
</style>
```

## Backdrop
```vue{3-5}
<template>
  <SwipeModal v-model="isOpen">
    <template v-slot:backdrop>
      <div class="/* custom backdrop class name */" />
    </template>
  </SwipeModal>
</template>

<style module> or <style scoped>
./* class name */ {
  /* custom style */
}
```