import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
const root=path.resolve('output')
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.md':'text/plain; charset=utf-8'}
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Access-Control-Allow-Origin':'*','Cache-Control':'no-cache'});res.end(data)}catch{res.writeHead(404).end('Not found')}}).listen(5189,'127.0.0.1',()=>console.log('Static output preview http://127.0.0.1:5189'))
