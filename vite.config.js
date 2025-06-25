import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // GitHub Pages 배포를 위한 설정
  base: process.env.NODE_ENV === 'production' ? '/songpa-gether/' : '/',
  build: {
    outDir: 'dist', // 빌드 결과를 dist 폴더에 저장
    emptyOutDir: true
  }
})
