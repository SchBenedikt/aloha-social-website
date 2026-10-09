#!/usr/bin/env node
/**
 * Splits the upstream documentation (content/upstream/*.md) and the
 * hand-written pages (content/pages/*.md) into site pages and writes the
 * result to src/generated/docs.ts and src/generated/pages.ts.
 *
 * Run with: npm run docs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked, Marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UPSTREAM_DIR = path.join(ROOT, "content", "upstream");
const PAGES_DIR = path.join(ROOT, "content", "pages");
const OUT_DIR = path.join(ROOT, "src", "generated");
const BLOB = "https://github.com/AlohaSocial/social/blob/master/docs/";
const RAW_BLOB = "https://github.com/AlohaSocial/social/blob/master/";
const RAW_MEDIA = "https://raw.githubusercontent.com/AlohaSocial/social/master/";

const CATEGORIES = [
  {
    id: "users",
    label: "For users",
    title: "For users",
    lede: "Getting an account, your first post, the feeds you read and the settings that keep it calm.",
  },
  {
    id: "admins",
    label: "For administrators",
    title: "For administrators",
    lede: "Checks before you federate, moderation, commands, compatibility and what a page costs.",
  },
  {
    id: "developers",
    label: "For developers",
    title: "For developers",
    lede: "The API, the architecture, the protocols, and how the project itself is maintained.",
  },
];

const GROUPS = [
  {
    id: "features",
    category: "users",
    title: "Everything it does",
    description:
      "The feature tour from the project README: writing, reading, conversations, your profile, notifications, safety and the rest — one page per topic.",
  },
  {
    id: "start",
    category: "users",
    title: "Getting started",
    description:
      "Your first hour with Aloha Social: an account, a first post, and the people you want to follow.",
  },
  {
    id: "user",
    category: "users",
    title: "User guide",
    description:
      "Everything a person with an account does in Aloha Social — posting, reading, following, filtering and looking after the account.",
    source: BLOB + "User-Guide.md",
  },
  {
    id: "for-you",
    category: "users",
    title: "For You feed",
    description:
      "How the optional For You feed is built, ranked, administered and kept private.",
    source: BLOB + "For-You.md",
  },
  {
    id: "notifications",
    category: "users",
    title: "Notifications",
    description: "What produces a notification, what does not, and how you control it.",
    source: BLOB + "Notification-Policy.md",
  },
  {
    id: "moving",
    category: "users",
    title: "Moving an account",
    description:
      "Coming to Aloha Social from another server, and leaving again without losing the people who follow you.",
    source: BLOB + "Moving.md",
  },
  {
    id: "admin",
    category: "admins",
    title: "Administration",
    description:
      "Running an Aloha Social server: the checks before you federate, moderation, external users, configuration and scale.",
    source: BLOB + "Admin.md",
  },
  {
    id: "occ",
    category: "admins",
    title: "OCC commands",
    description: "Every command the app adds to occ, grouped by the task it performs.",
    source: BLOB + "OCC-Commands.md",
  },
  {
    id: "api",
    category: "developers",
    title: "API reference",
    description:
      "The Mastodon-compatible client API, the local API, OAuth, ActivityPub federation endpoints and error handling.",
    source: BLOB + "API.md",
  },
  {
    id: "architecture",
    category: "developers",
    title: "Architecture",
    description:
      "How the app is put together: routing, schema, services, federation, timelines at scale and the frontend.",
    source: BLOB + "Architecture.md",
  },
  {
    id: "mastodon",
    category: "users",
    title: "Mastodon compatibility",
    description:
      "What a Mastodon client and a migrating administrator can expect, tested against the code rather than claimed.",
    source: BLOB + "Mastodon-Compatibility.md",
  },
  {
    id: "atproto",
    category: "developers",
    title: "Bluesky / AT Protocol",
    description:
      "How every Aloha account is also a Bluesky account — identity, repositories, the firehose, moderation and operations.",
    source: BLOB + "Atproto-Compatibility.md",
  },
  {
    id: "performance",
    category: "admins",
    title: "Performance",
    description: "What a page costs, what was fixed, and what is measured next.",
    source: BLOB + "Performance.md",
  },
  {
    id: "project",
    category: "developers",
    title: "Project internals",
    description:
      "Technical debt, testing and how the documentation itself is kept in step with the code.",
    source: BLOB + "Technical-Debt.md",
  },
  {
    id: "developer",
    category: "developers",
    title: "Developer chapters",
    description:
      "Long-form chapters for people extending the app: protocol, federation, API and operations.",
  },
];

const groupMeta = new Map(GROUPS.map((group) => [group.id, group]));
const groupTitle = (groupId) => groupMeta.get(groupId)?.title ?? "Documentation";

const SOURCES = [
  {
    file: "User-Guide.md",
    group: "user",
    prefix: "user",
    skip: ["Contents", "What the web client does not do yet"],
    threshold: 14000,
  },
  {
    file: "For-You.md",
    group: "for-you",
    prefix: "for-you",
    skip: ["Contents"],
    threshold: 1e9,
    bundle: [
      ["overview", "What For You is", ["1. Summary", "2. Goals and non-goals", "17. Decisions"]],
      [
        "experience",
        "The experience and the signal behind it",
        ["3. Decisions from the interview", "4. User experience", "5. Signal collection"],
      ],
      ["ranking", "Scoring and ranking", ["6. Scoring", "7. Feed ranking"]],
      ["technical", "API, data model and administration", ["8. API", "9. Data model", "10. Administration"]],
      [
        "privacy",
        "Privacy, performance and delivery",
        ["11. Privacy and data lifecycle", "12. Performance", "13. Accessibility and i18n", "14. Testing", "15. Documentation", "16. Delivery"],
      ],
    ],
  },
  {
    file: "Notification-Policy.md",
    group: "notifications",
    prefix: "notify",
    skip: ["Contents"],
    threshold: 1e9,
    bundle: [
      ["why", "Why notifications are policed", ["1. Why", "2. Decisions", "3. What exists today", "4. Gaps this specification closes"]],
      [
        "behaviour",
        "Behaviour, API and strings",
        ["5. Behaviour", "6. API", "7. Strings (English; German in all four catalogues in the same commit)"],
      ],
      ["rollout", "Tests, scope and rollout", ["8. Tests", "9. Out of scope", "10. Implementation order"]],
    ],
  },
  {
    file: "Moving.md",
    group: "moving",
    prefix: "moving",
    skip: ["Contents"],
    threshold: 1e9,
  },
  { file: "Admin.md", group: "admin", prefix: "admin", skip: ["Contents"], threshold: 15000 },
  { file: "OCC-Commands.md", group: "occ", prefix: "occ", skip: ["Contents"], threshold: 16000 },
  { file: "API.md", group: "api", prefix: "api", skip: ["Contents"], threshold: 14000 },
  { file: "Architecture.md", group: "architecture", prefix: "architecture", skip: ["Contents"], threshold: 14000 },
  {
    file: "Mastodon-Compatibility.md",
    group: "mastodon",
    prefix: "mastodon",
    skip: ["Contents", "9. What is still to do", "10. Documentation drift"],
    threshold: 1e9,
  },
  {
    file: "Atproto-Compatibility.md",
    group: "atproto",
    prefix: "atproto",
    skip: ["Contents"],
    threshold: 20000,
  },
  { file: "Performance.md", group: "performance", prefix: "performance", skip: ["Contents"], threshold: 1e9 },
  { file: "Technical-Debt.md", group: "project", prefix: "debt", skip: ["Contents"], threshold: 1e9 },
  { file: "README.md", group: "features", prefix: "feature", skip: ["Contents"], threshold: 14000, root: true },
];

const MANUAL_DOCS = [
  {
    path: "/get-started",
    title: "Get started",
    group: "start",
    description: "Find your place on the fediverse and make the first post.",
  },
  {
    path: "/docs/configuration",
    title: "Configuration reference",
    group: "admin",
    description:
      "All configuration options: occ commands, config.php settings, environment variables and server requirements.",
  },
  {
    path: "/docs/maintenance",
    title: "Maintenance and updates",
    group: "admin",
    description: "Upgrades, backups, monitoring and disaster recovery.",
  },
  {
    path: "/docs/contributing",
    title: "Contributing",
    group: "project",
    description: "Code style, pull requests, tests and the release workflow.",
  },
  {
    path: "/developers/docs",
    title: "Developer chapters overview",
    group: "developer",
    description: "Where the long-form chapters for extending the app live.",
  },
  {
    path: "/developers/docs/protocol",
    title: "Protocol chapter",
    group: "developer",
    description: "ActivityPub and AT Protocol details, as implemented.",
  },
  {
    path: "/developers/docs/federation",
    title: "Federation chapter",
    group: "developer",
    description: "Server-to-server delivery, retries and propagation.",
  },
  {
    path: "/developers/docs/api",
    title: "API chapter",
    group: "developer",
    description: "Endpoints, authentication and response shapes.",
  },
  {
    path: "/developers/docs/operations",
    title: "Operations chapter",
    group: "developer",
    description: "Deployment, scaling and monitoring of a deployment.",
  },
];

const cleanTitle = (text) =>
  text
    .replace(/`/g, "")
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\d+\.\s+/, "")
    .trim();

const slugify = (text) =>
  cleanTitle(text)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[_:/.]+/g, "-")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 72)
    .replace(/-+$/, "");

const tokensText = (tokens) => {
  let out = "";
  const walk = (list) => {
    for (const token of list ?? []) {
      if (token.type === "code") {
        out += token.text;
        continue;
      }
      if (token.tokens) walk(token.tokens);
      else if (token.text) out += token.text;
      if (token.items) token.items.forEach((item) => walk(item.tokens));
    }
  };
  walk(tokens);
  return out.replace(/\s+/g, " ").trim();
};

const headingText = (token) => tokensText(token.tokens ?? []);

const firstParagraph = (tokens) => {
  const candidates = [];
  for (const token of tokens) {
    if (token.type !== "paragraph") continue;
    const text = tokensText(token.tokens ?? []).trim();
    if (text) candidates.push(text);
    if (candidates.length >= 4) break;
  }
  return (
    candidates.find((text) => text.length >= 70 && !/[:;]$/.test(text)) ??
    candidates.find((text) => text.length >= 40) ??
    candidates[0] ??
    ""
  );
};

const clip = (text, max = 190) =>
  !text ? "" : text.length > max ? `${text.slice(0, max - 1).replace(/[\s,;:]+\S*$/, "")}…` : text;

const stripFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { front: {}, body: raw };
  const front = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value === "true") front[key] = true;
    else if (value === "false") front[key] = false;
    else if (/^\d+$/.test(value)) front[key] = Number(value);
    else front[key] = value;
  }
  return { front, body: raw.slice(match[0].length) };
};

/* ------------------------------------------------------------------ *
 * 1. Read and split every upstream document
 * ------------------------------------------------------------------ */

const pages = [];
const staticPages = [];
const fragmentOwner = new Map();
const usedSlugs = new Set();
const usedPaths = new Set();

const uniqueSlug = (slug) => {
  let candidate = slug;
  let n = 2;
  while (usedSlugs.has(candidate)) candidate = `${slug}-${n++}`;
  usedSlugs.add(candidate);
  return candidate;
};

const pushPage = (page) => {
  if (usedPaths.has(page.path)) throw new Error(`duplicate path ${page.path}`);
  usedPaths.add(page.path);
  pages.push(page);
  return page;
};

const dropLeadingSpace = (tokens) => {
  while (tokens[0]?.type === "space") tokens.shift();
  return tokens;
};

const splitSections = (allTokens) => {
  const tokens = dropLeadingSpace(allTokens);
  let title = "";
  let cursor = 0;
  if (tokens[0]?.type === "heading" && tokens[0].depth === 1) {
    title = headingText(tokens[0]);
    cursor = 1;
  }
  const intro = [];
  const sections = [];
  for (; cursor < tokens.length; cursor += 1) {
    const token = tokens[cursor];
    if (token.type === "heading" && token.depth === 2) {
      sections.push({ heading: token, body: [] });
    } else if (sections.length) {
      sections[sections.length - 1].body.push(token);
    } else {
      intro.push(token);
    }
  }
  return { title, intro, sections };
};

const size = (tokens) => tokens.reduce((n, token) => n + (token.raw?.length ?? 0), 0);

const firstDepth = (tokens, depth) =>
  tokens.findIndex((token) => token.type === "heading" && token.depth === depth);

/* One upstream table is interrupted by a section and a code fence, so its
   trailing rows arrive without a header and markdown reads them as prose full
   of pipes. Re-attach such orphan rows to the header of an earlier table with
   the same column count (another section's when there is one). */
const repairSplitTables = (raw) => {
  const lines = raw.split("\n");
  const isRow = /^\s*\|/;
  const isDelimiter = /^\s*\|[\s:|-]+\|\s*$/;
  const isHeading = /^(#{1,6})\s+(.*)$/;
  const columns = (row) =>
    row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").length;

  const stack = [];
  const headers = [];
  const orphans = [];

  for (let i = 0; i < lines.length; i += 1) {
    const heading = lines[i].match(isHeading);
    if (heading) {
      const level = heading[1].length;
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      stack.push({ level, text: heading[2].trim() });
      continue;
    }
    if (isRow.test(lines[i]) && isDelimiter.test(lines[i + 1] ?? "")) {
      headers.push({ line: lines[i], cols: columns(lines[i]), context: stack.map((entry) => entry.text).join(" > ") });
      while (i < lines.length && isRow.test(lines[i])) i += 1;
      i -= 1;
      continue;
    }
    if (isRow.test(lines[i])) {
      const start = i;
      while (i < lines.length && isRow.test(lines[i])) i += 1;
      i -= 1;
      orphans.push({ start, end: i + 1, cols: columns(lines[start]), context: stack.map((entry) => entry.text).join(" > ") });
    }
  }

  if (!orphans.length) return raw;
  const insertions = [];
  for (const orphan of orphans) {
    const candidates = headers.filter((header) => header.cols === orphan.cols);
    const header =
      candidates.filter((candidate) => candidate.context !== orphan.context).pop() ?? candidates.pop();
    if (!header) continue;
    insertions.push(orphan.start, header.line, `|${Array(orphan.cols).fill("---").join("|")}|`);
  }
  if (!insertions.length) return raw;

  const out = [];
  let cursor = 0;
  while (insertions.length) {
    const at = insertions.shift();
    out.push(...lines.slice(cursor, at), "", insertions.shift(), insertions.shift());
    cursor = at;
  }
  out.push(...lines.slice(cursor));
  return out.join("\n");
};

const registerAnchor = (file, page) => {
  if (!page.anchor) return;
  const map = fragmentOwner.get(file) ?? new Map();
  if (!map.has(page.anchor)) map.set(page.anchor, page.path);
  fragmentOwner.set(file, map);
};

const addSectionPage = (source, section, baseDepth) => {
  const raw = headingText(section.heading);
  const slug = uniqueSlug(`${source.prefix}-${slugify(raw)}`);
  const page = pushPage({
    slug,
    path: `/docs/${slug}`,
    title: cleanTitle(raw),
    group: source.group,
    baseDepth,
    tokens: section.body,
    sourceFile: source.file,
    sourceRoot: source.root ?? false,
    order: pages.length,
    anchor: slugify(raw),
  });
  registerAnchor(source.file, page);
  return page;
};


for (const source of SOURCES) {
  const raw = repairSplitTables(
    fs
      .readFileSync(path.join(UPSTREAM_DIR, source.file), "utf8")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/^\s*\n/, ""),
  );
  const { title, intro, sections } = splitSections(marked.lexer(raw));
  const skipped = (source.skip ?? []).map(cleanTitle);
  const kept = sections.filter((section) => !skipped.includes(cleanTitle(headingText(section.heading))));

  pushPage({
    slug: source.prefix,
    path: `/docs/${source.prefix}`,
    title: cleanTitle(title) || groupTitle(source.group),
    group: source.group,
    baseDepth: 1,
    tokens: intro,
    sourceFile: source.file,
    sourceRoot: source.root ?? false,
    order: pages.length,
    landing: true,
  });

  if (source.bundle) {
    for (const [slug, pageTitle, wanted] of source.bundle) {
      const picked = wanted.map((want) => {
        const found = kept.find(
          (section) => cleanTitle(headingText(section.heading)) === cleanTitle(want),
        );
        if (!found) throw new Error(`${source.file}: section "${want}" not found`);
        return found;
      });
      const body = [];
      picked.forEach((section, index) => {
        if (index > 0) body.push({ ...section.heading, depth: 3, raw: `### ${headingText(section.heading)}` });
        body.push(...section.body);
      });
      const bundlePage = pushPage({
        slug: uniqueSlug(`${source.prefix}-${slug}`),
        path: `/docs/${source.prefix}-${slug}`,
        title: pageTitle,
        group: source.group,
        baseDepth: 2,
        tokens: body,
        sourceFile: source.file,
        sourceRoot: source.root ?? false,
        order: pages.length,
        anchor: slugify(headingText(picked[0].heading)),
      });
      registerAnchor(source.file, bundlePage);
    }
    continue;
  }

  for (const section of kept) {
    const firstChild = firstDepth(section.body, 3);
    const deep = size(section.body) > source.threshold && firstChild !== -1;
    if (!deep) {
      addSectionPage(source, section, 2);
      continue;
    }

    const parent = addSectionPage(
      source,
      { heading: section.heading, body: section.body.slice(0, firstChild) },
      2,
    );
    parent.isParent = true;
    parent.children = [];

    let cursor = firstChild;
    for (;;) {
      const at = firstDepth(section.body.slice(cursor), 3);
      if (at === -1) break;
      const start = cursor + at;
      let end = section.body.length;
      for (let i = start + 1; i < section.body.length; i += 1) {
        if (section.body[i].type === "heading" && section.body[i].depth <= 3) {
          end = i;
          break;
        }
      }
      const heading = section.body[start];
      const child = addSectionPage(source, { heading, body: section.body.slice(start + 1, end) }, 3);
      child.parent = parent.slug;
      parent.children.push(child.slug);
      cursor = end;
    }
  }
}

/* ------------------------------------------------------------------ *
 * 2. Hand-written pages (content/pages/*.md)
 * ------------------------------------------------------------------ */

if (fs.existsSync(PAGES_DIR)) {
  for (const file of fs.readdirSync(PAGES_DIR).sort()) {
    if (!file.endsWith(".md")) continue;
    const { front, body } = stripFrontmatter(fs.readFileSync(path.join(PAGES_DIR, file), "utf8"));
    const tokens = dropLeadingSpace(marked.lexer(body));
    const fromHeading =
      tokens[0]?.type === "heading" && tokens[0].depth === 1 ? headingText(tokens[0]) : "";
    if (fromHeading) tokens.shift();

    const pagePath = front.path ?? `/${slugify(fromHeading || file)}`;
    const title = cleanTitle(front.title ?? fromHeading ?? file);
    const description = front.description ?? "";

    if (pagePath.startsWith("/docs/")) {
      const slug = pagePath.slice("/docs/".length);
      if (usedSlugs.has(slug)) throw new Error(`duplicate docs slug ${slug}`);
      usedSlugs.add(slug);
      usedPaths.add(pagePath);
      pages.push({
        slug,
        path: pagePath,
        title,
        group: front.group ?? "start",
        baseDepth: 1,
        tokens,
        sourceFile: null,
        order: pages.length,
        landing: front.landing !== false,
        authoredDescription: description,
      });
      continue;
    }

    staticPages.push({
      path: pagePath,
      title,
      description,
      baseDepth: 1,
      tokens,
      authoredDescription: description,
    });
  }
}

/* ------------------------------------------------------------------ *
 * 3. Heading ids, cross-page links, rendering
 * ------------------------------------------------------------------ */


const allPages = [...pages, ...staticPages];

const walkTokens = (tokens, visit) => {
  for (const token of tokens) {
    visit(token);
    if (token.tokens) walkTokens(token.tokens, visit);
    if (token.items) token.items.forEach((item) => walkTokens(item.tokens ?? [], visit));
    if (token.type === "table") {
      token.header.forEach((cell) => walkTokens(cell.tokens ?? [], visit));
      token.rows.forEach((row) => row.forEach((cell) => walkTokens(cell.tokens ?? [], visit)));
    }
  }
};

const assignIds = (page) => {
  const seen = new Map();
  if (page.anchor) seen.set(page.anchor, 1);
  walkTokens(page.tokens, (token) => {
    if (token.type !== "heading") return;
    const id = slugify(headingText(token)) || "section";
    const used = seen.get(id) ?? 0;
    seen.set(id, used + 1);
    token.__id = used === 0 ? id : `${id}-${used + 1}`;
    if (page.sourceFile) {
      const map = fragmentOwner.get(page.sourceFile) ?? new Map();
      if (!map.has(token.__id)) map.set(token.__id, page.path);
      fragmentOwner.set(page.sourceFile, map);
    }
  });
};

const rewriteLinks = (page) => {
  const owners = page.sourceFile ? fragmentOwner.get(page.sourceFile) : null;
  const fix = (href) => {
    if (!href) return href;
    if (href.startsWith("#")) {
      const fragment = href.slice(1);
      const target = owners?.get(fragment);
      if (!target) {
        const landing = page.sourceFile
          ? pages.find((other) => other.sourceFile === page.sourceFile && other.landing)
          : null;
        return landing ? landing.path : href;
      }
      return target === page.path ? `#${fragment}` : `${target}#${fragment}`;
    }
    const docLink = href.match(/^([A-Za-z0-9_./-]+\.md)(#.*)?$/);
    if (docLink && page.sourceFile) {
      const file = docLink[1].split("/").pop();
      const targets = fragmentOwner.get(file);
      if (docLink[2] && targets) {
        const target = targets.get(docLink[2].slice(1));
        if (target) return `${target}${docLink[2]}`;
      }
      const landing = pages.find((other) => other.sourceFile === file && other.landing);
      if (landing) return landing.path + (docLink[2] && targets?.get(docLink[2].slice(1)) ? docLink[2] : "");
      return href;
    }
    if (href.startsWith("../")) return RAW_BLOB + href.replace(/^\.\.\//, "");
    if (href.startsWith("img/") && page.sourceFile)
      return page.sourceRoot
        ? RAW_MEDIA + href
        : `${RAW_MEDIA}docs/${page.sourceFile.replace(/\.md$/, "")}/${href}`;
    return href;
  };
  const rewriteHtml = (html) =>
    html
      .replace(/(src=["'])img\/([^"']*)(["'])/g, (_m, before, rest, after) => {
        const fixed = fix(`img/${rest}`);
        return fixed.startsWith("http") ? `${before}${fixed}${after}` : _m;
      })
      .replace(/(href=["'])#([a-z0-9-]+)(["'])/g, (m, before, fragment, after) => {
        const target = owners?.get(fragment);
        if (!target || target === page.path) return m;
        return `${before}${target}#${fragment}${after}`;
      });
  walkTokens(page.tokens, (token) => {
    if (token.type === "link" || token.type === "image") token.href = fix(token.href);
    if (token.type === "html" && typeof token.text === "string") token.text = rewriteHtml(token.text);
  });
};

/* Turn the paragraph leads of long, heading-less pages (`` `Component.vue` ``
   and `` **Bold lead.** ``) into real sub-headings, so a 90 KB wall of text
   becomes something with anchors and a table of contents. */
/* API reference tables carry a whole paragraph of prose in their Description
   column. Rendered as a five-column table that is unreadable — so a table whose
   header starts with Method | Route becomes one block per route instead. */
const isRouteTable = (token) =>
  token.type === "table" &&
  (token.header?.length ?? 0) >= 4 &&
  /^method$/i.test(tokensText(token.header[0]?.tokens ?? [])) &&
  /route/i.test(tokensText(token.header[1]?.tokens ?? []));

const textToken = (text) => ({ type: "text", text });
const strongToken = (text) => ({ type: "strong", tokens: [textToken(text)] });

const routeBlocks = (table, depth) => {
  const heads = table.header.map((cell) => tokensText(cell.tokens ?? []));
  const index = (pattern) => heads.findIndex((head) => pattern.test(head));
  const auth = index(/auth/i);
  const params = index(/param/i);
  const description = index(/desc/i);
  const out = [];

  for (const row of table.rows) {
    const method = tokensText(row[0]?.tokens ?? []);
    const route = tokensText(row[1]?.tokens ?? []);
    const title = `${method} ${route}`.replace(/\s+/g, " ").trim();
    if (!title) continue;

    out.push({
      type: "heading",
      depth,
      raw: `${"#".repeat(depth)} ${title}`,
      text: title,
      tokens: [textToken(title)],
    });

    const meta = [];
    const push = (label, cell) => {
      if (!cell?.tokens?.length) return;
      if (meta.length) meta.push(textToken(" · "));
      meta.push(strongToken(`${label}: `), ...cell.tokens);
    };
    push("Auth", auth >= 0 ? row[auth] : null);
    push("Parameters", params >= 0 ? row[params] : null);
    if (meta.length) {
      out.push({ type: "paragraph", raw: "", text: tokensText(meta), tokens: meta });
    }

    const body = description >= 0 ? row[description]?.tokens : null;
    if (body?.length) {
      out.push({ type: "paragraph", raw: "", text: tokensText(body), tokens: body });
    }
  }
  return out;
};

const convertRouteTables = (page) => {
  let converted = 0;
  const rewrite = (list) => {
    for (let i = 0; i < list.length; i += 1) {
      const token = list[i];
      if (isRouteTable(token)) {
        const blocks = routeBlocks(token, page.baseDepth + 1);
        if (blocks.length) {
          converted += 1;
          list.splice(i, 1, ...blocks);
          i += blocks.length - 1;
        }
      } else {
        if (token.tokens) rewrite(token.tokens);
        if (token.items) token.items.forEach((item) => rewrite(item.tokens));
        if (token.header) rewrite(token.header);
        if (token.rows) token.rows.forEach((row) => rewrite(row));
      }
    }
  };
  rewrite(page.tokens);
  return converted;
};

const leadOf = (inline) => {
  if (!inline?.length) return null;
  let at = 0;
  if (inline[0]?.type === "text" && !inline[0].text.trim() && inline[1]) at = 1;
  const lead = inline[at];
  if (lead?.type === "codespan") {
    return { head: String(lead.text ?? "").trim(), rest: inline.slice(at + 1), strong: false };
  }
  if (lead?.type === "strong") {
    return {
      head: tokensText(lead.tokens ?? []).trim().replace(/[.:。]+$/, ""),
      rest: inline.slice(at + 1),
      strong: true,
    };
  }
  return null;
};

/* A lead only becomes a heading when what follows reads as a new sentence:
   `**StreamRequest**, the repository of ...` is one sentence, not a heading
   with a paragraph under it. */
const leadsWell = (rest) => {
  const text = tokensText(rest).trim();
  if (!text) return false;
  return !/^[,;:.!?)}\]]/.test(text);
};

const dropLeadDash = (tokens) => {
  const [first, ...rest] = tokens;
  if (first?.type !== "text") return tokens;
  const text = String(first.text ?? "").replace(/^\s*[—–-]\s*/, "");
  if (!text) return rest;
  return [{ ...first, text }, ...rest];
};

const headingToken = (depth, text) => ({
  type: "heading",
  depth,
  raw: `${"#".repeat(depth)} ${text}`,
  text,
  tokens: [{ type: "text", text }],
});

/* Long, heading-less pages are built from `` **Lead.** `` paragraphs and list
   items. Promote those leads to real sub-headings so the page gets anchors and
   a table of contents instead of being one unbroken scroll. */
/* `Key | Default | Meaning` style tables: one row per setting, with prose in
   the last column. As a table that is one dense wall; as a heading per key the
   page gets anchors and reads like the settings it documents. */
const isDefinitionTable = (token, { allowDuplicateKeys } = {}) => {
  if (token.type !== "table") return false;
  const cols = token.header?.length ?? 0;
  const rows = token.rows ?? [];
  if (cols < 2 || rows.length < 5) return false;

  const keys = rows.map((row) => tokensText(row[0]?.tokens ?? []).trim());
  if (keys.some((key) => !key || key.length > 60)) return false;
  if (!allowDuplicateKeys && new Set(keys).size !== keys.length) return false;

  const last = rows.map((row) => tokensText(row[cols - 1]?.tokens ?? [])).join(" ");
  return last.length / rows.length >= 100;
};

const definitionBlocks = (table, depth) => {
  const heads = table.header.map((cell) => tokensText(cell.tokens ?? []).trim());
  const out = [];

  for (const row of table.rows) {
    const key = tokensText(row[0]?.tokens ?? []).trim();
    if (!key) continue;
    out.push({ type: "heading", depth, raw: `${"#".repeat(depth)} ${key}`, text: key, tokens: [textToken(key)] });

    const meta = [];
    for (let column = 1; column < row.length - 1; column += 1) {
      const cell = row[column];
      if (!cell?.tokens?.length || !tokensText(cell.tokens).trim()) continue;
      if (meta.length) meta.push(textToken(" · "));
      meta.push(strongToken(`${heads[column] ?? `Column ${column + 1}`}: `), ...cell.tokens);
    }
    if (meta.length) out.push({ type: "paragraph", raw: "", text: tokensText(meta), tokens: meta });

    const body = row[row.length - 1]?.tokens;
    if (body?.length && tokensText(body).trim()) {
      out.push({ type: "paragraph", raw: "", text: tokensText(body), tokens: body });
    }
  }
  return out;
};

const convertDefinitionTables = (page, options) => {
  let converted = 0;
  const rewrite = (list) => {
    for (let i = 0; i < list.length; i += 1) {
      const token = list[i];
      if (isDefinitionTable(token, options)) {
        const blocks = definitionBlocks(token, page.baseDepth + 1);
        if (blocks.length) {
          converted += 1;
          list.splice(i, 1, ...blocks);
          i += blocks.length - 1;
          continue;
        }
      }
      if (token.type === "table") continue;
      if (token.tokens) rewrite(token.tokens);
      if (token.items) token.items.forEach((item) => rewrite(item.tokens));
    }
  };
  rewrite(page.tokens);
  return converted;
};

const synthesizeHeadings = (page) => {
  convertRouteTables(page);
  const structured = walkCollect(page.tokens, (token) => token.type === "heading").length > 0;
  convertDefinitionTables(page, { allowDuplicateKeys: !structured });
  if (structured || size(page.tokens) < 8000) return;

  const depth = page.baseDepth + 1;
  let created = 0;

  const leadOfBlock = (block) => {
    if (block?.type !== "paragraph" && block?.type !== "text") return null;
    if (!block.tokens?.length) return null;
    const lead = leadOf(block.tokens);
    if (!lead?.head || lead.head.length > 90) return null;
    return lead;
  };

  const blocksFromLead = (block, lead, { allowLabel, restMin, rawMin }) => {
    if (lead.rest.length && !leadsWell(lead.rest)) return null;
    if (!lead.rest.length) {
      if (!allowLabel || !lead.strong || lead.head.length > 60) return null;
      created += 1;
      return [headingToken(depth, lead.head)];
    }
    const restText = tokensText(lead.rest).replace(/^[\s—–-]+/, "").trim();
    if ((block.raw?.length ?? 0) < rawMin || restText.length < restMin) return null;
    created += 1;
    return [
      headingToken(depth, lead.head),
      { type: "paragraph", raw: block.raw, text: restText, tokens: dropLeadDash(lead.rest) },
    ];
  };

  const out = [];
  let first = true;
  for (const token of page.tokens) {
    const allowLabel = first;
    first = false;

    if (token.type === "list") {
      const entries = token.items.map((item) => ({ item, block: item.tokens?.[0], lead: leadOfBlock(item.tokens?.[0]) }));
      const definitionList = entries.filter((entry) => entry.lead).length >= 3 && size([token]) >= 1500;
      let bucket = null;
      for (const { item, block, lead } of entries) {
        let blocks = null;
        if (definitionList && lead) {
          blocks = blocksFromLead(block, lead, { allowLabel: true, restMin: 10, rawMin: 0 });
          if (blocks) blocks = [...blocks, ...(item.tokens ?? []).slice(1)];
        }
        if (blocks) {
          if (bucket) {
            out.push(bucket);
            bucket = null;
          }
          out.push(...blocks);
        } else {
          bucket ??= { ...token, items: [] };
          bucket.items.push(item);
        }
      }
      if (bucket) out.push(bucket);
      continue;
    }

    if (token.type === "paragraph" && (token.raw?.length ?? 0) >= 300) {
      const lead = leadOf(token.tokens);
      if (lead?.head && lead.head.length <= 90 && (lead.rest.length || allowLabel)) {
        const blocks = blocksFromLead(token, lead, { allowLabel, restMin: 60, rawMin: 300 });
        if (blocks) {
          out.push(...blocks);
          continue;
        }
      }
    }
    out.push(token);
  }


  if (created >= 3) page.tokens = out;
  else if (process.env.DOCS_DEBUG) {
    console.log(`  no headings: ${page.path} size=${size(page.tokens)} created=${created}`);
  }
};

const walkCollect = (tokens, match) => {
  const found = [];
  const walk = (list) => {
    for (const token of list ?? []) {
      if (match(token)) found.push(token);
      if (token.tokens) walk(token.tokens);
      if (token.items) token.items.forEach((item) => walk(item.tokens));
    }
  };
  walk(tokens);
  return found;
};

for (const page of allPages) synthesizeHeadings(page);
for (const page of allPages) assignIds(page);
for (const page of allPages) rewriteLinks(page);

const shiftHeadings = (tokens, shift) => {
  walkTokens(tokens, (token) => {
    if (token.type !== "heading") return;
    token.depth = token.depth === 1 ? 2 : Math.max(2, token.depth - shift);
  });
};

const renderer = {
  heading(token) {
    const id = token.__id ? ` id="${token.__id}"` : "";
    return `<h${token.depth}${id}>${this.parser.parseInline(token.tokens)}</h${token.depth}>\n`;
  },
};
const instance = new Marked({ gfm: true });
instance.use({ renderer });


for (const page of allPages) {
  shiftHeadings(page.tokens, Math.max(0, page.baseDepth - 1));
  page.html = instance
    .parser(page.tokens)
    .replace(/<table>/g, '<div class="md-table"><table>')
    .replace(/<\/table>/g, "</table></div>");

  const toc = [];
  const seen = new Set();
  walkTokens(page.tokens, (token) => {
    if (
      token.type === "heading" &&
      (token.depth === 2 || token.depth === 3) &&
      token.__id &&
      !seen.has(token.__id)
    ) {
      seen.add(token.__id);
      toc.push({ id: token.__id, text: headingText(token), level: token.depth });
    }
  });
  page.toc = toc;

  if (!page.description) {
    page.description =
      page.authoredDescription ||
      clip(firstParagraph(page.tokens)) ||
      groupMeta.get(page.group)?.description ||
      "Aloha Social documentation.";
  }
}

/* ------------------------------------------------------------------ *
 * 4. Section indexes, order, prev/next
 * ------------------------------------------------------------------ */

for (const page of pages) {
  const siblings = pages.filter((other) => other.group === page.group);
  if (page.isParent) {
    page.childList = (page.children ?? [])
      .map((slug) => siblings.find((other) => other.slug === slug))
      .filter(Boolean)
      .map((child) => ({
        path: child.path,
        title: child.title,
        description: child.description,
        parent: true,
      }));
  } else if (page.landing) {
    const landingIndex = new Map(
      siblings.map((other, index) => [other.slug, index]),
    );
    page.childList = siblings
      .filter((other) => other !== page)
      .sort((a, b) => {
        const parentA = a.parent ? landingIndex.get(a.parent) ?? 1e9 : landingIndex.get(a.slug) ?? 1e9;
        const parentB = b.parent ? landingIndex.get(b.parent) ?? 1e9 : landingIndex.get(b.slug) ?? 1e9;
        return parentA - parentB || (landingIndex.get(a.slug) ?? 0) - (landingIndex.get(b.slug) ?? 0);
      })
      .map((child) => ({
        path: child.path,
        title: child.title,
        description: child.description,
        parent: Boolean(child.parent),
      }));
  }
}

const groupOrder = new Map(GROUPS.map((group, index) => [group.id, index]));

const ordered = [...pages].sort((a, b) => {
  const ga = groupOrder.get(a.group) ?? 99;
  const gb = groupOrder.get(b.group) ?? 99;
  if (ga !== gb) return ga - gb;
  return a.order - b.order;
});

for (const page of ordered) {
  const siblings = ordered.filter((other) => other.group === page.group);
  const at = siblings.indexOf(page);
  page.prev = at > 0 ? { path: siblings[at - 1].path, title: siblings[at - 1].title } : null;
  page.next =
    at < siblings.length - 1
      ? { path: siblings[at + 1].path, title: siblings[at + 1].title }
      : null;
}

const docPages = ordered.map((page) => ({
  slug: page.slug,
  path: page.path,
  title: page.title,
  description: page.description,
  group: page.group,
  html: page.html,
  toc: page.toc,
  source: page.sourceFile ? (page.sourceRoot ? RAW_BLOB : BLOB) + page.sourceFile : null,
  sections: page.childList ?? null,
  anchor: page.anchor ?? null,
  manual: false,
  prev: page.prev,
  next: page.next,
  parent: page.parent ?? null,
}));

for (const manual of MANUAL_DOCS) {
  if (usedPaths.has(manual.path)) continue;
  usedPaths.add(manual.path);
  docPages.push({
    slug: manual.path.replace(/^\//, ""),
    path: manual.path,
    title: manual.title,
    description: manual.description,
    group: manual.group,
    html: "",
    toc: [],
    source: null,
    sections: null,
    anchor: null,
    manual: true,
    prev: null,
    next: null,
    parent: null,
  });
}

const groups = GROUPS.map((group) => ({
  ...group,
  pages: docPages.filter((page) => page.group === group.id).map((page) => page.path),
}));

const categories = CATEGORIES.map((category) => ({
  ...category,
  groups: groups.filter((group) => group.category === category.id).map((group) => group.id),
}));

/* ------------------------------------------------------------------ *
 * 5. Write
 * ------------------------------------------------------------------ */

fs.mkdirSync(OUT_DIR, { recursive: true });

const header =
  "// Generated by scripts/build-docs.mjs — do not edit by hand.\n// Run `npm run docs` after changing content/.\n";

const docsSource = `${header}
export type DocTocItem = { id: string; text: string; level: number };

export type DocSectionLink = {
  path: string;
  title: string;
  description: string;
  parent: boolean;
};

export type DocPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  group: string;
  html: string;
  toc: DocTocItem[];
  source: string | null;
  sections: DocSectionLink[] | null;
  anchor: string | null;
  manual: boolean;
  prev: { path: string; title: string } | null;
  next: { path: string; title: string } | null;
  parent: string | null;
};

export type DocCategory = {
  id: string;
  label: string;
  title: string;
  lede: string;
  groups: string[];
};

export type DocGroup = {
  id: string;
  category: string;
  title: string;
  description: string;
  source?: string;
  pages: string[];
};

export const DOC_CATEGORIES: DocCategory[] = ${JSON.stringify(categories)};

export const DOC_GROUPS: DocGroup[] = ${JSON.stringify(groups)};

export const DOC_PAGES: DocPage[] = ${JSON.stringify(docPages)};

export const DOC_BY_PATH: Record<string, DocPage> = Object.fromEntries(
  DOC_PAGES.map((page) => [page.path, page]),
);

export function getDocBySlug(slug: string): DocPage | undefined {
  return DOC_BY_PATH[\`/docs/\${slug}\`];
}

export function pagesInGroup(groupId: string): DocPage[] {
  return DOC_PAGES.filter((page) => page.group === groupId);
}
`;

fs.writeFileSync(path.join(OUT_DIR, "docs.ts"), docsSource);

const staticSource = `${header}
export type SitePage = {
  path: string;
  title: string;
  description: string;
  html: string;
  toc: DocTocItem[];
};

type DocTocItem = { id: string; text: string; level: number };

export const SITE_PAGES: SitePage[] = ${JSON.stringify(
  staticPages.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.description,
    html: page.html,
    toc: page.toc,
  })),
)};

export const SITE_PAGE_BY_PATH: Record<string, SitePage> = Object.fromEntries(
  SITE_PAGES.map((page) => [page.path, page]),
);
`;

fs.writeFileSync(path.join(OUT_DIR, "pages.ts"), staticSource);

console.log(`docs: ${docPages.length} documentation pages in ${groups.length} groups`);
console.log(
  `pages: ${staticPages.length} hand-written page(s): ${staticPages.map((page) => page.path).join(", ")}`,
);
