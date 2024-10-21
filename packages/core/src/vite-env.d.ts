import type { DialogHTMLAttributes as VueDialogHTMLAttributes } from "vue";

/// <reference types="vite/client" />
declare module "vue" {
  interface DialogHTMLAttributes extends VueDialogHTMLAttributes {
    part?: string;
  }
}
