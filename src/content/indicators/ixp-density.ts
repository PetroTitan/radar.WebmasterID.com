import type { Indicator } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const IXP_DENSITY: Indicator = {
  slug: "ixp-density",
  title: "IXP density",
  dek:
    "How many distinct Internet Exchange Points operate in a metro, and how many networks they collectively serve.",
  category: "interconnection",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  measures:
    "The count of distinct IXPs operating in a metro, the largest IXP's connected-network count, and (composite) the share of that count made up of content networks, eyeball ISPs, and enterprise networks per PeeringDB classification.",
  significance:
    "The density of peering is the practical map of how the internet is routed in a region. A high-density IXP metro is a region where most local-to-local traffic is exchanged without paying transit; a low-density metro is one whose traffic still leaks to interconnection metros elsewhere. Operator decisions about where to land capacity, where to put content caches, and where to base latency-sensitive workloads track this indicator closely.",
  methodology:
    "PeeringDB's IXP catalogue is read directly. Per metro, the count of distinct IXPs is taken from the catalogued IXPs whose primary facility is in the metro. The connected-network count for each IXP is recorded from the same source. Multi-facility IXP fabrics are counted as one IXP. National IXPs with restricted-jurisdiction reporting may be under-represented; the indicator notes this in its limitations.",
  unit: "Count of IXPs, count of connected networks",
  limitations: [
    "Membership figures move weekly. The indicator stores observation dates with every value.",
    "PeeringDB undercounts national IXPs in jurisdictions with restricted public-data norms.",
    "Multi-metro / distributed IXP fabrics are counted at the primary anchor metro, which can flatter that metro's density.",
    "Connected-network count does not distinguish dormant vs. active members; traffic-share is a separate (volatile) signal.",
  ],
  datasetSlugs: ["internet-exchange-hubs"],
  rankingSlugs: ["most-connected-cities"],
  relatedEntityRefs: ["ixp:de-cix-frankfurt", "city:frankfurt"],
  sources: [
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative IXP and member-network catalogue.",
    },
    {
      sourceId: "de-cix",
      url: "https://www.de-cix.net/en/locations/frankfurt",
      checkedAt: CHECKED_AT,
      note: "DE-CIX-published statistics.",
    },
  ],
};
