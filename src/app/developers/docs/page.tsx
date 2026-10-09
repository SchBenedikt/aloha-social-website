import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import {
  Container,
  CtaBand,
  PageHeader,
  SectionHeading,
} from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developer docs",
  description:
    "The technical chapters of Aloha Social: ActivityPub protocol internals, federation compatibility, the client and federation API, and running the service — cron, workers, occ and storage.",
  alternates: { canonical: "/developers/docs" },
};

const CHAPTERS = [
  {
    index: "01",
    href: "/developers/docs/protocol",
    title: "Protocol",
    lede: "How one post becomes a signed activity, leaves this server and is accepted by a stranger's.",
    inside: [
      "Actors, activities, objects, inboxes and collections",
      "Eight steps from pressing Post to a reply arriving",
      "The three checks a receiver makes before storing",
    ],
  },
  {
    index: "02",
    href: "/developers/docs/federation",
    title: "Federation",
    lede: "What this server accepts from others, what it sends, and where the network stops.",
    inside: [
      "Compatibility matrix: Mastodon, Pixelfed, PeerTube, Misskey",
      "Relays, directories and how a remote server finds you",
      "What is never federated, and the honest limits",
    ],
  },
  {
    index: "03",
    href: "/developers/docs/api",
    title: "API",
    lede: "Two surfaces: one for clients that speak the Mastodon dialect, one for the network.",
    inside: [
      "Client routes, pagination and error shapes",
      "The federation surface: WebFinger, inbox, outbox",
      "Signing, authentication and what the reference covers",
    ],
  },
  {
    index: "04",
    href: "/developers/docs/operations",
    title: "Operations",
    lede: "Everything an operator runs by hand, and what each command is for.",
    inside: [
      "Cron, background jobs and the delivery worker",
      "The occ commands, grouped by what they fix",
      "Storage, retention, migrations and diagnostics",
    ],
  },
] as const;

const REFERENCES = [
  { label: "API reference", href: SITE.docs.api, source: SITE.docSources.api },
  { label: "Architecture notes", href: SITE.docs.architecture, source: SITE.docSources.architecture },
  { label: "OCC commands", href: SITE.docs.occ, source: SITE.docSources.occ },
  { label: "Admin guide", href: SITE.docs.admin, source: SITE.docSources.admin },
  { label: "Mastodon compatibility", href: SITE.docs.mastodon, source: SITE.docSources.mastodon },
  { label: "ATProto status", href: SITE.docs.atproto, source: SITE.docSources.atproto },
  { label: "Moving an account", href: SITE.docs.moving, source: SITE.docSources.moving },
  { label: "User guide", href: SITE.docs.user, source: SITE.docSources.user },
] as const;

export default function DevDocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Developer docs"
        title="The technical chapters."
        lede="Four long-form chapters covering the protocol, federation, API routes and operational commands. They sit alongside the reference documentation — API, architecture, OCC commands, compatibility — which lives in the same sidebar under For developers."
        actions={
          <>
            <Link href="/developers" className="btn btn-primary">
              For developers
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/docs" className="btn btn-outline">
              Documentation
              <ArrowRight className="size-4" />
            </Link>
          </>
        }
      />

      {/* ------------------------------------------------------ chapters */}
      <section className="py-16 sm:py-20">
        <Container>
          <ol className="border-t border-line" data-stagger>
            {CHAPTERS.map((chapter) => (
              <li key={chapter.href} className="border-b border-line">
                <Link
                  href={chapter.href}
                  className="group grid gap-x-10 gap-y-4 py-8 lg:grid-cols-[7rem_minmax(0,1fr)_minmax(0,26rem)]"
                >
                  <span className="font-mono text-[13px] tracking-widest text-coral">
                    {chapter.index}
                  </span>
                  <span>
                    <span className="block text-[1.9rem] leading-none text-ink-strong transition-colors group-hover:text-coral sm:text-[2.2rem]">
                      {chapter.title}
                    </span>
                    <span className="mt-3 block max-w-2xl text-[16px] leading-relaxed text-muted">
                      {chapter.lede}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-coral">
                      Read chapter
                      <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </span>
                  </span>
                  <ul className="space-y-2 lg:border-l lg:border-line lg:pl-8">
                    {chapter.inside.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-[14.5px] leading-relaxed text-muted"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-coral" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------------------------------------------------- references */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="References"
            title="Native guides, with the source alongside."
            lede="Start with the on-site summaries. Each guide keeps a direct link to the full upstream document for the details."
          />            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
              {REFERENCES.map((ref) => (
                <div key={ref.label} className="card p-5">
                  <Link href={ref.href} className="group flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <FileText className="size-4 shrink-0 text-coral" strokeWidth={1.9} />
                      <span className="text-[15px] font-medium text-ink-strong">{ref.label}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-coral" />
                  </Link>
                  <a href={ref.source} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-muted hover:text-coral">
                    Original on GitHub <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              ))}
            </div>
        </Container>
      </section>

      <CtaBand
        title="Start with the protocol chapter."
        body="Follow a post from publication to remote delivery, and learn how the receiving server verifies it."
        primary={{ label: "01 Protocol", href: "/developers/docs/protocol" }}
        secondary={{ label: "For developers", href: "/developers" }}
      />
    </>
  );
}
