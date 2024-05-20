import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { WebBottomSheetProps } from "./web-bottom-sheet.ce";
import { WebBottomSheet } from "./web-bottom-sheet.ce";

const meta = {
  title: "web-bottom-sheet",
  tags: [ "autodocs" ],
  render: (args) => {
    // eslint-disable-next-line no-new
    new WebBottomSheet();

    return html`
    <web-bottom-sheet
      ?open="${args.open}"
      ?is-back-drop="${args.isBackdrop}"
      ?is-drag-handle="${args.isDragHandle}"
      ?is-full-screen="${args.isFullScreen}"
      ?is-persistent="${args.isPersistent}"
      ?is-scroll-lock="${args.isScrollLock}"
      snap-point="${ifDefined(args.snapPoint as string | "auto")}"
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
    isBackdrop: true,
    isDragHandle: true,
    isFullScreen: true,
    isPersistent: false,
    isScrollLock: true,
    snapPoint: "auto",
  },
};
