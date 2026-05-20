import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityHeader } from "@/components/ui/EntityHeader";
import { EntitySection } from "@/components/ui/EntitySection";
import {
  EditorialBlocks,
  hasEditorialContent,
} from "@/components/ui/EditorialBlocks";
import { MetricTable } from "@/components/ui/MetricTable";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { CITIES, getCity, getCountry, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, cityJsonLd } from "@/lib/seo";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return buildPageMetadata({
    title: city.name,
    description: `${city.name} — infrastructure profile: IXPs, cloud regions, cable landings. Every figure source-cited.`,
    path: `/cities/${city.slug}`,
    lastUpdated: city.provenance.lastUpdated,
  });
}

export default async function CityPage({ params }: RouteParams) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const ixps = (city.ixpSlugs ?? [])
    .map((s) => getIxp(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const country = getCountry(city.countrySlug);
  const peerMetros = (city.peerMetroSlugs ?? [])
    .map((s) => getCity(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const breadcrumb = breadcrumbJsonLd([
    { name: "Cities", path: "/cities" },
    { name: city.name, path: `/cities/${city.slug}` },
  ]);
  const cityLd = cityJsonLd({
    name: city.name,
    countryName: country?.name ?? city.countryCode,
    countryCode: city.countryCode,
    path: `/cities/${city.slug}`,
    description: city.summary,
  });
  const ldNodes = [breadcrumb, cityLd];

  return (
    <Container as="article">
      <EntityHeader
        eyebrow={`${city.countryCode} · Hub city`}
        title={city.name}
        summary={city.summary}
        confidence={city.provenance.confidence}
        lastUpdated={city.provenance.lastUpdated}
      />

      <EntitySection
        title="Key metrics"
        description="Metro-level structural metrics. Volatile observations (peering peaks, latency samples) carry their own observation date and confidence."
      >
        <MetricTable
          rows={[
            { label: "Internet Exchange Points", value: null },
            { label: "Announced cloud regions", value: null },
            { label: "Submarine cable landings", value: null },
            { label: "Peak peering traffic", value: null, unit: "Tbps" },
          ]}
        />
      </EntitySection>

      <EntitySection title="Related entities">
        <div className="grid gap-6 md:grid-cols-2">
          <RelatedEntities
            title="Internet Exchanges in this metro"
            items={ixps.map((i) => ({ href: `/ixps/${i.slug}`, label: i.name }))}
          />
          <RelatedEntities
            title="Country"
            items={[
              {
                href: `/countries/${city.countrySlug}`,
                label: country?.name ?? city.countryCode,
                note: city.countryCode,
              },
            ]}
          />
          {peerMetros.length > 0 ? (
            <RelatedEntities
              title="Peer hub metros"
              items={peerMetros.map((m) => ({
                href: `/cities/${m.slug}`,
                label: m.name,
                note: m.countryCode,
              }))}
            />
          ) : null}
        </div>
      </EntitySection>

      {city.editorial && hasEditorialContent(city.editorial) ? (
        <EntitySection
          title="Infrastructure intelligence"
          description="Source-cited editorial briefing on this metro's role in the global infrastructure graph."
        >
          <EditorialBlocks editorial={city.editorial} />
        </EntitySection>
      ) : (
        <EntitySection title="Infrastructure role">
          <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
            {city.summary}
          </p>
        </EntitySection>
      )}

      <EntitySection title="Sources">
        <SourceFootnote citations={city.provenance.sources} />
        {city.provenance.note ? (
          <p className="mt-6 max-w-prose text-sm italic text-ink-500">
            {city.provenance.note}
          </p>
        ) : null}
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-city-${city.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
