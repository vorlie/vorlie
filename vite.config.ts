import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: 'esbuild'
  },
  server: {
    port: 5173,
    allowedHosts: [
      'dev.vorlie.pl',
    ],
    proxy: {
      '/api': {
        target: 'https://api.vorlie.pl',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
