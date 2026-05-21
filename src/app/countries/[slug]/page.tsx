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
import { COUNTRIES, getCountry, getCity, getIxp } from "@/data";
import { listInsightsByEntityRef } from "@/content/insights";
import { listGuidesByEntityRef } from "@/content/guides";
import { listMediaAssetsByEntityRef } from "@/content/media";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, countryJsonLd } from "@/lib/seo";
import Link from "next/link";

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
  const relatedInsights = listInsightsByEntityRef(`country:${country.slug}`);
  const relatedGuides = listGuidesByEntityRef(`country:${country.slug}`);
  const hasVisualEvidence =
    listMediaAssetsByEntityRef(`country:${country.slug}`).length > 0;

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
        confidence={country.provenance.confidence}
        lastUpdated={country.provenance.lastUpdated}
      />

      <div className="mt-12 md:mt-16">
        <QuickAnswer answer={country.summary} label="Quick answer" />
      </div>

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

      {country.editorial && hasEditorialContent(country.editorial) ? (
        <EntitySection
          title="Infrastructure intelligence"
          description="Source-cited editorial briefing on this country's role in the global infrastructure graph."
        >
          <EditorialBlocks editorial={country.editorial} />
        </EntitySection>
      ) : (
        <EntitySection title="Infrastructure role">
          <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
            {country.summary}
          </p>
        </EntitySection>
      )}

      <EntitySection
        title="Reviewed evidence"
        description="Source-cited dataset rows linked to this country. Each row resolves to a primary source URL and the editorial review date."
      >
        <InfrastructureEvidenceTable entityRef={`country:${country.slug}`} />
      </EntitySection>

      {hasVisualEvidence ? (
        <EntitySection
          title="Visual evidence"
          description="Verified visual assets linked to this country. Candidate visuals appear as registered intent records and do not render inline until licensing is editorially confirmed."
        >
          <VisualEvidenceBlock entityRef={`country:${country.slug}`} />
        </EntitySection>
      ) : null}

      {relatedGuides.length + relatedInsights.length > 0 ? (
        <EntitySection
          title="Further reading"
          description="Reference guides and editorial insights related to this country."
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
