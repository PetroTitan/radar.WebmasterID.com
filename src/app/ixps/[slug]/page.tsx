import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityHeader } from "@/components/ui/EntityHeader";
import { MetricTable } from "@/components/ui/MetricTable";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { IXPS, getIxp, getCity, getCountryByCode } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, ixpJsonLd } from "@/lib/seo";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return IXPS.map((ixp) => ({ slug: ixp.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const ixp = getIxp(slug);
  if (!ixp) return {};
  return buildPageMetadata({
    title: ixp.name,
    description: `${ixp.name} — Internet Exchange Point profile: operator, location, member networks. Sourced from PeeringDB and operator records.`,
    path: `/ixps/${ixp.slug}`,
    lastUpdated: ixp.provenance.lastUpdated,
  });
}

export default async function IxpPage({ params }: RouteParams) {
  const { slug } = await params;
  const ixp = getIxp(slug);
  if (!ixp) notFound();
  const city = getCity(ixp.citySlug);
  const country = getCountryByCode(ixp.countryCode);

  const breadcrumb = breadcrumbJsonLd([
    { name: "IXPs", path: "/ixps" },
    { name: ixp.name, path: `/ixps/${ixp.slug}` },
  ]);
  const orgLd = ixpJsonLd({
    name: ixp.name,
    operator: ixp.operator,
    cityName: city?.name ?? "",
    countryCode: ixp.countryCode,
    path: `/ixps/${ixp.slug}`,
    websiteUrl: ixp.websiteUrl,
    description: ixp.summary,
  });
  const ldNodes = [breadcrumb, orgLd];

  return (
    <Container as="article">
      <EntityHeader
        eyebrow={`IXP · ${ixp.countryCode}`}
        title={ixp.name}
        summary={ixp.summary}
        confidence={ixp.provenance.confidence}
        lastUpdated={ixp.provenance.lastUpdated}
      />

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-ink-900">Key metrics</h2>
        <p className="mt-2 max-w-prose text-sm text-ink-500">
          Identity facts plus the most recent observed traffic and membership
          values. Observation dates are recorded with each value.
        </p>
        <div className="mt-6">
          <MetricTable
            rows={[
              { label: "Operator", value: ixp.operator },
              {
                label: "Location",
                value: city ? city.name : null,
              },
              { label: "Connected networks", value: null },
              { label: "Peak traffic", value: null, unit: "Tbps" },
              {
                label: "PeeringDB ID",
                value: ixp.peeringDbId ?? null,
                sourceLabel: "PeeringDB",
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <RelatedEntities
          title="Hub city"
          items={city ? [{ href: `/cities/${city.slug}`, label: city.name }] : []}
        />
        <RelatedEntities
          title="Country"
          items={
            country
              ? [
                  {
                    href: `/countries/${country.slug}`,
                    label: country.name,
                    note: country.code,
                  },
                ]
              : []
          }
        />
      </section>

      <section className="mt-12 max-w-prose">
        <h2 className="text-xl font-semibold text-ink-900">
          Infrastructure role
        </h2>
        <p className="mt-3 text-ink-700">{ixp.summary}</p>
      </section>

      <section className="mt-12 max-w-prose">
        <h2 className="text-xl font-semibold text-ink-900">Sources</h2>
        <div className="mt-4">
          <SourceFootnote citations={ixp.provenance.sources} />
        </div>
      </section>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-ixp-${ixp.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
