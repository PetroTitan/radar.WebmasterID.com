import {
  MetroNode,
  CorridorLine,
  InfrastructureLegend,
} from "./primitives";

/**
 * Editorial SVG map: AI-capable cloud-region geography.
 *
 * Plots the metros where the three major hyperscalers' managed
 * AI services (AWS Bedrock, Azure OpenAI, Vertex AI) are
 * officially documented as available. Each metro carries a
 * provider-overlay annotation; the platform does not depict
 * per-model availability, GPU counts, or accelerator inventory.
 */
export function AICloudGeographyMap() {
  // Abstract grid positions chosen for legibility.
  const ASH = { cx: 140, cy: 250 };
  const FRA = { cx: 380, cy: 175 };
  const LON = { cx: 290, cy: 145 };
  const TYO = { cx: 605, cy: 215 };
  const SIN = { cx: 540, cy: 330 };

  return (
    <figure className="rounded-card border border-line bg-surface-base">
      <div className="overflow-hidden rounded-t-card bg-surface-subtle px-6 py-8 md:px-10 md:py-10">
        <svg
          viewBox="0 0 720 460"
          role="img"
          aria-label="Abstract topology map of AI-capable cloud-region geography, showing the five metros where managed-AI services from AWS, Azure, and Google Cloud are officially documented as available."
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full"
        >
          <rect x="0" y="0" width="720" height="460" fill="#FFFFFF" />

          {/* Continent labels */}
          <text x="100" y="60" fontSize="11" fontWeight="600" fill="#94A3B8" style={{ textTransform: "uppercase" }}>
            North America
          </text>
          <text x="345" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94A3B8" style={{ textTransform: "uppercase" }}>
            Europe
          </text>
          <text x="580" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94A3B8" style={{ textTransform: "uppercase" }}>
            Asia Pacific
          </text>

          {/* Concentration corridor lines connecting AI-capable metros */}
          <CorridorLine x1={ASH.cx} y1={ASH.cy} x2={LON.cx} y2={LON.cy} intensity="secondary" />
          <CorridorLine x1={ASH.cx} y1={ASH.cy} x2={FRA.cx} y2={FRA.cy} intensity="secondary" />
          <CorridorLine x1={LON.cx} y1={LON.cy} x2={FRA.cx} y2={FRA.cy} intensity="primary" />
          <CorridorLine x1={FRA.cx} y1={FRA.cy} x2={SIN.cx} y2={SIN.cy} intensity="secondary" />
          <CorridorLine x1={FRA.cx} y1={FRA.cy} x2={TYO.cx} y2={TYO.cy} intensity="secondary" />
          <CorridorLine x1={SIN.cx} y1={SIN.cy} x2={TYO.cx} y2={TYO.cy} intensity="primary" />
          <CorridorLine x1={ASH.cx} y1={ASH.cy} x2={TYO.cx} y2={TYO.cy} intensity="subsea" curve={60} />
          <CorridorLine x1={ASH.cx} y1={ASH.cy} x2={SIN.cx} y2={SIN.cy} intensity="subsea" curve={80} />

          {/* Metro nodes */}
          <MetroNode cx={ASH.cx} cy={ASH.cy} label="Ashburn" sub="Bedrock · Azure OpenAI · Vertex AI" role="cluster" labelPosition="left" />
          <MetroNode cx={LON.cx} cy={LON.cy} label="London" sub="Azure OpenAI · Vertex AI" role="cluster" labelPosition="above" />
          <MetroNode cx={FRA.cx} cy={FRA.cy} label="Frankfurt" sub="Bedrock · Vertex AI" role="cluster" labelPosition="above" />
          <MetroNode cx={SIN.cx} cy={SIN.cy} label="Singapore" sub="Per-provider variation" role="cluster" labelPosition="below" />
          <MetroNode cx={TYO.cx} cy={TYO.cy} label="Tokyo" sub="Per-provider variation" role="cluster" labelPosition="right" />

          {/* Legend */}
          <InfrastructureLegend
            x={32}
            y={350}
            items={[
              { key: "cluster", label: "AI-capable metro (documented)", role: "cluster" },
              { key: "corridor-primary", label: "Intra-region corridor", role: "corridor-primary" },
              { key: "corridor-secondary", label: "Inter-region corridor", role: "corridor-secondary" },
              { key: "corridor-subsea", label: "Subsea corridor (abstracted)", role: "corridor-subsea" },
            ]}
          />

          <text
            x="360"
            y="430"
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill="#94A3B8"
          >
            Service availability is documented; per-model and per-GPU geography is not.
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-line px-6 py-4 text-xs text-ink-500 md:px-8">
        AI-capable cloud-region geography · editorial map. The same
        five metros that anchor the three-hyperscaler general-
        availability clustering recur in the managed-AI service
        directories.
      </figcaption>
    </figure>
  );
}
