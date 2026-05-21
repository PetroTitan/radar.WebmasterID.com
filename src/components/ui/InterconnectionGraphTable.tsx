import Link from "next/link";
import { IXPS, getCity, getCountryByCode } from "@/data";
import { listReviewedRowsByEntityRef } from "@/data/research";

interface InterconnectionGraphTableProps {
  readonly heading?: string;
}

interface GraphRow {
  readonly ixpSlug: string;
  readonly ixpName: string;
  readonly operator: string;
  readonly citySlug?: string;
  readonly cityName?: string;
  readonly countryCode: string;
  readonly countrySlug?: string;
  readonly countryName?: string;
  readonly reviewedRows: number;
}

/**
 * Static "Interconnection graph" surface.
 *
 * Renders one row per IXP entity with its operator, anchor city,
 * anchor country, and a count of reviewed dataset rows that point
 * back at the IXP. The table is built statically at render time
 * from the registries — no client-side graph library, no live
 * fetches, no telemetry.
 *
 * Used on the interconnection guide to make the city / country /
 * IXP / reviewed-row relationships visible without resorting to
 * an interactive diagram.
 */
export function InterconnectionGraphTable({
  heading = "Interconnection graph",
}: InterconnectionGraphTableProps) {
  const rows: GraphRow[] = IXPS.map((ixp): GraphRow => {
    const city = getCity(ixp.citySlug);
    const country = getCountryByCode(ixp.countryCode);
    const reviewedRows = listReviewedRowsByEntityRef(`ixp:${ixp.slug}`).length;
    return {
      ixpSlug: ixp.slug,
      ixpName: ixp.name,
      operator: ixp.operator,
      citySlug: city?.slug,
      cityName: city?.name,
      countryCode: ixp.countryCode,
      countrySlug: country?.slug,
      countryName: country?.name,
      reviewedRows,
    };
  });

  if (rows.length === 0) return null;

  return (
    <section
      data-radar-interconnection-graph="true"
      aria-label={heading}
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
                IXP
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Operator
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Metro
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Country
              </th>
              <th className="px-6 py-4 text-right eyebrow font-semibold text-ink-500">
                Reviewed rows
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.ixpSlug}
                className={i < rows.length - 1 ? "border-b border-line/60" : ""}
              >
                <td className="px-6 py-4 text-ink-900">
                  <Link
                    href={`/ixps/${row.ixpSlug}`}
                    className="font-medium underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                  >
                    {row.ixpName}
                  </Link>
                </td>
                <td className="px-6 py-4 text-ink-700">{row.operator}</td>
                <td className="px-6 py-4 text-ink-700">
                  {row.citySlug && row.cityName ? (
                    <Link
                      href={`/cities/${row.citySlug}`}
                      className="underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                    >
                      {row.cityName}
                    </Link>
                  ) : (
                    <span className="text-ink-500">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-ink-700">
                  {row.countrySlug && row.countryName ? (
                    <Link
                      href={`/countries/${row.countrySlug}`}
                      className="underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                    >
                      {row.countryName}
                    </Link>
                  ) : (
                    <span className="text-ink-500">{row.countryCode}</span>
                  )}
                  <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-wider text-ink-300">
                    {row.countryCode}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-xs tabular-nums text-ink-500">
                  {row.reviewedRows}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line px-7 py-4 text-xs italic text-ink-500 md:px-9">
        Built statically from the entity registries and reviewed-row corpus.
        No live telemetry, no traffic figures, no ranking positions.
      </p>
    </section>
  );
}
