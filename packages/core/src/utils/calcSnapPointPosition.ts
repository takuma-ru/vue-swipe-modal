import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";

export const calcSnapPointPosition = () => {
  const singleton = new WebBottomSheetSingleton();

  let snapPointValue: string;

  if (!singleton.props["snap-point"]) {
    snapPointValue = "0px";
  }
  else if (singleton.props["snap-point"] === "auto") {
    const panelRefHeight = singleton.panelRef?.value?.getBoundingClientRect().height || 0;
    snapPointValue = `calc(${panelRefHeight}px + 36px - 100%)`;
  }
  else {
    snapPointValue = `calc(${singleton.props["snap-point"]} - 100%)`;
  }

  singleton.updateSnapPointPosition(snapPointValue);
};
