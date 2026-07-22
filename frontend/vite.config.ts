import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    sourcemap: false
  },
  server: {
    fs: {
      allow: ['..', '../../../']
    },
    port: 3005,
    strictPort: true,
    host: true,
    proxy: {
      '/socket.io': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        ws: true,
      },
      '/api/ceo/kpis': {
        target: 'http://127.0.0.1:8080/api/v1/ceo/kpis',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ceo\/kpis/, '')
      },
      '/api/ceo/company-overview': {
        target: 'http://127.0.0.1:8080/api/v1/ceo/company-overview',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ceo\/company-overview/, '')
      },
      '/api/cto': {
        target: 'http://127.0.0.1:8080/api/v1/cto',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cto/, '')
      },
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        ws: true,
      },
      '/health': 'http://127.0.0.1:5001',
    },
  },
})
