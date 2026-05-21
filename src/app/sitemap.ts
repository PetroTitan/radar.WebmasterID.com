import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { COUNTRIES, CITIES, CLOUD_PROVIDERS, IXPS } from "@/data";
import { INSIGHTS } from "@/content/insights";
import { GUIDES } from "@/content/guides";
import { DATASETS } from "@/content/datasets";
import { INDICATORS } from "@/content/indicators";
import { RANKINGS } from "@/content/rankings";

const STATIC_PATHS: ReadonlyArray<{
  readonly path: string;
  readonly changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  readonly priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/countries", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cities", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cloud", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ixps", changeFrequency: "weekly", priority: 0.9 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.9 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.85 },
  { path: "/maps", changeFrequency: "weekly", priority: 0.85 },
  { path: "/maps/cloud-regions", changeFrequency: "weekly", priority: 0.8 },
  { path: "/maps/ixps", changeFrequency: "weekly", priority: 0.8 },
  { path: "/maps/datacenters", changeFrequency: "weekly", priority: 0.8 },
  { path: "/maps/subsea-cables", changeFrequency: "weekly", priority: 0.8 },
  // /rankings now redirects to /research/rankings; the static entry
  // is included via the research-rankings index below.
  { path: "/research", changeFrequency: "weekly", priority: 0.9 },
  { path: "/research/datasets", changeFrequency: "weekly", priority: 0.85 },
  { path: "/research/indicators", changeFrequency: "weekly", priority: 0.85 },
  { path: "/research/rankings", changeFrequency: "weekly", priority: 0.85 },
  { path: "/research/methodologies", changeFrequency: "monthly", priority: 0.75 },
  { path: "/methodology", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sources", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(
    ({ path, changeFrequency, priority }) => ({
      url: new URL(path, SITE.url).toString(),
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  const countryEntries: MetadataRoute.Sitemap = COUNTRIES.map((country) => ({
    url: new URL(`/countries/${country.slug}`, SITE.url).toString(),
    lastModified: new Date(country.provenance.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cityEntries: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: new URL(`/cities/${city.slug}`, SITE.url).toString(),
    lastModified: new Date(city.provenance.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cloudEntries: MetadataRoute.Sitemap = CLOUD_PROVIDERS.map((provider) => ({
    url: new URL(`/cloud/${provider.slug}`, SITE.url).toString(),
    lastModified: new Date(provider.provenance.lastUpdated),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const ixpEntries: MetadataRoute.Sitemap = IXPS.map((ixp) => ({
    url: new URL(`/ixps/${ixp.slug}`, SITE.url).toString(),
    lastModified: new Date(ixp.provenance.lastUpdated),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const insightEntries: MetadataRoute.Sitemap = INSIGHTS.map((insight) => ({
    url: new URL(`/insights/${insight.slug}`, SITE.url).toString(),
    lastModified: new Date(insight.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: new URL(`/guides/${guide.slug}`, SITE.url).toString(),
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const datasetEntries: MetadataRoute.Sitemap = DATASETS.map((d) => ({
    url: new URL(`/research/datasets/${d.slug}`, SITE.url).toString(),
    lastModified: new Date(d.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const indicatorEntries: MetadataRoute.Sitemap = INDICATORS.map((i) => ({
    url: new URL(`/research/indicators/${i.slug}`, SITE.url).toString(),
    lastModified: new Date(i.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const rankingEntries: MetadataRoute.Sitemap = RANKINGS.map((r) => ({
    url: new URL(`/research/rankings/${r.slug}`, SITE.url).toString(),
    lastModified: new Date(r.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticEntries,
    ...countryEntries,
    ...cityEntries,
    ...cloudEntries,
    ...ixpEntries,
    ...insightEntries,
    ...guideEntries,
    ...datasetEntries,
    ...indicatorEntries,
    ...rankingEntries,
  ];
}
