import process from "node:process";
import sass from "sass-embedded";

export const convertScssToCss = (scss: string) => {
  if (scss.includes("id-arn0029fj02jo")) {
    return scss;
  }

  const result = sass.compileString(scss, {
    style: "compressed",
    loadPaths: [ process.cwd() ],
  }).css.toString();

  return `
    // id-arn0029fj02jo
    // This file is auto generated by convertScssToCss.ts
    import { css } from "lit";
    export const styles = css\`${result}\`
    export default styles;
  `;
};
