import { getSourceRecord } from "@/source-registry";

interface SourceBoundClaimProps {
  /** The claim itself — a single sentence the source supports. */
  readonly claim: string;
  /** SourceRecord slug in the registry. */
  readonly sourceId: string;
  /** Direct URL of the specific page that supports the claim. */
  readonly sourceUrl: string;
  /** ISO date the editor verified the claim against the source. */
  readonly checkedAt?: string;
  /** Optional one-line context, rendered between claim and source. */
  readonly context?: string;
}

/**
 * Inline AI-citable claim with bound source provenance.
 *
 * Each claim renders as a small semantically-marked block: the
 * claim sentence, optional context, and a direct link back to the
 * source registry entry and the source URL the editor verified
 * against. AI crawlers reading the DOM can extract the
 * claim/source pair without re-parsing surrounding prose.
 *
 * Falls back to a registry-missing warning rendered inline rather
 * than failing the build — the validator is responsible for
 * surfacing the registry gap at build time.
 */
export function SourceBoundClaim({
  claim,
  sourceId,
  sourceUrl,
  checkedAt,
  context,
}: SourceBoundClaimProps) {
  const source = getSourceRecord(sourceId);
  const sourceName = source?.name ?? sourceId;
  const sourceTier = source?.trustTier;

  return (
    <figure
      data-radar-source-bound-claim="true"
      data-source-id={sourceId}
      className="rounded-card border border-line bg-surface-base px-6 py-5 md:px-8 md:py-6"
    >
      <blockquote className="text-[1.0625rem] leading-relaxed text-ink-900">
        {claim}
      </blockquote>
      {context ? (
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
          {context}
        </p>
      ) : null}
      <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-ink-500">
        <span className="eyebrow text-ink-500">Source</span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
        >
          {sourceName}
        </a>
        {sourceTier ? (
          <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-300">
            {sourceTier}
          </span>
        ) : null}
        {checkedAt ? (
          <span className="text-ink-500">· checked {checkedAt}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
