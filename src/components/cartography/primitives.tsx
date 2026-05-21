/**
 * Editorial cartography primitives.
 *
 * Self-authored SVG building blocks for the InfrastructureMap
 * diagrams. Every primitive is server-rendered, accepts
 * coordinates on the parent SVG's abstract grid, and emits
 * semantically-tagged elements so AI agents can read the
 * topology without rasterising the SVG.
 *
 * Coordinates are *not* longitude / latitude. They are abstract
 * grid positions chosen for editorial legibility. The platform
 * refuses to imply GIS-grade precision through SVG layout.
 */
import type { ReactElement } from "react";

interface MetroNodeProps {
  readonly cx: number;
  readonly cy: number;
  readonly label: string;
  readonly sub?: string;
  /** Editorial role of the node. */
  readonly role: "primary" | "secondary" | "landing" | "cluster";
  /** Optional label alignment for tight layouts. */
  readonly labelPosition?: "above" | "below" | "right" | "left";
}

/**
 * A metro/landing node on an editorial map.
 *
 * The node is a small filled circle with an attached label;
 * the `role` controls the colour and the optional ring. The
 * label is always horizontal and prefers `right` placement to
 * avoid horizontal label clipping at the edges of the diagram.
 */
export function MetroNode({
  cx,
  cy,
  label,
  sub,
  role,
  labelPosition = "right",
}: MetroNodeProps): ReactElement {
  const styles = {
    primary: { fill: "#0F172A", stroke: "#0F172A", radius: 6, ring: true },
    secondary: { fill: "#475569", stroke: "#475569", radius: 5, ring: false },
    landing: { fill: "#3B82F6", stroke: "#3B82F6", radius: 5, ring: false },
    cluster: { fill: "#F59E0B", stroke: "#F59E0B", radius: 6, ring: true },
  } as const;
  const style = styles[role];

  // Label offsets.
  type SvgTextAnchor = "start" | "middle" | "end";
  const offsets: Readonly<
    Record<
      NonNullable<MetroNodeProps["labelPosition"]>,
      { dx: number; dy: number; anchor: SvgTextAnchor }
    >
  > = {
    above: { dx: 0, dy: -14, anchor: "middle" },
    below: { dx: 0, dy: 18, anchor: "middle" },
    right: { dx: 10, dy: 4, anchor: "start" },
    left: { dx: -10, dy: 4, anchor: "end" },
  };
  const offset = offsets[labelPosition];

  return (
    <g data-radar-metro-node={role} data-metro-label={label}>
      {style.ring ? (
        <circle
          cx={cx}
          cy={cy}
          r={style.radius + 4}
          fill="none"
          stroke={style.stroke}
          strokeWidth="1"
          strokeOpacity="0.35"
        />
      ) : null}
      <circle cx={cx} cy={cy} r={style.radius} fill={style.fill} />
      <text
        x={cx + offset.dx}
        y={cy + offset.dy}
        fontSize="11.5"
        fontWeight="600"
        fill="#0F172A"
        textAnchor={offset.anchor}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={cx + offset.dx}
          y={cy + offset.dy + 14}
          fontSize="10"
          fill="#475569"
          textAnchor={offset.anchor}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

interface CorridorLineProps {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  /** Editorial intensity. Higher = more emphatic stroke. */
  readonly intensity?: "primary" | "secondary" | "subsea";
  readonly label?: string;
  /** When `curve > 0`, the line bows along its mid-point so the
   *  diagram avoids implying a straight Great Circle. Used on
   *  subsea routes where the actual path is abstracted. */
  readonly curve?: number;
}

/**
 * A corridor / route line between two nodes.
 *
 * For subsea corridors, prefer `intensity="subsea"` and a
 * non-zero `curve` value. The platform refuses to draw straight
 * lines between subsea landings — false precision is a
 * cartography-style failure mode for this layer.
 */
export function CorridorLine({
  x1,
  y1,
  x2,
  y2,
  intensity = "primary",
  label,
  curve = 0,
}: CorridorLineProps): ReactElement {
  const styles = {
    primary: { stroke: "#0F172A", width: 1.6, opacity: 0.9, dash: "none" as const },
    secondary: { stroke: "#475569", width: 1.2, opacity: 0.7, dash: "none" as const },
    subsea: { stroke: "#3B82F6", width: 1.4, opacity: 0.7, dash: "4 3" as const },
  } as const;
  const style = styles[intensity];
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + curve;
  const d = curve
    ? `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y2}`;

  return (
    <g data-radar-corridor={intensity} data-corridor-label={label ?? ""}>
      <path
        d={d}
        fill="none"
        stroke={style.stroke}
        strokeWidth={style.width}
        strokeOpacity={style.opacity}
        strokeDasharray={style.dash}
      />
      {label ? (
        <text
          x={midX}
          y={midY - 6}
          fontSize="10"
          fill="#475569"
          textAnchor="middle"
          fontStyle="italic"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

interface InfrastructureLegendProps {
  readonly x: number;
  readonly y: number;
  readonly items: ReadonlyArray<{
    readonly key: string;
    readonly label: string;
    readonly role: MetroNodeProps["role"] | "corridor-primary" | "corridor-secondary" | "corridor-subsea";
  }>;
}

/**
 * Editorial legend keyed to the primitives' role vocabulary.
 *
 * Renders directly into the parent SVG; positioning is by
 * absolute (x, y) on the parent's grid. Each entry uses a
 * miniature version of its corresponding primitive so the
 * legend itself is part of the SVG and remains readable when
 * the map is exported.
 */
export function InfrastructureLegend({
  x,
  y,
  items,
}: InfrastructureLegendProps): ReactElement {
  const row = 22;
  return (
    <g data-radar-map-legend="true">
      <text
        x={x}
        y={y - 8}
        fontSize="10.5"
        fontWeight="600"
        fill="#94A3B8"
        style={{ textTransform: "uppercase" }}
      >
        LEGEND
      </text>
      {items.map((item, i) => {
        const cy = y + i * row + 8;
        let glyph: ReactElement;
        if (item.role === "corridor-primary") {
          glyph = (
            <line x1={x} y1={cy} x2={x + 24} y2={cy} stroke="#0F172A" strokeWidth="1.6" />
          );
        } else if (item.role === "corridor-secondary") {
          glyph = (
            <line x1={x} y1={cy} x2={x + 24} y2={cy} stroke="#475569" strokeWidth="1.2" />
          );
        } else if (item.role === "corridor-subsea") {
          glyph = (
            <line
              x1={x}
              y1={cy}
              x2={x + 24}
              y2={cy}
              stroke="#3B82F6"
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
          );
        } else {
          const fill =
            item.role === "primary"
              ? "#0F172A"
              : item.role === "secondary"
                ? "#475569"
                : item.role === "landing"
                  ? "#3B82F6"
                  : "#F59E0B";
          glyph = <circle cx={x + 12} cy={cy} r="5" fill={fill} />;
        }
        return (
          <g key={item.key}>
            {glyph}
            <text x={x + 36} y={cy + 4} fontSize="11" fill="#0F172A">
              {item.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
