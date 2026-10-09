import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Database,
  Gavel,
  ListChecks,
  ScrollText,
  Server,
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
import { ProgressChecklist } from "@/components/progress-checklist";

export const metadata: Metadata = {
  title: "For administrators",
  description:
    "Moderation, federation limits, retention, logs and OCC commands for operating an Aloha Social service.",
  alternates: { canonical: "/admins" },
};

const DUTIES = [
  {
    icon: Gavel,
    title: "Moderation",
    body: "Reports arrive with the post, account and relevant server context. Administrators can limit accounts or domains, suspend users, remove posts and reverse decisions. Moderation actions are recorded in the Aloha’s audit log.",
    bullets: [
      "A review queue before anything goes out to your users",
      "Per-user and per-domain limits, applied without unfollowing anybody",
      "Removals that also stop the post being served to remote servers that ask",
    ],
  },
  {
    icon: Server,
    title: "Federation limits",
    body: "Decide who your server talks to. A domain block refuses new posts from a host and prunes what it already sent; a limit keeps a host reachable while stopping it from flooding your users.",
    bullets: [
      "Local trends before global ones — a small server's feed is its own posts",
      "Directory lookups to other servers are made on demand and cached nowhere",
      "Everything is reversible, and nothing is deleted behind a user's back",
    ],
  },
  {
    icon: Database,
    title: "Retention and storage",
    body: "Remote content grows whether you read it or not. Retention prunes posts from hosts nobody here interacted with, and never touches local content — the rule is stated on the page that sets it.",
    bullets: [
      "Media lives in your storage, so the ceiling is yours to choose",
      "Housekeeping runs with your existing cron, not a second scheduler",
      "Removing the app removes its tables and routes cleanly",
    ],
  },
  {
    icon: ScrollText,
    title: "Logs and commands",
    body: "Federation is diagnosable from the server you run: delivery failures, signature rejections and retries are logged with the activity they belong to, and anything awkward has an occ command to inspect or repair it.",
    bullets: [
      "Audit log entries for every moderation action",
      "occ commands documented for cron, migrations and integrity checks",
      "ActivityPub requests are traceable by ID across servers",
    ],
  },
] as const;

export default function AdminsPage() {
  return (
    <>
      <PageHeader
        eyebrow="For administrators"
        title="You run the server, so you decide what it does."
        lede="Aloha Social has no central authority setting policies for every community. The server operator manages registration, moderation and federation settings from the administration panel."
        actions={
          <a
            href={SITE.docs.admin}
            className="btn btn-primary"
          >
            Read admin guide
            <ArrowUpRight className="size-4" />
          </a>
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2" data-stagger>
            {DUTIES.map(({ icon: Icon, title, body, bullets }) => (
              <div key={title} className="card flex flex-col p-7">
                <span className="grid size-10 place-items-center rounded-xl bg-coral-soft text-coral">
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <h2 className="mt-5 text-[1.6rem] leading-tight text-ink-strong">
                  {title}
                </h2>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{body}</p>
                <CheckList className="mt-5" items={bullets} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12">
        <Container>
          <ProgressChecklist
            id="administrator-setup"
            title="Administrator setup checklist"
            steps={[
              { label: "Verify the installation and supported versions", href: "/install", description: "Check compatibility and complete the installation steps." },
              { label: "Check the public URL and WebFinger", href: "/install#webfinger", description: "The public address must match the address used to build account IDs." },
              { label: "Verify client access and API routes", href: "/install#web-server", description: "Make sure compatible apps can reach the /api and /oauth endpoints." },
              { label: "Start cron or a delivery worker", href: "/developers/docs/operations", description: "Run background jobs and process outgoing deliveries reliably." },
              { label: "Set moderation, community rules and federation policy", href: "/docs/admin-moderation-and-federation", description: "Decide how to handle community rules and remote servers before opening registration." },
              { label: "Review reports, queues and storage regularly", href: "/developers/docs/operations", description: "Monitor delivery failures, moderation reports and storage growth." },
              { label: "Test backups and recovery", description: "Make sure the database, app files and configuration can be restored." },
            ]}
          />
        </Container>
      </section>

      {/* --------------------------------------------------------- panel */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          <Screenshot
            src="/img/readme/admin.png"
            alt="The Aloha Social administration panel"
            width={1360}
            height={900}
            caption="Federation, trends, users and reports — in the panel, not in a support ticket."
          />
          <div data-reveal="">
            <span className="eyebrow">In the panel</span>
            <h2 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
              Where every setting lives.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              Settings are grouped by the question they answer rather than by the
              table they touch, and the consequences of each one are written on
              the page instead of left to be discovered.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "Default audience and discoverability for new accounts",
                "Who may send a follow or a mention — five questions, two answers",
                "Filtered words, applied to every timeline this app draws",
                "Notification policy, digests and quiet hours",
                "Migration in and out, without losing followers",
              ]}
            />
            <Link
              href="/features/safety"
              className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-coral"
            >
              Safety, in detail
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- routine */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The weekly rhythm"
            title="Four things to keep an eye on."
            lede="Aloha Social uses the Aloha’s scheduled jobs, storage and audit tools, so operators can manage it alongside their existing services."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {[
              {
                icon: ListChecks,
                title: "The queue",
                body: "Open reports, oldest first, each with the action you can take and the reason it will be recorded.",
              },
              {
                icon: Bell,
                title: "Delivery",
                body: "Failed remote deliveries are retried; a host that keeps failing is visible rather than silent.",
              },
              {
                icon: Database,
                title: "Growth",
                body: "Remote media is the number that moves. Set retention before it becomes a surprise.",
              },
              {
                icon: ScrollText,
                title: "Audit",
                body: "Every moderation action, with the administrator's name and the time it happened.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="card p-6">
                <Icon className="size-5 text-coral" strokeWidth={1.9} />
                <h3 className="mt-4 text-[1.2rem] leading-tight text-ink-strong">
                  {title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <RelatedPages
        links={[
          { href: "/server", label: "How the server works", note: "Signing, delivery, queues and retention." },
          { href: "/activitypub", label: "ActivityPub and federation", note: "What travels, and what the far side decides." },
          { href: "/developers", label: "Developer hub", note: "API, protocol, operations and architecture." },
          { href: "/why", label: "30 reasons it is special", note: "The release key points, in order." },
        ]}
      />

      <CtaBand
        title="Set up Aloha Social for your community."
        body="Install it on Aloha 34 to 36, configure federation and client routing, then test the service before opening registration."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{
          label: "Admin guide",
          href: SITE.docs.admin,
        }}
      />
    </>
  );
}
