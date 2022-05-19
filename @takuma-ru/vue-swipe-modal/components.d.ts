declare const _default: import("vue").ComponentOptions<import("vue").default, import("@vue/composition-api").ShallowUnwrapRef<{
    modalHeight: import("@vue/composition-api").Ref<number>;
    contentsBottomPosition: import("@vue/composition-api").Ref<string>;
    close: () => void;
    mouseDown: (payload: MouseEvent) => void;
    mouseMove: (payload: MouseEvent) => void;
    mouseUp: () => void;
    touchStart: (payload: TouchEvent) => void;
    touchMove: (payload: TouchEvent) => void;
    touchEnd: () => void;
    isVue2: boolean;
    isVue3: boolean;
}> & import("@vue/composition-api").Data, {}, {}, {
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
    backgroundColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    dark: boolean;
    modelValue: boolean;
    persistent: boolean;
    fullscreen: boolean;
    noTip: boolean;
    contentsWidth: string;
    contentsHeight: string;
    borderTopRadius: string;
    contentsColor: string;
    tipColor: string;
    darkContentsColor: string;
} & {}> & Omit<import("vue").VueConstructor<import("vue").default>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    backgroundColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    dark: boolean;
    modelValue: boolean;
    persistent: boolean;
    fullscreen: boolean;
    noTip: boolean;
    contentsWidth: string;
    contentsHeight: string;
    borderTopRadius: string;
    contentsColor: string;
    tipColor: string;
    darkContentsColor: string;
} & {} & {
    [x: string & `on${string}`]: ((...args: any[]) => any) | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<{
    modalHeight: import("@vue/composition-api").Ref<number>;
    contentsBottomPosition: import("@vue/composition-api").Ref<string>;
    close: () => void;
    mouseDown: (payload: MouseEvent) => void;
    mouseMove: (payload: MouseEvent) => void;
    mouseUp: () => void;
    touchStart: (payload: TouchEvent) => void;
    touchMove: (payload: TouchEvent) => void;
    touchEnd: () => void;
    isVue2: boolean;
    isVue3: boolean;
}>, import("@vue/composition-api").Data, {}, {}, {}, {}, string[], {
    backgroundColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    dark: boolean;
    modelValue: boolean;
    persistent: boolean;
    fullscreen: boolean;
    noTip: boolean;
    contentsWidth: string;
    contentsHeight: string;
    borderTopRadius: string;
    contentsColor: string;
    tipColor: string;
    darkContentsColor: string;
} & {} & {
    [x: string & `on${string}`]: ((...args: any[]) => any) | undefined;
}, {
    backgroundColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    dark: boolean;
    modelValue: boolean;
    persistent: boolean;
    fullscreen: boolean;
    noTip: boolean;
    contentsWidth: string;
    contentsHeight: string;
    borderTopRadius: string;
    contentsColor: string;
    tipColor: string;
    darkContentsColor: string;
}, true>);
export default _default;
