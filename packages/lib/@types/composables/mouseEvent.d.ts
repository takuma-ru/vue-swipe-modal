/**
 * マウス座標検出関数群
 * @returns touchPosition
 */
export declare function useMouseEvent(): {
    mousePosition: import("vue-demi").Ref<{
        isMouseDown: boolean;
        downStart: number;
        mouseDistance: number;
        mouseX: number;
        mouseY: number;
    }>;
    initMousePosition: () => void;
    mouseDown: (payload: MouseEvent) => void;
    mouseMove: (payload: MouseEvent) => void;
    mouseUp: () => void;
};
//# sourceMappingURL=mouseEvent.d.ts.map