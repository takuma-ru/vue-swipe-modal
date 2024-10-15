<script setup lang="ts">
import { toReactive, useVModel } from "@vueuse/core";
import { type WebBottomSheetProps, resister } from "@web-bottom-sheet/core";
import { onMounted, ref } from "vue";

const DialogRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  open?: WebBottomSheetProps["open"];
  isBackdrop?: WebBottomSheetProps["isBackdrop"];
  isDragHandle?: WebBottomSheetProps["isDragHandle"];
  isFullscreen?: WebBottomSheetProps["isFullscreen"];
  isPersistent?: WebBottomSheetProps["isPersistent"];
  isScrollLock?: WebBottomSheetProps["isScrollLock"];
}>();

const { isBackdrop, isDragHandle, isFullscreen, isPersistent, isScrollLock } =
  toReactive(props);

const emit = defineEmits<{
  (event: "close", value: boolean): void;
  (event: "loaded"): void;
  (event: "update:open", value: boolean): void;
}>();
const modelValue = useVModel(props, "open", emit);
const onClose = () => {
  emit("close", false);
};
const onLoaded = () => {
  emit("loaded");
};

const isLoaded = ref(false);
onMounted(() => {
  resister();

  customElements.whenDefined("web-bottom-sheet").then(() => {
    isLoaded.value = true;
    onLoaded();
  });
});
</script>

<template>
  <template v-if="isLoaded">
    <web-bottom-sheet
      ref="DialogRef"
      :open="modelValue"
      :isBackdrop="isBackdrop"
      :isDragHandle="isDragHandle"
      :isFullscreen="isFullscreen"
      :isPersistent="isPersistent"
      :isScrollLock="isScrollLock"
      @close="onClose"
    >
      <slot />
    </web-bottom-sheet>
  </template>
  <template v-else>
    <div id="web-bottom-sheet-skeleton" />
  </template>
</template>
