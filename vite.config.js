import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 上传包可在互动空间的子路径下加载资源。
  base: './',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true
  }
})
