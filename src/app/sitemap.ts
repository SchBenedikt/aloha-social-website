import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { FEATURES } from "@/lib/features";
import { NATIVE_DOC_SLUGS } from "@/lib/native-docs";

type SitemapEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const DOC_ROUTES = [
  "/docs/admin",
  "/docs/user",
  "/docs/api",
  "/docs/occ",
  "/docs/mastodon",
  "/docs/atproto",
  "/docs/moving",
  "/docs/architecture",
] as const;

const routes: SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/get-started", changeFrequency: "monthly", priority: 0.9 },
  { path: "/install", changeFrequency: "monthly", priority: 0.9 },
  { path: "/features", changeFrequency: "monthly", priority: 0.8 },
  { path: "/server", changeFrequency: "monthly", priority: 0.7 },
  { path: "/activitypub", changeFrequency: "monthly", priority: 0.7 },
  { path: "/activitypub/native", changeFrequency: "monthly", priority: 0.7 },
  { path: "/activitypub/federation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/servers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/clients", changeFrequency: "monthly", priority: 0.7 },
  { path: "/admins", changeFrequency: "monthly", priority: 0.7 },
  { path: "/developers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/developers/docs", changeFrequency: "monthly", priority: 0.6 },
  { path: "/docs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/brand", changeFrequency: "yearly", priority: 0.3 },
  ...FEATURES.map((feature) => ({
    path: `/features/${feature.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
  ...NATIVE_DOC_SLUGS.map((slug) => ({
    path: `/docs/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
  ...DOC_ROUTES.map((path) => ({
    path,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
