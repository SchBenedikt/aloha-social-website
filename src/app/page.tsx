import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Screenshot } from "@/components/ui";
import { FEATURES } from "@/lib/features";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  applicationCategory: "SocialNetworkingApplication",
  operatingSystem: "Web",
  description: SITE.description,
  url: SITE.url,
  license: "https://opensource.org/licenses/AGPL-3.0",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  codeRepository: SITE.github,
} as const;

const FIGURES = [
  ["4", "post audiences: public, unlisted, followers and direct"],
  ["881", "Noto animated emoji in the shipped picker; images load on use"],
  ["2 GB", "app-level video ceiling; host and server limits also apply"],
  ["0", "advertising placements or paid ranking"],
] as const;

const INSIDE = [
  ["One account", "Use your Aloha Social identity to post and follow people across compatible ActivityPub services."],
  ["A real audience choice", "Choose public, unlisted, followers-only or direct for each post."],
  ["Private by default", "Photo metadata is removed before images are stored or sent."],
  ["Your community, your rules", "The server operator sets account access, moderation and data-retention policies."],
] as const;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ---------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/brand/mark.svg"
          alt=""
          aria-hidden
          width={720}
          height={720}
          unoptimized
          priority
          className="pointer-events-none absolute -top-28 -right-40 w-[26rem] opacity-[0.12] sm:-right-24 sm:w-[30rem] lg:-right-16 lg:w-[34rem]"
        />

        <Container className="relative pt-14 pb-0 sm:pt-20">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] tracking-[0.14em] text-muted uppercase">
            <span className="text-coral">Aloha Social</span>
            <span aria-hidden>·</span>
            <span>ActivityPub federation</span>
            <span aria-hidden>·</span>
            <span>AGPL-3.0-or-later</span>
          </p>

          <h1 className="mt-7 max-w-[17ch] text-[2.75rem] leading-[0.98] tracking-[-0.04em] text-ink-strong sm:text-[3.9rem] lg:text-[4.75rem]">
            A social network your community can run.
          </h1>

          <p className="mt-8 max-w-2xl text-[17.5px] leading-relaxed text-muted sm:text-[18.5px]">
            Publish posts, photos and video; follow people across compatible
            ActivityPub services; and choose the audience for each post. Your
            community’s server operator manages accounts and moderation. Aloha
            Social includes no advertising placements, and compatibility varies
            between services and clients.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-started" className="btn btn-primary">
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/features" className="btn btn-outline">
              Explore features
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-14">
            <Screenshot
              src="/img/readme/home.png"
              alt="The Aloha Social home timeline"
              width={1360}
              height={565}
              priority
            />
          </div>
        </Container>

        <div className="h-16" aria-hidden />
      </section>

      {/* ---------------------------------------- platform and protocol facts */}
      <section aria-label="Aloha Social standards and license" className="border-y border-line bg-surface py-5">
        <Container className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
            Aloha Social
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[13px] text-muted">
            <li>Open source</li>
            <li>ActivityPub federation</li>
            <li>Partial Mastodon client API</li>
            <li>AGPL-3.0-or-later</li>
          </ul>
        </Container>
      </section>

      {/* ----------------------------------------------- what the app does */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl" data-reveal="">
            <span className="eyebrow">What you can do</span>
            <h2 className="mt-5 text-[2.1rem] leading-[1.08] tracking-[-0.025em] text-ink-strong sm:text-[2.9rem]">
              Publish, follow conversations and manage your community.
            </h2>
            <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-muted">
              The web app brings familiar social features together. The server
              operator controls account access, moderation and how long remote
              content is kept.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {[
              {
                title: "Write and share",
                body: "Publish text, photos, audio and video. Choose an audience, add a content warning or alt text, and schedule a post.",
                href: "/features/write",
              },
              {
                title: "Read your feeds",
                body: "Switch between followed accounts, posts from your server and posts it has discovered from other servers.",
                href: "/features/read",
              },
              {
                title: "Follow the conversation",
                body: "Open a post to read its thread, reply, react, bookmark or report it to the server moderators.",
                href: "/features/converse",
              },
              {
                title: "Find people and topics",
                body: "Search for accounts and hashtags, explore public profiles and follow people across compatible ActivityPub servers.",
                href: "/features/discover",
              },
            ].map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="card card-hover group flex min-h-52 flex-col p-5"
              >
                <h3 className="text-[1.35rem] leading-tight text-ink-strong transition-colors group-hover:text-coral">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  {feature.body}
                </p>
                <span className="mt-auto pt-4 text-[13.5px] font-semibold text-coral">
                  See how it works <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- feature tour */}
      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div data-reveal="">
              <span className="eyebrow">Feature details</span>
              <h2 className="mt-5 max-w-2xl text-[2.1rem] leading-[1.1] tracking-[-0.025em] text-ink-strong sm:text-[2.7rem]">
                See how each part of the app works.
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
                Screenshots and practical details for posting, feeds,
                conversations, discovery, profiles and safety.
              </p>
            </div>
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-coral"
            >
              Browse all features
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <ol
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6"
            data-reveal=""
            data-stagger
          >
            {FEATURES.map((feature) => (
              <li key={feature.slug} className="min-w-0">
                <Link
                  href={`/features/${feature.slug}`}
                  className="group card card-hover flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <span className="relative block aspect-[1.55] overflow-hidden bg-surface-2">
                    <Image
                      src={feature.image}
                      alt=""
                      width={feature.width}
                      height={feature.height}
                      loading="lazy"
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-line/80 bg-surface/95 px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-coral shadow-sm">
                      {feature.index}
                    </span>
                  </span>
                  <span className="flex flex-1 items-start gap-4 p-5 sm:p-6">
                    <span className="min-w-0 flex-1">
                      <span className="block font-brand text-[1.45rem] leading-tight font-semibold tracking-[-0.025em] text-ink-strong transition-colors group-hover:text-coral">
                        {feature.nav}
                      </span>
                      <span className="mt-2 block text-[14.5px] leading-relaxed text-muted">
                        {feature.title}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-coral" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* -------------------------------------------------------- figures */}
      <section className="border-y border-line bg-surface py-14">
        <Container>
          <dl className="grid gap-y-9 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {FIGURES.map(([value, label]) => (
              <div key={label} className="pr-6">
                <dt className="font-brand text-[2.7rem] leading-none font-semibold tracking-[-0.04em] text-ink-strong sm:text-[3.2rem]">
                  {value}
                </dt>
                <dd className="mt-3 max-w-[22ch] text-[14.5px] leading-snug text-muted">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* --------------------------------------------------- server model */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div data-reveal="">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-5 text-[2.1rem] leading-[1.1] tracking-[-0.025em] text-ink-strong sm:text-[2.7rem]">
              Your account belongs to the server you choose.
            </h2>
            <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted">
              Each Aloha Social server has its own accounts and policies. Its
              operator sets registration, moderation and retention rules.
              Posts can reach other ActivityPub services, but each service
              decides what it accepts and displays.
            </p>

            <dl className="mt-8 border-t border-line">
              {INSIDE.map(([term, note]) => (
                <div
                  key={term}
                  className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5"
                >
                  <dt className="text-[14.5px] font-semibold text-ink-strong">
                    {term}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-muted">{note}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/activitypub/native"
              className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-coral"
            >
              Learn about the hosting model
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <Screenshot
            src="/img/readme/admin.png"
            alt="The Aloha Social administration panel"
            width={1360}
            height={900}
            caption="The administration panel for federation, discovery, users and reports."
          />
        </Container>
      </section>

      {/* ------------------------------------------------------------ cta */}
      <section className="bg-deepsea" data-reveal="">
        <Container className="flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between sm:py-20">
          <div className="max-w-2xl text-sand">
            <span className="inline-flex items-center gap-2 rounded-full border border-sand/40 px-3 py-1 font-mono text-[11.5px] tracking-wide text-sand/80">
              Open source · Federated · Self-hosted
            </span>
            <h2 className="mt-5 text-[2.2rem] leading-[1.1] tracking-[-0.035em] sm:text-[2.7rem]">
              Set up Aloha Social for your community.
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-sand/75">
              Aloha Social is installed on an existing service. Review the
              release compatibility and setup requirements before inviting
              your community.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <Link
              href="/install"
              className="btn btn-primary"
            >
              Install Aloha Social
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/docs/mastodon"
              className="btn border border-sand/45 text-sand hover:border-sand hover:bg-white/10"
            >
              Check compatibility
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>

        <Container>
          <p className="mt-10 overflow-x-auto border-t border-sand/20 pt-6 font-mono text-[13px] whitespace-nowrap text-sand/65">
            <span className="text-coral-on-dark">$ </span>
            occ app:install social
            <span className="mx-4 text-sand/30">·</span>
            <Link href="/install" className="underline-offset-4 hover:text-sand">
              install Aloha Social
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
