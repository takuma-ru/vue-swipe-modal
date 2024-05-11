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
    label=${ifDefined(args.label)}
    >
    vum-button
    </web-bottom-sheet>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<WebBottomSheetProps>;

export default meta;
type Story = StoryObj<WebBottomSheetProps>;

export const Primary: Story = {
  args: {
    label: "vum-button",
  },
};