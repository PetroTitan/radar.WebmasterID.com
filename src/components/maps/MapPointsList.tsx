import Link from "next/link";
import type { MapPoint } from "./WorldMap";

interface MapPointsListProps {
  readonly points: ReadonlyArray<
    MapPoint & {
      readonly href?: string;
      readonly note?: string;
    }
  >;
  readonly caption?: string;
}

/**
 * Tabular companion to the WorldMap.
 *
 * The map is decorative for screen readers; this list carries the
 * accessible, citable data: name, coordinates, optional editorial
 * note, and a link to the entity page where the cited sources live.
 *
 * Coordinates are rendered in decimal degrees with 2 dp — enough
 * for metro-level identification, not so much that they imply
 * facility-level precision.
 */
export function MapPointsList({ points, caption }: MapPointsListProps) {
  if (points.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface-base">
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
              Entity
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left eyebrow font-semibold text-ink-500"
            >
              Coordinates
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left eyebrow font-semibold text-ink-500"
            >
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {points.map((p, i) => (
            <tr
              key={p.id}
              className={
                i < points.length - 1 ? "border-b border-line/60" : ""
              }
            >
              <td className="whitespace-nowrap px-6 py-4 text-ink-900">
                {p.href ? (
                  <Link
                    href={p.href}
                    className="font-medium text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
                  >
                    {p.label}
                  </Link>
                ) : (
                  <span className="font-medium">{p.label}</span>
                )}
                {p.subLabel ? (
                  <span className="mt-0.5 block text-xs text-ink-500">
                    {p.subLabel}
                  </span>
                ) : null}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-ink-700">
                {p.coordinates.lat.toFixed(2)}°
                {p.coordinates.lat >= 0 ? "N" : "S"}
                {", "}
                {Math.abs(p.coordinates.lon).toFixed(2)}°
                {p.coordinates.lon >= 0 ? "E" : "W"}
              </td>
              <td className="px-6 py-4 text-sm text-ink-500">
                {p.note ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
