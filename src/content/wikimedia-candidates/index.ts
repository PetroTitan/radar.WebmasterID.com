import type { WikimediaCandidate } from "@/entities";

/**
 * Wikimedia Commons candidate registry.
 *
 * Each entry is a candidate image that an editor has identified
 * on Wikimedia Commons but has NOT yet promoted to a verified
 * `MediaAsset`. Promotion requires the editor to re-verify the
 * Commons page's license + attribution string and to capture an
 * optimised local copy.
 *
 * Candidates do not render anywhere on entity, guide, or research
 * pages. They appear on /visuals only, under a "candidate" badge,
 * so the editorial backlog is visible without exposing the user
 * to unverified imagery.
 *
 * Strict rule: no entry here may claim a specific author name or
 * an "attribution-confirmed" string. Those become part of the
 * record only when the candidate is promoted into MEDIA_ASSETS as
 * a verified asset.
 */
export const WIKIMEDIA_CANDIDATES: ReadonlyArray<WikimediaCandidate> = [
  {
    id: "wikimedia-frankfurt-skyline-night",
    title: "Frankfurt skyline (night) — interconnection-metro context",
    commonsPageUrl: "https://commons.wikimedia.org/wiki/Category:Frankfurt_am_Main_skyline",
    commonsCategoryUrl:
      "https://commons.wikimedia.org/wiki/Category:Frankfurt_am_Main_skyline",
    recordedLicense: "CC BY-SA 4.0 (per Commons category page; per-image licensing varies)",
    attributionRequired: true,
    reviewStatus: "discovered",
    relatedEntityRefs: ["city:frankfurt", "country:germany"],
    riskNotes: [
      "Most Frankfurt skyline images include identifiable brand marks on tall buildings; the specific candidate must be reviewed for visible logos before promotion.",
      "Per-image license overrides the category-level license; the chosen image's File page must be reviewed individually.",
    ],
    editorialNotes: [
      "Used to illustrate the metro context for DE-CIX Frankfurt and the eastern FLAP anchor. A night skyline preserves visibility of the central business district without surfacing storefront signage.",
    ],
    discoveredAt: "2026-05-25",
    lastReviewedAt: "2026-05-25",
  },
  {
    id: "wikimedia-amsterdam-canal-overview",
    title: "Amsterdam canal-belt overview — FLAP northern-anchor context",
    commonsPageUrl: "https://commons.wikimedia.org/wiki/Category:Aerial_views_of_Amsterdam",
    commonsCategoryUrl:
      "https://commons.wikimedia.org/wiki/Category:Aerial_views_of_Amsterdam",
    recordedLicense: "CC BY-SA 4.0 (per Commons category page; per-image licensing varies)",
    attributionRequired: true,
    reviewStatus: "discovered",
    relatedEntityRefs: ["city:amsterdam", "country:netherlands"],
    riskNotes: [
      "Aerial city views can include identifiable private properties; the specific candidate must be reviewed before promotion.",
      "Per-image license overrides the category-level license; the chosen image's File page must be reviewed individually.",
    ],
    editorialNotes: [
      "Used to illustrate Amsterdam's metro context for AMS-IX and the FLAP northern anchor. An aerial canal-belt view is intentionally generic — the editorial use is geographic context, not building identification.",
    ],
    discoveredAt: "2026-05-25",
    lastReviewedAt: "2026-05-25",
  },
  {
    id: "wikimedia-london-docklands-overview",
    title: "London Docklands overview — LINX colocation-cluster context",
    commonsPageUrl: "https://commons.wikimedia.org/wiki/Category:Docklands,_London",
    commonsCategoryUrl: "https://commons.wikimedia.org/wiki/Category:Docklands,_London",
    recordedLicense: "CC BY-SA 4.0 (per Commons category page; per-image licensing varies)",
    attributionRequired: true,
    reviewStatus: "discovered",
    relatedEntityRefs: ["city:london", "country:united-kingdom"],
    riskNotes: [
      "Docklands imagery frequently features identifiable corporate buildings (Canary Wharf); brand-mark risk on any chosen candidate is high.",
      "Per-image license overrides the category-level license; the chosen image's File page must be reviewed individually.",
    ],
    editorialNotes: [
      "Used to illustrate the Docklands carrier-neutral colocation cluster that anchors LINX. A skyline overview rather than a building-identifiable shot reduces brand-mark risk.",
    ],
    discoveredAt: "2026-05-25",
    lastReviewedAt: "2026-05-25",
  },
  {
    id: "wikimedia-tokyo-otemachi-overview",
    title: "Tokyo Otemachi district overview — NTT campus and cloud-region context",
    commonsPageUrl: "https://commons.wikimedia.org/wiki/Category:Otemachi,_Tokyo",
    commonsCategoryUrl: "https://commons.wikimedia.org/wiki/Category:Otemachi,_Tokyo",
    recordedLicense: "CC BY-SA 4.0 (per Commons category page; per-image licensing varies)",
    attributionRequired: true,
    reviewStatus: "discovered",
    relatedEntityRefs: ["city:tokyo", "country:japan"],
    riskNotes: [
      "Otemachi is a corporate district; any chosen candidate must be reviewed for visible third-party brand marks.",
      "Per-image license overrides the category-level license; the chosen image's File page must be reviewed individually.",
    ],
    editorialNotes: [
      "Used to illustrate Tokyo's role as the principal Northeast Asian interconnection metro and the NTT Communications Otemachi campus context. A street-level or skyline overview is preferred over building-identifiable shots.",
    ],
    discoveredAt: "2026-05-25",
    lastReviewedAt: "2026-05-25",
  },
  {
    id: "wikimedia-historical-mae-east",
    title: "Historical MAE-East and early NAP imagery",
    commonsPageUrl:
      "https://commons.wikimedia.org/wiki/Category:History_of_the_Internet",
    commonsCategoryUrl:
      "https://commons.wikimedia.org/wiki/Category:History_of_the_Internet",
    recordedLicense: "Public Domain or CC BY-SA (per-image licensing varies)",
    attributionRequired: true,
    reviewStatus: "discovered",
    riskNotes: [
      "Historical internet-infrastructure imagery is sparse on Commons; many candidate images are scans of magazine pages or operator brochures whose underlying copyright may not be free.",
      "Pre-1990s internet imagery often has unclear provenance; promotion requires per-image archival research.",
    ],
    editorialNotes: [
      "Recorded as a placeholder for the optional historical layer (Phase 18, item 14). Promotion to verified requires identifying a specific image whose underlying source is unambiguously free.",
    ],
    discoveredAt: "2026-05-25",
    lastReviewedAt: "2026-05-25",
  },
];

export function getWikimediaCandidate(id: string): WikimediaCandidate | undefined {
  return WIKIMEDIA_CANDIDATES.find((c) => c.id === id);
}

export function listWikimediaCandidateIds(): ReadonlyArray<string> {
  return WIKIMEDIA_CANDIDATES.map((c) => c.id);
}
