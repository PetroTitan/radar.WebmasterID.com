/**
 * Renders the canonical "Data not yet verified." placeholder.
 *
 * The platform refuses to render fabricated metrics, so a metric
 * cell with no verified value renders this. Same string everywhere
 * so it is unmistakable.
 */
export function EmptyMetric() {
  return (
    <span className="text-graphite-400" aria-label="Data not yet verified.">
      Data not yet verified.
    </span>
  );
}

export const UNVERIFIED_PLACEHOLDER = "Data not yet verified." as const;
