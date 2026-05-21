// Capture a 1200x630 PNG of the live hero (headline + populated log)
// and write it to og-image.png. Uses CDP over WebSocket — no puppeteer dep.
//
// Run: node scripts/capture-og.mjs   (dev server must be on localhost:1234)

import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = process.env.OG_URL || 'http://localhost:1234/';
const OUT = process.env.OG_OUT || join(process.cwd(), 'og-image.png');
const PORT = 9223;

const userDir = mkdtempSync(join(tmpdir(), 'og-chrome-'));

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${userDir}`,
  '--window-size=1200,630',
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wait for the debugging endpoint to come up.
let endpoint;
for (let i = 0; i < 40; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    if (r.ok) { endpoint = (await r.json()).webSocketDebuggerUrl; break; }
  } catch {}
  await sleep(100);
}
if (!endpoint) { chrome.kill(); rmSync(userDir, { recursive: true, force: true }); throw new Error('chrome did not start'); }

const ws = new WebSocket(endpoint);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const inflight = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && inflight.has(m.id)) {
    const { resolve, reject } = inflight.get(m.id);
    inflight.delete(m.id);
    if (m.error) reject(new Error(m.error.message)); else resolve(m.result);
  }
};
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++msgId;
  inflight.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});

// Attach to the existing target.
const targets = await send('Target.getTargets');
const target = targets.targetInfos.find((t) => t.type === 'page');
const { sessionId } = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });

const cmd = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++msgId;
  inflight.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, sessionId, method, params }));
});

await cmd('Page.enable');
await cmd('Emulation.setDeviceMetricsOverride', {
  width: 1200, height: 630, deviceScaleFactor: 1, mobile: false,
});

// Navigate and wait for load.
const navP = new Promise((resolve) => {
  ws.addEventListener('message', function onLoad(e) {
    const m = JSON.parse(e.data);
    if (m.method === 'Page.loadEventFired' && m.sessionId === sessionId) {
      ws.removeEventListener('message', onLoad);
      resolve();
    }
  });
});
await cmd('Page.navigate', { url: URL });
await navP;

// Give the log stream time to populate (entries appear via setInterval).
await sleep(4500);

const { data } = await cmd('Page.captureScreenshot', {
  format: 'png',
  clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 },
  captureBeyondViewport: false,
});
writeFileSync(OUT, Buffer.from(data, 'base64'));
console.log(`wrote ${OUT}`);

ws.close();
chrome.kill();
// Give chrome a moment to release its profile files before we tear it down.
await sleep(200);
try { rmSync(userDir, { recursive: true, force: true }); } catch {}
