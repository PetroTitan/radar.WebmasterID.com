import type { InfrastructureMap } from "@/entities";
import { EUROPEAN_INTERCONNECTION_MAP } from "./european-interconnection";
import { TRANSATLANTIC_CONNECTIVITY_MAP } from "./transatlantic-connectivity";
import { AI_CLOUD_GEOGRAPHY_MAP } from "./ai-cloud-geography";

/**
 * Editorial infrastructure-maps registry.
 *
 * These are *topology* maps — corridor diagrams, clustering
 * diagrams, ecosystem diagrams. They are distinct from the
 * legacy entity maps under /maps/{cloud-regions, ixps,
 * datacenters, subsea-cables}, which plot every reviewed entity
 * row on an abstract longitude / latitude grid.
 *
 * The validator enforces methodology + caveats + source coverage
 * on every entry here; the entity-map pages handle their own
 * source surfaces.
 */
export const INFRASTRUCTURE_MAPS: ReadonlyArray<InfrastructureMap> = [
  EUROPEAN_INTERCONNECTION_MAP,
  TRANSATLANTIC_CONNECTIVITY_MAP,
  AI_CLOUD_GEOGRAPHY_MAP,
];

export function getInfrastructureMap(
  slug: string,
): InfrastructureMap | undefined {
  return INFRASTRUCTURE_MAPS.find((m) => m.slug === slug);
}

export function listInfrastructureMapSlugs(): ReadonlyArray<string> {
  return INFRASTRUCTURE_MAPS.map((m) => m.slug);
}

/**
 * Legacy entity-map descriptors, surfaced on the /maps index
 * alongside the editorial `InfrastructureMap` entries. These
 * correspond to existing static routes under
 * /maps/{cloud-regions, ixps, datacenters, subsea-cables} and
 * intentionally do not go through the InfrastructureMap entity
 * — they plot reviewed entities directly.
 */
export const LEGACY_ENTITY_MAPS: ReadonlyArray<{
  readonly slug: string;
  readonly title: string;
  readonly dek: string;
  readonly category: InfrastructureMap["category"];
}> = [
  {
    slug: "cloud-regions",
    title: "Cloud regions",
    dek:
      "Where the three major hyperscalers operate verified cloud regions, per their published directories.",
    category: "cloud",
  },
  {
    slug: "ixps",
    title: "Internet Exchange Points",
    dek:
      "Where the principal peering fabrics live, anchored by PeeringDB and operator-published records.",
    category: "interconnection",
  },
  {
    slug: "datacenters",
    title: "Datacenter hubs",
    dek:
      "Metros that anchor the world's carrier-neutral colocation clusters.",
    category: "metro-ecosystem",
  },
  {
    slug: "subsea-cables",
    title: "Submarine cables",
    dek:
      "Cable landing geography, anchored by TeleGeography's Submarine Cable Map.",
    category: "subsea",
  },
];
