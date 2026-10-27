import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  Container,
  CtaBand,
  Flow,
  PageHeader,
  SectionHeading,
} from "@/components/ui";
import { DocsTabs } from "@/components/docs-tabs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Federation",
  description:
    "Compatibility matrix for Mastodon, Pixelfed, PeerTube and Misskey, how a remote server discovers this one, relays and directories, and the limits of what is federated.",
  alternates: { canonical: "/developers/docs/federation" },
};

const MATRIX = [
  {
    software: "Mastodon",
    rows: [
      ["Follows, replies, boosts, favourites", "full"],
      ["Profiles and remote timelines", "full"],
      ["Custom emoji and content warnings", "full"],
      ["Quotes", "partial"],
      ["Polls", "partial"],
      ["Admin API", "none"],
    ] as const,
  },
  {
    software: "Pixelfed",
    rows: [
      ["Follows, replies, likes", "full"],
      ["Pictures and albums", "full"],
      ["Collections on a profile", "full"],
      ["Stories / 24-hour shorts", "partial"],
      ["Filters and lens packs", "none"],
      ["Admin API", "none"],
    ] as const,
  },
  {
    software: "PeerTube",
    rows: [
      ["Follows and comments", "full"],
      ["Video playback in the feed", "full"],
      ["Chapters and continue watching", "full"],
      ["Publishing a video from here", "full"],
      ["Watch pages and RSS", "full"],
      ["Admin API", "none"],
    ] as const,
  },
  {
    software: "Misskey / Akkoma",
    rows: [
      ["Follows, replies, reactions", "full"],
      ["Custom emoji as reactions", "full"],
      ["Drive and galleries", "none"],
      ["Notes-only posts", "partial"],
      ["Renote / pure boost", "partial"],
      ["Admin API", "none"],
    ] as const,
  },
] as const;

const MARK: Record<"full" | "partial" | "none", string> = {
  full: "✓",
  partial: "~",
  none: "·",
};

const DISCOVERY = [
  {
    title: "Somebody types a handle",
    body: "Mastodon asks your server's WebFinger for the address, gets the actor URL, and fetches it. Both requests are public and cacheable.",
    meta: "/.well-known/webfinger",
  },
  {
    title: "Or they search a name",
    body: "Discover asks several directories at once using the read-only APIs those servers publish. No credentials are stored for any of them, and nothing is aggregated into a database of ours.",
    meta: "directory → search → Follow button",
  },
  {
    title: "Or they follow a hashtag",
    body: "A hashtag reads exactly like following a person, so an interest can be subscribed to without subscribing to whoever happens to be talking loudest that day.",
    meta: "#tag",
  },
  {
    title: "Or a relay introduces you",
    body: "Your public posts go out to every server on the relay, and theirs come back — which is the difference between a network that grows and one that waits to be found.",
    meta: "relay subscription",
  },
] as const;

const NEVER = [
  [
    "Private notes",
    "Your note about another account, for you alone.",
  ],
  ["Moderation state", "Who you silenced, and why — never published."],
  ["Interest data", "Your For-you hashtag cloud, kept on this server."],
  [
    "Filtered words",
    "Your filters decide what reaches your timeline, not what is written on the wire.",
  ],
  [
    "Reports",
    "Only the forwarded, anonymised form ever leaves, and only if you choose to forward.",
  ],
] as const;

const LIMITS = [
  [
    "No built-in bridge to closed networks",
    "What you can reach is what speaks ActivityPub. Bridges exist elsewhere; running one here would mean trusting a third party with your audience.",
  ],
  [
    "No server-wide search of the whole fediverse",
    "Search covers what this server is allowed to see. A full-network index would mean either crawling strangers or paying somebody who does.",
  ],
  [
    "No guarantee a remote host will behave",
    "Delivery is retried and visible, but the far side answers to its own operator. Silence and suspension are the tools for that, and they are yours.",
  ],
] as const;

export default function FederationDocPage() {
  return (
    <>
      <DocsTabs active="/developers/docs/federation" />

      <PageHeader
        eyebrow="Dev docs · 02"
        title="What this server sends, accepts and refuses."
        lede="Federation is a set of promises about interoperability rather than a switch. This chapter states them: what works with which software, how strangers find you, and where the network stops."
        actions={
          <>
            <a
              href={SITE.docs.mastodon}
              className="btn btn-primary"
            >
              Mastodon compatibility
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={SITE.docs.atproto}
              className="btn btn-outline"
            >
              Bluesky / ATProto
              <ArrowUpRight className="size-4" />
            </a>
          </>
        }
      />

      {/* ------------------------------------------------------- matrix */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Compatibility"
            title="What works with what."
            lede="These examples describe implemented ActivityPub paths, not complete compatibility with every server. Remote behavior depends on the peer, object type and server configuration; see the compatibility notes for tested boundaries."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2" data-stagger>
            {MATRIX.map((group) => (
              <div key={group.software} className="card overflow-hidden">
                <div className="flex items-baseline justify-between border-b border-line px-6 py-4">
                  <h3 className="text-[1.3rem] leading-none text-ink-strong">
                    {group.software}
                  </h3>
                  <span className="font-mono text-[11.5px] tracking-widest text-muted uppercase">
                    ActivityPub
                  </span>
                </div>
                <ul>
                  {group.rows.map(([label, state]) => (
                    <li
                      key={label}
                      className="flex items-center gap-4 border-b border-line px-6 py-3 last:border-b-0"
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full text-[12px] font-bold ${
                          state === "full"
                            ? "bg-sea-soft text-sea"
                            : state === "partial"
                              ? "bg-coral-soft text-coral"
                              : "bg-surface-2 text-muted"
                        }`}
                        aria-hidden
                      >
                        {MARK[state]}
                      </span>
                      <span className="text-[14.5px]">{label}</span>
                      <span className="ml-auto font-mono text-[11px] tracking-wide text-muted">
                        {state === "full"
                          ? "implemented"
                          : state === "partial"
                            ? "partial"
                            : "not implemented"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------- discovery */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Discovery"
            title="Four ways somebody finds you."
            lede="None of them go through us. Each one is a request your server answers for itself."
          />
          <Flow steps={DISCOVERY} />
        </Container>
      </section>

      {/* -------------------------------------------------------- secret */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div data-reveal="">
            <span className="eyebrow">Scope</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              What is never federated.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              The parts of a server that belong to its operator stay with its
              operator. A remote server can see your public posts and your actor
              document; it cannot see any of the following.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/activitypub/federation" className="btn btn-primary">
                Federation in plain language
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <ul className="border-t border-line" data-reveal="">
            {NEVER.map(([title, body]) => (
              <li key={title} className="border-b border-line py-5">
                <p className="text-[16px] font-semibold text-ink-strong">
                  {title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* --------------------------------------------------------- limits */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div data-reveal="">
            <span className="eyebrow">Limits</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              Where the network stops.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              ActivityPub is what you can reach directly. Networks that do not
              speak it need a bridge, and a bridge is somebody else&apos;s
              decision to keep running — so none is built in. Everything below
              is stated in the repository rather than discovered after you have
              moved your followers.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
              href={SITE.docs.moving}
                className="btn btn-primary"
              >
                Moving your account
                <ArrowUpRight className="size-4" />
              </a>
              <Link href="/developers/docs/protocol" className="btn btn-outline">
                01 Protocol
              </Link>
            </div>
          </div>

          <ul className="border-t border-line" data-reveal="">
            {LIMITS.map(([title, body]) => (
              <li key={title} className="border-b border-line py-5">
                <p className="text-[16px] font-semibold text-ink-strong">
                  {title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Next: the routes that carry it."
        body="The inbox, the outbox, WebFinger and the client API — how to call them and what they answer."
        primary={{ label: "03 API", href: "/developers/docs/api" }}
        secondary={{ label: "04 Operations", href: "/developers/docs/operations" }}
      />
    </>
  );
}
