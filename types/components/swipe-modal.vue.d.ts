declare const _default: import("vue").DefineComponent<{
    modal: {
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
    modalHeight: import("vue").Ref<number>;
    contentsBottomPosition: import("vue").Ref<string>;
    close: () => void;
    mouseDown: (payload: MouseEvent) => void;
    mouseMove: (payload: MouseEvent) => void;
    mouseUp: () => void;
    touchStart: (payload: TouchEvent) => void;
    touchMove: (payload: TouchEvent) => void;
    touchEnd: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modal"[], "update:modal", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modal: {
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
    "onUpdate:modal"?: ((...args: any[]) => any) | undefined;
}, {
    modal: boolean;
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
//# sourceMappingURL=swipe-modal.vue.d.ts.map