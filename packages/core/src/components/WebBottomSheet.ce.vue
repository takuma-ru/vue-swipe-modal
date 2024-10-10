<script setup lang="ts">
import { useAnimation } from "src/composables/useAnimation";
import { useDrag } from "src/composables/useDrag";
import { useSnap } from "src/composables/useSnap";
import type { WebBottomSheetProps } from "src/types/WebBottomSheet";
import { setPageScrollable } from "src/utils/setPageScrollable";

const {
  isBackdrop = true,
  isDragHandle = true,
  isFullscreen = true,
  isPersistent = false,
  isScrollLock = true,
} = defineProps<WebBottomSheetProps>();

const open = defineModel<boolean>("open", {
  type: Boolean,
  default: false,
});

const internalOpen = ref(open.value);
const dialogRef = ref<HTMLDialogElement | null>(null);
const panelRef = ref<HTMLDivElement | null>(null);

const { snapToIndex, snapToNext, snapToPrevious } = useSnap({
  dialogRef,
  panelRef,
});
const { move } = useAnimation({ dialogRef });
const { onMoveStart, onMove, onMoveEnd } = useDrag({
  dialogRef,
  panelRef,
});

const handleMoveEnd = ({
  status,
}: Parameters<Parameters<typeof onMoveEnd>[0]>[0]) => {
  if (!open.value) {
    return;
  }

  console.log(status);

  switch (status) {
    case "scrolledUp": {
      snapToNext();
      break;
    }
    case "scrolledDown": {
      snapToPrevious();
      break;
    }
    case "noMovement": {
      move("var(--current-snap-point-position-y)");
      break;
    }
  }
};

watch(
  open,
  (value) => {
    if (value === true) {
      if (isScrollLock) {
        setPageScrollable("hidden");
      }

      internalOpen.value = true;
      dialogRef.value?.showModal();
      snapToIndex(0);
    } else {
      snapToIndex(-1, () => {
        setPageScrollable("reset");
        internalOpen.value = false;
        dialogRef.value?.close();
      });
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <dialog
    ref="dialogRef"
    :open="internalOpen"
    class="dialog"
    part="dialog"
  >
    <div
      class="bottom-sheet"
      @touchstart="(e) => onMoveStart({
        event: e,
        type: 'touch',
      })"
      @touchmove="(e) => onMove({
        event: e,
        type: 'touch',
      })"
      @touchend="onMoveEnd(handleMoveEnd)"
      @mousedown="(e) => onMoveStart({
        event: e,
        type: 'mouse',
      })"
      @mousemove="(e) => onMove({
        event: e,
        type: 'mouse',
      })"
      @mouseup="onMoveEnd(handleMoveEnd)"
    >
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
