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
import { booleanConverter } from "../utils/propertyConverter";
import styles from "./web-bottom-sheet.scss?litSass";

@customElement("web-bottom-sheet")
export class WebBottomSheet extends LitElement {
  private singleton: WebBottomSheetSingleton;

  // === Variables ===
  private modalRef = createRef<HTMLDialogElement>();
  private bottomSheetRef = createRef<HTMLDivElement>();
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
  firstUpdated() {
    this.singleton.setModalRef(this.modalRef);
    this.singleton.setPanelRef(this.panelRef);
    this.singleton.setBottomSheetRef(this.bottomSheetRef);
    this.singleton.setDragHandleWrapperRef(this.dragHandleWrapperRef);
    this.singleton.setBottom("-100%");
    this.singleton.setMovementAmountY(0);

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

    this.bottomSheetRef.value?.addEventListener(
      "touchstart",
      (event) => {
        if (event.target === this.panelRef.value && !this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onDown({
          type: "touch",
          event,
        });
      },
      { passive: true },
    );

    this.bottomSheetRef.value?.addEventListener(
      "touchmove",
      (event) => {
        if (event.target === this.panelRef.value && !this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onMove({
          type: "touch",
          event,
        });
      },
      { passive: true },
    );

    this.bottomSheetRef.value?.addEventListener(
      "touchend",
      (event) => {
        if (event.target === this.panelRef.value && !this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onUp();
      },
      { passive: true },
    );

    this.bottomSheetRef.value?.addEventListener(
      "mousedown",
      (event) => {
        if (event.target === this.panelRef.value && !this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onDown({
          type: "mouse",
          event,
        });
      },
      { passive: true },
    );

    this.bottomSheetRef.value?.addEventListener(
      "mousemove",
      (event) => {
        if (event.target === this.panelRef.value && !this.isScrollTop) {
          return;
        }

        this.pointerEventProcessor.onMove({
          type: "mouse",
          event,
        });
      },
      { passive: true },
    );

    this.bottomSheetRef.value?.addEventListener(
      "mouseup",
      (event) => {
        if (event.target === this.panelRef.value && !this.isScrollTop) {
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
      this.singleton.calcSnapPointPosition();
    }
  }

  // === Render ===
  static readonly styles: CSSResultArray = [resetCss, styles];
  protected render() {
    return html`
      <dialog
        ${ref(this.modalRef)}
        class="modal-ref web-bottom-sheet-default"
        part="dialog"
      >
        <div ${ref(this.bottomSheetRef)} class="bottom-sheet">
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
