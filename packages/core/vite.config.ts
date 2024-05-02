import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), cssInjectedByJsPlugin()],

	build: {
		outDir: "./dist",
		cssCodeSplit: true,
		lib: {
			entry: "src/main.ts",
			name: "@takuma-ru/vue-swipe-modal",
			fileName: "vueSwipeModal",
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
})
