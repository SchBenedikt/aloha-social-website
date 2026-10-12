"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CornerDownLeft, Search, X } from "lucide-react";
import { groupResults, search } from "@/lib/search";

/** Marks the part of the label that matched the query. */
function highlight(label: string, query: string) {
  const token = query.trim().split(/\s+/)[0]?.toLowerCase();
  if (!token) return label;
  const at = label.toLowerCase().indexOf(token);
  if (at === -1) return label;
  return (
    <>
      {label.slice(0, at)}
      <mark className="rounded-sm bg-coral-soft px-0.5 text-coral">{label.slice(at, at + token.length)}</mark>
      {label.slice(at + token.length)}
    </>
  );
}

export default function SearchPopup() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const listId = useId();

  const results = useMemo(() => search(query), [query]);
  const groups = useMemo(() => groupResults(results), [results]);
  const starters = useMemo(() => search(""), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const open = useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  /* ⌘K / Ctrl+K anywhere, "/" when nobody is typing. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable === true;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => !value);
        return;
      }
      if (event.key === "/" && !typing) {
        event.preventDefault();
        open();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      restoreFocus.current?.focus?.();
    };
  }, [isOpen]);

  /* Keep the highlighted row in view while arrowing through. */
  useEffect(() => {
    if (!isOpen) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, isOpen]);

  const goTo = (path: string) => {
    close();
    router.push(path);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(results.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[active];
      if (target) goTo(target.path);
    }
  };

  /* Focus stays inside the dialog; Escape closes from anywhere in it. */
  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Search the site (Ctrl K)"
        title="Search (Ctrl K)"
        onClick={open}
        className="grid size-9 place-items-center rounded-full border border-line bg-surface/70 text-muted transition hover:border-coral hover:text-coral"
      >
        <Search className="size-4" />
      </button>

      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label="Search"
                onKeyDown={onDialogKeyDown}
                className="flex h-fit w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line bg-canvas shadow-2xl"
              >
                {/* ----------------------------------------------------- input */}
                <div className="flex items-center gap-3 border-b border-line px-4">
                  <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
                  <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActive(0);
                    }}
                    onKeyDown={onInputKeyDown}
                    placeholder="Search pages, features and documentation…"
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full bg-transparent py-4 text-[15.5px] text-ink placeholder:text-muted focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close search"
                    className="grid size-7 shrink-0 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-ink"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* ---------------------------------------------------- results */}
                <div
                  ref={listRef}
                  id={listId}
                  role="listbox"
                  aria-label="Search results"
                  className="max-h-[min(24rem,50vh)] overflow-y-auto py-2"
                >
                  {results.length ? (
                    groups.map((section) => (
                      <div key={section.key} role="group" aria-label={section.label}>
                        <p className="px-4 pt-3 pb-1.5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                          {section.label}
                        </p>
                        {section.items.map(({ result, index }) => (
                          <Link
                            key={result.path}
                            href={result.path}
                            id={`${listId}-${index}`}
                            data-index={index}
                            role="option"
                            aria-selected={index === active}
                            onClick={() => close()}
                            onMouseMove={() => setActive(index)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-[14.5px] transition ${
                              index === active ? "bg-coral-soft text-ink-strong" : "text-ink"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`mt-px grid size-5 shrink-0 place-items-center rounded-full font-mono text-[10px] ${
                                index === active ? "bg-coral text-white" : "bg-surface-2 text-muted"
                              }`}
                            >
                              {result.kind === "docs" ? "#" : "·"}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-semibold">
                                {highlight(result.title, query)}
                              </span>
                              <span className="block truncate text-[13px] text-muted">
                                {result.description}
                              </span>
                            </span>
                            {index === active ? (
                              <CornerDownLeft className="size-3.5 shrink-0 text-coral" aria-hidden="true" />
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className="px-6 py-10 text-center text-[14.5px] text-muted">
                      Nothing here matches “{query}”. Try a shorter word.
                    </p>
                  )}
                </div>

                {/* ----------------------------------------------------- footer */}
                <div className="flex items-center justify-between gap-4 border-t border-line bg-surface px-4 py-2.5 font-mono text-[11px] text-muted">
                  <span>
                    {query
                      ? `${results.length} result${results.length === 1 ? "" : "s"}`
                      : `${starters.length} pages to start with`}
                  </span>
                  <span className="flex items-center gap-3" aria-hidden="true">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5">↑</kbd>
                      <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5">↓</kbd>
                      navigate
                    </span>
                    <span className="hidden items-center gap-1 sm:flex">
                      <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5">↵</kbd>
                      open
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5">esc</kbd>
                      close
                    </span>
                  </span>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
