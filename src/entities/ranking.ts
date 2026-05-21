import type {
  ConfidenceLevel,
  ISODate,
  SourceCitation,
} from "./shared";

/**
 * A research ranking.
 *
 * A `Ranking` is a comparative view along one indicator (or a
 * documented composite of indicators). The card documents the
 * inputs, the weighting, the recompute cadence, and the editorial
 * status; it does *not* invent positions.
 *
 * When a ranking's underlying dataset has not yet been ingested,
 * the page renders "Data not yet verified." for every result cell.
 */
export type RankingStatus =
  | "verified"
  | "methodology-in-draft"
  | "pending-dataset";

export interface Ranking {
  readonly slug: string;
  readonly title: string;
  readonly dek: string;
  readonly category: RankingCategory;
  readonly publishedAt: ISODate;
  readonly lastUpdated: ISODate;
  /** One-sentence definition of the dimension being ranked. */
  readonly dimension: string;
  /** One- or two-paragraph methodology. */
  readonly methodology: string;
  /** Weighting explanation. For single-indicator rankings this is
   *  "single-indicator". For composites it lists each component
   *  indicator and its weight. */
  readonly weighting: string;
  /** Indicators used by this ranking. */
  readonly indicatorSlugs: ReadonlyArray<string>;
  /** Recompute cadence (Weekly / Monthly / Quarterly). */
  readonly recomputeCadence: string;
  readonly status: RankingStatus;
  readonly confidence: ConfidenceLevel;
  /** Limitations of the ranking; bullets. */
  readonly limitations: ReadonlyArray<string>;
  /** Composite entity refs the ranking would feature. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  readonly sources: ReadonlyArray<SourceCitation>;
}

export type RankingCategory =
  | "geography"
  | "interconnection"
  | "resilience"
  | "modernisation"
  | "ai"
  | "concentration";
