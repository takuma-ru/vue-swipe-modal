import sass from "sass-embedded";

export const convertScssToCss = (scss: string) => {
  if (scss.includes("NOTE: Compiled!"))
    return scss;

  const result = sass.compileString(scss).css.toString();

  return `
    // NOTE: Compiled!
    import { css } from "lit";
    export const styles = css\`${result}\`
    export default styles;
  `;
};
