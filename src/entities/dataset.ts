import type {
  ConfidenceLevel,
  ISODate,
  SourceCitation,
} from "./shared";

/**
 * A research dataset.
 *
 * A `Dataset` is a *card*, not a row store. It documents what data
 * Radar publishes (or intends to publish) on a given infrastructure
 * topic, the registered sources it draws from, the methodology used
 * to compile it, and the limitations of the current state.
 *
 * Status semantics:
 *   - complete: the dataset's published cells are all source-cited
 *     and reviewed.
 *   - partial:  some cells are seeded, others render "Data not yet
 *     verified."
 *   - pending:  the schema is published, but the dataset has not
 *     yet been ingested. Page renders "Dataset not yet fully
 *     verified."
 *
 * Pages render the card itself plus links to the entities that
 * appear in (or will appear in) the dataset, and any indicators
 * the dataset feeds.
 */
export type DatasetStatus = "complete" | "partial" | "pending";

export interface Dataset {
  /** kebab-case URL segment under /research/datasets. */
  readonly slug: string;
  /** Page H1. */
  readonly title: string;
  /** One-sentence subtitle / dek. */
  readonly dek: string;
  /** Topical category, used for grouping on the index page. */
  readonly category: DatasetCategory;
  readonly publishedAt: ISODate;
  readonly lastUpdated: ISODate;
  /** Editorial status of the card itself. */
  readonly status: DatasetStatus;
  /** Overall confidence in the published cells. */
  readonly confidence: ConfidenceLevel;
  /** Single-paragraph methodology summary. */
  readonly methodology: string;
  /** Known limitations of the dataset; rendered as a bullet list. */
  readonly limitations: ReadonlyArray<string>;
  /** Composite entity references that appear in (or seed) the
   *  dataset. Format: `country:<slug>` | `city:<slug>` | `ixp:<slug>`. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  /** Indicator slugs that consume this dataset. */
  readonly indicatorSlugs?: ReadonlyArray<string>;
  /** Slug of the map page that visualises this dataset, if any. */
  readonly mapPath?: string;
  /** Citations supporting the dataset. */
  readonly sources: ReadonlyArray<SourceCitation>;
  /** Number of published rows (entries) at lastUpdated. Optional —
   *  omit when the dataset is `pending`. */
  readonly recordCount?: number;
}

export type DatasetCategory =
  | "cloud"
  | "interconnection"
  | "resilience"
  | "ai"
  | "general";
