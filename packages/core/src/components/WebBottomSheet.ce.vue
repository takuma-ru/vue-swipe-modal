<script setup lang="ts">
import { ref, watch } from "vue";

import { useDrag } from "src/composables/useDrag";
import { useSnapPoint } from "src/composables/useSnapPoint";
import { setPageScrollable } from "src/utils/setPageScrollable";
import type { WebBottomSheetProps } from "../types/WebBottomSheet";

const KEY_FRAME_ANIMATION_OPTIONS = {
  duration: 300,
  easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
} as const satisfies KeyframeAnimationOptions;

const {
  open = false,
  isBackdrop = true,
  isDragHandle: _isDragHandle = true,
  isFullscreen = true,
  isPersistent = false,
  isScrollLock = true,
} = defineProps<WebBottomSheetProps>();

type WebBottomSheetEmits = { close: [value: boolean] };

const emit = defineEmits<WebBottomSheetEmits>();

const internalOpen = ref(open);
const dialogRef = ref<HTMLDialogElement | null>(null);
const panelRef = ref<HTMLDivElement | null>(null);
const panelObserverTargetRef = ref<HTMLDivElement | null>(null);
const currentSnapPointPositionY = ref<string>("");

const {
  isFullSnapped: _isFullSnapped,
  isOpenedFullscreen,
  updateSnapPointIndex,
  resetSnapPointIndex,
  incrementSnapPointIndex,
  decrementSnapPointIndex,
  reset: resetSnapPoint,
} = useSnapPoint({
  dialogRef,
});
const {
  dragAmountY,
  onDragStart,
  onDragging,
  onDragEnd,
  reset: resetDrag,
} = useDrag({
  panelRef,
});

// Animation
const move = (
  position: string,
  onFinish?: ({ position }: { position: string }) => void,
) => {
  if (!dialogRef.value?.open) {
    return;
  }

  dialogRef.value?.style.setProperty("will-change", "bottom");

  const animate = dialogRef.value.animate(
    [
      {
        bottom: dialogRef.value.style.getPropertyValue("--bottom") || "-100%",
      },
      {
        bottom: position,
      },
    ],
    KEY_FRAME_ANIMATION_OPTIONS,
  );

  animate.onfinish = () => {
    dialogRef.value?.style.setProperty("--bottom", position);
    dialogRef.value?.style.removeProperty("will-change");
    onFinish?.({ position });
  };
};

const moveToSnapPoint = ({
  snapPointIndex: _snapPointIndex,
  snapPointElement,
  isFullSnapped: _isFullSnapped,
  isOpenedFullscreen,
}: Parameters<
  NonNullable<Parameters<typeof updateSnapPointIndex>["1"]>
>["0"]) => {
  if (!dialogRef.value?.open) {
    return;
  }

  const dialogRect = dialogRef.value.getBoundingClientRect();
  const dialogRefTop = dialogRect.top + window.scrollY;
  const snapPointRect = snapPointElement?.getBoundingClientRect();
  const snapPointTop = snapPointRect?.top || 0 + window.scrollY;

  if (isOpenedFullscreen && isFullscreen) {
    move("0px", ({ position }) => {
      currentSnapPointPositionY.value = position;
    });
    return;
  }

  move(
    `calc(min(${snapPointTop - dialogRefTop}px - 100%, 0px))`,
    ({ position }) => {
      currentSnapPointPositionY.value = position;
    },
  );
};

const handleOpen = () => {
  if (isScrollLock) {
    setPageScrollable("hidden");
  }

  internalOpen.value = true;

  if (isBackdrop) {
    dialogRef.value?.showModal();
  } else {
    dialogRef.value?.show();
  }

  updateSnapPointIndex(
    () => 0,
    (props) => {
      moveToSnapPoint(props);
    },
  );
};

const handleClose = () => {
  resetSnapPointIndex(() => {
    move("-100%", () => {
      dialogRef.value?.close();
      internalOpen.value = false;
      currentSnapPointPositionY.value = "";
      resetDrag();
      resetSnapPoint();

      if (isScrollLock) {
        setPageScrollable("reset");
      }
    });
  });
};

const handleDragging = (e: MouseEvent | TouchEvent) => {
  onDragging(e, () => {
    if (isOpenedFullscreen.value && dragAmountY.value > 0) {
      return;
    }

    panelRef.value?.style.setProperty("overflow-y", "hidden");
    dialogRef.value?.style.setProperty("will-change", "bottom");
    dialogRef.value?.style.setProperty(
      "--bottom",
      `clamp(-100%, calc(${currentSnapPointPositionY.value} + ${dragAmountY.value}px), 0px)`,
    );
  });
};

const handleDragEnd = () => {
  const dragStatus = onDragEnd();

  dialogRef.value?.style.removeProperty("will-change");

  switch (dragStatus) {
    case "drag-up": {
      if (isOpenedFullscreen.value) {
        return;
      }

      return incrementSnapPointIndex((props) => {
        moveToSnapPoint(props);
      });
    }
    case "drag-down": {
      return decrementSnapPointIndex((props) => {
        if (props.snapPointIndex < 0 && !isPersistent) {
          emit("close", false);
          handleClose();
        }

        moveToSnapPoint(props);
      });
    }
    case "drag-cancel": {
      return move(currentSnapPointPositionY.value);
    }
    case "not-move": {
      return;
    }
    default: {
      return new Event("error");
    }
  }
};

watch(
  () => open,
  () => {
    if (open === true) {
      handleOpen();
    } else {
      handleClose();
    }
  },
);
</script>

<template>
  <dialog
    ref="dialogRef"
    :open="internalOpen"
    class="dialog"
    part="dialog"
    @touchstart="(e) => e.stopPropagation()"
    @touchmove="(e) => e.stopPropagation()"
    @touchend="(e) => e.stopPropagation()"
    @mousedown="(e) => e.stopPropagation()"
    @mousemove="(e) => e.stopPropagation()"
    @mouseup="(e) => e.stopPropagation()"
  >
    <div
      class="bottom-sheet"
      @touchstart="onDragStart"
      @touchmove="handleDragging"
      @touchend="handleDragEnd"
      @mousedown="onDragStart"
      @mousemove="handleDragging"
      @mouseup="handleDragEnd"
    >
      <div ref="panelRef" class="panel">
        <div ref="panelObserverTargetRef" class="panel-observer-target"></div>
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

    &::backdrop {
      user-select: none;
    }
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

    .panel-observer-target {
      display: contents;
    }
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
