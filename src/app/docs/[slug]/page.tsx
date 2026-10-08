import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { NATIVE_DOCS, NATIVE_DOC_SLUGS, type NativeDocSlug } from "@/lib/native-docs";
import { SITE } from "@/lib/site";
import { notFound } from "next/navigation";

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

export function generateStaticParams() {
  return NATIVE_DOC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!(slug in NATIVE_DOCS)) return { title: "Documentation" };
  const doc = NATIVE_DOCS[slug as NativeDocSlug];
  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: `/docs/${slug}` },
  };
}

export default async function NativeDocPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  if (!(slug in NATIVE_DOCS)) notFound();
  const doc = NATIVE_DOCS[slug as NativeDocSlug];
  const source = SITE.docSources[doc.source];

  return (
    <>
      <PageHeader eyebrow="Documentation" title={TITLES[slug as NativeDocSlug]} lede={doc.summary} />
      <section className="py-10 sm:py-14">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
          <article className="min-w-0 max-w-3xl">
            {doc.status ? (
              <aside className="mb-8 rounded-xl border border-coral/35 bg-coral-soft/50 p-5 text-[15px] leading-relaxed text-ink" aria-label="Important status">
                <p className="font-semibold text-ink-strong">Status and scope</p>
                <p className="mt-1.5">{doc.status}</p>
              </aside>
            ) : null}
            <div className="space-y-9">
              {doc.sections.map((section, index) => (
                <section key={section.title} id={`section-${index + 1}`}>
                  <h2 className="flex items-baseline gap-3 text-[1.5rem] leading-tight text-ink-strong sm:text-[1.8rem]">
                    <span className="font-mono text-[12px] tracking-widest text-coral" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <p className="mt-4 text-[16px] leading-[1.8] text-muted">
                    {section.body}
                  </p>
                  {section.bullets ? (
                    <ul className="mt-4 space-y-2 border-l-2 border-line pl-5 text-[15px] leading-relaxed text-muted">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  ) : null}
                  {section.code ? (
                    <pre className="code mt-5 overflow-x-auto rounded-xl border border-line bg-surface p-5" tabIndex={0} aria-label={`${section.title} example`}>
                      <code>{section.code}</code>
                    </pre>
                  ) : null}
                </section>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-28">
            <div className="card p-5 sm:p-6">
              <BookOpen className="size-5 text-coral" aria-hidden="true" />
              <h2 className="mt-3 text-[1.2rem] font-semibold text-ink-strong">Original and current detail</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                This page is an editorial overview. The repository remains the source for full procedures and version-specific implementation details.
              </p>
              <a href={source} target="_blank" rel="noopener noreferrer" aria-label="Open the original GitHub documentation in a new tab" className="btn btn-primary mt-5 w-full">
                Open original on GitHub
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <p className="mt-3 break-all font-mono text-[11px] leading-relaxed text-muted">{source}</p>
              <Link href="/developers/docs" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-coral">
                Developer chapters <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <nav aria-label="Documentation pages" className="mt-5 border-t border-line pt-4">
              <p className="eyebrow">More documentation</p>
              <ul className="mt-3 space-y-1">
                {NATIVE_DOC_SLUGS.map((docSlug) => (
                  <li key={docSlug}>
                    <Link href={`/docs/${docSlug}`} aria-current={docSlug === slug ? "page" : undefined} className={`block rounded-lg px-3 py-2 text-[14px] transition hover:bg-surface-2 ${docSlug === slug ? "font-semibold text-coral" : "text-muted hover:text-ink"}`}>
                      {TITLES[docSlug]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </Container>
      </section>
      <Container>
        <Link href="/developers" className="mb-12 inline-flex items-center gap-2 text-[14px] font-semibold text-coral">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Developer resources
        </Link>
      </Container>
    </>
  );
}
