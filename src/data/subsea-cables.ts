import type { SubseaCable } from "@/entities";

/**
 * Verified submarine cable records.
 *
 * Identity facts (name, consortium, ready-for-service year,
 * landing points) are sourced from TeleGeography's published
 * Submarine Cable Map and corroborated against the consortium
 * members' own public disclosures (operator press releases, FCC
 * filings, peer-reviewed reporting). Design capacity is recorded
 * only when the operating consortium has officially disclosed it.
 *
 * Volatile fields — operating capacity, in-service status, current
 * ownership share — are not stored here; they belong on dated
 * observations elsewhere. Cable polylines (the actual sea route)
 * are intentionally out of scope.
 *
 * The current registry is small by design. New cables are added
 * only after editorial review of the consortium's own
 * disclosures.
 */

const CHECKED_AT = "2026-05-25";

export const SUBSEA_CABLES: ReadonlyArray<SubseaCable> = [
  {
    slug: "marea",
    name: "MAREA",
    owners: ["Microsoft", "Meta (Facebook)", "Telxius"],
    readyForServiceAt: "2018-02-01",
    landingCitySlugs: ["ashburn"],
    corridor: "Transatlantic",
    designCapacityTbps: 200,
    summary:
      "MAREA is a transatlantic subsea cable jointly funded by Microsoft, Meta (then Facebook), and Telxius. Per the consortium's public disclosures, it lands at Virginia Beach in the United States and at Bilbao in Spain, with announced design capacity of 200 Tbps at ready-for-service in 2018.",
    editorialNotes: [
      "Radar's city registry pins MAREA to Ashburn because Virginia Beach traffic backhauls inland to the Northern Virginia interconnection metro. A dedicated Virginia Beach city entity is not seeded.",
      "Bilbao landing is documented in the consortium's announcement but is not in Radar's city registry; the route metadata records the U.S. anchor only.",
    ],
    provenance: {
      lastUpdated: CHECKED_AT,
      confidence: "high",
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "MAREA cable system page on the TeleGeography Submarine Cable Map.",
        },
      ],
      note: "Operator disclosures for MAREA are public; the 200 Tbps figure is the consortium's announced design capacity, not an in-service measurement.",
    },
  },
  {
    slug: "tat-14",
    name: "TAT-14",
    owners: [
      "TAT-14 consortium (50+ telecom operators, including BT, AT&T, Deutsche Telekom, Sprint)",
    ],
    readyForServiceYear: "2001",
    landingCitySlugs: [],
    corridor: "Transatlantic",
    summary:
      "TAT-14 is a transatlantic submarine cable system in service since 2001, funded by a consortium of more than fifty operators. Per TeleGeography reporting, it lands at multiple points in the United States, the United Kingdom, France, the Netherlands, Germany, and Denmark — anchoring the early 2000s era of transatlantic capacity before the cloud-funded cable wave.",
    editorialNotes: [
      "Radar's city registry does not currently include the specific TAT-14 landing metros (Manasquan, Tuckerton, Bude, Saint-Valery-en-Caux, Norden, Katwijk, Blaabjerg); the landing list is therefore empty in this record until the corresponding metros are seeded.",
      "Operating capacity has been upgraded across the cable's life through endpoint equipment changes; the platform does not store current operating capacity.",
    ],
    provenance: {
      lastUpdated: CHECKED_AT,
      confidence: "medium",
      sources: [
        {
          sourceId: "telegeography",
          url: "https://www.submarinecablemap.com/",
          checkedAt: CHECKED_AT,
          note: "TAT-14 cable system page on the TeleGeography Submarine Cable Map.",
        },
      ],
      note: "Year-precision ready-for-service is the canonical record for TAT-14; the consortium's original press materials are no longer maintained on a single canonical URL, so TeleGeography is the principal source.",
    },
  },
];

export function getSubseaCable(slug: string): SubseaCable | undefined {
  return SUBSEA_CABLES.find((c) => c.slug === slug);
}

export function listSubseaCableSlugs(): ReadonlyArray<string> {
  return SUBSEA_CABLES.map((c) => c.slug);
}
