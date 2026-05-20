import { SITE } from "@/config/site";

/** Resolve a path against the site's canonical origin. */
export function canonicalUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

/**
 * Build a `schema.org` Organization node for the site itself.
 * Rendered once in the root layout.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.organization.name,
    url: SITE.organization.url,
    subOrganization: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  } as const;
}

/**
 * Build a `schema.org` Dataset node for an entity index page.
 * Used on /countries, /cities, /ixps, /cloud, /rankings.
 */
export function datasetJsonLd(input: {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly keywords?: ReadonlyArray<string>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.path),
    creator: {
      "@type": "Organization",
      name: SITE.organization.name,
      url: SITE.organization.url,
    },
    isAccessibleForFree: true,
    keywords: input.keywords,
  } as const;
}

/**
 * Build a `schema.org` BreadcrumbList node.
 *
 * Crumb order is root → leaf. The root entry is appended
 * automatically.
 */
export function breadcrumbJsonLd(
  trail: ReadonlyArray<{ readonly name: string; readonly path: string }>,
) {
  const items = [
    { name: "Radar", path: "/" },
    ...trail,
  ].map((crumb, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: crumb.name,
    item: canonicalUrl(crumb.path),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  } as const;
}

/**
 * Build a `schema.org` Country node for an entity page.
 *
 * Uses `addressCountry` as the ISO 3166-1 alpha-2 anchor — the same
 * identifier the structured-data parsers used by Google, Bing and
 * AI crawlers resolve to.
 */
export function countryJsonLd(input: {
  readonly name: string;
  readonly code: string;
  readonly path: string;
  readonly description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Country",
    name: input.name,
    identifier: input.code,
    url: canonicalUrl(input.path),
    description: input.description,
  } as const;
}

/**
 * Build a `schema.org` City node for an entity page.
 */
export function cityJsonLd(input: {
  readonly name: string;
  readonly countryName: string;
  readonly countryCode: string;
  readonly path: string;
  readonly description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "City",
    name: input.name,
    url: canonicalUrl(input.path),
    description: input.description,
    containedInPlace: {
      "@type": "Country",
      name: input.countryName,
      identifier: input.countryCode,
    },
  } as const;
}

/**
 * Build a `schema.org` Organization node for an IXP entity page.
 *
 * IXPs map cleanly to Organization (the legal operator) with a
 * `location` pointing at the metro the fabric serves.
 */
export function ixpJsonLd(input: {
  readonly name: string;
  readonly operator: string;
  readonly cityName: string;
  readonly countryCode: string;
  readonly path: string;
  readonly websiteUrl?: string;
  readonly description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    legalName: input.operator,
    url: canonicalUrl(input.path),
    sameAs: input.websiteUrl ? [input.websiteUrl] : undefined,
    description: input.description,
    location: {
      "@type": "Place",
      name: input.cityName,
      address: {
        "@type": "PostalAddress",
        addressLocality: input.cityName,
        addressCountry: input.countryCode,
      },
    },
  } as const;
}
