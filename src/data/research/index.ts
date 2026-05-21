/**
 * Reviewed-dataset registry — re-exports for caller convenience.
 *
 * Public pages import from here. The actual rows live in the
 * per-dataset `.reviewed.ts` files.
 */
import type { InfrastructureDatasetRow } from "@/entities";
import { REVIEWED_CLOUD_REGIONS } from "./cloud-regions.reviewed";
import { REVIEWED_PEERINGDB_IXPS } from "./peeringdb-ixps.reviewed";
import { REVIEWED_PEERINGDB_FACILITIES } from "./facilities.reviewed";
import { REVIEWED_AI_CAPABLE_CLOUD_REGIONS } from "./ai-capable-cloud-regions.reviewed";

export { REVIEWED_CLOUD_REGIONS } from "./cloud-regions.reviewed";
export { REVIEWED_PEERINGDB_IXPS } from "./peeringdb-ixps.reviewed";
export { REVIEWED_PEERINGDB_FACILITIES } from "./facilities.reviewed";
export { REVIEWED_AI_CAPABLE_CLOUD_REGIONS } from "./ai-capable-cloud-regions.reviewed";

/** Union of every reviewed row across every dataset. */
export const REVIEWED_ROWS: ReadonlyArray<InfrastructureDatasetRow> = [
  ...REVIEWED_CLOUD_REGIONS,
  ...REVIEWED_PEERINGDB_IXPS,
  ...REVIEWED_PEERINGDB_FACILITIES,
  ...REVIEWED_AI_CAPABLE_CLOUD_REGIONS,
];

/**
 * Find every reviewed row that declares the given entity ref in
 * its `relatedEntityRefs`. The ref string must be in canonical
 * `kind:slug` form (e.g. `city:frankfurt`).
 *
 * Rows without `relatedEntityRefs` are skipped. The function is
 * source-stable: callers receive rows in dataset order
 * (cloud-regions → IXPs → facilities) so entity pages render
 * evidence in a predictable sequence.
 */
export function listReviewedRowsByEntityRef(
  ref: string,
): ReadonlyArray<InfrastructureDatasetRow> {
  return REVIEWED_ROWS.filter((row) =>
    (row.relatedEntityRefs ?? []).includes(ref),
  );
}
