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
  // 개발 서버 설정 (CORS 해결을 위한 프록시)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // GitHub Pages 배포를 위한 설정
  base: process.env.NODE_ENV === 'production' ? '/sendy/' : '/',
  build: {
    outDir: 'dist', // 빌드 결과를 dist 폴더에 저장
    emptyOutDir: true
  }
})
