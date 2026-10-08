import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./logo";
import { Container } from "./ui";
import { SITE } from "@/lib/site";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  heading: string;
  links: readonly FooterLink[];
};

const COLUMNS: FooterColumn[] = [
  {
    heading: "Explore",
    links: [
      { label: "Features", href: "/features" },
      { label: "ActivityPub and federation", href: "/activitypub" },
      { label: "How Aloha Social works", href: "/activitypub/native" },
      { label: "Client availability", href: "/clients" },
    ],
  },
  {
    heading: "For users",
    links: [
      { label: "Get started", href: "/get-started" },
      { label: "User guide", href: SITE.docs.user },
      { label: "Find a server", href: "/servers" },
      { label: "Moving an account", href: SITE.docs.moving },
    ],
  },
  {
    heading: "For administrators",
    links: [
      { label: "Setup guide", href: "/install" },
      { label: "Administration overview", href: "/admins" },
      { label: "Admin guide", href: SITE.docs.admin },
      { label: "OCC commands", href: SITE.docs.occ },
    ],
  },
  {
    heading: "Project and references",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Mastodon compatibility", href: SITE.docs.mastodon },
      { label: "AT Protocol status", href: SITE.docs.atproto },
      { label: "Source code on GitHub", href: SITE.server, external: true },
      { label: "Brand assets", href: "/brand" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-deepsea text-sand">
      <Container className="pt-14 pb-8 sm:pt-16">
        <div className="grid gap-10 border-b border-sand/15 pb-10 lg:grid-cols-[minmax(15rem,1.1fr)_2fr] lg:gap-16">
          <div className="max-w-sm">
            <BrandLogo height={38} onDark />
            <p className="mt-5 text-[15px] leading-relaxed text-sand/75">
              Open-source social networking for communities. Publish posts
              and media, follow compatible ActivityPub accounts, and manage
              your community on a server you control.
            </p>
            <a
              href={SITE.server}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-10 items-center gap-1.5 text-[14px] font-medium text-sand underline decoration-sand/40 underline-offset-4 transition hover:decoration-sand"
            >
              View the source on GitHub
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <h2 className="font-brand text-[1.05rem] font-medium text-sand">
                  {column.heading}
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-8 items-center gap-1 text-[14px] text-sand/75 transition hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3 shrink-0" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-flex min-h-8 items-center text-[14px] text-sand/75 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[12.5px] leading-relaxed text-sand/60 sm:flex-row sm:items-start sm:justify-between">
          <p>© 2026 Aloha Social contributors. Licensed under AGPL-3.0-or-later.</p>
          <p className="max-w-xl sm:text-right">
            Aloha Social is independent of Mastodon and other services.
            Compatibility depends on the feature and software version.
          </p>
        </div>
      </Container>
    </footer>
  );
}
