import { defineConfig, type PreviewServer, type ViteDevServer } from 'vite'

const proxy = {
  '/api': { target: 'http://127.0.0.1:4174', changeOrigin: false },
  '/health': { target: 'http://127.0.0.1:4174', changeOrigin: false },
}

function hideBackendFiles(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((request, response, next) => {
    let pathname: string
    try {
      pathname = decodeURIComponent((request.url ?? '/').split('?')[0]).replaceAll('\\', '/')
    } catch {
      response.statusCode = 400
      response.end('Invalid URL')
      return
    }
    if (/(?:^|\/)server(?:\/|$)/.test(pathname) || /\/materials\/orders\.json$/.test(pathname)) {
      response.statusCode = 404
      response.end('Not Found')
      return
    }
    next()
  })
}

export default defineConfig({
  plugins: [{ name: 'dispatch-private-server-files', configureServer: hideBackendFiles, configurePreviewServer: hideBackendFiles }],
  base: './',
  build: { outDir: 'output', emptyOutDir: true },
  cacheDir: '.runtime/vite',
  server: { host: '127.0.0.1', port: 5173, strictPort: true, proxy },
  preview: { host: '127.0.0.1', port: 5173, strictPort: true, proxy },
})
