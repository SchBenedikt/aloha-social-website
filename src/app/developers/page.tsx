import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Braces, GitFork, KeyRound, Scale } from "lucide-react";
import {
  CheckList,
  Container,
  CtaBand,
  PageHeader,
  RelatedPages,
  SectionHeading,
} from "@/components/ui";
import { SITE } from "@/lib/site";
import { ProgressChecklist } from "@/components/progress-checklist";

export const metadata: Metadata = {
  title: "For developers",
  description:
    "Source code, APIs, architecture and release guidance for Aloha Social, the open-source ActivityPub server published under AGPL-3.0-or-later.",
  alternates: { canonical: "/developers" },
};

const REPOS = [
  {
    name: "social",
    role: "The server",
    note: "The Aloha Social server app: ActivityPub, the client API, administration and migrations.",
    href: SITE.server,
  },
  {
    name: "Apple",
    role: "Apple-platform client",
    note: "The Apple client for iPhone, iPad, Mac, Vision Pro, Watch and TV — one app across all six.",
    href: SITE.apple,
  },
  {
    name: "Android",
    role: "Android client",
    note: "The Android client for phones, tablets and foldables — Material Design, offline cache, UnifiedPush.",
    href: SITE.android,
  },
  {
    name: "Logos",
    role: "Brand",
    note: "Marks, wordmarks and colours — the assets this site uses.",
    href: SITE.logos,
  },
] as const;

const ENDPOINTS = [
  {
    method: "GET",
    path: "/index.php/apps/social/api/v1/timelines/home",
    note: "Your home timeline, paginated, with the same shape Mastodon clients expect.",
  },
  {
    method: "POST",
    path: "/index.php/apps/social/api/v1/statuses",
    note: "Publish a post with an audience, attachments and a content warning.",
  },
  {
    method: "GET",
    path: "/.well-known/webfinger",
    note: "Resolve an address to an actor — how any other server finds you.",
  },
  {
    method: "POST",
    path: "/index.php/apps/social/inbox",
    note: "Signed ActivityPub inbox: follows, replies and boosts from remote servers.",
  },
] as const;

export default function DevelopersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For developers"
        title="Read the guides. Check the source."
        lede="Everything Aloha ships is open source under AGPL-3.0-or-later: the server app, the native clients and the brand assets. Read the guides here, then read the code."
        actions={
          <>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              AlohaSocial on GitHub
              <ArrowUpRight className="size-4" />
            </a>
            <Link href="/developers/docs/api" className="btn btn-outline">
              API reference
              <ArrowRight className="size-4" />
            </Link>
          </>
        }
      />

      {/* --------------------------------------------------------- repos */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Project source"
            title="Each project has a GitHub home."
            lede="Open a native overview first, then visit the repository for the implementation, issues and release status."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {REPOS.map((repo) => (
              <article key={repo.name} className="card card-hover group flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-lg bg-coral-soft text-coral">
                    <GitFork className="size-4" strokeWidth={2} />
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" />
                </div>
                <span className="mt-5 font-mono text-[15px] text-ink-strong">
                  AlohaSocial/{repo.name}
                </span>
                <span className="mt-1 text-[13px] font-semibold text-coral">
                  {repo.role}
                </span>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  {repo.note}
                </p>
                <a href={repo.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-coral">
                  Open {repo.name} on GitHub <ArrowUpRight className="size-4" />
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12">
        <Container>
          <ProgressChecklist
            id="developer-setup"
            title="A step-by-step local development guide"
            steps={[
              { label: "Review the source and contribution guidelines", href: "/docs/contributing", description: "Read the repository, license and contribution process." },
              { label: "Prepare a local development environment", href: "/install#source", description: "Set up an Aloha Social development instance, PHP/Composer and Node/npm." },
              { label: "Install dependencies and run a build", href: "/install#source", description: "Use the lockfiles and verify the production build." },
              { label: "Understand the architecture and protocol", href: "/developers/docs/protocol", description: "Trace data flow and federation before making changes." },
              { label: "Explore the API and OCC commands", href: "/developers/docs/api", description: "Find existing interfaces and diagnostic tools." },
              { label: "Test changes and check compatibility", href: "/developers/docs/operations", description: "Run tests and installation checks, and review affected versions." },
              { label: "Document the patch and prepare a contribution", href: "/docs/contributing", description: "Explain the change clearly and prepare it for review." },
            ]}
          />
        </Container>
      </section>

      {/* ------------------------------------------------------------ api */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start">
            <div data-reveal="">
              <span className="eyebrow">The API</span>
              <h2 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
                Two surfaces: one for
                <br />
                clients, one for the network.
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
                The client API is documented endpoint by endpoint, with the
                authentication it accepts. The federation surface is standard
                ActivityPub over signed HTTP — WebFinger to resolve, an inbox to
                receive, an outbox to deliver.
              </p>
              <CheckList
                className="mt-7"
                items={[
                  "Signed fetch with a per-actor key pair, verified on arrival",
                  "Pagination and error shapes that Mastodon clients already handle",
                  "Every response is from your own server — no third party in the path",
                ]}
              />
              <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/developers/docs/api" className="btn btn-primary">
                API reference <ArrowRight className="size-4" />
              </Link>
              <Link href="/docs/occ" className="btn btn-outline">
                OCC commands <ArrowRight className="size-4" />
              </Link>
              </div>
            </div>

            <div className="card overflow-hidden" data-reveal="">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <Braces className="size-4 text-coral" />
                <span className="font-mono text-[12.5px] tracking-wide text-muted">
                  a handful of routes
                </span>
              </div>
              <ul className="divide-y divide-line">
                {ENDPOINTS.map((endpoint) => (
                  <li key={endpoint.path} className="px-5 py-4">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="rounded bg-coral-soft px-1.5 py-0.5 font-mono text-[11px] font-semibold text-coral">
                        {endpoint.method}
                      </span>
                      <code className="font-mono text-[13px] break-all text-ink-strong">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                      {endpoint.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- licence etc */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3" data-stagger>
            <div className="card p-7">
              <Scale className="size-5 text-coral" strokeWidth={1.9} />
              <h3 className="mt-5 text-[1.4rem] leading-tight text-ink-strong">
                AGPL-3.0-or-later
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                If you run a modified version as a service, you owe your users
                the source. That is the whole licence, and it is why the network
                can stay open.
              </p>
            </div>
            <div className="card p-7">
              <KeyRound className="size-5 text-coral" strokeWidth={1.9} />
              <h3 className="mt-5 text-[1.4rem] leading-tight text-ink-strong">
                Signed and verifiable
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Activities are signed with keys a remote server can check against
                your actor document. A claim about who said something can be
                verified by anybody, not just by us.
              </p>
            </div>
            <div className="card p-7">
              <GitFork className="size-5 text-coral" strokeWidth={1.9} />
              <h3 className="mt-5 text-[1.4rem] leading-tight text-ink-strong">
                Contribute a patch
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Issues and pull requests are open. The architecture note explains
                how queues, storage and federation fit together before you start
                moving things around.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                <a href={SITE.docSources.architecture} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted hover:text-coral">
                  Original on GitHub <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <RelatedPages
        links={[
          { href: "/admins", label: "For administrators", note: "Moderation, federation limits, retention and logs." },
          { href: "/server", label: "How the server works", note: "Outgoing, incoming, follows and the network." },
          { href: "/docs", label: "Documentation", note: "Every guide, in one list." },
          { href: "/why", label: "30 reasons it is special", note: "What the release sets out to do." },
        ]}
      />

      <CtaBand
        title="Clone it and run it locally."
        body="Aloha Social is distributed as an app you install on your own server. Review its compatibility requirements and setup instructions before building or installing it."
        primary={{ label: "Server repository", href: SITE.server, external: true }}
        secondary={{ label: "Installation guide", href: "/install" }}
      />
    </>
  );
}
