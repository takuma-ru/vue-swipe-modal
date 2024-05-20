import type { Ref } from "lit/directives/ref.js";
import { BottomCssVarController } from "../classes/BottomCssVarController";
import type { WebBottomSheetProps } from "../web-bottom-sheet.ce";

export class WebBottomSheetSingleton {
  static instance: WebBottomSheetSingleton;

  bottom: string = "-100%";
  movementAmountY: number = 0;
  snapPointPosition: string = "auto";
  positionStatus: "full" | "snap" | "close" = "close";

  modalRef: Ref<HTMLDialogElement> | undefined;

  panelRef: Ref<HTMLDivElement> | undefined;

  props: WebBottomSheetProps = {} as WebBottomSheetProps;

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

  setModalRef(value: typeof this.modalRef) {
    this.modalRef = value;
  }

  setPanelRef(value: typeof this.panelRef) {
    this.panelRef = value;
  }

  setProps(value: typeof this.props) {
    this.props = value;
  }

  updateProp<Key extends keyof WebBottomSheetProps>(key: Key, value: WebBottomSheetProps[Key]) {
    this.props[key] = value;
  }

  constructor() {
    if (WebBottomSheetSingleton.instance) {
      return WebBottomSheetSingleton.instance;
    }

    WebBottomSheetSingleton.instance = this;
  }
}
