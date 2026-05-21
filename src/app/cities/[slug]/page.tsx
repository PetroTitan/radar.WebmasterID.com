import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityHeader } from "@/components/ui/EntityHeader";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import {
  EditorialBlocks,
  hasEditorialContent,
} from "@/components/ui/EditorialBlocks";
import { MetricTable } from "@/components/ui/MetricTable";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { InfrastructureEvidenceTable } from "@/components/ui/InfrastructureEvidenceTable";
import { VisualEvidenceBlock } from "@/components/ui/VisualEvidenceBlock";
import { MetroInfrastructureGraph } from "@/components/ui/MetroInfrastructureGraph";
import { listDatacenterFacilitiesByCitySlug } from "@/data";
import { CITIES, getCity, getCountry, getIxp } from "@/data";
import { listInsightsByEntityRef } from "@/content/insights";
import { listGuidesByEntityRef } from "@/content/guides";
import { listMediaAssetsByEntityRef } from "@/content/media";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, cityJsonLd } from "@/lib/seo";
import Link from "next/link";

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
  const relatedInsights = listInsightsByEntityRef(`city:${city.slug}`);
  const relatedGuides = listGuidesByEntityRef(`city:${city.slug}`);
  const hasVisualEvidence =
    listMediaAssetsByEntityRef(`city:${city.slug}`).length > 0;
  const cityFacilities = listDatacenterFacilitiesByCitySlug(city.slug);

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
        confidence={city.provenance.confidence}
        lastUpdated={city.provenance.lastUpdated}
      />

      <div className="mt-12 md:mt-16">
        <QuickAnswer answer={city.summary} label="Quick answer" />
      </div>

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

      <EntitySection
        title="Reviewed evidence"
        description="Source-cited dataset rows linked to this metro. Cloud regions, IXPs and carrier-neutral facilities citing this metro's slug are listed here."
      >
        <InfrastructureEvidenceTable entityRef={`city:${city.slug}`} />
      </EntitySection>

      {cityFacilities.length > 0 ? (
        <EntitySection
          title="Datacenter facilities"
          description="Radar-registered facility identity records anchored at this metro. Power envelopes, occupancy, and tenant lists are deliberately out of scope."
        >
          <ul className="divide-y divide-line border-y border-line">
            {cityFacilities.map((f) => (
              <li key={f.slug} className="py-5">
                <Link
                  href={`/facilities/${f.slug}`}
                  className="group flex flex-wrap items-baseline gap-x-4 gap-y-1"
                >
                  <span className="eyebrow text-ink-500">{f.operator}</span>
                  {f.carrierNeutral ? (
                    <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[0.7rem] font-medium text-accent-700">
                      carrier-neutral
                    </span>
                  ) : null}
                  <span className="basis-full" />
                  <span className="font-display text-lg font-semibold text-ink-900 transition group-hover:text-accent-700">
                    {f.name}
                  </span>
                  <span className="basis-full" />
                  {f.ecosystemRole ? (
                    <span className="text-[0.875rem] text-ink-500">
                      {f.ecosystemRole}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

      <EntitySection
        title="Metro infrastructure graph"
        description="Every Radar-registered facility, IXP, and reviewed cloud region anchored at this metro, in a single static table."
      >
        <MetroInfrastructureGraph citySlug={city.slug} heading="Layered view" />
      </EntitySection>

      {hasVisualEvidence ? (
        <EntitySection
          title="Visual evidence"
          description="Verified visual assets linked to this metro. Candidate visuals appear as registered intent records and do not render inline until licensing is editorially confirmed."
        >
          <VisualEvidenceBlock entityRef={`city:${city.slug}`} />
        </EntitySection>
      ) : null}

      {relatedGuides.length + relatedInsights.length > 0 ? (
        <EntitySection
          title="Further reading"
          description="Reference guides and editorial insights related to this metro."
        >
          <ul className="divide-y divide-line border-y border-line">
            {relatedGuides.map((guide) => (
              <li key={`guide-${guide.slug}`}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group block py-5"
                >
                  <p className="eyebrow text-accent-600">Guide</p>
                  <p className="mt-2 font-display text-h3 font-semibold text-ink-900 transition group-hover:text-accent-700">
                    {guide.title}
                  </p>
                  <p className="mt-1.5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                    {guide.dek}
                  </p>
                </Link>
              </li>
            ))}
            {relatedInsights.map((insight) => (
              <li key={`insight-${insight.slug}`}>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="group block py-5"
                >
                  <p className="eyebrow text-ink-500">Insight</p>
                  <p className="mt-2 font-display text-h3 font-semibold text-ink-900 transition group-hover:text-accent-700">
                    {insight.title}
                  </p>
                  <p className="mt-1.5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                    {insight.dek}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

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
