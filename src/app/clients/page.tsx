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
    "Use Aloha Social in the browser today, and get the new native Aloha apps for iPhone, Android, Windows, macOS and Linux as they ship.",
  alternates: { canonical: "/clients" },
};

const PLATFORMS = [
  {
    id: "platform-web",
    nav: "Web app",
    icon: Store,
    eyebrow: "Available today",
    title: "Use Aloha Social in your browser.",
    body: "The web app ships with the app on your Aloha and is the reference client. Sign in with the account you already have — no new password, no separate sign-up.",
    bullets: [
      "Works in every modern browser, on desktop and on the phone.",
      "Mastodon and Pixelfed mobile apps can connect today.",
      "Newcomers create an account right where they already are.",
      "Ships with the app — nothing extra to install.",
    ],
    cta:      { label: "Get Aloha Social from the Aloha App Store", href: SITE.appStore },
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
    eyebrow: "Native app",
    title: "Aloha for Android is on the way.",
    body: "New native apps for mobile and desktop are coming to iPhone, Android, Windows, macOS and Linux. They connect to your server over the same open API the web app uses, and newcomers will be able to create an account right in the app.",
    bullets: [
      "Full timeline, composer, media and notifications.",
      "Sign up or sign in from inside the app.",
      "Source is published under the repository's MIT licence.",
      "Follow the project for builds and release dates.",
    ],
    cta: { label: "Android project on GitHub", href: SITE.android },
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
    nav: "iOS",
    icon: Smartphone,
    eyebrow: "Native app",
    title: "Aloha for iPhone and iPad is on the way.",
    body: "The Apple client covers iPhone, iPad, Mac, Vision Pro, Apple Watch and Apple TV — part of the same wave of native apps, written in Swift and published openly.",
    bullets: [
      "One codebase across the Apple platforms.",
      "Built on the same open client API as the web app.",
      "Published under the repository's MIT licence.",
      "Sign up for a new account right in the app.",
    ],
    cta: { label: "Apple client on GitHub", href: SITE.apple },
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
    row: "Project page",
    values: [
      "Aloha App Store listing",
      "GitHub repository",
      "GitHub repository",
    ],
  },
  {
    row: "Current status",
    values: ["Available now", "In progress — iPhone, Android, Windows, macOS and Linux", "In progress — iPhone, iPad and Mac"],
  },
  {
    row: "Target server",
    values: [
      "Aloha running Aloha Social",
      "Mastodon client API; Aloha Social is a target",
      "Mastodon client API; Aloha Social is a target",
    ],
  },
];

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Apps and downloads"
        title="Choose an Aloha Social client."
        lede="The web app is ready today and ships with the app. New native apps for iPhone, Android, Windows, macOS and Linux are on the way — the same account, the same timeline, on every device."
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
                        <a
                          href={platform.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary mt-8"
                        >
                          {platform.cta.label}
                          <ArrowUpRight className="size-4" />
                        </a>
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
            title="Where to get each client."
            lede="The web app ships with the app today. The native apps for Android and Apple arrive with the release train — follow each project for build and download links."
          />

          <div className="mt-10 overflow-x-auto" data-reveal="">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">Comparison of web, Android and Apple clients by project, status and target server</caption>
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
                    Get it
                  </th>
                  {PLATFORMS.map((platform) => (
                    <td key={platform.id} className="py-4 pr-4 align-top">
                      <a
                        href={platform.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[15px] font-semibold text-coral hover:underline"
                      >
                        {platform.nav === "Web app"
                          ? "Open the App Store listing"
                          : "Follow the project on GitHub"}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
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
                heading: "Apps on the way",
                note: "iPhone, Android, Windows, macOS and Linux.",
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
        body="The web app is ready today, and the native apps for iPhone, Android, Windows, macOS and Linux follow. Set up the server first, then point every device at it."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "Read compatibility notes", href: "/docs/mastodon" }}
      />
    </>
  );
}
