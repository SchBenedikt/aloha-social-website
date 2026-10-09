import type { Metadata } from "next";
import {
  ArrowUpRight,
  Inbox,
  Network,
  Send,
  Users,
} from "lucide-react";
import {
  CheckList,
  Container,
  CtaBand,
  PageHeader,
  RelatedPages,
  Screenshot,
  SectionHeading,
} from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The server",
  description:
    "A technical overview of Aloha Social as an ActivityPub server: signed requests, inbox and outbox delivery, federation and platform requirements.",
  alternates: { canonical: "/server" },
};

const HOW = [
  {
    icon: Send,
    title: "Outgoing",
    body: "When a post is published, the server builds the Activity, signs the HTTP request and sends it to the remote followers who can receive it. Delivery is queued, retried and logged by the Aloha’s background jobs.",
  },
  {
    icon: Inbox,
    title: "Incoming",
    body: "Remote posts arrive at an inbox, are verified against the sender's public key, stored and then fanned out into your timeline, your notifications and — if somebody replied — into the thread you were reading.",
  },
  {
    icon: Users,
    title: "Follows and actors",
    body: "Every account is a WebFinger-resolvable actor with its own inbox, outbox and followers collection. People on other ActivityPub services can discover an account by its handle and follow it, subject to compatibility on both servers.",
  },
  {
    icon: Network,
    title: "The network",
    body: "Nothing is centralised by us. Your server talks to theirs over ActivityPub, and a third server can carry the conversation on. Blocking a host removes what it already sent and refuses what it sends next.",
  },
] as const;

export default function ServerPage() {
  return (
    <>
      <PageHeader
        eyebrow="The server"
        title="An ActivityPub server for Aloha Social."
        lede="Aloha Social handles accounts, signed requests, inbox and outbox delivery, and server-to-server federation. It is installed as an app on a compatible Aloha rather than operated as a separate service."
        actions={
          <>
            <a
              href={SITE.server}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Server repository
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={SITE.docs.architecture}
              className="btn btn-outline"
            >
              Architecture notes
              <ArrowUpRight className="size-4" />
            </a>
          </>
        }
      />

      {/* ------------------------------------------------------------ how */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How a post travels"
            title="Out, in, and out again."
            lede="Federation runs as scheduled background jobs in Nextcloud. Delivery failures are logged and retried; operators can run a worker for continuous delivery."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2" data-stagger>
            {HOW.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card p-7">
                <span className="grid size-10 place-items-center rounded-xl bg-coral-soft text-coral">
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-[1.35rem] leading-tight text-ink-strong">
                  {title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------- compatibility */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div data-reveal="">
            <span className="eyebrow">Compatibility</span>
            <h2 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
              Readable from Mastodon,
              <br />
              Pixelfed and PeerTube.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              Compatibility is documented rather than claimed, because the
              interesting answer is always a list of what works and what does
              not. The note in the repository covers the client API, the
              vocabulary that is understood, and the parts that are not.
            </p>

            <div className="mt-7 space-y-5">
              <CheckList
                items={[
                  "Follows, mentions, replies, boosts and favourites in both directions",
                  "Custom emoji, content warnings and quotes that other servers render",
                  "Remote profiles and timelines served to remote clients",
                ]}
              />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
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
          </div>

          <Screenshot
            src="/img/readme/settings.png"
            alt="Aloha Social settings: visibility, discoverability and migration"
            width={1360}
            height={900}
            caption="What your server announces publicly is decided here, not at somebody else's head office."
          />
        </Container>
      </section>

      {/* --------------------------------------------------- what it is */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="">
            <span className="eyebrow">Requirements</span>
            <h2 className="mt-4 text-[2rem] leading-[1.15] tracking-[-0.03em] text-ink-strong sm:text-[2.3rem]">
              What it needs to run.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              Aloha Social needs a compatible Aloha release, PHP and
              scheduled background jobs. Check the app release notes and
              platform requirements before installation.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "A compatible Aloha installation, accessible over HTTPS",
                "The PHP extensions required by the Aloha and Aloha Social release",
                "Scheduled background jobs enabled for federation and housekeeping",
                "ffmpeg if you want video transcoded on upload",
                "Storage for media: every attachment is a file your server holds",
              ]}
            />
          </div>

          <div data-reveal="">
            <span className="eyebrow">Operations</span>
            <h2 className="mt-4 text-[2rem] leading-[1.15] tracking-[-0.03em] text-ink-strong sm:text-[2.3rem]">
              What you have to watch.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              Nothing exotic, and all of it is in the admin guide rather than
              implied.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "Background jobs and the housekeeping run, on a schedule you set",
                "Remote media growth — retention can prune what nobody here read",
                "A review queue when your server becomes reachable from outside",
                "occ commands for the things that must not be done in a browser",
                "Back up Aloha Social data together with the rest of Aloha",
              ]}
            />
            <a
              href={SITE.docs.admin}
              className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-coral"
            >
              Read the admin guide
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- anywhere */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Your address"
            title="The handle is the interesting part."
            lede="An Aloha Social account has a Fediverse address in the form @name@example.org. Its server operator controls the domain and account policies."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-3" data-stagger>
            {[
              ["you", "@you@your-domain.example"],
              ["federated", "Followed from mastodon.social"],
              ["portable", "Moved to a new server with its followers"],
            ].map(([label, value]) => (
              <div key={label} className="card p-6">
                <span className="font-mono text-[11.5px] tracking-widest text-coral uppercase">
                  {label}
                </span>
                <p className="mt-3 font-mono text-[15px] break-all text-ink-strong">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <RelatedPages
        links={[
          { href: "/activitypub", label: "ActivityPub", note: "The eight steps from Post to reply." },
          { href: "/admins", label: "For administrators", note: "Moderation, queues and the audit log." },
          { href: "/developers/docs/operations", label: "Operations", note: "Workers, storage, retention and upgrades." },
          { href: "/why", label: "30 reasons it is special", note: "The release key points, in order." },
        ]}
      />

      <CtaBand
        title="Set up Aloha Social for your server."
        body="Review the release requirements, configure WebFinger and client routing, then verify federation before inviting users."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "Browse the features", href: "/features" }}
      />
    </>
  );
}
