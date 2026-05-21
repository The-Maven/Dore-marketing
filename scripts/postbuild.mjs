#!/usr/bin/env node
// Post-build: copy static assets, generate sitemap.xml + robots.txt,
// and re-quote meta/link attributes that Parcel's HTML optimizer
// stripped (some social scrapers — LinkedIn, Claude's URL inspector —
// use strict regex parsers that require quoted attribute values).
import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const DIST = path.join(ROOT, "dist");
const ORIGIN = "https://rayleighstark.com";

const PAGES = [
  { url: "/", priority: "1.0", changefreq: "monthly" },
  { url: "/approach", priority: "0.8", changefreq: "monthly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.6", changefreq: "monthly" },
  { url: "/terms", priority: "0.3", changefreq: "yearly" },
];

async function copyAsset(rel) {
  const src = path.join(ROOT, rel);
  if (!existsSync(src)) {
    console.warn(`  · skip (missing): ${rel}`);
    return;
  }
  const dst = path.join(DIST, rel);
  await mkdir(path.dirname(dst), { recursive: true });
  await copyFile(src, dst);
  console.log(`  · copied: ${rel}`);
}

async function copyImagesDir() {
  const srcDir = path.join(ROOT, "src/images");
  if (!existsSync(srcDir)) return;
  const dstDir = path.join(DIST, "src/images");
  await mkdir(dstDir, { recursive: true });
  const entries = await readdir(srcDir);
  for (const name of entries) {
    if (name.startsWith(".")) continue;
    const src = path.join(srcDir, name);
    const dst = path.join(dstDir, name);
    try {
      const stat = await import("node:fs").then(m => m.promises.stat(src));
      if (stat.isFile()) {
        await copyFile(src, dst);
        console.log(`  · copied: src/images/${name}`);
      }
    } catch { /* ignore */ }
  }
}

async function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = PAGES.map(p =>
    `  <url>
    <loc>${ORIGIN}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await writeFile(path.join(DIST, "sitemap.xml"), xml);
  console.log("  · wrote: sitemap.xml");
}

async function writeRobots() {
  const body = `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`;
  await writeFile(path.join(DIST, "robots.txt"), body);
  console.log("  · wrote: robots.txt");
}

async function moveToFolder(name) {
  // Convert dist/<name>.html → dist/<name>/index.html
  // Cloudflare Pages serves /<name>/index.html automatically at /<name>
  // — no _redirects rewrite needed. Works on every static host.
  const src = path.join(DIST, `${name}.html`);
  const dstDir = path.join(DIST, name);
  const dst = path.join(dstDir, "index.html");
  if (!existsSync(src)) {
    console.warn(`  · skip (missing): ${name}.html`);
    return;
  }
  await mkdir(dstDir, { recursive: true });
  const { rename } = await import("node:fs/promises");
  await rename(src, dst);
  console.log(`  · folderised: ${name}.html → ${name}/index.html`);
}

// Re-quote attribute values inside <meta> and <link> tags. Parcel's HTML
// optimizer strips quotes on values that don't strictly need them per the
// HTML5 spec — but LinkedIn's and similar scrapers use regexes that require
// `property="og:image"` (with quotes), so without this pass they report
// "no image found" even though the tag is present.
const ATTR = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`<>=]+))/g;
function requoteTag(tag) {
  // tag is the full match like `<meta name=image property=og:image content="...">`
  const head = tag.match(/^<\s*([a-z]+)/i);
  if (!head) return tag;
  const elName = head[1];
  let out = `<${elName}`;
  ATTR.lastIndex = 0;
  let m;
  // skip the element name itself by advancing past it
  const attrText = tag.slice(head[0].length, tag.endsWith("/>") ? -2 : -1);
  while ((m = ATTR.exec(attrText)) !== null) {
    const name = m[1];
    const val = m[2] ?? m[3] ?? m[4] ?? "";
    // Escape any embedded " in the value (rare in our content).
    const safe = val.replace(/"/g, "&quot;");
    out += ` ${name}="${safe}"`;
  }
  out += tag.endsWith("/>") ? " />" : ">";
  return out;
}
async function requoteHtmlFile(file) {
  let html = await readFile(file, "utf8");
  const before = html;
  html = html.replace(/<(?:meta|link)\b[^>]*>/gi, requoteTag);
  if (html !== before) {
    await writeFile(file, html);
    console.log(`  · re-quoted meta/link attrs: ${path.relative(DIST, file)}`);
  }
}
async function requoteAllHtml() {
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.isFile() && e.name.endsWith(".html")) await requoteHtmlFile(p);
    }
  };
  await walk(DIST);
}

async function main() {
  console.log("\n[postbuild]");
  // Folder-structure the interior pages so they serve cleanly without
  // depending on host-specific _redirects rewrites.
  for (const page of ["about", "contact", "approach", "terms"]) {
    await moveToFolder(page);
  }
  // Parcel hashes assets referenced in HTML (avatar, favicons). We also keep
  // unhashed copies at known paths for browsers that request /favicon.svg or
  // /apple-touch-icon.png directly, and for og:image which uses an absolute URL.
  await copyAsset("favicon.svg");
  await copyAsset("favicon-16.png");
  await copyAsset("favicon-32.png");
  await copyAsset("favicon-192.png");
  await copyAsset("favicon-512.png");
  await copyAsset("apple-touch-icon.png");
  await copyAsset("og-image.png");
  await copyAsset("_headers");
  await copyAsset("_redirects");
  await writeSitemap();
  await writeRobots();
  await requoteAllHtml();
  console.log("[postbuild] done\n");
}

main().catch(e => { console.error(e); process.exit(1); });
