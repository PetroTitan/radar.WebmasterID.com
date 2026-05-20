/**
 * Radar mark.
 *
 * Concentric blue rings (a radar dish), a translucent sweep cone,
 * one outlined and one filled amber node, plus a small blue centre
 * pip. The mark is built from stroked geometry on a 64-unit grid
 * so it scales cleanly from favicon (16px) through header (26px)
 * to brand panel (256px+).
 *
 * The component renders inline SVG so it ships with the document
 * and doesn't need a separate request.
 */

interface LogoProps {
  readonly size?: number;
  readonly className?: string;
  /** Set to `false` to hide the wordmark and render the symbol
   *  only. Defaults to `true`. */
  readonly withWordmark?: boolean;
  /** Wordmark variant. `default` renders "Radar" + " WebmasterID";
   *  `compact` renders just "Radar". Header uses compact; footer
   *  and OG card use default. */
  readonly variant?: "default" | "compact";
}

export function Logo({
  size = 26,
  className = "",
  withWordmark = true,
  variant = "default",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {withWordmark ? (
        <span className="font-display text-[1rem] font-semibold tracking-tight text-ink-900">
          Radar
          {variant === "default" ? (
            <span className="ml-1.5 font-normal text-ink-500">
              WebmasterID
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

export function LogoMark({ size = 26 }: { readonly size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Radar WebmasterID"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="radar-sweep" x1="32" y1="32" x2="56" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Concentric rings, outermost first */}
      <circle cx="32" cy="32" r="29" stroke="#3B82F6" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="22" stroke="#3B82F6" strokeWidth="1.1" opacity="0.85" />
      <circle cx="32" cy="32" r="15" stroke="#3B82F6" strokeWidth="1" opacity="0.65" />
      <circle cx="32" cy="32" r="8" stroke="#3B82F6" strokeWidth="0.85" opacity="0.45" />

      {/* Sweep cone — wedge from centre to the upper-right ring */}
      <path
        d="M 32 32 L 53.5 14.5 A 27 27 0 0 1 58.5 26 Z"
        fill="url(#radar-sweep)"
      />
      <path
        d="M 32 32 L 53.5 14.5"
        stroke="#3B82F6"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Centre pip */}
      <circle cx="32" cy="32" r="2.6" fill="#2563EB" />

      {/* Outlined amber node at top-right (the sweep tip) */}
      <circle cx="53.5" cy="14.5" r="3.2" fill="#FFFFFF" />
      <circle
        cx="53.5"
        cy="14.5"
        r="3.2"
        stroke="#F59E0B"
        strokeWidth="1.6"
      />

      {/* Filled amber node bottom-left */}
      <circle cx="17" cy="44" r="2.5" fill="#F59E0B" />

      {/* Small blue blip on the outer ring */}
      <circle cx="58.5" cy="36" r="1.5" fill="#3B82F6" />
    </svg>
  );
}
