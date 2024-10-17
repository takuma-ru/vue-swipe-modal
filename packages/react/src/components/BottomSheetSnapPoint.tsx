import { resister } from "@web-bottom-sheet/core";
import { useEffect, type PropsWithChildren } from "react";

export const BottomSheetSnapPoint = (props: PropsWithChildren) => {
  const { children } = props;

  useEffect(() => {
    resister(["web-bottom-sheet"]);
  }, []);

  return <web-bottom-sheet-snap-point>{children}</web-bottom-sheet-snap-point>;
};
