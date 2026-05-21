/**
 * Editorial SVG diagram: how a submarine cable system reaches the
 * internet — from open sea to coastal landing station to inland
 * backhaul to the interconnection metro.
 *
 * Institutional / illustrative. Not a geographic map; a
 * left-to-right schematic of the four stages.
 */
export function CableLandingDiagram() {
  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 280"
          role="img"
          aria-label="Schematic of how a submarine cable system reaches the internet: open sea, coastal landing station, inland fibre, interconnection metro."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* Subtle wave / open-sea shading */}
          <g>
            <rect x="0" y="120" width="180" height="100" fill="#CFFAFE" opacity="0.5" />
            <path
              d="M 0 150 Q 30 145 60 150 T 120 150 T 180 150"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="1.4"
              opacity="0.7"
            />
          </g>

          {/* Cable system (open sea) */}
          <g>
            <text x="90" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F172A">
              Cable system
            </text>
            <text x="90" y="118" textAnchor="middle" fontSize="11" fill="#475569">
              Submarine fibre
            </text>
            <rect x="22" y="180" width="136" height="14" rx="4" fill="#22D3EE" />
          </g>

          {/* Cable run line out of water */}
          <path
            d="M 158 187 L 250 187"
            stroke="#22D3EE"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Landing station */}
          <g>
            <rect
              x="240"
              y="160"
              width="120"
              height="54"
              rx="6"
              fill="#FFFFFF"
              stroke="#3B82F6"
              strokeWidth="1.6"
            />
            <text x="300" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F172A">
              Landing station
            </text>
            <text x="300" y="202" textAnchor="middle" fontSize="11" fill="#475569">
              Coastal facility
            </text>
            <text x="300" y="142" textAnchor="middle" fontSize="11" fontStyle="italic" fill="#94A3B8">
              e.g. Virginia Beach
            </text>
          </g>

          {/* Inland backhaul line */}
          <path
            d="M 360 187 L 460 187"
            stroke="#3B82F6"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="0"
          />
          <text x="410" y="174" textAnchor="middle" fontSize="11" fill="#3B82F6" fontWeight="600">
            Inland fibre
          </text>

          {/* Interconnection metro */}
          <g>
            <rect
              x="460"
              y="160"
              width="220"
              height="54"
              rx="6"
              fill="#EFF6FF"
              stroke="#3B82F6"
              strokeWidth="1.6"
            />
            <text x="570" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F172A">
              Interconnection metro
            </text>
            <text x="570" y="202" textAnchor="middle" fontSize="11" fill="#475569">
              Carrier-neutral colocation · IXP · cloud on-ramps
            </text>
            <text x="570" y="142" textAnchor="middle" fontSize="11" fontStyle="italic" fill="#94A3B8">
              e.g. Ashburn
            </text>
          </g>

          {/* Bottom caption */}
          <text
            x="360"
            y="252"
            textAnchor="middle"
            fontSize="11"
            fill="#94A3B8"
            fontStyle="italic"
          >
            Schematic only. Cable lengths, landing-station distance, and metro positions
            are illustrative.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Cable-landing topology · editorial diagram. The four-stage path
        (open sea, landing station, inland fibre, interconnection metro)
        is documented across TeleGeography&apos;s published reporting and
        PeeringDB&apos;s facility records.
      </figcaption>
    </figure>
  );
}
