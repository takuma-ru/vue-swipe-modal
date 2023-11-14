# Properties

## modelValue (v-model) *
Controls the opening and closing of the modal.

| name      |                                 |
| --------- | ------------------------------- |
| attribute | `v-model`, `v-model:modelValue` |
| type      | `boolean` (require)             |
| default   | `undefined`                     |

```vue{3}
<template>
  <SwipeModal
    v-model="/* boolean */"
  >
    modal content
  </SwipeModal>
</template>
```

## isDragHandle

| name      |                        |
| --------- | ---------------------- |
| attribute | `is-drag-handle`       |
| type      | `boolean \| undefined` |
| default   | `true`                 |

```vue{4}
<template>
  <SwipeModal
    v-model="isOpen"
    :is-drag-handle="/* boolean */"
  >
    modal content
  </SwipeModal>
</template>
```

## d.ts
```ts
type PropsType = {
  modelValue: boolean
  isDragHandle?: boolean
  isBackdrop?: boolean
  isPersistent?: boolean
  isScrollLock?: boolean
  class?: HTMLAttributes["class"]
}
```