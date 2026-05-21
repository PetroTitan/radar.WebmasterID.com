import type { Indicator } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const CARRIER_NEUTRALITY: Indicator = {
  slug: "carrier-neutrality",
  title: "Carrier neutrality",
  dek:
    "The share of a metro's interconnection capacity that sits in carrier-neutral facilities — facilities whose operator does not itself sell connectivity.",
  category: "concentration",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  measures:
    "Per metro: the count of carrier-neutral colocation facilities per PeeringDB, and (where the data exists) the share of major carrier interconnections that happen inside carrier-neutral facilities versus carrier-owned premises.",
  significance:
    "Carrier neutrality is the structural property that lets networks interconnect on roughly equal terms. A metro whose interconnection happens primarily inside carrier-neutral facilities has lower switching costs for member networks, broader transit provider competition, and is harder to capture by any single operator. The indicator separates a region's headline facility count from the property of *whose* facilities the count comprises.",
  methodology:
    "PeeringDB's facility catalogue is read for each metro. Each facility's operator is tagged carrier-neutral or carrier-owned based on the operator's published business model. Carrier-neutral operators (Equinix, Digital Realty / Interxion, NTT, CoreSite, etc.) are counted as one class; carrier-owned facilities (telco-operated colocation) are counted separately. Where the classification is ambiguous, the indicator records the ambiguity rather than collapsing it.",
  unit: "Count of carrier-neutral facilities; percent of interconnection in carrier-neutral premises",
  limitations: [
    "PeeringDB's operator classifications are community-maintained and occasionally lag operator changes.",
    "The carrier-neutral / carrier-owned distinction is a continuum rather than a binary; some operators are partially independent. The indicator records the ambiguous cases.",
    "Smaller national operators may run mixed-business-model facilities. The indicator tags these as ambiguous unless the operator publishes a clear position.",
  ],
  datasetSlugs: [],
  rankingSlugs: [],
  relatedEntityRefs: ["city:frankfurt", "city:ashburn", "city:singapore"],
  sources: [
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Carrier-neutral facility catalogue.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Colocation-market context.",
    },
  ],
};
