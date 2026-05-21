/**
 * PeeringDB ingestion dry-run.
 *
 * Run with `pnpm radar:ingest:peeringdb:dry`. Prints the
 * endpoints the adapter would call, the normalised record shape,
 * and the editorial constraints — without making any network
 * call.
 *
 * Real fetch + write is a future-phase developer-machine action.
 * Public pages never depend on this script.
 */

import { printDryRunReport } from "../shared/dry-run";
import { PEERINGDB_ENDPOINTS } from "./adapter";

printDryRunReport({
  adapter: "peeringdb",
  sourceName: "PeeringDB",
  sourceId: "peeringdb",
  normalizedRecordType: "PeeringDBInternetExchangeRecord + PeeringDBFacilityRecord",
  outputPath: "src/generated/peeringdb-<date>.json",
  endpoints: [
    {
      description: "Internet Exchange Points (filter by country during ingestion)",
      url: PEERINGDB_ENDPOINTS.ix,
    },
    {
      description: "Facilities",
      url: PEERINGDB_ENDPOINTS.facility,
    },
  ],
  notes: [
    "Phase 13 normalises identity-level records only (name, operator, country, ID, website).",
    "Volatile fields — connected-network counts, traffic peaks — are deliberately excluded; they belong on dated InfrastructureMetric observations.",
    "metroSlug is not auto-inferred; the editorial review step matches normalized rows to Radar city records by hand.",
    "PeeringDB rate-limits anonymous access. Real-run ingestion should authenticate via an API key kept off the public bundle.",
  ],
});
