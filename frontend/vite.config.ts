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
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        ws: true,
      },
      '/health': 'http://127.0.0.1:5001',
    },
  },
})
