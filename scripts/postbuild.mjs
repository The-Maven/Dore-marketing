#!/usr/bin/env node
// Post-build: copy static assets, generate sitemap.xml + robots.txt.
import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
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
  console.log("[postbuild] done\n");
}

main().catch(e => { console.error(e); process.exit(1); });
