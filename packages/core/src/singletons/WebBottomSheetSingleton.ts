import { BottomCssVarController } from "../classes/BottomCssVarController";

export class WebBottomSheetSingleton {
  static instance: WebBottomSheetSingleton;

  bottom: string = "-100%";
  movementAmountY: number = 0;
  snapPointPosition: string = "auto";
  positionStatus: "full" | "snap" | "close" = "close";

  updateBottomValue(value: typeof this.bottom) {
    this.bottom = value;

    const bottomCssVarController = new BottomCssVarController();
    bottomCssVarController.setBottomCssVar(value);
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

  constructor() {
    if (WebBottomSheetSingleton.instance)
      return WebBottomSheetSingleton.instance;

    WebBottomSheetSingleton.instance = this;
  }
}
