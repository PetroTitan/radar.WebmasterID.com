/**
 * Editorial SVG diagram: the transatlantic subsea-cable corridor
 * across three structural eras.
 *
 * Three horizontal swimlanes:
 *   01  Telco-consortium era    (1988 — early 2000s)
 *   02  Consolidation period    (2000s — early 2010s)
 *   03  Cloud-funded era        (mid-2010s — present)
 *
 * The diagram is illustrative — not a faithful cable map, just a
 * labelled visual that grounds the prose explanation in
 * /history/transatlantic-cables. Pure server-rendered inline SVG.
 */
export function TransatlanticCableHistoryDiagram() {
  const lanes: ReadonlyArray<{
    readonly key: string;
    readonly label: string;
    readonly span: string;
    readonly accent: "blue" | "amber" | "ink";
    readonly example: string;
  }> = [
    {
      key: "consortium",
      label: "Telco-consortium era",
      span: "1988 — early 2000s",
      accent: "ink",
      example: "TAT-8 through TAT-14",
    },
    {
      key: "consolidation",
      label: "Consolidation period",
      span: "2000s — early 2010s",
      accent: "amber",
      example: "Capacity surplus; mergers reshape carrier ownership",
    },
    {
      key: "cloud-funded",
      label: "Cloud-funded era",
      span: "mid-2010s — present",
      accent: "blue",
      example: "MAREA · Dunant · Grace Hopper · Amitié",
    },
  ];

  const STYLES = {
    blue: { fill: "#FFFFFF", stroke: "#3B82F6", text: "#0F172A", accent: "#3B82F6" },
    amber: { fill: "#FFFBEB", stroke: "#F59E0B", text: "#92400E", accent: "#F59E0B" },
    ink: { fill: "#FFFFFF", stroke: "#475569", text: "#0F172A", accent: "#475569" },
  } as const;

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 340"
          role="img"
          aria-label="Three-era diagram of the transatlantic subsea-cable corridor: telco-consortium era, consolidation period, and cloud-funded era."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* Header coastline labels */}
          <text
            x="60"
            y="34"
            fontSize="11"
            fontWeight="600"
            fill="#94A3B8"
          >
            US east coast
          </text>
          <text
            x="660"
            y="34"
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            fill="#94A3B8"
          >
            Western Europe
          </text>

          {/* Coastline guides (left + right) */}
          <line x1="60" y1="50" x2="60" y2="320" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="660" y1="50" x2="660" y2="320" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 3" />

          {/* Swim-lane rows */}
          {lanes.map((lane, i) => {
            const style = STYLES[lane.accent];
            const cy = 90 + i * 80;
            return (
              <g key={lane.key}>
                {/* Lane background */}
                <rect
                  x="60"
                  y={cy - 30}
                  width="600"
                  height="60"
                  rx="8"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="1.4"
                />
                {/* Era index badge */}
                <circle cx="84" cy={cy} r="13" fill="#FFFFFF" stroke={style.accent} strokeWidth="1.4" />
                <text
                  x="84"
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={style.accent}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                {/* Lane label */}
                <text x="112" y={cy - 6} fontSize="13" fontWeight="600" fill={style.text}>
                  {lane.label}
                </text>
                <text x="112" y={cy + 12} fontSize="11" fill="#475569">
                  {lane.span}
                </text>
                <text x="112" y={cy + 26} fontSize="10.5" fill="#475569" fontStyle="italic">
                  {lane.example}
                </text>
                {/* A cable line crossing the lane */}
                <path
                  d={`M 96 ${cy} Q 360 ${cy + (i === 1 ? 12 : -6)} 644 ${cy}`}
                  fill="none"
                  stroke={style.accent}
                  strokeWidth="1.6"
                  strokeDasharray={i === 1 ? "4 2" : "none"}
                />
              </g>
            );
          })}

          <text
            x="360"
            y="330"
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill="#94A3B8"
          >
            Editorial schematic. Cable polylines and counts not to scale.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Transatlantic subsea-cable corridor across three structural
        eras · editorial diagram. The cloud-funded era is the third
        structural shift in the corridor since 1988.
      </figcaption>
    </figure>
  );
}
