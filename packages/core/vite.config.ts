import { unpluginLitSass } from "unplugin-lit-sass";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [ unpluginLitSass.vite() ],

  build: {
    outDir: "./dist",
    minify: true,
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
