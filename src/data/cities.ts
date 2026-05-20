import type { City } from "@/entities";

/**
 * Verified city records.
 *
 * Each record is hand-curated and source-cited. The city is the
 * practical unit of internet infrastructure (Ashburn vs. Reston vs.
 * Sterling collapse into "Ashburn" for routing purposes).
 */

const CHECKED_AT = "2026-05-20";

export const CITIES: ReadonlyArray<City> = [
  {
    slug: "frankfurt",
    name: "Frankfurt",
    countryCode: "DE",
    countrySlug: "germany",
    aliases: ["Frankfurt am Main", "FRA"],
    summary:
      "Frankfurt is a major European interconnection metro. It is the seat of DE-CIX Frankfurt, an Internet Exchange Point operated by DE-CIX Management GmbH, and hosts a dense cluster of colocation facilities listed on PeeringDB.",
    ixpSlugs: ["de-cix-frankfurt"],
    cloudRegionRefs: [],
    cableSlugs: [],
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "DE-CIX Frankfurt and Frankfurt-metro facility listings.",
        },
      ],
      note: "Specific facility records and cloud region pinning await ingestion.",
    },
  },
  {
    slug: "ashburn",
    name: "Ashburn",
    countryCode: "US",
    countrySlug: "united-states",
    aliases: ["Northern Virginia", "NoVA"],
    summary:
      "Ashburn is a Loudoun County, Virginia metro that hosts a dense concentration of datacenter facilities listed on PeeringDB and serves as the origin metro for several cloud-provider US east-coast regions.",
    ixpSlugs: [],
    cloudRegionRefs: [],
    cableSlugs: [],
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "Facility listings for Ashburn / Northern Virginia metro.",
        },
      ],
      note: "Specific facility records and cloud region pinning await ingestion.",
    },
  },
  {
    slug: "singapore",
    name: "Singapore",
    countryCode: "SG",
    countrySlug: "singapore",
    aliases: ["SIN"],
    summary:
      "Singapore is the city-state's principal interconnection metro and a convergence point for multiple submarine cable systems linking Southeast Asia to neighbouring regions, as recorded on TeleGeography's Submarine Cable Map.",
    ixpSlugs: [],
    cloudRegionRefs: [],
    cableSlugs: [],
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "Submarine cable landings at Singapore.",
        },
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "Facility listings for Singapore metro.",
        },
      ],
      note: "Facility records and IXP pinning await ingestion.",
    },
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug);
}

export function listCitySlugs(): ReadonlyArray<string> {
  return CITIES.map((city) => city.slug);
}
