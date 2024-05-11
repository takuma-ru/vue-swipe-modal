import type { StorybookConfig } from "@storybook/web-components-vite";
import { mergeConfig } from "vite";
import { litScssToJs } from "../.scripts/litScssToJs";

const config: StorybookConfig = {
  stories: [ "../stories/Intro.mdx", "../src/components/*.stories.@(js|jsx|mjs|ts|tsx)" ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: config => mergeConfig(config, {
    plugins: [ litScssToJs() ],
  }),
};
export default config;
