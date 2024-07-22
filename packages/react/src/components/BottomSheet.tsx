import { EventName, createComponent } from "@lit/react";
import WebBottomSheet, {
  ChangePositionStatusEvent,
} from "@web-bottom-sheet/core";
import React from "react";

export const BottomSheet = createComponent({
  tagName: "web-bottom-sheet",
  elementClass: WebBottomSheet,
  react: React,
  events: {
    onClose: "on-close",
    onChangePositionStatus:
      "on-change-position-status" as EventName<ChangePositionStatusEvent>,
  },
});
