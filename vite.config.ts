import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    allowedHosts: [
      'dev.vorlie.pl',
    ],
    proxy: {
      // Proxy requests starting with /api to your Worker URL
      '/api': {
        target: 'https://api.vorlie.pl', // Your Cloudflare Worker's public URL
        changeOrigin: true, // Needed for virtual hosting
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite /api/clips.json to /clips.json for the Worker
        // Add this if your Worker is not on a standard SSL port or if you have specific cert issues
        // secure: false,
        // Configure CORS on the proxy side if needed, though changeOrigin usually handles it
        // configure: (proxy, options) => {
        //   proxy.on('proxyRes', (proxyRes, req, res) => {
        //     proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'; // Or your specific local dev URL
        //   });
        // },
      },
    },
  }
})
