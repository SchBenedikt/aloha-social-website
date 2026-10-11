import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Monitor, Smartphone, Store } from "lucide-react";
import {
  CtaBand,
  CheckList,
  Container,
  PageHeader,
  Screenshot,
  SectionHeading,
} from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apps and downloads",
  description:
    "Use Aloha Social in the browser today. The native Android and Apple clients are written in the open and not released yet — here is what each one covers.",
  alternates: { canonical: "/clients" },
};

const PLATFORMS = [
  {
    id: "platform-web",
    nav: "Web app",
    icon: Store,
    eyebrow: "Available today",
    title: "The web app ships with the app.",
    body: "It is the reference client and it is already on your server — sign in with the account you have, including SSO and two-factor. Nothing to install, nothing to update separately.",
    bullets: [
      "Works in every modern browser, on the phone as well as the desktop.",
      "Mastodon and Pixelfed apps connect today over the same open API.",
      "The layout is designed first for the phone; dark mode is the same design.",
      "Newcomers create an account right where they already are.",
    ],
    cta: { label: "Install Aloha Social", href: "/install", internal: true },
    screenshot: {
      src: "/img/readme/home.png",
      alt: "Aloha Social running in a web browser",
      width: 1360,
      height: 565,
    },
    caption: "The Aloha Social web interface.",
  },
  {
    id: "platform-android",
    nav: "Android",
    icon: Smartphone,
    eyebrow: "In development",
    title: "Aloha for Android is built in the open.",
    body: "A client for Android phones, tablets and foldables, written to Material Design. It speaks the Mastodon client API — so it works with GoToSocial, Akkoma and the rest — and Aloha Social is its primary target, where it uses the photo, video, Shorts, news and story extensions the server publishes. Not released yet.",
    bullets: [
      "As many accounts as you want, and a local cache that reads offline.",
      "Home, Photos, Video and Shorts, with stories, picture-in-picture and background playback.",
      "Push through UnifiedPush or through your workspace — your choice.",
      "Widgets, launcher shortcuts, Direct Share and the foldable tabletop posture.",
      "Two builds from one source: Google Play, and a F-Droid flavour with no Google libraries.",
    ],
    cta: { label: "Android project on GitHub", href: SITE.android, internal: false },
    screenshot: {
      src: "/img/readme/phone.png",
      alt: "Aloha Social timeline on a phone",
      width: 400,
      height: 860,
    },
    caption: "The Aloha timeline on a phone.",
  },
  {
    id: "platform-ios",
    nav: "Apple",
    icon: Smartphone,
    eyebrow: "Pre-release",
    title: "Aloha for Apple platforms is finished, waiting on a server.",
    body: "One app for iPhone, iPad, Mac, Apple Vision Pro, Apple Watch and Apple TV, written in Swift with no third-party code in it. Every phase of the implementation plan is built — what it has not had yet is a real server to sign in to.",
    bullets: [
      "iPhone, iPad, Mac and Vision Pro get the full feature set.",
      "The Watch is a companion: timeline, notifications, quick replies — it never signs in on its own.",
      "Apple TV is video only: the Video and Shorts modes, and no composer.",
      "294 package tests and 62 UI tests, with every platform target building in Release.",
      "Built on the same open client API as the web app, under an MIT licence.",
    ],
    cta: { label: "Apple client on GitHub", href: SITE.apple, internal: false },
    screenshot: {
      src: "/img/readme/phone.png",
      alt: "Aloha Social on an iPhone",
      width: 400,
      height: 860,
    },
    caption: "Aloha Social on an iPhone.",
  },
] as const;

const COMPARE = [
  {
    row: "Platforms",
    values: [
      "Every modern browser — phone, desktop, tablet",
      "Android phones, tablets and foldables",
      "iPhone, iPad, Mac, Vision Pro, Watch and TV",
    ],
  },
  {
    row: "Status",
    values: [
      "Available now, ships with the app",
      "In development, not released",
      "Implemented, pre-release",
    ],
  },
  {
    row: "Speaks",
    values: [
      "The Mastodon client API served by your own server",
      "The Mastodon client API; Aloha Social is the primary target",
      "The Mastodon client API; Aloha Social is the primary target",
    ],
  },
  {
    row: "Licence",
    values: ["AGPL-3.0-or-later, with the server", "MIT", "MIT"],
  },
] as const;

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Apps and downloads"
        title="One account, on every device."
        lede="The web app is ready today and ships with the app. The native clients for Android and Apple platforms are written in the open and not released yet — the same account, the same timeline, whenever they arrive."
      />

      {/* --------------------------------------------------- platform picker */}
      <section className="border-b border-line py-12 sm:py-16">
        <Container>
          <div className="picker">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="eyebrow">Choose a platform</span>
              <nav className="segmented" aria-label="Clients by platform">
                {PLATFORMS.map((platform) => (
                  <a key={platform.id} href={`#${platform.id}`}>
                    {platform.nav}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-8 space-y-0">
              {PLATFORMS.map((platform) => {
                const Icon = platform.icon;
                return (
                  <article
                    key={platform.id}
                    id={platform.id}
                    className="panel card overflow-hidden"
                  >
                    <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
                      <div>
                        <span className="pill">
                          <Icon className="size-3.5 text-coral" strokeWidth={2.2} />
                          {platform.eyebrow}
                        </span>
                        <h2 className="mt-5 text-[2rem] leading-[1.12] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
                          {platform.title}
                        </h2>
                        <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
                          {platform.body}
                        </p>
                        <CheckList className="mt-7" items={[...platform.bullets]} />
                        {platform.cta.internal ? (
                          <Link href={platform.cta.href} className="btn btn-primary mt-8">
                            {platform.cta.label}
                          </Link>
                        ) : (
                          <a
                            href={platform.cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary mt-8"
                          >
                            {platform.cta.label}
                            <ArrowUpRight className="size-4" />
                          </a>
                        )}
                      </div>

                      <div className="flex justify-center lg:justify-end">
                        <Screenshot
                          src={platform.screenshot.src}
                          alt={platform.screenshot.alt}
                          width={platform.screenshot.width}
                          height={platform.screenshot.height}
                          caption={platform.caption}
                          chromeless={platform.screenshot.width < 600}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- comparison */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Release status"
            title="Where each client stands."
            lede="Both native clients are public repositories you can read and build today. Neither has been released, and neither claims a date — follow each project for its own news."
          />

          <div className="mt-10 overflow-x-auto" data-reveal="">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">Comparison of the web, Android and Apple clients by platforms, status, protocol and licence</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-56 border-b border-line pb-4 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
                    Client
                  </th>
                  {PLATFORMS.map((platform) => (
                    <th
                      key={platform.id}
                      scope="col"
                      className="border-b border-line pb-4 text-[13.5px] font-semibold text-ink-strong"
                    >
                      {platform.nav}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.row}>
                    <th scope="row" className="border-b border-line py-4 pr-4 align-top text-[13.5px] font-medium text-muted">
                      {row.row}
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.row}-${index}`}
                        className="border-b border-line py-4 pr-4 align-top text-[15px] leading-relaxed"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top text-[13.5px] font-medium text-muted">
                    Source
                  </th>
                  {PLATFORMS.map((platform) => (
                    <td key={platform.id} className="py-4 pr-4 align-top">
                      {platform.cta.internal ? (
                        <Link
                          href={platform.cta.href}
                          className="inline-flex items-center gap-1 text-[15px] font-semibold text-coral hover:underline"
                        >
                          Installation guide
                        </Link>
                      ) : (
                        <a
                          href={platform.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[15px] font-semibold text-coral hover:underline"
                        >
                          Repository on GitHub
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-muted">
            There is no native client for Windows or Linux yet — the web app covers both, and
            it is the same account the phone apps will sign in to. Any app that speaks the
            Mastodon client API can be pointed at your domain in the meantime.
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------- admins and clients */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal="">
            <span className="eyebrow">For administrators</span>
            <h2 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
              Set up the service before connecting a client.
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted">
              Aloha Social is installed on Aloha 34 to 36 with PHP 8.3 to
              8.5, from the App Store or from source. Once it is enabled and the
              federation checks pass, every browser and every client that speaks
              the open API can connect to it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">
                Install Aloha Social
              </Link>
              <a
                href={SITE.server}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Aloha Social source code
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <ul className="card divide-y divide-line p-2">
            {[
              {
                icon: Monitor,
                heading: "Any browser",
                note: "The web client ships with the app and is the reference client.",
              },
              {
                icon: Smartphone,
                heading: "Native apps in the open",
                note: "Android and Apple, both public, neither released yet.",
              },
              {
                icon: Store,
                heading: "One account",
                note: "The same identity works in every client, today and later.",
              },
            ].map(({ icon: Icon, heading, note }) => (
              <li key={heading} className="flex items-start gap-4 px-5 py-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-coral-soft text-coral">
                  <Icon className="size-4" strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-ink-strong">
                    {heading}
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-muted">
                    {note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Install Aloha Social and open it in any browser."
        body="The web app is ready today. The native clients for Android and Apple platforms are written in the open and follow when they are ready. Set up the server first, then point every device at it."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "Read compatibility notes", href: "/docs/mastodon" }}
      />
    </>
  );
}
