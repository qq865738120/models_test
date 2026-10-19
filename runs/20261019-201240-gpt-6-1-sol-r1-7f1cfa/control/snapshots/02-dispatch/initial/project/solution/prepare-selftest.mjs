import fs from 'node:fs'
const html=fs.readFileSync('output/index.html','utf8')
fs.writeFileSync('output/selftest.html',html.replace('</body>','<script src="./verification/performance.js"></script><script src="./verification/selftest.js"></script></body>'))
fs.copyFileSync('tools/performance.js','output/verification/performance.js')
