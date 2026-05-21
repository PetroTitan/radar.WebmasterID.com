import type { PeeringDBFacilityRecord } from "@/entities";

/**
 * Reviewed PeeringDB facility rows.
 *
 * Empty by design. Facility-level ingestion has not been
 * performed yet; the `/research/datasets/internet-exchange-hubs`
 * page renders "Dataset not yet fully verified." for the
 * facility row count until rows are added.
 *
 * To add a row: run `pnpm radar:ingest:peeringdb:dry` for the
 * endpoint plan, then a real-run ingestion in a developer
 * environment, then promote rows from `src/generated/` here
 * after editorial review.
 */

export const REVIEWED_PEERINGDB_FACILITIES: ReadonlyArray<PeeringDBFacilityRecord> = [];
