import type { Country } from "@/entities";

/**
 * Verified country records.
 *
 * Each record is hand-curated and source-cited. Identity facts
 * (ISO 3166-1 code, UN M.49 region) are sourced from World Bank
 * Open Data. Infrastructure-role facts in the summary are cited to
 * the source that supports them (PeeringDB for IXP presence,
 * TeleGeography for subsea cable landings).
 */

const CHECKED_AT = "2026-05-20";

export const COUNTRIES: ReadonlyArray<Country> = [
  {
    slug: "germany",
    code: "DE",
    name: "Germany",
    region: "Western Europe",
    continent: "Europe",
    summary:
      "Germany is a Western European country. It hosts Frankfurt, a major European interconnection metro, and DE-CIX Frankfurt, an Internet Exchange Point operated by DE-CIX Management GmbH.",
    hubCitySlugs: ["frankfurt"],
    ixpSlugs: ["de-cix-frankfurt"],
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "world-bank-open-data",
          url: "https://data.worldbank.org/country/DE",
          checkedAt: CHECKED_AT,
          note: "Geographic classification (ISO 3166-1, UN M.49).",
        },
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "DE-CIX Frankfurt identity and Frankfurt facility presence.",
        },
      ],
      note: "Quantitative metrics (cloud regions, cable landings, IPv6 adoption) await ingestion from their respective sources.",
    },
  },
  {
    slug: "singapore",
    code: "SG",
    name: "Singapore",
    region: "South-Eastern Asia",
    continent: "Asia",
    summary:
      "Singapore is a Southeast Asian city-state. It is a convergence point for multiple submarine cable systems linking Southeast Asia to East Asia, Australia, and South Asia, as recorded on TeleGeography's Submarine Cable Map.",
    hubCitySlugs: ["singapore"],
    ixpSlugs: [],
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "world-bank-open-data",
          url: "https://data.worldbank.org/country/SG",
          checkedAt: CHECKED_AT,
          note: "Geographic classification (ISO 3166-1, UN M.49).",
        },
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "Submarine cable landings in Singapore.",
        },
      ],
      note: "IXP and cloud region records await editorial review before being added.",
    },
  },
  {
    slug: "united-states",
    code: "US",
    name: "United States",
    region: "Northern America",
    continent: "North America",
    summary:
      "The United States is a Northern American country. It hosts Ashburn, Virginia — a metro with a dense concentration of datacenter facilities listed on PeeringDB and the origin metro for several cloud-provider US east-coast regions.",
    hubCitySlugs: ["ashburn"],
    ixpSlugs: [],
    provenance: {
      lastUpdated: "2026-05-20",
      confidence: "high",
      sources: [
        {
          sourceId: "world-bank-open-data",
          url: "https://data.worldbank.org/country/US",
          checkedAt: CHECKED_AT,
          note: "Geographic classification (ISO 3166-1, UN M.49).",
        },
        {
          sourceId: "peeringdb",
          url: "https://www.peeringdb.com/",
          checkedAt: CHECKED_AT,
          note: "Ashburn facility listings.",
        },
      ],
      note: "Cloud region pinning and IXP records await ingestion.",
    },
  },
];

export function getCountry(slug: string): Country | undefined {
  return COUNTRIES.find((country) => country.slug === slug);
}

export function getCountryByCode(code: string): Country | undefined {
  const upper = code.toUpperCase();
  return COUNTRIES.find((country) => country.code === upper);
}

export function listCountrySlugs(): ReadonlyArray<string> {
  return COUNTRIES.map((country) => country.slug);
}
