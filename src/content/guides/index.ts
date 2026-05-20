import type { Guide } from "@/entities";
import { INTERNET_EXCHANGES_GUIDE } from "./internet-exchanges";
import { CLOUD_REGIONS_GUIDE } from "./cloud-regions";
import { SUBSEA_CABLES_GUIDE } from "./subsea-cables";
import { DATACENTER_HUBS_GUIDE } from "./datacenter-hubs";
import { AI_INFRASTRUCTURE_GUIDE } from "./ai-infrastructure";

/**
 * Authority guide registry.
 *
 * Guides are listed in a deliberate reading order on the index
 * page (rather than newest-first). The order in this array is the
 * canonical reading order.
 */
export const GUIDES: ReadonlyArray<Guide> = [
  INTERNET_EXCHANGES_GUIDE,
  CLOUD_REGIONS_GUIDE,
  SUBSEA_CABLES_GUIDE,
  DATACENTER_HUBS_GUIDE,
  AI_INFRASTRUCTURE_GUIDE,
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function listGuideSlugs(): ReadonlyArray<string> {
  return GUIDES.map((guide) => guide.slug);
}

/**
 * Return all guides that reference the given entity ref.
 *
 * `ref` is the composite identifier `country:<slug>`,
 * `city:<slug>`, or `ixp:<slug>` matching the format used by
 * `Guide.relatedEntityRefs`. Results preserve canonical reading
 * order.
 */
export function listGuidesByEntityRef(ref: string): ReadonlyArray<Guide> {
  return GUIDES.filter((guide) =>
    (guide.relatedEntityRefs ?? []).includes(ref),
  );
}
