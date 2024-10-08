import { useAnimation } from "./useAnimation";

type UseSnapProps = {
  dialogRef: globalThis.Ref<HTMLDialogElement | null>;
  panelRef: globalThis.Ref<HTMLDivElement | null>;
};

export const useSnap = ({ dialogRef, panelRef }: UseSnapProps) => {
  const { move } = useAnimation({ dialogRef });

  const snapPointElements = ref<HTMLElement[]>([]);
  const currentSnapPointIndex = ref<number>(-1);

  const snapToIndex = (index: number) => {
    if (index < 0 || index >= snapPointElements.value.length) {
      return;
    }

    if (!dialogRef.value?.open) {
      return;
    }

    const snapPoint = snapPointElements.value[index];
    const dialogRect = dialogRef.value.getBoundingClientRect();
    const snapPointRect = snapPoint.getBoundingClientRect();
    const dialogRefTop = dialogRect.top + window.scrollY;
    const snapPointTop = snapPointRect.top + window.scrollY;

    if (snapPoint) {
      move(`calc(min(${snapPointTop - dialogRefTop}px - 100%, 0px))`);
    }
  };
  const snapToNext = () => {
    currentSnapPointIndex.value += 1;
    snapToIndex(currentSnapPointIndex.value);
  };
  const snapToPrevious = () => {
    currentSnapPointIndex.value -= 1;
    snapToIndex(currentSnapPointIndex.value);
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
  watchEffect(() => {
    const slotElement = dialogRef.value?.querySelector("slot");

    if (slotElement) {
      const assignedNodes = slotElement.assignedNodes();
      for (const node of assignedNodes) {
        findSnapPoints(node, snapPointElements.value);
      }

      if (snapPointElements.value.length > 0) {
        currentSnapPointIndex.value = 0;
        panelRef.value?.style.setProperty("overflow-y", "hidden");
      }
    }
  });

  return {
    currentSnapPointIndex: readonly(currentSnapPointIndex),
    snapToIndex,
    snapToNext,
    snapToPrevious,
  };
};
