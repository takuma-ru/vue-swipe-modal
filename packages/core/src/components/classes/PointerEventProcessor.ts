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
        this.moveStartPositionY = event.targetTouches[0].clientY || event.touches[0].clientY || event.changedTouches[0].clientY;
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
        this.singleton.updateMovementAmountY(this.moveStartPositionY - event.y);
      },
      touch: (event) => {
        this.singleton.updateMovementAmountY(this.moveStartPositionY - event.targetTouches[0].clientY || event.touches[0].clientY || event.changedTouches[0].clientY);
      },
    });

    if (
      (this.singleton.movementAmountY > 0
      && this.singleton.positionStatus === "full")
      || (this.singleton.modalRef?.value?.getBoundingClientRect().top || 0) < 0
    ) {
      return;
    }

    if (!this.singleton.props.isFullscreen && this.singleton.movementAmountY > 0) {
      return;
    }

    this.singleton.modalRef?.value?.style.setProperty("user-select", "none");

    if (this.singleton.positionStatus === "snap") {
      this.singleton.updateBottomValue(`calc(${this.singleton.snapPointPosition} + ${this.singleton.movementAmountY}px)`);

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
      if (this.singleton.movementAmountY < 0) {
        switch (this.singleton.positionStatus) {
          case "full": {
            if (this.singleton.props.snapPoint) {
              this.modalAnimator.moveToSnapPoint();
              return;
            }

            if (this.singleton.props.isPersistent) {
              this.modalAnimator.cancel();
              return;
            }

            this.singleton.dispatchOnCloseEvent();
            return;
          }
          case "snap": {
            if (this.singleton.props.isPersistent) {
              this.modalAnimator.cancel();
              return;
            }

            this.singleton.dispatchOnCloseEvent();
            return;
          }
          default: {
            return;
          }
        }
      }

      switch (this.singleton.positionStatus) {
        case "snap": {
          if (this.singleton.props.isFullscreen) {
            this.modalAnimator.moveToFull();
            return;
          }

          this.modalAnimator.cancel();
          return;
        }
        default: {
          return;
        }
      }
    }

    return this.modalAnimator.cancel();
  }
}
