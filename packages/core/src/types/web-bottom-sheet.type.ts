export interface WebBottomSheetProps {
  /**
   * Whether to display the backdrop.
   *
   * @default true
   */
  "is-backdrop"?: boolean;
  /**
   * Whether to display the drag handle.
   *
   * @default true
   */
  "is-drag-handle"?: boolean;
  /**
   * Whether to display the modal in full screen.
   *
   * @default true
   */
  "is-fullscreen"?: boolean;
  /**
   * Whether to disable swipe and back drop click events.
   *
   * @default false
   */
  "is-persistent"?: boolean;
  /**
   * Whether to disable scroll of the background.
   *
   *  @default true
   */
  "is-scroll-lock"?: boolean;
  /**
   * Whether to display the modal.
   *
   * @default false
   */
  "open"?: boolean;
  /**
   * Modal upper edge position.
   *
   * - `auto`: Automatically calculates the display position based on the height of the content in the modal.
   * - `String` : [\<length>](https://developer.mozilla.org/ja/docs/Web/CSS/length) data type
   *
   * @default undefined
   */
  // eslint-disable-next-line ts/ban-types
  "snap-point"?: "auto" | String;
}

export const WebBottomSheetPropsEnum = {
  isBackdrop: "is-backdrop",
  isDragHandle: "is-drag-handle",
  isFullscreen: "is-fullscreen",
  isPersistent: "is-persistent",
  isScrollLock: "is-scroll-lock",
  open: "open",
  snapPoint: "snap-point",
} as const;
