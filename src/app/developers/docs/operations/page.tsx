import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database, ListChecks, ScrollText } from "lucide-react";
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
  title: "Operations",
  description:
    "Running Aloha Social: cron and background jobs, the delivery worker, occ commands for queue and diagnostics, storage and retention, migrations and logs.",
  alternates: { canonical: "/developers/docs/operations" },
};

const COMMANDS = [
  {
    group: "Verify a deployment",
    icon: ListChecks,
    items: [
      {
        cmd: "occ app:enable social",
        note: "Enables the app; migrations run as part of it.",
      },
      {
        cmd: "occ social:check:install",
        note: "Runs the WebFinger, address, delivery-job, queue and client-API checks, and exits non-zero on an error so a deployment script can ask.",
      },
    ],
  },
  {
    group: "The delivery queue",
    icon: ScrollText,
    items: [
      {
        cmd: "occ social:worker",
        note: "Drains the queue continuously — the alternative to waiting for cron.",
      },
      {
        cmd: "occ social:queue:status",
        note: "Depth, failures and the hosts they belong to.",
      },
      {
        cmd: "occ social:queue:retry --instance HOST",
        note: "Re-queues everything that failed for one host.",
      },
    ],
  },
  {
    group: "Address and repair",
    icon: Database,
    items: [
      {
        cmd: "occ config:app:get social cloud_url",
        note: "The address every id on this server is built from.",
      },
      {
        cmd: "occ config:system:get overwrite.cli.url",
        note: "The source of that address, read the first time the app is opened.",
      },
      {
        cmd: "occ social:reset --uri=<new address>",
        note: "Deletes everything the app holds and asks twice. --force runs it from a script; without it, --no-interaction refuses rather than quietly doing nothing.",
      },
    ],
  },
] as const;

const RHYTHM = [
  {
    icon: ListChecks,
    title: "Cron does the routine work",
    body: "Delivery, housekeeping and stream polling are background jobs registered with the Nextcloud. Delivery speed depends on the configured schedule and workload. For continuous delivery, operators can run a worker instead.",
  },
  {
    icon: Database,
    title: "Storage stays in your storage",
    body: "Attachments use the Nextcloud's file storage and configured quota, with previews supplied by its preview system. Retention can prune remote posts nobody here read while leaving local posts untouched.",
  },
  {
    icon: ScrollText,
    title: "Failures are legible",
    body: "Delivery failures, signature rejections and retries are logged with the activity they belong to, traceable by id across servers, and every moderation action lands in the audit log with a name and a time.",
  },
] as const;

function Cmd({ cmd }: { cmd: string }) {
  return (
    <code className="font-mono text-[13.5px] break-all text-ink-strong">
      {cmd.startsWith("occ") || cmd.startsWith("make") ? (
        <>
          <span className="text-coral">$ </span>
          {cmd}
        </>
      ) : (
        cmd
      )}
    </code>
  );
}

export default function OperationsDocPage() {
  return (
    <>
      <DocsTabs active="/developers/docs/operations" />

      <PageHeader
        eyebrow="Dev docs · 04"
        title="What you run, and what it does."
        lede="Aloha Social uses the Nextcloud’s scheduled jobs and OCC command-line interface. This guide covers delivery workers, storage, retention and diagnostics for operators."
        actions={
          <>
            <Link href="/install" className="btn btn-primary">
              Installation guide
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={SITE.docs.occ}
              className="btn btn-outline"
            >
              occ reference
              <ArrowUpRight className="size-4" />
            </a>
          </>
        }
      />

      {/* ---------------------------------------------------------- rhythm */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {RHYTHM.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-t border-line pt-5">
                <Icon className="size-5 text-coral" strokeWidth={1.9} />
                <h3 className="mt-4 text-[1.3rem] leading-tight text-ink-strong">
                  {title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- commands */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="occ"
            title="The commands, by what they fix."
            lede="Each one is safe to read before it is safe to run: the status commands change nothing, and the two that do are covered in the installation guide before you reach them."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3" data-stagger>
            {COMMANDS.map(({ group, icon: Icon, items }) => (
              <div key={group} className="card overflow-hidden">
                <div className="flex items-center gap-3 border-b border-line px-6 py-4">
                  <Icon className="size-4 text-coral" strokeWidth={1.9} />
                  <h3 className="text-[15px] font-semibold text-ink-strong">
                    {group}
                  </h3>
                </div>
                <ul>
                  {items.map((item) => (
                    <li key={item.cmd} className="border-b border-line px-6 py-4 last:border-b-0">
                      <Cmd cmd={item.cmd} />
                      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                        {item.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- lifecycle */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div data-reveal="">
            <span className="eyebrow">Lifecycle</span>
            <h2 className="mt-5 text-[2.05rem] leading-[1.12] tracking-[-0.035em] text-ink-strong sm:text-[2.4rem]">
              Installed, upgraded and removed like any other app.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              No external database to provision and no separate release channel
              to track. The package ships its migrations with it, and removing
              the app removes its routes, tables and keys — your existing backup
              already covers the posts, because they are files and rows you
              already back up.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "One install from the app store, or occ app:install social",
                "Migrations run with the app, not against a separate tool",
                "Check which app data and files remain before removing the app",
                "Verify Aloha Social and Nextcloud version compatibility before upgrading",
              ]}
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/install" className="btn btn-primary">
                Installation guide
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/admins" className="btn btn-outline">
                For administrators
              </Link>
            </div>
          </div>

          <div className="card p-7" data-reveal="">
            <h3 className="text-[1.4rem] leading-tight text-ink-strong">
              When WebFinger complains
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
              The banner has two different causes and the app tells them apart:
              either the server does not answer{" "}
              <code className="font-mono text-[14px]">/.well-known/webfinger</code>
              , or the address has changed since the first run and the ids this
              server built no longer match.
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
              Both are covered step by step, with the commands, in the
              installation guide.
            </p>
            <Link
              href="/install#webfinger"
              className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-coral"
            >
              WebFinger troubleshooting
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <DocsNote>
        The full command list with every flag is in{" "}
        <a
          href={SITE.docs.occ}
          className="text-coral"
        >
          docs/OCC-Commands.md
        </a>
        , and the panel equivalents — moderation, federation limits, retention —
        are on the{" "}
        <Link href="/admins" className="text-coral">
          administrator page
        </Link>
        .
      </DocsNote>

      <CtaBand
        title="Back to the beginning."
        body="The four chapters are a loop: protocol, federation, API, operations — and then the source."
        primary={{ label: "All chapters", href: "/developers/docs" }}
        secondary={{ label: "For developers", href: "/developers" }}
      />
    </>
  );
}
