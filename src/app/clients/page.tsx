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
    "Aloha Social is a browser-based social app with companion clients in development or pre-release. Check current availability and compatibility before installing.",
  alternates: { canonical: "/clients" },
};

const PLATFORMS = [
  {
    id: "platform-web",
    nav: "Web app",
    icon: Store,
    eyebrow: "Web app",
    title: "Use Aloha Social in your browser.",
    body: `The web app is the current Aloha Social client. As checked in ${SITE.appStoreStatusChecked}, its App Store listing is marked deprecated; check the release and host-platform compatibility before installing or upgrading.`,
    bullets: [
      "Sign in through the service where Aloha Social is installed.",
      "Authentication uses the account and configuration of that server.",
      "Mobile companion projects have separate release status and feature coverage.",
      "Check the upstream release notes before using it on a production instance.",
    ],
    cta:      { label: "View the Aloha Social app listing", href: SITE.appStore },
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
    title: "An Android client in development.",
    body: "The Android project is intended to connect to Aloha Social and other services that expose the Mastodon client API. It is still in development and has not been released; check its project page for build and availability updates.",
    bullets: [
      "The repository describes timeline, composer, media and notification features.",
      "Intended to connect to a server that exposes the Mastodon client API.",
      "Source is published under the repository's MIT licence.",
      "Development status and server-specific support may change.",
    ],
    cta: { label: "Android project status on GitHub", href: SITE.android },
    screenshot: {
      src: "/img/readme/phone.png",
      alt: "Aloha Social timeline on a phone",
      width: 400,
      height: 860,
    },
    caption: "An illustrative mobile screenshot; the Android project is not yet released.",
  },
  {
    id: "platform-ios",
    nav: "iOS",
    icon: Smartphone,
    eyebrow: "Native app",
    title: "An Apple-platform client in pre-release.",
    body: "The Apple project describes clients for iPhone, iPad, Mac, Vision Pro, Apple Watch and Apple TV. It is marked pre-release and has not yet been tested against a live Aloha Social service, so confirm availability and compatibility with the project.",
    bullets: [
      "Implemented in Swift and published under the repository's MIT licence.",
      "The repository currently describes the client as pre-release.",
      "Aloha Social API behaviour needs validation against a live service.",
      "Check the project's release notes before relying on it for daily use.",
    ],
    cta: { label: "Apple client status on GitHub", href: SITE.apple },
    screenshot: {
      src: "/img/readme/phone.png",
      alt: "Aloha Social on an iPhone",
      width: 400,
      height: 860,
    },
    caption: "An illustrative mobile screenshot; the Apple project is pre-release.",
  },
] as const;

const COMPARE = [
  {
    row: "Project page",
    values: [
      "App listing and server repository",
      "GitHub repository; check for releases",
      "GitHub repository; pre-release",
    ],
  },
  {
    row: "Current status",
    values: ["App Store listing marked deprecated", "In development; not released", "Pre-release; live-server integration not yet validated"],
  },
  {
    row: "Target server",
    values: [
      "Host platform running Aloha Social",
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
        lede="The browser-based app is listed in the host platform’s app directory, which is marked deprecated. The Android client is in development; the Apple client is pre-release. Follow each project link for current downloads and compatibility."
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
            lede="The browser app is listed in the host platform’s app directory. Android and Apple downloads depend on their separate project release status."
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
                          ? "App listing status"
                          : "Project status on GitHub"}
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

      {/* ----------------------------------------------------- no server yet */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal="">
            <span className="eyebrow">For administrators</span>
            <h2 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
              Set up the service before connecting a client.
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted">
              Aloha Social must be installed on a compatible host platform before
              browser or mobile clients can connect. As checked in{" "}
              {SITE.appStoreStatusChecked}, its app-directory listing is marked
              deprecated and warns about compatibility with newer platform
              releases. Check the exact Aloha Social release and host-platform
              version before installing it on a live server.
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
                note: "The web client is the reference client.",
              },
              {
                icon: Smartphone,
                heading: "Companion apps",
                note: "Android is in development; Apple is pre-release.",
              },
              {
                icon: Store,
                heading: "Check compatibility first",
                note: `App Store listing marked deprecated (${SITE.appStoreStatusChecked}).`,
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
        title="Check Aloha Social’s release before installing."
        body={`The App Store listing was marked deprecated when checked in ${SITE.appStoreStatusChecked}. Review the compatibility information and release status before using Aloha Social in production.`}
        primary={{ label: "Read compatibility notes", href: "/docs/mastodon" }}
        secondary={{ label: "Aloha Social app listing", href: SITE.appStore, external: true }}
      />
    </>
  );
}
