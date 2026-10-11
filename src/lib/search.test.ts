import { describe, expect, it } from "vitest";
import { groupOf, search, SEARCH_INDEX_SIZE } from "./search";

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
