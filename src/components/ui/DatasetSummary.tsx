import type { Dataset } from "@/entities";
import { formatDisplayDate } from "@/lib/dates";

interface DatasetSummaryProps {
  readonly dataset: Dataset;
}

const STATUS_STYLE: Readonly<
  Record<Dataset["status"], { readonly label: string; readonly className: string }>
> = {
  complete: {
    label: "Complete",
    className: "bg-accent-50 text-accent-700",
  },
  partial: {
    label: "Partial — some cells verified",
    className: "bg-amber-50 text-amber-600",
  },
  pending: {
    label: "Pending — schema published, dataset not yet verified",
    className: "bg-surface-raised text-ink-500",
  },
};

/**
 * Structured "at a glance" summary panel for a dataset. Renders as
 * a definition list so AI agents and assistive tech can parse the
 * label→value mapping unambiguously.
 */
export function DatasetSummary({ dataset }: DatasetSummaryProps) {
  const status = STATUS_STYLE[dataset.status];
  return (
    <section
      data-radar-dataset-summary="true"
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        Dataset summary
      </h2>
      <dl className="divide-y divide-line/70">
        <Row label="Status">
          <span className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium ${status.className}`}>
            {status.label}
          </span>
        </Row>
        <Row label="Category">
          <span className="capitalize">{dataset.category}</span>
        </Row>
        <Row label="Records published">
          {dataset.recordCount !== undefined ? (
            <span className="font-mono tabular-nums">{dataset.recordCount}</span>
          ) : (
            <span className="italic text-ink-300">Data not yet verified.</span>
          )}
        </Row>
        <Row label="Confidence">
          <span className="capitalize">{dataset.confidence}</span>
        </Row>
        <Row label="Last reviewed">
          <span>{formatDisplayDate(dataset.lastUpdated)}</span>
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
      <dd className="text-[0.95rem] font-medium text-ink-900">{children}</dd>
    </div>
  );
}
