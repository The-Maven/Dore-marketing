import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const info = await stat(fullPath);
    if (info.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
      continue;
    }
    if (entry.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function ensureHeadTag(content) {
  if (/<head\b/i.test(content)) {
    return content;
  }

  const htmlOpen = content.match(/<html\b[^>]*>/i);
  if (!htmlOpen || htmlOpen.index == null) {
    return content;
  }

  const htmlOpenEnd = htmlOpen.index + htmlOpen[0].length;
  const htmlCloseMatch = content.match(/<\/html>/i);
  const htmlCloseIndex = htmlCloseMatch && htmlCloseMatch.index != null ? htmlCloseMatch.index : content.length;

  const insideHtml = content.slice(htmlOpenEnd, htmlCloseIndex);
  const firstBodyLike = insideHtml.match(/<(main|div|section|article|header|footer|nav|form|table|h1|h2|p)\b/i);
  const bodyStart = firstBodyLike && firstBodyLike.index != null ? firstBodyLike.index : insideHtml.length;

  const headContent = insideHtml.slice(0, bodyStart).trim();
  const bodyContent = insideHtml.slice(bodyStart).trim();
  const suffix = htmlCloseMatch ? content.slice(htmlCloseIndex) : "</html>";

  return `${content.slice(0, htmlOpenEnd)}<head>${headContent}</head><body>${bodyContent}</body>${suffix}`;
}

async function main() {
  const distDir = process.argv[2];
  if (!distDir) {
    console.error("Usage: node scripts/ensure-head-tags.mjs <dist-dir>");
    process.exit(1);
  }

  const htmlFiles = await collectHtmlFiles(distDir);

  for (const filePath of htmlFiles) {
    const original = await readFile(filePath, "utf8");
    const updated = ensureHeadTag(original);
    if (updated !== original) {
      await writeFile(filePath, updated, "utf8");
    }
  }
}

await main();
