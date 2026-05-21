/**
 * Cloud-region adapter.
 *
 * Cloud providers do not publish a single canonical JSON API for
 * their region directories — the authoritative source is the
 * HTML pages each provider maintains. Radar treats those pages
 * as the primary source and ingests them by *manual curation*,
 * not by HTML scraping.
 *
 * This adapter therefore documents the canonical source URLs and
 * the normalisation mapping; the actual rows are hand-authored
 * directly in `src/data/research/cloud-regions.reviewed.ts`
 * during editorial review.
 *
 * Scraping HTML is intentionally not implemented: the canonical
 * provider pages restructure occasionally, and a fragile scraper
 * would risk silently mis-attributing facts to providers.
 */

import type { CloudProviderRegionRecord, CloudProviderSlug } from "../../entities";
import { withProvenance } from "../shared/provenance";

interface ProviderDirectory {
  readonly slug: CloudProviderSlug;
  readonly name: string;
  readonly sourceId: string;
  readonly directoryUrl: string;
}

export const CLOUD_PROVIDER_DIRECTORIES: ReadonlyArray<ProviderDirectory> = [
  {
    slug: "aws",
    name: "AWS Global Infrastructure",
    sourceId: "aws-regions",
    directoryUrl:
      "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
  },
  {
    slug: "gcp",
    name: "Google Cloud locations",
    sourceId: "gcp-regions",
    directoryUrl: "https://cloud.google.com/about/locations",
  },
  {
    slug: "azure",
    name: "Microsoft Azure geographies",
    sourceId: "azure-regions",
    directoryUrl:
      "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/",
  },
];

/**
 * Construct a normalized cloud-region row from manually-curated
 * input. The adapter's editorial caller passes the field set it
 * read off the provider's directory; this helper attaches the
 * provenance metadata.
 */
export function buildCloudRegionRow(input: {
  readonly provider: CloudProviderSlug;
  readonly regionCode: string;
  readonly displayName: string;
  readonly countryCode: string;
  readonly geography: string;
  readonly metroSlug?: string;
  readonly availabilityZoneCount?: number;
  readonly launchedAt?: string;
  readonly purpose?: "general" | "sovereign" | "government";
  readonly observedAt: string;
  readonly lastVerified: string;
  readonly confidence: "high" | "medium" | "low" | "unverified";
}): CloudProviderRegionRecord {
  const directory = CLOUD_PROVIDER_DIRECTORIES.find(
    (d) => d.slug === input.provider,
  );
  if (!directory) {
    throw new Error(`Unknown provider slug: ${input.provider}`);
  }
  const row = withProvenance(
    {
      sourceId: directory.sourceId,
      rawSourceName: directory.name,
      observedAt: input.observedAt,
      confidence: input.confidence,
    },
    directory.directoryUrl,
    {
      id: `${input.provider}-${input.regionCode}`,
      recordType: "cloud-region" as const,
      provider: input.provider,
      regionCode: input.regionCode,
      displayName: input.displayName,
      countryCode: input.countryCode,
      geography: input.geography,
      metroSlug: input.metroSlug,
      availabilityZoneCount: input.availabilityZoneCount,
      launchedAt: input.launchedAt,
      purpose: input.purpose,
    },
  );
  // Editor-supplied lastVerified overrides the default (observedAt).
  return { ...row, lastVerified: input.lastVerified };
}
