import type { Dataset } from "@/entities";
import { GLOBAL_CLOUD_REGIONS } from "./global-cloud-regions";
import { INTERNET_EXCHANGE_HUBS } from "./internet-exchange-hubs";
import { SUBSEA_CABLE_LANDINGS } from "./subsea-cable-landings";
import { AI_INFRASTRUCTURE_REGIONS } from "./ai-infrastructure-regions";

/**
 * Dataset registry.
 *
 * Listed in canonical reading order — readers encounter the most
 * concrete first (cloud regions, IXP hubs) before the
 * less-complete (cables, AI infrastructure).
 */
export const DATASETS: ReadonlyArray<Dataset> = [
  GLOBAL_CLOUD_REGIONS,
  INTERNET_EXCHANGE_HUBS,
  SUBSEA_CABLE_LANDINGS,
  AI_INFRASTRUCTURE_REGIONS,
];

export function getDataset(slug: string): Dataset | undefined {
  return DATASETS.find((d) => d.slug === slug);
}

export function listDatasetSlugs(): ReadonlyArray<string> {
  return DATASETS.map((d) => d.slug);
}

export function listDatasetsByIndicator(
  indicatorSlug: string,
): ReadonlyArray<Dataset> {
  return DATASETS.filter((d) =>
    (d.indicatorSlugs ?? []).includes(indicatorSlug),
  );
}
