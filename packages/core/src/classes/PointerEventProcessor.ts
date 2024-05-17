import type { Ref } from "lit/directives/ref.js";
import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";

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
  private modalRef: Ref<HTMLDialogElement>["value"];

  private isDragging: boolean = false;
  private moveStartPositionY: number = 0;

  constructor({
    modalRef,
  }:
    {
      modalRef: Ref<HTMLDialogElement>["value"];
    },
  ) {
    this.modalRef = modalRef;
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
    if (!this.isDragging)
      return;

    const webBottomSheetSingleton = new WebBottomSheetSingleton();

    this.processSwitcher({
      params,
      mouse: (event) => {
        webBottomSheetSingleton.updateMovementAmountY(event.y - this.moveStartPositionY);
      },
      touch: (event) => {
        webBottomSheetSingleton.updateMovementAmountY(event.touches[0].clientY - this.moveStartPositionY);
      },
    });

    if (
      (webBottomSheetSingleton.movementAmountY > 0
      && webBottomSheetSingleton.positionStatus === "full")
      || (this.modalRef?.getBoundingClientRect().top || 0) < 0
    )
      return;

    this.modalRef?.style.setProperty("user-select", "none");

    if (webBottomSheetSingleton.positionStatus === "snap") {
      webBottomSheetSingleton.updateBottomValue(`calc(${webBottomSheetSingleton.snapPointPosition} - ${webBottomSheetSingleton.movementAmountY}px)`);

      return;
    }

    webBottomSheetSingleton.updateBottomValue(
      `calc(0% + ${webBottomSheetSingleton.movementAmountY}px)`,
    );
  }
}
