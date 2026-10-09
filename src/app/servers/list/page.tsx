import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Globe2 } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { REGISTRATION_LABEL, SERVERS } from "@/lib/servers";

export const metadata: Metadata = {
  title: "Server list",
  description:
    "Browse the public Aloha Social server directory and compare operator-published registration, language and community details.",
  alternates: { canonical: "/servers/list" },
};

export default function ServerListPage() {
  return (
    <>
      <PageHeader
        eyebrow="Server directory"
        title="The Aloha Social server list."
        lede="Browse servers whose operators have asked to be listed. Details and counts are operator-published; check a server’s own policies before joining."
        actions={
          <Link href="/servers" className="btn btn-outline">
            <ArrowLeft className="size-4" />
            Back to finding a server
          </Link>
        }
      />

      <section className="py-12 sm:py-16">
        <Container>
          {SERVERS.length > 0 ? (
            <ul className="grid gap-5 lg:grid-cols-2">
              {SERVERS.map((server) => (
                <li key={server.id} className="card flex flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-[1.5rem] leading-tight text-ink-strong">
                        {server.name}
                      </h2>
                      <p className="mt-1 font-mono text-sm text-coral">{server.domain}</p>
                    </div>
                    <span className="pill">
                      {REGISTRATION_LABEL[server.registration]} registration
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {server.tagline}
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
                    <div>
                      <dt className="text-xs text-muted">Region</dt>
                      <dd className="mt-1 text-sm text-ink-strong">{server.region}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Languages</dt>
                      <dd className="mt-1 text-sm text-ink-strong">{server.languages.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Community focus</dt>
                      <dd className="mt-1 text-sm text-ink-strong">{server.focus}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Moderation</dt>
                      <dd className="mt-1 text-sm text-ink-strong">{server.moderation}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Run by</dt>
                      <dd className="mt-1 text-sm text-ink-strong">{server.admin}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Information checked</dt>
                      <dd className="mt-1 text-sm text-ink-strong">{server.countedOn}</dd>
                    </div>
                  </dl>
                  {server.url ? (
                    <a
                      href={server.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-coral hover:underline"
                    >
                      Visit server <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <Globe2 className="size-6 text-coral" aria-hidden="true" />
              <h2 className="mt-4 text-[1.5rem] text-ink-strong">
                No public server listings yet.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                This list will show servers when their operators submit and verify
                the details. We do not invent listings, scan servers or collect
                account counts automatically. For now, ask your organisation or
                community whether it runs Aloha Social, or learn how to run your own.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/servers#how" className="btn btn-primary">
                  How to find a server
                </Link>
                <Link href="/install" className="btn btn-outline">
                  Installation guide
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
