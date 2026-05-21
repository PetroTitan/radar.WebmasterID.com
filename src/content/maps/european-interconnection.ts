import type { InfrastructureMap } from "@/entities";

const CHECKED_AT = "2026-05-28";

export const EUROPEAN_INTERCONNECTION_MAP: InfrastructureMap = {
  slug: "european-interconnection",
  title: "European interconnection corridors",
  dek:
    "Editorial topology of the FLAP cluster (Frankfurt, London, Amsterdam, Paris) with secondary corridors to Madrid and Milan.",
  category: "interconnection",
  geographicScope: "Europe — FLAP cluster + secondary corridors",
  summary:
    "An editorial topology map of the four metros through which the bulk of intra-European internet traffic moves, plus secondary routes south to Madrid and Milan. Node positions are abstract; corridor lines depict topology, not exact fibre paths.",
  methodology: [
    "Node positions are chosen for editorial legibility on the diagram's abstract grid. They are not geographic coordinates and the platform refuses to imply GIS precision.",
    "Corridor lines mark editorially-recognised primary routes between FLAP metros. Per TeleGeography reporting, the principal European terrestrial backbones interconnect at Frankfurt before fanning out toward Amsterdam, London, Paris, Milan, and Vienna.",
    "Primary nodes (Frankfurt, London, Amsterdam) carry their seeded IXP and cloud-region anchor labels; Paris is shown as a secondary node because Radar's IXP entity registry does not yet seed France-IX.",
    "Madrid and Milan are included as secondary anchors to indicate the principal Southern European corridors; the platform does not yet seed their entities.",
  ],
  caveats: [
    "The map is an editorial schematic, not a routing diagram. Operators planning capacity should consult their carrier's own route maps; the FLAP topology is a description of where the traffic concentrates, not where any single fibre runs.",
    "The platform does not depict bandwidth on corridor lines; capacity figures are volatile and not stored on identity records.",
    "Paris is included as a secondary node because Radar's city + IXP registries do not yet seed Paris and France-IX. The corridor lines through Paris are nonetheless accurate as a topology claim.",
  ],
  relatedEntityRefs: [
    "city:frankfurt",
    "city:london",
    "city:amsterdam",
    "country:germany",
    "country:united-kingdom",
    "country:netherlands",
    "ixp:de-cix-frankfurt",
    "ixp:ams-ix",
    "ixp:linx-lon1",
  ],
  relatedGuideSlugs: [
    "interconnection",
    "internet-exchanges",
    "datacenter-hubs",
    "carrier-neutrality",
  ],
  relatedDatasetSlugs: ["internet-exchange-hubs", "global-cloud-regions"],
  relatedHistorySlugs: ["early-internet-exchanges"],
  mediaId: "map-european-interconnection-corridors",
  diagramComponent: "EuropeanInterconnectionCorridorMap",
  sources: [
    {
      sourceId: "telegeography",
      url: "https://www.telegeography.com/",
      checkedAt: CHECKED_AT,
      note: "European backbone geography and FLAP cluster framing.",
    },
    {
      sourceId: "peeringdb",
      url: "https://www.peeringdb.com/",
      checkedAt: CHECKED_AT,
      note: "Per-metro facility records and IXP presence.",
    },
    {
      sourceId: "de-cix",
      url: "https://www.de-cix.net/en/locations",
      checkedAt: CHECKED_AT,
      note: "Operator location pages used to corroborate the Frankfurt anchor.",
    },
    {
      sourceId: "ams-ix",
      url: "https://www.ams-ix.net/ams",
      checkedAt: CHECKED_AT,
      note: "Amsterdam anchor.",
    },
    {
      sourceId: "linx",
      url: "https://www.linx.net/about/our-exchanges/lon1/",
      checkedAt: CHECKED_AT,
      note: "London anchor.",
    },
  ],
  editorialNotes: [
    "Future revisions can promote Paris to a primary node once France-IX has been seeded as an IXP entity in Radar's registry.",
  ],
  confidence: "high",
  lastUpdated: CHECKED_AT,
};
