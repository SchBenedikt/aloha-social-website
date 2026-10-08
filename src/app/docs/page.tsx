import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { NATIVE_DOCS, NATIVE_DOC_SLUGS, type NativeDocSlug } from "@/lib/native-docs";
import type { NativeDoc } from "@/lib/native-docs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Native Aloha Social user, administrator, API, compatibility and architecture guides, with links to their GitHub sources.",
  alternates: { canonical: "/docs" },
};

const TITLES: Record<NativeDocSlug, string> = {
  user: "User guide",
  admin: "Administrator guide",
  api: "API reference overview",
  occ: "OCC commands",
  mastodon: "Mastodon compatibility",
  atproto: "Bluesky / AT Protocol",
  moving: "Moving an account",
  architecture: "Architecture overview",
};

export default function DocsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Guides, not just repository links."
        lede="Start with the on-site overview. Each guide also points to its upstream GitHub document for full, version-specific details."
      />
      <section className="py-12 sm:py-16">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NATIVE_DOC_SLUGS.map((slug) => {
              const doc: NativeDoc = NATIVE_DOCS[slug];
              return (
                <li key={slug} className="card card-hover flex h-full flex-col p-6">
                  <BookOpen className="size-5 text-coral" aria-hidden="true" />
                  <h2 className="mt-4 text-[1.3rem] leading-tight font-semibold text-ink-strong">{TITLES[slug]}</h2>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">{doc.summary}</p>
                  {doc.status ? <p className="mt-3 text-[13px] leading-relaxed font-medium text-ink">{doc.status}</p> : null}
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
                    <Link href={`/docs/${slug}`} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-coral">
                      Read on this site <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    <a href={SITE.docSources[doc.source]} target="_blank" rel="noopener noreferrer" aria-label={`GitHub source for ${TITLES[slug]}; opens in a new tab`} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted hover:text-ink-strong">
                      GitHub source <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
