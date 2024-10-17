import { defineCustomElement } from "vue";
import WebBottomSheetCe from "./components/WebBottomSheet.ce.vue";
import WebBottomSheetSnapPointCe from "./components/WebBottomSheetSnapPoint.ce.vue";
// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { WebBottomSheetProps } from "./types/WebBottomSheet";

const WebBottomSheet = defineCustomElement(WebBottomSheetCe);

const WebBottomSheetSnapPoint = defineCustomElement(WebBottomSheetSnapPointCe);

type ResistTypes = ("web-bottom-sheet" | "web-bottom-sheet-snap-point")[];
export const resister = (resistTypes?: ResistTypes) => {
  const isResisted = (tagName: string) =>
    customElements.get(tagName) !== undefined;

  const resist = (tagName: string, component: CustomElementConstructor) => {
    if (isResisted(tagName)) return;

    customElements.define(tagName, component);
  };

  if (resistTypes === undefined || resistTypes.length === 0) {
    resist("web-bottom-sheet", WebBottomSheet);
    resist("web-bottom-sheet-snap-point", WebBottomSheetSnapPoint);

    return;
  }

  if (resistTypes.includes("web-bottom-sheet")) {
    resist("web-bottom-sheet", WebBottomSheet);
  }

  if (resistTypes.includes("web-bottom-sheet-snap-point")) {
    resist("web-bottom-sheet-snap-point", WebBottomSheetSnapPoint);
  }
};

declare module "vue" {
  export interface GlobalComponents {
    WebBottomSheet: typeof WebBottomSheet;
    WebBottomSheetSnapPoint: typeof WebBottomSheetSnapPoint;
  }
}

export { WebBottomSheet, WebBottomSheetSnapPoint };
export type { WebBottomSheetProps };
