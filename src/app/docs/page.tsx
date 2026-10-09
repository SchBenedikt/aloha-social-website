import type { Metadata } from "next";
import { DocsContent } from "./docs-content";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Native Aloha Social user, administrator, API, compatibility and architecture guides, with links to their GitHub sources.",
  alternates: { canonical: "/docs" },
};

export default function DocsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Guides, not just repository links."
        lede="Start with the on-site overview. Each guide also points to its upstream GitHub document for full, version-specific details."
      />
      <DocsContent />
    </>
  );
}