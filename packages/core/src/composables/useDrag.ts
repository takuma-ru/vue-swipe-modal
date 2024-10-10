type UseDragProps = {
  dialogRef: globalThis.Ref<HTMLDialogElement | null>;
  panelRef: globalThis.Ref<HTMLDivElement | null>;
};

type DragEventProps =
  | {
      event: MouseEvent;
      type: "mouse";
    }
  | {
      event: TouchEvent;
      type: "touch";
    };

export const useDrag = ({ dialogRef }: UseDragProps) => {
  const touchStartY = ref<number>(0);
  const diffY = ref<number>(0);

  const onMoveStart = ({ event, type }: DragEventProps) => {
    // event.preventDefault();

    if (type === "mouse") {
      touchStartY.value = event.clientY;
    } else {
      touchStartY.value = event.touches[0].clientY;
    }
  };

  const onMove = ({ event, type }: DragEventProps) => {
    // event.stopPropagation();

    if (type === "mouse") {
      diffY.value = touchStartY.value - event.clientY;
    } else {
      diffY.value = touchStartY.value - event.touches[0].clientY;
    }

    dialogRef.value?.style.setProperty(
      "--bottom",
      `clamp(-100%, calc(var(--current-snap-point-position-y) + ${diffY.value}px), 0px)`,
    );
  };

  const onMoveEnd = (
    act: ({
      status,
    }: { status: "scrolledUp" | "scrolledDown" | "noMovement" }) => void,
  ) => {
    if (diffY.value > 40) {
      return act({ status: "scrolledUp" });
    }

    if (diffY.value < -40) {
      return act({ status: "scrolledDown" });
    }

    act({ status: "noMovement" });
  };

  return {
    onMoveStart,
    onMove,
    onMoveEnd,
  };
};
