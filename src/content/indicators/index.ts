import type { Indicator } from "@/entities";
import { IXP_DENSITY } from "./ixp-density";
import { CLOUD_REGION_CONCENTRATION } from "./cloud-region-concentration";
import { SUBSEA_CONNECTIVITY } from "./subsea-connectivity";
import { CARRIER_NEUTRALITY } from "./carrier-neutrality";
import { DATACENTER_CONCENTRATION } from "./datacenter-concentration";
import { INFRASTRUCTURE_REDUNDANCY } from "./infrastructure-redundancy";

/**
 * Indicator registry.
 *
 * Listed in editorial reading order: interconnection first, then
 * cloud, then resilience, then structural concentration metrics.
 */
export const INDICATORS: ReadonlyArray<Indicator> = [
  IXP_DENSITY,
  CLOUD_REGION_CONCENTRATION,
  SUBSEA_CONNECTIVITY,
  CARRIER_NEUTRALITY,
  DATACENTER_CONCENTRATION,
  INFRASTRUCTURE_REDUNDANCY,
];

export function getIndicator(slug: string): Indicator | undefined {
  return INDICATORS.find((i) => i.slug === slug);
}

export function listIndicatorSlugs(): ReadonlyArray<string> {
  return INDICATORS.map((i) => i.slug);
}

export function listIndicatorsByDataset(
  datasetSlug: string,
): ReadonlyArray<Indicator> {
  return INDICATORS.filter((i) =>
    (i.datasetSlugs ?? []).includes(datasetSlug),
  );
}

export function listIndicatorsByRanking(
  rankingSlug: string,
): ReadonlyArray<Indicator> {
  return INDICATORS.filter((i) =>
    (i.rankingSlugs ?? []).includes(rankingSlug),
  );
}
