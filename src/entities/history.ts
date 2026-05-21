import type {
  ConfidenceLevel,
  ISODate,
  SourceCitation,
} from "./shared";

/**
 * A historical infrastructure intelligence page.
 *
 * Distinct from `Insight` (thesis-driven essay) and `Guide`
 * (current-state reference). A `HistoryPage` covers how a
 * specific piece of internet infrastructure came to be — what
 * pre-conditions enabled it, what milestones marked its
 * evolution, and what that history implies about the present
 * footprint.
 *
 * History pages are *analytical*, not nostalgic. They cite
 * primary sources or tier-1 / tier-2 secondary sources (IEEE,
 * Internet Hall of Fame, RFCs, NSF reports, TeleGeography
 * historical reporting) and explicitly refuse to publish
 * speculative "biggest / first / largest" claims that the
 * underlying sources don't support.
 */
export interface HistoryPage {
  /** kebab-case URL segment under /history. */
  readonly slug: string;
  /** Page H1. */
  readonly title: string;
  /** One-sentence dek. */
  readonly dek: string;
  /** Publication date. */
  readonly publishedAt: ISODate;
  /** Last editorial review. */
  readonly lastUpdated: ISODate;
  /** Editorial period this page covers, e.g.
   *  "1990s — early 2000s", "1980s — present". */
  readonly period: string;
  /** Single-paragraph definitive answer for the QuickAnswer block. */
  readonly quickAnswer: string;
  /** Historical context paragraphs. */
  readonly context: ReadonlyArray<string>;
  /** "Why it mattered" paragraphs. */
  readonly whyItMattered: ReadonlyArray<string>;
  /** Infrastructure-evolution paragraphs. */
  readonly evolution: ReadonlyArray<string>;
  /** Geographic-importance paragraphs. */
  readonly geographicImportance?: ReadonlyArray<string>;
  /** Timeline events. Each event is a year-precision milestone
   *  with its own source references. */
  readonly timeline: ReadonlyArray<TimelineEvent>;
  /** Composite entity refs: `country:<slug>` | `city:<slug>` |
   *  `ixp:<slug>`. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  /** Dataset slugs supporting the page's claims. */
  readonly relatedDatasetSlugs?: ReadonlyArray<string>;
  /** Guide slugs to cross-link. */
  readonly relatedGuideSlugs?: ReadonlyArray<string>;
  /** Subsea cable slugs to cross-link. */
  readonly relatedCableSlugs?: ReadonlyArray<string>;
  /** Visual-media asset IDs the page cites. */
  readonly relatedMediaIds?: ReadonlyArray<string>;
  /** Map paths to surface. */
  readonly relatedMapPaths?: ReadonlyArray<string>;
  /** Methodology notes — how Radar treats the historical
   *  claims, what falsifies them. */
  readonly methodologyNotes?: ReadonlyArray<string>;
  /** Editor-supplied caveats. */
  readonly caveats?: ReadonlyArray<string>;
  /** Confidence level for the page as a whole. */
  readonly confidence: ConfidenceLevel;
  /** Citations supporting the page. */
  readonly sources: ReadonlyArray<SourceCitation>;
}

/**
 * A single timeline event.
 *
 * Year-precision is the canonical resolution. Some events can
 * carry month-precision when the underlying source publishes
 * the exact month; the validator accepts either `YYYY` or
 * `YYYY-MM`. Day-precision is intentionally not supported on
 * historical events to avoid spurious specificity that the
 * sources don't carry.
 */
export interface TimelineEvent {
  /** Year (`YYYY`) or year-month (`YYYY-MM`). */
  readonly year: string;
  /** Short event title. */
  readonly title: string;
  /** One-sentence summary. */
  readonly summary: string;
  /** Composite entity refs for the event. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  /** Cable slugs the event references. */
  readonly relatedCableSlugs?: ReadonlyArray<string>;
  /** Source citations supporting the event's claims. */
  readonly sources?: ReadonlyArray<SourceCitation>;
  /** Confidence in the event's date precision and claim. */
  readonly confidence?: ConfidenceLevel;
  /** Caveats specific to this event. */
  readonly caveats?: ReadonlyArray<string>;
}
