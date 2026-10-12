import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { DOC_PAGES } from "@/generated/docs";
import { FEATURES } from "@/lib/features";
import {
  groupOf,
  groupResults,
  hasPage,
  search,
  SEARCH_INDEX_SIZE,
  SEARCH_PATHS,
  type SearchResult,
} from "./search";

describe("search", () => {
  it("returns the starter pages for an empty query", () => {
    const results = search("");
    expect(results.length).toBeGreaterThan(3);
    expect(results[0]?.path).toBe("/");
    expect(results.map((result) => result.path)).toContain("/get-started");
  });

  it("finds a page by its title", () => {
    const results = search("installation");
    expect(results[0]?.path).toBe("/install");
  });

  it("finds documentation by a word in the description", () => {
    const results = search("webfinger");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((result) => result.path.includes("docs"))).toBe(true);
  });

  it("ranks a title match above a heading-only match", () => {
    const results = search("privacy");
    expect(results[0]?.path).toBe("/privacy");
  });

  it("requires every word of a multi-word query", () => {
    const results = search("activitypub federation");
    expect(results.length).toBeGreaterThan(0);
    for (const result of results) {
      const haystack =
        `${result.title} ${result.description} ${result.path} ${result.headings.join(" ")}`.toLowerCase();
      expect(haystack).toContain("activitypub");
    }
  });

  it("returns nothing for a query that matches nowhere", () => {
    expect(search("zzzzqqqq")).toEqual([]);
  });

  it("honours the result limit", () => {
    expect(search("a", 3).length).toBeLessThanOrEqual(3);
  });

  it("carries the whole generated index", () => {
    expect(SEARCH_INDEX_SIZE).toBeGreaterThan(100);
  });
});

describe("groupOf", () => {
  it("labels feature pages as Features", () => {
    const results = search("compose posts");
    const feature = results.find((result) => result.path === "/features/write");
    expect(feature).toBeDefined();
    expect(groupOf(feature!).id).toBe("features");
  });

  it("labels documentation pages with their section", () => {
    const results = search("occ commands");
    const docs = results.find((result) => result.kind === "docs");
    expect(docs).toBeDefined();
    expect(groupOf(docs!).id).toBe("docs");
  });
});

describe("groupResults", () => {
  const result = (path: string, kind: "docs" | "page", section: string): SearchResult => ({
    path,
    title: path,
    description: "",
    kind,
    section,
    headings: [],
    score: 0,
  });

  it("gives every group a unique key even when kinds interleave", () => {
    const results = [
      result("/docs/a", "docs", "Documentation"),
      result("/privacy", "page", "Pages"),
      result("/docs/b", "docs", "Documentation"),
      result("/about", "page", "Pages"),
      result("/docs/c", "docs", "Documentation"),
    ];
    const groups = groupResults(results);
    const keys = groups.map((group) => group.key);
    expect(new Set(keys).size).toBe(keys.length);
    expect(groups.flatMap((group) => group.items)).toHaveLength(results.length);
  });

  it("merges consecutive results of one kind into one group", () => {
    const results = [
      result("/docs/a", "docs", "Documentation"),
      result("/docs/b", "docs", "Documentation"),
      result("/about", "page", "Pages"),
    ];
    const groups = groupResults(results);
    expect(groups).toHaveLength(2);
    expect(groups[0]?.items).toHaveLength(2);
    expect(groups[1]?.items).toHaveLength(1);
  });
});

/* The search must cover exactly the routes the site builds — every address
   that ends up in sitemap.xml has to be findable, and nothing stale may be
   indexed. Routes are derived from the app directory, the feature slugs and
   the generated documentation, which together are what `next build` emits. */
describe("sitemap coverage", () => {
  const APP_ROOT = resolve(process.cwd(), "src/app");

  function appRoutes(): string[] {
    const routes: string[] = [];
    const walk = (dir: string) => {
      const page = join(dir, "page.tsx");
      if (existsSync(page)) {
        // Redirect stubs only forward to their target, which is indexed itself.
        if (!readFileSync(page, "utf8").includes("redirect(")) {
          const rel = relative(APP_ROOT, dir).replace(/\\/g, "/");
          routes.push(rel === "" ? "/" : `/${rel}`);
        }
      }
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        // Dynamic segments are covered by their data sources below.
        if (entry.isDirectory() && !entry.name.startsWith("[")) walk(join(dir, entry.name));
      }
    };
    walk(APP_ROOT);
    return routes;
  }

  const expected = new Set([
    ...appRoutes(),
    ...FEATURES.map((feature) => `/features/${feature.slug}`),
    ...DOC_PAGES.map((page) => page.path),
  ]);

  it("makes every built route findable", () => {
    const unsearchable = [...expected].filter((route) => !hasPage(route)).sort();
    expect(unsearchable).toEqual([]);
  });

  it("has no stale entries left in the index", () => {
    const stale = [...SEARCH_PATHS].filter((path) => !expected.has(path)).sort();
    expect(stale).toEqual([]);
  });
});
