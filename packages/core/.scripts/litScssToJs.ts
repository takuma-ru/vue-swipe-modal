import type { Plugin } from "vite";
import { convertScssToCss } from "./convertScssToCss";

export const litScssToJs = (): Plugin => {
  return {
    name: "litScssToJs",
    async transform(code, id) {
      if (id.endsWith(".cecss")) {
        const result = await convertScssToCss(code);
        return result;
      }
    },
  };
};
