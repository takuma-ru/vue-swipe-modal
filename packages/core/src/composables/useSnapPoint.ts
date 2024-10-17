import { type Ref, readonly, ref, watch } from "vue";

type UseSnapPointParams = {
  dialogRef: Ref<HTMLDialogElement | null>;
  panelRef: Ref<HTMLDivElement | null>;
};

export const useSnapPoint = ({ panelRef }: UseSnapPointParams) => {
  /**
   * The index of the snap point.
   */
  const snapPointIndex = ref<number>(-1);
  const snapPointElements = ref<HTMLElement[]>([]);

  const isFullSnapped = ref<boolean>(false);
  const isOpenedFullscreen = ref<boolean>(false);

  const updateSnapPointIndex = (
    updateFn: (currentValue: number) => number,
    callback?: ({
      snapPointIndex,
      snapPointElement,
      isFullSnapped,
      isOpenedFullscreen,
    }: {
      snapPointIndex: number;
      snapPointElement?: HTMLElement;
      isFullSnapped: boolean;
      isOpenedFullscreen: boolean;
    }) => void,
  ) => {
    const prev = snapPointIndex.value;
    const next = updateFn(prev);

    snapPointIndex.value = next;

    isFullSnapped.value = next >= snapPointElements.value.length - 1;
    isOpenedFullscreen.value = next >= snapPointElements.value.length;

    callback?.({
      snapPointIndex: next,
      snapPointElement: snapPointElements.value.at(next),
      isFullSnapped: next >= snapPointElements.value.length - 1,
      isOpenedFullscreen: next >= snapPointElements.value.length,
    });
  };

  const resetSnapPointIndex = (
    callback?: Parameters<typeof updateSnapPointIndex>["1"],
  ) => {
    return updateSnapPointIndex(() => -1, callback);
  };

  const incrementSnapPointIndex = (
    callback?: Parameters<typeof updateSnapPointIndex>["1"],
  ) => {
    return updateSnapPointIndex((currentValue) => currentValue + 1, callback);
  };

  const decrementSnapPointIndex = (
    callback?: Parameters<typeof updateSnapPointIndex>["1"],
  ) => {
    return updateSnapPointIndex((currentValue) => currentValue - 1, callback);
  };

  const reset = () => {
    snapPointIndex.value = -1;
    isFullSnapped.value = false;
    isOpenedFullscreen.value = false;
  };

  /* watch(
    dialogRef,
    (dialog) => {
      if (!dialog) {
        return;
      }

      const observer = new MutationObserver(() => {
        const index = Number(dialog.dataset.currentSnapPointIndex);
        snapPointIndex.value = index;
      });

      observer.observe(dialog, {
        attributeFilter: ["data-current-snap-point-index"],
        attributes: true,
      });
    },
    { immediate: true },
  ); */

  watch(
    panelRef,
    () => {
      const findSnapPoints = (node: Node, snapPoints: HTMLElement[]) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          if (element.nodeName === "WEB-BOTTOM-SHEET") {
            return;
          }

          if (element.nodeName === "WEB-BOTTOM-SHEET-SNAP-POINT") {
            snapPoints.push(element);
          }

          for (const child of element.childNodes) {
            findSnapPoints(child, snapPoints);
          }
        }
      };

      const slotElement = panelRef.value?.querySelector("slot");

      if (slotElement) {
        const assignedNodes = slotElement.assignedNodes();
        for (const node of assignedNodes) {
          findSnapPoints(node, snapPointElements.value);
        }
      }
    },
    {
      immediate: true,
    },
  );

  return {
    snapPointIndex: readonly(snapPointIndex),
    isFullSnapped,
    isOpenedFullscreen,
    updateSnapPointIndex,
    resetSnapPointIndex,
    incrementSnapPointIndex,
    decrementSnapPointIndex,
    reset,
  };
};
