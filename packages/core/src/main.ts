// import "@lit-labs/ssr-client/lit-element-hydrate-support.js";
import { WebBottomSheet } from "./components/web-bottom-sheet.ce";
import { WebBottomSheetProps } from "./types/web-bottom-sheet.type";
import {
  CloseEvent,
  ChangePositionStatusEvent,
} from "./singletons/WebBottomSheetSingleton";

export { WebBottomSheet, CloseEvent, ChangePositionStatusEvent };
export type { WebBottomSheetProps };

export default WebBottomSheet;
