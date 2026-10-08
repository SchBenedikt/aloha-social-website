import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  AlertTriangle,
  Globe2,
  Inbox,
  Languages,
  Lock,
  Ruler,
} from "lucide-react";
import {
  CheckList,
  Container,
  CtaBand,
  PageHeader,
  SectionHeading,
} from "@/components/ui";
import {
  COMPARE_CRITERIA,
  DIRECTORY_COUNTED_ON,
  DIRECTORY_HAS_VERIFIED_DATA,
  REGISTRATION_LABEL,
  SERVERS,
} from "@/lib/servers";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servers",
  description:
    "A directory of public Aloha Social servers. No listings are currently verified; server profiles and dated, self-reported counts will appear here when available.",
  alternates: { canonical: "/servers" },
};

const number = new Intl.NumberFormat("en-US");

function formatCount(value: number | null) {
  if (value === null) return "unknown";
  if (value < 1000) return number.format(value);
  if (value < 10000) return `~${number.format(Math.round(value / 100) * 100)}`;
  return `~${number.format(Math.round(value / 1000) * 1000)}`;
}

export default function ServersPage() {
  const totalRegistered = SERVERS.reduce(
    (sum, server) => sum + (server.registered ?? 0),
    0,
  );
  const totalActive = SERVERS.reduce(
    (sum, server) => sum + (server.active ?? 0),
    0,
  );

  return (
    <>
      <PageHeader
        eyebrow="Directory"
        title="Find an Aloha Social server."
        lede="Aloha Social accounts belong to individual servers that set their own registration rules and community policies. This directory is maintained manually and has no verified public listings yet."
        actions={
          <>
            <a href="#directory" className="btn btn-primary">
              View listings
            </a>              <Link href="/install" className="btn btn-outline">
                Install Aloha Social
              </Link>
          </>
        }
      />

      {/* ------------------------------------------------- example banner */}
      {!DIRECTORY_HAS_VERIFIED_DATA ? (
        <section className="border-b border-line py-6">
          <Container>
            <div className="flex gap-4 rounded-2xl border border-coral/40 bg-coral-soft/60 p-5">
              <AlertTriangle
                className="mt-0.5 size-5 shrink-0 text-coral"
                strokeWidth={2}
                aria-hidden="true"
              />
              <div>
                <p className="text-[15px] font-semibold text-ink">
                  No verified public server listings yet.
                </p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                  This directory is maintained manually and does not fetch live
                  server data. Until listings can be verified, it shows no
                  server names or account counts. See the project repository for
                  how to suggest an entry.
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ------------------------------------------------------ at a glance */}
      <section className="border-b border-line py-8">
        <Container>
          <dl className="grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11.5px] tracking-widest text-muted uppercase">
                Public servers listed
              </dt>
              <dd className="font-brand mt-2 text-[2.4rem] leading-none font-semibold text-ink-strong">
                {number.format(SERVERS.length)}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11.5px] tracking-widest text-muted uppercase">
                Registered accounts, approximate
              </dt>
              <dd className="font-brand mt-2 text-[2.4rem] leading-none font-semibold text-coral">
                {DIRECTORY_HAS_VERIFIED_DATA ? formatCount(totalRegistered) : "Unavailable"}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11.5px] tracking-widest text-muted uppercase">
                Active this month, approximate
              </dt>
              <dd className="font-brand mt-2 text-[2.4rem] leading-none font-semibold text-ink-strong">
                {DIRECTORY_HAS_VERIFIED_DATA ? formatCount(totalActive) : "Unavailable"}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* --------------------------------------------------------- criteria */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How to compare"
            title="Four things worth looking at."
            lede="A directory is only useful if the columns mean something. These are the four that decide whether you will still be happy on a server in a year."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {[
              { icon: Inbox, ...COMPARE_CRITERIA[0] },
              { icon: Ruler, ...COMPARE_CRITERIA[1] },
              { icon: Lock, ...COMPARE_CRITERIA[2] },
              { icon: Languages, ...COMPARE_CRITERIA[3] },
            ].map(({ icon: Icon, label, body }) => (
              <div key={label} className="card p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-coral-soft text-coral">
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-[1.3rem] leading-tight text-ink-strong">
                  {label}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- table */}
      <section id="directory" className="sand border-y border-line py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
            eyebrow="Side by side"
            title="The comparison."
            lede="When listings are available, figures will be rounded, self-reported and dated — useful context, not an audit."
            />
            <span className="shrink-0 font-mono text-[12px] tracking-wide text-muted">
              {DIRECTORY_HAS_VERIFIED_DATA
                ? `Counts as of ${DIRECTORY_COUNTED_ON}`
                : "No verified counts"}
            </span>
          </div>

          <div className="mt-10 overflow-x-auto" data-reveal="">
            <table className="w-full min-w-[58rem] border-collapse text-left">
              <caption className="sr-only">Server details, account estimates, registration policy, region, languages and focus</caption>
              <thead>
                <tr className="text-[11.5px] font-semibold tracking-[0.14em] text-muted uppercase">
                  <th scope="col" className="border-b border-line-strong pb-3 pr-4">Server</th>
                  <th scope="col" className="border-b border-line-strong pb-3 pr-4 text-right">
                    Registered
                  </th>
                  <th scope="col" className="border-b border-line-strong pb-3 pr-4 text-right">
                    Active / month
                  </th>
                  <th scope="col" className="border-b border-line-strong pb-3 pr-4">
                    Registration
                  </th>
                  <th scope="col" className="border-b border-line-strong pb-3 pr-4">Region</th>
                  <th scope="col" className="border-b border-line-strong pb-3 pr-4">Language</th>
                  <th scope="col" className="border-b border-line-strong pb-3">Focus</th>
                </tr>
              </thead>
              <tbody>
                {SERVERS.length ? SERVERS.map((server) => (
                  <tr key={server.id} className="align-top">
                    <th scope="row" className="border-b border-line py-4 pr-4 text-left font-normal">
                      <span className="block text-[15px] font-semibold text-ink-strong">
                        {server.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[12.5px] text-muted">
                        {server.domain}
                      </span>
                    </th>
                    <td className="border-b border-line py-4 pr-4 text-right font-mono text-[14.5px]">
                      {formatCount(server.registered)}
                    </td>
                    <td className="border-b border-line py-4 pr-4 text-right font-mono text-[14.5px]">
                      {formatCount(server.active)}
                    </td>
                    <td className="border-b border-line py-4 pr-4">
                      <span className="inline-flex items-center rounded-full border border-line bg-canvas px-2.5 py-1 text-[12.5px] font-semibold">
                        {REGISTRATION_LABEL[server.registration]}
                      </span>
                    </td>
                    <td className="border-b border-line py-4 pr-4 text-[14.5px]">
                      {server.region}
                    </td>
                    <td className="border-b border-line py-4 pr-4 text-[14.5px]">
                      {server.languages.join(", ")}
                    </td>
                    <td className="border-b border-line py-4 text-[14.5px]">
                      {server.focus}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="border-b border-line py-8 text-center text-[14px] text-muted">
                      No verified server listings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
            Registered accounts are the total ever created on a server;
            monthly active describes accounts that posted, replied or reacted in
            the last thirty days. Any figures published here will be dated and
            operator-reported; this site does not collect them automatically.
          </p>
        </Container>
      </section>

      {/* --------------------------------------------------------- cards */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="One by one"
            title="Server profiles."
            lede="Profiles will be published when operators' details and current server information can be verified."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2" data-stagger>
            {SERVERS.length ? SERVERS.map((server) => (
              <article key={server.id} className="card card-hover p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-[1.5rem] leading-none text-ink-strong">
                      {server.name}
                    </h3>
                    <p className="mt-2 font-mono text-[13px] text-coral">
                      {server.domain}
                    </p>
                  </div>
                  <span className="pill">
                    {REGISTRATION_LABEL[server.registration]} registration
                  </span>
                </div>

                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                  {server.tagline}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 text-[14px] sm:grid-cols-4">
                  <div>
                    <dt className="text-[11.5px] tracking-widest text-muted uppercase">
                      Registered
                    </dt>
                    <dd className="mt-1 font-mono text-ink-strong">
                      {formatCount(server.registered)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11.5px] tracking-widest text-muted uppercase">
                      Active
                    </dt>
                    <dd className="mt-1 font-mono text-ink-strong">
                      {formatCount(server.active)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11.5px] tracking-widest text-muted uppercase">
                      Moderation
                    </dt>
                    <dd className="mt-1 text-ink">{server.moderation}</dd>
                  </div>
                  <div>
                    <dt className="text-[11.5px] tracking-widest text-muted uppercase">
                      Run by
                    </dt>
                    <dd className="mt-1 text-ink">{server.admin}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted">
                    <Globe2 className="size-3.5" />
                    {server.region} · since {server.since}
                  </span>
                  {server.url ? (
                    <a
                      href={server.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[14.5px] font-semibold text-coral hover:underline"
                    >
                      Visit
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  ) : (
                    <span className="ml-auto rounded-full border border-dashed border-line-strong px-2.5 py-1 font-mono text-[11.5px] text-muted">
                      placeholder entry
                    </span>
                  )}
                </div>
              </article>
            )) : (
              <p className="text-[15px] leading-relaxed text-muted">
                Server profiles will appear here when verified listings are available.
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ add yours */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div data-reveal="">
            <span className="eyebrow">Yours is missing</span>
            <h2 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
              Running a public server?
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted">
              The directory is maintained from verified information and does
              not connect to servers or accept listings through this page. The
              project repository is the place to ask about adding a listing; do
              not send account or private server data.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={SITE.server}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open project repository
                <ArrowUpRight className="size-4" />
              </a>
              <Link href="/admins" className="btn btn-outline">
                What admins are asked
              </Link>
            </div>
          </div>

          <div className="card p-7">
            <h3 className="text-[1.25rem] leading-tight text-ink-strong">
              Before a listing is added
            </h3>
            <CheckList
              className="mt-5"
              items={[
                "The server operator's permission to publish details",
                "A publicly reachable server address and registration policy",
                "Approximate counts with a clear date and source",
                "Moderation and language details the operator can verify",
              ]}
            />
            <p className="mt-5 border-t border-line pt-5 text-[13.5px] leading-relaxed text-muted">
              Figures must be self-reported and dated; the directory does not
              scrape or verify them automatically.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Want to run an Aloha Social server?"
        body="Aloha Social is installed into an existing host-platform service. Check the app release and compatibility requirements before setting it up."
        primary={{ label: "Install Aloha Social", href: "/install" }}
        secondary={{ label: "The software", href: "/server" }}
      />
    </>
  );
}
