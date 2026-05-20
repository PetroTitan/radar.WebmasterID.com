import type { Provenance } from "./shared";

/**
 * A hyperscale or specialist cloud platform operator.
 *
 * Resolves to a list of CloudRegion records. The provider record
 * carries the corporate identity; the region records carry the
 * physical-geography facts.
 */
export interface CloudProvider {
  /** kebab-case slug, e.g. "aws", "gcp", "azure", "cloudflare". */
  readonly slug: string;
  /** Display name, e.g. "Amazon Web Services". */
  readonly name: string;
  /** Short marketing-neutral category, e.g. "hyperscaler",
   *  "edge platform", "specialist cloud". */
  readonly tier: CloudProviderTier;
  /** Plain-prose overview of the provider. Editorial, source-cited. */
  readonly summary: string;
  /** Provider's official region directory URL. */
  readonly regionsUrl?: string;
  readonly provenance: Provenance;
}

export type CloudProviderTier =
  | "hyperscaler"
  | "edge-platform"
  | "specialist"
  | "regional";
