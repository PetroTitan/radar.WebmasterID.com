/**
 * Editorial content for /methodology.
 *
 * Lives in `content/` rather than the route file so it can be
 * referenced from /about, the homepage methodology block, and the
 * sitemap without duplicating prose.
 */

export interface MethodologySection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: ReadonlyArray<string>;
  readonly bullets?: ReadonlyArray<string>;
}

export const METHODOLOGY_LAST_UPDATED = "2026-05-20";

export const METHODOLOGY_SECTIONS: ReadonlyArray<MethodologySection> = [
  {
    id: "principles",
    title: "Editorial principles",
    paragraphs: [
      "Radar publishes verified facts about internet infrastructure. Every figure on the platform must trace back to a registered source, with the citation visible on the page that uses it.",
      "Where a value is unknown or contested, Radar shows \"Data not yet verified.\" rather than a guess. The absence of a number is itself a published signal.",
    ],
  },
  {
    id: "scoring",
    title: "Scoring approach",
    paragraphs: [
      "Composite rankings combine observable, source-cited inputs only — never reputation, opinion, or sentiment. Each ranked dimension is documented with its inputs, weights, and last-recomputed date.",
      "Radar does not publish a single overall \"infrastructure score\" for a country or city. Different operators care about different dimensions (peering depth, sovereign cloud presence, cable diversity) and a forced collapse to one number obscures the trade-offs.",
    ],
  },
  {
    id: "confidence",
    title: "Confidence levels",
    paragraphs: [
      "Every published value carries a confidence level: high, medium, low, or unverified. Confidence is independent of source trust — a tier-1 source can still yield a low-confidence value when the underlying measurement is contested or stale.",
    ],
    bullets: [
      "High — multiple tier-1 or tier-2 sources agree.",
      "Medium — single tier-1/2 source, or multiple tier-3 sources, with no contradictions.",
      "Low — best-available estimate; sources disagree, are stale, or rely on tier-4 corroborators.",
      "Unverified — editorial review pending; the value is not published.",
    ],
  },
  {
    id: "limitations",
    title: "Data limitations",
    paragraphs: [
      "Internet infrastructure is opaque by design. Operators rarely publish exact facility addresses, tenant lists, or live capacity. Radar publishes what is verifiable and is explicit about what is not.",
      "Subsea cable design capacity differs from operating capacity. Cloud region directories describe announced regions, not the underlying datacenters. IXP traffic peaks reflect a moment in time. Radar records timestamps on every observation so readers can judge freshness directly.",
    ],
  },
  {
    id: "governance",
    title: "Source governance",
    paragraphs: [
      "Sources are assigned a trust tier through editorial review. Tier assignments are revisited annually or whenever a source materially changes its methodology, licensing, or update cadence.",
      "Tier-4 sources (industry press, trade publications) may corroborate but never act as the sole basis for a published value.",
    ],
  },
  {
    id: "cadence",
    title: "Update cadence",
    paragraphs: [
      "Continuous sources (PeeringDB, RIPE, Cloudflare Radar) are re-pulled on a defined schedule. Annual datasets (World Bank, ITU) refresh with the publisher's release cycle. Each page surfaces the last date the underlying record was reviewed by an editor.",
      "Page freshness is a first-class SEO signal. Modified-time metadata is emitted on every page so Google, Bing, Perplexity, and AI crawlers can detect updates without re-fetching the full document.",
    ],
  },
];
