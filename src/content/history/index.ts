import type { HistoryPage } from "@/entities";
import { MAE_EAST_HISTORY } from "./mae-east";
import { EARLY_INTERNET_EXCHANGES_HISTORY } from "./early-internet-exchanges";
import { TRANSATLANTIC_CABLES_HISTORY } from "./transatlantic-cables";

/**
 * Historical infrastructure intelligence registry.
 *
 * Pages are listed in a deliberate reading order — early
 * commercial NAPs first, then the broader IXP-founding pattern
 * that grew alongside them, then the parallel transatlantic-
 * cable history that defined the corresponding inter-continental
 * geography.
 *
 * Each page is source-bound and editorially reviewed. Historical
 * claims that the underlying sources don't consistently support
 * (specific capacity figures, "first / largest / biggest"
 * labels) are deliberately omitted; the validator enforces this.
 */
export const HISTORY_PAGES: ReadonlyArray<HistoryPage> = [
  MAE_EAST_HISTORY,
  EARLY_INTERNET_EXCHANGES_HISTORY,
  TRANSATLANTIC_CABLES_HISTORY,
];

export function getHistoryPage(slug: string): HistoryPage | undefined {
  return HISTORY_PAGES.find((p) => p.slug === slug);
}

export function listHistoryPageSlugs(): ReadonlyArray<string> {
  return HISTORY_PAGES.map((p) => p.slug);
}

export function listHistoryPagesByEntityRef(
  ref: string,
): ReadonlyArray<HistoryPage> {
  return HISTORY_PAGES.filter((p) =>
    (p.relatedEntityRefs ?? []).includes(ref),
  );
}
