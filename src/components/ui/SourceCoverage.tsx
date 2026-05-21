import type { SourceCitation } from "@/entities";
import { getSourceRecord } from "@/source-registry";
import Link from "next/link";

interface SourceCoverageProps {
  readonly citations: ReadonlyArray<SourceCitation>;
  readonly heading?: string;
}

/**
 * Summary panel showing the source coverage of a research artifact
 * — which sources, at which trust tiers. Distinct from SourceFootnote
 * (which lists every citation as an academic footnote): this
 * component shows the *coverage shape*, not the per-claim citations.
 */
export function SourceCoverage({
  citations,
  heading = "Source coverage",
}: SourceCoverageProps) {
  // Deduplicate by sourceId, preserving first-appearance order
  const seen = new Set<string>();
  const unique = citations.filter((c) => {
    if (seen.has(c.sourceId)) return false;
    seen.add(c.sourceId);
    return true;
  });

  return (
    <section
      data-radar-source-coverage="true"
      className="rounded-card border border-line bg-surface-base p-7 sm:p-8"
    >
      <p className="eyebrow text-ink-500">{heading}</p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
        {unique.length} registered source{unique.length === 1 ? "" : "s"} support this record.
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {unique.map((c) => {
          const record = getSourceRecord(c.sourceId);
          if (!record) return null;
          return (
            <li key={c.sourceId}>
              <Link
                href={`/sources#${c.sourceId}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-subtle px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:border-line-strong hover:text-ink-900"
              >
                <span>{record.name}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-amber-600">
                  {record.trustTier}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
