import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Wrench } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Choose the right starting point for Aloha Social: find a server as a user, or review setup and compatibility information as an administrator.",
  alternates: { canonical: "/get-started" },
};

const PATHS = [
  {
    number: "01",
    icon: BookOpen,
    title: "I want to use Aloha Social",
    summary:
      "You need an account on a server that runs Aloha Social. Ask your organisation or community whether one is available. This site's directory does not yet have verified public listings, so it cannot currently recommend a server to join.",
    steps: [
      "Ask your organisation or community whether it operates an Aloha Social server and accepts accounts.",
      "Before signing up, check the server’s registration rules and community policies.",
      "If you plan to use a mobile app, check its release status and compatibility first.",
    ],
    links: [
      { label: "Check the server directory", href: "/servers", primary: true },
      { label: "Read the user guide", href: SITE.docs.user, primary: false },
      { label: "See client availability", href: "/clients", primary: false },
    ],
  },
  {
    number: "02",
    icon: Wrench,
    title: "I want to set up Aloha Social",
    summary:
      "Aloha Social is installed as an app in an existing service. Check the exact release against the service and PHP versions first: its App Store listing is marked deprecated and warns about compatibility with newer releases.",
    steps: [
      "Check the Aloha Social release notes and the supported platform and PHP versions.",
      "Review the public URL, WebFinger, background-job and client-routing requirements.",
      "Run the setup checks and test federation before inviting people to join.",
    ],
    links: [
      { label: "Read the Aloha Social installation guide", href: "/install", primary: true },
      { label: "Read the administrator guide", href: SITE.docs.admin, primary: false },
      { label: "Check Mastodon compatibility", href: SITE.docs.mastodon, primary: false },
    ],
  },
] as const;

export default function GetStartedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="Get started with Aloha Social."
        lede="Choose the next step for using Aloha Social or installing it for your community. The instructions reflect the current server and client availability."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {PATHS.map(({ number, icon: Icon, title, summary, steps, links }) => (
              <article key={number} className="card flex flex-col p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-coral-soft text-coral">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[12px] tracking-wider text-coral">{number}</span>
                </div>
                <h2 className="mt-5 text-[1.75rem] leading-tight text-ink-strong">{title}</h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{summary}</p>

                <ol className="mt-6 space-y-3 border-t border-line pt-5">
                  {steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-[14.5px] leading-relaxed text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[10px] text-muted">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <nav aria-label={`${title} resources`} className="mt-auto flex flex-col items-start gap-3 border-t border-line pt-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={link.primary ? "btn btn-primary" : "inline-flex min-h-8 items-center gap-1.5 text-[14px] font-medium text-coral hover:underline"}
                    >
                      {link.label}
                      {link.primary ? <ArrowRight className="size-4" /> : <ArrowUpRight className="size-3.5" />}
                    </Link>
                  ))}
                </nav>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[14.5px] leading-relaxed text-muted">
              Want to understand what the app can do before deciding? Browse the
              feature descriptions or read the project’s documentation.
            </p>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Link href="/features" className="text-[14px] font-semibold text-coral hover:underline">Browse features</Link>
              <Link href="/docs" className="text-[14px] font-semibold text-coral hover:underline">Documentation</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
