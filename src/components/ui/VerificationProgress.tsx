import type { InfrastructureDatasetRow } from "@/entities";

interface VerificationProgressProps {
  /** Reviewed rows already promoted to the public surface. */
  readonly reviewedRows: ReadonlyArray<InfrastructureDatasetRow>;
  /** Bullet list describing what the dataset deliberately leaves
   *  unverified at this snapshot. Empty list omits the column. */
  readonly pending: ReadonlyArray<string>;
}

/**
 * Side-by-side breakdown of a dataset's verification state:
 *   - "Verified now": grouping signal pulled from the row corpus
 *     (entities the rows link to, providers covered, etc.).
 *   - "Remains pending": editor-supplied list of known gaps.
 *
 * Deliberately renders no aggregate score — the platform refuses
 * to publish a composite "X% verified" number, since the
 * denominator (total possible entries) is itself unverified.
 */
export function VerificationProgress({
  reviewedRows,
  pending,
}: VerificationProgressProps) {
  const verifiedSummary = summariseRows(reviewedRows);

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <div className="rounded-card border border-line bg-surface-base px-6 py-5 md:px-8 md:py-6">
        <p className="eyebrow text-ink-500">Verified now</p>
        <p className="mt-3 font-display text-h3 font-semibold text-ink-900">
          {reviewedRows.length} reviewed row{reviewedRows.length === 1 ? "" : "s"}
        </p>
        {verifiedSummary.length > 0 ? (
          <ul className="mt-4 space-y-2 text-[0.9375rem] leading-relaxed text-ink-700">
            {verifiedSummary.map((line) => (
              <li key={line.label} className="flex items-baseline justify-between gap-4">
                <span className="text-ink-700">{line.label}</span>
                <span className="font-mono text-xs text-ink-500">
                  {line.value}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
            No reviewed rows yet. The dataset card above is published; row-level
            rendering activates once editorial review promotes ingestion output.
          </p>
        )}
      </div>

      {pending.length > 0 ? (
        <div className="rounded-card border border-dashed border-line-strong bg-surface-subtle px-6 py-5 md:px-8 md:py-6">
          <p className="eyebrow text-ink-500">Remains pending</p>
          <p className="mt-3 font-display text-h3 font-semibold text-ink-900">
            Known gaps
          </p>
          <ul className="mt-4 space-y-2 text-[0.9375rem] leading-relaxed text-ink-700">
            {pending.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-line-strong" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

interface SummaryLine {
  readonly label: string;
  readonly value: string;
}

function summariseRows(
  rows: ReadonlyArray<InfrastructureDatasetRow>,
): ReadonlyArray<SummaryLine> {
  if (rows.length === 0) return [];
  const lines: SummaryLine[] = [];

  const cloudRegions = rows.filter((r) => r.recordType === "cloud-region");
  const ixs = rows.filter((r) => r.recordType === "peeringdb-ix");
  const facilities = rows.filter((r) => r.recordType === "peeringdb-facility");

  if (cloudRegions.length > 0) {
    const providers = new Set(cloudRegions.map((r) => r.provider));
    const countries = new Set(cloudRegions.map((r) => r.countryCode));
    lines.push({
      label: `Cloud regions — ${cloudRegions.length} across ${providers.size} provider${providers.size === 1 ? "" : "s"}, ${countries.size} countr${countries.size === 1 ? "y" : "ies"}`,
      value: `${cloudRegions.length}`,
    });
  }
  if (ixs.length > 0) {
    const countries = new Set(ixs.map((r) => r.countryCode));
    lines.push({
      label: `Internet Exchange Points — ${ixs.length} across ${countries.size} countr${countries.size === 1 ? "y" : "ies"}`,
      value: `${ixs.length}`,
    });
  }
  if (facilities.length > 0) {
    const countries = new Set(facilities.map((r) => r.countryCode));
    lines.push({
      label: `Carrier-neutral facilities — ${facilities.length} across ${countries.size} countr${countries.size === 1 ? "y" : "ies"}`,
      value: `${facilities.length}`,
    });
  }

  return lines;
}
