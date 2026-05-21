import Link from "next/link";
import type { InfrastructureDatasetRow } from "@/entities";
import { listReviewedRowsByEntityRef } from "@/data/research";
import { ReviewedRowsTable } from "./ReviewedRowsTable";

interface RowGroup {
  readonly key: InfrastructureDatasetRow["recordType"];
  readonly label: string;
  readonly datasetHref: string;
  readonly datasetLabel: string;
}

const GROUPS: ReadonlyArray<RowGroup> = [
  {
    key: "cloud-region",
    label: "Cloud regions",
    datasetHref: "/research/datasets/global-cloud-regions",
    datasetLabel: "Global cloud regions",
  },
  {
    key: "peeringdb-ix",
    label: "Internet Exchange Points",
    datasetHref: "/research/datasets/internet-exchange-hubs",
    datasetLabel: "Internet exchange hubs",
  },
  {
    key: "peeringdb-facility",
    label: "Carrier-neutral facilities",
    datasetHref: "/research/datasets/internet-exchange-hubs",
    datasetLabel: "Internet exchange hubs",
  },
];

interface InfrastructureEvidenceTableProps {
  /** Canonical entity ref, e.g. `city:frankfurt`. */
  readonly entityRef: string;
}

/**
 * Renders every reviewed dataset row linked to the given entity,
 * grouped by record type. Each group shows the count, the source
 * dataset, and a {@link ReviewedRowsTable} restricted to rows of
 * that type.
 *
 * Used on country / city / IXP detail pages to expose the
 * source-cited evidence that backs the entity's profile, without
 * duplicating the dataset page's surface.
 */
export function InfrastructureEvidenceTable({
  entityRef,
}: InfrastructureEvidenceTableProps) {
  const rows = listReviewedRowsByEntityRef(entityRef);

  if (rows.length === 0) {
    return (
      <div
        data-radar-evidence="empty"
        className="rounded-card border border-dashed border-line-strong bg-surface-subtle px-6 py-8 md:px-10 md:py-10"
      >
        <p className="eyebrow text-ink-500">Reviewed evidence</p>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          No reviewed dataset rows are currently linked to this entity.
          Evidence appears here as rows are promoted from the ingestion
          lifecycle described in{" "}
          <Link
            href="/research/methodologies"
            className="text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
          >
            research methodologies
          </Link>
          .
        </p>
      </div>
    );
  }

  const grouped = GROUPS.map((g) => ({
    ...g,
    rows: rows.filter((r) => r.recordType === g.key),
  })).filter((g) => g.rows.length > 0);

  return (
    <div data-radar-evidence="populated" className="space-y-8">
      {grouped.map((g) => (
        <div key={g.key}>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-h3 font-semibold text-ink-900">
              {g.label}
              <span className="ml-2 text-sm font-normal text-ink-500">
                · {g.rows.length}
              </span>
            </h3>
            <Link
              href={g.datasetHref}
              className="text-sm text-ink-700 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
            >
              See dataset → {g.datasetLabel}
            </Link>
          </div>
          <ReviewedRowsTable rows={g.rows} heading="Reviewed rows" />
        </div>
      ))}
    </div>
  );
}
