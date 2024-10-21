import type { DialogHTMLAttributes } from "vue";

/// <reference types="vite/client" />
declare module "vue" {
  interface DialogHTMLAttributes extends DialogHTMLAttributes {
    part?: string;
  }
}
