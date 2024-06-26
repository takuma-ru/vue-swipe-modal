import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { WebBottomSheetProps } from "../types/web-bottom-sheet.type";
import { WebBottomSheet } from "./web-bottom-sheet.ce";

const meta = {
  title: "web-bottom-sheet",
  tags: ["autodocs"],
  render: (args) => {
    new WebBottomSheet();

    return html`
    <web-bottom-sheet
      ?open="${args.open}"
      ?is-back-drop="${args["is-backdrop"]}"
      ?is-drag-handle="${args["is-drag-handle"]}"
      ?is-fullscreen="${args["is-fullscreen"]}"
      ?is-persistent="${args["is-persistent"]}"
      ?is-scroll-lock="${args["is-scroll-lock"]}"
      snap-point="${ifDefined(args["snap-point"] as string | "auto")}"
    >
      <span>Bottom sheet</span>
    </web-bottom-sheet>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<WebBottomSheetProps>;

export default meta;
type Story = StoryObj<WebBottomSheetProps>;

export const Primary: Story = {
  args: {
    open: true,
    "is-backdrop": true,
    "is-drag-handle": true,
    "is-fullscreen": true,
    "is-persistent": false,
    "is-scroll-lock": true,
    "snap-point": "auto",
  },
};