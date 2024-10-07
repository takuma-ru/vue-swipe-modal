import { defineCustomElement } from "vue";
import WebBottomSheetCe from "./components/WebBottomSheet/WebBottomSheet.ce.vue";

const WebBottomSheet = defineCustomElement(WebBottomSheetCe);

customElements.define("web-bottom-sheet", WebBottomSheet);
