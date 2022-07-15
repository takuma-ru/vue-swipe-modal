import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
  ],

  optimizeDeps: {
    exclude: ['vue-demi']
  },

  build: {
    outDir: 'dist',
    cssCodeSplit: true,
    // minify: true, // コード圧縮がなく、開発・デバッグが容易
    lib: {
      entry: './src/index.ts',
      name: 'swipeModal',
      fileName: 'swipe-modal',
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        exports: 'named',
        manualChunks: undefined,
      },
    }
  }
})
