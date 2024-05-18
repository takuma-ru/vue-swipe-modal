import type { CSSResultArray, PropertyValues } from "lit";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { createRef, ref } from "lit/directives/ref.js";
import { resetCss } from "../styles/resetCss";
import { calcSnapPointPosition } from "../utils/calcSnapPointPosition";
import { ModalAnimator } from "./classes/ModalAnimator";
import { PointerEventProcessor } from "./classes/PointerEventProcessor";
import { WebBottomSheetSingleton } from "./singletons/WebBottomSheetSingleton";
import styles from "./web-bottom-sheet.cecss";

export interface WebBottomSheetProps {
  /**
   * Whether to display the backdrop.
   *
   * @default true
   */
  isBackdrop?: boolean;
  /**
   * Whether to display the drag handle.
   *
   * @default true
   */
  isDragHandle?: boolean;
  /**
   * Whether to display the modal in full screen.
   *
   * @default true
   */
  isFullScreen?: boolean;
  /**
   * Whether to disable swipe and back drop click events.
   *
   * @default false
   */
  isPersistent?: boolean;
  /**
   * Whether to disable scroll of the background.
   *
   *  @default true
   */
  isScrollLock?: boolean;
  /**
   * Whether to display the modal.
   *
   * @default false
   */
  open?: boolean;
  /**
   * Modal upper edge position.
   *
   * - `auto`: Automatically calculates the display position based on the height of the content in the modal.
   * - `String` : [\<length>](https://developer.mozilla.org/ja/docs/Web/CSS/length) data type
   *
   * @default undefined
   */
  // eslint-disable-next-line ts/ban-types
  snapPoint?: "auto" | String;
}

@customElement("web-bottom-sheet")
export class WebBottomSheet extends LitElement {
  // === Variables ===
  private modalRef = createRef<HTMLDialogElement>();
  private panelRef = createRef<HTMLDivElement>();
  private modalAnimator: ModalAnimator;
  private pointerEventProcessor: PointerEventProcessor;

  // === Props ===

  @property({ attribute: "open", type: Boolean })
  open: WebBottomSheetProps["open"] = false;

  @property({ attribute: "snap-point", type: String })
  snapPoint: WebBottomSheetProps["snapPoint"] = "auto";

  // === Methods ==

  // === Constructor ===
  constructor() {
    super();

    this.pointerEventProcessor = new PointerEventProcessor({
      modalRef: this.modalRef.value,
    });
    this.modalAnimator = new ModalAnimator({
      modalRef: this.modalRef.value,
      panelRef: this.panelRef.value,
      snapPoint: this.snapPoint,
    });
  }

  // === Lifecycle ===
  connectedCallback() {
    super.connectedCallback();
    calcSnapPointPosition({
      snapPoint: this.snapPoint,
      panelRef: this.panelRef?.value,
    });
  }

  firstUpdated() {
    const webBottomSheetSingleton = new WebBottomSheetSingleton();

    this.pointerEventProcessor = new PointerEventProcessor({
      modalRef: this.modalRef.value,
    });
    this.modalAnimator = new ModalAnimator({
      modalRef: this.modalRef.value,
      panelRef: this.panelRef.value,
      snapPoint: this.snapPoint,
    });

    webBottomSheetSingleton.updateBottomValue("-100%");
    webBottomSheetSingleton.updateMovementAmountY(0);
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has("open")) {
      if (this.open)
        this.modalAnimator.open();

      else this.modalAnimator.close();
    }

    if (changedProperties.has("snapPoint") || changedProperties.has("panelRef")) {
      calcSnapPointPosition({
        snapPoint: this.snapPoint,
        panelRef: this.panelRef?.value,
      });
    }
  }

  // === Render ===
  static readonly styles: CSSResultArray = [ resetCss, styles ];
  protected render() {
    return html`
      <dialog
        ${ref(this.modalRef)}
        class="web-bottom-sheet default-style"
        @touchstart=${(event: TouchEvent) => {
          this.pointerEventProcessor.onDown({
            type: "touch",
            event,
          });
        }}
        @touchmove=${(event: TouchEvent) => {
          this.pointerEventProcessor.onMove({
            type: "touch",
            event,
          });
        }}
        @mousedown=${(event: MouseEvent) => {
          this.pointerEventProcessor.onDown({
            type: "mouse",
            event,
          });
        }}
        @mousemove=${(event: MouseEvent) => {
          this.pointerEventProcessor.onMove({
            type: "mouse",
            event,
          });
        }}
      >
        <div></div>
        <div ${ref(this.panelRef)}>
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
