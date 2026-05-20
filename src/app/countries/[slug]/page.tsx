import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityHeader } from "@/components/ui/EntityHeader";
import { EntitySection } from "@/components/ui/EntitySection";
import { MetricTable } from "@/components/ui/MetricTable";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { COUNTRIES, getCountry, getCity, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, countryJsonLd } from "@/lib/seo";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRIES.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  return buildPageMetadata({
    title: country.name,
    description: `${country.name} — internet infrastructure profile: hub cities, IXPs, announced cloud regions and cable landings. Source-cited.`,
    path: `/countries/${country.slug}`,
    lastUpdated: country.provenance.lastUpdated,
  });
}

export default async function CountryPage({ params }: RouteParams) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const hubCities = (country.hubCitySlugs ?? [])
    .map((s) => getCity(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const ixps = (country.ixpSlugs ?? [])
    .map((s) => getIxp(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  const breadcrumb = breadcrumbJsonLd([
    { name: "Countries", path: "/countries" },
    { name: country.name, path: `/countries/${country.slug}` },
  ]);
  const countryLd = countryJsonLd({
    name: country.name,
    code: country.code,
    path: `/countries/${country.slug}`,
    description: country.summary,
  });
  const ldNodes = [breadcrumb, countryLd];

  return (
    <Container as="article">
      <EntityHeader
        eyebrow={`${country.code} · ${country.region}`}
        title={country.name}
        summary={country.summary}
        confidence={country.provenance.confidence}
        lastUpdated={country.provenance.lastUpdated}
      />

      <EntitySection
        title="Key metrics"
        description="Country-level structural metrics. Values appear here only after editorial review against the cited sources."
      >
        <MetricTable
          rows={[
            { label: "Announced cloud regions", value: null },
            { label: "Internet Exchange Points", value: null },
            { label: "Submarine cable landings", value: null },
            { label: "IPv6 adoption", value: null, unit: "%" },
          ]}
        />
      </EntitySection>

      <EntitySection title="Related entities">
        <div className="grid gap-6 md:grid-cols-2">
          <RelatedEntities
            title="Hub cities"
            items={hubCities.map((c) => ({
              href: `/cities/${c.slug}`,
              label: c.name,
            }))}
          />
          <RelatedEntities
            title="Internet Exchanges"
            items={ixps.map((i) => ({ href: `/ixps/${i.slug}`, label: i.name }))}
          />
        </div>
      </EntitySection>

      <EntitySection title="Infrastructure role">
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          {country.summary}
        </p>
      </EntitySection>

      <EntitySection
        title="Sources"
        description="Records and direct citations supporting this page."
      >
        <SourceFootnote citations={country.provenance.sources} />
        {country.provenance.note ? (
          <p className="mt-6 max-w-prose text-sm italic text-ink-500">
            {country.provenance.note}
          </p>
        ) : null}
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-country-${country.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
