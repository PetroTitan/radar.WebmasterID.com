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
    <div className="overflow-x-auto rounded-card border border-line bg-surface-base">
      <table className="w-full border-collapse text-sm">
        {caption ? (
          <caption className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr className="border-b border-line bg-surface-subtle">
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
              Metric
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
              Value
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
              Source
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={i < rows.length - 1 ? "border-b border-line/70" : ""}
            >
              <td className="whitespace-nowrap px-6 py-4 text-ink-700">{row.label}</td>
              <td className="px-6 py-4 text-ink-900">
                {row.value === null ? (
                  <EmptyMetric />
                ) : (
                  <span className="font-medium">
                    {row.value}
                    {row.unit ? (
                      <span className="ml-1 text-ink-500">{row.unit}</span>
                    ) : null}
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-ink-500">
                {row.sourceLabel ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
