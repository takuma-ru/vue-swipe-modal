/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "web-bottom-sheet": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      open?: string;
      "is-backdrop"?: string;
      "is-drag-handle"?: string;
      "is-fullscreen"?: string;
      "is-persistent"?: string;
      "is-scroll-lock"?: string;
    };
  }
  interface IntrinsicElements {
    "web-bottom-sheet-snap-point": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
