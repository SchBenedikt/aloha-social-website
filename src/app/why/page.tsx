import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import { Container, CtaBand, PageHeader } from "@/components/ui";
import {
  BOILERPLATE,
  HEADLINE_FIGURES,
  PITCH,
  PROOF_POINTS,
  REASON_COUNT,
  REASON_GROUPS,
} from "@/lib/reasons";
import { SITE } from "@/lib/site";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Aloha Social: 30 reasons it is special",
  description: PITCH,
  author: { "@type": "Organization", name: SITE.name, url: SITE.url },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  mainEntityOfPage: `${SITE.url}/why`,
  datePublished: "2026-10-08",
} as const;

export const metadata: Metadata = {
  title: "Why Aloha Social",
  description:
    "Thirty reasons Aloha Social is special: a Nextcloud social network with full Bluesky compatibility, calm feeds, privacy by default and no advertising.",
  alternates: { canonical: "/why" },
  openGraph: {
    title: "Why Aloha Social — 30 reasons it is special",
    description: PITCH,
    type: "article",
    images: [{ url: `${SITE.url}/brand/social-promo.png`, width: 1280, height: 640 }],
  },
};

export default function WhyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <PageHeader
        eyebrow={`Why Aloha Social · ${REASON_COUNT} reasons`}
        title="Thirty reasons it is special."
        lede={PITCH}
        actions={
          <>
            <Link href="/get-started" className="btn btn-primary">
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={SITE.server}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Source code
              <ArrowUpRight className="size-4" />
            </a>
          </>
        }
      />

      {/* ---------------------------------------------------- jump to a group */}
      <nav
        aria-label="Reason categories"
        className="sticky top-[4.25rem] z-30 border-b border-line bg-canvas/90 backdrop-blur-xl"
      >
        <Container className="flex gap-2 overflow-x-auto py-3">
          {REASON_GROUPS.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[12px] tracking-wide text-muted transition hover:border-coral hover:text-coral"
            >
              <span className="text-coral">{group.index}</span>{" "}
              {group.title}
            </a>
          ))}
        </Container>
      </nav>

      {/* ------------------------------------------------------------ the 30 */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="space-y-16 sm:space-y-20">
            {REASON_GROUPS.map((group) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-heading`}
                className="scroll-mt-36"
                data-reveal=""
              >
                <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="font-mono text-[12px] tracking-[0.16em] text-coral uppercase">
                      {group.index} — {group.reasons.length}{" "}
                      {group.reasons.length === 1 ? "reason" : "reasons"}
                    </span>
                    <h2
                      id={`${group.id}-heading`}
                      className="mt-3 text-[1.9rem] leading-[1.1] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]"
                    >
                      {group.title}
                    </h2>
                  </div>
                  <p className="max-w-sm text-[15px] leading-relaxed text-muted sm:text-right">
                    {group.blurb}
                  </p>
                </div>

                <ol className="mt-2">
                  {group.reasons.map((reason) => (
                    <li
                      key={reason.number}
                      className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <span
                        className="font-brand text-[1.6rem] leading-none font-semibold text-coral sm:text-[2rem]"
                        aria-hidden="true"
                      >
                        {String(reason.number).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1.2rem] leading-snug text-ink-strong sm:text-[1.4rem]">
                          {reason.title}
                        </h3>
                        {reason.body ? (
                          <p className="mt-2.5 max-w-3xl text-[15.5px] leading-relaxed text-muted">
                            {reason.body}
                          </p>
                        ) : null}
                        {reason.bullets ? (
                          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-2">
                            {reason.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink"
                              >
                                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- headlines */}
      <section className="border-y border-line bg-surface py-14" aria-label="Headline numbers">
        <Container>
          <dl className="grid gap-y-9 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {HEADLINE_FIGURES.map((figure) => (
              <div key={figure.label} className="pr-6">
                <dt className="font-brand text-[2.7rem] leading-none font-semibold tracking-[-0.04em] text-ink-strong sm:text-[3.2rem]">
                  {figure.value}
                </dt>
                <dd className="mt-3 max-w-[24ch] text-[14.5px] leading-snug text-muted">
                  {figure.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ------------------------------------------------------ proof points */}
      <section className="py-16 sm:py-20" id="proof" aria-labelledby="proof-heading">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div className="min-w-0">
            <span className="eyebrow">Proof points</span>
            <h2
              id="proof-heading"
              className="mt-4 text-[2.1rem] leading-[1.12] tracking-[-0.03em] text-ink-strong sm:text-[2.5rem]"
            >
              The numbers behind the release.
            </h2>
            <div className="mt-8 overflow-x-auto" data-reveal="">
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <caption className="sr-only">
                  Aloha Social proof points and numbers
                </caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-line pb-3 pr-6 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase"
                    >
                      Fact
                    </th>
                    <th
                      scope="col"
                      className="border-b border-line pb-3 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PROOF_POINTS.map((point) => (
                    <tr key={point.fact}>
                      <th
                        scope="row"
                        className="border-b border-line py-4 pr-6 align-top text-[15px] font-medium text-ink-strong"
                      >
                        {point.fact}
                      </th>
                      <td className="border-b border-line py-4 align-top font-mono text-[14px] leading-relaxed text-muted">
                        {point.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-40">
            <Quote className="size-5 text-coral" aria-hidden="true" />
            <h2 className="mt-3 text-[1.2rem] font-semibold text-ink-strong">
              Short boilerplate
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">
              {BOILERPLATE.intro}
            </p>
            <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
              {BOILERPLATE.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted"
                >
                  <Check
                    className="mt-0.5 size-3.5 shrink-0 text-coral"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
              <Link
                href="/brand"
                className="inline-flex min-h-8 items-center gap-1.5 text-[14px] font-semibold text-coral"
              >
                Logos and brand assets
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/features"
                className="inline-flex min-h-8 items-center gap-1.5 text-[14px] font-semibold text-coral"
              >
                See the features in detail
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand
        title="Ready to run your own?"
        body="Aloha Social is an app you install on your Nextcloud. Set it up in minutes, invite your organisation, and every account on it reaches the open social web."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "Read the docs", href: "/docs" }}
      />
    </>
  );
}
