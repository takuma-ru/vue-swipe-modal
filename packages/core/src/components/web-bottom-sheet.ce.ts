import {
  type CSSResultArray,
  LitElement,
  type PropertyValues,
  html,
} from "lit";

import { customElement, property } from "lit/decorators.js";

import { createRef, ref } from "lit/directives/ref.js";
import { ModalAnimator } from "../classes/ModalAnimator";
import { PointerEventProcessor } from "../classes/PointerEventProcessor";
import { WebBottomSheetSingleton } from "../singletons/WebBottomSheetSingleton";
import { resetCss } from "../styles/resetCss";
import type { WebBottomSheetProps } from "../types/web-bottom-sheet.type";
import { calcSnapPointPosition } from "../utils/calcSnapPointPosition";
import styles from "./web-bottom-sheet.scss?litSass";
import { booleanConverter } from "../utils/propertyConverter";

@customElement("web-bottom-sheet")
export class WebBottomSheet extends LitElement {
  private singleton: WebBottomSheetSingleton;

  // === Variables ===
  private modalRef = createRef<HTMLDialogElement>();
  private panelRef = createRef<HTMLDivElement>();
  private panelObserverTargetRef = createRef<HTMLDivElement>();
  private dragHandleWrapperRef = createRef<HTMLDivElement>();
  private modalAnimator: ModalAnimator;
  private pointerEventProcessor: PointerEventProcessor;
  private isScrollTop = false;

  // === Props ===
  @property({ attribute: "open", type: Boolean })
  accessor open: WebBottomSheetProps["open"] = false;

  @property({ attribute: "snap-point", type: String })
  accessor snapPoint: WebBottomSheetProps["snap-point"] = undefined;

  @property({
    attribute: "is-back-drop",
    type: Boolean,
    converter: booleanConverter,
  })
  accessor isBackdrop: WebBottomSheetProps["is-backdrop"] = true;

  @property({
    attribute: "is-drag-handle",
    type: Boolean,
    converter: booleanConverter,
  })
  accessor isDragHandle: WebBottomSheetProps["is-drag-handle"] = true;

  @property({
    attribute: "is-fullscreen",
    type: Boolean,
    converter: booleanConverter,
  })
  accessor isFullscreen: WebBottomSheetProps["is-fullscreen"] = true;

  @property({
    attribute: "is-persistent",
    type: Boolean,
    converter: booleanConverter,
  })
  accessor isPersistent: WebBottomSheetProps["is-persistent"] = false;

  @property({
    attribute: "is-scroll-lock",
    type: Boolean,
    converter: booleanConverter,
  })
  accessor isScrollLock: WebBottomSheetProps["is-scroll-lock"] = true;

  // === Methods ==

  // === Constructor ===
  constructor() {
    super();

    this.pointerEventProcessor = new PointerEventProcessor();
    this.modalAnimator = new ModalAnimator();

    this.singleton = new WebBottomSheetSingleton();

    this.singleton.setProps({
      "is-backdrop": this.isBackdrop,
      "is-drag-handle": this.isDragHandle,
      "is-fullscreen": this.isFullscreen,
      "is-persistent": this.isPersistent,
      "is-scroll-lock": this.isScrollLock,
      open: this.open,
      "snap-point": this.snapPoint,
    });
  }

  // === Lifecycle ===
  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.singleton.setModalRef(this.modalRef);
    this.singleton.setPanelRef(this.panelRef);
    this.singleton.updateBottomValue("-100%");
    this.singleton.updateMovementAmountY(0);

    const scrollTopObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        this.isScrollTop = true;
      } else {
        this.isScrollTop = false;
      }
    });

    if (this.panelObserverTargetRef.value) {
      scrollTopObserver.observe(this.panelObserverTargetRef.value);
    }

    this.modalRef.value?.addEventListener("cancel", (event) => {
      event.preventDefault();

      this.singleton.dispatchOnCloseEvent();
    });

    this.modalRef.value?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.target === this.modalRef.value) {
        this.singleton.dispatchOnCloseEvent();
      }
    });

    this.dragHandleWrapperRef.value?.addEventListener(
      "touchstart",
      (event) => {
        this.pointerEventProcessor.onDown({
          type: "touch",
          event,
        });
      },
      { passive: true },
    );

    this.dragHandleWrapperRef.value?.addEventListener(
      "touchmove",
      (event) => {
        this.pointerEventProcessor.onMove({
          type: "touch",
          event,
        });
      },
      { passive: true },
    );

    this.dragHandleWrapperRef.value?.addEventListener(
      "touchend",
      () => {
        this.pointerEventProcessor.onUp();
      },
      { passive: true },
    );

    this.dragHandleWrapperRef.value?.addEventListener(
      "mousedown",
      (event) => {
        this.pointerEventProcessor.onDown({
          type: "mouse",
          event,
        });
      },
      { passive: true },
    );

    this.dragHandleWrapperRef.value?.addEventListener(
      "mousemove",
      (event) => {
        this.pointerEventProcessor.onMove({
          type: "mouse",
          event,
        });
      },
      { passive: true },
    );

    this.dragHandleWrapperRef.value?.addEventListener(
      "mouseup",
      () => {
        this.pointerEventProcessor.onUp();
      },
      { passive: true },
    );

    this.panelRef.value?.addEventListener(
      "touchstart",
      (event) => {
        if (!this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onDown({
          type: "touch",
          event,
        });
      },
      { passive: true },
    );

    this.panelRef.value?.addEventListener(
      "touchmove",
      (event) => {
        if (!this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onMove({
          type: "touch",
          event,
        });
      },
      { passive: true },
    );

    this.panelRef.value?.addEventListener(
      "touchend",
      () => {
        if (!this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onUp();
      },
      { passive: true },
    );

    this.panelRef.value?.addEventListener(
      "mousedown",
      (event) => {
        if (!this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onDown({
          type: "mouse",
          event,
        });
      },
      { passive: true },
    );

    this.panelRef.value?.addEventListener(
      "mousemove",
      (event) => {
        if (!this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onMove({
          type: "mouse",
          event,
        });
      },
      { passive: true },
    );

    this.panelRef.value?.addEventListener(
      "mouseup",
      () => {
        if (!this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onUp();
      },
      { passive: true },
    );
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this.singleton.setProps({
      "is-backdrop": this.isBackdrop,
      "is-drag-handle": this.isDragHandle,
      "is-fullscreen": this.isFullscreen,
      "is-persistent": this.isPersistent,
      "is-scroll-lock": this.isScrollLock,
      open: this.open,
      "snap-point": this.snapPoint,
    });

    if (changedProperties.has("open")) {
      if (this.singleton.props.open) {
        this.modalAnimator.open();
      } else {
        this.modalAnimator.close();
      }
    }

    if (
      changedProperties.has("snapPoint") ||
      changedProperties.has("panelRef")
    ) {
      calcSnapPointPosition();
    }
  }

  // === Render ===
  static readonly styles: CSSResultArray = [resetCss, styles];
  protected render() {
    return html`
      <dialog
        ${ref(this.modalRef)}
        class="modal-ref default-style"
      >
        <div ${ref(this.dragHandleWrapperRef)} class="drag-handle-wrapper">
          <slot name="drag-handle">
            <div class="drag-handle-default">
              <div class="drag-handle-default-icon"></div>
            </div>
          </slot>
        </div>
        <div ${ref(this.panelRef)} class="panel-ref">
          <div ${ref(this.panelObserverTargetRef)} class="panel-observer-target"></div>
          <slot></slot>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "web-bottom-sheet": WebBottomSheet;
  }
}
