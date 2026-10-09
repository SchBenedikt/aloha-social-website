import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { SITE_PAGE_BY_PATH, type SitePage } from "@/generated/pages";

export function staticPageMetadata(path: string): Metadata {
  const page = SITE_PAGE_BY_PATH[path];
  if (!page) return { title: "Documentation" };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { title: page.title, description: page.description },
  };
}

export function StaticMarkdownPage({ path }: { path: string }) {
  const page = SITE_PAGE_BY_PATH[path];
  if (!page) return null;

  return (
    <>
      <PageHeader eyebrow="Aloha Social" title={page.title} lede={page.description} />

      <section className="py-10 sm:py-14">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
          <article className="md-prose min-w-0 max-w-3xl">
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
          </article>

          <aside className="space-y-5">
            {page.toc.length > 1 ? (
              <nav aria-label="On this page" className="card p-5 sm:p-6">
                <p className="eyebrow">On this page</p>
                <ul className="mt-3 space-y-1.5">
                  {page.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block text-[13.5px] leading-snug text-muted transition hover:text-coral ${
                          item.level === 3 ? "pl-3" : ""
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <nav aria-label="Related reading" className="card p-5 sm:p-6">
              <p className="eyebrow">Keep reading</p>
              <ul className="mt-3 space-y-2 text-[14px]">
                <li>
                  <Link href="/docs" className="inline-flex items-center gap-1.5 font-semibold text-coral">
                    <BookOpen className="size-3.5" aria-hidden="true" />
                    All documentation
                  </Link>
                </li>
                <li>
                  <Link href="/docs/user" className="inline-flex items-center gap-1.5 text-muted transition hover:text-coral">
                    User guide
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link href="/docs/admin" className="inline-flex items-center gap-1.5 text-muted transition hover:text-coral">
                    Administration guide
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link href="/why" className="inline-flex items-center gap-1.5 text-muted transition hover:text-coral">
                    Why Aloha Social
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </Container>
      </section>
    </>
  );
}

export function hasStaticPage(path: string): boolean {
  return Boolean(SITE_PAGE_BY_PATH[path]);
}

export type { SitePage };
