import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import {
  Container,
  CtaBand,
  PageHeader,
  SectionHeading,
} from "@/components/ui";
import { BOILERPLATE, PITCH, PROOF_POINTS } from "@/lib/reasons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brand & logos",
  description:
    "The official Aloha Social marks, wordmarks and colours: coral #E8604C, deep sea #0F4C5C and sand #FBF4EA, with the Fredoka wordmark.",
  alternates: { canonical: "/brand" },
};

const COLORS = [
  {
    name: "Coral",
    hex: "#E8604C",
    swatch: "#E8604C",
    dark: false,
    use: "The mark, actions and accents. What says “press me”.",
    text: "#FFFFFF",
  },
  {
    name: "Deep sea",
    hex: "#0F4C5C",
    swatch: "#0F4C5C",
    dark: false,
    use: "The wordmark, headings and anything that has to be read at length.",
    text: "#FBF4EA",
  },
  {
    name: "Sand",
    hex: "#FBF4EA",
    swatch: "#FBF4EA",
    dark: true,
    use: "Backgrounds, the reverse wordmark and breathing room.",
    text: "#0F4C5C",
  },
] as const;

const ASSETS = [
  {
    name: "Horizontal",
    file: "logo-horizontal.svg",
    note: "The mark beside the wordmark. The default — use this unless you have a reason not to.",
    dark: false,
  },
  {
    name: "Horizontal, on dark",
    file: "logo-horizontal-on-dark.svg",
    note: "Identical geometry, sand wordmark for backgrounds deep enough to need it.",
    dark: true,
  },
  {
    name: "Stacked",
    file: "logo-stacked.svg",
    note: "Mark above wordmark, for a square or narrow space.",
    dark: false,
  },
  {
    name: "The mark",
    file: "mark.svg",
    note: "The @ stamen hibiscus on its own. Legible at 16 px — it is the favicon.",
    dark: false,
  },
] as const;

const RULES = [
  {
    ok: true,
    text: "Keep clear space around the logo equal to the height of the @ symbol.",
  },
  { ok: true, text: "Use the mark on coral, sand, deep sea or a plain light background." },
  { ok: true, text: "Scale it down as far as you like — it is vector and it holds." },
  { ok: false, text: "Recolour the mark, or swap the coral for something adjacent." },
  { ok: false, text: "Stretch it, rotate it, add a shadow or a second outline." },
  { ok: false, text: "Put it on a busy photograph, or inside somebody else's frame." },
] as const;

export default function BrandPage() {
  return (
    <>
      <PageHeader
        eyebrow="Brand & logos"
        title="Marks, colours and the type they are set in."
        lede="Everything here comes from the AlohaSocial/Logos repository. Use it as it is — the whole point of a published brand is that the logo looks the same wherever it appears."
        actions={
          <>
            <a
              href={SITE.logos}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Logos repository
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="/brand/screenshot.png"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Social preview
              <Download className="size-4" />
            </a>
          </>
        }
      />

      {/* -------------------------------------------------------- colours */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Colour"
            title="Three colours, published as they are."
            lede="Coral is the action, deep sea is the voice, sand is the room. These are Aloha Social’s published brand colours; other colours in the interface belong to Nextcloud or to the website theme."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-3" data-stagger>
            {COLORS.map((color) => (
              <div key={color.name} className="card overflow-hidden">
                <div
                  className="flex h-40 items-end p-5"
                  style={{
                    background: color.swatch,
                    color: color.text,
                  }}
                >
                  <span className="font-mono text-[13px] tracking-wide opacity-90">
                    {color.hex}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[1.35rem] leading-tight text-ink-strong">
                    {color.name}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                    {color.use}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3" data-stagger>
            {[
              ["Coral", "Actions, the mark, active states, eyebrow rules."],
              ["Deep sea", "Headings, the wordmark, dark bands, the footer."],
              ["Sand", "Page background in light mode, text on deep sea."],
            ].map(([name, use]) => (
              <p key={name} className="text-[14.5px] leading-relaxed text-muted">
                <span className="font-semibold text-ink">{name}</span> — {use}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- logos */}
      <section className="sand border-y border-line py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Logos"
            title="Four files, two backgrounds."
            lede="Each one is a vector, downloadable as served from this site. The dark variant is the same drawing with a sand wordmark — nothing else changes."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2" data-stagger>
            {ASSETS.map((asset) => (
              <div key={asset.file} className="card overflow-hidden">
                <div
                  className="grid h-44 place-items-center p-8"
                  style={{
                    background: asset.dark ? "#0F4C5C" : "#FFFFFF",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/brand/${asset.file}`}
                    alt={`Aloha Social ${asset.name} logo`}
                    className={asset.name === "The mark" ? "h-24" : "h-20"}
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="text-[1.2rem] leading-tight text-ink-strong">
                      {asset.name}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                      {asset.note}
                    </p>
                  </div>
                  <a
                    href={`/brand/${asset.file}`}
                    download
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line-strong bg-surface/60 px-3.5 text-[13.5px] font-semibold text-ink transition hover:border-coral hover:text-coral"
                  >
                    <Download className="size-3.5" />
                    SVG
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3" data-stagger>
            {[
              ["Mark as an image", "mark-512.png", "Raster, for places that cannot use SVG."],
              ["App icon", "app-icon-512.png", "The 512 px square icon."],
              ["Touch icon", "apple-touch-icon-180.png", "180 px, for a home screen."],
            ].map(([title, file, note]) => (
              <a
                key={file}
                href={`/brand/${file}`}
                download
                className="card card-hover group flex items-center gap-4 p-5"
              >
                <span>
                  <span className="block font-mono text-[13px] text-ink-strong">
                    {title}
                  </span>
                  <span className="mt-1 block text-[13.5px] text-muted">{note}</span>
                </span>
                <Download className="ml-auto size-4 shrink-0 text-muted transition group-hover:text-coral" />
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- rules */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div data-reveal="">
            <span className="eyebrow">Wordmark</span>
            <h2 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
              Set in Fredoka, because that is what it is.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">
              The official wordmark is drawn in <strong className="font-semibold text-ink">Fredoka</strong>, an
              open typeface under the SIL Open Font License. This site uses the
              same face for headings, so a heading and the logo are cut from the
              same material. Body text is Public Sans; counters and labels are
              IBM Plex Mono.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                ["Fredoka", "Wordmark, headings", "300–700"],
                ["Public Sans", "Body copy", "100–900"],
                ["IBM Plex Mono", "Labels, code", "400–600"],
              ].map(([face, role, range]) => (
                <div key={face} className="card p-5">
                  <span className="font-mono text-[11.5px] tracking-widest text-coral uppercase">
                    {range}
                  </span>
                  <p className="mt-2 text-[1.05rem] text-ink-strong">{face}</p>
                  <p className="mt-1 text-[13.5px] text-muted">{role}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal="">
            <span className="eyebrow">Rules</span>
            <h2 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]">
              Four do&apos;s, three don&apos;t.
            </h2>
            <ul className="mt-6 space-y-3">
              {RULES.map((rule) => (
                <li
                  key={rule.text}
                  className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4 text-[15px] leading-relaxed"
                >
                  <span
                    className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[13px] font-bold ${
                      rule.ok
                        ? "bg-sea-soft text-sea"
                        : "bg-coral-soft text-coral"
                    }`}
                    aria-hidden
                  >
                    {rule.ok ? "✓" : "✕"}
                  </span>
                  <span>{rule.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- press */}
      <section className="sand border-y border-line py-16 sm:py-20" aria-labelledby="press-heading">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div data-reveal="">
            <span className="eyebrow">Press</span>
            <h2
              id="press-heading"
              className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.03em] text-ink-strong sm:text-[2.4rem]"
            >
              Short boilerplate.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-ink">
              {BOILERPLATE.intro}
            </p>
            <ul className="mt-5 space-y-3 border-t border-line pt-5">
              {BOILERPLATE.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-[15px] leading-relaxed text-muted"
                >
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/why" className="btn btn-primary">
                30 reasons it is special
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={SITE.server}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Source code
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div data-reveal="">
            <span className="eyebrow">One line</span>
            <blockquote className="mt-4 rounded-2xl border border-line bg-surface p-6 text-[17px] leading-relaxed text-ink-strong">
              {PITCH}
            </blockquote>
            <dl className="mt-6 border-t border-line">
              {PROOF_POINTS.slice(0, 6).map((point) => (
                <div
                  key={point.fact}
                  className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-5"
                >
                  <dt className="text-[13.5px] font-semibold text-ink-strong">
                    {point.fact}
                  </dt>
                  <dd className="font-mono text-[13px] leading-relaxed text-muted">
                    {point.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/why#proof"
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-coral"
            >
              All proof points
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Found what you need?"
        body="The repository carries every file in its original form, including the ones this page does not show."
        primary={{ label: "Logos repository", href: SITE.logos, external: true }}
        secondary={{ label: "Back to features", href: "/features" }}
      />
    </>
  );
}
