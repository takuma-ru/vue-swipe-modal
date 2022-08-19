/**
 * タッチ座標検出関数群
 * @returns touchPosition
 */
export declare const useTouchEvent: () => {
    touchPosition: import("vue-demi").Ref<{
        isTouch: boolean;
        touchStart: number;
        touchDistance: number;
        touchX: number;
        touchY: number;
    }>;
    initTouchPosition: () => void;
    touchStart: (payload: TouchEvent) => void;
    touchMove: (payload: TouchEvent) => void;
    touchEnd: () => void;
};
//# sourceMappingURL=touchEvent.d.ts.map