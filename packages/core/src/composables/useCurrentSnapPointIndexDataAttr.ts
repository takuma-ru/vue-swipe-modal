type UseDataAttrProps = {
  dialogRef: globalThis.Ref<HTMLDialogElement | null>;
};

export const useCurrentSnapPointIndexDataAttr = ({
  dialogRef,
}: UseDataAttrProps) => {
  const currentSnapPointIndex = ref<number>(-1);

  const getCurrentSnapPointIndex = () => {
    const currentSnapPointIndex =
      dialogRef.value?.dataset.currentSnapPointIndex;

    if (!currentSnapPointIndex === undefined) {
      return undefined;
    }

    return Number(currentSnapPointIndex);
  };

  const currentSnapPointIndexObserver = new MutationObserver(() => {
    currentSnapPointIndex.value = getCurrentSnapPointIndex() || -1;
  });

  const setCurrentSnapPointIndex = (index: number) => {
    dialogRef.value?.setAttribute(
      "data-current-snap-point-index",
      index.toString(),
    );
  };

  onMounted(() => {
    if (!dialogRef.value) {
      return;
    }

    currentSnapPointIndexObserver.observe(dialogRef.value, {
      attributeFilter: ["data-current-snap-point-index"],
      attributes: true,
    });
  });

  return {
    currentSnapPointIndex: readonly(currentSnapPointIndex),
    getCurrentSnapPointIndex,
    setCurrentSnapPointIndex,
  };
};
