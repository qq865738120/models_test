import { defineConfig } from 'vite'
export default defineConfig({
  base: './',
  build: { outDir: 'output', emptyOutDir: false },
  cacheDir: '.runtime/vite',
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 5173, strictPort: true },
})
