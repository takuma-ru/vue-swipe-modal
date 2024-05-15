// eslint-disable-next-line ts/ban-types
type CssVarName = "bottom" | "movementAmountY" | "snapPointPosition" | String;

interface SetCssVarParameter {
  name: CssVarName;
  value: string;
  fallback?: (name: CssVarName, value: string) => void;
}

export class CSSVariableController {
  private host: HTMLElement;

  constructor(host: HTMLElement) {
    this.host = host;
  }

  getCssVar(name: CssVarName) {
    return getComputedStyle(this.host).getPropertyValue(`--${name}`);
  }

  setCssVar({ name, value, fallback }: SetCssVarParameter) {
    this.host.style.setProperty(`--${name}`, value);

    fallback?.(
      name,
      this.getCssVar(name),
    );
  }

  removeCssVar(name: CssVarName) {
    this.host.style.removeProperty(`--${name}`);
  }
}
