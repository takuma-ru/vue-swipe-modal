export class BottomCssVarController {
  setBottomCssVar(value: string) {
    document.documentElement.style.setProperty("--bottom", value);
  };
}
