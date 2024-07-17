import { createComponent } from "@lit/react";
import WebBottomSheet from "@web-bottom-sheet/core";
import React from "react";

export const BottomSheet = createComponent({
  tagName: "web-bottom-sheet",
  elementClass: WebBottomSheet,
  react: React,
  events: {
    onClose: "om-close",
  },
});
