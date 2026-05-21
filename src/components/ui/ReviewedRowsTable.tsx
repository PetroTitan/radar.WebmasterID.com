import type { InfrastructureDatasetRow } from "@/entities";
import { formatDisplayDate } from "@/lib/dates";

interface ReviewedRowsTableProps {
  readonly rows: ReadonlyArray<InfrastructureDatasetRow>;
  /** Empty-state label, e.g. "Reviewed rows". */
  readonly heading?: string;
}

/**
 * Tabular renderer for reviewed dataset rows.
 *
 * Renders only the columns common to every row (id, source,
 * countryCode, last verified). Concrete row types' specific
 * fields are summarised in the "Detail" column.
 *
 * If the rows array is empty, renders the canonical
 * "Dataset not yet fully verified." placeholder rather than an
 * empty table.
 */
export function ReviewedRowsTable({
  rows,
  heading = "Reviewed rows",
}: ReviewedRowsTableProps) {
  if (rows.length === 0) {
    return (
      <section
        data-radar-reviewed-rows="empty"
        className="rounded-card border border-dashed border-line-strong bg-surface-subtle px-8 py-12 md:px-12 md:py-16"
      >
        <p className="eyebrow text-ink-500">{heading}</p>
        <p className="mt-3 font-display text-h3 font-semibold text-ink-900">
          Dataset not yet fully verified.
        </p>
        <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          No reviewed rows have been promoted from ingestion output yet.
          The dataset card above documents the methodology, sources, and
          known limitations; rows appear here once editorial review
          signs them off.
        </p>
      </section>
    );
  }

  return (
    <section
      data-radar-reviewed-rows="populated"
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        {heading} · {rows.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="num w-full border-collapse text-[0.9375rem]">
          <thead>
            <tr className="border-b border-line bg-surface-subtle">
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Row
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Detail
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Source
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Reviewed
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={
                  i < rows.length - 1 ? "border-b border-line/60" : ""
                }
              >
                <td className="whitespace-nowrap px-6 py-4 text-ink-700">
                  <span className="font-mono text-xs">{row.id}</span>
                </td>
                <td className="px-6 py-4 text-ink-900">
                  <RowDetail row={row} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <a
                    href={row.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-700 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                  >
                    {row.rawSourceName}
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-ink-500">
                  {formatDisplayDate(row.lastVerified)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RowDetail({ row }: { readonly row: InfrastructureDatasetRow }) {
  if (row.recordType === "cloud-region") {
    return (
      <span>
        <span className="font-medium uppercase tracking-wider text-[0.7rem] text-amber-600 mr-2">
          {row.provider}
        </span>
        <span className="font-medium">{row.regionCode}</span>
        <span className="ml-2 text-ink-500">— {row.displayName}</span>
        <span className="ml-2 text-xs text-ink-500">({row.countryCode})</span>
      </span>
    );
  }
  if (row.recordType === "peeringdb-ix") {
    return (
      <span>
        <span className="font-medium">{row.name}</span>
        <span className="ml-2 text-ink-500">— {row.operator}</span>
        <span className="ml-2 text-xs text-ink-500">({row.countryCode})</span>
      </span>
    );
  }
  if (row.recordType === "ai-capable-cloud-region") {
    return (
      <span>
        <span className="font-medium uppercase tracking-wider text-[0.7rem] text-amber-600 mr-2">
          {row.provider}
        </span>
        <span className="font-medium">{row.regionCode}</span>
        <span className="ml-2 text-ink-500">— {row.aiService}</span>
        <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-wider text-ink-300">
          {row.availability}
        </span>
        <span className="ml-2 text-xs text-ink-500">({row.countryCode})</span>
      </span>
    );
  }
  // peeringdb-facility
  return (
    <span>
      <span className="font-medium">{row.name}</span>
      <span className="ml-2 text-ink-500">— {row.operator}</span>
      <span className="ml-2 text-xs text-ink-500">({row.countryCode})</span>
    </span>
  );
}
