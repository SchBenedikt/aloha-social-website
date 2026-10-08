import Image from "next/image";

/**
 * The official "@ stamen hibiscus" mark from AlohaSocial/Logos.
 * Coral flower, white @ — legible on both light and dark backgrounds.
 */
export function Mark({
  size = 34,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/mark.svg"
      alt=""
      width={size}
      height={size}
      unoptimized
      priority={priority}
      className={`shrink-0 ${className}`}
    />
  );
}

/** The official horizontal logo. `onDark` swaps the wordmark to sand. */
export function BrandLogo({
  height = 34,
  onDark = false,
  className = "",
}: {
  height?: number;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={
        onDark
          ? "/brand/logo-horizontal-on-dark.svg"
          : "/brand/logo-horizontal.svg"
      }
      alt="Aloha Social"
      width={Math.round((height * 812.576) / 168)}
      height={height}
      unoptimized
      className={className}
    />
  );
}

/** Header lockup: official mark + the wordmark set in Fredoka, the font the
 *  official wordmark is drawn in. */
export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark size={32} priority={priority} />
      <span
        className="text-[19px] leading-none font-semibold tracking-[-0.01em] text-ink-strong"
        style={{ fontFamily: "var(--font-brand)" }}
      >
        Aloha&nbsp;Social
      </span>
    </span>
  );
}
