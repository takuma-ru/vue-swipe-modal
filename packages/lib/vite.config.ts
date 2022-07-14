import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
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
        exports: 'auto'
      }
    }
  }
})
