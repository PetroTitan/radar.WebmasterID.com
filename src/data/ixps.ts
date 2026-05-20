import type { InternetExchange } from "@/entities";

/**
 * Verified Internet Exchange records.
 *
 * Empty by design. See `countries.ts` for the editorial policy.
 */
export const IXPS: ReadonlyArray<InternetExchange> = [];

export function getIxp(slug: string): InternetExchange | undefined {
  return IXPS.find((ixp) => ixp.slug === slug);
}

export function listIxpSlugs(): ReadonlyArray<string> {
  return IXPS.map((ixp) => ixp.slug);
}
