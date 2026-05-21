import type {
  ConfidenceLevel,
  ISODate,
  SourceCitation,
} from "./shared";

/**
 * An editorial infrastructure map.
 *
 * `InfrastructureMap` is distinct from the entity-driven map
 * pages (e.g. /maps/cloud-regions, which renders every reviewed
 * cloud-region row on an abstract longitude/latitude grid). A
 * map record covers a *topology* — a corridor, a clustering
 * pattern, a metro ecosystem — and ships with a methodology
 * narrative, explicit abstractions, and source citations.
 *
 * Strict editorial rules:
 *   - No exact subsea-cable routes. Corridor-level only.
 *   - No false precision. Maps abstract on purpose.
 *   - No marketing graphics. The aesthetic is academic.
 *   - No fake metrics inside the map (no Tbps numbers on
 *     corridor lines, no "AI capacity" overlays).
 */
export type InfrastructureMapCategory =
  | "topology"
  | "corridor"
  | "interconnection"
  | "subsea"
  | "cloud"
  | "ai-geography"
  | "metro-ecosystem"
  | "historical";

export type InfrastructureMapDiagramComponent =
  | "EuropeanInterconnectionCorridorMap"
  | "TransatlanticConnectivityCorridorMap"
  | "AICloudGeographyMap";

export interface InfrastructureMap {
  /** kebab-case slug, URL segment under /maps. */
  readonly slug: string;
  /** Page H1 / display title. */
  readonly title: string;
  /** One-sentence dek. */
  readonly dek: string;
  /** Editorial category drives index grouping. */
  readonly category: InfrastructureMapCategory;
  /** Human-readable geographic scope label, e.g.
   *  "Europe — FLAP cluster", "North Atlantic corridor". */
  readonly geographicScope: string;
  /** Plain-prose summary of what the map represents. */
  readonly summary: string;
  /** Methodology — what the map abstracts, what it represents
   *  faithfully, and the editorial rules followed. */
  readonly methodology: ReadonlyArray<string>;
  /** Per-map caveats. */
  readonly caveats: ReadonlyArray<string>;
  /** Composite entity refs depicted on the map. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  /** Guides that the map illustrates. */
  readonly relatedGuideSlugs?: ReadonlyArray<string>;
  /** Datasets the map sits alongside. */
  readonly relatedDatasetSlugs?: ReadonlyArray<string>;
  /** Subsea cable slugs depicted. */
  readonly relatedCableSlugs?: ReadonlyArray<string>;
  /** History pages that contextualise the map. */
  readonly relatedHistorySlugs?: ReadonlyArray<string>;
  /** Media registry ID for the map's verified SVG asset. */
  readonly mediaId: string;
  /** Self-authored SVG diagram identifier — resolved by the
   *  map-renderer via a string map. */
  readonly diagramComponent: InfrastructureMapDiagramComponent;
  /** Source citations supporting the map. */
  readonly sources: ReadonlyArray<SourceCitation>;
  /** Free-text editorial notes (versioning intent, anticipated
   *  changes). */
  readonly editorialNotes?: ReadonlyArray<string>;
  /** Confidence in the topology depicted. */
  readonly confidence: ConfidenceLevel;
  /** ISO date the map was last editorially reviewed. */
  readonly lastUpdated: ISODate;
}
