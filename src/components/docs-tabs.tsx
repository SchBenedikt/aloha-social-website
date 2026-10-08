import Link from "next/link";
import { Container } from "@/components/ui";

const CHAPTERS = [
  { href: "/developers/docs/protocol", label: "01 Protocol" },
  { href: "/developers/docs/federation", label: "02 Federation" },
  { href: "/developers/docs/api", label: "03 API" },
  { href: "/developers/docs/operations", label: "04 Operations" },
] as const;

export function DocsTabs({ active }: { active: string }) {
  return (
    <div className="border-b border-line bg-surface">
      <Container className="flex flex-wrap items-center gap-x-5 gap-y-3 py-3.5">
        <Link
          href="/developers/docs"
          className="text-[13px] font-semibold tracking-[0.1em] text-muted uppercase transition hover:text-ink"
        >
          Dev docs
        </Link>

        <nav className="segmented" aria-label="Developer docs">
          {CHAPTERS.map((chapter) => (
            <Link
              key={chapter.href}
              href={chapter.href}
              aria-current={chapter.href === active ? "page" : undefined}
              className={chapter.href === active ? "is-active" : undefined}
            >
              {chapter.label}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}
