"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowDownToLine, Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "./logo";
import dynamic from "next/dynamic";

const SearchPopup = dynamic(() => import("./search-popup").then((mod) => mod.default), { ssr: false });

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