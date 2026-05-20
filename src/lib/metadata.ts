import type { Metadata } from "next";
import { SITE } from "@/config/site";

interface PageMetadataInput {
  /** Page-specific title (e.g. "Methodology"). The site name is
   *  appended automatically by the layout's title.template. */
  readonly title: string;
  /** One-paragraph description used for <meta description>, OG and
   *  Twitter cards. Keep under 160 characters. */
  readonly description: string;
  /** Path relative to the site root, e.g. "/methodology". */
  readonly path: string;
  /** ISO date the page content was last reviewed. Surfaced via
   *  <meta name="article:modified_time"> and OG type=article so
   *  freshness-aware crawlers (Google, Bing, Perplexity, AI agents)
   *  can detect updates. */
  readonly lastUpdated?: string;
  /** Set to false to drop the page out of search indices.
   *  Default true. */
  readonly indexable?: boolean;
}

/**
 * Build a Next `Metadata` object for a page.
 *
 * Centralising metadata construction means every page renders the
 * same shape of canonical URL, OG card, Twitter card and freshness
 * signal — which is what makes the SEO surface consistent rather
 * than per-page guesswork.
 */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const canonical = new URL(input.path, SITE.url).toString();
  const indexable = input.indexable ?? true;

  const openGraph: Metadata["openGraph"] = {
    type: "article",
    siteName: SITE.name,
    title: input.title,
    description: input.description,
    url: canonical,
    locale: SITE.locale,
    ...(input.lastUpdated ? { modifiedTime: input.lastUpdated } : {}),
  };

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
    other: input.lastUpdated
      ? { "article:modified_time": input.lastUpdated }
      : undefined,
  };
}
