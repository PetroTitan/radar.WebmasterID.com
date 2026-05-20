import type { ISODate, SourceCitation } from "./shared";

/**
 * An editorial infrastructure explainer.
 *
 * Insights are long-form, source-cited essays. They sit alongside
 * the entity graph rather than inside it — an insight may
 * *reference* a Country, City or IXP, but it is not itself part
 * of the geography/cloud/interconnection axes.
 *
 * Every Insight must:
 *   - publish a `publishedAt` and `lastUpdated` ISO date,
 *   - cite at least one registered source,
 *   - keep each section to a single heading + paragraph array
 *     (no nested structure; render with stable typographic rhythm).
 */
export interface Insight {
  /** kebab-case URL segment under /insights. */
  readonly slug: string;
  /** Page H1. */
  readonly title: string;
  /** One-sentence subtitle / dek shown under the title. */
  readonly dek: string;
  /** ISO date the insight first published. */
  readonly publishedAt: ISODate;
  /** ISO date of the last editorial review. */
  readonly lastUpdated: ISODate;
  /** Composite entity references this insight is *about*. Used to
   *  wire reverse links from entity pages and to populate the
   *  "Related entities" block at the end of the insight.
   *
   *  Format: `country:<slug>` | `city:<slug>` | `ixp:<slug>`. */
  readonly entityRefs?: ReadonlyArray<string>;
  /** Body content, rendered as an ordered list of headed sections. */
  readonly sections: ReadonlyArray<InsightSection>;
  /** Citations supporting the whole article. Rendered as the
   *  SourceFootnote at the bottom of the page. */
  readonly sources: ReadonlyArray<SourceCitation>;
}

export interface InsightSection {
  /** Anchor id used for deep-linking and the table of contents. */
  readonly id: string;
  /** Section heading (H2 on the page). Optional — an opening
   *  section with `heading` omitted renders flush against the dek. */
  readonly heading?: string;
  /** Paragraph array. Each entry is one rendered <p>. */
  readonly paragraphs: ReadonlyArray<string>;
}
