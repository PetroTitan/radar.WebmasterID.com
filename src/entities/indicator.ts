import type { ISODate, SourceCitation } from "./shared";

/**
 * A research indicator.
 *
 * An `Indicator` is a single dimension along which infrastructure
 * entities can be compared. The indicator card defines what it
 * measures, why it matters, how Radar measures it, what the data
 * unit is, and what the limitations are.
 *
 * Indicators consume one or more `Dataset`s and feed one or more
 * `Ranking`s. The relationship graph (datasets → indicators →
 * rankings) is the substrate of the Radar research layer.
 */
export interface Indicator {
  readonly slug: string;
  readonly title: string;
  readonly dek: string;
  readonly category: IndicatorCategory;
  readonly publishedAt: ISODate;
  readonly lastUpdated: ISODate;
  /** Single-paragraph definition of what the indicator measures. */
  readonly measures: string;
  /** Single-paragraph editorial significance — why operators or
   *  researchers should care about this dimension. */
  readonly significance: string;
  /** Single- or double-paragraph methodology. */
  readonly methodology: string;
  /** Unit / scale of the published value, e.g. "count of connected
   *  networks", "Tbps", "percent", "count of distinct cable
   *  landings". */
  readonly unit: string;
  /** Known limitations; rendered as bullets. */
  readonly limitations: ReadonlyArray<string>;
  /** Slugs of datasets that source this indicator. */
  readonly datasetSlugs?: ReadonlyArray<string>;
  /** Slugs of rankings that use this indicator. */
  readonly rankingSlugs?: ReadonlyArray<string>;
  /** Entity refs that the platform considers exemplars of this
   *  indicator. Helps readers ground the abstract metric in
   *  specific places. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  readonly sources: ReadonlyArray<SourceCitation>;
}

export type IndicatorCategory =
  | "interconnection"
  | "cloud"
  | "resilience"
  | "modernisation"
  | "ai"
  | "concentration";
