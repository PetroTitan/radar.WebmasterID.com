import type { Dataset } from "@/entities";

const CHECKED_AT = "2026-05-22";

export const INTERNET_EXCHANGE_HUBS: Dataset = {
  slug: "internet-exchange-hubs",
  title: "Internet Exchange Points",
  dek:
    "Operator-published and PeeringDB-verified IXP identity records — name, operator, country, metro, primary facility coordinates.",
  category: "interconnection",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-22",
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
  relatedEntityRefs: [
    "ixp:de-cix-frankfurt",
    "city:frankfurt",
    "city:amsterdam",
    "city:london",
    "city:ashburn",
    "country:germany",
    "country:netherlands",
    "country:united-kingdom",
    "country:united-states",
  ],
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
    {
      sourceId: "ams-ix",
      url: "https://www.ams-ix.net/ams",
      checkedAt: CHECKED_AT,
      note: "AMS-IX operator location page.",
    },
    {
      sourceId: "linx",
      url: "https://www.linx.net/about/our-exchanges/lon1/",
      checkedAt: CHECKED_AT,
      note: "LINX LON1 operator location page.",
    },
  ],
  recordCount: 7,
};
