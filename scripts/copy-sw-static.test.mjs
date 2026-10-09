import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { validateOfflineShell } from "./copy-sw-static.mjs";

function createStaticFixture({ precacheApp = true } = {}) {
  const staticDirectory = mkdtempSync(join(tmpdir(), "offline-shell-"));
  mkdirSync(join(staticDirectory, "assets"));
  writeFileSync(join(staticDirectory, "assets/app.js"), "app");
  writeFileSync(join(staticDirectory, "assets/style.css"), "css");
  writeFileSync(join(staticDirectory, "workbox-fixture.js"), "workbox");
  const entries = [
    ...(precacheApp ? ['{url:"assets/app.js",revision:null}'] : []),
    '{url:"assets/style.css",revision:null}',
    '{url:"/",revision:"shell-hash"}',
  ];
  writeFileSync(
    join(staticDirectory, "sw.js"),
    `define(["./workbox-fixture"],function(){precacheAndRoute([${entries.join(",")}])});`,
  );
  return staticDirectory;
}

test("validates a cached root shell and every deployed app asset", (t) => {
  const staticDirectory = createStaticFixture();
  t.after(() => rmSync(staticDirectory, { recursive: true, force: true }));

  assert.doesNotThrow(() => validateOfflineShell(staticDirectory));
});

test("rejects a deployed app bundle that is missing from the precache", (t) => {
  const staticDirectory = createStaticFixture({ precacheApp: false });
  t.after(() => rmSync(staticDirectory, { recursive: true, force: true }));

  assert.throws(
    () => validateOfflineShell(staticDirectory),
    /client asset is missing from the precache: assets\/app\.js/,
  );
});