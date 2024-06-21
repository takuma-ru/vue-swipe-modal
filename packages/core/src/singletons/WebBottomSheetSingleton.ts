import { Ref } from "lit-html/directives/ref.js";
import { WebBottomSheetProps } from "../main";

export class WebBottomSheetSingleton {
  static instance: WebBottomSheetSingleton;

  // == state ==
  private _bottom = "-100%";
  private _movementAmountY = 0;
  private _snapPointPosition = "auto";
  private _positionStatus: "full" | "snap" | "close" = "close";
  private _isDragging = false;

  // == ref ==
  private _modalRef: Ref<HTMLDialogElement> | undefined;
  private _panelRef: Ref<HTMLDivElement> | undefined;
  private _bottomSheetRef: Ref<HTMLDivElement> | undefined;
  private _dragHandleWrapperRef: Ref<HTMLDivElement> | undefined;

  // == props ==
  private _props: WebBottomSheetProps = {};

  // == getters ==
  public get bottom() {
    return this._bottom;
  }

  public get movementAmountY() {
    return this._movementAmountY;
  }

  public get snapPointPosition() {
    return this._snapPointPosition;
  }

  public get positionStatus() {
    return this._positionStatus;
  }

  public get isDragging() {
    return this._isDragging;
  }

  public get modalRef() {
    return this._modalRef;
  }

  public get panelRef() {
    return this._panelRef;
  }

  public get bottomSheetRef() {
    return this._bottomSheetRef;
  }

  public get dragHandleWrapperRef() {
    return this._dragHandleWrapperRef;
  }

  public get props() {
    return this._props;
  }

  // == setters ==
  resetAllState() {
    this._bottom = "-100%";
    this._movementAmountY = 0;
    this._snapPointPosition = "auto";
    this._positionStatus = "close";
    this._isDragging = false;
  }

  setBottom(value: typeof this._bottom) {
    this._bottom = value;
    this._modalRef?.value?.style.setProperty("--bottom", value);
  }

  setMovementAmountY(value: typeof this._movementAmountY) {
    this._movementAmountY = value;
  }

  setSnapPointPosition(value: typeof this._snapPointPosition) {
    this._snapPointPosition = value;
  }

  setPositionStatus(value: typeof this._positionStatus) {
    this._positionStatus = value;
  }

  setIsDragging(value: typeof this._isDragging) {
    this._isDragging = value;
  }

  setModalRef(value: typeof this._modalRef) {
    this._modalRef = value;
  }

  setPanelRef(value: typeof this._panelRef) {
    this._panelRef = value;
  }

  setBottomSheetRef(value: typeof this._bottomSheetRef) {
    this._bottomSheetRef = value;
  }

  setDragHandleWrapperRef(value: typeof this._dragHandleWrapperRef) {
    this._dragHandleWrapperRef = value;
  }

  setProps(value: typeof this._props) {
    this._props = value;
  }

  // == methods ==
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
      return WebBottomSheetSingleton.instance;
    }

    WebBottomSheetSingleton.instance = this;
  }
}
