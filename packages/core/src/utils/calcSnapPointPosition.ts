import type { WebBottomSheet } from "../main";
import { WebBottomSheetSingleton } from "../components/singletons/WebBottomSheetSingleton";

export const calcSnapPointPosition = ({
  snapPoint,
  panelRef,
}: {
  snapPoint: WebBottomSheet["snapPoint"];
  panelRef: HTMLDivElement | undefined;
}) => {
  const webBottomSheetSingleton = new WebBottomSheetSingleton();

  let snapPointValue: string;

  if (!snapPoint) {
    snapPointValue = "0px";
  }
  else if (snapPoint === "auto") {
    const panelRefHeight = panelRef?.getBoundingClientRect().height || 0;
    snapPointValue = `calc(${panelRefHeight}px + 36px - 100%)`;
  }
  else {
    snapPointValue = `calc(${snapPoint} - 100%)`;
  }

  webBottomSheetSingleton.updateSnapPointPosition(snapPointValue);
};
