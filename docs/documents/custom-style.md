# Custom style

## Panel
```vue{4}
<template>
  <SwipeModal
    v-model="isOpen"
    :class="$style['/* class name */']"
  >
    modal content
  </SwipeModal>
</template>

<style module>
./* class name */ {
  /* custom style */
}
</style>
```
::: warning
**Scoped CSS** is not supported!<br>
Please use **Module CSS** instead: .....<br>
(A solution to this problem is currently under consideration.)
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