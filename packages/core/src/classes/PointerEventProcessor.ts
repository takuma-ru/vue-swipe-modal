import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";
import { ModalAnimator } from "./ModalAnimator";

type PointerType = "mouse" | "touch";

type PointerEventParameters =
  | {
      type: Extract<PointerType, "mouse">;
      event: MouseEvent;
    }
  | {
      type: Extract<PointerType, "touch">;
      event: TouchEvent;
    };

export class PointerEventProcessor {
  private singleton: WebBottomSheetSingleton;
  private modalAnimator: ModalAnimator;
  private moveStartPositionY = 0;

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
        this.moveStartPositionY =
          event.targetTouches[0].clientY ||
          event.touches[0].clientY ||
          event.changedTouches[0].clientY;
      },
    });

    this.singleton.setIsDragging(true);
    this.singleton.addWillChangeBottom();
  }

  onMove(params: PointerEventParameters) {
    if (!this.singleton.isDragging) {
      return;
    }

    // Japanese: ドラッグ量を更新
    // English: Update the amount of drag
    this.processSwitcher({
      params,
      mouse: (event) => {
        this.singleton.setMovementAmountY(this.moveStartPositionY - event.y);
      },
      touch: (event) => {
        this.singleton.setMovementAmountY(
          this.moveStartPositionY - event.targetTouches[0].clientY ||
            event.touches[0].clientY ||
            event.changedTouches[0].clientY,
        );
      },
    });

    // Japanese: フルスクリーン表示にしない場合かつ上にドラッグした場合は処理を中断
    // English: If you do not want to display in full screen and drag up, the process is interrupted
    if (
      !this.singleton.props["is-fullscreen"] &&
      this.singleton.movementAmountY > 0
    ) {
      return;
    }

    this.singleton.modalRef?.value?.style.setProperty("user-select", "none");

    if (this.singleton.positionStatus === "snap") {
      this.singleton.panelRef?.value?.style.setProperty("overflow-y", "hidden");

      // Japanese: ドラッグ開始時の位置がスナップポイントの場合、スナップポイントの位置+ドラッグ量でbottom値を更新
      // English: If the position at the start of dragging is a snap point, update the bottom value with the snap point position + the drag amount
      this.singleton.setBottom(
        `clamp(-100%, calc(${this.singleton.snapPointPosition} + ${this.singleton.movementAmountY}px), 0px)`,
      );

      return;
    }

    this.singleton.setBottom(
      `clamp(-100%, calc(0% + ${this.singleton.movementAmountY}px), 0px)`,
    );
  }

  onUp() {
    this.singleton.setIsDragging(false);

    this.singleton.modalRef?.value?.style.removeProperty("user-select");
    this.singleton.panelRef?.value?.style.removeProperty("overflow-y");

    if (Math.abs(this.singleton.movementAmountY) > 36) {
      if (this.singleton.movementAmountY < 0) {
        switch (this.singleton.positionStatus) {
          case "full": {
            if (this.singleton.props["snap-point"]) {
              this.modalAnimator.moveToSnapPoint();
              return;
            }

            if (this.singleton.props["is-persistent"]) {
              this.modalAnimator.cancel();
              return;
            }

            this.singleton.dispatchOnCloseEvent();
            return;
          }
          case "snap": {
            if (this.singleton.props["is-persistent"]) {
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
          if (this.singleton.props["is-fullscreen"]) {
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

    this.singleton.removeWillChangeBottom();

    return this.modalAnimator.cancel();
  }
}
