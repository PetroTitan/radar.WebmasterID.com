import type { Dataset } from "@/entities";

const CHECKED_AT = "2026-05-21";

export const SUBSEA_CABLE_LANDINGS: Dataset = {
  slug: "subsea-cable-landings",
  title: "Submarine cable landings",
  dek:
    "Coastal landing-station and landing-metro inventory for major in-service submarine cable systems.",
  category: "resilience",
  publishedAt: "2026-05-21",
  lastUpdated: "2026-05-21",
  status: "pending",
  confidence: "medium",
  methodology:
    "Cable-system identity (name, consortium, ready-for-service date, landing countries) is sourced from TeleGeography's published Submarine Cable Map. Each landing point is recorded with the country (ISO 3166-1) and the inland metro that backhauls the traffic — when the landing station and the interconnection metro differ (e.g. Virginia Beach → Ashburn), both are recorded. Cable polyline geometry is not stored; the landing-station endpoint pairs are the strategic geography.",
  limitations: [
    "Design capacity differs from operating capacity. The dataset records design capacity (when published) and notes that operating capacity is upgraded across the cable's life through endpoint equipment changes.",
    "Some recent cable systems' landing-station coordinates are not publicly disclosed at the precise facility level. The dataset records metro-level pinning in those cases.",
    "Out-of-service and planned-but-not-yet-RFS cables are tagged separately and do not count as in-service landings.",
    "Cable polylines (the actual sea route) are intentionally out of scope; the dataset would mislead if it implied a level of routing precision the underlying source does not publish.",
  ],
  relatedEntityRefs: ["country:singapore", "city:singapore", "city:ashburn"],
  indicatorSlugs: ["subsea-connectivity", "infrastructure-redundancy"],
  mapPath: "/maps/subsea-cables",
  sources: [
    {
      sourceId: "telegeography",
      url: "https://www.submarinecablemap.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative public submarine cable map.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Landing-station facility presence and inland metro interconnection.",
    },
  ],
};
