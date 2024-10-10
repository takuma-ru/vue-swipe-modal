import { useAnimation } from "src/hooks/useAnimation";
import { useSnap } from "src/hooks/useSnap";

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

export const useDrag = ({ dialogRef, panelRef }: UseDragProps) => {
  const { move } = useAnimation({ dialogRef });
  const { snapToNext, snapToPrevious } = useSnap({ dialogRef, panelRef });

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
    event.stopPropagation();

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

  const onMoveEnd = () => {
    if (diffY.value > 40) {
      snapToNext();
      return;
    }

    if (diffY.value < -40) {
      snapToPrevious();
      return;
    }

    move("var(--current-snap-point-position-y)");
  };

  return {
    onMoveStart,
    onMove,
    onMoveEnd,
  };
};
