<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import type { WebBottomSheetProps } from "@web-bottom-sheet/core";
import { onMounted, ref } from "vue";

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const props = withDefaults(
  defineProps<{
    open?: WebBottomSheetProps["open"];
    snapPoint?: WebBottomSheetProps["snap-point"];
    isBackdrop?: WebBottomSheetProps["is-backdrop"];
    isDragHandle?: WebBottomSheetProps["is-drag-handle"];
    isFullscreen?: WebBottomSheetProps["is-fullscreen"];
    isPersistent?: WebBottomSheetProps["is-persistent"];
    isScrollLock?: WebBottomSheetProps["is-scroll-lock"];
  }>(),
  {
    open: false,
    snapPoint: "auto",
    isBackdrop: true,
    isDragHandle: true,
    isFullscreen: true,
    isPersistent: false,
    isScrollLock: true,
  }
);

const emit = defineEmits<{
  (event: "onClose", value: boolean): void;
  (event: "onLoaded"): void;
  (event: "update:open", value: boolean): void;
}>();
// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
const modelValue = useVModel(props, "open", emit);
const onClose = () => {
  emit("onClose", false);
};
const onLoaded = () => {
  emit("onLoaded");
};

const isLoaded = ref(false);
onMounted(() => {
  customElements.whenDefined("web-bottom-sheet").then(() => {
    isLoaded.value = true;
    onLoaded();
  });
});
</script>

<template>
  <template v-if="isLoaded">
    <web-bottom-sheet
      :open="modelValue"
      :snap-point="props.snapPoint"
      :is-backdrop="props.isBackdrop"
      :is-drag-handle="props.isDragHandle"
      :is-fullscreen="props.isFullscreen"
      :is-persistent="props.isPersistent"
      :is-scroll-lock="props.isScrollLock"
      @on-close="onClose"
    >
      <slot />
    </web-bottom-sheet>
  </template>
  <template v-else>
    <div id="web-bottom-sheet-skeleton" />
  </template>
</template>
