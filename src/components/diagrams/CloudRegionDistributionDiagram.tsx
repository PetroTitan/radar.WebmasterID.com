/**
 * Editorial SVG diagram: how cloud regions cluster in
 * interconnection metros.
 *
 * Layout: three columns of small badges (AWS / GCP / Azure)
 * connected to three metro circles (Frankfurt / Ashburn /
 * Singapore) showing that the same metros host
 * general-availability regions of all three major hyperscalers.
 *
 * Institutional / illustrative — not a topology, just a labelled
 * visual that grounds the prose claim about interconnection-metro
 * clustering.
 */
export function CloudRegionDistributionDiagram() {
  const metros: ReadonlyArray<{
    readonly key: string;
    readonly name: string;
    readonly country: string;
    readonly cx: number;
  }> = [
    { key: "frankfurt", name: "Frankfurt", country: "Germany", cx: 145 },
    { key: "ashburn", name: "Ashburn", country: "USA", cx: 365 },
    { key: "singapore", name: "Singapore", country: "Singapore", cx: 585 },
  ];

  const providers: ReadonlyArray<{
    readonly key: string;
    readonly name: string;
    readonly subtitle: string;
    readonly y: number;
  }> = [
    { key: "aws", name: "AWS", subtitle: "eu-central-1 · us-east-1 · ap-southeast-1", y: 50 },
    { key: "gcp", name: "Google Cloud", subtitle: "europe-west3 · us-east4 · asia-southeast1", y: 96 },
    { key: "azure", name: "Microsoft Azure", subtitle: "Germany West Central · East US · Southeast Asia", y: 142 },
  ];

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="Three major hyperscalers (AWS, Google Cloud, Microsoft Azure) operate general-availability cloud regions in the same three metros (Frankfurt, Ashburn, Singapore)."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* Provider rows */}
          <g>
            {providers.map((p) => (
              <g key={p.key}>
                <rect
                  x="20"
                  y={p.y - 16}
                  width="160"
                  height="32"
                  rx="4"
                  fill="#FFFFFF"
                  stroke="#3B82F6"
                  strokeWidth="1.2"
                />
                <text
                  x="34"
                  y={p.y - 2}
                  fontSize="13"
                  fontWeight="600"
                  fill="#0F172A"
                >
                  {p.name}
                </text>
                <text x="34" y={p.y + 12} fontSize="10" fill="#475569">
                  Hyperscaler
                </text>
              </g>
            ))}
          </g>

          {/* Metro circles */}
          <g>
            {metros.map((m) => (
              <g key={m.key}>
                <circle
                  cx={m.cx}
                  cy="240"
                  r="38"
                  fill="#FFFFFF"
                  stroke="#3B82F6"
                  strokeWidth="1.6"
                />
                <text
                  x={m.cx}
                  y="236"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="#0F172A"
                >
                  {m.name}
                </text>
                <text
                  x={m.cx}
                  y="254"
                  textAnchor="middle"
                  fontSize="11"
                  fill="#475569"
                >
                  {m.country}
                </text>
              </g>
            ))}
          </g>

          {/* Connection lines: each provider connects to each metro */}
          <g stroke="#3B82F6" strokeWidth="0.9" opacity="0.45">
            {providers.flatMap((p) =>
              metros.map((m) => (
                <line
                  key={`${p.key}-${m.key}`}
                  x1="180"
                  y1={p.y}
                  x2={m.cx}
                  y2="202"
                />
              )),
            )}
          </g>

          {/* Amber confirmation badges at each metro showing all three present */}
          {metros.map((m) => (
            <g key={`badge-${m.key}`}>
              <rect
                x={m.cx - 36}
                y="288"
                width="72"
                height="20"
                rx="10"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth="1"
              />
              <text
                x={m.cx}
                y="302"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#92400E"
              >
                All 3 present
              </text>
            </g>
          ))}

          {/* Axis labels */}
          <text x="100" y="22" fontSize="10" fontWeight="600" fill="#94A3B8" textAnchor="middle">
            HYPERSCALERS
          </text>
          <text x="365" y="180" fontSize="10" fontWeight="600" fill="#94A3B8" textAnchor="middle">
            INTERCONNECTION METROS
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Cloud-region distribution · editorial diagram. The pattern that
        AWS, Google Cloud, and Microsoft Azure share their primary
        interconnection metros (Frankfurt, Ashburn, Singapore) is
        documented across the three providers&apos; own region
        directories.
      </figcaption>
    </figure>
  );
}
