import { cssVar } from "src/utils/cssVar";
import type { Ref } from "vue";

const KEY_FRAME_ANIMATION_OPTIONS = {
  duration: 300,
  easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
} as const satisfies KeyframeAnimationOptions;

export const useAnimation = ({
  dialogRef,
}: { dialogRef: Ref<HTMLDialogElement | null> }) => {
  const { setCssVar } = cssVar(dialogRef);

  const move = (
    position: string,
    onFinish?: ({ position }: { position: string }) => void,
  ) => {
    if (!dialogRef.value?.open) {
      return;
    }

    const { setCssVar, getCssVar } = cssVar(dialogRef);

    dialogRef.value?.style.setProperty("will-change", "bottom");

    const animate = dialogRef.value.animate(
      [
        {
          bottom: getCssVar("BOTTOM") || "-100%",
        },
        {
          bottom: position,
        },
      ],
      KEY_FRAME_ANIMATION_OPTIONS,
    );

    animate.onfinish = () => {
      setCssVar("BOTTOM", position);
      dialogRef.value?.style.removeProperty("will-change");
      onFinish?.({ position });
    };
  };

  const moveToSnapPoint = ({
    snapPointIndex: _snapPointIndex,
    snapPointElement,
    isFullSnapped: _isFullSnapped,
    isOpenedFullscreen,
    isFullscreen,
  }: {
    snapPointIndex: number;
    snapPointElement?: HTMLElement;
    isFullSnapped: boolean;
    isOpenedFullscreen: boolean;
    isFullscreen: boolean;
  }) => {
    if (!dialogRef.value?.open) {
      return;
    }

    const dialogRect = dialogRef.value.getBoundingClientRect();
    const dialogRefTop = dialogRect.top + window.scrollY;
    const snapPointRect = snapPointElement?.getBoundingClientRect();
    const snapPointTop = snapPointRect?.top || 0 + window.scrollY;

    if (isOpenedFullscreen && isFullscreen) {
      move("0px", ({ position }) => {
        setCssVar("CURRENT_SNAP_POINT_POSITION_Y", position);
      });
      return;
    }

    move(
      `calc(min(${snapPointTop - dialogRefTop}px - 100%, 0px))`,
      ({ position }) => {
        setCssVar("CURRENT_SNAP_POINT_POSITION_Y", position);
      },
    );
  };

  return { move, moveToSnapPoint };
};
