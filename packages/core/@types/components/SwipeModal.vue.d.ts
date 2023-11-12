import { HTMLAttributes } from "vue";
type PropsType = {
    modelValue: boolean;
    isDragHandle?: boolean;
    isBackdrop?: boolean;
    isPersistent?: boolean;
    isScrollLock?: boolean;
    class?: HTMLAttributes["class"];
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<PropsType>, {
    isDragHandle: boolean;
    isBackdrop: boolean;
    isPersistent: boolean;
    isScrollLock: boolean;
    class: undefined;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<PropsType>, {
    isDragHandle: boolean;
    isBackdrop: boolean;
    isPersistent: boolean;
    isScrollLock: boolean;
    class: undefined;
}>>> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    class: any;
    isDragHandle: boolean;
    isBackdrop: boolean;
    isPersistent: boolean;
    isScrollLock: boolean;
}, {}>, {
    "drag-handle"?(_: {}): any;
    default?(_: {}): any;
    backdrop?(_: {}): any;
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