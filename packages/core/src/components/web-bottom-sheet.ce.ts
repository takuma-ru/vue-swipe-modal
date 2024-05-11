import { type CSSResultArray, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { resetCss } from "../styles/resetCss";
import styles from "./web-bottom-sheet.cecss";

export interface WebBottomSheetProps {
  label?: string;
}

@customElement("web-bottom-sheet")
export class WebBottomSheet extends LitElement {
  static readonly styles: CSSResultArray = [ resetCss, styles ];

  @property({ attribute: "label", type: String })
  label?: WebBottomSheetProps["label"] = undefined;

  render() {
    return html`
      <div class="web-bottom-sheet">
        <h1>web-bottom-sheet</h1>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "web-bottom-sheet": WebBottomSheet;
  }
}
