import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";
import { calcSnapPointPosition } from "../../utils/calcSnapPointPosition";

export class ModalAnimator {
  singleton: WebBottomSheetSingleton;

  constructor() {
    this.singleton = new WebBottomSheetSingleton();
  }

  open() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    const singleton = new WebBottomSheetSingleton();

    this.singleton.modalRef.value.style.setProperty("will-change", "bottom");
    this.singleton.modalRef.value.showModal();

    calcSnapPointPosition();

    this.singleton.modalRef.value.animate([
      { bottom: "-100%" },
      { bottom: singleton.snapPointPosition },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.modalRef?.value?.style.removeProperty("will-change");

      singleton.updatePositionStatus(this.singleton.props.snapPoint ? "snap" : "full");

      singleton.updateBottomValue(singleton.snapPointPosition);
    };
  }

  close() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    const singleton = new WebBottomSheetSingleton();

    this.singleton.modalRef.value.style.setProperty("will-change", "bottom");

    this.singleton.modalRef.value.animate([
      { bottom: singleton.bottom },
      { bottom: "-100%" },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.modalRef?.value?.close();
      this.singleton.modalRef?.value?.style.removeProperty("will-change");

      singleton.updateSnapPointPosition("close");
      singleton.updateBottomValue("-100%");
    };
  }

  cancel() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    this.singleton.modalRef.value.style.setProperty("will-change", "bottom");

    const calcToPositionBottom = () => {
      switch (this.singleton.positionStatus) {
        case "snap": {
          return this.singleton.props.snapPoint ? this.singleton.snapPointPosition : "0%";
        }
        case "full": {
          return "0%";
        }
        default: {
          return "-100%";
        }
      }
    };

    this.singleton.modalRef.value.animate([
      { bottom: this.singleton.bottom },
      { bottom: calcToPositionBottom() },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.modalRef?.value?.style.removeProperty("will-change");

      this.singleton.updateMovementAmountY(0);
      this.singleton.updateBottomValue(calcToPositionBottom());
    };
  }

  moveToSnapPoint() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    if (!this.singleton.props.snapPoint) {
      return;
    }

    this.singleton.modalRef.value.style.setProperty("will-change", "bottom");

    this.singleton.modalRef.value.animate([
      { bottom: this.singleton.bottom },
      { bottom: this.singleton.snapPointPosition },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.modalRef?.value?.style.removeProperty("will-change");

      this.singleton.updateMovementAmountY(0);
      this.singleton.updateBottomValue(this.singleton.snapPointPosition);
      this.singleton.updatePositionStatus("snap");
    };
  }

  moveToFull() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    this.singleton.modalRef.value.style.setProperty("will-change", "bottom");

    this.singleton.modalRef.value.animate([
      { bottom: this.singleton.bottom },
      { bottom: "0%" },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.modalRef?.value?.style.removeProperty("will-change");

      this.singleton.updateMovementAmountY(0);
      this.singleton.updateBottomValue("0%");
      this.singleton.updatePositionStatus("full");
    };
  }
}
