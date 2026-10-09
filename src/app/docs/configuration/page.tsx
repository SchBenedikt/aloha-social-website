import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wrench, FileCode, Terminal, Server } from "lucide-react";
import { Container, PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Configuration Reference",
  description: "Complete configuration options for Aloha Social: occ commands, config.php settings, environment variables, and server requirements.",
  alternates: { canonical: "/docs/configuration" },
};

const CONFIG_SECTIONS = [
  {
    icon: Wrench,
    title: "OCC Commands",
    description: "Runtime configuration via command line.",
    items: [
      { key: "social:cloud_url", desc: "Public URL for federation (set once, rarely changed)", example: "occ config:app:set social &lt;key&gt;cloud_url=https://social.example.com" },
      { key: "social:media_max_size", desc: "Max upload size in bytes (default: 2GB)", example: "occ config:app:set social &lt;key&gt;media_max_size=2147483648" },
      { key: "social:media_ffmpeg_path", desc: "Path to ffmpeg binary for video transcoding", example: "occ config:app:set social &lt;key&gt;media_ffmpeg_path=/usr/bin/ffmpeg" },
      { key: "social:push_enabled", desc: "Enable WebPush for notifications", example: "occ config:app:set social &lt;key&gt;push_enabled=true" },
      { key: "social:worker_concurrency", desc: "Number of parallel delivery workers", example: "occ config:app:set social &lt;key&gt;worker_concurrency=4" },
    ],
  },
  {
    icon: FileCode,
    title: "config.php Settings",
    description: "Persistent configuration in host platform's config.php.",
    items: [
      { key: "overwrite.cli.url", desc: "Base URL for CLI-generated URLs (critical for federation)", example: "'overwrite.cli.url' => 'https://social.example.com'," },
      { key: "memcache.local", desc: "Local memory cache (APCu recommended)", example: "'memcache.local' => '\\OC\\Memcache\\APCu'," },
      { key: "memcache.distributed", desc: "Distributed cache for multi-server (Redis)", example: "'memcache.distributed' => '\\OC\\Memcache\\Redis'," },
      { key: "redis", desc: "Redis connection for distributed cache/locking", example: "'redis' => ['host' => 'localhost', 'port' => 6379]," },
      { key: "activitypub.enabled", desc: "Enable/disable ActivityPub federation", example: "'activitypub.enabled' => true," },
    ],
  },
  {
    icon: Terminal,
    title: "Environment Variables",
    description: "Container/deployment-time configuration.",
    items: [
      { key: "SOCIAL_MEDIA_MAX_SIZE", desc: "Override media upload limit", example: "SOCIAL_MEDIA_MAX_SIZE=1073741824" },
      { key: "SOCIAL_FFMPEG_PATH", desc: "ffmpeg binary location", example: "SOCIAL_FFMPEG_PATH=/usr/bin/ffmpeg" },
      { key: "SOCIAL_PUSH_VAPID_PUBLIC", desc: "VAPID public key for WebPush", example: "SOCIAL_PUSH_VAPID_PUBLIC=BJ..." },
      { key: "SOCIAL_PUSH_VAPID_PRIVATE", desc: "VAPID private key for WebPush", example: "SOCIAL_PUSH_VAPID_PRIVATE=secret" },
      { key: "SOCIAL_WORKER_CONCURRENCY", desc: "Delivery worker concurrency", example: "SOCIAL_WORKER_CONCURRENCY=4" },
    ],
  },
  {
    icon: Server,
    title: "Server Requirements",
    description: "Host platform and system prerequisites.",
    items: [
      { key: "PHP", desc: "PHP 8.2+ with required extensions", example: "php, php-xml, php-mbstring, php-curl, php-gd, php-intl, php-gmp, php-bcmath, php-zip, php-apcu, php-redis" },
      { key: "Database", desc: "PostgreSQL 14+ or MySQL 8.0+ / MariaDB 10.6+", example: "PostgreSQL recommended for ActivityPub performance" },
      { key: "Web Server", desc: "Apache 2.4+ or Nginx 1.18+ with mod_rewrite", example: "Nginx + PHP-FPM recommended for performance" },
      { key: "Background Jobs", desc: "systemd timers or cron for scheduled tasks", example: "systemd preferred for reliability and logging" },
      { key: "ffmpeg", desc: "Required for video transcoding (optional but recommended)", example: "ffmpeg 5.0+ with libx264, libvpx, libopus" },
    ],
  },
] as const;

export default function ConfigurationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Administrator Documentation"
        title="Configuration Reference"
        lede="All configuration options for Aloha Social. Settings are managed via OCC commands, config.php, or environment variables depending on the deployment method."
      />

      <section className="py-12 sm:py-16">
        <Container>
          {CONFIG_SECTIONS.map((section) => (
            <section key={section.title} className="mb-16">
              <SectionHeading
                eyebrow="Configuration"
                title={section.title}
                lede={section.description}
              />
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[50rem] border-collapse">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="w-64 py-3 px-4 text-left font-semibold text-ink-strong">Setting</th>
                      <th scope="col" className="py-3 px-4 text-left text-muted">Description</th>
                      <th scope="col" className="py-3 px-4 text-left font-mono text-[13px] text-muted">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item) => (
                      <tr key={item.key} className="border-b border-line/50 hover:bg-surface-2/50">
                        <td className="py-3 px-4 font-mono text-[13.5px] text-ink-strong">{item.key}</td>
                        <td className="py-3 px-4 text-[14.5px] text-muted">{item.desc}</td>
                        <td className="py-3 px-4 font-mono text-[12.5px] text-coral">{item.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

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
              Use <code className="font-mono bg-surface-2 px-1.5 py-0.5 rounded">occ config:app:get social &lt;key&gt;</code> to see the effective value.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/docs/occ" className="btn btn-outline">
              <ArrowLeft className="size-4" />
              OCC Commands Reference
            </Link>
            <Link href="/docs/admin" className="btn btn-primary">
              Back to Admin Documentation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}