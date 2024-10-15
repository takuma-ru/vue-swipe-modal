import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("web-"),
        },
      },
    }),
    /* Unimport.vite({
      presets: ["vue", "@vueuse/core"],
      dts: true,
      addons: {
        vueTemplate: true,
        vueDirectives: true,
      },
    }), */
    cssInjectedByJsPlugin(),
    dts({
      outDir: "dist/types",
      tsconfigPath: resolve(__dirname, "tsconfig.json"),
    }),
  ],

  resolve: {
    alias: {
      src: "/src",
    },
  },

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
