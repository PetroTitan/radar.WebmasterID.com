import type { Indicator } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const INFRASTRUCTURE_REDUNDANCY: Indicator = {
  slug: "infrastructure-redundancy",
  title: "Infrastructure redundancy",
  dek:
    "How fragile or resilient a country's internet infrastructure is to the loss of any single cable corridor, IXP, or metro.",
  category: "resilience",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  measures:
    "A composite read of three sub-figures: (1) count of distinct submarine cable corridors landing in or reachable from the country, (2) count of in-country metros hosting major IXP capacity, and (3) the diversity of major cloud regions reachable on short latency. The composite is reported alongside each sub-figure so the inputs are visible.",
  significance:
    "Single-number resilience scores are misleading because they collapse independent failure modes. The indicator publishes the three sub-figures separately and lets the reader compose them as needed. For policy, the corridor diversity matters most; for operator architecture, the IXP and cloud diversity matter more.",
  methodology:
    "Corridors are coded editorially from TeleGeography's published map and listed in the underlying dataset's methodology. IXP-metro counts come from PeeringDB's published facility data per metro, classified as `major` when the largest IXP in the metro exceeds an editorially-documented threshold of connected networks. Cloud-region diversity is read from each provider's region directory.",
  unit: "Count of corridors; count of major IXP metros; count of cloud regions",
  limitations: [
    "Corridor coding is editorial. The methodology paragraph in the underlying dataset documents the specific corridor list and the criteria for combining or separating corridors.",
    "The `major IXP` threshold is documented; it is not a measurement, it is a choice that affects every comparison made using the indicator.",
    "The indicator measures structural redundancy, not operational redundancy. Two metros sharing one power-grid region are operationally less redundant than the indicator suggests.",
    "Cross-border backhaul affects effective redundancy in non-obvious ways; the indicator captures it implicitly via the corridor count but does not score it directly.",
  ],
  datasetSlugs: ["subsea-cable-landings", "internet-exchange-hubs", "global-cloud-regions"],
  rankingSlugs: ["internet-resilience"],
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
      note: "AWS regions for cross-cloud diversity context.",
    },
  ],
};
