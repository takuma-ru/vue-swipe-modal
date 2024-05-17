<script setup lang="ts">
import "core"

const props = defineProps<{
  open: boolean;
  snapPoint?: "auto" | String;
}>();
</script>

<template>
  <web-bottom-sheet :open="props.open" :snap-point="props.snapPoint">
    <slot></slot>
  </web-bottom-sheet>
</template>