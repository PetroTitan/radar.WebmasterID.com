import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { CaveatBlock } from "@/components/ui/CaveatBlock";
import { EcosystemRelationshipCard } from "@/components/ui/EcosystemRelationshipCard";
import { InfrastructureEvidenceTable } from "@/components/ui/InfrastructureEvidenceTable";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import {
  DATACENTER_FACILITIES,
  getDatacenterFacility,
  getCity,
  getCountryByCode,
  getIxp,
} from "@/data";
import { REVIEWED_CLOUD_REGIONS } from "@/data/research";
import { buildPageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return DATACENTER_FACILITIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const facility = getDatacenterFacility(slug);
  if (!facility) return {};
  return buildPageMetadata({
    title: facility.name,
    description:
      facility.summary ??
      `${facility.name} — ${facility.operator}, carrier-neutral colocation facility in ${facility.citySlug}. Source-bound identity record; no capacity figures.`,
    path: `/facilities/${facility.slug}`,
    lastUpdated: facility.provenance.lastUpdated,
  });
}

export default async function FacilityPage({ params }: RouteParams) {
  const { slug } = await params;
  const facility = getDatacenterFacility(slug);
  if (!facility) notFound();

  const city = getCity(facility.citySlug);
  const country = getCountryByCode(facility.countryCode);
  const ixps = (facility.relatedIxpSlugs ?? [])
    .map((s) => getIxp(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  // Match cloud-region refs back to reviewed cloud-region rows by
  // recomposing the row id (provider-regionCode).
  const cloudRegions = (facility.cloudRegionRefs ?? [])
    .map((ref) => {
      const [, regionCode] = ref.split(":");
      return REVIEWED_CLOUD_REGIONS.find(
        (r) => r.id === ref.replace(":", "-") || r.regionCode === regionCode,
      );
    })
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const breadcrumb = breadcrumbJsonLd([
    { name: "Facilities", path: "/facilities" },
    { name: facility.name, path: `/facilities/${facility.slug}` },
  ]);
  const article = articleJsonLd({
    title: facility.name,
    dek:
      facility.summary ??
      `${facility.name} — ${facility.operator}.`,
    path: `/facilities/${facility.slug}`,
    publishedAt: facility.provenance.lastUpdated,
    lastUpdated: facility.provenance.lastUpdated,
  });
  const ldNodes = [breadcrumb, article];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">
          Facility · {facility.operator}
        </p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {facility.name}
        </h1>
        {facility.ecosystemRole ? (
          <p className="mt-7 max-w-editorial text-lead text-ink-500">
            {facility.ecosystemRole}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span>Operator {facility.operator}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          <span>
            {city?.name ?? facility.citySlug}, {facility.countryCode}
          </span>
          {facility.carrierNeutral ? (
            <>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
              <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[0.7rem] font-medium text-accent-700">
                Carrier-neutral
              </span>
            </>
          ) : null}
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          <ConfidenceBadge level={facility.provenance.confidence} />
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          <span>Last reviewed {facility.provenance.lastUpdated}</span>
        </div>
      </header>

      {facility.summary ? (
        <div className="mt-12 md:mt-16">
          <QuickAnswer answer={facility.summary} label="Quick answer" />
        </div>
      ) : null}

      <EntitySection
        title="Ecosystem"
        description="The IXPs whose fabric extends into this facility, the cloud regions the metro serves as on-ramp for, and the city / country the facility sits inside."
      >
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <EcosystemRelationshipCard
            heading="Internet Exchange Points"
            items={ixps.map((i) => ({
              href: `/ixps/${i.slug}`,
              label: i.name,
              note: i.countryCode,
            }))}
            emptyNote="No IXP fabric extends into this facility per Radar's current registry."
          />
          <EcosystemRelationshipCard
            heading="Cloud regions in the metro"
            items={cloudRegions.map((r) => ({
              href: `/research/datasets/global-cloud-regions`,
              label: `${r.provider.toUpperCase()} · ${r.regionCode}`,
              note: r.countryCode,
            }))}
            emptyNote="No reviewed cloud-region rows pin this metro yet."
          />
          <EcosystemRelationshipCard
            heading="Metro and country"
            items={[
              ...(city
                ? [
                    {
                      href: `/cities/${city.slug}`,
                      label: city.name,
                      note: city.countryCode,
                    },
                  ]
                : []),
              ...(country
                ? [
                    {
                      href: `/countries/${country.slug}`,
                      label: country.name,
                      note: country.code,
                    },
                  ]
                : []),
            ]}
          />
          <EcosystemRelationshipCard
            heading="Operator-published reference"
            items={[
              ...(facility.websiteUrl
                ? [
                    {
                      href: facility.websiteUrl,
                      label: `${facility.operator} location page`,
                    },
                  ]
                : []),
            ]}
            emptyNote="Operator does not publish a stable location page for this facility."
          />
        </div>
      </EntitySection>

      <EntitySection
        title="Reviewed evidence"
        description="Source-cited PeeringDB rows pointing at this facility entity, plus any reviewed cloud-region rows that share its metro."
      >
        <InfrastructureEvidenceTable entityRef={`facility:${facility.slug}`} />
      </EntitySection>

      {facility.editorialNotes && facility.editorialNotes.length > 0 ? (
        <EntitySection
          title="Methodology notes"
          description="How Radar treats the facility's identity claims and what is deliberately out of scope."
        >
          <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
            {facility.editorialNotes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </EntitySection>
      ) : null}

      <EntitySection
        title="Caveats and limitations"
        description="What this record deliberately does not assert."
      >
        <CaveatBlock
          heading="Caveats and limitations"
          caveats={[
            "Power envelope, rack count, occupancy figures, and tenant lists are deliberately not stored. The operator's published material may quote those at a cluster level; Radar does not republish them at a per-building level.",
            "Carrier-neutrality is asserted only when the operator's own page describes the facility as such or when PeeringDB records corroborate dense multi-network presence.",
            "Cloud-region references document the metro the facility serves as on-ramp for, not exclusive on-ramp status — hyperscalers route via multiple carrier-neutral buildings in the same metro.",
          ]}
        />
      </EntitySection>

      <EntitySection title="Sources">
        <SourceFootnote citations={facility.provenance.sources} />
        {facility.provenance.note ? (
          <p className="mt-6 max-w-prose text-sm italic text-ink-500">
            {facility.provenance.note}
          </p>
        ) : null}
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-facility-${facility.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
