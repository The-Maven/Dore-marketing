// One-off: capture a tight PDF of just the Hermes runtime section
// for review. Uses headless Chrome over CDP, like capture-og.mjs.

import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = process.env.URL || 'http://localhost:1234/#runtime';
const OUT = process.env.OUT || join(process.cwd(), 'output', 'hermes-runtime.pdf');
const PORT = 9224;

const userDir = mkdtempSync(join(tmpdir(), 'pdf-chrome-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${userDir}`,
  '--window-size=1280,5000',
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  width: 1280, height: 5000, deviceScaleFactor: 2, mobile: false,
});

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
await sleep(1200);

// Find the runtime section's bounding rect
const { result } = await cmd('Runtime.evaluate', {
  expression: `
    const el = document.querySelector('#runtime');
    const r = el.getBoundingClientRect();
    JSON.stringify({ top: r.top + window.scrollY, height: r.height });
  `,
  returnByValue: true,
});
const { top, height } = JSON.parse(result.value);

// PDF the section, with some padding
const margin = 24;
const pdfHeight = Math.ceil(height + margin * 2);
const { data } = await cmd('Page.printToPDF', {
  printBackground: true,
  paperWidth: 13.33,   // ≈1280px / 96dpi
  paperHeight: pdfHeight / 96,
  marginTop: margin / 96,
  marginBottom: margin / 96,
  marginLeft: 0,
  marginRight: 0,
  pageRanges: '1',
  displayHeaderFooter: false,
  preferCSSPageSize: false,
});
writeFileSync(OUT, Buffer.from(data, 'base64'));
console.log(`wrote ${OUT} · section height: ${Math.round(height)}px`);

ws.close();
chrome.kill();
await sleep(200);
try { rmSync(userDir, { recursive: true, force: true }); } catch {}
