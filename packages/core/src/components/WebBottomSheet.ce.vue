<script setup lang="ts">
import { useAnimation } from "../hooks/useAnimation";
import { useSnap } from "../hooks/useSnap";

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

console.info({
  isBackdrop,
  isDragHandle,
  isFullscreen,
  isPersistent,
  isScrollLock,
});

const open = defineModel<boolean>("open", {
  type: Boolean,
  default: false,
});
const internalOpen = ref(open.value);

const dialogRef = ref<HTMLDialogElement | null>(null);
const panelRef = ref<HTMLDivElement | null>(null);

const { currentSnapPointIndex, snapToIndex } = useSnap({
  dialogRef,
  panelRef,
});

const { move } = useAnimation({ dialogRef });

watch(open, (value) => {
  if (value === true) {
    internalOpen.value = true;
    dialogRef.value?.showModal();
    snapToIndex(currentSnapPointIndex.value);
  } else {
    move("-100%", () => {
      internalOpen.value = false;
      dialogRef.value?.close();
    });
  }
});
</script>

<template>
  <dialog
    ref="dialogRef"
    :open="internalOpen"
    class="dialog"
    part="dialog"
  >
    <div class="bottom-sheet">
      <div ref="panelRef" class="panel">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<style lang="scss">
  :host {
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  .dialog {
    position: fixed !important;
    top: auto !important;
    bottom: var(--bottom, 0px);
    margin: 0;
    // width: 100% !important;
    max-width: 100vw !important;
    // height: 100% !important;
    max-height: 100dvh !important;
  }

  .bottom-sheet {
    position: relative;
    overflow: hidden;
    height: 100%;
    display: grid !important;
    grid-template-rows: fit-content(100%) fit-content(100%) !important;
  }

  .drag-handle {
    grid-row: 1;
    isolation: isolate;
  }

  .panel {
    grid-row: 2;
    overflow: auto;
  }

  :host::part(dialog) {
    border: 1px solid #ccc;
    overflow-y: auto;
    padding: 0 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 8px;
    width: 100vw;
    height: 100%;
  }
</style>
