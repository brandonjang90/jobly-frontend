import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy requests starting with "/api" to "http://localhost:3001"
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),  // Removes "/api" prefix when forwarding
      },
    },
  },
  build: {
    minify: true, 
    outDir: 'dist'

  },
  optimizeDeps: {
    include: ["jwt-decode"],  // Force Vite to pre-bundle jwt-decode correctly
  },
});
