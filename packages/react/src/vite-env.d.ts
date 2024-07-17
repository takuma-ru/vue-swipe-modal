/// <reference types="vite/client" />

interface WebBottomSheetProps extends React.HTMLAttributes<HTMLElement> {
  open: boolean;
  "on-close"?: () => void;
}

// biome-ignore lint/style/noNamespace: <explanation>
declare namespace JSX {
  interface IntrinsicElements {
    "web-bottom-sheet": React.DetailedHTMLProps<
      WebBottomSheetProps,
      HTMLElement
    >;
  }
}
