import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";
import { calcSnapPointPosition } from "../../utils/calcSnapPointPosition";
import { setPageScrollable } from "../../utils/setPageScrollable";

export class ModalAnimator {
  private singleton: WebBottomSheetSingleton;

  constructor() {
    this.singleton = new WebBottomSheetSingleton();
  }

  open() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    if (this.singleton.props["is-backdrop"]) {
      this.singleton.modalRef.value.showModal();
    }
    else {
      this.singleton.modalRef.value.show();
    }

    calcSnapPointPosition();

    this.singleton.addWillChangeBottom();

    this.singleton.modalRef.value.animate([
      { bottom: "-100%" },
      { bottom: this.singleton.snapPointPosition },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.updatePositionStatus(this.singleton.props["snap-point"] ? "snap" : "full");
      this.singleton.updateBottomValue(this.singleton.snapPointPosition);

      if (this.singleton.props["is-scroll-lock"]) {
        setPageScrollable("hidden");
      }

      this.singleton.removeWillChangeBottom();
    };
  }

  close() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    this.singleton.addWillChangeBottom();

    this.singleton.modalRef.value.animate([
      { bottom: this.singleton.bottom },
      { bottom: "-100%" },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.modalRef?.value?.close();

      this.singleton.updateSnapPointPosition("auto");
      this.singleton.updateBottomValue("-100%");
      this.singleton.updatePositionStatus("close");

      setPageScrollable("reset");

      this.singleton.removeWillChangeBottom();
    };
  }

  cancel() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    const calcToPositionBottom = () => {
      switch (this.singleton.positionStatus) {
        case "snap": {
          return this.singleton.props["snap-point"] ? this.singleton.snapPointPosition : "0%";
        }
        case "full": {
          return "0%";
        }
        default: {
          return "-100%";
        }
      }
    };

    this.singleton.addWillChangeBottom();

    this.singleton.modalRef.value.animate([
      { bottom: this.singleton.bottom },
      { bottom: calcToPositionBottom() },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.updateMovementAmountY(0);
      this.singleton.updateBottomValue(calcToPositionBottom());

      this.singleton.removeWillChangeBottom();
    };
  }

  moveToSnapPoint() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    if (!this.singleton.props["snap-point"]) {
      return;
    }

    this.singleton.addWillChangeBottom();

    this.singleton.modalRef.value.animate([
      { bottom: this.singleton.bottom },
      { bottom: this.singleton.snapPointPosition },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.updateMovementAmountY(0);
      this.singleton.updateBottomValue(this.singleton.snapPointPosition);
      this.singleton.updatePositionStatus("snap");

      this.singleton.removeWillChangeBottom();
    };
  }

  moveToFull() {
    if (!this.singleton.modalRef?.value) {
      return;
    }

    this.singleton.addWillChangeBottom();

    this.singleton.modalRef.value.animate([
      { bottom: this.singleton.bottom },
      { bottom: "0%" },
    ], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
    }).onfinish = () => {
      this.singleton.updateMovementAmountY(0);
      this.singleton.updateBottomValue("0%");
      this.singleton.updatePositionStatus("full");

      this.singleton.removeWillChangeBottom();
    };
  }
}
