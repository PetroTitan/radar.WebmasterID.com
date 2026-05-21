import type { MediaAsset } from "@/entities";

const VERIFIED_AT = "2026-05-21";

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
    type: "photo",
    status: "unverified",
    source: {
      name: "Wikimedia Commons (candidate)",
      pageUrl:
        "https://commons.wikimedia.org/wiki/Category:Data_centers_in_Virginia",
    },
    altText:
      "Datacenter exterior in the Ashburn / Northern Virginia metro, illustrating the carrier-neutral colocation cluster that anchors the US east coast.",
    relatedEntityRefs: ["city:ashburn", "country:united-states"],
    riskNotes: [
      "Most datacenter exterior photographs are operator-owned; CC-licensed exterior shots are rare. The specific candidate image must be confirmed as freely licensed (not vendor-supplied) before promotion to verified.",
      "Brand signage on the building exterior may be visible. The specific candidate must be reviewed.",
    ],
    lastVerified: VERIFIED_AT,
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
