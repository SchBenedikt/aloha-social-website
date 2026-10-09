import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  CheckList,
  Container,
  CtaBand,
  Fact,
  PageHeader,
  Screenshot,
} from "@/components/ui";
import { FEATURES, getAdjacent, getFeature } from "@/lib/features";
import { SITE } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return FEATURES.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata(
  props: PageProps<"/features/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const feature = getFeature(slug);
  if (!feature) return { title: "Feature" };
  return {
    title: `${feature.nav} — ${feature.title}`,
    description: feature.lede,
    alternates: { canonical: `/features/${feature.slug}` },
    openGraph: {
      title: `${feature.nav} · Aloha Social`,
      description: feature.lede,
      images: [{ url: "/brand/github-social-preview-1280x640.png" }],
    },
  };
}

export default async function FeaturePage(
  props: PageProps<"/features/[slug]">,
) {
  const { slug } = await props.params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const { prev, next } = getAdjacent(slug);
  const index = FEATURES.findIndex((item) => item.slug === slug);

  return (
    <>
      <PageHeader
        eyebrow={`Feature ${feature.index} / 0${FEATURES.length}`}
        title={feature.title}
        lede={feature.lede}
      />

      <section className="border-b border-line py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
            <article className="min-w-0">
              <Screenshot
                src={feature.image}
                alt={feature.alt}
                width={feature.width}
                height={feature.height}
                priority
              />

              {feature.facts ? (
                <dl className="mt-8 grid grid-cols-1 gap-6 border-y border-line py-7 sm:grid-cols-3">
                  {feature.facts.map((fact) => (
                    <Fact key={fact.label} value={fact.value} label={fact.label} />
                  ))}
                </dl>
              ) : null}

              <div className="mt-10 space-y-10">
                {feature.sections.map((section, sectionIndex) => (
                  <section key={section.heading} id={`s-${sectionIndex}`}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[12px] tracking-widest text-coral">
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-[1.6rem] leading-tight text-ink-strong sm:text-[1.85rem]">
                        {section.heading}
                      </h2>
                    </div>
                    <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
                      {section.body}
                    </p>
                    {section.bullets ? (
                      <CheckList className="mt-6" items={section.bullets} />
                    ) : null}
                  </section>
                ))}
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <span className="eyebrow">On this page</span>
                <ol className="mt-4 space-y-2.5 border-l border-line pl-4">
                  {feature.sections.map((section, sectionIndex) => (
                    <li key={section.heading}>
                      <a
                        href={`#s-${sectionIndex}`}
                        className="text-[14px] leading-snug text-muted transition hover:text-coral"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>

                {feature.docs?.length ? (
                  <div className="mt-8 border-t border-line pt-5">
                    <span className="eyebrow">Read more</span>
                    <ul className="mt-4 space-y-2.5">
                      {feature.docs.map((doc) => (
                        <li key={doc.href}>
                          <Link
                            href={doc.href}
                            className="group inline-flex items-start gap-1.5 text-[14px] leading-snug text-muted transition hover:text-coral"
                          >
                            {doc.label}
                            <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 border-t border-line pt-5">
                  <span className="eyebrow">All features</span>
                  <ol className="mt-4 space-y-2">
                    {FEATURES.map((item, itemIndex) => (
                      <li key={item.slug}>
                        <Link
                          href={`/features/${item.slug}`}
                          className={`flex items-baseline gap-2 text-[14px] transition hover:text-coral ${
                            itemIndex === index
                              ? "font-semibold text-coral"
                              : "text-muted"
                          }`}
                        >
                          <span className="font-mono text-[11px]">{item.index}</span>
                          {item.nav}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- prev / next */}
      <section className="py-12 sm:py-16">
        <Container>
          <nav className="grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/features/${prev.slug}`}
                className="card card-hover group flex items-center gap-4 p-6"
              >
                <ArrowLeft className="size-5 shrink-0 text-muted transition group-hover:-translate-x-0.5 group-hover:text-coral" />
                <span>
                  <span className="block font-mono text-[11.5px] tracking-widest text-coral">
                    {prev.index}
                  </span>
                  <span className="mt-1 block text-[1.3rem] leading-tight text-ink-strong">
                    {prev.nav}
                  </span>
                </span>
              </Link>
            ) : (
              <Link
                href="/features"
                className="card card-hover group flex items-center gap-4 p-6"
              >
                <ArrowLeft className="size-5 shrink-0 text-muted transition group-hover:-translate-x-0.5 group-hover:text-coral" />
                <span className="text-[1.15rem] text-ink-strong">All features</span>
              </Link>
            )}

            {next ? (
              <Link
                href={`/features/${next.slug}`}
                className="card card-hover group flex items-center justify-end gap-4 p-6 sm:text-right"
              >
                <span>
                  <span className="block font-mono text-[11.5px] tracking-widest text-coral">
                    {next.index}
                  </span>
                  <span className="mt-1 block text-[1.3rem] leading-tight text-ink-strong">
                    {next.nav}
                  </span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-coral" />
              </Link>
            ) : (
              <Link
                href={SITE.docs.user}
                className="card card-hover group flex items-center justify-end gap-4 p-6 sm:text-right"
              >
                <span className="text-[1.15rem] text-ink-strong">
                  Read the user guide
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
              </Link>
            )}
          </nav>
        </Container>
      </section>

      <CtaBand
        title="Set up Aloha Social for your community."
        body="Review the installation and compatibility information before making Aloha Social available to people on your server."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "For administrators", href: "/admins" }}
      />
    </>
  );
}
