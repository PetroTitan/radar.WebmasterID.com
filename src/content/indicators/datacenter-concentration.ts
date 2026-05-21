import type { Indicator } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const DATACENTER_CONCENTRATION: Indicator = {
  slug: "datacenter-concentration",
  title: "Datacenter concentration",
  dek:
    "How dense a metro's datacenter facility footprint is, by count of distinct carrier-neutral facilities.",
  category: "concentration",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  measures:
    "Per metro: the count of distinct datacenter facilities catalogued on PeeringDB; the count of distinct facility operators; and the share of catalogued capacity hosted by the top three operators.",
  significance:
    "Datacenter concentration is the substrate of every other infrastructure indicator. A metro can host cloud regions, IXPs, and submarine-cable backhaul only if it has enough physical facilities, with enough fibre between them, and enough power to draw on. The indicator is a structural read of a metro's capacity to support further infrastructure growth.",
  methodology:
    "PeeringDB's catalogued facilities per metro are counted; multi-building campuses operated by the same operator are counted as one facility. The top-three-operator concentration share uses each operator's facility count as a proxy for capacity share — a known approximation, called out in the limitations.",
  unit: "Count of facilities; count of operators; top-three share (percent)",
  limitations: [
    "Facility count is a proxy for capacity. A single 100 MW facility and a single 5 MW facility count the same. Capacity-aware figures would require power-disclosure data the industry mostly does not publish.",
    "Operators consolidate (mergers and acquisitions); PeeringDB's facility-to-operator mapping occasionally lags operator changes.",
    "The top-three concentration share is informative but reductive. The full operator distribution is published as a separate dimension.",
    "Some metros have facilities outside PeeringDB's catalogue (notably enterprise-private facilities). The indicator under-counts those.",
  ],
  datasetSlugs: ["internet-exchange-hubs"],
  rankingSlugs: ["cloud-infrastructure-hubs"],
  relatedEntityRefs: ["city:ashburn", "city:frankfurt", "city:singapore"],
  sources: [
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Facility catalogue and operator mapping.",
    },
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "Colocation-market reporting.",
    },
  ],
};
