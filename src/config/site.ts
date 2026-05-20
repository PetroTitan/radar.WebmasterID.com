/**
 * Single source of truth for site-wide identity.
 *
 * Read by metadata builders, the sitemap, robots.txt, the header,
 * and JSON-LD generators. Anything that names the platform should
 * import from here.
 */
export const SITE = {
  name: "Radar WebmasterID",
  shortName: "Radar",
  tagline: "Verified digital infrastructure intelligence.",
  description:
    "Radar WebmasterID is a verified, source-governed knowledge graph of the internet's physical layer — cloud regions, IXPs, datacenters, subsea cables, and the institutions that run them.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://radar.webmasterid.com",
  locale: "en-US",
  organization: {
    name: "WebmasterID",
    url: "https://webmasterid.com",
  },
} as const;

export type SiteConfig = typeof SITE;
