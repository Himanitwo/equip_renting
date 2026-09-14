import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // Use 'http://localhost:8000' for PHP built-in server
        // Use 'http://localhost/equipease-api' if using XAMPP
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});