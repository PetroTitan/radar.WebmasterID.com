/**
 * Editorial SVG diagram: the geography of AI-capable cloud regions.
 *
 * Three columns:
 *   01  Metros that host all three hyperscalers' general-availability
 *       cloud regions.
 *   02  Metros where one or more provider publishes a separate
 *       AI-instance / accelerator availability layer over those
 *       general-availability regions.
 *   03  Constraints on which metros can scale AI-capable capacity
 *       (power supply, regulation, fibre topology).
 *
 * The diagram is illustrative — not a faithful per-metro accelerator
 * inventory, just a labelled visual that grounds the prose in
 * /guides/ai-infrastructure. Pure server-rendered inline SVG. The
 * platform does not publish per-region accelerator counts; this
 * diagram represents the clustering pattern, not specific numbers.
 */
export function AICapableRegionClusteringDiagram() {
  const COLUMN_W = 220;
  const GUTTER = 24;
  const COL_X = [40, 40 + COLUMN_W + GUTTER, 40 + (COLUMN_W + GUTTER) * 2];

  const columns: ReadonlyArray<{
    readonly key: string;
    readonly title: string;
    readonly sub: string;
    readonly items: ReadonlyArray<string>;
    readonly accent: "ink" | "blue" | "amber";
  }> = [
    {
      key: "general",
      title: "Three-hyperscaler metros",
      sub: "AWS · GCP · Azure GA regions",
      items: ["Frankfurt", "London", "Ashburn", "Singapore", "Tokyo"],
      accent: "ink",
    },
    {
      key: "ai-overlay",
      title: "AI-instance layer",
      sub: "Provider publishes a separate AI-instance directory over the GA region",
      items: [
        "AWS Trainium / Inferentia regions",
        "GCP TPU regions",
        "Azure ND-series regions",
      ],
      accent: "blue",
    },
    {
      key: "constraint",
      title: "Scaling constraints",
      sub: "Where new AI-capable capacity is rate-limited",
      items: [
        "Utility power supply",
        "Grid-interconnect queue depth",
        "Water rights / cooling",
        "Regulator constraints (EU AI Act · Singapore moratorium)",
      ],
      accent: "amber",
    },
  ];

  const STYLES = {
    ink: { fill: "#FFFFFF", stroke: "#475569", text: "#0F172A", badge: "#475569" },
    blue: { fill: "rgba(59,130,246,0.06)", stroke: "#3B82F6", text: "#0F172A", badge: "#3B82F6" },
    amber: { fill: "#FFFBEB", stroke: "#F59E0B", text: "#92400E", badge: "#F59E0B" },
  } as const;

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 760 360"
          role="img"
          aria-label="Three-column model of AI-capable cloud-region geography: metros hosting all three hyperscalers' general-availability regions, the provider-published AI-instance layer over those regions, and the scaling constraints (power, regulation) that limit further build-out."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {columns.map((col, i) => {
            const style = STYLES[col.accent];
            const x = COL_X[i]!;
            const itemRowHeight = 28;
            const headerHeight = 64;
            const bodyHeight = 16 + col.items.length * itemRowHeight + 8;
            const totalHeight = headerHeight + bodyHeight;
            return (
              <g key={col.key}>
                {/* Column shell */}
                <rect
                  x={x}
                  y="32"
                  width={COLUMN_W}
                  height={totalHeight}
                  rx="10"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="1.4"
                />
                {/* Column index badge */}
                <circle cx={x + 18} cy="52" r="11" fill="#FFFFFF" stroke={style.badge} strokeWidth="1.4" />
                <text
                  x={x + 18}
                  y="56"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={style.badge}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text x={x + 38} y="52" fontSize="13" fontWeight="600" fill={style.text}>
                  {col.title}
                </text>
                <text x={x + 38} y="68" fontSize="10.5" fill="#475569">
                  {col.sub}
                </text>
                {/* Items */}
                {col.items.map((item, j) => (
                  <text
                    key={item}
                    x={x + 18}
                    y={32 + headerHeight + 18 + j * itemRowHeight}
                    fontSize="11.5"
                    fill="#0F172A"
                  >
                    · {item}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Connecting arrows between columns */}
          <g stroke="#94A3B8" strokeWidth="1.2" fill="none">
            <path
              d={`M ${COL_X[0]! + COLUMN_W} 90 L ${COL_X[1]!} 90`}
              markerEnd="url(#arrowhead-ai)"
            />
            <path
              d={`M ${COL_X[1]! + COLUMN_W} 90 L ${COL_X[2]!} 90`}
              markerEnd="url(#arrowhead-ai)"
            />
          </g>

          <defs>
            <marker
              id="arrowhead-ai"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
            </marker>
          </defs>

          <text
            x="380"
            y="346"
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill="#94A3B8"
          >
            Editorial schematic. Radar does not publish per-region accelerator counts.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        AI-capable region geography · editorial diagram. Provider-published AI-instance availability overlays the existing three-hyperscaler GA-region clustering rather than producing a separate geography.
      </figcaption>
    </figure>
  );
}
