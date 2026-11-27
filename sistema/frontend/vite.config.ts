import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite automatically exposes variables prefixed with VITE_ from .env files.
  // No extra config needed; this file is here for the plugin and future tweaks.
  test: {
    // Run tests in a browser-like environment so React components can be tested.
    environment: 'jsdom',
    globals: true,
  },
})
