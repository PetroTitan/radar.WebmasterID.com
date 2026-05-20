import type { Insight } from "@/entities";
import { WHY_FRANKFURT } from "./why-frankfurt-became-europes-internet-hub";
import { WHY_SINGAPORE } from "./why-singapore-dominates-subsea-connectivity";
import { WHAT_MAKES_AN_IXP_IMPORTANT } from "./what-makes-an-internet-exchange-important";
import { HOW_CLOUD_REGIONS_SHAPE } from "./how-cloud-regions-shape-global-infrastructure";

/**
 * Editorial insight registry.
 *
 * Insights are listed newest-first on the index. The order in this
 * array is the publication order; the index page sorts by
 * `publishedAt` descending at render time so adding new entries in
 * any position remains safe.
 */
export const INSIGHTS: ReadonlyArray<Insight> = [
  WHY_FRANKFURT,
  WHY_SINGAPORE,
  WHAT_MAKES_AN_IXP_IMPORTANT,
  HOW_CLOUD_REGIONS_SHAPE,
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((insight) => insight.slug === slug);
}

export function listInsightSlugs(): ReadonlyArray<string> {
  return INSIGHTS.map((insight) => insight.slug);
}

/**
 * Return all insights that reference the given entity ref.
 *
 * `ref` is the composite identifier `country:<slug>`,
 * `city:<slug>`, or `ixp:<slug>` matching the format used by
 * `Insight.entityRefs`. Results preserve publication order.
 */
export function listInsightsByEntityRef(ref: string): ReadonlyArray<Insight> {
  return INSIGHTS.filter((insight) =>
    (insight.entityRefs ?? []).includes(ref),
  );
}

/** Insights sorted newest-first for the index page. */
export function listInsightsByDate(): ReadonlyArray<Insight> {
  return [...INSIGHTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
