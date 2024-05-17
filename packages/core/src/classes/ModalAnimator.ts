import type { Ref } from "lit/directives/ref.js";
import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";
import { calcSnapPointPosition } from "../utils/calcSnapPointPosition";
import type { WebBottomSheetProps } from "../components/web-bottom-sheet.ce";

export class ModalAnimator {
  private modalRef: Ref<HTMLDialogElement>["value"];
  private panelRef: Ref<HTMLDivElement>["value"] | undefined;
  private snapPoint: WebBottomSheetProps["snapPoint"] = "auto";

  constructor({
    modalRef,
    panelRef,
    snapPoint,
  }:
    {
      modalRef: Ref<HTMLDialogElement>["value"];
      panelRef: Ref<HTMLDivElement>["value"];
      snapPoint: WebBottomSheetProps["snapPoint"];
    },
  ) {
    this.modalRef = modalRef;
    this.panelRef = panelRef;
    this.snapPoint = snapPoint;
  }

  open() {
    if (!this.modalRef)
      return;

    const webBottomSheetSingleton = new WebBottomSheetSingleton();

    this.modalRef.style.setProperty("will-change", "bottom");
    this.modalRef.showModal();

    calcSnapPointPosition({
      snapPoint: this.snapPoint,
      panelRef: this.panelRef,
    });

    this.modalRef.animate([
      { bottom: "-100%" },
      { bottom: webBottomSheetSingleton.snapPointPosition },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.modalRef?.style.removeProperty("will-change");

      webBottomSheetSingleton.updatePositionStatus(this.snapPoint === "auto" ? "snap" : "full");
      webBottomSheetSingleton.updateBottomValue(webBottomSheetSingleton.snapPointPosition);
    };
  }

  close() {
    if (!this.modalRef)
      return;

    const webBottomSheetSingleton = new WebBottomSheetSingleton();

    this.modalRef.style.setProperty("will-change", "bottom");

    this.modalRef.animate([
      { bottom: webBottomSheetSingleton.bottom },
      { bottom: "-100%" },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.modalRef?.close();
      this.modalRef?.style.removeProperty("will-change");

      webBottomSheetSingleton.updateSnapPointPosition("close");
      webBottomSheetSingleton.updateBottomValue("-100%");
    };
  }
}
