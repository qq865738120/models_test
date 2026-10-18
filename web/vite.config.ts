import {defineConfig} from 'vite'
// Production preview is served by bench.py; development proxy keeps requests same-origin.
export default defineConfig({build:{outDir:'dist',rollupOptions:{output:{manualChunks:{charts:['recharts']}}}},server:{host:'127.0.0.1',port:5178,proxy:{'/api':{target:'http://127.0.0.1:8787',changeOrigin:true,configure(proxy){proxy.on('proxyReq',req=>{req.setHeader('Origin','http://127.0.0.1:8787')})}}}}})
