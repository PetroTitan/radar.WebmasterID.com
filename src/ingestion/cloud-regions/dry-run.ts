/**
 * Cloud-region ingestion dry-run.
 *
 * Run with `pnpm radar:ingest:cloud-regions:dry`. Prints the
 * authoritative source URLs for each major hyperscaler's region
 * directory and the normalisation mapping the editorial curation
 * process follows.
 *
 * No automated HTML scraping. The editor reads the provider's
 * own page and curates rows directly into
 * `src/data/research/cloud-regions.reviewed.ts`.
 */

import { printDryRunReport } from "../shared/dry-run";
import { CLOUD_PROVIDER_DIRECTORIES } from "./adapter";

printDryRunReport({
  adapter: "cloud-regions",
  sourceName: "AWS / Google Cloud / Microsoft Azure region directories",
  sourceId: "aws-regions, gcp-regions, azure-regions",
  normalizedRecordType: "CloudProviderRegionRecord",
  outputPath: "src/data/research/cloud-regions.reviewed.ts (manual curation)",
  endpoints: CLOUD_PROVIDER_DIRECTORIES.map((d) => ({
    description: `${d.name} (${d.slug})`,
    url: d.directoryUrl,
  })),
  notes: [
    "Cloud-region ingestion is editorial curation, not HTML scraping. The provider pages restructure occasionally; a brittle scraper would risk mis-attributing facts.",
    "Each editor-supplied row passes through buildCloudRegionRow() in adapter.ts so provenance fields are attached uniformly.",
    "Availability-zone counts are admitted only when explicitly published; launch dates only when officially disclosed.",
    "Sovereignty regions are tagged with purpose='sovereign' and counted separately from general-availability regions.",
  ],
});
