"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Wrench, Code, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui";
import { NATIVE_DOCS, type NativeDocSlug } from "@/lib/native-docs";
import { SITE } from "@/lib/site";

const DOCS_SECTIONS = [
  {
    id: "user",
    icon: BookOpen,
    title: "User Documentation",
    description: "Guides for people using Aloha Social — from finding a server to publishing posts and managing your account.",
    items: [
      { slug: "user", label: "User Guide", description: "Complete guide to using Aloha Social — posting, following, timelines, and account settings." },
      { slug: "getting-started", label: "Getting Started", description: "Find a server, create an account, and make your first post." },
      { slug: "moving", label: "Moving Accounts", description: "Migrate from Mastodon, Pixelfed, or other ActivityPub services." },
      { slug: "servers", label: "Find a Server", description: "Browse public Aloha Social instances and choose one to join." },
      { slug: "clients", label: "Mobile & Desktop Apps", description: "Official and third-party clients for iOS, Android, and desktop." },
    ],
  },
  {
    id: "admin",
    icon: Wrench,
    title: "Administrator Documentation",
    description: "Setup, configuration and day-to-day operations for running an Aloha Social server.",
    items: [
      { slug: "install", label: "Installation Guide", description: "Step-by-step setup: requirements, App Store, source build, verification." },
      { slug: "admin", label: "Admin Guide", description: "Complete administrator manual: moderation, federation, users, retention." },
      { slug: "occ", label: "OCC Commands", description: "Command-line tools for maintenance, queue management, and troubleshooting." },
      { slug: "mastodon", label: "Mastodon Compatibility", description: "Client API compatibility matrix and known limitations." },
      { slug: "maintenance", label: "Maintenance & Updates", description: "Upgrading, backups, monitoring, and disaster recovery." },
      { slug: "configuration", label: "Configuration Reference", description: "All config options: occ, config.php, environment variables." },
    ],
  },
  {
    id: "developer",
    icon: Code,
    title: "Developer Documentation",
    description: "API reference, protocol details and architecture for building with or extending Aloha Social.",
    items: [
      { slug: "api", label: "API Reference", description: "Mastodon-compatible client API and ActivityPub federation endpoints." },
      { slug: "architecture", label: "Architecture", description: "System design: actors, queues, storage, federation flow." },
      { slug: "protocol", label: "Protocol Docs", description: "ActivityPub implementation details and extensions." },
      { slug: "federation", label: "Federation Guide", description: "Server-to-server communication, delivery, and retries." },
      { slug: "operations", label: "Operations", description: "Deployment, scaling, monitoring, and CI/CD." },
      { slug: "contributing", label: "Contributing", description: "Code style, PR process, testing, and release workflow." },
    ],
  },
] as const;

const GENERAL_DOCS = [
  { slug: "atproto", label: "AT Protocol / Bluesky Status", description: "Current state of AT Protocol integration — design spec, not implemented." },
  { slug: "federation", label: "ActivityPub Federation", description: "How federation works, what federates, and compatibility notes." },
  { slug: "mastodon", label: "Mastodon Compatibility Deep-dive", description: "Detailed API coverage, gaps, and version-specific notes." },
] as const;

const SECTION_INFO = {
  user: { icon: BookOpen, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", gradient: "from-emerald-500 to-teal-500" },
  admin: { icon: Wrench, color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", gradient: "from-amber-500 to-orange-500" },
  developer: { icon: Code, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400", gradient: "from-cyan-500 to-blue-500" },
} as const;

export function DocsContent() {
  const [activeSection, setActiveSection] = useState<"user" | "admin" | "developer">("user");

  const section = DOCS_SECTIONS.find(s => s.id === activeSection)!;
  const info = SECTION_INFO[activeSection];
  const Icon = info.icon;

  return (
    <>
      {/* Section Tabs */}
      <section className="py-6 border-b border-line">
        <Container>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Documentation sections">
            {DOCS_SECTIONS.map((s) => {
              const sInfo = SECTION_INFO[s.id as keyof typeof SECTION_INFO];
              const SIcon = sInfo.icon;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={activeSection === s.id}
                  aria-controls={`panel-${s.id}`}
                  id={`tab-${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeSection === s.id
                      ? "bg-canvas shadow-sm border border-coral/20 text-ink-strong"
                      : "text-muted hover:text-ink hover:bg-surface-2"
                  }`}
                >
                  <SIcon className="size-4" aria-hidden="true" />
                  {s.title}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Active Section Content */}
      <section id={`panel-${activeSection}`} role="tabpanel" aria-labelledby={`tab-${activeSection}`} className="py-12 sm:py-16">
        <Container>
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className={`grid size-14 place-items-center rounded-2xl ${info.color}`}>
                <Icon className="size-7" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-[2rem] leading-tight font-semibold text-ink-strong">{section.title}</h2>
                <p className="mt-1 text-[15.5px] leading-relaxed text-muted">{section.description}</p>
              </div>
            </div>
            <a
              href={SITE.docSources[NATIVE_DOCS[section.items[0].slug as NativeDocSlug]?.source || "user"]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-muted hover:text-ink-strong"
            >
              All GitHub sources
              <ExternalLink className="size-4" />
            </a>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item, index) => (
              <article
                key={item.slug}
                className="group card card-hover flex flex-col p-6 sm:p-8 transition-all duration-200 hover:shadow-lg"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className={`flex items-center gap-3 rounded-xl p-3 ${info.color}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className={`shrink-0 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-medium ${info.color}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-[1.25rem] leading-tight font-semibold text-ink-strong group-hover:text-coral transition-colors">
                  {item.label}
                </h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">{item.description}</p>

                <div className="mt-auto pt-4 border-t border-line">
                  <Link
                    href={`/docs/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-coral hover:underline transition-colors"
                  >
                    Read guide
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* General Documentation */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="eyebrow">Reference Documentation</span>
            <h2 className="mt-4 text-[2rem] leading-tight font-semibold text-ink-strong sm:text-[2.5rem]">
              Protocol & Compatibility References
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Technical specifications and compatibility matrices for protocol implementers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GENERAL_DOCS.map((item, index) => (
              <Link
                key={item.slug}
                href={`/docs/${item.slug}`}
                className="group card card-hover p-6 sm:p-8 text-left"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 grid size-12 place-items-center rounded-xl bg-coral-soft text-coral">
                    <ExternalLink className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[1.25rem] leading-tight font-semibold text-ink-strong group-hover:text-coral transition-colors">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{item.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-line">
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-coral">
                    Open reference
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}