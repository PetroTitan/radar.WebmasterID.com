import type { Ranking } from "@/entities";

const CHECKED_AT = "2026-05-21";

/**
 * Ranking registry.
 *
 * Each ranking is a comparative view along an indicator (or a
 * documented composite of indicators). The cards live here as
 * editorial records — they do not invent positions or fabricate
 * scores. When the underlying datasets have not yet been ingested,
 * the per-ranking page renders "Data not yet verified." for every
 * result cell.
 */
export const RANKINGS: ReadonlyArray<Ranking> = [
  {
    slug: "cloud-infrastructure-hubs",
    title: "Cloud infrastructure hubs",
    dek:
      "Metros ranked by the count of hyperscaler-announced cloud regions they host.",
    category: "geography",
    publishedAt: "2026-05-21",
    lastUpdated: "2026-05-21",
    dimension:
      "Metros by count of in-service hyperscaler-announced cloud regions, plus secondary count of countries-served-from-this-metro.",
    methodology:
      "Reads the three hyperscaler region directories (AWS, Google Cloud, Microsoft Azure), pins each region to a Radar metro via the city record's cloudRegionRefs, and counts. Sovereignty regions are counted separately. The ranking is single-indicator and reports the raw count.",
    weighting: "Single-indicator. No composite weights.",
    indicatorSlugs: ["cloud-region-concentration"],
    recomputeCadence: "Monthly",
    status: "pending-dataset",
    confidence: "high",
    limitations: [
      "Smaller hyperscalers (Oracle, IBM, Tencent, Alibaba) are not yet ingested.",
      "Region GA dates change irregularly; the ranking may briefly lag new announcements between recompute cycles.",
      "A metro that hosts more regions of one provider but none of another may rank higher than a more diversified metro; the dataset publishes the per-provider break-down alongside the headline count.",
    ],
    relatedEntityRefs: [
      "city:frankfurt",
      "city:ashburn",
      "city:singapore",
      "country:germany",
      "country:united-states",
      "country:singapore",
    ],
    sources: [
      {
        sourceId: "aws-regions",
        url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
        checkedAt: CHECKED_AT,
        note: "AWS region directory.",
      },
      {
        sourceId: "gcp-regions",
        url: "https://cloud.google.com/about/locations",
        checkedAt: CHECKED_AT,
        note: "Google Cloud locations.",
      },
      {
        sourceId: "azure-regions",
        url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
        checkedAt: CHECKED_AT,
        note: "Microsoft Azure geographies.",
      },
    ],
  },
  {
    slug: "most-connected-cities",
    title: "Most connected cities",
    dek:
      "Metros ranked by the connected-network count of the largest local Internet Exchange Point.",
    category: "interconnection",
    publishedAt: "2026-05-21",
    lastUpdated: "2026-05-21",
    dimension:
      "Per metro: the connected-network count of the largest local IXP, drawn from PeeringDB. Membership-based, not traffic-based.",
    methodology:
      "Reads PeeringDB for IXPs whose primary facility is in the metro. Per metro, the largest IXP's connected-network count is the ranking value. Multi-facility fabrics are counted as one IXP. The choice of largest-IXP rather than aggregate-across-IXPs is documented — the largest IXP is the practical anchor; an aggregate would dilute the signal in metros with many small IXPs.",
    weighting: "Single-indicator. No composite weights.",
    indicatorSlugs: ["ixp-density"],
    recomputeCadence: "Weekly",
    status: "pending-dataset",
    confidence: "high",
    limitations: [
      "Connected-network count is membership; it does not measure traffic share.",
      "Several IXP fabrics span multiple metros; the ranking attributes them to the primary anchor metro, which can flatter that metro.",
      "National IXPs in jurisdictions with restricted public-data norms are under-represented in PeeringDB.",
    ],
    relatedEntityRefs: ["ixp:de-cix-frankfurt", "city:frankfurt"],
    sources: [
      {
        sourceId: "peeringdb",
        url: "https://www.peeringdb.com/",
        checkedAt: CHECKED_AT,
        note: "Authoritative IXP member-count catalogue.",
      },
    ],
  },
  {
    slug: "subsea-connectivity-hubs",
    title: "Subsea connectivity hubs",
    dek:
      "Countries ranked by count of in-service submarine cable landings and by distinct cable corridors.",
    category: "resilience",
    publishedAt: "2026-05-21",
    lastUpdated: "2026-05-21",
    dimension:
      "Per country: count of in-service cable landings (headline), count of distinct corridors (resilience-relevant), and a flag for landings reached via short cross-border backhaul.",
    methodology:
      "Reads TeleGeography's Submarine Cable Map for in-service cable systems. Each cable is mapped to landing country and to an editorially-coded corridor. The ranking reports the two figures separately so corridor diversity is not hidden inside the headline landing count.",
    weighting: "Two-dimensional. Landing count is the headline; corridor diversity is the explanatory secondary.",
    indicatorSlugs: ["subsea-connectivity"],
    recomputeCadence: "Quarterly",
    status: "pending-dataset",
    confidence: "high",
    limitations: [
      "Out-of-service and announced-but-not-yet-RFS cables are excluded.",
      "Corridor coding is editorial; the methodology paragraph in the underlying dataset documents the corridor list and the criteria for combining or separating corridors.",
      "Cross-border backhaul affects effective resilience; the ranking flags it but does not adjust the headline count.",
    ],
    relatedEntityRefs: ["country:singapore", "city:singapore"],
    sources: [
      {
        sourceId: "telegeography",
        url: "https://www.submarinecablemap.com/",
        checkedAt: CHECKED_AT,
        note: "Authoritative public submarine cable map.",
      },
    ],
  },
  {
    slug: "internet-resilience",
    title: "Internet resilience",
    dek:
      "Countries ranked along three resilience sub-figures: cable corridor diversity, major IXP-metro count, cloud-region diversity.",
    category: "resilience",
    publishedAt: "2026-05-21",
    lastUpdated: "2026-05-21",
    dimension:
      "Per country: a composite of three sub-figures published alongside each other rather than collapsed into a single score.",
    methodology:
      "Each sub-figure is computed from its own dataset: corridors from the subsea-cable-landings dataset, major IXP metros from the IXP-hubs dataset (with a documented `major` threshold), and cloud-region diversity from the global-cloud-regions dataset. The composite *does not* publish a single ranked number; it publishes the three values side by side. Readers compose them as needed.",
    weighting:
      "Composite of three sub-figures. Editorial position: no single weighting is right for every reader, so no weighting is applied — the sub-figures are published separately.",
    indicatorSlugs: [
      "subsea-connectivity",
      "ixp-density",
      "cloud-region-concentration",
      "infrastructure-redundancy",
    ],
    recomputeCadence: "Quarterly",
    status: "methodology-in-draft",
    confidence: "medium",
    limitations: [
      "Refusing to publish a single composite score is the point — but it makes the ranking harder to read at a glance.",
      "The `major IXP` threshold for sub-figure 2 is an editorial choice that affects every comparison.",
      "The ranking measures structural resilience, not operational resilience. Shared power-grid regions are not captured.",
    ],
    relatedEntityRefs: ["country:singapore", "country:germany", "country:united-states"],
    sources: [
      {
        sourceId: "telegeography",
        url: "https://www.submarinecablemap.com/",
        checkedAt: CHECKED_AT,
        note: "Submarine cable corridors.",
      },
      {
        sourceId: "peeringdb",
        url: "https://www.peeringdb.com/",
        checkedAt: CHECKED_AT,
        note: "Per-metro IXP and facility counts.",
      },
      {
        sourceId: "aws-regions",
        url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
        checkedAt: CHECKED_AT,
        note: "Cross-cloud region availability.",
      },
    ],
  },
  {
    slug: "ai-infrastructure-readiness",
    title: "AI infrastructure readiness",
    dek:
      "Metros / countries ranked by capacity to host large-scale AI workloads.",
    category: "ai",
    publishedAt: "2026-05-21",
    lastUpdated: "2026-05-21",
    dimension:
      "Composite of three dimensions: hyperscaler AI-instance regional availability, publicly-disclosed power and cooling supply signals, and cable / interconnection headroom.",
    methodology:
      "AI-instance availability comes from the hyperscaler region directories. Power and cooling supply signals are admitted only when published by primary sources (provider or utility). Interconnection headroom uses the IXP-density and cloud-region-concentration indicators. The composite's weighting is part of the published methodology; no opaque scoring.",
    weighting:
      "Composite. Equal-weight at draft stage; the weighting is documented per ranking refresh and is itself part of the published surface.",
    indicatorSlugs: ["cloud-region-concentration", "ixp-density"],
    recomputeCadence: "Quarterly",
    status: "methodology-in-draft",
    confidence: "low",
    limitations: [
      "AI infrastructure changes faster than the recompute cadence of every available source.",
      "Power and cooling supply data is sparsely published.",
      "GPU generation parity is not in the ranking; two regions with the same instance count may have materially different capability.",
      "Specialist GPU operators (CoreWeave, Lambda, neoclouds) are not yet ingested at metro level.",
    ],
    relatedEntityRefs: [
      "city:ashburn",
      "city:frankfurt",
      "city:singapore",
      "country:united-states",
    ],
    sources: [
      {
        sourceId: "aws-regions",
        url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
        checkedAt: CHECKED_AT,
        note: "AWS AI-instance availability.",
      },
      {
        sourceId: "gcp-regions",
        url: "https://cloud.google.com/about/locations",
        checkedAt: CHECKED_AT,
        note: "Google Cloud TPU / GPU availability.",
      },
      {
        sourceId: "azure-regions",
        url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
        checkedAt: CHECKED_AT,
        note: "Microsoft Azure AI-instance availability.",
      },
      {
        sourceId: "peeringdb",
        url: "https://www.peeringdb.com/",
        checkedAt: CHECKED_AT,
        note: "Colocation footprint context.",
      },
      {
        sourceId: "telegeography",
        url: "https://www.telegeography.com/",
        checkedAt: CHECKED_AT,
        note: "Interconnection-market context.",
      },
    ],
  },
];

export function getRanking(slug: string): Ranking | undefined {
  return RANKINGS.find((r) => r.slug === slug);
}

export function listRankingSlugs(): ReadonlyArray<string> {
  return RANKINGS.map((r) => r.slug);
}

export function listRankingsByIndicator(
  indicatorSlug: string,
): ReadonlyArray<Ranking> {
  return RANKINGS.filter((r) => r.indicatorSlugs.includes(indicatorSlug));
}
