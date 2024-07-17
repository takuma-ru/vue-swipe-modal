import { FC, PropsWithChildren, useEffect, useState } from "react";

// 仮定として、@web-bottom-sheet/coreがロード完了イベントを提供しているとします。
import "@web-bottom-sheet/core";

type BottomSheetProps = PropsWithChildren<{
  open: boolean;
  onClose?: () => void;
}>;

export const BottomSheet: FC<BottomSheetProps> = ({
  open,
  children,
  onClose,
}) => {
  // Webコンポーネントのロード状態を管理するための状態変数
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // web-bottom-sheetがロード完了したことを検知するイベントリスナーを設定
    const handleLoad = () => {
      setIsLoaded(true); // ロード完了状態を更新
    };

    // イベントリスナーを追加
    window.addEventListener("web-bottom-sheet-loaded", handleLoad);

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      window.removeEventListener("web-bottom-sheet-loaded", handleLoad);
    };
  }, []); // 空の依存配列で、マウント時にのみ実行

  // ロードが完了したらweb-bottom-sheetを描画、そうでなければローディング表示など
  return isLoaded ? (
    <web-bottom-sheet open={open} on-close={onClose}>
      {children}
    </web-bottom-sheet>
  ) : (
    <></>
  );
};
