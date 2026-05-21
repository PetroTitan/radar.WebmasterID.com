/**
 * Editorial SVG diagram: the layered model of infrastructure
 * redundancy.
 *
 * Illustrative — five labelled layers stacked vertically, each
 * representing a failure domain that redundant architectures
 * design around: facility, metro, region, route, and operator.
 *
 * The diagram complements the infrastructure-redundancy guide;
 * it visualises a *frame*, not a topology.
 */
export function InfrastructureRedundancyDiagram() {
  const layers: ReadonlyArray<{
    readonly key: string;
    readonly label: string;
    readonly sub: string;
    readonly cy: number;
    readonly accent: "blue" | "amber" | "ink";
  }> = [
    {
      key: "facility",
      label: "Facility",
      sub: "Single colocation building or AZ",
      cy: 60,
      accent: "blue",
    },
    {
      key: "metro",
      label: "Metro",
      sub: "Multiple facilities in the same metro",
      cy: 120,
      accent: "blue",
    },
    {
      key: "region",
      label: "Region",
      sub: "Geographically separated regions",
      cy: 180,
      accent: "amber",
    },
    {
      key: "route",
      label: "Route diversity",
      sub: "Independent fibre paths between sites",
      cy: 240,
      accent: "amber",
    },
    {
      key: "operator",
      label: "Operator diversity",
      sub: "Capacity across different providers",
      cy: 300,
      accent: "ink",
    },
  ];

  const STYLES = {
    blue: { fill: "#FFFFFF", stroke: "#3B82F6", text: "#0F172A", badge: "#3B82F6" },
    amber: { fill: "#FFFBEB", stroke: "#F59E0B", text: "#92400E", badge: "#F59E0B" },
    ink: { fill: "#FFFFFF", stroke: "#475569", text: "#0F172A", badge: "#475569" },
  } as const;

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 360"
          role="img"
          aria-label="Five layers of infrastructure redundancy: facility, metro, region, route, and operator."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* Centre column guide */}
          <line x1="360" y1="20" x2="360" y2="340" stroke="#E2E8F0" strokeWidth="1" />

          {layers.map((l, i) => {
            const style = STYLES[l.accent];
            return (
              <g key={l.key}>
                <rect
                  x="160"
                  y={l.cy - 18}
                  width="400"
                  height="36"
                  rx="8"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="1.4"
                />
                <text
                  x="200"
                  y={l.cy + 4}
                  fontSize="13"
                  fontWeight="600"
                  fill={style.text}
                >
                  {l.label}
                </text>
                <text
                  x="200"
                  y={l.cy + 4}
                  fontSize="11"
                  fill="#475569"
                  dx="100"
                >
                  {l.sub}
                </text>
                {/* Layer index badge */}
                <circle cx="130" cy={l.cy} r="13" fill="#FFFFFF" stroke={style.badge} strokeWidth="1.4" />
                <text
                  x="130"
                  y={l.cy + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={style.badge}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}

          {/* Header label */}
          <text
            x="360"
            y="32"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#94A3B8"
          >
            FAILURE DOMAIN
          </text>
          <text
            x="360"
            y="350"
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill="#475569"
          >
            Independent layers stack — each adds resilience against a different class of failure.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Infrastructure redundancy model · editorial diagram. Each layer addresses a distinct class of failure; layered together they define a system&apos;s failure tolerance.
      </figcaption>
    </figure>
  );
}
