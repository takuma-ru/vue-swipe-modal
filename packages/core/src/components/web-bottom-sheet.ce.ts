import { type CSSResultArray, LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import styles from "./web-bottom-sheet.cecss";

import { resetCss } from "../styles/resetCss";

@customElement("web-bottom-sheet")
export class WebBottomSheet extends LitElement {
  static readonly styles: CSSResultArray = [resetCss, styles];

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
