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
A flag to indicate whether or not the "DragHandle" should be displayed at the top of the modal to indicate that it can be swiped to close.

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

![img](/imgs/properties/is-drag-handle.png)

## isBackdrop
Flag whether modal backdrops should be displayed or not.

| name      |                        |
| --------- | ---------------------- |
| attribute | `is-backdrop`          |
| type      | `boolean \| undefined` |
| default   | `true`                 |

```vue{4}
<template>
  <SwipeModal
    v-model="isOpen"
    :is-backdrop="/* boolean */"
  >
    modal content
  </SwipeModal>
</template>
```

## isPersistent
Specifying this prop disables the swipe-to-close action (i.e., swiping returns to the start of the swipe without closing).
Clicking on the backdrop no longer closes the modal.

| name      |                        |
| --------- | ---------------------- |
| attribute | `is-persistent`        |
| type      | `boolean \| undefined` |
| default   | `false`                |

```vue{4}
<template>
  <SwipeModal
    v-model="isOpen"
    :is-persistent="/* boolean */"
  >
    modal content
  </SwipeModal>
</template>
```

## isScrollLock
Flag to indicate whether the modal background should not be scrolled (= fixed scroll position) or not.

| name      |                        |
| --------- | ---------------------- |
| attribute | `is-scrollLock`        |
| type      | `boolean \| undefined` |
| default   | `true`                 |

```vue{4}
<template>
  <SwipeModal
    v-model="isOpen"
    :is-scrollLock="/* boolean */"
  >
    modal content
  </SwipeModal>
</template>
```

## class
Can specify a class to be applied to the panel portion of the modal.<br>
If undefined, the style of the library default state is applied.

| name      |                                        |
| --------- | -------------------------------------- |
| attribute | `class`                                |
| type      | `HTMLAttributes["class"] \| undefined` |
| default   | `undefined`                            |

```vue{4}
<template>
  <SwipeModal
    v-model="isOpen"
    :class="$style['/* class name */']"
  >
    modal content
  </SwipeModal>
</template>
```

::: warning
**Scoped CSS** is not supported!<br>
Please use **Module CSS** instead: .....<br>
(A solution to this problem is currently under consideration.)
:::

::: details Style to be applied when nothing is specified for class
The style of the material is designed to fit the Material 3.
```scss
.default-modal-style {
  box-sizing: border-box;
  width: 100%;
  height: 50dvh;
  color: white;
  background-color: #1d1b20;
  border-radius: 1rem 1rem 0 0;

  @media (prefers-color-scheme: light) {
    color: black;
    background-color: #f7f2fa;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
  }
}
```
:::

## .d.ts
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