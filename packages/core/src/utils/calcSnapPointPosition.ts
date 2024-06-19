import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";

export const calcSnapPointPosition = () => {
  const singleton = new WebBottomSheetSingleton();

  const snapPoint = singleton.props["snap-point"];
  let snapPointValue = "0px";

  if (snapPoint) {
    if (snapPoint === "auto") {
      const panelRefHeight =
        singleton.panelRef?.value?.getBoundingClientRect().height || 0;
      const dragHandleWrapperRefHeight =
        singleton.panelRef?.value?.getBoundingClientRect().height || 0;

      snapPointValue = `calc(${panelRefHeight}px + ${dragHandleWrapperRefHeight}px - 100%)`;
    } else {
      snapPointValue = `calc(${snapPoint} - 100%)`;
    }
  }

  singleton.updateSnapPointPosition(snapPointValue);
};
