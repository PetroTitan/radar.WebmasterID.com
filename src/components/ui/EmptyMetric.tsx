/**
 * Renders the canonical "Data not yet verified." placeholder.
 *
 * The platform refuses to render fabricated metrics, so a metric
 * cell with no verified value renders this. Same string everywhere
 * so it is unmistakable.
 */
export function EmptyMetric() {
  return (
    <span
      className="inline-flex items-center gap-2 text-[0.875rem] italic text-ink-300"
      aria-label="Data not yet verified."
    >
      <span
        aria-hidden="true"
        className="inline-block size-1 rounded-full bg-ink-300"
      />
      Data not yet verified.
    </span>
  );
}

export const UNVERIFIED_PLACEHOLDER = "Data not yet verified." as const;
