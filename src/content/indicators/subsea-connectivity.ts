import type { Indicator } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const SUBSEA_CONNECTIVITY: Indicator = {
  slug: "subsea-connectivity",
  title: "Subsea connectivity",
  dek:
    "How many in-service submarine cable systems land in a country, and how diverse the corridors of those cables are.",
  category: "resilience",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  measures:
    "Per country: the count of in-service submarine cable landings, the count of distinct geographic corridors those cables traverse, and the share of cables landing inside the country versus reached via short cross-border backhaul.",
  significance:
    "Submarine cables carry the bulk of intercontinental internet traffic. A country with many landings but on a small number of corridors is structurally more fragile than a country with the same landing count distributed across diverse corridors. The indicator separates raw count (a flattering single number) from corridor diversity (the resilience-relevant figure).",
  methodology:
    "TeleGeography's Submarine Cable Map is read for in-service cable systems. Each cable's landing points are mapped to country (ISO 3166-1). Corridors are coded from the published map — a cable transiting the Red Sea is in the Red Sea corridor; a transpacific cable is in the transpacific corridor; etc. Out-of-service and planned-but-not-yet-RFS cables are excluded from the headline count.",
  unit: "Count of cable landings, count of distinct corridors",
  limitations: [
    "Some cables' landing-station coordinates are not publicly disclosed at the precise facility level. The indicator records country and corridor at metro-level pinning in those cases.",
    "Corridor coding is editorial. Two corridors that share a chokepoint (e.g. the Red Sea / Suez transit) may be combined or separated depending on analytical purpose; the indicator's methodology paragraph documents the choice in the underlying dataset.",
    "Inland routing from the landing station to the interconnection metro is a separate concern; the indicator captures only the landing geography.",
    "Cable design capacity vs operating capacity is not in the indicator; capacity is a separate dimension on dated observation records.",
  ],
  datasetSlugs: ["subsea-cable-landings"],
  rankingSlugs: ["subsea-connectivity-hubs", "internet-resilience"],
  relatedEntityRefs: ["country:singapore", "city:singapore", "city:ashburn"],
  sources: [
    {
      sourceId: "telegeography",
      url: "https://www.submarinecablemap.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative public submarine cable map.",
    },
  ],
};
