import type { MediaAsset } from "@/entities";

interface MediaRiskNoteProps {
  readonly asset: MediaAsset;
  readonly heading?: string;
}

/**
 * Editorial risk-notes callout for a media asset.
 *
 * Renders only when the asset has non-empty `riskNotes` or any
 * editorial-notes payload. Used on `/visuals/[slug]` to surface
 * the editorial caveats next to the asset, and on entity-page
 * evidence blocks where a candidate asset has been registered
 * but not yet promoted.
 */
export function MediaRiskNote({ asset, heading = "Risk notes" }: MediaRiskNoteProps) {
  const risks = asset.riskNotes ?? [];
  const notes = asset.editorialNotes ?? [];
  if (risks.length === 0 && notes.length === 0) return null;

  return (
    <aside
      data-radar-media-risk="true"
      aria-label={heading}
      className="rounded-card border border-dashed border-line-strong bg-surface-subtle px-6 py-5 md:px-8 md:py-6"
    >
      <p className="eyebrow text-ink-500">{heading}</p>
      {risks.length > 0 ? (
        <ul className="mt-4 space-y-2 text-[0.9375rem] leading-relaxed text-ink-700">
          {risks.map((r) => (
            <li key={r} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-line-strong"
              />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {notes.length > 0 ? (
        <div className="mt-5 space-y-2 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
          <p className="text-xs uppercase tracking-wider text-ink-300">
            Editorial notes
          </p>
          {notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
