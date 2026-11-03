#!/bin/sh
set -eu
cd "$(dirname "$0")"
# :8081 is QA-only — a revive must never inherit a stale built-output preview.
# Called directly, not via npm: no node_modules needed, so nothing to wait for.
node scripts/preview.mjs stop || true
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
# vite-plugin-pwa generates its dev worker against dev-dist; seed it from the
# built static tree so workbox's globs resolve instead of 500ing the overlay.
if [ -d .vercel/output/static ]; then
  mkdir -p dev-dist
  cp -r .vercel/output/static/. dev-dist/ 2>/dev/null || true
fi
npm run dev >>/tmp/app-startup.log 2>&1 &