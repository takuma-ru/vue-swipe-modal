import { defineCustomElement } from "vue";
import WebBottomSheetCe from "./components/WebBottomSheet.ce.vue";
import WebBottomSheetSnapPointCe from "./components/WebBottomSheetSnapPoint.ce.vue";
// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { WebBottomSheetProps } from "./types/WebBottomSheet";

const WebBottomSheet = defineCustomElement(WebBottomSheetCe);

const WebBottomSheetSnapPoint = defineCustomElement(WebBottomSheetSnapPointCe);

export const resister = () => {
  customElements.define("web-bottom-sheet", WebBottomSheet);
  customElements.define("web-bottom-sheet-snap-point", WebBottomSheetSnapPoint);
};

declare module "vue" {
  export interface GlobalComponents {
    WebBottomSheet: typeof WebBottomSheet;
    WebBottomSheetSnapPoint: typeof WebBottomSheetSnapPoint;
  }
}

export { WebBottomSheet, WebBottomSheetSnapPoint };
export type { WebBottomSheetProps };
