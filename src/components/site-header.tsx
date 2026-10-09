"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ArrowDownToLine, Menu, Moon, Sun, X, Search } from "lucide-react";
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

function SearchPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  function handleClickOutside(e: MouseEvent) {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const searchResults = [
    { title: "Why Aloha Social", href: "/why", description: "30 reasons it is special" },
    { title: "Features", href: "/features", description: "Explore all features in detail" },
    { title: "Get started", href: "/get-started", description: "Find a server and create an account" },
    { title: "How Aloha protects you", href: "/protect", description: "Safety, privacy and moderation tools" },
    { title: "Privacy in Aloha Social", href: "/privacy", description: "What is stored and what leaves your server" },
    { title: "Rules for using Aloha", href: "/rules", description: "Community guidelines and moderation" },
    { title: "Documentation", href: "/docs", description: "Guides for users, admins and developers" },
    { title: "Installation guide", href: "/install", description: "Set up Aloha Social on your Aloha" },
    { title: "Find a server", href: "/servers", description: "Browse public Aloha Social servers" },
    { title: "Apps and downloads", href: "/clients", description: "Web, mobile and desktop apps" },
    { title: "ActivityPub federation", href: "/activitypub", description: "How servers talk to each other" },
    { title: "Administration overview", href: "/admins", description: "A short tour for server admins" },
    { title: "Developer hub", href: "/developers", description: "API, architecture and source code" },
  ];

  const filteredResults = query
    ? searchResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchResults.slice(0, 8);

  return (
    <div className="relative" ref={popupRef}>
      <button
        type="button"
        aria-label="Search (⌘K)"
        title="Search (⌘K)"
        onClick={() => setIsOpen(true)}
        className="grid size-9 place-items-center rounded-full border border-line bg-surface/70 text-muted transition hover:border-coral hover:text-coral"
      >
        <Search className="size-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-96 max-h-[60vh] overflow-hidden rounded-2xl border border-line bg-canvas shadow-xl backdrop-blur-xl"
          role="dialog"
          aria-label="Search"
        >
          <div className="p-4">
            <label htmlFor="header-search" className="sr-only">
              Search
            </label>
            <input
              ref={inputRef}
              id="header-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsOpen(false);
              }}
              placeholder="Search… (⌘K to open)"
              className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
              autoComplete="off"
            />
          </div>
          <div className="border-t border-line max-h-[40vh] overflow-y-auto">
            {filteredResults.length > 0 ? (
              <ul className="py-2" role="listbox">
                {filteredResults.map((result) => (
                  <li key={result.href}>
                    <Link
                      href={result.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-ink transition hover:bg-surface-2"
                      role="option"
                    >
                      <span className="font-medium">{result.title}</span>
                      <span className="text-[12.5px] text-muted">{result.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-6 text-center text-[14px] text-muted">
                No results for "{query}"
              </p>
            )}
          </div>
          <div className="px-4 py-2 border-t border-line text-right">
            <kbd className="inline-flex items-center gap-1 rounded border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted">
              <kbd className="text-coral">⌘</kbd> K
            </kbd>
          </div>
        </div>
      )}
    </div>
  );
}

const NAV_LINKS = [
  { label: "Why Aloha", href: "/why" },
  { label: "Features", href: "/features" },
  { label: "Documentation", href: "/docs" },
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

          <nav aria-label="Main navigation" className="ml-auto hidden items-center gap-1 md:flex">
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
            <SearchPopup />
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
              className="grid size-9 place-items-center rounded-full border border-line bg-surface/70 text-ink md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <div
          aria-hidden={!open}
          inert={!open}
          className={`overflow-hidden border-t border-line transition-[max-height,opacity] duration-300 md:hidden ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8 lg:px-12">
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