import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./logo";
import { Container } from "./ui";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Why Aloha", href: "/why" },
      { label: "Features", href: "/features" },
      { label: "Get started", href: "/get-started" },
      { label: "Find a server", href: "/servers" },
      { label: "Apps & downloads", href: "/clients" },
    ],
  },
  {
    heading: "Safety & Privacy",
    links: [
      { label: "How it protects you", href: "/protect" },
      { label: "Privacy at a glance", href: "/privacy" },
      { label: "Rules & guidelines", href: "/rules" },
      { label: "Well-being", href: "/wellbeing" },
    ],
  },
  {
    heading: "Documentation",
    links: [
      { label: "User guide", href: "/docs/user" },
      { label: "Admin guide", href: "/docs/admin" },
      { label: "Installation", href: "/install" },
      { label: "Mastodon compatibility", href: "/docs/mastodon" },
    ],
  },
  {
    heading: "Project",
    links: [
      { label: "About us", href: "/about" },
      { label: "Why Nextcloud", href: "/nextcloud" },
      { label: "Admin responsibilities", href: "/admin-responsibilities" },
      { label: "Imprint", href: "/imprint" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-deepsea text-sand">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="font-brand text-sm font-medium text-sand tracking-wide uppercase mb-4">
                {column.heading}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] leading-relaxed text-sand/75 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-sand/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo height={28} onDark />
            <p className="text-[13.5px] text-sand/75">
              Aloha Social — Open source, federated, self-hosted
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-[13px] text-sand/60">
            <Link href={SITE.server} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              Source on GitHub
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </Link>
            <span>·</span>
            <span>AGPL-3.0-or-later</span>
            <span>·</span>
            <span>© 2026 Aloha Social contributors</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}