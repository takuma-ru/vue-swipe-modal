import { defineCustomElement } from "vue";
import WebBottomSheetCe from "./components/WebBottomSheet.ce.vue";
import WebBottomSheetSnapPointCe from "./components/WebBottomSheetSnapPoint.ce.vue";

const WebBottomSheet = defineCustomElement(WebBottomSheetCe);
customElements.define("web-bottom-sheet", WebBottomSheet);

const WebBottomSheetSnapPoint = defineCustomElement(WebBottomSheetSnapPointCe);
customElements.define("web-bottom-sheet-snap-point", WebBottomSheetSnapPoint);
