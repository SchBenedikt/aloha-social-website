import { SEARCH_INDEX, type SearchEntry } from "@/generated/search";
import { FEATURES } from "@/lib/features";

export type SearchResult = SearchEntry & { score: number };

type Group = "site" | "features" | "docs";

/** Hand-written routes that are not part of the generated documentation index. */
const SITE_PAGES: SearchEntry[] = [
  {
    path: "/",
    title: "Home",
    description:
      "Aloha Social — the social network for your server. No advertising, no tracking, counts hidden by default.",
    kind: "page",
    section: "Pages",
    headings: ["One app for every kind of post", "Why Aloha Social is special", "How it works"],
  },
  {
    path: "/why",
    title: "Why Aloha Social",
    description: "Thirty reasons it is special, grouped and linked.",
    kind: "page",
    section: "Pages",
    headings: ["Big picture", "Calm social media", "Privacy by default", "For organisations", "Proof"],
  },
  {
    path: "/features",
    title: "Features",
    description: "See how Aloha Social handles posts, timelines, conversations, discovery, profiles and safety.",
    kind: "page",
    section: "Pages",
    headings: ["Write", "Read", "Converse", "Discover", "Profile", "Safety"],
  },
  {
    path: "/server",
    title: "How it works",
    description: "Federation, identity and the hosting model behind an Aloha Social server.",
    kind: "page",
    section: "Pages",
    headings: ["Identity", "Federation", "Hosting"],
  },
  {
    path: "/servers",
    title: "Find a server",
    description: "Browse public Aloha Social servers and choose one to join.",
    kind: "page",
    section: "Pages",
    headings: ["How to choose", "Server list"],
  },
  {
    path: "/servers/list",
    title: "Server list",
    description: "The full directory of public servers with filters.",
    kind: "page",
    section: "Pages",
    headings: [],
  },
  {
    path: "/clients",
    title: "Apps and downloads",
    description: "The web, Android and Apple apps — one account on every device.",
    kind: "page",
    section: "Pages",
    headings: ["Web app", "Android", "Apple"],
  },
  {
    path: "/admins",
    title: "For administrators",
    description: "A short tour for the person running a server: moderation, federation, retention, logs.",
    kind: "page",
    section: "Pages",
    headings: ["Moderation", "Federation limits", "Retention and storage", "Logs and commands"],
  },
  {
    path: "/install",
    title: "Installation guide",
    description: "Requirements, App Store or source, verification — set up Aloha Social on your server.",
    kind: "page",
    section: "Pages",
    headings: ["Requirements", "WebFinger", "Web server", "Checks"],
  },
  {
    path: "/developers",
    title: "For developers",
    description: "Repositories, endpoints, protocol and the source code of Aloha Social.",
    kind: "page",
    section: "Pages",
    headings: ["Repositories", "Endpoints", "Protocol"],
  },
  {
    path: "/activitypub",
    title: "ActivityPub",
    description: "How a post travels from your server to the fediverse and back.",
    kind: "page",
    section: "Pages",
    headings: ["You press Post", "Followers are resolved", "The request is signed", "It appears in a timeline"],
  },
  {
    path: "/activitypub/native",
    title: "Native, without a bridge",
    description: "Every account is a real fediverse account — and a Bluesky account too.",
    kind: "page",
    section: "Pages",
    headings: [],
  },
  {
    path: "/activitypub/federation",
    title: "Federation guide",
    description: "Relays, directories, discovery and what breaks federation.",
    kind: "page",
    section: "Pages",
    headings: [],
  },
  {
    path: "/brand",
    title: "Brand & logos",
    description: "Marks, wordmarks, colours and the press kit.",
    kind: "page",
    section: "Pages",
    headings: [],
  },
  {
    path: "/docs",
    title: "Documentation",
    description: "Guides for users, administrators and developers.",
    kind: "docs",
    section: "Documentation",
    headings: ["For users", "For administrators", "For developers"],
  },
];

const FEATURE_PAGES: SearchEntry[] = FEATURES.map((feature) => ({
  path: `/features/${feature.slug}`,
  title: `${feature.nav} — ${feature.title}`,
  description: feature.lede,
  kind: "page",
  section: "Features",
  headings: feature.sections.map((section) => section.heading).slice(0, 10),
}));

const INDEX: SearchEntry[] = [...SITE_PAGES, ...FEATURE_PAGES, ...SEARCH_INDEX];

const byPath = new Map<string, SearchEntry>();
for (const entry of INDEX) {
  if (!byPath.has(entry.path)) byPath.set(entry.path, entry);
}
const ENTRIES = [...byPath.values()];

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "");

const tokenize = (query: string) => normalise(query).split(/\s+/).filter(Boolean);

/** How well one field answers one token. Higher is better. */
const fieldScore = (field: string, token: string): number => {
  const text = normalise(field);
  if (!text) return 0;
  if (text === token) return 100;
  const at = text.indexOf(token);
  if (at === -1) return 0;
  const wordStart = at === 0 || /[\s/—–-]/.test(text[at - 1] ?? "");
  if (wordStart && text.startsWith(token)) return 80;
  if (wordStart) return 60;
  return 35;
};

const scoreEntry = (entry: SearchEntry, tokens: string[]): number => {
  let total = 0;
  for (const token of tokens) {
    const title = fieldScore(entry.title, token);
    const heading = Math.max(0, ...entry.headings.map((item) => fieldScore(item, token))) * 0.5;
    const description = fieldScore(entry.description, token) * 0.4;
    const path = fieldScore(entry.path, token) * 0.3;
    const best = Math.max(title, heading, description, path);
    if (best === 0) return 0;
    total += best;
  }
  return total;
};

const DEFAULT_LIMIT = 8;

/** The pages worth showing before anybody types. */
const STARTERS = ["/", "/get-started", "/why", "/features", "/docs", "/servers", "/clients", "/install"];

export function search(query: string, limit = DEFAULT_LIMIT): SearchResult[] {
  const tokens = tokenize(query);
  if (!tokens.length) {
    return STARTERS.map((path) => byPath.get(path))
      .filter((entry): entry is SearchEntry => Boolean(entry))
      .map((entry) => ({ ...entry, score: 0 }));
  }

  return ENTRIES.map((entry) => ({ ...entry, score: scoreEntry(entry, tokens) }))
    .filter((result) => result.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.title.length - b.title.length ||
        a.path.localeCompare(b.path),
    )
    .slice(0, limit);
}

export function groupOf(result: SearchResult): { id: Group; label: string } {
  if (result.section === "Features") return { id: "features", label: "Features" };
  if (result.kind === "docs") return { id: "docs", label: result.section };
  return { id: "site", label: "On this site" };
}

export type SearchGroup = {
  /** Unique render key — the same id can occur several times in ranked order. */
  key: string;
  id: Group;
  label: string;
  items: { result: SearchResult; index: number }[];
};

/** Keep the ranked order, but collect consecutive results of one kind. */
export function groupResults(results: SearchResult[]): SearchGroup[] {
  const groups: SearchGroup[] = [];
  results.forEach((result, index) => {
    const { id, label } = groupOf(result);
    const last = groups[groups.length - 1];
    if (last && last.id === id) last.items.push({ result, index });
    else groups.push({ key: `${id}-${groups.length}`, id, label, items: [{ result, index }] });
  });
  return groups;
}

/** True when the path has an entry in the search index. */
export function hasPage(path: string): boolean {
  return byPath.has(path);
}

/** Every path the search index knows — used by the coverage test. */
export const SEARCH_PATHS: ReadonlySet<string> = new Set(byPath.keys());

export const SEARCH_INDEX_SIZE = ENTRIES.length;
