import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityHeader } from "@/components/ui/EntityHeader";
import { MetricTable } from "@/components/ui/MetricTable";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { CITIES, getCity, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

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
    title: `${city.name}`,
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

  const ld = breadcrumbJsonLd([
    { name: "Cities", path: "/cities" },
    { name: city.name, path: `/cities/${city.slug}` },
  ]);

  return (
    <Container as="article">
      <EntityHeader
        eyebrow={`${city.countryCode} · Hub city`}
        title={city.name}
        summary={city.summary}
        confidence={city.provenance.confidence}
        lastUpdated={city.provenance.lastUpdated}
      />

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-graphite-50">Key metrics</h2>
        <p className="mt-2 max-w-prose text-sm text-graphite-400">
          Metro-level structural metrics. Volatile observations (peering peaks,
          latency samples) carry their own observation date and confidence.
        </p>
        <div className="mt-6">
          <MetricTable
            rows={[
              { label: "Internet Exchange Points", value: null },
              { label: "Announced cloud regions", value: null },
              { label: "Submarine cable landings", value: null },
              { label: "Peak peering traffic", value: null, unit: "Tbps" },
            ]}
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <RelatedEntities
          title="Internet Exchanges in this metro"
          items={ixps.map((i) => ({ href: `/ixps/${i.slug}`, label: i.name }))}
        />
        <RelatedEntities
          title="Country"
          items={[{ href: `/countries/${city.countrySlug}`, label: city.countryCode }]}
        />
      </section>

      <section className="mt-12 max-w-prose">
        <h2 className="text-xl font-semibold text-graphite-50">
          Infrastructure role
        </h2>
        <p className="mt-3 text-graphite-300">{city.summary}</p>
      </section>

      <section className="mt-12 max-w-prose">
        <h2 className="text-xl font-semibold text-graphite-50">Sources</h2>
        <div className="mt-4">
          <SourceFootnote citations={city.provenance.sources} />
        </div>
        {city.provenance.note ? (
          <p className="mt-4 text-sm italic text-graphite-400">
            {city.provenance.note}
          </p>
        ) : null}
      </section>

      <Script
        id={`ld-city-${city.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
