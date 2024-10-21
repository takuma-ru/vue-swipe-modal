import { resister, type WebBottomSheetProps } from "@web-bottom-sheet/core";
import { type PropsWithChildren, useEffect, useRef } from "react";

type BottomSheetProps = PropsWithChildren<
  WebBottomSheetProps & {
    onClose: () => void;
  }
>;

export const BottomSheet = (props: BottomSheetProps) => {
  const {
    open,
    isBackdrop,
    isDragHandle,
    isFullscreen,
    isPersistent,
    isScrollLock,
    onClose,
    children,
  } = props;

  const webBottomSheetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    resister(["web-bottom-sheet"]);
  }, []);

  useEffect(() => {
    const currentWebBottomSheetRef = webBottomSheetRef.current;

    if (currentWebBottomSheetRef) {
      currentWebBottomSheetRef.addEventListener("close", onClose);
    }

    return () => {
      if (currentWebBottomSheetRef) {
        currentWebBottomSheetRef.removeEventListener("close", onClose);
      }
    };
  }, [onClose]);

  return (
    <web-bottom-sheet
      ref={webBottomSheetRef}
      open={open ? "" : undefined}
      is-backdrop={isBackdrop ? "" : undefined}
      is-drag-handle={isDragHandle ? "" : undefined}
      is-fullscreen={isFullscreen ? "" : undefined}
      is-persistent={isPersistent ? "" : undefined}
      is-scroll-lock={isScrollLock ? "" : undefined}
    >
      {children}
    </web-bottom-sheet>
  );
};
