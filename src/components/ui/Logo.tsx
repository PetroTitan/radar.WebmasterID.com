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
}

export function Logo({
  size = 28,
  className = "",
  withWordmark = true,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {withWordmark ? (
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink-900">
          Radar
          <span className="ml-1 text-ink-500 font-normal">WebmasterID</span>
        </span>
      ) : null}
    </span>
  );
}

export function LogoMark({ size = 28 }: { readonly size?: number }) {
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
      <circle cx="16" cy="16" r="13" stroke="#3B82F6" strokeWidth="1.25" />
      <circle cx="16" cy="16" r="7" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
      <path
        d="M16 16 L25 9"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="1.6" fill="#3B82F6" />
      <circle cx="25" cy="9" r="2" fill="#F59E0B" />
    </svg>
  );
}
