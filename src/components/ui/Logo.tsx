/**
 * Radar mark.
 *
 * Two thin concentric rings (radar dish), a sweep line, and a
 * single amber node — the only piece of orange in the brand. The
 * mark is built from stroked geometry, no fills, so it survives
 * scaling to favicon and avatars cleanly.
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
   *  uses default. */
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
      viewBox="0 0 32 32"
      role="img"
      aria-label="Radar WebmasterID"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="13" stroke="#3B82F6" strokeWidth="1.1" />
      <circle
        cx="16"
        cy="16"
        r="7.5"
        stroke="#3B82F6"
        strokeWidth="0.9"
        opacity="0.45"
      />
      <path
        d="M16 16 L24.5 9.5"
        stroke="#3B82F6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="1.4" fill="#3B82F6" />
      <circle cx="24.5" cy="9.5" r="1.9" fill="#F59E0B" />
    </svg>
  );
}
