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
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts';
            }
            return 'vendor';
          }
          if (id.includes('/src/modules/')) {
            const moduleName = id.split('/src/modules/')[1].split('/')[0];
            return `module-${moduleName}`;
          }
        }
      }
    }
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
        target: 'https://worksphere-enterprise-grade-activity.onrender.com',
        changeOrigin: true,
        secure: false, // For Render proxy if needed, though usually true is fine
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
        target: 'https://worksphere-enterprise-grade-activity.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/health': {
        target: 'https://worksphere-enterprise-grade-activity.onrender.com/health',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
