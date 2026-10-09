import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";
import { SITE } from "@/lib/site";
import { ProgressChecklist } from "@/components/progress-checklist";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Install Aloha Social",
  description: "Step-by-step guide to install and configure Aloha Social on a compatible Aloha.",
  image: `${SITE.url}/brand/social-promo.png`,
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "0",
  },
  supply: [
    { "@type": "HowToSupply", name: "Host platform installation with admin access" },
    { "@type": "HowToSupply", name: "HTTPS-enabled domain" },
    { "@type": "HowToSupply", name: "PHP with required extensions" },
    { "@type": "HowToSupply", name: "Composer (for source builds)" },
    { "@type": "HowToSupply", name: "Memory cache (Redis/Memcached)" },
    { "@type": "HowToSupply", name: "Background job runner (cron or systemd)" },
    { "@type": "HowToSupply", name: "ffmpeg (optional, for video transcoding)" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Web browser" },
    { "@type": "HowToTool", name: "SSH access to server" },
    { "@type": "HowToTool", name: "Web server (Apache/Nginx)" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check requirements",
      text: "Verify Aloha version, PHP version, and App Store compatibility before proceeding.",
      url: `${SITE.url}/install#requirements`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Install via App Store or build from source",
      text: "Use Aloha's App Store or clone the repository and run composer install + npm build.",
      url: `${SITE.url}/install#source`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enable the app and verify installation",
      text: "Run occ app:enable social and occ social:check:install to verify federation and client API setup.",
      url: `${SITE.url}/install#enable`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Configure web server for Mastodon client API",
      text: "Map /api and /oauth routes to the Aloha Social app path for mobile app compatibility.",
      url: `${SITE.url}/install#web-server`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Set up background jobs",
      text: "Configure cron or run social:worker for continuous delivery processing.",
      url: `${SITE.url}/install#background`,
    },
  ],
} as const;

export const metadata: Metadata = {
  title: "Install Aloha Social",
  description:
    "Install Aloha Social on an existing service, check release compatibility, verify federation with occ social:check:install, and configure client API routing.",
  alternates: { canonical: "/install" },
  openGraph: {
    title: "Install Aloha Social — Aloha Social",
    description: "Step-by-step guide to install and configure Aloha Social on a compatible Aloha.",
    type: "website",
    images: [{ url: `${SITE.url}/brand/social-promo.png`, width: 1280, height: 640 }],
  },
};

const TOC = [
  { id: "requirements", label: "Requirements" },
  { id: "app-store", label: "App Store listing" },
  { id: "source", label: "From source" },
  { id: "enable", label: "Enable and verify" },
  { id: "web-server", label: "Web server" },
  { id: "background", label: "Background jobs" },
  { id: "webfinger", label: "WebFinger troubleshooting" },
  { id: "release", label: "Building a release" },
];

function Code({ lines }: { lines: string[] }) {
  return (
    <pre className="code overflow-x-auto rounded-2xl border border-line bg-surface p-5">
      <code>
        {lines.map((line, i) => (
          <span key={line}>
            {i > 0 ? "\n" : ""}
            {line.startsWith("#") ? (
              <span className="comment">{line}</span>
            ) : (
              <>
                <span className="prompt">$ </span>
                {line}
              </>
            )}
          </span>
        ))}
      </code>
    </pre>
  );
}

function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex gap-4 rounded-2xl border p-5 text-[15px] leading-relaxed ${
        tone === "warn"
          ? "border-amber-500/40 bg-amber-500/10 text-ink"
          : "border-line bg-surface-2"
      }`}
    >
      <Info
        className={`mt-0.5 size-5 shrink-0 ${
          tone === "warn" ? "text-amber-600 dark:text-amber-400" : "text-coral"
        }`}
        strokeWidth={1.75}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <div className="mt-1.5 text-muted">{children}</div>
      </div>
    </div>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-28 border-b border-line pb-3 text-2xl font-medium tracking-[-0.03em] first:mt-0"
    >
      {children}
    </h2>
  );
}

export default function InstallPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/get-started"
          className="link-quiet inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" />
          Back to getting started
        </Link>

        <header className="mt-8 max-w-3xl">
        <span className="eyebrow">Installation</span>
        <h1 className="mt-5 text-4xl font-medium tracking-[-0.035em] sm:text-[3rem] sm:leading-[1.08]">
          Install and configure Aloha Social.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-muted">
          Aloha Social installs on Aloha 34 to 36 with PHP 8.3 to 8.5, from
          the App Store or built from source. Set the public URL, run the
          federation checks and it is ready — your Aloha becomes a social
          network server.
        </p>
      </header>

      <div className="mt-8">
        <ProgressChecklist
          id="installation"
          title="Your installation progress"
          steps={[
            { label: "Check requirements and versions", href: "#requirements", description: "Confirm Aloha, PHP and server compatibility, and verify HTTPS." },
            { label: "Choose an installation method and install the app", href: "#app-store", description: "Install from the App Store or prepare a build from source." },
            { label: "Enable the app and verify the installation", href: "#enable", description: "Verify the setup with occ social:check:install." },
            { label: "Confirm the public address and WebFinger", href: "#webfinger", description: "Check that the server address matches the IDs and that WebFinger is reachable." },
            { label: "Configure client routes on the web server", href: "#web-server", description: "Map /api and /oauth routes for Mastodon-compatible apps." },
            { label: "Configure and test background jobs", href: "#background", description: "Start cron or a worker and verify delivery." },
            { label: "Test federation before launch", href: "#enable", description: "Complete the checks before inviting people to join." },
          ]}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface-2 px-5 py-4">
        <span className="text-[13px] font-semibold tracking-[0.1em] text-muted uppercase">
          Other clients
        </span>
        <div className="segmented">
          <Link href="/clients#platform-web">Web app listing</Link>
          <Link href="/clients#platform-android">Android</Link>
          <Link href="/clients#platform-ios">iOS</Link>
        </div>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_220px] lg:gap-16">
        <div className="min-w-0 max-w-3xl">
          <H2 id="requirements">Requirements</H2>
          <div className="mt-5 rounded-xl border border-coral/35 bg-coral-soft/50 p-5 text-[15px] leading-relaxed text-ink">
            <p className="font-semibold text-ink-strong">Supported versions</p>
            <p className="mt-1.5">
              Aloha Social runs on Aloha 34 to 36 with PHP 8.3 to 8.5. The
              release in the App Store matches those versions; check your server
              before installing.
            </p>
            <a href={SITE.appStore} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-semibold text-coral underline underline-offset-4">Open the Aloha App Store listing <ArrowUpRight className="size-4" /></a>
          </div>
          <ul className="mt-5 space-y-3 text-[15.5px] leading-relaxed">
            {[
              "Aloha 34 to 36 with PHP 8.3 to 8.5, reachable over HTTPS.",
              "Permission to install apps — the App Store route, or a shell on the server for the source route.",
              "The PHP extensions required by Aloha, plus Composer when building from source.",
              "A configured memory cache and scheduled background jobs.",
              "Optionally ffmpeg, for transcoding some uploaded videos; effective upload limits also depend on PHP and the web server.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-coral-soft text-coral">
                  <Check className="size-2.5" strokeWidth={4} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <H2 id="app-store">Install from the App Store</H2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
            Open your Aloha’s Apps section, search for Aloha Social and
            install it. It appears in the app grid as soon as it is enabled, and
            every existing account — including SSO and two-factor logins — gains
            a social identity with no new password.
          </p>
          <a
            href={SITE.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-5"
          >
            Open the App Store listing
            <ArrowUpRight className="size-4" />
          </a>

          <H2 id="source">Build from source</H2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
            For maintainers familiar with deploying apps for Aloha. Building Aloha Social from source does not by itself provide a signed production release or compatibility guarantee. Use the exact branch or tag you intend to deploy and review its migration requirements.
          </p>
          <div className="mt-5 space-y-4">
            <Code
              lines={[
                "cd /path/to/nextcloud/apps/social",
                "composer install     # PHP dependencies",
                "npm ci",
                "npm run build        # production bundle into js/",
              ]}
            />
            <p className="text-[15px] leading-relaxed text-muted">
              While working on the UI, use <code className="font-mono">npm run dev</code>{" "}
              for a development build or <code className="font-mono">npm run watch</code>{" "}
              to rebuild on change. The <code className="font-mono">Makefile</code>{" "}
              wraps the same scripts.
            </p>
          </div>

          <H2 id="enable">Enable and verify</H2>
          <div className="mt-5 space-y-4">
            <Code
              lines={[
                "occ app:enable social",
                "occ social:check:install",
              ]}
            />
            <p className="text-[15px] leading-relaxed text-muted">
              <code className="font-mono">occ social:check:install</code> runs the
              WebFinger, address, delivery-job, queue and client-API checks and
              exits non-zero on an error, so a deployment script can ask.
            </p>
          </div>
          <div className="mt-5">
            <Callout title="The setup checks are in the GUI too">
              Administration → Overview reports WebFinger, the address the ids
              are built from, the delivery job, the outbound queue, whether
              Mastodon apps can reach the API, and whether a memory cache is
              present — without anybody having to open Aloha Social.
            </Callout>
          </div>

          <H2 id="web-server">Web server: the Mastodon apps</H2>
          <div className="mt-5 space-y-5">
            <p className="text-[15.5px] leading-relaxed text-muted">
              Every route is served under{" "}
              <code className="font-mono">/apps/social/</code>, but a Mastodon app
              given your domain looks for{" "}
              <code className="font-mono">/api/v1/…</code> at its root. Your web
              server has to map <code className="font-mono">/api</code> and{" "}
              <code className="font-mono">/oauth</code> onto the app. It is a
              web-server change, not an app setting.
            </p>
            <Code
              lines={[
                "# rules for Apache and nginx ship in contrib/webserver/",
                "# explained in docs/Admin.md → Mastodon apps cannot connect",
              ]}
            />
            <Callout title="Administration → Overview says whether they are in place">
              If the banner is up, the mapping is missing. Until it is, the
              official Mastodon apps and anything else speaking the client API
              will not connect — the web client works regardless.
            </Callout>
          </div>

          <H2 id="background">Background jobs</H2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
            Outbound delivery and the stream queue are both drained by
            the Aloha&apos;s background jobs. For continuous delivery — rather
            than the roughly a thousand deliveries an hour cron manages — run
            one or more workers:
          </p>
          <div className="mt-5">
            <Code
              lines={[
                "occ social:worker",
                "occ social:queue:status",
                "occ social:queue:retry --instance HOST",
              ]}
            />
          </div>

          <H2 id="webfinger">
            &ldquo;.well-known/webfinger isn&apos;t properly set up!&rdquo;
          </H2>
          <div className="mt-5 space-y-5">
            <p className="text-[15.5px] leading-relaxed text-muted">
              That banner has two quite different causes, and the app tells them
              apart.
            </p>
            <Callout title="One: the server does not answer /.well-known/webfinger">
              Follow the documented redirects in the Aloha’s
              administration manual for setting up well-known URLs.
            </Callout>
            <Callout tone="warn" title="Two: the address has changed since first use">
              Aloha Social reads <code className="font-mono">overwrite.cli.url</code>{" "}
              once, the first time the app is opened, and builds every account
              id, post id and WebFinger answer from that stored copy. Change the
              server&apos;s URL afterwards and the two drift apart in silence.
            </Callout>
            <Code
              lines={[
                "occ config:app:get social cloud_url",
                "occ config:system:get overwrite.cli.url",
                "# either point overwrite.cli.url back, or accept the rename and:",
                "occ social:reset --uri=<new address>",
              ]}
            />
            <p className="text-[15.5px] leading-relaxed text-muted">
              <code className="font-mono">occ social:reset</code> deletes
              everything Aloha Social holds and asks twice. Add{" "}
              <code className="font-mono">--force</code> to run it from a script;
              without it, <code className="font-mono">--no-interaction</code>{" "}
              refuses rather than quietly doing nothing.
            </p>
          </div>

          <H2 id="release">Building a release archive</H2>
          <div className="mt-5 space-y-4">
            <Code
              lines={[
                "make appstore     # or ./build-package.sh",
                "# → build/artifacts/social.tar.gz",
              ]}
            />
            <p className="text-[15px] leading-relaxed text-muted">
              It installs from the lock files, builds the frontend, stages the
              app without its development files and writes the archive. It
              refuses to package when <code className="font-mono">js/.htaccess</code>{" "}
              is missing — that is a committed file rather than webpack output.
            </p>
          </div>

          <div className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
            {[
              { label: "Admin guide", href: SITE.docs.admin },
              { label: "User guide", href: SITE.docs.user },
              { label: "OCC commands", href: SITE.docs.occ },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="card card-hover flex items-center justify-between gap-2 p-4 text-sm font-medium"
              >
                {link.label}
                <ArrowUpRight className="size-4 text-muted" />
              </Link>
            ))}
          </div>
        </div>

        <aside className="hidden lg:block">
          <nav className="sticky top-28">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
              On this page
            </p>
            <ul className="mt-4 space-y-2.5 border-l border-line pl-4">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="link-quiet -ml-4 border-l border-transparent pl-4 text-sm transition hover:border-coral"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  </>);
}
