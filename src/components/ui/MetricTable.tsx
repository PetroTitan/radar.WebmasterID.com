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
    <div className="overflow-hidden rounded-card border border-line bg-surface-base">
      <div className="overflow-x-auto">
        <table className="num w-full border-collapse text-[0.9375rem]">
          {caption ? (
            <caption className="px-6 py-4 text-left eyebrow text-ink-500">
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr className="border-b border-line bg-surface-subtle">
              <th
                scope="col"
                className="px-6 py-4 text-left eyebrow font-semibold text-ink-500"
              >
                Metric
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left eyebrow font-semibold text-ink-500"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left eyebrow font-semibold text-ink-500"
              >
                Source
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={
                  i < rows.length - 1
                    ? "border-b border-line/60"
                    : ""
                }
              >
                <td className="whitespace-nowrap px-6 py-5 text-ink-700">
                  {row.label}
                </td>
                <td className="px-6 py-5 text-ink-900">
                  {row.value === null ? (
                    <EmptyMetric />
                  ) : (
                    <span className="font-medium">
                      {row.value}
                      {row.unit ? (
                        <span className="ml-1 font-normal text-ink-500">
                          {row.unit}
                        </span>
                      ) : null}
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-5 text-sm text-ink-500">
                  {row.sourceLabel ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
