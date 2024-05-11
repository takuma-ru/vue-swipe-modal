import { defineConfig } from "vite";
import { litScssToJs } from "./.scripts/litScssToJs";

export default defineConfig({
  plugins: [ litScssToJs() ],

  build: {
    outDir: "./dist",
    lib: {
      entry: "src/main.ts",
      name: "core",
      fileName: "core",
      formats: [
        "es",
        "cjs",
        "umd",
      ],
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
