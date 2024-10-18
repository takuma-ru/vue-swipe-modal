import { mainConfig } from "./main.mjs";

const config = () =>
  mainConfig({
    type: "lib",
    typescript: true,
    vue: true,
    ignores: ["**/dist/**/*"],
  });

export { config };
