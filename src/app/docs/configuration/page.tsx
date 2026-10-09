import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wrench, Server, Shield, CheckCircle } from "lucide-react";
import { Container, PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Configuration Guide",
  description: "Step-by-step configuration for Aloha Social: what to set, why it matters, and how to verify it works.",
  alternates: { canonical: "/docs/configuration" },
};

const STEPS = [
  {
    number: 1,
    title: "Set your public URL",
    icon: Server,
    why: "Federation needs to know where to find your server. Every ActivityPub message carries this URL.",
    how: [
      "Run: `occ config:app:set social cloud_url=https://your-cloud.example.com`",
      "Or add to config.php: `'overwrite.cli.url' => 'https://your-cloud.example.com',`",
      "Verify: `occ config:app:get social cloud_url`",
    ],
    tip: "Use your real domain, not localhost. Federation will not work with localhost.",
  },
  {
    number: 2,
    title: "Enable video uploads (recommended)",
    icon: Wrench,
    why: "Without ffmpeg, videos over 10 MB fail. With it, users can upload up to 2 GB.",
    how: [
      "Install ffmpeg on your server: `apt install ffmpeg` (Debian/Ubuntu)",
      "Verify: `which ffmpeg` should return a path like `/usr/bin/ffmpeg`",
      "Tell Aloha Social: `occ config:app:set social media_ffmpeg_path=/usr/bin/ffmpeg`",
      "Test: Upload a video in the web app — it should transcode to H.264 MP4",
    ],
    tip: "If you use Docker, ensure ffmpeg is in your container image.",
  },
  {
    number: 3,
    title: "Configure background workers",
    icon: Wrench,
    why: "Delivery to other servers happens in background jobs. More workers = faster federation.",
    how: [
      "For small servers (under 100 users): `occ config:app:set social worker_concurrency=2`",
      "For larger servers: `occ config:app:set social worker_concurrency=4` (or 8)",
      "Verify: `occ social:queue:stats` shows worker count and queue depth",
    ],
    tip: "Don't set more workers than CPU cores. Start small and monitor.",
  },
  {
    number: 4,
    title: "Enable push notifications (optional)",
    icon: Shield,
    why: "Mobile apps get instant notifications instead of polling. Saves battery and data.",
    how: [
      "Generate VAPID keys: `occ social:push:vapid`",
      "Add public key: `occ config:app:set social push_vapid_public=BJ...`",
      "Add private key: `occ config:app:set social push_vapid_private=secret`",
      "Enable: `occ config:app:set social push_enabled=true`",
      "Test: Log in on mobile app, go to Settings → Notifications → Push should be available",
    ],
    tip: "Keys are per-instance. Regenerate if you move domains.",
  },
  {
    number: 5,
    title: "Verify federation works",
    icon: CheckCircle,
    why: "A misconfigured server talks to nobody. Verify before you invite users.",
    how: [
      "Run health check: `occ social:check` — all green means you're ready",
      "Test delivery: `occ social:webfinger @yourhandle@your-cloud.example.com`",
      "Check queue: `occ social:queue:stats` — should show 0 pending after a few minutes",
      "Follow a remote account (e.g., @gargron@mastodon.social) — their posts should appear",
    ],
    tip: "If webafinger fails, check your `.well-known/webfinger` DNS/rewrite rules.",
  },
];

const REQUIREMENTS = [
  { label: "Nextcloud", value: "28–30 (LTS recommended)" },
  { label: "PHP", value: "8.2+ (8.3 recommended)" },
  { label: "Database", value: "PostgreSQL 14+ or MySQL 8.0+/MariaDB 10.6+" },
  { label: "Web server", value: "Apache 2.4+ or Nginx 1.18+" },
  { label: "PHP extensions", value: "xml, mbstring, curl, gd, intl, gmp, bcmath, zip, apcu, redis" },
  { label: "Background jobs", value: "systemd timers (preferred) or cron" },
  { label: "ffmpeg", value: "5.0+ with libx264, libvpx, libopus (for video)" },
];

export default function ConfigurationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Administrator Guide"
        title="Configuration Guide"
        lede="Five steps to a working, federating server. Each step explains what to do, why it matters, and how to verify it."
      />

      <section className="py-12 sm:py-16">
        <Container>
          {STEPS.map((step) => (
            <section key={step.title} className="mb-16">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-coral-soft flex items-center justify-center">
                  <span className="text-2xl font-bold text-coral">{step.number}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <step.icon className="size-6 text-coral" strokeWidth={1.5} />
                    <h2 className="text-[1.5rem] font-semibold text-ink-strong">{step.title}</h2>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.why}</p>
                  
                  <div className="mt-4 space-y-2">
                    {step.how.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 text-center font-mono text-[13px] text-coral">{i + 1}.</span>
                        <code className="flex-1 font-mono text-[13.5px] bg-surface px-3 py-1.5 rounded border border-line overflow-x-auto">{item}</code>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 p-3 rounded-lg bg-coral-soft/50 border border-coral/20">
                    <span className="font-mono text-[13px] text-coral">💡 </span>
                    <span className="text-[14px] text-ink">{step.tip}</span>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section className="mb-16">
            <SectionHeading
              eyebrow="Requirements"
              title="Server Requirements"
              lede="Minimum platform requirements. Most Nextcloud installations already meet these."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {REQUIREMENTS.map((req) => (
                <div key={req.label} className="card p-5">
                  <dt className="font-semibold text-ink-strong">{req.label}</dt>
                  <dd className="mt-1 text-[14.5px] text-muted font-mono">{req.value}</dd>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <SectionHeading
              eyebrow="Important"
              title="Configuration precedence"
              lede="Settings are resolved in this order (highest wins):"
            />
            <ol className="mt-6 space-y-3 list-decimal list-inside text-[15px] leading-relaxed text-ink">
              <li>Environment variables (highest priority)</li>
              <li>OCC app config values</li>
              <li>config.php values</li>
              <li>Built-in defaults (lowest priority)</li>
            </ol>
            <p className="mt-4 text-[14.5px] text-muted">
              Use <code className="font-mono bg-surface-2 px-1.5 py-0.5 rounded">{'occ config:app:get social <key>'}</code> to see the effective value.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/docs/admin" className="btn btn-primary">
              <ArrowLeft className="size-4" />
              Back to Admin Guide
            </Link>
            <Link href="/docs/maintenance" className="btn btn-outline">
              Next: Maintenance & Updates
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}