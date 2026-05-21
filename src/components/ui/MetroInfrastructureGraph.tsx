import Link from "next/link";
import {
  DATACENTER_FACILITIES,
  IXPS,
  getCity,
  getCountryByCode,
} from "@/data";
import { REVIEWED_CLOUD_REGIONS } from "@/data/research";

interface MetroInfrastructureGraphProps {
  /** City slug to scope the graph to. */
  readonly citySlug: string;
  readonly heading?: string;
}

/**
 * Static "metro infrastructure" surface — a single-table view of
 * every Radar-registered facility, IXP, and reviewed cloud region
 * anchored at the given metro.
 *
 * Built statically at render time from the registries; no graph
 * library, no client JS, no telemetry. The component is omitted
 * entirely when the metro has no associated entries.
 */
export function MetroInfrastructureGraph({
  citySlug,
  heading = "Metro infrastructure graph",
}: MetroInfrastructureGraphProps) {
  const city = getCity(citySlug);
  if (!city) return null;
  const country = getCountryByCode(city.countryCode);

  const facilities = DATACENTER_FACILITIES.filter(
    (f) => f.citySlug === citySlug,
  );
  const ixps = IXPS.filter((i) => i.citySlug === citySlug);
  const cloudRegions = REVIEWED_CLOUD_REGIONS.filter(
    (r) => r.metroSlug === citySlug,
  );

  const totalRows = facilities.length + ixps.length + cloudRegions.length;
  if (totalRows === 0) return null;

  return (
    <section
      data-radar-metro-infrastructure-graph="true"
      aria-label={heading}
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        {heading} · {city.name}
        {country ? <span className="ml-2 text-ink-300">({country.code})</span> : null}
      </h2>
      <div className="overflow-x-auto">
        <table className="num w-full border-collapse text-[0.9375rem]">
          <thead>
            <tr className="border-b border-line bg-surface-subtle">
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Layer
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Entity
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Operator / provider
              </th>
              <th className="px-6 py-4 text-left eyebrow font-semibold text-ink-500">
                Source
              </th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((f) => (
              <tr key={`fac-${f.slug}`} className="border-b border-line/60">
                <td className="px-6 py-4">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-500">
                    Facility
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/facilities/${f.slug}`}
                    className="font-medium text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                  >
                    {f.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-ink-700">{f.operator}</td>
                <td className="px-6 py-4 text-sm text-ink-500">
                  PeeringDB + operator
                </td>
              </tr>
            ))}
            {ixps.map((i) => (
              <tr key={`ixp-${i.slug}`} className="border-b border-line/60">
                <td className="px-6 py-4">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-accent-600">
                    IXP
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/ixps/${i.slug}`}
                    className="font-medium text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                  >
                    {i.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-ink-700">{i.operator}</td>
                <td className="px-6 py-4 text-sm text-ink-500">
                  PeeringDB + operator
                </td>
              </tr>
            ))}
            {cloudRegions.map((r) => (
              <tr key={`reg-${r.id}`} className="border-b border-line/60">
                <td className="px-6 py-4">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-amber-600">
                    Cloud region
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-ink-900">
                    {r.regionCode}
                  </span>
                  <span className="ml-2 text-ink-500">— {r.displayName}</span>
                </td>
                <td className="px-6 py-4 text-ink-700 uppercase">{r.provider}</td>
                <td className="px-6 py-4 text-sm">
                  <a
                    href={r.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-500 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                  >
                    {r.rawSourceName}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line px-7 py-4 text-xs italic text-ink-500 md:px-9">
        Built statically from the entity registries and reviewed-row
        corpus. No live telemetry, no traffic figures, no ranking
        positions.
      </p>
    </section>
  );
}
