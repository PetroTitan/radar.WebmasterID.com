/**
 * Editorial SVG diagram: how networks interconnect at an Internet
 * Exchange Point versus via a transit provider.
 *
 * The diagram is institutional / illustrative — not a faithful
 * topology, just a labelled visual that grounds the prose
 * explanation. Pure server-rendered SVG.
 *
 * Layout: two networks (left and right) connect to an IXP fabric
 * (centre) for direct peering. A transit provider (top) is shown
 * as the alternative routing path, with a small "transit cost"
 * label distinguishing it from the settlement-free peering through
 * the IXP.
 */
export function InterconnectionDiagram() {
  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="Two networks interconnecting at an Internet Exchange Point, versus the alternative routing path through a transit provider."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* IXP fabric (center) */}
          <g>
            <rect
              x="280"
              y="180"
              width="160"
              height="64"
              rx="8"
              fill="#FFFFFF"
              stroke="#3B82F6"
              strokeWidth="1.6"
            />
            <text
              x="360"
              y="208"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#0F172A"
            >
              IXP fabric
            </text>
            <text x="360" y="228" textAnchor="middle" fontSize="12" fill="#475569">
              Layer-2 switch
            </text>
          </g>

          {/* Network A (left) */}
          <g>
            <circle cx="80" cy="212" r="38" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.4" />
            <text x="80" y="208" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F172A">
              Network A
            </text>
            <text x="80" y="226" textAnchor="middle" fontSize="11" fill="#475569">
              ISP / content
            </text>
          </g>

          {/* Network B (right) */}
          <g>
            <circle cx="640" cy="212" r="38" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.4" />
            <text x="640" y="208" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F172A">
              Network B
            </text>
            <text x="640" y="226" textAnchor="middle" fontSize="11" fill="#475569">
              ISP / content
            </text>
          </g>

          {/* Transit provider (top) */}
          <g>
            <rect
              x="300"
              y="40"
              width="120"
              height="48"
              rx="6"
              fill="#FEF3C7"
              stroke="#F59E0B"
              strokeWidth="1.4"
            />
            <text
              x="360"
              y="62"
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="#92400E"
            >
              Transit
            </text>
            <text x="360" y="78" textAnchor="middle" fontSize="11" fill="#92400E">
              Pay-per-bit
            </text>
          </g>

          {/* Connections to IXP (peering) */}
          <g stroke="#3B82F6" strokeWidth="2" fill="none">
            <path d="M 118 212 L 280 212" />
            <path d="M 602 212 L 440 212" />
          </g>
          <g fill="#3B82F6" fontSize="11" fontWeight="600">
            <text x="200" y="200" textAnchor="middle">
              Peering · settlement-free
            </text>
            <text x="520" y="200" textAnchor="middle">
              Peering · settlement-free
            </text>
          </g>

          {/* Alternative paths via transit */}
          <g stroke="#F59E0B" strokeWidth="1.6" strokeDasharray="5 5" fill="none">
            <path d="M 118 198 Q 200 60 300 64" />
            <path d="M 602 198 Q 520 60 420 64" />
          </g>
          <g fill="#92400E" fontSize="11">
            <text x="200" y="135" textAnchor="middle">
              Alt. path · pay transit
            </text>
            <text x="520" y="135" textAnchor="middle">
              Alt. path · pay transit
            </text>
          </g>

          {/* Bottom caption */}
          <text
            x="360"
            y="294"
            textAnchor="middle"
            fontSize="11"
            fill="#94A3B8"
            fontStyle="italic"
          >
            Illustrative topology. Two networks peer directly at an IXP and avoid the
            transit-cost path.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Interconnection topology · editorial diagram. Source attribution:
        the topological pattern is documented across PeeringDB&apos;s network
        catalogue, RIPE NCC training material, and DE-CIX&apos;s operator
        documentation.
      </figcaption>
    </figure>
  );
}
