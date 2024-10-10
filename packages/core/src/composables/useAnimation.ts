type UseAnimationProps = {
  dialogRef: globalThis.Ref<HTMLDialogElement | null>;
  // panelRef: globalThis.Ref<HTMLDivElement | null>;
};

const KEY_FRAME_ANIMATION_OPTIONS = {
  duration: 300,
  easing: "cubic-bezier(0.2, 0.0, 0, 1.0)",
} as const satisfies KeyframeAnimationOptions;

export const useAnimation = ({ dialogRef }: UseAnimationProps) => {
  const move = (
    position: string,
    onFinish?: ({ position }: { position: string }) => void,
  ) => {
    if (!dialogRef.value?.open) {
      return;
    }

    const animate = dialogRef.value.animate(
      [
        {
          bottom: dialogRef.value.style.getPropertyValue("--bottom") || "-100%",
        },
        {
          bottom: position,
        },
      ],
      KEY_FRAME_ANIMATION_OPTIONS,
    );

    animate.onfinish = () => {
      dialogRef.value?.style.setProperty("--bottom", position);
      onFinish?.({ position });
    };
  };

  return {
    move,
  };
};
