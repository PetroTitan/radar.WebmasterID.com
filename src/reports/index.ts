/**
 * Report registry.
 *
 * Reports are long-form, source-cited editorial pieces that combine
 * multiple entity records into an argument. None are published yet:
 * the registry is the contract for what will appear here.
 */

import type { ISODate } from "@/entities";

export interface ReportRecord {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly status: "drafting" | "in-review" | "published";
  readonly methodologyAnchor: string;
  readonly lastUpdated: ISODate;
}

export const REPORTS: ReadonlyArray<ReportRecord> = [];
