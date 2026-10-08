import Image from "next/image";
import type { ReactNode } from "react";
import { Check, Info } from "lucide-react";

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={`mx-auto w-full ${wide ? "max-w-7xl" : "max-w-6xl"} px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="bg-dots pointer-events-none absolute inset-x-0 top-0 h-56 opacity-70" aria-hidden />
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 text-[2.5rem] leading-[1.06] tracking-[-0.03em] text-ink-strong sm:text-[3.4rem]">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
              {lede}
            </p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
      data-reveal=""
    >
      <span className={`eyebrow ${align === "center" ? "eyebrow-plain justify-center" : ""}`}>
        {eyebrow}
      </span>
      <h2 className="mt-4 text-[2.15rem] leading-[1.12] tracking-[-0.03em] text-ink-strong sm:text-[2.6rem]">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 text-[17px] leading-relaxed text-muted">{lede}</p>
      ) : null}
    </div>
  );
}

export function CheckList({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15.5px] leading-relaxed">
          <span className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full bg-coral-soft text-coral">
            <Check className="size-3" strokeWidth={3.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A screenshot presented inside its host-platform window. */
export function Screenshot({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  chromeless = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  chromeless?: boolean;
  className?: string;
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={
        width < 600
          ? "(max-width: 1024px) 70vw, 380px"
          : "(max-width: 1024px) 100vw, 960px"
      }
      className="block h-auto w-full"
    />
  );

  return (
    <figure className={className}>
      {chromeless ? (
        image
      ) : (
        <div className="chrome">
          <div className="chrome-bar">
            <Image
              src="/img/nextcloud.png"
              alt=""
              width={22}
              height={22}
              unoptimized
              className="size-[22px] rounded-[5px]"
            />
            <span className="text-[13px] font-semibold text-[#1c1c1c] dark:text-[#e9e9e9]">
              Aloha Social
            </span>
            <span className="chrome-search" aria-hidden />
            <span className="chrome-avatar" aria-hidden>
              A
            </span>
          </div>
          {image}
        </div>
      )}
      {caption ? (
        <figcaption className="mt-3 text-[13px] text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-brand text-[2rem] leading-none font-semibold text-coral">
        {value}
      </dt>
      <dd className="mt-2 text-[13.5px] leading-snug text-muted">{label}</dd>
    </div>
  );
}

export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: ReactNode;
  body: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
}) {
  const linkProps = (external?: boolean) =>
    external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <section className="border-t border-line bg-deepsea" data-reveal="">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl text-sand">
            <h2 className="text-[2.1rem] leading-[1.14] tracking-[-0.03em] sm:text-[2.5rem]">
              {title}
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-sand/75">
              {body}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={primary.href}
              {...linkProps(primary.external)}
              className="btn btn-primary"
            >
              {primary.label}
            </a>
            {secondary ? (
              <a
                href={secondary.href}
                {...linkProps(secondary.external)}
                className="btn border border-sand/45 text-sand hover:border-sand hover:bg-white/10"
              >
                {secondary.label}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

export type FlowStep = {
  title: string;
  body: string;
  meta?: string;
};

/** A numbered sequence, drawn as hairline rows rather than cards. */
export function Flow({ steps }: { steps: readonly FlowStep[] }) {
  return (
    <ol className="mt-10 border-t border-line">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3.5rem_13rem_minmax(0,1fr)] sm:gap-6"
        >
          <span className="font-mono text-[12px] tracking-widest text-coral">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="block text-[17px] leading-snug font-semibold text-ink-strong">
              {step.title}
            </span>
            {step.meta ? (
              <span className="mt-1 block font-mono text-[12.5px] break-all text-muted">
                {step.meta}
              </span>
            ) : null}
          </span>
          <span className="text-[15.5px] leading-relaxed text-muted">
            {step.body}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Two-column definition rows on hairlines. */
export function TermList({
  items,
}: {
  items: readonly { term: string; note: string }[];
}) {
  return (
    <dl className="border-t border-line">
      {items.map((item) => (
        <div
          key={item.term}
          className="grid gap-1 border-b border-line py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"
        >
          <dt className="text-[14.5px] font-semibold text-ink-strong">
            {item.term}
          </dt>
          <dd className="text-[15px] leading-relaxed text-muted">{item.note}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A single explanatory note between doc chapters. */
export function DocsNote({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="my-12 flex gap-4 rounded-2xl border border-line bg-surface-2 p-5 text-[15px] leading-relaxed text-muted">
        <Info className="mt-0.5 size-5 shrink-0 text-coral" strokeWidth={1.75} />
        <p>{children}</p>
      </div>
    </Container>
  );
}
