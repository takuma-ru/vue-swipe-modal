<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import "core";

const props = defineProps<{
  open: boolean;
  snapPoint?: "auto" | string;
}>();
const emit = defineEmits<{
  (event: "onClose", value: boolean): void;
  (event: "update:open", value: boolean): void;
}>();
const modelValue = useVModel(props, "open", emit);

const onClose = () => {
  emit("onClose", false);
};
</script>

<template>
  <web-bottom-sheet
    :open="modelValue"
    :snap-point="props.snapPoint"
    is-fullscreen
    @on-close="onClose"
  >
    <slot />
  </web-bottom-sheet>
</template>
