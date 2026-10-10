"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchPopup() {
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
    { title: "Well-being in Aloha", href: "/wellbeing", description: "Research behind the design" },
    { title: "Aloha Directory", href: "/directory", description: "Discover servers, find people, starter packs" },
    { title: "Documentation", href: "/docs", description: "Guides for users, admins and developers" },
    { title: "Installation guide", href: "/install", description: "Set up Aloha Social on your server" },
    { title: "Find a server", href: "/servers", description: "Browse public Aloha Social servers" },
    { title: "Apps and downloads", href: "/clients", description: "Web, mobile and desktop apps" },
    { title: "ActivityPub federation", href: "/activitypub", description: "How servers talk to each other" },
    { title: "Administration overview", href: "/admins", description: "A short tour for server admins" },
    { title: "Developer hub", href: "/developers", description: "API, architecture and source code" },
    { title: "About us", href: "/about", description: "Who builds Aloha Social" },
    { title: "Built into your workspace", href: "/nextcloud", description: "Why it runs in your workspace" },
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
                No results for “{query}”
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