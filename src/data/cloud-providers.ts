import type { CloudProvider } from "@/entities";

/**
 * Verified cloud-provider records.
 *
 * Empty by design. Region listings live in /data/cloud-regions.ts.
 */
export const CLOUD_PROVIDERS: ReadonlyArray<CloudProvider> = [];

export function getCloudProvider(slug: string): CloudProvider | undefined {
  return CLOUD_PROVIDERS.find((provider) => provider.slug === slug);
}

export function listCloudProviderSlugs(): ReadonlyArray<string> {
  return CLOUD_PROVIDERS.map((provider) => provider.slug);
}
