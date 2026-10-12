#!/usr/bin/env node
/**
 * Generate sitemap.xml and robots.txt for static export
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "out");

const SITE_URL = "https://aloha.social";

const FEATURES = [
  { slug: "write" },
  { slug: "read" },
  { slug: "converse" },
  { slug: "discover" },
  { slug: "profile" },
  { slug: "notify" },
  { slug: "safety" },
  { slug: "nextcloud" },
];

const DOC_PAGES = [
  { path: "/docs/feature", manual: false },
  { path: "/docs/feature-write", manual: false },
  { path: "/docs/feature-read", manual: false },
  { path: "/docs/feature-converse", manual: false },
  { path: "/docs/feature-discover", manual: false },
  { path: "/docs/feature-your-profile", manual: false },
  { path: "/docs/feature-notifications", manual: false },
  { path: "/docs/feature-your-account-your-data", manual: false },
  { path: "/docs/feature-on-a-phone-and-in-the-dark", manual: false },
  { path: "/docs/feature-it-is-an-aloha-app-so-it-behaves-like-one", manual: false },
  { path: "/docs/feature-safety-and-privacy-that-is-the-default", manual: false },
  { path: "/docs/feature-for-administrators", manual: false },
  { path: "/docs/feature-for-developers", manual: false },
  { path: "/docs/feature-not-implemented-yet", manual: false },
  { path: "/docs/feature-quickstart-install-and-develop", manual: false },
  { path: "/docs/feature--well-known-webfinger-isnt-properly-set-up-troubleshooting", manual: false },
  { path: "/docs/feature-banner-header-upload-troubleshooting", manual: false },
  { path: "/docs/feature-tests", manual: false },
  { path: "/docs/feature-contributing", manual: false },
  { path: "/docs/feature-license", manual: false },
  { path: "/docs/start", manual: false },
  { path: "/docs/user", manual: false },
  { path: "/docs/user-getting-an-account", manual: false },
  { path: "/docs/user-finding-and-following-people", manual: false },
  { path: "/docs/user-writing-a-post", manual: false },
  { path: "/docs/user-keyboard-shortcuts", manual: false },
  { path: "/docs/for-you", manual: false },
  { path: "/docs/for-you-overview", manual: false },
  { path: "/docs/for-you-experience", manual: false },
  { path: "/docs/for-you-ranking", manual: false },
  { path: "/docs/for-you-technical", manual: false },
  { path: "/docs/for-you-privacy", manual: false },
  { path: "/docs/notify-why", manual: false },
  { path: "/docs/notify-behaviour", manual: false },
  { path: "/docs/notify-rollout", manual: false },
  { path: "/docs/moving", manual: false },
  { path: "/docs/admin", manual: false },
  { path: "/docs/admin-moderating", manual: false },
  { path: "/docs/admin-external-users", manual: false },
  { path: "/docs/admin-configuration", manual: false },
  { path: "/docs/occ", manual: false },
  { path: "/docs/mastodon", manual: false },
  { path: "/docs/atproto", manual: false },
  { path: "/docs/performance", manual: false },
];

const SITE_PAGES = [
  { path: "/about" },
  { path: "/directory" },
  { path: "/nextcloud" },
  { path: "/privacy" },
  { path: "/gdpr" },
  { path: "/cookies" },
  { path: "/imprint" },
  { path: "/terms" },
  { path: "/sitemap" },
  { path: "/protect" },
  { path: "/rules" },
  { path: "/wellbeing" },
];

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/why", changeFrequency: "monthly", priority: 0.9 },
  { path: "/get-started", changeFrequency: "monthly", priority: 0.9 },
  { path: "/install", changeFrequency: "monthly", priority: 0.9 },
  { path: "/features", changeFrequency: "monthly", priority: 0.8 },
  { path: "/server", changeFrequency: "monthly", priority: 0.7 },
  { path: "/activitypub", changeFrequency: "monthly", priority: 0.7 },
  { path: "/activitypub/native", changeFrequency: "monthly", priority: 0.7 },
  { path: "/activitypub/federation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/servers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/servers/list", changeFrequency: "monthly", priority: 0.6 },
  { path: "/clients", changeFrequency: "monthly", priority: 0.7 },
  { path: "/admins", changeFrequency: "monthly", priority: 0.7 },
  { path: "/developers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/developers/docs", changeFrequency: "monthly", priority: 0.6 },
  { path: "/developers/docs/api", changeFrequency: "monthly", priority: 0.6 },
  { path: "/developers/docs/federation", changeFrequency: "monthly", priority: 0.6 },
  { path: "/developers/docs/operations", changeFrequency: "monthly", priority: 0.6 },
  { path: "/developers/docs/protocol", changeFrequency: "monthly", priority: 0.6 },
  { path: "/docs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/docs/configuration", changeFrequency: "monthly", priority: 0.6 },
  { path: "/docs/maintenance", changeFrequency: "monthly", priority: 0.6 },
  { path: "/docs/contributing", changeFrequency: "monthly", priority: 0.5 },
  { path: "/brand", changeFrequency: "yearly", priority: 0.3 },
  { path: "/wellbeing", changeFrequency: "monthly", priority: 0.6 },
  { path: "/directory", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.6 },
  { path: "/protect", changeFrequency: "monthly", priority: 0.6 },
  { path: "/rules", changeFrequency: "monthly", priority: 0.6 },
  { path: "/nextcloud", changeFrequency: "monthly", priority: 0.6 },
  ...FEATURES.map((feature) => ({
    path: `/features/${feature.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  })),
  ...DOC_PAGES.filter((page) => !page.manual || !page.path.startsWith("/docs/")).map((page) => ({
    path: page.path,
    changeFrequency: "monthly",
    priority: page.path === "/docs" ? 0.8 : 0.6,
  })),
  ...SITE_PAGES.map((page) => ({
    path: page.path,
    changeFrequency: "monthly",
    priority: 0.6,
  })),
];

const seen = new Set();
const uniqueRoutes = routes.filter((route) => {
  if (seen.has(route.path)) return false;
  seen.add(route.path);
  return true;
});

const today = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
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

console.log("Generated sitemap.xml and robots.txt");