import Link from "next/link";
import { ArrowUpRight, ChevronRight, LayoutList } from "lucide-react";
import { DOC_BY_PATH, DOC_CATEGORIES, DOC_GROUPS, type DocPage } from "@/generated/docs";

export function DocsSidebar({ current, source }: { current: DocPage; source: string | null }) {
  return (
    <nav
      aria-label="Documentation"
      className="lg:pb-2"
    >
      <div className="card p-4 sm:p-5">
        <Link
          href="/docs"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[14px] font-semibold text-ink-strong transition hover:text-coral"
        >
          <LayoutList className="size-4 text-coral" aria-hidden="true" />
          All documentation
        </Link>

        <div className="mt-3 border-t border-line pt-3">
          {DOC_CATEGORIES.map((category) => {
            const groups = DOC_GROUPS.filter((group) => category.groups.includes(group.id));
            return (
              <div key={category.id} className="mb-4 last:mb-0">
                <p className="eyebrow px-2 pt-1 pb-1.5">{category.title}</p>
                {groups.map((group) => (
                  <GroupDetails key={group.id} group={group} current={current} />
                ))}
              </div>
            );
          })}
        </div>

        {source ? (
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-between gap-2 border-t border-line px-2 pt-3 text-[13px] text-muted transition hover:text-coral"
          >
            Open this document on GitHub
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </nav>
  );
}

function GroupDetails({ group, current }: { group: (typeof DOC_GROUPS)[number]; current: DocPage }) {
  const active = group.id === current.group;
  const landing = group.pages[0];
  return (
    <details
      open={active}
      className="group -mx-1 mb-1 rounded-xl px-1 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-2 text-[14px] font-semibold text-ink-strong transition hover:bg-surface-2">
        <span className="truncate">{group.title}</span>
        <span className="flex shrink-0 items-center gap-1">
          <span className="font-mono text-[10px] font-normal text-muted">{group.pages.length}</span>
          <ChevronRight
            className="size-3.5 text-muted transition-transform group-open:rotate-90"
            aria-hidden="true"
          />
        </span>
      </summary>

      <ul className="mb-2 mt-0.5 max-h-64 space-y-0.5 overflow-y-auto border-l border-line pl-2 pr-1">
        {group.pages.map((path) => {
          const page = DOC_BY_PATH[path];
          if (!page) return null;
          const isCurrent = path === current.path;
          const nested = Boolean(page.parent);
          return (
            <li key={path}>
              <Link
                href={path}
                aria-current={isCurrent ? "page" : undefined}
                className={`block rounded-lg px-2 py-1.5 text-[13.5px] transition ${
                  nested ? "pl-5" : ""
                } ${
                  isCurrent
                    ? "bg-coral-soft font-semibold text-coral"
                    : path === landing
                      ? "font-medium text-ink"
                      : "text-muted hover:bg-surface-2 hover:text-ink"
                }`}
              >
                {page.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export function DocsToc({ toc }: { toc: DocPage["toc"] }) {
  if (toc.length < 2) return null;
  return (
    <nav aria-label="On this page" className="card p-5 sm:p-6">
      <p className="eyebrow">On this page</p>
      <ul className="mt-3 space-y-1.5">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-[13.5px] leading-snug text-muted transition hover:text-coral ${
                item.level === 3 ? "pl-3" : ""
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
