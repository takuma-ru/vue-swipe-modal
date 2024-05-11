/// <reference types="vite/client" />

declare module "*.cecss" {
  import type { CSSResult } from "lit";
  const css: CSSResult;
  export default css;
}
