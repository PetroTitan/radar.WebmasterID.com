import type { MediaAsset } from "@/entities";

const VERIFIED_AT = "2026-05-22";
const REVIEWED_AT_3 = "2026-05-25";

/**
 * Visual media registry.
 *
 * Two classes of entries:
 *
 *   1. Verified diagrams — self-authored inline SVG components.
 *      Source = "Self-authored"; license = "CC BY 4.0 (Radar
 *      WebmasterID)"; attribution embedded in the figcaption.
 *      These render on guide / research / entity pages and on the
 *      /visuals catalogue.
 *
 *   2. Unverified photo placeholders — registered intent for
 *      future photographic content. The candidate source page is
 *      documented, but no image bytes are stored and no rendering
 *      happens. The /visuals catalogue surfaces these with a
 *      "Visual asset not yet verified." panel.
 *
 * Strict rule: only verified assets render on public pages.
 */
export const MEDIA_ASSETS: ReadonlyArray<MediaAsset> = [
  {
    id: "interconnection-topology",
    title: "Interconnection topology",
    type: "diagram",
    status: "verified",
    source: {
      name: "Self-authored",
      pageUrl: "https://radar.webmasterid.com/visuals/interconnection-topology",
    },
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
    },
    attribution: "Radar WebmasterID, CC BY 4.0.",
    author: "Radar WebmasterID editorial",
    altText:
      "Schematic of two networks connecting to an Internet Exchange Point fabric for settlement-free peering, alongside the alternative routing path through a paid transit provider.",
    caption:
      "Two networks peer directly at an IXP fabric and avoid the transit-cost path.",
    relatedEntityRefs: ["ixp:de-cix-frankfurt"],
    inlineComponent: "InterconnectionDiagram",
    dimensions: { width: 720, height: 320 },
    lastVerified: VERIFIED_AT,
  },
  {
    id: "cable-landing-topology",
    title: "Submarine cable landing topology",
    type: "diagram",
    status: "verified",
    source: {
      name: "Self-authored",
      pageUrl: "https://radar.webmasterid.com/visuals/cable-landing-topology",
    },
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
    },
    attribution: "Radar WebmasterID, CC BY 4.0.",
    author: "Radar WebmasterID editorial",
    altText:
      "Four-stage schematic showing how a submarine cable system reaches the internet: open sea, coastal landing station, inland fibre, interconnection metro.",
    caption:
      "Cable geography is landing geography. The strategic points are the coastal stations, not the deep-sea midpoints.",
    relatedEntityRefs: ["country:singapore", "city:singapore", "city:ashburn"],
    inlineComponent: "CableLandingDiagram",
    dimensions: { width: 720, height: 280 },
    lastVerified: VERIFIED_AT,
  },
  {
    id: "cloud-region-distribution",
    title: "Cloud-region distribution",
    type: "diagram",
    status: "verified",
    source: {
      name: "Self-authored",
      pageUrl: "https://radar.webmasterid.com/visuals/cloud-region-distribution",
    },
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
    },
    attribution: "Radar WebmasterID, CC BY 4.0.",
    author: "Radar WebmasterID editorial",
    altText:
      "Diagram showing the three major hyperscalers (AWS, Google Cloud, Microsoft Azure) each operating general-availability cloud regions in the same three interconnection metros (Frankfurt, Ashburn, Singapore).",
    caption:
      "The same handful of interconnection metros host the major hyperscalers' general-availability regions.",
    relatedEntityRefs: [
      "city:frankfurt",
      "city:ashburn",
      "city:singapore",
      "country:germany",
      "country:united-states",
      "country:singapore",
    ],
    inlineComponent: "CloudRegionDistributionDiagram",
    dimensions: { width: 720, height: 320 },
    lastVerified: VERIFIED_AT,
  },
  {
    id: "carrier-neutral-facility-model",
    title: "Carrier-neutral facility model",
    type: "diagram",
    status: "verified",
    source: {
      name: "Self-authored",
      pageUrl: "https://radar.webmasterid.com/visuals/carrier-neutral-facility-model",
    },
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
    },
    attribution: "Radar WebmasterID, CC BY 4.0.",
    author: "Radar WebmasterID editorial",
    altText:
      "Schematic showing how a carrier-neutral colocation facility hosts independent networks (ISPs, transit providers, content networks, cloud on-ramps) side-by-side, all reaching each other through cross connects without paying the building's operator for connectivity.",
    caption:
      "A neutral facility sells only power, space, and cooling — connectivity stays between tenants.",
    relatedEntityRefs: [
      "city:frankfurt",
      "city:ashburn",
      "city:singapore",
    ],
    inlineComponent: "CarrierNeutralFacilityDiagram",
    dimensions: { width: 720, height: 340 },
    lastVerified: VERIFIED_AT,
  },
  {
    id: "ai-capable-region-clustering",
    title: "AI-capable cloud-region clustering",
    type: "topology-diagram",
    status: "verified",
    source: {
      name: "Self-authored",
      pageUrl:
        "https://radar.webmasterid.com/visuals/ai-capable-region-clustering",
    },
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
    },
    attribution: "Radar WebmasterID, CC BY 4.0.",
    author: "Radar WebmasterID editorial",
    altText:
      "Three-column schematic of AI-capable cloud-region geography: metros hosting all three hyperscalers' general-availability regions, the provider-published AI-instance layer overlaid on those regions, and the scaling constraints (power supply, regulator) that limit further build-out.",
    caption:
      "AI-instance availability overlays the three-hyperscaler general-availability geography rather than producing a separate map.",
    relatedEntityRefs: [
      "city:frankfurt",
      "city:london",
      "city:ashburn",
      "city:singapore",
      "city:tokyo",
    ],
    category: "cloud",
    inlineComponent: "AICapableRegionClusteringDiagram",
    dimensions: { width: 760, height: 360 },
    lastVerified: REVIEWED_AT_3,
  },
  {
    id: "metro-ecosystem-topology",
    title: "Metro datacenter-ecosystem model",
    type: "topology-diagram",
    status: "verified",
    source: {
      name: "Self-authored",
      pageUrl:
        "https://radar.webmasterid.com/visuals/metro-ecosystem-topology",
    },
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
    },
    attribution: "Radar WebmasterID, CC BY 4.0.",
    author: "Radar WebmasterID editorial",
    altText:
      "Concentric three-tier model of a metro datacenter ecosystem: carrier-neutral facilities at the centre, an IXP interconnection fabric around them, and a hyperscaler cloud-region on-ramp surface on the outside.",
    caption:
      "The metro substrate is the carrier-neutral facility cluster; the interconnection fabric and the cloud on-ramp surface stack on top of it.",
    relatedEntityRefs: [
      "city:frankfurt",
      "city:ashburn",
      "city:singapore",
      "facility:equinix-fr5",
      "facility:equinix-dc11",
      "facility:equinix-sg3",
    ],
    category: "datacenter",
    inlineComponent: "EcosystemTopologyDiagram",
    dimensions: { width: 720, height: 380 },
    lastVerified: REVIEWED_AT_3,
  },
  {
    id: "transatlantic-cable-history",
    title: "Transatlantic cable history across three eras",
    type: "topology-diagram",
    status: "verified",
    source: {
      name: "Self-authored",
      pageUrl:
        "https://radar.webmasterid.com/visuals/transatlantic-cable-history",
    },
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
    },
    attribution: "Radar WebmasterID, CC BY 4.0.",
    author: "Radar WebmasterID editorial",
    altText:
      "Three-swimlane schematic of the transatlantic subsea-cable corridor: telco-consortium era (1988 — early 2000s), consolidation period (2000s — early 2010s), and cloud-funded era (mid-2010s — present), each rendered as a curved line between a US east-coast and a Western European coast.",
    caption:
      "The cloud-funded era is the third structural shift in the transatlantic corridor since 1988.",
    relatedEntityRefs: [
      "city:ashburn",
      "city:london",
      "country:united-states",
      "country:united-kingdom",
    ],
    category: "subsea",
    historicalPeriod: "1988 — present",
    inlineComponent: "TransatlanticCableHistoryDiagram",
    dimensions: { width: 720, height: 340 },
    lastVerified: REVIEWED_AT_3,
  },
  {
    id: "infrastructure-redundancy-model",
    title: "Infrastructure redundancy model",
    type: "diagram",
    status: "verified",
    source: {
      name: "Self-authored",
      pageUrl: "https://radar.webmasterid.com/visuals/infrastructure-redundancy-model",
    },
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attributionRequired: true,
    },
    attribution: "Radar WebmasterID, CC BY 4.0.",
    author: "Radar WebmasterID editorial",
    altText:
      "Layered model of infrastructure redundancy: facility, metro, region, route diversity, and operator diversity stacked as independent failure domains.",
    caption:
      "Independent redundancy layers stack — facility, metro, region, route, operator — each handling a different class of failure.",
    inlineComponent: "InfrastructureRedundancyDiagram",
    dimensions: { width: 720, height: 360 },
    lastVerified: VERIFIED_AT,
  },
  {
    id: "frankfurt-skyline",
    title: "Frankfurt skyline",
    type: "photo",
    status: "unverified",
    source: {
      name: "Wikimedia Commons (candidate)",
      pageUrl:
        "https://commons.wikimedia.org/wiki/Category:Frankfurt_am_Main_skyline",
    },
    altText:
      "Frankfurt skyline as a visual anchor for the city's role as the principal European interconnection metro.",
    relatedEntityRefs: ["city:frankfurt", "country:germany", "ixp:de-cix-frankfurt"],
    riskNotes: [
      "Photographic skyline assets often contain individually-identifiable brand marks on tall buildings; the specific candidate image must be reviewed for visible logos before promotion to verified.",
    ],
    lastVerified: VERIFIED_AT,
  },
  {
    id: "singapore-skyline",
    title: "Singapore skyline",
    type: "photo",
    status: "unverified",
    source: {
      name: "Wikimedia Commons (candidate)",
      pageUrl:
        "https://commons.wikimedia.org/wiki/Category:Skyline_of_Singapore",
    },
    altText:
      "Singapore skyline as a visual anchor for the city's role as the principal Southeast Asian interconnection metro.",
    relatedEntityRefs: ["city:singapore", "country:singapore"],
    riskNotes: [
      "Most Marina Bay skyline images include identifiable brand marks on the surrounding buildings; the specific candidate image must be reviewed for visible logos before promotion to verified.",
    ],
    lastVerified: VERIFIED_AT,
  },
  {
    id: "ashburn-datacenter",
    title: "Ashburn / Northern Virginia datacenter exterior",
    type: "infrastructure-photo",
    status: "unverified",
    source: {
      name: "Wikimedia Commons (candidate)",
      pageUrl:
        "https://commons.wikimedia.org/wiki/Category:Data_centers_in_Virginia",
    },
    altText:
      "Datacenter exterior in the Ashburn / Northern Virginia metro, illustrating the carrier-neutral colocation cluster that anchors the US east coast.",
    relatedEntityRefs: [
      "city:ashburn",
      "country:united-states",
      "ixp:equinix-internet-exchange-ashburn",
    ],
    category: "datacenter",
    geographicCoverage: "Ashburn / Northern Virginia metro",
    operatorMentioned: ["Equinix", "Digital Realty"],
    visibleBrandRisk: true,
    riskNotes: [
      "Most datacenter exterior photographs are operator-owned; CC-licensed exterior shots are rare. The specific candidate image must be confirmed as freely licensed (not vendor-supplied) before promotion to verified.",
      "Brand signage on the building exterior may be visible. The specific candidate must be reviewed.",
    ],
    lastVerified: VERIFIED_AT,
  },
  {
    id: "amsterdam-canal-belt-overview",
    title: "Amsterdam canal-belt overview",
    type: "infrastructure-photo",
    status: "unverified",
    source: {
      name: "Wikimedia Commons (candidate)",
      pageUrl:
        "https://commons.wikimedia.org/wiki/Category:Aerial_views_of_Amsterdam",
    },
    altText:
      "Aerial overview of Amsterdam's canal belt, used as visual context for the metro's role as the northern FLAP cluster anchor and the home of AMS-IX.",
    relatedEntityRefs: [
      "city:amsterdam",
      "country:netherlands",
      "ixp:ams-ix",
    ],
    category: "geography",
    geographicCoverage: "Amsterdam canal belt and central districts",
    riskNotes: [
      "Per-image license overrides the category-level license; the specific File page must be reviewed individually before promotion.",
      "Aerial city views can include identifiable private properties; the chosen candidate must be reviewed.",
    ],
    editorialNotes: [
      "Aerial canal-belt views are intentionally generic; the editorial use is geographic context for AMS-IX, not building identification.",
    ],
    lastVerified: REVIEWED_AT_3,
  },
  {
    id: "london-docklands-overview",
    title: "London Docklands overview",
    type: "infrastructure-photo",
    status: "unverified",
    source: {
      name: "Wikimedia Commons (candidate)",
      pageUrl: "https://commons.wikimedia.org/wiki/Category:Docklands,_London",
    },
    altText:
      "Skyline overview of London's Docklands district, used as visual context for the carrier-neutral colocation cluster that anchors LINX.",
    relatedEntityRefs: [
      "city:london",
      "country:united-kingdom",
      "ixp:linx-lon1",
    ],
    category: "datacenter",
    geographicCoverage: "London Docklands / Canary Wharf area",
    operatorMentioned: ["Telehouse", "Equinix", "LINX"],
    visibleBrandRisk: true,
    riskNotes: [
      "Docklands imagery frequently features identifiable corporate buildings (Canary Wharf); brand-mark risk on any chosen candidate is high.",
      "Per-image license overrides the category-level license; the specific File page must be reviewed individually before promotion.",
    ],
    lastVerified: REVIEWED_AT_3,
  },
  {
    id: "tokyo-otemachi-overview",
    title: "Tokyo Otemachi district overview",
    type: "infrastructure-photo",
    status: "unverified",
    source: {
      name: "Wikimedia Commons (candidate)",
      pageUrl: "https://commons.wikimedia.org/wiki/Category:Otemachi,_Tokyo",
    },
    altText:
      "Skyline view of Tokyo's Otemachi district, used as visual context for the metro's role as the principal Northeast Asian interconnection hub and the NTT Communications campus.",
    relatedEntityRefs: ["city:tokyo", "country:japan"],
    category: "datacenter",
    geographicCoverage: "Tokyo Otemachi / Marunouchi business district",
    operatorMentioned: ["NTT Communications"],
    visibleBrandRisk: true,
    riskNotes: [
      "Otemachi is a corporate district; brand-mark risk on any chosen candidate is high.",
      "Per-image license overrides the category-level license; the specific File page must be reviewed individually before promotion.",
    ],
    editorialNotes: [
      "A skyline or street-level overview is preferred over building-identifiable shots to reduce brand-mark risk.",
    ],
    lastVerified: REVIEWED_AT_3,
  },
  {
    id: "de-cix-fabric-overview",
    title: "DE-CIX Frankfurt fabric overview",
    type: "topology-diagram",
    status: "unverified",
    source: {
      name: "DE-CIX (candidate, operator primary doc)",
      pageUrl: "https://www.de-cix.net/en/locations/frankfurt",
    },
    altText:
      "Operator-published visualisation of the DE-CIX Frankfurt fabric, showing the Layer-2 switching topology spanning multiple Frankfurt-metro carrier-neutral facilities.",
    relatedEntityRefs: [
      "ixp:de-cix-frankfurt",
      "city:frankfurt",
      "country:germany",
    ],
    category: "interconnection",
    operatorMentioned: ["DE-CIX"],
    visibleBrandRisk: true,
    riskNotes: [
      "Operator-published imagery is generally restricted to operator use; promotion requires written or published-reuse permission from DE-CIX, not just visibility on the operator site.",
      "DE-CIX brand mark is integral to the image; verified usage must surface attribution prominently.",
    ],
    editorialNotes: [
      "Recorded as a placeholder for the case where DE-CIX publishes a reusable diagram. The current operator site does not publish a reuse-licensed fabric overview.",
    ],
    lastVerified: REVIEWED_AT_3,
  },
];

export function getMediaAsset(id: string): MediaAsset | undefined {
  return MEDIA_ASSETS.find((m) => m.id === id);
}

export function listMediaAssetIds(): ReadonlyArray<string> {
  return MEDIA_ASSETS.map((m) => m.id);
}

export function listMediaAssetsByEntityRef(
  ref: string,
): ReadonlyArray<MediaAsset> {
  return MEDIA_ASSETS.filter((m) => (m.relatedEntityRefs ?? []).includes(ref));
}

export function listVerifiedMediaAssets(): ReadonlyArray<MediaAsset> {
  return MEDIA_ASSETS.filter((m) => m.status === "verified");
}
