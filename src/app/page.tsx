import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Code2, Rocket, ShieldCheck, Users } from "lucide-react";
import { Container, Screenshot } from "@/components/ui";
import { FEATURES } from "@/lib/features";
import { HEADLINE_FIGURES, PITCH, REASON_COUNT, REASON_GROUPS } from "@/lib/reasons";
import { SITE } from "@/lib/site";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  applicationCategory: "SocialNetworkingApplication",
  operatingSystem: "Aloha",
  description: SITE.description,
  url: SITE.url,
  license: "https://opensource.org/licenses/AGPL-3.0",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  codeRepository: SITE.server,
} as const;

const INSIDE = [
  ["One account", "@you@your.cloud — the login people already have, including SSO and two-factor, with no new password."],
  ["The whole open social web", "Follow, reply to, quote and boost people on Mastodon, Bluesky, Pixelfed, PeerTube, GoToSocial and Akkoma."],
  ["Private by default", "Photo location and camera data are removed before an image is stored or sent, and nothing is re-encoded."],
  ["Your community, your rules", "Registration, moderation and retention are set by the organisation that runs the server."],
] as const;

// Compatible services and networks that work with Aloha Social
const COMPATIBLE_SERVICES = [
  { name: "Bluesky", version: "AT Proto", status: "full", description: "Native, without a bridge" },
  { name: "Mastodon", version: "4.2+", status: "full", description: "Full federation support" },
  { name: "Pixelfed", version: "0.12+", status: "full", description: "Photo federation and stories" },
  { name: "PeerTube", version: "6.2+", status: "full", description: "Video channels in both directions" },
  { name: "GoToSocial", version: "0.16+", status: "full", description: "Lightweight federation" },
  { name: "Akkoma", version: "3.8+", status: "full", description: "Full federation" },
  { name: "Pleroma", version: "2.6+", status: "full", description: "Full federation" },
  { name: "Misskey", version: "2024+", status: "partial", description: "Microblog federation" },
  { name: "Firefish", version: "1.0+", status: "partial", description: "Microblog federation" },
  { name: "Friendica", version: "2024+", status: "partial", description: "Full federation" },
  { name: "Lemmy", version: "0.19+", status: "partial", description: "Thread federation" },
  { name: "WriteFreely", version: "0.14+", status: "partial", description: "Blog federation" },
  { name: "Funkwhale", version: "1.2+", status: "partial", description: "Audio federation" },
] as const;

function ServiceBadge({ service }: { service: typeof COMPATIBLE_SERVICES[number] }) {
  const statusColors = {
    full: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    partial: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  };
  const statusLabels = {
    full: "Full",
    partial: "Partial",
  };

  return (
    <div
      className="flex shrink-0 items-center gap-3 rounded-xl border border-line bg-surface/50 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
      title={`${service.name} ${service.version} — ${service.description}`}
    >
      <span className="font-semibold whitespace-nowrap text-ink-strong">{service.name}</span>
      <span className="font-mono text-[11px] whitespace-nowrap text-muted">{service.version}</span>
      <span
        className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${statusColors[service.status]}`}
      >
        {statusLabels[service.status]}
      </span>
    </div>
  );
}

/** Why-Aloha highlights, taken from the thirty release key points. */
const HIGHLIGHTS = [
  {
    href: "/why#big-picture",
    icon: Rocket,
    title: "Your Aloha becomes the server",
    body: "It lives with your files, chat and calendar — not another service to run. Every user gets @you@your.cloud, using the login they already have.",
  },
  {
    href: "/why#calm-social-media",
    icon: ShieldCheck,
    title: "Calm, healthy social media",
    body: "No scoreboard, calm notifications, a “For you” feed that says why every post is there — and one switch for AI content.",
  },
  {
    href: "/why#privacy-by-default",
    icon: ShieldCheck,
    title: "Privacy by default",
    body: "No trackers, no advertising, no map or GIF service. Photos lose their hidden data, and your data stays on your servers.",
  },
  {
    href: "/why#organisations",
    icon: Users,
    title: "Made for organisations",
    body: "Team accounts, group lists, social-only sign-ups, serious moderation with an audit log — and a home timeline of 400,000 posts in 50 ms.",
  },
] as const;

/** Where each kind of visitor should go. */
const PATHWAYS = [
  {
    icon: Users,
    title: "I want to use it",
    body: "Find a server that runs Aloha Social, or ask your organisation to run one.",
    href: "/get-started",
    label: "Get started",
  },
  {
    icon: Rocket,
    title: "I run a server",
    body: "Install the app, check federation, moderate and operate it day to day.",
    href: "/admins",
    label: "For administrators",
  },
  {
    icon: Code2,
    title: "I build on it",
    body: "The client API, federation protocol, operations and architecture — in the open.",
    href: "/developers",
    label: "For developers",
  },
  {
    icon: ShieldCheck,
    title: "I want the details",
    body: "How a post travels, what the server signs, and what it keeps.",
    href: "/server",
    label: "How it works",
  },
] as const;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
            <span>Fully open source · AGPL-3.0-or-later</span>
          </p>

          <h1 className="mt-7 max-w-[17ch] text-[2.75rem] leading-[0.98] tracking-[-0.04em] text-ink-strong sm:text-[3.9rem] lg:text-[4.75rem]">
            Your Aloha becomes a social network.
          </h1>

          <p className="mt-8 max-w-2xl text-[17.5px] leading-relaxed text-muted sm:text-[18.5px]">
            A new and better social network, focused on digital wellbeing: it
            amplifies good and fun content instead of negative emotions. One
            account reaches the whole open social web — Mastodon, Bluesky,
            Pixelfed, PeerTube and others — with no advertising, no tracking and
            counts hidden by default.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-started" className="btn btn-primary">
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/why" className="btn btn-outline">
              {REASON_COUNT} reasons it is special
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/features" className="btn btn-quiet">
              Explore features
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

      {/* ---------------------------------------- compatible services marquee */}
      <section aria-label="Compatible services" className="overflow-hidden border-y border-line bg-surface py-6">
        <Container>
          <div className="mb-4 flex items-center gap-4">
            <span className="eyebrow shrink-0">Federates with</span>
            <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
              ActivityPub and AT Protocol. Compatibility varies by feature and version.
            </span>
          </div>

          <div className="relative" aria-hidden="true">
            <div className="marquee-track">
              <div className="marquee-content flex gap-8">
                {COMPATIBLE_SERVICES.map((service) => (
                  <ServiceBadge key={service.name} service={service} />
                ))}
                {COMPATIBLE_SERVICES.map((service) => (
                  <ServiceBadge key={`${service.name}-dup`} service={service} />
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent" />
          </div>
        </Container>
      </section>

      {/* ---------------------------------------- platform and protocol facts */}
      <section aria-label="Aloha Social standards and license" className="border-y border-line bg-surface py-5">
        <Container className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
            Aloha Social
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[13px] text-muted">
            <li>Aloha 34–36 · PHP 8.3–8.5</li>
            <li>ActivityPub + AT Protocol</li>
            <li>Mastodon client API</li>
            <li>AGPL-3.0-or-later</li>
          </ul>
        </Container>
      </section>

      {/* ----------------------------------------------- what the app does */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl" data-reveal="">
            <span className="eyebrow">One app for every kind of post</span>
            <h2 className="mt-5 text-[2.1rem] leading-[1.08] tracking-[-0.025em] text-ink-strong sm:text-[2.9rem]">
              Text, photos, Shorts and video channels in one place.
            </h2>
            <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-muted">
              What usually takes Mastodon, Instagram, TikTok and YouTube
              together, with one account and one profile — on infrastructure
              your organisation controls.
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
                body: "Switch between followed accounts, posts from your server and a “For you” feed that says why each post is there.",
                href: "/features/read",
              },
              {
                title: "Follow the conversation",
                body: "Open a post to read its thread, reply, react, bookmark or report it to the server moderators.",
                href: "/features/converse",
              },
              {
                title: "Find people and topics",
                body: "Search accounts and hashtags across fediverse directories, explore profiles and follow people anywhere.",
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

      {/* --------------------------------------------------- why aloha social */}
      <section className="border-t border-line bg-surface py-20 sm:py-24" aria-labelledby="why-heading">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div data-reveal="">
              <span className="eyebrow">{REASON_COUNT} reasons</span>
              <h2
                id="why-heading"
                className="mt-5 max-w-2xl text-[2.1rem] leading-[1.1] tracking-[-0.025em] text-ink-strong sm:text-[2.7rem]"
              >
                Why Aloha Social is special.
              </h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
                {PITCH}
              </p>
            </div>
            <Link
              href="/why"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-coral"
            >
              Read all {REASON_COUNT} reasons
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {HIGHLIGHTS.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <Link
                  key={highlight.href}
                  href={highlight.href}
                  className="card card-hover group flex min-h-56 flex-col p-5"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-coral-soft text-coral">
                    <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[1.25rem] leading-snug text-ink-strong transition-colors group-hover:text-coral">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                    {highlight.body}
                  </p>
                  <span className="mt-auto pt-4 text-[13.5px] font-semibold text-coral">
                    Read the reason <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {REASON_GROUPS.map((group) => (
              <Link
                key={group.id}
                href={`/why#${group.id}`}
                className="font-mono text-[12.5px] text-muted transition hover:text-coral"
              >
                <span className="text-coral">{group.index}</span> {group.title}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- feature tour */}
      <section className="border-t border-line py-20 sm:py-24">
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
          <p className="mt-8 font-mono text-[12px] tracking-[0.1em] text-muted uppercase">
            <Link href="/why#proof" className="transition hover:text-coral">
              All proof points and numbers →
            </Link>
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------------- who it's for */}
      <section className="py-20 sm:py-24" aria-labelledby="pathways-heading">
        <Container>
          <div className="max-w-2xl" data-reveal="">
            <span className="eyebrow">Where to go next</span>
            <h2
              id="pathways-heading"
              className="mt-5 text-[2.1rem] leading-[1.1] tracking-[-0.03em] text-ink-strong sm:text-[2.6rem]"
            >
              A page for every role.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {PATHWAYS.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <Link
                  key={pathway.href}
                  href={pathway.href}
                  className="card card-hover group flex min-h-52 flex-col p-5"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-coral-soft text-coral">
                    <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[1.3rem] leading-tight text-ink-strong transition-colors group-hover:text-coral">
                    {pathway.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                    {pathway.body}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-coral">
                    {pathway.label}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- server model */}
      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div data-reveal="">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-5 text-[2.1rem] leading-[1.1] tracking-[-0.025em] text-ink-strong sm:text-[2.7rem]">
              Your account belongs to the server you choose.
            </h2>
            <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted">
              Each Aloha Social server has its own accounts and
              policies. Its operator sets registration, moderation and retention
              rules, and posts travel on to every compatible service.
            </p>

            <dl className="mt-8 border-t border-line">
              {INSIDE.map(([term, note]) => (
                <div
                  key={term}
                  className="grid gap-1 border-b border-line py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-5"
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
              Install the app on Aloha 34 to 36, run the checks, and invite
              your organisation. Every account on it reaches the open social web.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <Link href="/install" className="btn btn-primary">
              Install Aloha Social
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/developers"
              className="btn border border-sand/45 text-sand hover:border-sand hover:bg-white/10"
            >
              For developers
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
            <span className="mx-4 text-sand/30">·</span>
            <Link href="/admins" className="underline-offset-4 hover:text-sand">
              administration
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
