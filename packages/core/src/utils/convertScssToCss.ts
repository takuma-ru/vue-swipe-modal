import sass from "sass-embedded";

export const convertScssToCss = (scss: string) => {
  const result = sass.compileString(scss).css.toString();

  return `
    import { css } from "lit";
    export const styles = css\`${result}\`
    export default styles;
  `;
};
