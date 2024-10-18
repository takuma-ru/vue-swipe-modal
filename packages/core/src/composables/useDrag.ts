import { readonly, type Ref, ref } from "vue";

interface UseDragParams {
  panelRef: Ref<HTMLDivElement | null>;
  dragHandleWrapperRef: Ref<HTMLDivElement | null>;
}

export const useDrag = ({ panelRef, dragHandleWrapperRef }: UseDragParams) => {
  const isDragging = ref<boolean>(false);
  const dragStartY = ref<number>(0);
  const dragAmountY = ref<number>(0);

  const onDragStart = (e: MouseEvent | TouchEvent) => {
    isDragging.value = true;

    if (e instanceof MouseEvent) {
      dragStartY.value = e.y;
    }

    if (e instanceof TouchEvent) {
      dragStartY.value
        = e.targetTouches[0].clientY
        || e.touches[0].clientY
        || e.changedTouches[0].clientY;
    }
  };

  const onDragging = (e: MouseEvent | TouchEvent, act?: () => void) => {
    // e.preventDefault();
    e.stopPropagation();

    if (!isDragging.value) {
      return;
    }

    if (
      (panelRef.value?.scrollTop || 0) > 0
      && !dragHandleWrapperRef.value?.contains(e.target as Node)
    ) {
      isDragging.value = false;
      return;
    }

    if (e instanceof MouseEvent) {
      dragAmountY.value = dragStartY.value - e.y;
    }

    if (e instanceof TouchEvent) {
      dragAmountY.value
        = dragStartY.value
        - (e.targetTouches[0].clientY
          || e.touches[0].clientY
          || e.changedTouches[0].clientY);
    }

    act?.();
  };

  type ReturnOnDragEnd = "drag-up" | "drag-down" | "not-move" | "drag-cancel";

  const onDragEnd = (): ReturnOnDragEnd => {
    if (!isDragging.value) {
      return "not-move";
    }

    isDragging.value = false;
    panelRef.value?.style.removeProperty("overflow-y");

    let status: ReturnOnDragEnd = "drag-cancel";

    if (dragAmountY.value > 40) {
      status = "drag-up";
    }

    if (dragAmountY.value < -40) {
      status = "drag-down";
    }

    if (Math.abs(dragAmountY.value) < 0.5) {
      status = "not-move";
    }

    dragAmountY.value = 0;
    return status;
  };

  const reset = () => {
    isDragging.value = false;
    dragStartY.value = 0;
    dragAmountY.value = 0;
  };

  return {
    dragAmountY: readonly(dragAmountY),
    onDragStart,
    onDragging,
    onDragEnd,
    reset,
  };
};
