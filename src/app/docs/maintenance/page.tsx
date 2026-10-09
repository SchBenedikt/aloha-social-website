import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Database, Cloud, Shield, RefreshCw } from "lucide-react";
import React from "react";
import { Container, PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Maintenance & Updates",
  description: "Upgrading Aloha Social, backup strategies, monitoring, and disaster recovery procedures for server administrators.",
  alternates: { canonical: "/docs/maintenance" },
};

const MAINTENANCE_TOPICS: Array<{
  icon: typeof RefreshCw;
  title: string;
  description: string;
  items: readonly string[];
}> = [
  {
    icon: RefreshCw,
    title: "Upgrading Aloha Social",
    description: "Step-by-step upgrade procedure for minor and major releases.",
    items: [
      "Review release notes and breaking changes",
      "Backup database and config before upgrading",
      "Run `occ app:update social` or rebuild from source",
      "Run database migrations: `occ upgrade`",
      "Clear caches and rebuild frontend assets",
      "Verify federation and client API after upgrade",
    ],
  },
  {
    icon: Database,
    title: "Backup Strategy",
    description: "Protect your data with a comprehensive backup plan.",
    items: [
      "Database: daily automated dumps (PostgreSQL/MySQL)",
      "Config files: version-controlled or backed up daily",
      "User uploads: off-site replication or object storage",
      "Test restores quarterly — untested backups are useless",
      "Retention: 30 daily, 12 monthly, 7 yearly snapshots",
    ],
  },
  {
    icon: Cloud,
    title: "Monitoring & Alerting",
    description: "Keep visibility on server health and federation status.",
    items: [
      "Uptime: HTTP checks on /apps/social/ and WebFinger",
      "Queue depth: `occ social:queue:status` — alert if growing",
      "Delivery failures: monitor dead letter queue",
      "Resource usage: CPU, memory, disk, network",
      "Federation: track successful/failed deliveries per domain",
    ],
  },
  {
    icon: Shield,
    title: "Disaster Recovery",
    description: "Procedures for when things go wrong.",
    items: [
      "Documented runbooks for common failure scenarios",
      "RTO/RPO targets defined and tested",
      "Failover procedure for database and app server",
      "Communication plan for user notification",
      "Post-incident review and improvement process",
    ],
  },
] as const;

// Cron commands with HTML-escaped special characters
const CRON_COMMANDS = [
  { comment: "# Daily: backup database (run as DB user)", command: "0 2 * * * pg_dump aloha_social | gzip > /backups/aloha_$(date +\\%F).sql.gz" },
  { comment: "# Hourly: check queue health", command: "0 * * * * /path/to/occ social:queue:status --format=json | /path/to/check-queue-health.sh" },
  { comment: "# Weekly: cleanup old remote media", command: "0 3 * * 0 /path/to/occ social:maintenance:cleanup-remote-media --days=90" },
] as const;

export default function MaintenancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Administrator Documentation"
        title="Maintenance & Updates"
        lede="Keep your Aloha Social server healthy, up-to-date, and recoverable. Regular maintenance prevents incidents and reduces recovery time."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {MAINTENANCE_TOPICS.map((topic) => (
              <article key={topic.title} className="card card-hover p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 grid size-12 place-items-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    <topic.icon className="size-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[1.5rem] leading-tight font-semibold text-ink-strong">{topic.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{topic.description}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 border-t border-line pt-5">
                  {topic.items.map((item: string) => (
                    <li key={item} className="flex gap-3 text-[14.5px] leading-relaxed text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[10px] text-muted">
                        {String(topic.items.indexOf(item) + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <SectionHeading
              eyebrow="Automation"
              title="Automate routine tasks with cron or systemd"
              lede="Reduce manual work and human error by automating maintenance operations."
            />
            <div className="mt-6 space-y-4 font-mono text-[13.5px]">
              <div className="code bg-surface/50 p-4 rounded-xl">
                {CRON_COMMANDS.map((cmd) => (
                  <React.Fragment key={cmd.comment}>
                    <span className="comment">{cmd.comment}</span>
                    <span className="block">{cmd.command}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/docs/occ" className="btn btn-primary">
              View OCC Commands Reference
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/docs/admin" className="btn btn-outline">
              <ArrowLeft className="size-4" />
              Back to Admin Documentation
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}