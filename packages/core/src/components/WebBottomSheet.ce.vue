<script setup lang="tsx">
import type { WebBottomSheetProps } from "../types/WebBottomSheet";

import { useAnimation } from "src/composables/useAnimation";
import { useDrag } from "src/composables/useDrag";
import { useSnapPoint } from "src/composables/useSnapPoint";
import { cssVar } from "src/utils/cssVar";
import { setPageScrollable } from "src/utils/setPageScrollable";
import { ref, watch } from "vue";

const {
  open = false,
  isBackdrop,
  isDragHandle,
  isFullscreen,
  isPersistent,
  isScrollLock,
} = defineProps<WebBottomSheetProps>();

const emit = defineEmits<{ close: [value: boolean] }>();

const internalOpen = ref(open);
const dialogRef = ref<HTMLDialogElement | null>(null);
const panelRef = ref<HTMLDivElement | null>(null);
const dragHandleWrapperRef = ref<HTMLDivElement | null>(null);
const panelObserverTargetRef = ref<HTMLDivElement | null>(null);

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
  panelRef,
});
const {
  dragAmountY,
  onDragStart,
  onDragging,
  onDragEnd,
  reset: resetDrag,
} = useDrag({
  panelRef,
  dragHandleWrapperRef,
});
const { move, moveToSnapPoint } = useAnimation({ dialogRef });

const { setCssVar, getCssVar } = cssVar(dialogRef);

// Event Handlers
const handleOpen = () => {
  if (isScrollLock) {
    setPageScrollable("hidden");
  }

  internalOpen.value = true;

  if (isBackdrop) {
    dialogRef.value?.showModal();
  }
  else {
    dialogRef.value?.show();
  }

  updateSnapPointIndex(
    () => 0,
    (props) => {
      moveToSnapPoint({ isFullscreen, ...props });
    },
  );
};

const handleClose = () => {
  resetSnapPointIndex(() => {
    emit("close", false);

    move("-100%", () => {
      dialogRef.value?.close();
      internalOpen.value = false;
      setCssVar("CURRENT_SNAP_POINT_POSITION_Y", "");
      resetDrag();
      resetSnapPoint();

      if (isScrollLock) {
        setPageScrollable("reset");
      }
    });
  });
};

const handleClickBackDrop = (e: MouseEvent | ToggleEvent) => {
  if (e.target === dialogRef.value && !isPersistent) {
    handleClose();
  }
};

// Drag Handlers
const handleDragging = (e: MouseEvent | TouchEvent) => {
  onDragging(e, () => {
    if (isOpenedFullscreen.value && dragAmountY.value > 0) {
      return;
    }

    panelRef.value?.style.setProperty("overflow-y", "hidden");
    dialogRef.value?.style.setProperty("will-change", "bottom");
    setCssVar(
      "BOTTOM",
      `clamp(-100%, calc(${getCssVar("CURRENT_SNAP_POINT_POSITION_Y")} + ${dragAmountY.value}px), 0px)`,
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
        moveToSnapPoint({ isFullscreen, ...props });
      });
    }
    case "drag-down": {
      return decrementSnapPointIndex((props) => {
        if (props.snapPointIndex < 0 && !isPersistent) {
          handleClose();
        }

        moveToSnapPoint({ isFullscreen, ...props });
      });
    }
    case "drag-cancel": {
      return move(getCssVar("CURRENT_SNAP_POINT_POSITION_Y"));
    }
    case "not-move": {
      return;
    }
    default: {
      return new Event("error");
    }
  }
};

// Watchers
watch(
  () => open,
  () => {
    if (open) {
      handleOpen();
    }
    else {
      handleClose();
    }
  },
);

// Render
defineRender(() => {
  return (
    <dialog
      ref={dialogRef}
      open={internalOpen.value}
      class="dialog"
      part="dialog"
      onTouchstart={e => e.stopPropagation()}
      onTouchmove={e => e.stopPropagation()}
      onTouchend={e => e.stopPropagation()}
      onMousedown={e => e.stopPropagation()}
      onMousemove={e => e.stopPropagation()}
      onMouseup={e => e.stopPropagation()}
      onClick={handleClickBackDrop}
    >
      <div
        class="bottom-sheet"
        onTouchstart={onDragStart}
        onTouchmove={handleDragging}
        onTouchend={handleDragEnd}
        onMousedown={onDragStart}
        onMousemove={handleDragging}
        onMouseup={handleDragEnd}
      >
        {isDragHandle && (
          <div ref={dragHandleWrapperRef} class="drag-handle-wrapper">
            <slot name="drag-handle">
              <div class="drag-handle-default">
                <div class="drag-handle-default-icon" />
              </div>
            </slot>
          </div>
        )}
        <div ref={panelRef} class="panel">
          <div ref={panelObserverTargetRef} class="panel-observer-target" />
          <slot />
        </div>
      </div>
    </dialog>
  );
});
</script>

<style lang="scss">
:host {
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.dialog {
  position: fixed !important;
  top: auto !important;
  bottom: var(--bottom, 0px);
  height: 100% !important;
  max-height: 100dvh !important;
  box-sizing: border-box;

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

.drag-handle-wrapper {
  grid-row: 1;
  isolation: isolate;
}

.drag-handle-default {
  top: 0;
  flex-shrink: 0;
  height: 36px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  > .drag-handle-default-icon {
    position: absolute;
    left: 50%;
    width: 32px;
    height: 4px;
    margin: 16px 0;
    content: "";
    background-color: #ccc;
    border-radius: 2px;
    transform: translateX(-50%);
  }
}

.panel {
  grid-row: 2;
  overflow: auto;

  .panel-observer-target {
    display: contents;
  }
}
</style>
