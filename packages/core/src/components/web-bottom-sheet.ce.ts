import { type CSSResultArray, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { createRef, ref } from "lit/directives/ref.js";
import { resetCss } from "../styles/resetCss";
import styles from "./web-bottom-sheet.cecss";

export interface WebBottomSheetProps {
  open: boolean;
}

@customElement("web-bottom-sheet")
export class WebBottomSheet extends LitElement {
  static readonly styles: CSSResultArray = [ resetCss, styles ];

  modalRef = createRef<HTMLDialogElement>();

  @property({ attribute: "open", type: Boolean })
  open: WebBottomSheetProps["open"] = false;

  render() {
    return html`
      <dialog
        ${ref(this.modalRef)}
        class="web-bottom-sheet"
        ?open="${this.open}"
      >
        <slot></slot>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "web-bottom-sheet": WebBottomSheet;
  }
}
