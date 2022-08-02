declare const _default: import("vue-demi").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    persistent: {
        type: BooleanConstructor;
        default: boolean;
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    noTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    contentsWidth: {
        type: StringConstructor;
        default: string;
    };
    contentsHeight: {
        type: StringConstructor;
        default: string;
    };
    borderTopRadius: {
        type: StringConstructor;
        default: null;
    };
    borderTopLeftRadius: {
        type: StringConstructor;
        default: string;
    };
    borderTopRightRadius: {
        type: StringConstructor;
        default: string;
    };
    contentsColor: {
        type: StringConstructor;
        default: string;
    };
    tipColor: {
        type: StringConstructor;
        default: string;
    };
    darkContentsColor: {
        type: StringConstructor;
        default: string;
    };
}, {
    propsRef: import("vue-demi").ToRefs<Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue-demi").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        dark: {
            type: BooleanConstructor;
            default: boolean;
        };
        persistent: {
            type: BooleanConstructor;
            default: boolean;
        };
        backgroundColor: {
            type: StringConstructor;
            default: string;
        };
        fullscreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        noTip: {
            type: BooleanConstructor;
            default: boolean;
        };
        contentsWidth: {
            type: StringConstructor;
            default: string;
        };
        contentsHeight: {
            type: StringConstructor;
            default: string;
        };
        borderTopRadius: {
            type: StringConstructor;
            default: null;
        };
        borderTopLeftRadius: {
            type: StringConstructor;
            default: string;
        };
        borderTopRightRadius: {
            type: StringConstructor;
            default: string;
        };
        contentsColor: {
            type: StringConstructor;
            default: string;
        };
        tipColor: {
            type: StringConstructor;
            default: string;
        };
        darkContentsColor: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>>>;
    modal: import("vue-demi").WritableComputedRef<boolean>;
    modalHeight: import("vue-demi").Ref<number>;
    contentsBottomPosition: import("vue-demi").Ref<string>;
    styles: import("vue-demi").ComputedRef<{
        width: string;
        borderTopLeftRadius: string;
        borderTopRightRadius: string;
        backgroundColor: string;
        color: string;
    }>;
    close: () => void;
    mouseDown: (payload: MouseEvent) => void;
    mouseMove: (payload: MouseEvent) => void;
    mouseUp: () => void;
    touchStart: (payload: TouchEvent) => void;
    touchMove: (payload: TouchEvent) => void;
    touchEnd: () => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    persistent: {
        type: BooleanConstructor;
        default: boolean;
    };
    backgroundColor: {
        type: StringConstructor;
        default: string;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    noTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    contentsWidth: {
        type: StringConstructor;
        default: string;
    };
    contentsHeight: {
        type: StringConstructor;
        default: string;
    };
    borderTopRadius: {
        type: StringConstructor;
        default: null;
    };
    borderTopLeftRadius: {
        type: StringConstructor;
        default: string;
    };
    borderTopRightRadius: {
        type: StringConstructor;
        default: string;
    };
    contentsColor: {
        type: StringConstructor;
        default: string;
    };
    tipColor: {
        type: StringConstructor;
        default: string;
    };
    darkContentsColor: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
    dark: boolean;
    persistent: boolean;
    backgroundColor: string;
    fullscreen: boolean;
    noTip: boolean;
    contentsWidth: string;
    contentsHeight: string;
    borderTopRadius: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    contentsColor: string;
    tipColor: string;
    darkContentsColor: string;
}>;
export default _default;
//# sourceMappingURL=swipeModalVue2.vue.d.ts.map