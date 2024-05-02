// types
export interface SwipeModalProps {
	/**
	 * Whether to display the backdrop.
	 *
	 * @default true
	 */
	isBackdrop?: boolean
	/**
	 * Whether to display the drag handle.
	 *
	 * @default true
	 */
	isDragHandle?: boolean
	/**
	 * Whether to display the modal in full screen.
	 *
	 * @default true
	 */
	isFullScreen?: boolean
	/**
	 * Whether to disable swipe and back drop click events.
	 *
	 * @default false
	 */
	isPersistent?: boolean
	/**
	 * Whether to disable scroll of the background.
	 *
	 *  @default true
	 */
	isScrollLock?: boolean
	/**
	 * Whether to display the modal.  = `v-model`
	 *
	 * @default false
	 */
	modelValue?: boolean
	/**
	 * Modal upper edge position.
	 *
	 * - `auto`: Automatically calculates the display position based on the height of the content in the modal.
	 * - `String` : [\<length>](https://developer.mozilla.org/ja/docs/Web/CSS/length) data type
	 *
	 * @default undefined
	 */
	// eslint-disable-next-line ts/ban-types
	snapPoint?: "auto" | String
}

export interface SwipeModalEmits {
	(e: "update:modelValue", value: boolean): void
}
