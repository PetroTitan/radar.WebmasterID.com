/**
 * Editorial SVG diagram: the carrier-neutral facility model.
 *
 * Illustrative — shows a single colocation building (centre)
 * hosting multiple independent networks side-by-side (left and
 * right), all reaching each other through the building's cross
 * connects without paying the building's operator for
 * connectivity. A regional comparison with a carrier-owned
 * building (bottom) annotates why neutrality changes the
 * economics.
 *
 * Pure server-rendered inline SVG. Visualises a *model*, not a
 * topology.
 */
export function CarrierNeutralFacilityDiagram() {
  const tenants: ReadonlyArray<{
    readonly key: string;
    readonly label: string;
    readonly cx: number;
    readonly side: "left" | "right";
  }> = [
    { key: "isp-a", label: "Eyeball ISP", cx: 80, side: "left" },
    { key: "isp-b", label: "Transit", cx: 80, side: "left" },
    { key: "isp-c", label: "Enterprise", cx: 80, side: "left" },
    { key: "content-a", label: "Content network", cx: 640, side: "right" },
    { key: "content-b", label: "Cloud on-ramp", cx: 640, side: "right" },
    { key: "content-c", label: "CDN", cx: 640, side: "right" },
  ];

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 340"
          role="img"
          aria-label="Carrier-neutral colocation facility hosting independent networks side by side, all reaching each other via cross connects."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* Facility (centre) */}
          <g>
            <rect
              x="240"
              y="110"
              width="240"
              height="120"
              rx="10"
              fill="#FFFFFF"
              stroke="#3B82F6"
              strokeWidth="1.6"
            />
            <text
              x="360"
              y="142"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#0F172A"
            >
              Carrier-neutral facility
            </text>
            <text x="360" y="162" textAnchor="middle" fontSize="11" fill="#475569">
              Operator does not sell connectivity
            </text>
            <text x="360" y="186" textAnchor="middle" fontSize="11" fill="#475569">
              Tenants reach each other via cross connects
            </text>
            <text x="360" y="210" textAnchor="middle" fontSize="11" fontStyle="italic" fill="#475569">
              Power · space · cooling only
            </text>
          </g>

          {/* Tenants */}
          {tenants.map((t, i) => {
            const cy = 90 + (i % 3) * 60;
            return (
              <g key={t.key}>
                <rect
                  x={t.cx - 60}
                  y={cy - 18}
                  width="120"
                  height="36"
                  rx="6"
                  fill="#FFFFFF"
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                />
                <text
                  x={t.cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#0F172A"
                  fontWeight="500"
                >
                  {t.label}
                </text>
                <line
                  x1={t.side === "left" ? t.cx + 60 : t.cx - 60}
                  y1={cy}
                  x2={t.side === "left" ? 240 : 480}
                  y2={cy < 160 ? 140 : cy > 180 ? 200 : 170}
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
              </g>
            );
          })}

          {/* Comparison box (bottom) */}
          <g>
            <rect
              x="120"
              y="265"
              width="480"
              height="56"
              rx="8"
              fill="#FFFBEB"
              stroke="#F59E0B"
              strokeWidth="1.2"
            />
            <text
              x="360"
              y="287"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#92400E"
            >
              Carrier-owned facility (for contrast)
            </text>
            <text
              x="360"
              y="305"
              textAnchor="middle"
              fontSize="10.5"
              fill="#92400E"
            >
              Connectivity bundled with the operator. Tenants buy bandwidth from the building itself.
            </text>
          </g>

          {/* Headline labels */}
          <text x="80" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">
            Networks (left side)
          </text>
          <text x="640" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">
            Networks (right side)
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Carrier-neutral facility model · editorial diagram. The
        neutrality of the building is what enables cross-tenant peering at scale.
      </figcaption>
    </figure>
  );
}
