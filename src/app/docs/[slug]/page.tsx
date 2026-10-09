import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { DocsSidebar, DocsToc } from "@/components/docs-nav";
import { DOC_GROUPS, DOC_PAGES, getDocBySlug } from "@/generated/docs";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return DOC_PAGES.filter((page) => !page.manual && page.path.startsWith("/docs/")).map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getDocBySlug(slug);
  if (!page || page.manual) return { title: "Documentation" };
  const group = DOC_GROUPS.find((entry) => entry.id === page.group);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { title: page.title, description: page.description },
    keywords: [group?.title ?? "documentation", "Aloha Social", page.title],
  };
}

type SectionLink = { path: string; title: string; description: string; parent: boolean };

function sectionGroups(sections: SectionLink[]) {
  const groups: {
    path: string;
    title: string;
    description: string;
    children: { path: string; title: string }[];
  }[] = [];
  for (const section of sections) {
    const last = groups.at(-1);
    if (section.parent && last) {
      last.children.push({ path: section.path, title: section.title });
    } else {
      groups.push({
        path: section.path,
        title: section.title,
        description: section.description,
        children: [],
      });
    }
  }
  return groups;
}

function InThisSection({ sections }: { sections: SectionLink[] }) {
  const groups = sectionGroups(sections);
  const withDescriptions = groups.length <= 12;

  return (
    <section className="mt-12 max-w-3xl" aria-labelledby="in-this-section">
      <h2
        id="in-this-section"
        className="flex items-center gap-2 text-[1.35rem] font-semibold text-ink-strong"
      >
        <Layers className="size-5 text-coral" aria-hidden="true" />
        In this section
      </h2>
      <ul className="mt-4 grid gap-x-8 gap-y-4 border-t border-line pt-4 sm:grid-cols-2">
        {groups.map((group) => (
          <li key={group.path}>
            <Link
              href={group.path}
              className="group flex flex-col gap-1 text-[15px] font-medium text-ink-strong transition hover:text-coral"
            >
              <span className="flex items-center gap-2">
                {group.title}
                <ArrowRight className="size-4 text-coral opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </span>
              {withDescriptions && group.description ? (
                <p className="mt-0.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
                  {group.description}
                </p>
              ) : null}
              {group.children.length > 0 ? (
                <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  {group.children.map((child) => (
                    <li key={child.path}>
                      <Link
                        href={child.path}
                        className="text-[13px] text-muted transition hover:text-coral underline-offset-2 hover:underline"
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function DocPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const page = getDocBySlug(slug);
  if (!page || page.manual || !page.path.startsWith("/docs/")) notFound();

  const group = DOC_GROUPS.find((entry) => entry.id === page.group);

  return (
    <>
      <PageHeader
        eyebrow={group?.title ?? "Documentation"}
        title={page.title}
        lede={page.description}
        compact
      />

      <section className="py-9 sm:py-11">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
          <div className="min-w-0">
            <article className="md-prose max-w-3xl">
              {page.anchor ? (
                <span id={page.anchor} className="block h-0 scroll-mt-28" aria-hidden="true" />
              ) : null}
              <div dangerouslySetInnerHTML={{ __html: page.html }} />
            </article>

            {page.sections && page.sections.length > 0 ? (
              <InThisSection sections={page.sections} />
            ) : null}

            <nav
              aria-label="Documentation pagination"
              className="mt-12 flex max-w-3xl flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
            >
              {page.prev ? (
                <Link
                  href={page.prev.path}
                  className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-muted transition hover:text-coral"
                >
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  {page.prev.title}
                </Link>
              ) : (
                <span />
              )}
              {page.next ? (
                <Link
                  href={page.next.path}
                  className="group inline-flex items-center gap-2 text-right text-[14.5px] font-semibold text-muted transition hover:text-coral"
                >
                  {page.next.title}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ) : (
                <span />
              )}
            </nav>

            {page.source ? (
              <p className="mt-6 max-w-3xl text-[13px] text-muted">
                This page is published from the project’s own documentation.{" "}
                <a
                  href={page.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-coral hover:underline"
                >
                  Read the source on GitHub
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </p>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pb-4">
            <DocsToc toc={page.toc} />
            <DocsSidebar current={page} source={page.source} />
          </aside>
        </Container>
      </section>
    </>
  );
}
