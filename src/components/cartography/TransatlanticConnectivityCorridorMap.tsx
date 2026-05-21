import {
  MetroNode,
  CorridorLine,
  InfrastructureLegend,
} from "./primitives";

/**
 * Editorial SVG map: transatlantic connectivity corridors.
 *
 * Abstracts the US east-coast landing-to-inland-metro flow on
 * one side and the UK / EU landing-to-inland-metro flow on the
 * other, with curved subsea corridors connecting them.
 *
 * The platform explicitly refuses to draw cable polylines. The
 * subsea curves are conceptual — they communicate "there is a
 * corridor", not "this is the route". Per TeleGeography
 * reporting, actual cable routes follow proprietary engineering
 * paths that the consortium does not always publish.
 */
export function TransatlanticConnectivityCorridorMap() {
  // Abstract grid positions chosen for legibility.
  const ASH = { cx: 150, cy: 270 };
  const VAB = { cx: 195, cy: 305 };
  const NYC = { cx: 175, cy: 175 };
  const LON = { cx: 510, cy: 175 };
  const BUDE = { cx: 460, cy: 220 };
  const PAR = { cx: 555, cy: 290 };
  const FRA = { cx: 615, cy: 240 };
  const BILBAO = { cx: 470, cy: 360 };

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 460"
          role="img"
          aria-label="Abstract topology map of transatlantic connectivity corridors, showing US east-coast landings (Virginia Beach, New York) feeding inland to Ashburn and the corresponding European landings (Bude, Bilbao) feeding inland to London, Paris, and Frankfurt."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          <rect x="0" y="0" width="720" height="460" fill="#FFFFFF" />

          {/* Ocean shading band */}
          <rect
            x="240"
            y="60"
            width="190"
            height="340"
            fill="#F8FAFC"
            opacity="0.6"
          />
          <text
            x="335"
            y="90"
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill="#94A3B8"
          >
            North Atlantic
          </text>

          {/* Land labels */}
          <text x="100" y="60" fontSize="11" fontWeight="600" fill="#94A3B8" style={{ textTransform: "uppercase" }}>
            US EAST
          </text>
          <text x="540" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94A3B8" style={{ textTransform: "uppercase" }}>
            UK / WESTERN EUROPE
          </text>

          {/* Subsea curved corridors */}
          <CorridorLine
            x1={VAB.cx}
            y1={VAB.cy}
            x2={BUDE.cx}
            y2={BUDE.cy}
            intensity="subsea"
            label="Virginia ↔ Cornwall corridor"
            curve={-40}
          />
          <CorridorLine
            x1={VAB.cx}
            y1={VAB.cy}
            x2={BILBAO.cx}
            y2={BILBAO.cy}
            intensity="subsea"
            label="Virginia ↔ Iberia corridor"
            curve={50}
          />
          <CorridorLine
            x1={NYC.cx}
            y1={NYC.cy}
            x2={BUDE.cx}
            y2={BUDE.cy}
            intensity="subsea"
            curve={-60}
          />

          {/* Inland backhaul */}
          <CorridorLine x1={VAB.cx} y1={VAB.cy} x2={ASH.cx} y2={ASH.cy} intensity="primary" label="VAB ↔ Ashburn backhaul" />
          <CorridorLine x1={NYC.cx} y1={NYC.cy} x2={ASH.cx} y2={ASH.cy} intensity="secondary" />
          <CorridorLine x1={BUDE.cx} y1={BUDE.cy} x2={LON.cx} y2={LON.cy} intensity="primary" label="Bude ↔ London backhaul" />
          <CorridorLine x1={LON.cx} y1={LON.cy} x2={PAR.cx} y2={PAR.cy} intensity="secondary" />
          <CorridorLine x1={LON.cx} y1={LON.cy} x2={FRA.cx} y2={FRA.cy} intensity="secondary" />
          <CorridorLine x1={BILBAO.cx} y1={BILBAO.cy} x2={PAR.cx} y2={PAR.cy} intensity="secondary" />

          {/* US-side nodes */}
          <MetroNode cx={ASH.cx} cy={ASH.cy} label="Ashburn" sub="us-east-1 anchor" role="primary" labelPosition="left" />
          <MetroNode cx={VAB.cx} cy={VAB.cy} label="Virginia Beach" sub="Cable landing corridor" role="landing" labelPosition="below" />
          <MetroNode cx={NYC.cx} cy={NYC.cy} label="New York" sub="Northern landings" role="secondary" labelPosition="left" />

          {/* Europe-side nodes */}
          <MetroNode cx={LON.cx} cy={LON.cy} label="London" sub="eu-west-2 · LINX" role="primary" labelPosition="above" />
          <MetroNode cx={BUDE.cx} cy={BUDE.cy} label="Bude" sub="Cornwall landing corridor" role="landing" labelPosition="above" />
          <MetroNode cx={PAR.cx} cy={PAR.cy} label="Paris" sub="EU western anchor" role="secondary" labelPosition="below" />
          <MetroNode cx={FRA.cx} cy={FRA.cy} label="Frankfurt" sub="eu-central-1 · DE-CIX" role="primary" labelPosition="right" />
          <MetroNode cx={BILBAO.cx} cy={BILBAO.cy} label="Bilbao" sub="Iberian landing" role="landing" labelPosition="below" />

          {/* Legend */}
          <InfrastructureLegend
            x={32}
            y={360}
            items={[
              { key: "primary", label: "Primary metro", role: "primary" },
              { key: "landing", label: "Coastal landing area", role: "landing" },
              { key: "corridor-subsea", label: "Subsea corridor (abstracted)", role: "corridor-subsea" },
              { key: "corridor-primary", label: "Inland backhaul", role: "corridor-primary" },
            ]}
          />

          <text
            x="360"
            y="442"
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill="#94A3B8"
          >
            Editorial schematic. Subsea curves are corridors, not cable polylines.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        Transatlantic connectivity corridors · editorial map. Curves
        between US and European coasts indicate corridors only — the
        platform refuses to draw cable polylines.
      </figcaption>
    </figure>
  );
}
