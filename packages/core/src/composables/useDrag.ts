import { type Ref, readonly, ref } from "vue";

type UseDragParams = {
  panelRef: Ref<HTMLDivElement | null>;
};

export const useDrag = ({ panelRef }: UseDragParams) => {
  const isDragging = ref<boolean>(false);
  const dragStartY = ref<number>(0);
  const dragAmountY = ref<number>(0);

  const onDragStart = (e: MouseEvent | TouchEvent) => {
    isDragging.value = true;

    if (e instanceof MouseEvent) {
      dragStartY.value = e.y;
    }

    if (e instanceof TouchEvent) {
      dragStartY.value =
        e.targetTouches[0].clientY ||
        e.touches[0].clientY ||
        e.changedTouches[0].clientY;
    }
  };

  const onDragging = (e: MouseEvent | TouchEvent, act?: () => void) => {
    // e.preventDefault();
    e.stopPropagation();

    if (!isDragging.value) {
      return;
    }

    if ((panelRef.value?.scrollTop || 0) > 0) {
      isDragging.value = false;
      return;
    }

    if (e instanceof MouseEvent) {
      dragAmountY.value = dragStartY.value - e.y;
    }

    if (e instanceof TouchEvent) {
      dragAmountY.value =
        dragStartY.value -
        (e.targetTouches[0].clientY ||
          e.touches[0].clientY ||
          e.changedTouches[0].clientY);
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

    if (dragAmountY.value > 40) {
      return "drag-up";
    }

    if (dragAmountY.value < -40) {
      return "drag-down";
    }

    if (Math.abs(dragAmountY.value) < 0.5) {
      return "not-move";
    }

    return "drag-cancel";
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
