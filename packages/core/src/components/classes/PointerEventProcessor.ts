import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";
import { ModalAnimator } from "./ModalAnimator";

type PointerType = "mouse" | "touch";

type PointerEventParameters
  = {
    type: Extract<PointerType, "mouse">;
    event: MouseEvent;
  } | {
    type: Extract<PointerType, "touch">;
    event: TouchEvent;
  };

export class PointerEventProcessor {
  singleton: WebBottomSheetSingleton;
  modalAnimator: ModalAnimator;

  private isDragging: boolean = false;
  private moveStartPositionY: number = 0;

  constructor() {
    this.singleton = new WebBottomSheetSingleton();
    this.modalAnimator = new ModalAnimator();
  }

  private processSwitcher({
    params,
    mouse,
    touch,
  }: {
    params: PointerEventParameters;
    mouse: (e: MouseEvent) => void;
    touch: (e: TouchEvent) => void;
  }) {
    switch (params.type) {
      case "mouse": {
        mouse(params.event);
        break;
      }
      case "touch": {
        touch(params.event);
        break;
      }
    }
  }

  onDown(params: PointerEventParameters) {
    this.processSwitcher({
      params,
      mouse: (event) => {
        this.moveStartPositionY = event.y;
      },
      touch: (event) => {
        this.moveStartPositionY = event.touches[0].clientY;
      },
    });

    this.isDragging = true;
  }

  onMove(params: PointerEventParameters) {
    if (!this.isDragging) {
      return;
    }

    this.processSwitcher({
      params,
      mouse: (event) => {
        this.singleton.updateMovementAmountY(event.y - this.moveStartPositionY);
      },
      touch: (event) => {
        this.singleton.updateMovementAmountY(event.touches[0].clientY - this.moveStartPositionY);
      },
    });

    if (
      (this.singleton.movementAmountY > 0
      && this.singleton.positionStatus === "full")
      || (this.singleton.modalRef?.value?.getBoundingClientRect().top || 0) < 0
    ) { return; }

    this.singleton.modalRef?.value?.style.setProperty("user-select", "none");

    if (this.singleton.positionStatus === "snap") {
      this.singleton.updateBottomValue(`calc(${this.singleton.snapPointPosition} - ${this.singleton.movementAmountY}px)`);

      return;
    }

    this.singleton.updateBottomValue(
      `calc(0% + ${this.singleton.movementAmountY}px)`,
    );
  }

  onUp() {
    this.isDragging = false;

    this.singleton.modalRef?.value?.style.removeProperty("user-select");

    if (Math.abs(this.singleton.movementAmountY) > 36) {
      switch (this.singleton.positionStatus) {
        case "full": {
          if (this.singleton.props.snapPoint) {
            this.modalAnimator.moveToSnapPoint();
            break;
          }

          if (this.singleton.props.isPersistent) {
            this.modalAnimator.cancel();
            break;
          }

          this.singleton.updateProp("open", false);
          break;
        }
        case "snap": {
          if (this.singleton.props.isPersistent) {
            this.modalAnimator.cancel();
            break;
          }

          this.singleton.updateProp("open", false);
          break;
        }
        default: {
          return;
        }
      }
    }

    switch (this.singleton.positionStatus) {
      case "snap": {
        this.modalAnimator.moveToSnapPoint();
        break;
      }
      default: {
        return;
      }
    }

    return this.modalAnimator.cancel();
  }
}
