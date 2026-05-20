import type { ReactNode } from "react";
import { EmptyMetric } from "./EmptyMetric";

export interface MetricRow {
  readonly label: string;
  /** Either a verified value (string/number/element) or `null`,
   *  which renders the canonical "Data not yet verified." cell. */
  readonly value: ReactNode | null;
  readonly unit?: string;
  readonly sourceLabel?: string;
}

interface MetricTableProps {
  readonly caption?: string;
  readonly rows: ReadonlyArray<MetricRow>;
}

export function MetricTable({ caption, rows }: MetricTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-graphite-700/60 bg-graphite-900/60">
      <table className="w-full border-collapse text-sm">
        {caption ? (
          <caption className="px-4 py-3 text-left text-xs font-medium uppercase tracking-eyebrow text-graphite-400">
            {caption}
          </caption>
        ) : null}
        <thead className="border-b border-graphite-700/60 bg-graphite-800/60">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-graphite-200">
              Metric
            </th>
            <th className="px-4 py-3 text-left font-medium text-graphite-200">
              Value
            </th>
            <th className="px-4 py-3 text-left font-medium text-graphite-200">
              Source
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-graphite-800/60 last:border-b-0"
            >
              <td className="px-4 py-3 text-graphite-300">{row.label}</td>
              <td className="px-4 py-3 font-mono text-graphite-100">
                {row.value === null ? (
                  <EmptyMetric />
                ) : (
                  <>
                    {row.value}
                    {row.unit ? (
                      <span className="ml-1 text-graphite-400">{row.unit}</span>
                    ) : null}
                  </>
                )}
              </td>
              <td className="px-4 py-3 text-graphite-400">
                {row.sourceLabel ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
