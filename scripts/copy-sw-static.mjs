#!/usr/bin/env node
/**
 * Copy the PWA service-worker artifacts from `dist/` into
 * `.vercel/output/static/` so the deployed Nitro/Vercel function actually
 * serves `/sw.js` and its workbox bundle.
 *
 * `vite-plugin-pwa` (generateSW) writes these two files into `dist/`, but
 * Nitro's `preset: "vercel"` only publishes `.vercel/output/static/` — which
 * otherwise contains the manifest, icons and `__grok/` chrome but never the
 * SW entry point. Without this copy the browser can't fetch `/sw.js` on
 * deploy, the PWA never registers, and offline never activates.
 *
 * Run as part of `npm run build`, after `vite build` and before `db:migrate`.
 */
import { readdirSync, cpSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, "dist");
const VERCEL_STATIC = join(ROOT, ".vercel", "output", "static");

const SW_FILES = ["sw.js"];

/** workbox-<hash>.js — the basename is stable per build, the hash changes. */
function workboxFiles() {
  try {
    return readdirSync(DIST).filter((name) => name.startsWith("workbox-") && name.endsWith(".js"));
  } catch {
    return [];
  }
}

function filesUnder(directory, prefix = "") {
  try {
    return readdirSync(join(directory, prefix), { withFileTypes: true }).flatMap((entry) => {
      const relativePath = join(prefix, entry.name);
      if (entry.isDirectory()) return filesUnder(directory, relativePath);
      return entry.isFile() ? [relativePath.replaceAll("\\", "/")] : [];
    });
  } catch {
    return [];
  }
}

export function validateOfflineShell(staticDirectory) {
  const workerPath = join(staticDirectory, "sw.js");
  const worker = readFileSync(workerPath, "utf8");
  const workboxName = worker.match(/define\(\["\.\/(workbox-[^"]+)"\]/)?.[1];
  if (!workboxName || !filesUnder(staticDirectory).includes(`${workboxName}.js`)) {
    throw new Error("[copy-sw-static] generated service worker is missing its Workbox runtime");
  }

  const precacheUrls = new Set(
    [...worker.matchAll(/\{url:"([^"]+)",revision:(?:null|"[^"]*")\}/g)].map(
      (match) => match[1],
    ),
  );
  if (!precacheUrls.has("/")) {
    throw new Error("[copy-sw-static] generated service worker does not precache the root app shell");
  }

  const staticFiles = new Set(filesUnder(staticDirectory));
  const assetFiles = [...staticFiles].filter((file) => /^assets\/.*\.(?:js|css)$/.test(file));
  if (assetFiles.length === 0) {
    throw new Error("[copy-sw-static] no client JavaScript or CSS assets found in deployed static output");
  }
  for (const file of assetFiles) {
    if (!precacheUrls.has(file) && !precacheUrls.has(`/${file}`)) {
      throw new Error(`[copy-sw-static] client asset is missing from the precache: ${file}`);
    }
  }

  for (const url of precacheUrls) {
    if (url === "/") continue;
    const relativePath = decodeURIComponent(url).replace(/^\/+/, "");
    if (!staticFiles.has(relativePath)) {
      throw new Error(`[copy-sw-static] precache entry is missing from deployed static output: ${url}`);
    }
  }
}

function main() {
  let copied = 0;
  for (const name of SW_FILES) {
    const src = join(DIST, name);
    cpSync(src, join(VERCEL_STATIC, name), { force: true });
    copied++;
  }
  for (const name of workboxFiles()) {
    cpSync(join(DIST, name), join(VERCEL_STATIC, name), { force: true });
    copied++;
  }
  if (copied === 0) {
    throw new Error("[copy-sw-static] no service-worker artifacts found in dist/");
  }
  validateOfflineShell(VERCEL_STATIC);
  console.log(`[copy-sw-static] copied ${copied} SW artifact(s) into .vercel/output/static/`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) main();
