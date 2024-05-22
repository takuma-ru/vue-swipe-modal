import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('web-')
      }
    }
  }),
  cssInjectedByJsPlugin(),
  dts({ rollupTypes: true }),],

  build: {
		outDir: "./dist",
		cssCodeSplit: true,
		lib: {
			entry: "src/main.ts",
			name: "vue",
			fileName: "vue",
			formats: [
				"es",
				"cjs",
				"umd",
			],
		},
		rollupOptions: {
			external: [ "vue" ],
			output: {
				exports: "named",
				manualChunks: undefined,
			},
		},
	},
})
