import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { COUNTRIES, CITIES, CLOUD_PROVIDERS, IXPS } from "@/data";

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
  { path: "/rankings", changeFrequency: "weekly", priority: 0.8 },
  { path: "/methodology", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sources", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.4 },
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

  return [
    ...staticEntries,
    ...countryEntries,
    ...cityEntries,
    ...cloudEntries,
    ...ixpEntries,
  ];
}
