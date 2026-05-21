import type { Guide } from "@/entities";
import { INTERCONNECTION_GUIDE } from "./interconnection";
import { INTERNET_EXCHANGES_GUIDE } from "./internet-exchanges";
import { CARRIER_NEUTRALITY_GUIDE } from "./carrier-neutrality";
import { CLOUD_REGIONS_GUIDE } from "./cloud-regions";
import { DATACENTER_HUBS_GUIDE } from "./datacenter-hubs";
import { SUBSEA_CABLES_GUIDE } from "./subsea-cables";
import { INFRASTRUCTURE_REDUNDANCY_GUIDE } from "./infrastructure-redundancy";
import { AI_INFRASTRUCTURE_GUIDE } from "./ai-infrastructure";

/**
 * Authority guide registry.
 *
 * Guides are listed in a deliberate reading order on the index
 * page (rather than newest-first). The order in this array is the
 * canonical reading order — broad concept first
 * (interconnection), then component venues (IXPs, neutral
 * facilities, cloud regions, datacenter hubs), then long-haul and
 * resilience layers, then the AI-infrastructure overlay.
 */
export const GUIDES: ReadonlyArray<Guide> = [
  INTERCONNECTION_GUIDE,
  INTERNET_EXCHANGES_GUIDE,
  CARRIER_NEUTRALITY_GUIDE,
  CLOUD_REGIONS_GUIDE,
  DATACENTER_HUBS_GUIDE,
  SUBSEA_CABLES_GUIDE,
  INFRASTRUCTURE_REDUNDANCY_GUIDE,
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
