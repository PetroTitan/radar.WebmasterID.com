import type { Ranking } from "@/entities";

interface RankingMethodologyProps {
  readonly ranking: Ranking;
}

const STATUS_STYLE: Readonly<
  Record<Ranking["status"], { readonly label: string; readonly className: string }>
> = {
  verified: {
    label: "Verified — published positions are source-cited",
    className: "bg-accent-50 text-accent-700",
  },
  "methodology-in-draft": {
    label: "Methodology in draft",
    className: "bg-amber-50 text-amber-600",
  },
  "pending-dataset": {
    label: "Pending verified dataset",
    className: "bg-surface-raised text-ink-500",
  },
};

/**
 * Structured methodology panel for a ranking page. Documents the
 * dimension, methodology paragraph, weighting, recompute cadence,
 * and status — the entire "show your work" surface that makes the
 * ranking citable.
 */
export function RankingMethodology({ ranking }: RankingMethodologyProps) {
  const status = STATUS_STYLE[ranking.status];
  return (
    <section
      data-radar-ranking-methodology="true"
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        Methodology
      </h2>
      <dl className="divide-y divide-line/70">
        <Row label="Status">
          <span className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${status.className}`}>
            {status.label}
          </span>
        </Row>
        <Row label="Dimension">{ranking.dimension}</Row>
        <Row label="Methodology">{ranking.methodology}</Row>
        <Row label="Weighting">{ranking.weighting}</Row>
        <Row label="Recompute cadence">
          <span className="font-medium">{ranking.recomputeCadence}</span>
        </Row>
        <Row label="Confidence">
          <span className="capitalize">{ranking.confidence}</span>
        </Row>
      </dl>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 px-7 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 md:px-9">
      <dt className="text-sm text-ink-500">{label}</dt>
      <dd className="text-[0.95rem] leading-relaxed text-ink-700">{children}</dd>
    </div>
  );
}
