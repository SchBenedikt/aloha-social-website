"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowDownToLine, Menu, Moon, Sun, X, ChevronRight } from "lucide-react";
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
    label: "User",
    items: [
      { label: "Getting Started", href: "/get-started" },
      { label: "User Guide", href: "/docs/user" },
      { label: "Find a Server", href: "/servers" },
      { label: "Moving Accounts", href: "/docs/moving" },
      { label: "Client Apps", href: "/clients" },
    ],
  },
  {
    label: "Administrator",
    items: [
      { label: "Installation Guide", href: "/install" },
      { label: "Admin Overview", href: "/admins" },
      { label: "Admin Guide", href: "/docs/admin" },
      { label: "OCC Commands", href: "/docs/occ" },
      { label: "Mastodon Compatibility", href: "/docs/mastodon" },
    ],
  },
  {
    label: "Developer",
    items: [
      { label: "API Reference", href: "/developers/docs/api" },
      { label: "Protocol Docs", href: "/developers/docs/protocol" },
      { label: "Federation", href: "/developers/docs/federation" },
      { label: "Operations", href: "/developers/docs/operations" },
      { label: "Architecture", href: "/docs/architecture" },
    ],
  },
] as const;

const FEATURES_NAV = [
  { label: "Write & Share", href: "/features/write" },
  { label: "Read Feeds", href: "/features/read" },
  { label: "Conversations", href: "/features/converse" },
  { label: "Discover", href: "/features/discover" },
  { label: "Profiles", href: "/features/profile" },
  { label: "Safety & Privacy", href: "/features/safety" },
  { label: "All Features", href: "/features" },
] as const;

function Dropdown({ trigger, children, align = "left" }: { trigger: React.ReactNode; children: React.ReactNode | ((props: { close: () => void }) => React.ReactNode); align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
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
        <ChevronRight className={`size-4 transition-transform ${open ? "rotate-90" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-2 w-56 rounded-2xl border border-line bg-canvas/95 backdrop-blur-xl shadow-lg overflow-hidden ${align === "right" ? "right-0" : "left-0"}`}
          role="menu"
        >
          {typeof children === "function" ? children({ close }) : children}
        </div>
      )}
    </div>
  );
}

function SubMenu({ label, items, close }: { label: string; items: readonly { label: string; href: string }[]; close: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2.5 text-[14px] font-medium text-ink-strong transition-colors hover:text-coral"
      >
        {label}
        <ChevronRight className={`size-4 transition-transform ${open ? "rotate-90" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute left-full top-0 ml-1 z-50 w-56 rounded-2xl border border-line bg-canvas/95 backdrop-blur-xl shadow-lg overflow-hidden">
          <ul className="py-2" role="menu">
            {items.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  onClick={close}
                  className="block px-3 py-2 text-[14px] transition-colors hover:bg-surface-2"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DocsDropdown() {
  return (
    <Dropdown trigger="Documentation" align="left">
      {({ close }) => (
        <nav className="p-2" aria-label="Documentation">
          <ul className="space-y-1" role="menu">
            {DOCS_NAV.map((section) => (
              <li key={section.label} role="none">
                <SubMenu label={section.label} items={section.items} close={close} />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </Dropdown>
  );
}

function FeaturesDropdown() {
  return (
    <Dropdown trigger="Features" align="left">
      <nav className="p-2" aria-label="Features">
        <ul className="space-y-1" role="menu">
          {FEATURES_NAV.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                className="block px-3 py-2 text-[14px] font-medium text-ink-strong transition-colors hover:text-coral"
                role="menuitem"
              >
                {item.label}
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
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center gap-6 px-5 sm:px-8 lg:px-12">
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
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8 lg:px-12">
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