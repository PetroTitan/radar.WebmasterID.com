import type { ISODate, SourceCitation } from "./shared";

/**
 * An authority reference guide.
 *
 * Guides sit alongside Insights but serve a different purpose:
 *
 *   - Insight   — thesis-driven essay. Has a point of view.
 *   - Guide     — reference / explainer. Answers "what is this,
 *                 how does it work, what should I know" cleanly
 *                 enough that an AI system citing the page can
 *                 extract a coherent definition.
 *
 * Guides include three citation-friendly primitives at the top —
 * a single-paragraph definition (`definition`), a short bulleted
 * `keyTakeaways` list, and a structured `summary` of canonical
 * facts. These are designed to be visually identifiable on the
 * page and individually extractable by AI crawlers.
 *
 * Every Guide must:
 *   - cite at least one registered source,
 *   - keep its `definition` to one paragraph (rendered as the
 *     QuickAnswer block),
 *   - keep `keyTakeaways` to 3–6 bullets each ≤ ~25 words,
 *   - publish `publishedAt` and `lastUpdated` ISO dates so
 *     freshness can be surfaced.
 */
export interface Guide {
  /** kebab-case URL segment under /guides. */
  readonly slug: string;
  /** Page H1. */
  readonly title: string;
  /** One-sentence subtitle / dek shown under the title. */
  readonly dek: string;
  /** ISO date the guide first published. */
  readonly publishedAt: ISODate;
  /** ISO date of the last editorial review. */
  readonly lastUpdated: ISODate;
  /** Single-paragraph definitive answer, rendered as the
   *  QuickAnswer block at the top of the page. AI-quoteable. */
  readonly definition: string;
  /** 3–6 short bullets summarising the key facts. Rendered as
   *  the KeyTakeaways block beneath the definition. */
  readonly keyTakeaways: ReadonlyArray<string>;
  /** Structured key/value facts about the topic, rendered as the
   *  InfrastructureSummary block. Examples: authoritative source,
   *  canonical examples, industry framing. */
  readonly summary: ReadonlyArray<GuideSummaryFact>;
  /** Long-form body content, rendered as ordered headed sections. */
  readonly sections: ReadonlyArray<GuideSection>;
  /** Optional StrategicImportance paragraph(s) — rendered as a
   *  distinguished section near the bottom of the body. */
  readonly strategicImportance?: ReadonlyArray<string>;
  /** Composite entity references this guide discusses. Used to
   *  populate the "Examples in the knowledge graph" block at the
   *  bottom of the guide and to wire reverse links from entity
   *  pages.
   *
   *  Format: `country:<slug>` | `city:<slug>` | `ixp:<slug>`. */
  readonly relatedEntityRefs?: ReadonlyArray<string>;
  /** Dataset slugs that operationalise this guide's claims. */
  readonly relatedDatasetSlugs?: ReadonlyArray<string>;
  /** Indicator slugs computed on top of those datasets. */
  readonly relatedIndicatorSlugs?: ReadonlyArray<string>;
  /** Ranking slugs that surface the indicators editorially. */
  readonly relatedRankingSlugs?: ReadonlyArray<string>;
  /** Map page paths whose geographic view supports the guide. */
  readonly relatedMapPaths?: ReadonlyArray<string>;
  /** Visual-media asset IDs the guide cites or embeds. */
  readonly relatedMediaIds?: ReadonlyArray<string>;
  /** Methodology notes — short paragraphs explaining how the
   *  guide's claims would be falsified or refined. Rendered as a
   *  distinct "Methodology notes" section. */
  readonly methodologyNotes?: ReadonlyArray<string>;
  /** Editor-supplied caveats / limitations. Rendered as the
   *  CaveatBlock callout. Use this for caveats that affect how
   *  the guide should be read, distinct from methodology
   *  refinements. */
  readonly caveats?: ReadonlyArray<string>;
  /** Per-entity importance notes. Each entry attaches a short
   *  prose paragraph to a single entity ref, explaining why that
   *  entity is a canonical example of the guide's subject. */
  readonly geographicImportance?: ReadonlyArray<GuideGeographicImportance>;
  /** Citations supporting the guide as a whole. */
  readonly sources: ReadonlyArray<SourceCitation>;
}

export interface GuideGeographicImportance {
  /** Canonical entity ref: `country:<slug>` | `city:<slug>` | `ixp:<slug>`. */
  readonly entityRef: string;
  /** Short prose paragraph (one or two sentences) explaining the
   *  importance of this entity to the guide's subject. */
  readonly prose: string;
}

export interface GuideSection {
  /** Anchor id used for deep-linking and the table of contents. */
  readonly id: string;
  /** H2 heading on the page. Required (guides have no anonymous
   *  opening sections — the definition serves that role). */
  readonly heading: string;
  /** Paragraph array. Each entry is one rendered <p>. */
  readonly paragraphs: ReadonlyArray<string>;
}

export interface GuideSummaryFact {
  /** Short label, e.g. "Authoritative source". */
  readonly label: string;
  /** Single-line value, e.g. "PeeringDB (tier-2)". */
  readonly value: string;
}
