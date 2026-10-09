import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Fingerprint,
  KeyRound,
  ShieldQuestion,
} from "lucide-react";
import {
  Container,
  CtaBand,
  DocsNote,
  Flow,
  PageHeader,
  SectionHeading,
  TermList,
} from "@/components/ui";
import { DocsTabs } from "@/components/docs-tabs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Protocol",
  description:
    "ActivityPub in Nextcloud: how one post moves between servers, how requests are signed and what a receiving server checks before accepting them.",
  alternates: { canonical: "/developers/docs/protocol" },
};

const TERMS = [
  {
    term: "Actor",
    note: "A person or a server, addressed by a URL. Every Aloha Social account has an actor document; the server can also publish shared collections.",
  },
  {
    term: "Activity",
    note: "A JSON object saying what happened: Create, Follow, Accept, Like, Announce, Delete, Move. The wire carries activities, not posts.",
  },
  {
    term: "Inbox",
    note: "The URL other servers post to. It is where your server reads from, and it verifies every request that arrives.",
  },
  {
    term: "Outbox",
    note: "Where your server keeps what you published, and the collection remote servers read when they fetch a thread.",
  },
  {
    term: "Collection",
    note: "Followers, following, liked, a timeline. Each is a readable URL with paging, which is how a remote client renders your profile without asking us anything.",
  },
  {
    term: "Object",
    note: "The post itself — a Note, a Person, an Image — referred to by a stable id. Activities wrap objects; the object is what gets cached.",
  },
] as const;

const STEPS = [
  {
    title: "You press Post",
    body: "The composer hands the post to the server, which assigns it an id on your domain, attaches the audience you chose, strips Exif from every picture and stores the attachments in your own storage.",
    meta: "Create → Note",
  },
  {
    title: "Followers are resolved",
    body: "The server reads your followers collection, groups the remote actors by host, and skips hosts that are blocked or limited. Each host gets one delivery, not one per follower.",
    meta: "https://your.example/users/you/followers",
  },
  {
    title: "The activity is built",
    body: "A Create activity wrapping your Note, with the object id, the attributed-to URL and the audience spelled out for every server that will read it.",
    meta: "{\"type\":\"Create\",\"object\":{…}}",
  },
  {
    title: "The request is signed",
    body: "An HTTP signature over the date, the target host and a digest of the body, made with your server's private key. The public half sits in your actor document where anyone can fetch it.",
    meta: "Signature: keyId=\"…#main-key\"",
  },
  {
    title: "It is queued, then delivered",
    body: "Delivery is a background job, so a slow or dead host never blocks a post. Failures are retried, counted and visible in occ social:queue:status.",
    meta: "occ social:worker",
  },
  {
    title: "Their server verifies it",
    body: "The receiving server fetches your actor document, checks the signature against your public key, confirms the audience includes it, and stores the object.",
    meta: "GET actor → verify → store",
  },
  {
    title: "It appears in a timeline",
    body: "On their side the post is now an ordinary remote post in the timeline of the people who follow you. On your side nothing changes — you are already reading your own.",
    meta: "",
  },
  {
    title: "A reply comes back",
    body: "Their Create arrives at your inbox, is verified the same way, matched to the object it replies to, and inserted into the thread you were reading. Your notifications get a line.",
    meta: "inbox → thread → notification",
  },
] as const;

const CHECKS = [
  {
    icon: Fingerprint,
    title: "Who claims to be sending this",
    body: "The keyId in the signature points at an actor document on the same host as the request. The public key is fetched from there, not supplied in the message.",
  },
  {
    icon: KeyRound,
    title: "Whether the body was altered",
    body: "A digest of the body is part of the signed material, so a proxy that rewrites the payload breaks the signature and the activity is dropped.",
  },
  {
    icon: ShieldQuestion,
    title: "Whether this server is in the audience",
    body: "Even a perfectly signed Create is rejected if the audience does not include us. A signed message about somebody else's conversation is still somebody else's.",
  },
] as const;

export default function ProtocolDocPage() {
  return (
    <>
      <DocsTabs active="/developers/docs/protocol" />

      <PageHeader
        eyebrow="Dev docs · 01"
        title="How an activity is built, signed and delivered."
        lede="Aloha Social has no private protocol and no bridge. This is the path a post takes between ActivityPub servers, with the checks both sides make along the way."
        actions={
          <>
            <a
              href="https://www.w3.org/TR/activitypub/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              The specification
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

      {/* ------------------------------------------------------ vocabulary */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
          <div data-reveal="">
            <span className="eyebrow">Vocabulary</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              The messages ActivityPub servers exchange.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              ActivityPub is deliberately small. Almost everything a fediverse
              client does — a follow, a boost, a favourite, a deletion — is one
              of a set of activity types wrapping an object and addressing it
              to people or collections. The terms alongside explain how those
              messages move between servers.
            </p>
            <p className="mt-4 text-[16.5px] leading-relaxed text-muted">
              ActivityPub is a public W3C standard. Servers can implement
              different parts of it, so using the same protocol does not mean
              every feature works the same way on every service.
            </p>
          </div>

          <div data-reveal="">
            <TermList items={TERMS} />
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- diagram */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The shape of it"
            title="Two servers, one request."
            lede="Nothing passes through a broker, a relay of ours, or a company. Your server talks to theirs, signs the request, and both sides can check it afterwards."
          />

          <div
            className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch"
            data-reveal=""
          >
            <div className="card p-6">
              <span className="font-mono text-[11.5px] tracking-widest text-coral uppercase">
                Your server
              </span>
              <p className="mt-3 font-mono text-[14px] text-ink-strong">
                your.example
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] text-muted">
                <li>holds your private key</li>
                <li>builds the activity</li>
                <li>signs and queues the request</li>
                <li>owns the object id</li>
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 py-2 lg:flex-row lg:gap-0">
              <span className="h-16 w-px bg-line lg:h-px lg:w-16" aria-hidden />
              <span className="rotate-90 text-coral lg:rotate-0">
                <ArrowRight className="size-5" />
              </span>
              <span className="font-mono text-[11.5px] tracking-widest text-muted uppercase">
                HTTPS
              </span>
              <span className="rotate-90 text-coral lg:rotate-0">
                <ArrowRight className="size-5" />
              </span>
              <span className="h-16 w-px bg-line lg:h-px lg:w-16" aria-hidden />
            </div>

            <div className="card p-6">
              <span className="font-mono text-[11.5px] tracking-widest text-coral uppercase">
                Their server
              </span>
              <p className="mt-3 font-mono text-[14px] text-ink-strong">
                mastodon.social
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] text-muted">
                <li>fetches your actor document</li>
                <li>checks the signature</li>
                <li>checks the audience</li>
                <li>stores the object under your id</li>
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-[15.5px] leading-relaxed text-muted">
            Both halves can be inspected afterwards: the signature covers the
            date, the host and a digest of the body, so a captured request is
            verifiable by anybody who fetches your public key. No shared secret,
            no registration with a central authority, and a key you can rotate.
          </p>
        </Container>
      </section>

      {/* -------------------------------------------------------- sequence */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="A post, start to finish"
            title="Eight steps from Post to reply."
            lede="Everything below happens in the background, on your cron, with retries — because the far side is a stranger's server and it will sometimes be down."
          />
          <Flow steps={STEPS} />
        </Container>
      </section>

      {/* --------------------------------------------------------- signing */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Trust"
            title="Three checks, in this order."
            lede="Federation only works if a server can reject a lie without asking anybody. Each check is local, cheap and independent of the sender's goodwill."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-3" data-stagger>
            {CHECKS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card p-6">
                <Icon className="size-5 text-coral" strokeWidth={1.9} />
                <h3 className="mt-4 text-[1.3rem] leading-tight text-ink-strong">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div data-reveal="">
              <h3 className="text-[1.5rem] leading-tight text-ink-strong">
                Discovery, before any of that
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                Somebody types{" "}
                <code className="font-mono text-[14.5px]">
                  @you@your.example
                </code>{" "}
                into Mastodon. The browser asks your server&apos;s WebFinger, gets
                back the URL of your actor document, fetches that, and now knows
                where to send a Follow. Two GETs, both public, neither of them
                involving us as a company — only as a host.
              </p>
            </div>
            <div data-reveal="">
              <h3 className="text-[1.5rem] leading-tight text-ink-strong">
                Keys, rotation and deletion
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                Keys are generated when the app is first opened and live with the
                server they belong to. When an Aloha Social account is deleted, its
                actor is tombstoned and a Delete is federated so other servers
                drop their copies rather than keeping a ghost. Migration is the
                same idea in the other direction: a Move that carries followers
                across.
              </p>
              <Link
                href="/developers/docs/federation"
                className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-coral"
              >
                02 Federation
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <DocsNote>
        The scope notes — what is implemented, what is refused — live with the
        compatibility matrix in the{" "}
        <Link href="/developers/docs/federation" className="text-coral">
          federation chapter
        </Link>
        , and the routes themselves in the{" "}
        <Link href="/developers/docs/api" className="text-coral">
          API chapter
        </Link>
        .
      </DocsNote>

      <CtaBand
        title="Read it running on your own server."
        body="Every activity this page describes is visible in your server's logs and storage. Install the app and watch the first one go out."
        primary={{ label: "04 Operations", href: "/developers/docs/operations" }}
        secondary={{ label: "Installation guide", href: "/install" }}
      />
    </>
  );
}
