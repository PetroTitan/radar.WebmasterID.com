/**
 * Editorial SVG diagram: the metro-level datacenter ecosystem
 * graph.
 *
 * Three concentric tiers:
 *   01  Metro substrate          (carrier-neutral facilities)
 *   02  Interconnection fabric   (IXPs)
 *   03  Cloud on-ramp surface    (hyperscaler regions)
 *
 * The diagram is illustrative — not a faithful topology, just a
 * labelled visual that grounds the prose on
 * /guides/datacenter-hubs and /guides/carrier-neutrality.
 * Pure server-rendered inline SVG.
 */
export function EcosystemTopologyDiagram() {
  const tiers: ReadonlyArray<{
    readonly key: string;
    readonly label: string;
    readonly sub: string;
    readonly radius: number;
    readonly accent: "blue" | "amber" | "ink";
  }> = [
    {
      key: "cloud",
      label: "Cloud on-ramp surface",
      sub: "Hyperscaler regions reachable via on-ramps in the metro",
      radius: 150,
      accent: "amber",
    },
    {
      key: "ix",
      label: "Interconnection fabric",
      sub: "IXP nodes spanning multiple carrier-neutral buildings",
      radius: 100,
      accent: "blue",
    },
    {
      key: "metro",
      label: "Metro substrate",
      sub: "Carrier-neutral facilities — Equinix, Digital Realty, NTT, etc.",
      radius: 55,
      accent: "ink",
    },
  ];

  const STYLES = {
    blue: { fill: "rgba(59,130,246,0.06)", stroke: "#3B82F6", text: "#0F172A" },
    amber: { fill: "rgba(245,158,11,0.08)", stroke: "#F59E0B", text: "#92400E" },
    ink: { fill: "#FFFFFF", stroke: "#475569", text: "#0F172A" },
  } as const;

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 380"
          role="img"
          aria-label="Concentric three-tier metro infrastructure model: metro substrate (carrier-neutral facilities) at the centre, interconnection fabric (IXPs) around it, cloud on-ramp surface (hyperscaler regions) on the outside."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* Concentric tiers */}
          {tiers.map((t) => {
            const style = STYLES[t.accent];
            return (
              <circle
                key={t.key}
                cx="220"
                cy="190"
                r={t.radius}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth="1.6"
              />
            );
          })}
          {/* Centre label */}
          <text x="220" y="186" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F172A">
            Metro
          </text>
          <text x="220" y="202" textAnchor="middle" fontSize="11" fill="#475569">
            substrate
          </text>

          {/* Legend column */}
          <g>
            <text x="430" y="56" fontSize="11" fontWeight="600" fill="#94A3B8">
              ECOSYSTEM TIERS
            </text>
            {tiers
              .slice()
              .reverse()
              .map((t, i) => {
                const style = STYLES[t.accent];
                const cy = 96 + i * 96;
                return (
                  <g key={`legend-${t.key}`}>
                    <circle cx="446" cy={cy} r="10" fill={style.fill} stroke={style.stroke} strokeWidth="1.4" />
                    <text x="468" y={cy - 6} fontSize="13" fontWeight="600" fill={style.text}>
                      {t.label}
                    </text>
                    <text x="468" y={cy + 10} fontSize="11" fill="#475569">
                      {t.sub}
                    </text>
                    <text x="468" y={cy + 26} fontSize="10.5" fontStyle="italic" fill="#475569">
                      {i === 0
                        ? "Inner ring — base layer."
                        : i === 1
                          ? "Middle ring — peering."
                          : "Outer ring — cloud reach."}
                    </text>
                  </g>
                );
              })}
          </g>

          <text x="220" y="362" textAnchor="middle" fontSize="11" fontStyle="italic" fill="#94A3B8">
            Editorial schematic. Tier radii not to scale.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Metro datacenter-ecosystem model · editorial diagram. The
        substrate is the carrier-neutral facility cluster; the
        interconnection fabric and the cloud on-ramp surface stack
        on top of it.
      </figcaption>
    </figure>
  );
}
