import { useAnimation } from "src/composables/useAnimation";
import type { WebBottomSheetProps } from "src/types/WebBottomSheet";

type UseSnapProps = {
  dialogRef: globalThis.Ref<HTMLDialogElement | null>;
  panelRef: globalThis.Ref<HTMLDivElement | null>;
  isFullscreen?: WebBottomSheetProps["isFullscreen"];
};

export const useSnap = ({ dialogRef, panelRef }: UseSnapProps) => {
  const { move } = useAnimation({ dialogRef });

  const snapPointElements = ref<HTMLElement[]>([]);
  const currentSnapPointIndex = ref<number>(-1);

  const isFullSnapped = computed(
    () => currentSnapPointIndex.value >= snapPointElements.value.length - 1,
  );

  const isOpenedFullscreen = computed(
    () => currentSnapPointIndex.value >= snapPointElements.value.length,
  );

  const snapToIndex = (index: number, onFinish?: () => void) => {
    if (!dialogRef.value?.open || isOpenedFullscreen.value) {
      return;
    }

    currentSnapPointIndex.value = index;

    const snapPoint = snapPointElements.value.at(index);

    const dialogRect = dialogRef.value.getBoundingClientRect();
    const dialogRefTop = dialogRect.top + window.scrollY;
    const snapPointRect = snapPoint?.getBoundingClientRect();
    const snapPointTop = snapPointRect?.top || 0 + window.scrollY;

    if (isFullSnapped.value) {
      move("0px", ({ position }) => {
        dialogRef.value?.style.setProperty(
          "--current-snap-point-position-y",
          position,
        );
        onFinish?.();
      });
      return;
    }

    if (snapPoint) {
      move(
        `calc(min(${snapPointTop - dialogRefTop}px - 100%, 0px))`,
        ({ position }) => {
          dialogRef.value?.style.setProperty(
            "--current-snap-point-position-y",
            position,
          );
          onFinish?.();
        },
      );
      return;
    }

    move("-100%", () => {
      dialogRef.value?.style.removeProperty("--current-snap-point-position-y");
      onFinish?.();
    });
  };
  const snapToNext = () => {
    snapToIndex(currentSnapPointIndex.value + 1);
  };
  const snapToPrevious = () => {
    snapToIndex(currentSnapPointIndex.value - 1);
  };

  const findSnapPoints = (node: Node, snapPoints: HTMLElement[]) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (element.nodeName === "WEB-BOTTOM-SHEET-SNAP-POINT") {
        snapPoints.push(element);
      }
      for (const child of element.childNodes) {
        findSnapPoints(child, snapPoints);
      }
    }
  };
  watch(
    [dialogRef, panelRef],
    () => {
      const slotElement = dialogRef.value?.querySelector("slot");

      if (slotElement) {
        const assignedNodes = slotElement.assignedNodes();
        for (const node of assignedNodes) {
          findSnapPoints(node, snapPointElements.value);
        }

        if (snapPointElements.value.length > 0) {
          currentSnapPointIndex.value = -1;
          panelRef.value?.style.setProperty("overflow-y", "hidden");
        }
      }
    },
    {
      immediate: true,
    },
  );

  return {
    isFullSnapped,
    snapToIndex,
    snapToNext,
    snapToPrevious,
  };
};
