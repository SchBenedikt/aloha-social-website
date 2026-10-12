#!/usr/bin/env node
/**
 * Generate sitemap.xml and robots.txt for static export.
 *
 * Routes are discovered by scanning out/*.html — every page that was
 * actually built ends up in the sitemap, so no page can be forgotten.
 * Tune per-section changefreq/priority in ROUTE_META below.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "out");

const SITE_URL = "https://aloha.social";

/** Explicit entries win over the heuristics in meta(). */
const ROUTE_META = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/why": { changeFrequency: "monthly", priority: 0.9 },
  "/get-started": { changeFrequency: "monthly", priority: 0.9 },
  "/install": { changeFrequency: "monthly", priority: 0.9 },
  "/features": { changeFrequency: "monthly", priority: 0.8 },
  "/docs": { changeFrequency: "weekly", priority: 0.8 },
  "/brand": { changeFrequency: "yearly", priority: 0.3 },
  "/clients": { changeFrequency: "monthly", priority: 0.7 },
  "/admins": { changeFrequency: "monthly", priority: 0.7 },
  "/server": { changeFrequency: "monthly", priority: 0.7 },
  "/developers": { changeFrequency: "monthly", priority: 0.6 },
  "/developers/docs": { changeFrequency: "monthly", priority: 0.6 },
  "/developers/docs/api": { changeFrequency: "monthly", priority: 0.6 },
  "/developers/docs/federation": { changeFrequency: "monthly", priority: 0.6 },
  "/developers/docs/operations": { changeFrequency: "monthly", priority: 0.6 },
  "/developers/docs/protocol": { changeFrequency: "monthly", priority: 0.6 },
};

function meta(routePath) {
  if (ROUTE_META[routePath]) return ROUTE_META[routePath];
  if (routePath.startsWith("/features/")) return { changeFrequency: "monthly", priority: 0.7 };
  if (routePath.startsWith("/activitypub")) return { changeFrequency: "monthly", priority: 0.7 };
  if (routePath.startsWith("/docs/")) return { changeFrequency: "monthly", priority: 0.6 };
  return { changeFrequency: "monthly", priority: 0.6 };
}

function collectRoutes(dir) {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_")) continue;
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...collectRoutes(entryPath));
      continue;
    }
    if (!entry.name.endsWith(".html") || entry.name === "404.html") continue;
    const relative = path.relative(OUT_DIR, entryPath).replace(/\\/g, "/");
    routes.push(relative === "index.html" ? "/" : `/${relative.replace(/\.html$/, "")}`);
  }
  return routes;
}

const seen = new Set();
const routes = collectRoutes(OUT_DIR)
  .filter((routePath) => {
    if (seen.has(routePath)) return false;
    seen.add(routePath);
    return true;
  })
  .sort()
  .map((routePath) => ({ path: routePath, ...meta(routePath) }));

if (routes.length === 0) {
  console.error("generate-seo: no HTML routes found in out/ — run `next build` first");
  process.exit(1);
}

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const url = `${SITE_URL}${route.path}`;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$
Disallow: /*?*

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${new URL(SITE_URL).hostname}
`;

fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), robots);

console.log(`Generated sitemap.xml (${routes.length} routes) and robots.txt`);
