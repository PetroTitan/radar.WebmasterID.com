import type { CloudProviderRegionRecord } from "@/entities";
import { buildCloudRegionRow } from "@/ingestion/cloud-regions/adapter";

/**
 * Reviewed cloud-region rows.
 *
 * Every row here has been manually curated against the named
 * provider's published region directory and signed off on the
 * `lastVerified` date. Public pages (notably
 * /research/datasets/global-cloud-regions) read from this file
 * only.
 *
 * To add a row: read the provider's directory, fill the input
 * to buildCloudRegionRow(), append the result here, then run
 * `pnpm validate` and `pnpm build`.
 */

const OBSERVED = "2026-05-21";
const VERIFIED = "2026-05-21";
const OBSERVED_2 = "2026-05-22";
const VERIFIED_2 = "2026-05-22";

export const REVIEWED_CLOUD_REGIONS: ReadonlyArray<CloudProviderRegionRecord> = [
  // AWS — three anchor regions
  buildCloudRegionRow({
    provider: "aws",
    regionCode: "eu-central-1",
    displayName: "EU (Frankfurt)",
    countryCode: "DE",
    geography: "Europe",
    metroSlug: "frankfurt",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "aws",
    regionCode: "us-east-1",
    displayName: "US East (N. Virginia)",
    countryCode: "US",
    geography: "Americas",
    metroSlug: "ashburn",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "aws",
    regionCode: "ap-southeast-1",
    displayName: "Asia Pacific (Singapore)",
    countryCode: "SG",
    geography: "Asia Pacific",
    metroSlug: "singapore",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),

  // Google Cloud — three anchor regions
  buildCloudRegionRow({
    provider: "gcp",
    regionCode: "europe-west3",
    displayName: "Frankfurt",
    countryCode: "DE",
    geography: "Europe",
    metroSlug: "frankfurt",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "gcp",
    regionCode: "us-east4",
    displayName: "Northern Virginia",
    countryCode: "US",
    geography: "Americas",
    metroSlug: "ashburn",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "gcp",
    regionCode: "asia-southeast1",
    displayName: "Singapore",
    countryCode: "SG",
    geography: "Asia Pacific",
    metroSlug: "singapore",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),

  // Microsoft Azure — three anchor regions
  buildCloudRegionRow({
    provider: "azure",
    regionCode: "germanywestcentral",
    displayName: "Germany West Central",
    countryCode: "DE",
    geography: "Europe",
    metroSlug: "frankfurt",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "azure",
    regionCode: "eastus",
    displayName: "East US",
    countryCode: "US",
    geography: "Americas",
    metroSlug: "ashburn",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "azure",
    regionCode: "southeastasia",
    displayName: "Southeast Asia",
    countryCode: "SG",
    geography: "Asia Pacific",
    metroSlug: "singapore",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),

  // London + Tokyo expansion — provider directories list these
  // metros as published regions. Radar now has city entities for
  // London and Tokyo, so `metroSlug` pins each row to its metro.
  buildCloudRegionRow({
    provider: "aws",
    regionCode: "eu-west-2",
    displayName: "Europe (London)",
    countryCode: "GB",
    geography: "Europe",
    metroSlug: "london",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "aws",
    regionCode: "ap-northeast-1",
    displayName: "Asia Pacific (Tokyo)",
    countryCode: "JP",
    geography: "Asia Pacific",
    metroSlug: "tokyo",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "gcp",
    regionCode: "europe-west2",
    displayName: "London",
    countryCode: "GB",
    geography: "Europe",
    metroSlug: "london",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "azure",
    regionCode: "uksouth",
    displayName: "UK South",
    countryCode: "GB",
    geography: "Europe",
    metroSlug: "london",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),
  buildCloudRegionRow({
    provider: "azure",
    regionCode: "japaneast",
    displayName: "Japan East",
    countryCode: "JP",
    geography: "Asia Pacific",
    metroSlug: "tokyo",
    purpose: "general",
    observedAt: OBSERVED,
    lastVerified: VERIFIED,
    confidence: "high",
  }),

  // Google Cloud asia-northeast1 (Tokyo). Added after the Tokyo
  // city entity was seeded, so the row is pinned to a metro.
  buildCloudRegionRow({
    provider: "gcp",
    regionCode: "asia-northeast1",
    displayName: "Tokyo",
    countryCode: "JP",
    geography: "Asia Pacific",
    metroSlug: "tokyo",
    purpose: "general",
    observedAt: OBSERVED_2,
    lastVerified: VERIFIED_2,
    confidence: "high",
  }),
];
