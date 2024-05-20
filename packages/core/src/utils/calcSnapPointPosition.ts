import { WebBottomSheetSingleton } from "../components/singletons/WebBottomSheetSingleton";

export const calcSnapPointPosition = () => {
  const singleton = new WebBottomSheetSingleton();

  let snapPointValue: string;

  if (!singleton.props.snapPoint) {
    snapPointValue = "0px";
  }
  else if (singleton.props.snapPoint === "auto") {
    const panelRefHeight = singleton.panelRef?.value?.getBoundingClientRect().height || 0;
    snapPointValue = `calc(${panelRefHeight}px + 36px - 100%)`;
  }
  else {
    snapPointValue = `calc(${singleton.props.snapPoint} - 100%)`;
  }

  singleton.updateSnapPointPosition(snapPointValue);
};
