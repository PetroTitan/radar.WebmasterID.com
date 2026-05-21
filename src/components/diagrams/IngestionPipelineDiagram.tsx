/**
 * Editorial SVG diagram: the Radar ingestion pipeline.
 *
 * Five labelled stages, left to right:
 *   Registered source → Adapter → Generated rows (gitignored)
 *   → Editorial review → Reviewed dataset → Public page
 *
 * Pure server-rendered inline SVG. Visualises the *lifecycle*
 * documented in /docs/data-ingestion.md; not a topology.
 */
export function IngestionPipelineDiagram() {
  const stages: ReadonlyArray<{
    readonly key: string;
    readonly label: string;
    readonly sub: string;
    readonly cx: number;
    readonly accent: "blue" | "amber" | "ink";
  }> = [
    { key: "source", label: "Registered source", sub: "PeeringDB · provider docs", cx: 60, accent: "ink" },
    { key: "adapter", label: "Adapter", sub: "src/ingestion/<slug>", cx: 200, accent: "blue" },
    { key: "generated", label: "Generated rows", sub: "src/generated/ · gitignored", cx: 340, accent: "amber" },
    { key: "review", label: "Editorial review", sub: "Manual, source-checked", cx: 480, accent: "blue" },
    { key: "public", label: "Public page", sub: ".reviewed.ts → rendered", cx: 660, accent: "ink" },
  ];

  const STYLES = {
    blue: { fill: "#FFFFFF", stroke: "#3B82F6", text: "#0F172A" },
    amber: { fill: "#FFFBEB", stroke: "#F59E0B", text: "#92400E" },
    ink: { fill: "#FFFFFF", stroke: "#475569", text: "#0F172A" },
  } as const;

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 260"
          role="img"
          aria-label="Five-stage diagram of the Radar ingestion pipeline: source, adapter, generated rows, editorial review, public page."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* Connecting baseline */}
          <line x1="20" y1="120" x2="700" y2="120" stroke="#E2E8F0" strokeWidth="1" />

          {/* Stages */}
          {stages.map((s, i) => {
            const style = STYLES[s.accent];
            // Custom widths so labels don't collide
            const width = i === 0 ? 110 : i === 4 ? 130 : 130;
            const x = s.cx - width / 2;
            return (
              <g key={s.key}>
                <rect
                  x={x}
                  y="92"
                  width={width}
                  height="56"
                  rx="6"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="1.4"
                />
                <text
                  x={s.cx}
                  y="116"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill={style.text}
                >
                  {s.label}
                </text>
                <text
                  x={s.cx}
                  y="134"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#475569"
                >
                  {s.sub}
                </text>
                {/* Stage number badge */}
                <circle cx={s.cx} cy="72" r="11" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                <text
                  x={s.cx}
                  y="76"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#475569"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}

          {/* Arrows between stages */}
          {stages.slice(0, -1).map((s, i) => {
            const next = stages[i + 1];
            if (!next) return null;
            const fromX = s.cx + (i === 0 ? 55 : 65);
            const toX = next.cx - (i + 1 === 4 ? 65 : 65);
            return (
              <g key={`arrow-${i}`} stroke="#94A3B8" strokeWidth="1.4" fill="none">
                <path d={`M ${fromX} 120 L ${toX} 120`} markerEnd="url(#arrowhead)" />
              </g>
            );
          })}

          <defs>
            <marker
              id="arrowhead"
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

          {/* Boundary annotation */}
          <g>
            <line
              x1="410"
              y1="40"
              x2="410"
              y2="220"
              stroke="#94A3B8"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="265"
              y="34"
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#94A3B8"
            >
              DEVELOPER MACHINE
            </text>
            <text
              x="555"
              y="34"
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#94A3B8"
            >
              GIT-COMMITTED + PUBLIC
            </text>
          </g>

          {/* Bottom legend */}
          <text
            x="360"
            y="208"
            textAnchor="middle"
            fontSize="11"
            fill="#94A3B8"
            fontStyle="italic"
          >
            Public pages render only stage 05. Stages 01–03 never appear in the bundle.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Ingestion pipeline · editorial diagram. The lifecycle is
        documented in full at{" "}
        <code className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-ink-700">
          docs/data-ingestion.md
        </code>
        .
      </figcaption>
    </figure>
  );
}
