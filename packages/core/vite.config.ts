import vue from "@vitejs/plugin-vue";
import Unimport from "unimport/unplugin";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("web-"),
        },
      },
    }),
    Unimport.vite({
      presets: ["vue", "@vueuse/core"],
      dts: true,
    }),
    cssInjectedByJsPlugin(),
    dts({ rollupTypes: true }),
  ],

  build: {
    outDir: "./dist",
    cssCodeSplit: true,
    lib: {
      entry: "src/main.ts",
      name: "core",
      fileName: "core",
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        manualChunks: undefined,
      },
    },
  },
});
