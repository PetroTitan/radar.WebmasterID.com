import {
  MetroNode,
  CorridorLine,
  InfrastructureLegend,
} from "./primitives";

/**
 * Editorial SVG map: European interconnection corridors.
 *
 * Abstracts the FLAP cluster (Frankfurt, London, Amsterdam,
 * Paris) and the principal terrestrial routes between those
 * metros. Node positions are chosen for editorial legibility,
 * not to encode longitude / latitude.
 *
 * The diagram refuses to imply street-level precision or exact
 * fibre routing — corridor lines are abstract.
 */
export function EuropeanInterconnectionCorridorMap() {
  // Abstract grid positions chosen for legibility; not geographic
  // coordinates. The platform refuses to imply GIS precision.
  const FRA = { cx: 410, cy: 230 };
  const LON = { cx: 180, cy: 175 };
  const AMS = { cx: 290, cy: 130 };
  const PAR = { cx: 270, cy: 280 };
  const MAD = { cx: 130, cy: 360 };
  const MIL = { cx: 480, cy: 320 };

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 460"
          role="img"
          aria-label="Abstract topology map of European interconnection corridors anchored on the FLAP cluster (Frankfurt, London, Amsterdam, Paris), with secondary routes to Madrid and Milan."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          {/* Background grid */}
          <rect x="0" y="0" width="720" height="460" fill="#FFFFFF" />

          {/* Corridor lines — primary FLAP triangle first */}
          <CorridorLine
            x1={FRA.cx}
            y1={FRA.cy}
            x2={AMS.cx}
            y2={AMS.cy}
            intensity="primary"
            label="FRA — AMS"
          />
          <CorridorLine
            x1={AMS.cx}
            y1={AMS.cy}
            x2={LON.cx}
            y2={LON.cy}
            intensity="primary"
            label="AMS — LON"
          />
          <CorridorLine
            x1={FRA.cx}
            y1={FRA.cy}
            x2={LON.cx}
            y2={LON.cy}
            intensity="primary"
          />
          <CorridorLine
            x1={FRA.cx}
            y1={FRA.cy}
            x2={PAR.cx}
            y2={PAR.cy}
            intensity="primary"
          />
          <CorridorLine
            x1={PAR.cx}
            y1={PAR.cy}
            x2={LON.cx}
            y2={LON.cy}
            intensity="primary"
          />
          <CorridorLine
            x1={PAR.cx}
            y1={PAR.cy}
            x2={AMS.cx}
            y2={AMS.cy}
            intensity="secondary"
          />

          {/* Secondary corridors */}
          <CorridorLine
            x1={PAR.cx}
            y1={PAR.cy}
            x2={MAD.cx}
            y2={MAD.cy}
            intensity="secondary"
            label="PAR — MAD"
          />
          <CorridorLine
            x1={FRA.cx}
            y1={FRA.cy}
            x2={MIL.cx}
            y2={MIL.cy}
            intensity="secondary"
            label="FRA — MIL"
          />

          {/* Nodes */}
          <MetroNode cx={FRA.cx} cy={FRA.cy} label="Frankfurt" sub="DE-CIX · eu-central-1" role="primary" labelPosition="right" />
          <MetroNode cx={LON.cx} cy={LON.cy} label="London" sub="LINX LON1 · eu-west-2" role="primary" labelPosition="left" />
          <MetroNode cx={AMS.cx} cy={AMS.cy} label="Amsterdam" sub="AMS-IX" role="primary" labelPosition="above" />
          <MetroNode cx={PAR.cx} cy={PAR.cy} label="Paris" sub="France-IX (not yet seeded)" role="secondary" labelPosition="below" />
          <MetroNode cx={MAD.cx} cy={MAD.cy} label="Madrid" sub="Iberian corridor" role="secondary" labelPosition="below" />
          <MetroNode cx={MIL.cx} cy={MIL.cy} label="Milan" sub="Southern Europe corridor" role="secondary" labelPosition="right" />

          {/* Legend */}
          <InfrastructureLegend
            x={520}
            y={50}
            items={[
              { key: "primary", label: "FLAP anchor metro", role: "primary" },
              { key: "secondary", label: "Secondary corridor", role: "secondary" },
              { key: "corridor-primary", label: "Primary corridor", role: "corridor-primary" },
              { key: "corridor-secondary", label: "Secondary corridor", role: "corridor-secondary" },
            ]}
          />

          {/* Footer disclaimer */}
          <text
            x="360"
            y="442"
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill="#94A3B8"
          >
            Editorial schematic. Node positions are not geographic coordinates; corridors are topology, not exact fibre routing.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        European interconnection corridors · editorial map. The
        FLAP cluster (Frankfurt, London, Amsterdam, Paris) is
        rendered as a topology triangle with secondary routes to
        Madrid and Milan.
      </figcaption>
    </figure>
  );
}
