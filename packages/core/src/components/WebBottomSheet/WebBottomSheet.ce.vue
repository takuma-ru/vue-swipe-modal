<script setup lang="ts">
type Props = {
  isBackdrop?: boolean;
  isDragHandle?: boolean;
  isFullscreen?: boolean;
  isPersistent?: boolean;
  isScrollLock?: boolean;
};

const {
  isBackdrop = true,
  isDragHandle = true,
  isFullscreen = true,
  isPersistent = false,
  isScrollLock = true,
} = defineProps<Props>();

const open = defineModel("open", {
  type: Boolean,
  default: false,
});
</script>

<template>
  <dialog :open="open">
    <slot />
  </dialog>
</template>

<style lang="scss" scoped></style>
