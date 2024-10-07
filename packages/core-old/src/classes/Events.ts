export class CloseEvent extends CustomEvent<void> {
  constructor() {
    super("on-close", { bubbles: true, composed: true });
  }
}

export class ChangePositionStatusEvent extends CustomEvent<{
  positionStatus: "full" | "snap" | "close";
}> {
  constructor(positionStatus: "full" | "snap" | "close") {
    super("on-change-position-status", {
      bubbles: true,
      composed: true,
      detail: { positionStatus },
    });
  }
}
