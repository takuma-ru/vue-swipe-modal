type PropsType = {
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
    isFullScreen?: boolean;
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
    /**
     * Whether to display the modal.  = `v-model`
     *
     * @default false
     */
    modelValue?: boolean;
    /**
     * Modal upper edge position.
     *
     * - `auto`: Automatically calculates the display position based on the height of the content in the modal.
     * - `String` : [\<length>](https://developer.mozilla.org/ja/docs/Web/CSS/length) data type
     *
     * @default undefined
     */
    snapPoint?: "auto" | String;
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<PropsType>, {
    isBackdrop: boolean;
    isDragHandle: boolean;
    isFullScreen: boolean;
    isPersistent: boolean;
    isScrollLock: boolean;
    modelValue: boolean;
    snapPoint: undefined;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<globalThis.ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<PropsType>, {
    isBackdrop: boolean;
    isDragHandle: boolean;
    isFullScreen: boolean;
    isPersistent: boolean;
    isScrollLock: boolean;
    modelValue: boolean;
    snapPoint: undefined;
}>>> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    isBackdrop: boolean;
    isDragHandle: boolean;
    isFullScreen: boolean;
    isPersistent: boolean;
    isScrollLock: boolean;
    modelValue: boolean;
    snapPoint: String | "auto";
}, {}>, {
    "drag-handle"?(_: {}): any;
    default?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=SwipeModal.vue.d.ts.map