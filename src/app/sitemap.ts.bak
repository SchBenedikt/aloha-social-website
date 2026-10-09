import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { FEATURES } from "@/lib/features";
import { DOC_PAGES } from "@/generated/docs";
import { SITE_PAGES } from "@/generated/pages";

type SitemapEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const routes: SitemapEntry[] = [
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
  { path: "/docs/getting-started", changeFrequency: "monthly", priority: 0.6 },
  { path: "/docs/configuration", changeFrequency: "monthly", priority: 0.6 },
  { path: "/docs/maintenance", changeFrequency: "monthly", priority: 0.6 },
  { path: "/docs/contributing", changeFrequency: "monthly", priority: 0.5 },
  { path: "/brand", changeFrequency: "yearly", priority: 0.3 },
  ...FEATURES.map((feature) => ({
    path: `/features/${feature.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
  ...DOC_PAGES.filter((page) => !page.manual || !page.path.startsWith("/docs/")).map((page) => ({
    path: page.path,
    changeFrequency: "monthly" as const,
    priority: page.path === "/docs" ? 0.8 : 0.6,
  })),
  ...SITE_PAGES.map((page) => ({
    path: page.path,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return routes
    .filter((route) => {
      if (seen.has(route.path)) return false;
      seen.add(route.path);
      return true;
    })
    .map((route) => ({
      url: `${SITE.url}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
}
