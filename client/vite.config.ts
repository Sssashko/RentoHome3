import react from '@vitejs/plugin-react'         // Enables React support (JSX, Fast Refresh)
import { defineConfig } from 'vite'              // Helper to define Vite config with IntelliSense
import tsconfigpaths from 'vite-tsconfig-paths'  // Supports path aliases from tsconfig.json

export default defineConfig({
  plugins: [
    react(),          // React plugin
    tsconfigpaths()   // Enables usage of @/path aliases
  ],
  server: {
    host: true,        // Allow external devices (LAN) to access the dev server
    strictPort: true,  // Fail if port 3000 is busy (no auto-switch)
    port: 3000         // Start dev server on port 3000
  }
})
