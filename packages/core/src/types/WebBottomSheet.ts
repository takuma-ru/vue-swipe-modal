export type WebBottomSheetProps = {
  /**
   * Whether to display the modal.
   *
   * @default false
   */
  open: boolean;
  /**
   * Whether to display the backdrop.
   *
   * @default true
   */
  isBackdrop?: boolean;
  /**
   * Whether to display the drag handle.
   *
   * @default true
   */
  isDragHandle?: boolean;
  /**
   * Whether to display the modal in full screen.
   *
   * @default true
   */
  isFullscreen?: boolean;
  /**
   * Whether to disable swipe and back drop click events.
   *
   * @default false
   */
  isPersistent?: boolean;
  /**
   * Whether to disable scroll of the background.
   *
   *  @default true
   */
  isScrollLock?: boolean;
};
