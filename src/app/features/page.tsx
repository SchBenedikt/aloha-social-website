import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, CtaBand, PageHeader } from "@/components/ui";
import { FEATURES } from "@/lib/features";
import { SITE } from "@/lib/site";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Aloha Social Features",
  description: "Complete list of features in Aloha Social social networking software",
  numberOfItems: FEATURES.length,
  itemListElement: FEATURES.map((feature, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      name: feature.nav,
      description: feature.title,
      url: `${SITE.url}/features/${feature.slug}`,
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Web",
    },
  })),
} as const;

export const metadata: Metadata = {
  title: "Features",
  description:
    "See how Aloha Social handles posts, timelines, conversations, discovery, profiles and account safety.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Features — Aloha Social",
    description: "See how Aloha Social handles posts, timelines, conversations, discovery, profiles and account safety.",
    type: "website",
    images: [{ url: `${SITE.url}/brand/social-promo.png`, width: 1280, height: 640 }],
  },
};

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <PageHeader
        eyebrow="Features"
        title="What you can do with Aloha Social."
        lede="Explore the main parts of the app with screenshots and practical details. Each page explains how a feature works and notes relevant limits or compatibility requirements."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2" data-stagger>
            {FEATURES.map((feature) => (
              <Link
                key={feature.slug}
                href={`/features/${feature.slug}`}
                className="group card card-hover flex flex-col overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden border-b border-line bg-surface-2">
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-canvas/90 px-2.5 py-1 font-mono text-[11px] tracking-widest text-coral backdrop-blur">
                    {feature.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[1.85rem] leading-none text-ink-strong">
                      {feature.nav}
                    </h2>
                    <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
                  </div>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink">
                    {feature.title}
                  </p>
                  <p className="mt-3 line-clamp-3 text-[14.5px] leading-relaxed text-muted">
                    {feature.lede}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 border-t border-line pt-5 font-mono text-[11.5px] tracking-wide text-muted transition group-hover:text-coral">
                    Open {feature.nav.toLowerCase()}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div
            className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between"
            data-reveal=""
          >
            <p className="max-w-2xl text-[15.5px] leading-relaxed text-muted">
              For setup steps, account guidance and version-specific details,
              read the user guide, administrator guide and compatibility notes.
            </p>
            <Link
              href="/docs/user"
              className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-coral"
            >
              Read the user guide
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Install Aloha Social for your community."
        body="Posts, photos, Shorts and video channels in one app on your Nextcloud — with no advertising, no tracking and counts hidden by default."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "30 reasons it is special", href: "/why" }}
      />
    </>
  );
}
