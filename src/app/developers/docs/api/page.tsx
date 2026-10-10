import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Braces, KeyRound, ScrollText } from "lucide-react";
import {
  CheckList,
  Container,
  CtaBand,
  DocsNote,
  PageHeader,
  SectionHeading,
} from "@/components/ui";
import { DocsTabs } from "@/components/docs-tabs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "API",
  description:
    "The two API surfaces of Aloha Social: the Mastodon-compatible client API and the ActivityPub federation surface — routes, signing, pagination and error shapes.",
  alternates: { canonical: "/developers/docs/api" },
};

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

const SURFACES = [
  {
    icon: Braces,
    title: "For clients",
    body: "The API Mastodon, Tusky and the two native apps expect: timelines, statuses, accounts, notifications, media uploads. Same routes, same pagination, same error codes — so an existing client can be pointed at your domain and work.",
    list: [
      "Bearer tokens issued for an Aloha Social account",
      "Link and max_id pagination that clients already parse",
      "Errors in the format a Mastodon client can display",
    ],
  },
  {
    icon: ScrollText,
    title: "For the network",
    body: "Standard ActivityPub over signed HTTP: WebFinger to resolve an address, an inbox to receive, an outbox to fetch. Nothing here is ours to define — it is the W3C shape, and other servers verify it without asking us.",
    list: [
      "ActivityStreams 2.0 documents with stable ids",
      "HTTP signatures over date, host and body digest",
      "Content negotiation for both HTML and JSON",
    ],
  },
] as const;

export default function ApiDocPage() {
  return (
    <>
      <DocsTabs active="/developers/docs/api" />

      <PageHeader
        eyebrow="Dev docs · 03"
        title="Two surfaces: clients and the network."
        lede="Aloha Social exposes a partial Mastodon-style client API alongside its ActivityPub endpoints. Both are served by the same installation; the compatibility notes describe which routes and features are supported."
        actions={
          <a
            href={SITE.docs.api}
            className="btn btn-primary"
          >
            API reference
            <ArrowUpRight className="size-4" />
          </a>
        }
      />

      {/* ------------------------------------------------------ surfaces */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2" data-stagger>
            {SURFACES.map(({ icon: Icon, title, body, list }) => (
              <div key={title} className="card p-7">
                <span className="grid size-10 place-items-center rounded-xl bg-coral-soft text-coral">
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <h2 className="mt-5 text-[1.6rem] leading-tight text-ink-strong">
                  {title}
                </h2>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
                  {body}
                </p>
                <CheckList className="mt-5" items={list} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ endpoints */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Routes"
            title="A handful, as a sample."
            lede="The full list is endpoint by endpoint in the repository, with the authentication each one accepts. These four show the two halves of the surface."
          />

          <div className="card mt-10 overflow-hidden" data-reveal="">
            <ul className="divide-y divide-line">
              {ENDPOINTS.map((endpoint) => (
                <li key={endpoint.path} className="px-6 py-5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="rounded bg-coral-soft px-1.5 py-0.5 font-mono text-[11px] font-semibold text-coral">
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-[13.5px] break-all text-ink-strong">
                      {endpoint.path}
                    </code>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {endpoint.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ signature */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div data-reveal="">
            <span className="eyebrow">Authentication</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              Who is allowed to do what.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              Client requests carry a bearer token issued for an Aloha Social account
              account, so an app never sees your password and the token can be
              revoked where your sessions are. Federation requests carry an HTTP
              signature made with the sender&apos;s key, which the receiver
              verifies against the actor document it fetches from the sending
              host.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={SITE.docs.api}
                className="btn btn-primary"
              >
                API reference
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={SITE.docs.mastodon}
                className="btn btn-outline"
              >
                Mastodon compatibility
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="card p-7" data-reveal="">
            <KeyRound className="size-5 text-coral" strokeWidth={1.9} />
            <h3 className="mt-4 text-[1.4rem] leading-tight text-ink-strong">
              What that buys you
            </h3>
            <CheckList
              className="mt-5"
              items={[
                "Signed fetch with a per-actor key pair, verified on arrival",
                "Pagination and error shapes that Mastodon clients already handle",
                "Every response is from your own server — no third party in the path",
                "Tokens and sessions managed by the server",
              ]}
            />
          </div>
        </Container>
      </section>

      <DocsNote>
        Endpoints, parameters and response bodies are documented in{" "}
        <a
          href={SITE.docs.api}
          className="text-coral"
        >
          docs/API.md
        </a>{" "}
        next to the code; the commands that inspect and repair the queues behind
        them are in the{" "}
        <Link href="/developers/docs/operations" className="text-coral">
          operations chapter
        </Link>
        .
      </DocsNote>

      <CtaBand
        title="Next: running it."
        body="Cron, workers, the delivery queue and the occ commands an operator reaches for."
        primary={{
          label: "04 Operations",
          href: "/developers/docs/operations",
        }}
        secondary={{ label: "01 Protocol", href: "/developers/docs/protocol" }}
      />
    </>
  );
}
