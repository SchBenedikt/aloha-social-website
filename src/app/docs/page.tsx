import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Rocket, Sparkles, Users, Wrench } from "lucide-react";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { DOC_BY_PATH, DOC_CATEGORIES, DOC_GROUPS, type DocGroup } from "@/generated/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "The full Aloha Social documentation: guides for users, for administrators and for developers — every topic on its own page.",
  alternates: { canonical: "/docs" },
};

const GROUP_ICONS: Record<string, typeof Rocket> = {
  start: Rocket,
  user: Users,
  "for-you": Sparkles,
  notifications: Sparkles,
  moving: ArrowRight,
  admin: Wrench,
  occ: Wrench,
  mastodon: ArrowUpRight,
  performance: Sparkles,
  atproto: ArrowUpRight,
};

const OUTSIDE = [
  { href: "/get-started", title: "Get started", description: "An account, a first post, and the people to follow." },
  { href: "/install", title: "Installation guide", description: "Requirements, App Store or source, verification." },
  { href: "/activitypub", title: "ActivityPub federation", description: "How servers talk to each other, and what federates." },
  { href: "/activitypub/federation", title: "Federation guide", description: "Relays, directories, discovery and what breaks federation." },
  { href: "/servers", title: "Find a server", description: "Browse public servers and choose one to join." },
  { href: "/clients", title: "Apps and downloads", description: "The web, Android and Apple apps." },
  { href: "/admins", title: "Administration overview", description: "A short tour for the person running a server." },
  { href: "/developers", title: "Developer hub", description: "Repositories, endpoints and the source." },
  { href: "/why", title: "Why Aloha Social", description: "Thirty reasons, grouped and linked." },
];

export default function DocsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Everything, on its own page."
        lede="The whole Aloha Social documentation, split into three shelves: guides for the people using Aloha, guides for the people running a server, and reference for the people building on it."
      />

      <nav aria-label="Documentation sections" className="border-y border-line bg-surface">
        <Container>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 py-4">
            {DOC_CATEGORIES.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="text-[14px] font-semibold text-ink-strong transition hover:text-coral"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {DOC_CATEGORIES.map((category) => {
        const groups = DOC_GROUPS.filter((group) => category.groups.includes(group.id));
        return (
          <section
            key={category.id}
            id={category.id}
            aria-label={category.title}
            className="scroll-mt-24 py-12 sm:py-16"
          >
            <Container>
              <SectionHeading eyebrow={category.label} title={category.title} lede={category.lede} />
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {groups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="border-y border-line bg-surface py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Elsewhere on this site"
            title="Guides that live outside the reference."
            lede="Installation, federation, finding a server and the rest of the site’s own guides."
          />
          <ul className="mt-8 grid gap-x-8 border-t border-line sm:grid-cols-2">
            {OUTSIDE.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between gap-4 py-4 transition hover:text-coral"
                >
                  <span>
                    <span className="block text-[15.5px] font-semibold text-ink-strong">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] text-muted">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight className="size-3.5 shrink-0 text-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

function GroupCard({ group }: { group: DocGroup }) {
  const Icon = GROUP_ICONS[group.id] ?? Sparkles;
  const [landing, ...rest] = group.pages;

  return (
    <article className="card flex flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-11 place-items-center rounded-xl bg-coral-soft text-coral">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <span className="pill">{group.pages.length} pages</span>
      </div>

      <h3 className="mt-4 text-[1.35rem] font-semibold text-ink-strong">
        <Link href={landing} className="transition hover:text-coral">
          {group.title}
        </Link>
      </h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{group.description}</p>

      <ul className="mt-4 flex-1 space-y-1.5 border-t border-line pt-4">
        {rest.slice(0, 6).map((path) => (
          <li key={path}>
            <Link
              href={path}
              className="group flex items-center justify-between gap-3 text-[14px] text-ink transition hover:text-coral"
            >
              <span className="truncate">{titleOf(path)}</span>
              <ArrowRight
                className="size-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
        {rest.length > 6 ? (
          <li className="pt-1 text-[13px] text-muted">
            …and {rest.length - 6} more pages in this section.
          </li>
        ) : null}
      </ul>

      <Link
        href={landing}
        className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-coral"
      >
        Open section
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

function titleOf(path: string) {
  return DOC_BY_PATH[path]?.title ?? path;
}
