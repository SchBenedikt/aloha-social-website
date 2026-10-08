import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Radio,
  ScanEye,
  Share2,
  Shuffle,
} from "lucide-react";
import {
  CheckList,
  Container,
  CtaBand,
  Flow,
  PageHeader,
  SectionHeading,
} from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Federation",
  description:
    "How Aloha Social talks to Mastodon, Pixelfed, PeerTube and the rest of the ActivityPub network: compatibility, relays, remote media, cross-server moderation, moving and deletion.",
  alternates: { canonical: "/activitypub/federation" },
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
      ["Publishing a video from here", "none"],
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

const REACH = [
  {
    icon: Radio,
    title: "Relays",
    body: "A new server's federated timeline starts empty because nobody has posted to it yet. Subscribe to a relay and it rebroadcasts the public posts of every server on it — yours included — so the first week is not a blank page. Relayed posts arrive as the post itself, not as a boost by the relay.",
  },
  {
    icon: Share2,
    title: "Directories and starter packs",
    body: "Discover asks its own directory, then the ones your administrator configured, and offers a Follow on every row — naming the directories that did not answer, so a short list is never mistaken for an empty Fediverse. Starter packs follow a curated handful with one press.",
  },
  {
    icon: ScanEye,
    title: "Remote media, proxied",
    body: "Pictures are fetched the first time somebody here needs them and cached afterwards. Video streams from the instance that holds it, proxied through yours, so a viewer's address never reaches a server they never chose to talk to.",
  },
  {
    icon: Shuffle,
    title: "Moving and deletion",
    body: "A Move carries followers from one address to another. A deletion tombstones the actor and federates a Delete, so remote servers drop their copies rather than keeping a ghost of a user you removed.",
  },
] as const;

const DISCOVERY_FLOW = [
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

export default function FederationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Federation"
        title="Talking to the rest of the network."
        lede="Federation is not a feature you switch on — it is a set of promises about what your server will accept, what it will send, and how it behaves when the far side is unhelpful. Here is what this one promises."
        actions={
          <>
            <Link href="/activitypub" className="btn btn-primary">
              The protocol
            </Link>
            <Link href="/servers" className="btn btn-outline">
              Find a server
            </Link>
          </>
        }
      />

      {/* ------------------------------------------------------ matrix */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Compatibility"
            title="What works with what."
            lede="A compatibility matrix beats an adjective. Full means it works in both directions and is covered by the notes in the repository; partial means it works in one direction or degrades to a plain post; the dot means it is not implemented."
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
                          ? "full"
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

          <div className="mt-8 flex flex-wrap gap-3">
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
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- reach */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Reach"
            title="Being heard by servers you have never met."
            lede="A federation that only answers is a federation that goes quiet. Four mechanisms carry your posts outward and bring strangers back."
          />

          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2" data-stagger>
            {REACH.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-t border-line pt-5">
                <Icon className="size-5 text-coral" strokeWidth={1.9} />
                <h3 className="mt-4 text-[1.3rem] leading-tight text-ink-strong">
                  {title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------- discovery */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Discovery"
            title="Four ways somebody finds you."
            lede="None of them go through us. Each one is a request your server answers for itself."
          />
          <Flow steps={DISCOVERY_FLOW} />
        </Container>
      </section>

      {/* ---------------------------------------------------- moderation */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal="">
            <span className="eyebrow">Across servers</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              Moderation has to work on strangers.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              On a single server, moderation is an administrator and a button.
              On a network, it is also a question of what your server will
              accept from a host you have never heard of, and how quickly you can
              stop accepting it.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "Silence a host: it stays reachable, it stops flooding your users",
                "Suspend a host: new posts refused, what it already sent is pruned",
                "Per-user limits for one account that is behaving badly on its own",
                "A review queue before anything goes out to your users",
                "Every action recorded against the administrator who took it",
                "Reports can be forwarded to the instance that hosts the account, anonymised and signed as this server rather than as the person who complained",
              ]}
            />
            <Link
              href="/admins"
              className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-coral"
            >
              The administrator&apos;s view
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="card p-7" data-reveal="">
            <h3 className="text-[1.4rem] leading-tight text-ink-strong">
              What is never federated
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
              The parts of a server that belong to its operator stay with its
              operator. A remote server can see your public posts and your actor
              document; it cannot see any of the following.
            </p>
            <dl className="mt-6 border-t border-line">
              {[
                ["Private notes", "Your note about another account, for you alone."],
                ["Moderation state", "Who you silenced, and why — never published."],
                ["Interest data", "Your For-you hashtag cloud, kept on this server."],
                ["Filtered words", "Your filters decide what reaches your timeline, not what is written on the wire."],
                ["Reports", "Only the forwarded, anonymised form ever leaves, and only if you choose to forward."],
              ].map(([term, note]) => (
                <div
                  key={term}
                  className="grid gap-1 border-b border-line py-4 last:border-b-0"
                >
                  <dt className="text-[14.5px] font-semibold text-ink-strong">
                    {term}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-muted">{note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ honest bit */}
      <section className="py-16 sm:py-20">
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
              <Link href="/activitypub/native" className="btn btn-outline">
                Native integration
              </Link>
            </div>
          </div>

          <ul className="border-t border-line" data-reveal="">
            {[
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
            ].map(([title, body]) => (
              <li key={title} className="border-b border-line py-5">
                <p className="text-[16px] font-semibold text-ink-strong">{title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Point your existing identity at the network."
        body="Installing Aloha Social gives each eligible account a Fediverse address that other compatible services can discover."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "Find a server", href: "/servers" }}
      />
    </>
  );
}
