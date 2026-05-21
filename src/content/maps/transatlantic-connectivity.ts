import type { InfrastructureMap } from "@/entities";

const CHECKED_AT = "2026-05-28";

export const TRANSATLANTIC_CONNECTIVITY_MAP: InfrastructureMap = {
  slug: "transatlantic-connectivity",
  title: "Transatlantic connectivity corridors",
  dek:
    "Editorial topology of the US east-coast and Western European landing geographies, with subsea corridors abstracted as curves between coastal areas — not as cable polylines.",
  category: "subsea",
  geographicScope: "North Atlantic corridor",
  summary:
    "An editorial topology map of the US east-coast landing-to-inland-metro flow (Virginia Beach and New York to Ashburn) and the UK / EU landing-to-inland-metro flow (Bude and Bilbao to London, Paris, and Frankfurt). Subsea corridors are abstracted as curves between coastal landing areas; the platform explicitly refuses to draw cable polylines.",
  methodology: [
    "Node positions are abstract grid coordinates chosen for editorial legibility, not longitude / latitude.",
    "Subsea curves between coastal landing areas represent corridors, not cable polylines. Per TeleGeography reporting, the actual sea routes follow proprietary engineering paths the consortium does not always publish.",
    "Inland backhaul lines (Virginia Beach → Ashburn, Bude → London) are shown explicitly because the backhaul corridor is editorially load-bearing — it explains why a transatlantic cable lands at one metro and yet anchors traffic at a different inland metro.",
    "Primary metros (Ashburn, London, Frankfurt) carry their cloud-region and IXP labels; secondary metros (Paris, New York) anchor regional corridors without being explicit cloud-region anchors in this view.",
    "Landing areas (Virginia Beach, Bude, Bilbao) are shown as landing-role nodes rather than metro nodes; the platform treats them as corridor termination points, not as standalone metros.",
  ],
  caveats: [
    "The platform refuses to draw exact subsea polylines under any circumstance. Curves on this map indicate corridors only.",
    "Cable system identity is recorded in the subsea-cable registry; this map does not enumerate individual systems.",
    "The Iberian landing corridor (Bilbao) is shown because the cloud-funded era (MAREA, Grace Hopper) increasingly uses it; landings on the French coast (Saint-Hilaire-de-Riez for Dunant, Saint-Valery-en-Caux for older systems) are not depicted here to keep the diagram legible.",
    "The map shows direction-of-flow corridors. It does not encode capacity, RTT, or any volatile metric.",
  ],
  relatedEntityRefs: [
    "city:ashburn",
    "city:london",
    "city:frankfurt",
    "country:united-states",
    "country:united-kingdom",
    "country:germany",
  ],
  relatedGuideSlugs: ["subsea-cables", "infrastructure-redundancy", "interconnection"],
  relatedDatasetSlugs: ["subsea-cable-landings"],
  relatedCableSlugs: ["marea", "tat-14"],
  relatedHistorySlugs: ["transatlantic-cables", "mae-east"],
  mediaId: "map-transatlantic-connectivity-corridors",
  diagramComponent: "TransatlanticConnectivityCorridorMap",
  sources: [
    {
      sourceId: "telegeography",
      url: "https://www.submarinecablemap.com/",
      checkedAt: CHECKED_AT,
      note: "Authoritative public submarine cable map; landing-area corroboration.",
    },
    {
      sourceId: "fcc",
      url: "https://www.fcc.gov/general/submarine-cable-landing-licenses",
      checkedAt: CHECKED_AT,
      note: "FCC submarine cable landing licenses (US landings).",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Inland-metro facility records (Ashburn cluster).",
    },
  ],
  editorialNotes: [
    "Future revisions can add the French landing corridor as a third landing node once the corresponding inland metro entity (Paris) is seeded.",
    "The diagram is intentionally west-up to mirror the operator-typical view of transatlantic capacity.",
  ],
  confidence: "high",
  lastUpdated: CHECKED_AT,
};
