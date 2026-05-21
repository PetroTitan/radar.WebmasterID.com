# Infrastructure cartography — editorial guidelines

Radar's `/maps` surface is an **editorial topology layer**, not
a GIS platform. This document covers the discipline that keeps
the map layer abstracted, source-bound, and infrastructure-
focused.

## Editorial posture

Five properties define the layer:

1. **No GIS pretence.** Nodes on maps are placed at abstract
   grid coordinates chosen for editorial legibility. The
   platform refuses to imply that those coordinates encode
   longitude / latitude.
2. **No exact cable polylines.** Subsea corridors are drawn as
   conceptual curves between coastal landing areas. The actual
   sea routes follow proprietary engineering paths the
   consortium does not always publish; drawing them implies
   precision the underlying source does not carry.
3. **No live telemetry.** No client-side map frameworks
   (Mapbox, Leaflet, OpenLayers). No tile servers. No third-
   party API keys. No animation frameworks. Maps are
   server-rendered inline SVG.
4. **No quantitative overlays on topology lines.** No Tbps
   labels on corridors, no GPU counts on metro nodes, no
   "AI readiness" scores anywhere.
5. **Methodology + caveats are mandatory.** Every editorial map
   ships with explicit methodology and caveat sections so
   readers can see what the map abstracts on purpose.

## Map categories

- `topology` — generic topology diagrams
- `corridor` — directional routing between metros
- `interconnection` — IXP-anchored interconnection geographies
- `subsea` — submarine-cable corridors
- `cloud` — cloud-region clustering
- `ai-geography` — AI-capable cloud-region clustering
- `metro-ecosystem` — facility / IXP / cloud ecosystem within one metro
- `historical` — pre-current-state topology snapshots

## Required structure

Every `InfrastructureMap` record must include:

1. `slug` (kebab-case)
2. `title` + `dek`
3. `category` (one of the documented literals)
4. `geographicScope` (free-text editorial label)
5. `summary` (one-paragraph quick answer)
6. `methodology` (non-empty paragraph list)
7. `caveats` (non-empty paragraph list)
8. `mediaId` (must resolve to a verified self-authored SVG asset)
9. `diagramComponent` (must be in the inline-components registry)
10. `sources` (at least one citation)

Optional but encouraged: `relatedEntityRefs`,
`relatedGuideSlugs`, `relatedDatasetSlugs`, `relatedCableSlugs`,
`relatedHistorySlugs`, `editorialNotes`.

## Subsea-map discipline

The validator enforces specific rules on `category: "subsea"`
maps:

- Methodology or caveat prose must use corridor-level framing
  (the words `corridor`, `abstract`, or `abstracted` must appear
  somewhere in the combined prose).
- The validator scans methodology paragraphs for "exact route" /
  "cable polyline" language. Any mention is rejected unless the
  same paragraph explicitly disavows it ("the platform refuses
  to draw…", "this map does not depict…").
- The diagram itself uses curved corridor lines (`CorridorLine`
  with non-zero `curve`) between coastal landing areas. Straight
  lines between landings imply Great Circle routing that the
  underlying data does not support.

## AI-geography map discipline

For `category: "ai-geography"` maps:

- Only officially-documented AI-capable regions appear. The
  underlying source must be a provider primary doc.
- No GPU counts. No accelerator inventory. No "AI readiness"
  overlays. Each metro carries a provider-availability
  annotation only.
- Per-model regional availability is documented on the
  provider's own page; it is not encoded into the map.

## SVG primitive vocabulary

Editorial maps compose from three primitives in
`src/components/cartography/primitives.tsx`:

- `MetroNode` — a metro / landing node with one of four roles
  (`primary`, `secondary`, `landing`, `cluster`).
- `CorridorLine` — a corridor between nodes with one of three
  intensities (`primary`, `secondary`, `subsea`). Subsea
  corridors must use a non-zero `curve` value.
- `InfrastructureLegend` — keyed legend that reads the same
  vocabulary as the nodes and corridors above.

The aesthetic is **academic**, not marketing. Muted palette,
clean typography, restrained labels, semantic node hierarchy.

## Visual / media registry

Every editorial map is registered as a verified `MediaAsset`
under CC BY 4.0 (Radar WebmasterID), with:

- `type: "topology-diagram"`
- `inlineComponent` matching the diagram's identifier
- `category` matching the map's editorial category
- `geographicCoverage` echoing the map's scope label
- `altText` describing the topology in 1-2 sentences so AI
  agents can extract the structure without rasterising the SVG
- `dimensions` set so Next/Image can prevent CLS (though the
  inline-SVG path doesn't actually render through next/image)

## Prohibited patterns

- Client-side map frameworks (Mapbox, Leaflet, OpenLayers,
  Cesium)
- Tile providers
- WebGL or canvas rendering for production maps
- D3-heavy runtime systems
- Animated map transitions
- Heat maps over speculative data
- "Top X by infrastructure" rankings on map surfaces
- AI-generated map art
- Screenshot maps (rasterised images of map tiles)

## What this is not

- **Not a GIS platform.** Coordinates are abstract grid
  positions chosen for legibility.
- **Not a routing tool.** The maps document where traffic
  concentrates, not how to route a packet.
- **Not a CDN topology visualisation.** Live network state lives
  elsewhere; identity topology is what Radar maintains.
- **Not a marketing graphic.** The visual treatment is academic
  cartography, not infographic.
