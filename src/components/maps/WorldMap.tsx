import type { GeoCoordinates } from "@/entities";

/**
 * Pure server-rendered SVG world map.
 *
 * Editorial intelligence aesthetic: an abstract longitude / latitude
 * grid with verified entity dots projected via equirectangular.
 * Zero JS, zero client hydration, zero new dependencies, zero
 * external tile requests. The map is part of the page's HTML.
 *
 * Trade-off: there are no country outlines. The grid provides
 * geographic reference; the labelled list below the map (see
 * MapPointsList) carries lookup. This is a deliberate
 * institutional-platform aesthetic — closer to academic
 * infrastructure maps than consumer geographic UI.
 */

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 600;
// Trim Antarctica so the visible band is roughly -60° to 85° latitude.
const LAT_MIN = -60;
const LAT_MAX = 85;

export type MapPointVariant =
  | "city"
  | "ixp"
  | "cloud-region"
  | "cable-landing"
  | "country";

export interface MapPoint {
  readonly id: string;
  readonly coordinates: GeoCoordinates;
  readonly label: string;
  readonly subLabel?: string;
  readonly variant?: MapPointVariant;
  /** Render the label to the left of the dot instead of the right.
   *  Set for points that crowd the eastern edge. */
  readonly labelLeft?: boolean;
}

interface WorldMapProps {
  readonly points: ReadonlyArray<MapPoint>;
  readonly caption: string;
  /** Optional polyline pairs for things like cable landings or
   *  great-circle routes. Drawn as straight projected lines for
   *  v1 — no great-circle interpolation. */
  readonly lines?: ReadonlyArray<{
    readonly id: string;
    readonly from: GeoCoordinates;
    readonly to: GeoCoordinates;
  }>;
}

function projectLat(lat: number): number {
  // Map LAT_MAX to 0 (top) and LAT_MIN to MAP_HEIGHT (bottom).
  const clamped = Math.max(LAT_MIN, Math.min(LAT_MAX, lat));
  return ((LAT_MAX - clamped) / (LAT_MAX - LAT_MIN)) * MAP_HEIGHT;
}

function projectLon(lon: number): number {
  // -180 → 0, 180 → MAP_WIDTH
  return ((lon + 180) / 360) * MAP_WIDTH;
}

function project(c: GeoCoordinates): { x: number; y: number } {
  return { x: projectLon(c.lon), y: projectLat(c.lat) };
}

const VARIANT_STYLE: Readonly<Record<MapPointVariant, {
  readonly fill: string;
  readonly stroke: string;
  readonly radius: number;
}>> = {
  city: { fill: "#2563EB", stroke: "#FFFFFF", radius: 6 },
  ixp: { fill: "#F59E0B", stroke: "#FFFFFF", radius: 7 },
  "cloud-region": { fill: "#3B82F6", stroke: "#FFFFFF", radius: 6 },
  "cable-landing": { fill: "#22D3EE", stroke: "#FFFFFF", radius: 6 },
  country: { fill: "#94A3B8", stroke: "#FFFFFF", radius: 5 },
};

export function WorldMap({ points, caption, lines = [] }: WorldMapProps) {
  // Vertical grid every 30° lon
  const verticalGrid: number[] = [];
  for (let lon = -150; lon <= 150; lon += 30) verticalGrid.push(lon);

  // Horizontal grid every 30° lat
  const horizontalGrid: number[] = [];
  for (let lat = -60; lat <= 60; lat += 30) horizontalGrid.push(lat);

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={caption}
          className="block h-auto w-full"
        >
          {/* Map background */}
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#F5F7FA" />

          {/* Grid */}
          <g stroke="#E2E8F0" strokeWidth="1">
            {verticalGrid.map((lon) => {
              const x = projectLon(lon);
              return (
                <line key={`v${lon}`} x1={x} y1={0} x2={x} y2={MAP_HEIGHT} />
              );
            })}
            {horizontalGrid.map((lat) => {
              const y = projectLat(lat);
              return (
                <line key={`h${lat}`} x1={0} y1={y} x2={MAP_WIDTH} y2={y} />
              );
            })}
          </g>

          {/* Equator + prime meridian — slightly stronger */}
          <g stroke="#CBD5E1" strokeWidth="1.2">
            <line
              x1={0}
              y1={projectLat(0)}
              x2={MAP_WIDTH}
              y2={projectLat(0)}
            />
            <line
              x1={projectLon(0)}
              y1={0}
              x2={projectLon(0)}
              y2={MAP_HEIGHT}
            />
          </g>

          {/* Axis labels */}
          <g
            fill="#94A3B8"
            fontSize="14"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {verticalGrid.map((lon) => {
              const x = projectLon(lon);
              return (
                <text key={`vl${lon}`} x={x + 4} y={14} textAnchor="start">
                  {lon > 0 ? `${lon}°E` : lon < 0 ? `${Math.abs(lon)}°W` : "0°"}
                </text>
              );
            })}
            {horizontalGrid.map((lat) => {
              const y = projectLat(lat);
              return (
                <text
                  key={`hl${lat}`}
                  x={6}
                  y={y - 4}
                  textAnchor="start"
                >
                  {lat > 0 ? `${lat}°N` : lat < 0 ? `${Math.abs(lat)}°S` : "0°"}
                </text>
              );
            })}
          </g>

          {/* Lines (cable / route hints) */}
          {lines.length > 0 ? (
            <g stroke="#22D3EE" strokeWidth="1.4" strokeLinecap="round" opacity="0.6">
              {lines.map((l) => {
                const a = project(l.from);
                const b = project(l.to);
                return (
                  <line key={l.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                );
              })}
            </g>
          ) : null}

          {/* Points */}
          <g>
            {points.map((p) => {
              const { x, y } = project(p.coordinates);
              const variant = p.variant ?? "city";
              const style = VARIANT_STYLE[variant];
              const labelX = p.labelLeft ? x - style.radius - 6 : x + style.radius + 6;
              const labelAnchor = p.labelLeft ? "end" : "start";
              return (
                <g key={p.id}>
                  {/* Halo for emphasis */}
                  <circle
                    cx={x}
                    cy={y}
                    r={style.radius + 4}
                    fill={style.fill}
                    opacity="0.18"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={style.radius}
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth="2"
                  />
                  <text
                    x={labelX}
                    y={y + 4}
                    fontSize="16"
                    fontWeight="600"
                    fill="#0F172A"
                    textAnchor={labelAnchor}
                  >
                    {p.label}
                  </text>
                  {p.subLabel ? (
                    <text
                      x={labelX}
                      y={y + 22}
                      fontSize="13"
                      fill="#475569"
                      textAnchor={labelAnchor}
                    >
                      {p.subLabel}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        {caption} · Projection: equirectangular, abstract grid. The list
        below documents every plotted point with its registered source.
      </figcaption>
    </figure>
  );
}
