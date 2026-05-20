import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityHeader } from "@/components/ui/EntityHeader";
import { MetricTable } from "@/components/ui/MetricTable";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { COUNTRIES, getCountry, getCity, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

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
    title: `${country.name}`,
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

  const ld = breadcrumbJsonLd([
    { name: "Countries", path: "/countries" },
    { name: country.name, path: `/countries/${country.slug}` },
  ]);

  return (
    <Container as="article">
      <EntityHeader
        eyebrow={`${country.code} · ${country.region}`}
        title={country.name}
        summary={country.summary}
        confidence={country.provenance.confidence}
        lastUpdated={country.provenance.lastUpdated}
      />

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-graphite-50">Key metrics</h2>
        <p className="mt-2 max-w-prose text-sm text-graphite-400">
          Country-level structural metrics. Values appear here only after
          editorial review against the cited sources.
        </p>
        <div className="mt-6">
          <MetricTable
            rows={[
              { label: "Announced cloud regions", value: null },
              { label: "Internet Exchange Points", value: null },
              { label: "Submarine cable landings", value: null },
              { label: "IPv6 adoption", value: null, unit: "%" },
            ]}
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
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
      </section>

      <section className="mt-12 max-w-prose">
        <h2 className="text-xl font-semibold text-graphite-50">
          Infrastructure role
        </h2>
        <p className="mt-3 text-graphite-300">{country.summary}</p>
      </section>

      <section className="mt-12 max-w-prose">
        <h2 className="text-xl font-semibold text-graphite-50">Sources</h2>
        <p className="mt-2 text-sm text-graphite-400">
          Records and direct citations supporting this page.
        </p>
        <div className="mt-4">
          <SourceFootnote citations={country.provenance.sources} />
        </div>
        {country.provenance.note ? (
          <p className="mt-4 text-sm italic text-graphite-400">
            {country.provenance.note}
          </p>
        ) : null}
      </section>

      <Script
        id={`ld-country-${country.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
