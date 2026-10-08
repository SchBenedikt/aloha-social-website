"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ArrowDownToLine, Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";

function ThemeSwitch() {
  return (
    <button
      type="button"
      aria-label="Switch colour theme"
      title="Switch colour theme"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {
          /* storage may be unavailable */
        }
      }}
      className="grid size-9 place-items-center rounded-full border border-line bg-surface/70 text-muted transition hover:border-coral hover:text-coral"
    >
      <Moon className="size-4 block dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}

const DOCS_NAV = [
  {
    label: "User Documentation",
    items: [
      { label: "Getting Started", href: "/get-started", description: "Find a server or set up your own" },
      { label: "User Guide", href: "/docs/user", description: "Complete guide to using Aloha Social" },
      { label: "Find a Server", href: "/servers", description: "Browse public Aloha Social instances" },
      { label: "Moving Accounts", href: "/docs/moving", description: "Migrate from another service" },
      { label: "Client Apps", href: "/clients", description: "Mobile and desktop applications" },
    ],
  },
  {
    label: "Administrator Documentation",
    items: [
      { label: "Installation Guide", href: "/install", description: "Install and configure Aloha Social" },
      { label: "Admin Overview", href: "/admins", description: "Administration panel overview" },
      { label: "Admin Guide", href: "/docs/admin", description: "Complete administrator manual" },
      { label: "OCC Commands", href: "/docs/occ", description: "Command-line management tools" },
      { label: "Mastodon Compatibility", href: "/docs/mastodon", description: "Client API compatibility matrix" },
    ],
  },
  {
    label: "Developer Documentation",
    items: [
      { label: "API Reference", href: "/developers/docs/api", description: "Client and federation APIs" },
      { label: "Protocol Docs", href: "/developers/docs/protocol", description: "ActivityPub implementation" },
      { label: "Federation", href: "/developers/docs/federation", description: "Server-to-server communication" },
      { label: "Operations", href: "/developers/docs/operations", description: "Deployment and maintenance" },
      { label: "Architecture", href: "/docs/architecture", description: "System architecture overview" },
    ],
  },
] as const;

const FEATURES_NAV = [
  { label: "Write & Share", href: "/features/write", description: "Compose posts with audience controls" },
  { label: "Read Feeds", href: "/features/read", description: "Home, local, and federated timelines" },
  { label: "Conversations", href: "/features/converse", description: "Threaded replies and reactions" },
  { label: "Discover", href: "/features/discover", description: "Search, trends, and starter packs" },
  { label: "Profiles", href: "/features/profile", description: "Verified links, collections, teams" },
  { label: "Safety & Privacy", href: "/features/safety", description: "Blocks, filters, notifications" },
  { label: "All Features", href: "/features", description: "Complete feature overview" },
] as const;

function Dropdown({ trigger, children, align = "left" }: { trigger: React.ReactNode; children: React.ReactNode; align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors hover:text-coral"
      >
        {trigger}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-2 w-72 rounded-2xl border border-line bg-canvas/95 backdrop-blur-xl shadow-lg overflow-hidden ${align === "right" ? "right-0" : "left-0"}`}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function DocsDropdown() {
  return (
    <Dropdown trigger="Documentation" align="left">
      <nav className="p-3" aria-label="Documentation">
        {DOCS_NAV.map((section) => (
          <div key={section.label} className="mb-4 last:mb-0">
            <h3 className="px-3 py-2 font-mono text-[10px] tracking-widest uppercase text-muted">
              {section.label}
            </h3>
            <ul className="space-y-1" role="none">
              {section.items.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    onClick={() => (document.querySelector('[aria-haspopup="true"]') as HTMLElement)?.click()}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors hover:bg-surface-2"
                    role="menuitem"
                  >
                    <span className="font-medium text-ink-strong">{item.label}</span>
                    <span className="text-[12px] text-muted hidden sm:block">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </Dropdown>
  );
}

function FeaturesDropdown() {
  return (
    <Dropdown trigger="Features" align="left">
      <nav className="p-3" aria-label="Features">
        <ul className="space-y-1" role="none">
          {FEATURES_NAV.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                onClick={() => (document.querySelector('[aria-haspopup="true"]') as HTMLElement)?.click()}
                className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors hover:bg-surface-2"
                role="menuitem"
              >
                <span className="font-medium text-ink-strong">{item.label}</span>
                <span className="text-[12px] text-muted hidden sm:block">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Dropdown>
  );
}

const NAV_LINKS = [
  { label: "Get started", href: "/get-started" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-line bg-canvas/90 backdrop-blur-xl"
            : "border-b border-transparent bg-canvas/85 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-8xl items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Aloha Social — home"
            onClick={() => setOpen(false)}
            className="shrink-0"
          >
            <Logo priority />
          </Link>

          <nav aria-label="Main navigation" className="ml-auto hidden items-center gap-1 sm:flex">
            <FeaturesDropdown />
            <DocsDropdown />
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-coral"
                    : "text-ink/75 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:ml-0">
            <ThemeSwitch />
            <Link
              href="/clients"
              aria-label="Apps and downloads"
              title="Apps and downloads"
              className="btn-primary inline-flex h-9 items-center justify-center gap-2 rounded-full px-3 text-[13.5px] font-semibold transition sm:px-4"
            >
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Apps & downloads</span>
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="mobile-navigation"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="grid size-9 place-items-center rounded-full border border-line bg-surface/70 text-ink sm:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <div
          aria-hidden={!open}
          inert={!open}
          className={`overflow-hidden border-t border-line transition-[max-height,opacity] duration-300 sm:hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mx-auto flex max-w-8xl flex-col gap-1 px-5 py-4 sm:px-8 lg:px-12">
            <FeaturesDropdown />
            <DocsDropdown />
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-3 text-[15px] font-medium transition ${isActive(item.href) ? "bg-coral-soft text-coral" : "text-ink hover:bg-surface-2"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}