import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./logo";
import { Container } from "./ui";
import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Why Aloha", href: "/why" },
  { label: "Features", href: "/features" },
  { label: "Get started", href: "/get-started" },
  { label: "Find a server", href: "/servers" },
  { label: "Documentation", href: "/docs" },
  { label: "About us", href: "/about" },
  { label: "Imprint", href: "/imprint" },
  { label: "Privacy", href: "/privacy" },
];

export function SiteFooter() {
  return (
    <footer className="bg-deepsea text-sand">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo height={32} onDark />
            <p className="text-[14px] text-sand/75">
              Aloha Social — Open source, federated, self-hosted
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
            {LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-[13.5px] text-sand/75 hover:text-white transition">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[12.5px] text-sand/60">
            <p>© 2026 Aloha Social contributors. AGPL-3.0-or-later.</p>
            <a
              href={SITE.server}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition"
            >
              Source on GitHub
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}