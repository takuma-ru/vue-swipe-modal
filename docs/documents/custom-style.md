# Custom style

## Panel
```vue{4}
<template>
  <SwipeModal
    v-model="isOpen"
    class="/* custom class name */"
  >
    modal content
  </SwipeModal>
</template>
```

## DragHandle
```vue{3-5}
<template>
  <SwipeModal v-model="isOpen">
    <template v-slot:drag-handle>
      <div class="/* custom drag-handle class name */" />
    </template>
  </SwipeModal>
</template>
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
```