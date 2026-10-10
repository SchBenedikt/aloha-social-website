import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Boxes,
  Clock,
  FileText,
  Palette,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  CheckList,
  Container,
  CtaBand,
  PageHeader,
  SectionHeading,
  TermList,
} from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hosting model",
  description:
    "How Aloha Social uses its Aloha for accounts, groups, permissions, storage, notifications, scheduled jobs and backups.",
  alternates: { canonical: "/activitypub/native" },
};

const BORROWED = [
  {
    term: "Accounts",
    note: "The people who can post are the people who can log in. No second registration, no separate password, no local user table to reconcile. Provision a user through whatever you already use — LDAP, SAML, OIDC, SCIM or a script — and their fediverse handle exists the moment the account does.",
  },
  {
    term: "Groups",
    note: "Host-platform groups can be used to manage shared feeds. Group membership stays on the server, so operators do not need to maintain a second member list.",
  },
  {
    term: "Permissions",
    note: "The platform’s account and group permissions determine who may post, moderate and change service-wide settings.",
  },
  {
    term: "Storage and quota",
    note: "Attachments use the server’s file storage and configured quotas. Preview generation and effective upload size depend on its storage, PHP and web-server configuration.",
  },
  {
    term: "Notifications",
    note: "Mentions, follows and replies use the server’s notification system and any desktop or mobile clients configured to receive those notifications.",
  },
  {
    term: "Cron",
    note: "Delivery and housekeeping run as background jobs registered with the server. A scheduled job determines how often they run; an optional worker can process the delivery queue continuously.",
  },
  {
    term: "Theming and login",
    note: "The logo, the colours, the login page and the footer are the ones you set for your cloud. Nobody arriving at the sign-in form can tell there are two products installed, because visually there are not.",
  },
  {
    term: "Search",
    note: "Where unified search is enabled, people, hashtags and posts can appear alongside other indexed results.",
  },
] as const;

const ADDED = [
  {
    term: "Actors and collections",
    note: "The fediverse address, the followers and following collections, the outbox, and the inbox that remote servers write to.",
  },
  {
    term: "Signing and verification",
    note: "A key pair per server, HTTP signatures on everything that leaves, and verification of everything that arrives.",
  },
  {
    term: "The composer and timelines",
    note: "Audiences, content warnings, polls, scheduling, quotes, and the three timelines with the sliding switcher.",
  },
  {
    term: "Moderation across servers",
    note: "Reports, silences, suspensions, domain limits and the review queue — the parts that only matter when strangers are involved.",
  },
  {
    term: "Federation diagnostics",
    note: "Delivery failures, signature rejections and queue depth, with occ commands to inspect and retry them.",
  },
  {
    term: "Housekeeping for remote content",
    note: "Retention that prunes what nobody here read, and leaves local posts alone.",
  },
] as const;

const CAPABILITIES = [
  {
    icon: Users,
    title: "One identity per person",
    body: "An account’s handle uses its Aloha username and public domain. When an account is deleted, Aloha Social can publish an ActivityPub deletion so remote services can remove their cached actor.",
  },
  {
    icon: ShieldCheck,
    title: "Sign-in stays where it is",
    body: "Two-factor, app passwords, session management, brute-force protection and your single sign-on provider all apply unchanged — the app never sees a password it could leak.",
  },
  {
    icon: FileText,
    title: "Files behave like files",
    body: "Upload limits, storage quotas, preview generation and file permissions are inherited from the server. The effective limit is determined by the app and the server configuration together.",
  },
  {
    icon: Bell,
    title: "Notifications take one path",
    body: "Federated activity can create a notification on the server, where it follows the notification settings and delivery clients already configured there.",
  },
  {
    icon: Clock,
    title: "Jobs take one queue",
    body: "Outbound delivery, retries and housekeeping are background jobs. Nothing needs a supervisor, a systemd unit or a second cron entry to keep the network alive.",
  },
  {
    icon: Palette,
    title: "It looks like your cloud",
    body: "The Aloha controls the sign-in page and shared branding. Aloha Social opens as an app within that service, using the existing account system.",
  },
  {
    icon: Search,
    title: "Search is one box",
    body: "Posts and people are results in unified search, alongside files, mail and calendar entries — one index, one set of permissions, one place to look.",
  },
  {
    icon: Boxes,
    title: "Upgrades and backups are ordinary",
    body: "Install, upgrade and remove it the way you do every other app: from the store, with migrations on upgrade and no separate service to version.",
  },
] as const;

export default function NativePage() {
  return (
    <>
      <PageHeader
        eyebrow="Hosting model"
        title="Aloha Social works with your existing service."
        lede="Aloha Social is installed as an app on a compatible Aloha. It uses that platform for accounts, permissions, storage and background jobs, while adding ActivityPub accounts, federation and moderation tools."
        actions={
          <>
            <Link href="/activitypub" className="btn btn-primary">
              The protocol
            </Link>
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

      {/* --------------------------------------------------------- brought */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal="">
            <span className="eyebrow">Provided by the platform</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              Accounts, storage and scheduled jobs.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              Aloha Social uses the platform’s existing services rather
              than maintaining separate copies of accounts, permissions or
              files. This keeps administration in one place.
            </p>
            <div className="mt-7">
              <TermList items={BORROWED} />
            </div>
          </div>

          <div data-reveal="">
            <span className="eyebrow">Added on top</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              The federation features Aloha Social adds.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              These features let Aloha Social exchange posts with remote
              servers and give administrators tools for managing that traffic.
            </p>
            <div className="mt-7">
              <TermList items={ADDED} />
            </div>

            <pre className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface p-5 font-mono text-[13px] leading-[1.85] text-ink">
              <span className="text-muted">{"# what an operator sees\n"}</span>
              <span className="text-coral">{"$ "}</span>
              {"occ social:check:install\n"}
              <span className="text-coral">{"$ "}</span>
              {"occ social:worker\n"}
              <span className="text-coral">{"$ "}</span>
              {"occ social:queue:status"}
            </pre>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ capabilities */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="In practice"
            title="What that buys you."
            lede="Integration is only worth something if it changes a task you would otherwise do twice. These are the tasks it removes."
          />

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {CAPABILITIES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-t border-line pt-5">
                <Icon className="size-5 text-coral" strokeWidth={1.9} />
                <h3 className="mt-4 text-[1.2rem] leading-tight text-ink-strong">
                  {title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- lifecycle */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div data-reveal="">
            <span className="eyebrow">Lifecycle</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              Install, update and remove Aloha Social.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              There is no container to keep alive, no external database to
              provision and no separate release channel to track. The package
              ships its migrations with it, and removing the app removes its
              routes, tables and keys.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "One install from the app store, or occ app:install social",
                "Migrations run with the app, not against a separate tool",
                "Removing the app removes its routes, tables and signing keys",
                "Your existing backup covers the posts, because they are files and rows you already back up",
              ]}
            />
          </div>

          <div data-reveal="">
            <SectionHeading
              eyebrow="Where the boundary is"
              title="One application, one process."
            />
            <p className="mt-6 text-[16.5px] leading-relaxed text-muted">
              The only thing this app owns outright is the fediverse surface: the
              actor documents, the inbox and outbox, the signing keys and the
              moderation state. Everything else it reads or asks for. That
              boundary keeps federation data separate from your files. Changes
              to the platform can still affect compatibility, so check the
              app release notes before an upgrade.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">
                Install Aloha Social
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/admins" className="btn btn-outline">
                For administrators
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Prepare the service before inviting people."
        body="Confirm that your server and PHP versions match the Aloha Social release, then run the installation and federation checks."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "Federation", href: "/activitypub/federation" }}
      />
    </>
  );
}
