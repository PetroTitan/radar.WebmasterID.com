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
