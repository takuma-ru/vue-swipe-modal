<script setup lang="ts">
import SwipeModal from "../components/NewSwipeModal.vue"

const isOpen = ref(false)

const contentRef = ref<HTMLDivElement | null>(null)

const props = ref([
  { name: "isBackdrop", value: true },
  { name: "isDragHandle", value: true },
  { name: "isPersistent", value: false },
  { name: "isScrollLock", value: true },
  { name: "isSnapPoint", value: true },
])

const getPropsValue = (propName: string) => {
  const prop = props.value.find((prop) => prop.name === propName)

  return prop?.value
}

const array = computed(() => {
  return [...Array(100)].map((_, i) => i)
})
</script>

<template>
  <button @click="isOpen = true">open modal</button>
  <p>
    {{ isOpen }}
  </p>

  <div class="props-list">
    <template
      v-for="prop in props"
      :key="prop"
    >
      <div>
        <input
          v-model="prop.value"
          class="checkbox"
          type="checkbox"
        />
        <label for="checkbox">{{ prop.name }}</label>
      </div>
    </template>
  </div>

  <p
    v-for="item in array"
    :key="item"
  >
    {{ item }}
  </p>

  <button @click="isOpen = !isOpen">open modal</button>

  <SwipeModal
    v-model="isOpen"
    :snap-point="
      getPropsValue('isSnapPoint')
        ? `${(contentRef?.getBoundingClientRect().height || 0) + 36}px`
        : undefined
    "
    :is-backdrop="getPropsValue('isBackdrop')"
    :is-drag-handle="getPropsValue('isDragHandle')"
    :is-persistent="getPropsValue('isPersistent')"
    :is-scroll-lock="getPropsValue('isScrollLock')"
  >
    <div
      ref="contentRef"
      :class="$style['modal-content']"
    >
      <button @click="isOpen = false">close modal</button>
      <h3>Red line is this element's area.</h3>
      height is auto.
    </div>
    <p
      v-for="item in array"
      :key="item"
    >
      {{ item }}
    </p>
  </SwipeModal>
</template>

<style module lang="scss">
html {
  margin: 0;
}

.props-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-panel {
  box-sizing: border-box;
  width: 100%;
  height: 80dvh;
  color: white;
  background-color: #1d1b20;
  border-radius: 1rem 1rem 0 0;

  @media (prefers-color-scheme: light) {
    color: black;
    background-color: #f7f2fa;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
  }
}

.modal-content {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  outline: 1px solid red;
  outline-offset: -1px;
}
</style>
