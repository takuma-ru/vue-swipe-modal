import { defineConfig, type Plugin } from "vite";
import { convertScssToCss } from "./src/utils/convertScssToCss";

const litScssToJs = (): Plugin => {
  return {
    name: "litScssToJs",
    async transform(code, id) {
      if (id.endsWith(".cecss")) {
        const result = await convertScssToCss(code);
        return result;
      }
    },
  };
};

export default defineConfig({
  plugins: [litScssToJs()],

  build: {
    outDir: "./dist",
    lib: {
      entry: "src/main.ts",
      name: "core",
      fileName: "core",
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        exports: "named",
        manualChunks: undefined,
      },
    },
  },
});
