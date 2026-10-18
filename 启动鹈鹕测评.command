#!/bin/zsh
set -e
cd -- "${0:A:h}"
if [[ ! -d web/node_modules ]]; then
  (cd web && npm ci)
fi
(cd web && npm run build)
exec python3 bench.py serve --open
