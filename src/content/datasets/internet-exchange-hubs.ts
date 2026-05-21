import type { Dataset } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const INTERNET_EXCHANGE_HUBS: Dataset = {
  slug: "internet-exchange-hubs",
  title: "Internet Exchange Points",
  dek:
    "Operator-published and PeeringDB-verified IXP identity records — name, operator, country, metro, primary facility coordinates.",
  category: "interconnection",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  status: "partial",
  confidence: "high",
  methodology:
    "Each IXP identity record is cross-referenced between PeeringDB's catalogued entry and the operator's own published location page. Where the two agree, the record is admitted. Volatile metrics — current connected-network count, peak traffic — are kept off the identity record entirely and live on dated InfrastructureMetric observations. The identity dataset stores only operator, country, metro, primary facility coordinates, official website, and (when verified) the PeeringDB IX ID.",
  limitations: [
    "Several large IXPs operate across multiple facilities or metros; the dataset records the primary anchor location only.",
    "Membership figures change weekly. The dataset deliberately does not store member counts — those belong on dated observations elsewhere.",
    "Some regional / national IXPs (notably in jurisdictions with restricted public-data norms) are absent from PeeringDB and therefore from this dataset.",
    "The PeeringDB IX ID is verified at ingestion time and may be left undefined on partially-seeded records.",
  ],
  relatedEntityRefs: ["ixp:de-cix-frankfurt", "city:frankfurt", "country:germany"],
  indicatorSlugs: ["ixp-density"],
  mapPath: "/maps/ixps",
  sources: [
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative IXP registry.",
    },
    {
      sourceId: "de-cix",
      url: "https://www.de-cix.net/en/locations",
      checkedAt: CHECKED_AT,
      note: "DE-CIX operator location pages.",
    },
  ],
  recordCount: 7,
};
