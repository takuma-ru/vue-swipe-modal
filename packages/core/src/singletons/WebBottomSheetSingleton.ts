import type { Ref } from "lit/directives/ref.js";
import type { WebBottomSheetProps } from "../types/web-bottom-sheet.type";

export class WebBottomSheetSingleton {
  static instance: WebBottomSheetSingleton;

  // == state ==
  bottom = "-100%";
  movementAmountY = 0;
  snapPointPosition = "auto";
  positionStatus: "full" | "snap" | "close" = "close";

  modalRef: Ref<HTMLDialogElement> | undefined;

  panelRef: Ref<HTMLDivElement> | undefined;

  props: WebBottomSheetProps = {};

  // == state change methods ==
  updateBottomValue(value: typeof this.bottom) {
    this.bottom = value;

    this.modalRef?.value?.style.setProperty("--bottom", value);
  }

  updateMovementAmountY(value: typeof this.movementAmountY) {
    this.movementAmountY = value;
  }

  updateSnapPointPosition(value: typeof this.snapPointPosition) {
    this.snapPointPosition = value;
  }

  updatePositionStatus(value: typeof this.positionStatus) {
    this.positionStatus = value;
  }

  setModalRef(value: typeof this.modalRef) {
    this.modalRef = value;
  }

  setPanelRef(value: typeof this.panelRef) {
    this.panelRef = value;
  }

  setProps(value: typeof this.props) {
    this.props = value;
  }

  // == event methods ==
  dispatchOnCloseEvent() {
    this.modalRef?.value?.dispatchEvent(
      new CustomEvent("on-close", { bubbles: true, composed: true }),
    );
  }

  dispatchOnChangePositionStatusEvent() {
    this.modalRef?.value?.dispatchEvent(
      new CustomEvent("on-change-position-status", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  addWillChangeBottom() {
    this.modalRef?.value?.style.setProperty("will-change", "bottom");
  }

  removeWillChangeBottom() {
    this.modalRef?.value?.style.removeProperty("will-change");
  }

  // == constructor ==
  constructor() {
    if (WebBottomSheetSingleton.instance) {
      // biome-ignore lint/correctness/noConstructorReturn: <explanation>
      return WebBottomSheetSingleton.instance;
    }

    WebBottomSheetSingleton.instance = this;
  }
}
