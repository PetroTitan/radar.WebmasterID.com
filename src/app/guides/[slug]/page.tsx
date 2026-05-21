import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { InfrastructureSummary } from "@/components/ui/InfrastructureSummary";
import { KeyTakeaways } from "@/components/ui/KeyTakeaways";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { StrategicImportance } from "@/components/ui/StrategicImportance";
import { CaveatBlock } from "@/components/ui/CaveatBlock";
import { GeographicImportance } from "@/components/ui/GeographicImportance";
import { RelatedResearch } from "@/components/ui/RelatedResearch";
import { InterconnectionGraphTable } from "@/components/ui/InterconnectionGraphTable";
import { GUIDES, getGuide } from "@/content/guides";
import { getCountry, getCity, getIxp } from "@/data";
import { InterconnectionDiagram } from "@/components/diagrams/InterconnectionDiagram";
import { CableLandingDiagram } from "@/components/diagrams/CableLandingDiagram";
import { CloudRegionDistributionDiagram } from "@/components/diagrams/CloudRegionDistributionDiagram";
import { CarrierNeutralFacilityDiagram } from "@/components/diagrams/CarrierNeutralFacilityDiagram";
import { InfrastructureRedundancyDiagram } from "@/components/diagrams/InfrastructureRedundancyDiagram";
import { buildPageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildPageMetadata({
    title: guide.title,
    description: guide.dek,
    path: `/guides/${guide.slug}`,
    lastUpdated: guide.lastUpdated,
  });
}

interface ResolvedRef {
  readonly href: string;
  readonly label: string;
  readonly note?: string;
}

function resolveRefs(refs: ReadonlyArray<string>): ReadonlyArray<ResolvedRef> {
  return refs.flatMap((ref): ReadonlyArray<ResolvedRef> => {
    const [kind, slug] = ref.split(":");
    if (!kind || !slug) return [];
    if (kind === "country") {
      const c = getCountry(slug);
      return c
        ? [{ href: `/countries/${c.slug}`, label: c.name, note: c.code }]
        : [];
    }
    if (kind === "city") {
      const c = getCity(slug);
      return c
        ? [{ href: `/cities/${c.slug}`, label: c.name, note: c.countryCode }]
        : [];
    }
    if (kind === "ixp") {
      const i = getIxp(slug);
      return i
        ? [{ href: `/ixps/${i.slug}`, label: i.name, note: i.countryCode }]
        : [];
    }
    return [];
  });
}

export default async function GuidePage({ params }: RouteParams) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = resolveRefs(guide.relatedEntityRefs ?? []);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Guides", path: "/guides" },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ]);
  const article = articleJsonLd({
    title: guide.title,
    dek: guide.dek,
    path: `/guides/${guide.slug}`,
    publishedAt: guide.publishedAt,
    lastUpdated: guide.lastUpdated,
  });
  const ldNodes = [breadcrumb, article];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Guide</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {guide.title}
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">
          {guide.dek}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span>Published {formatDisplayDate(guide.publishedAt)}</span>
          {guide.lastUpdated !== guide.publishedAt ? (
            <>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
              <span>Last reviewed {formatDisplayDate(guide.lastUpdated)}</span>
            </>
          ) : null}
        </div>
      </header>

      <div className="mt-12 grid gap-6 md:mt-16 md:gap-8">
        <QuickAnswer answer={guide.definition} />
        <div className="grid gap-6 md:grid-cols-5 md:gap-8">
          <div className="md:col-span-3">
            <KeyTakeaways takeaways={guide.keyTakeaways} />
          </div>
          <div className="md:col-span-2">
            <InfrastructureSummary facts={guide.summary} />
          </div>
        </div>
      </div>

      {guide.slug === "interconnection" ? (
        <>
          <div className="mt-14 md:mt-20">
            <InterconnectionDiagram />
          </div>
          <EntitySection
            title="Interconnection graph"
            description="Every reviewed IXP entity in the registry, anchored to its metro and country, with a count of the reviewed dataset rows that point back at it."
          >
            <InterconnectionGraphTable />
          </EntitySection>
        </>
      ) : null}
      {guide.slug === "internet-exchanges" ? (
        <div className="mt-14 md:mt-20">
          <InterconnectionDiagram />
        </div>
      ) : null}
      {guide.slug === "carrier-neutrality" ? (
        <div className="mt-14 md:mt-20">
          <CarrierNeutralFacilityDiagram />
        </div>
      ) : null}
      {guide.slug === "subsea-cables" ? (
        <div className="mt-14 md:mt-20">
          <CableLandingDiagram />
        </div>
      ) : null}
      {guide.slug === "cloud-regions" ? (
        <div className="mt-14 md:mt-20">
          <CloudRegionDistributionDiagram />
        </div>
      ) : null}
      {guide.slug === "infrastructure-redundancy" ? (
        <div className="mt-14 md:mt-20">
          <InfrastructureRedundancyDiagram />
        </div>
      ) : null}
      {guide.slug === "datacenter-hubs" ? (
        <div className="mt-14 md:mt-20">
          <CarrierNeutralFacilityDiagram />
        </div>
      ) : null}

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
        {guide.sections.length > 1 ? (
          <nav
            aria-label="Guide contents"
            className="md:col-span-4 lg:col-span-3"
          >
            <div className="md:sticky md:top-28">
              <p className="eyebrow text-ink-500">Contents</p>
              <ol className="mt-5 space-y-3 text-sm">
                {guide.sections.map((section, i) => (
                  <li key={section.id} className="flex gap-3">
                    <span className="font-mono text-xs tabular-nums text-ink-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${section.id}`}
                      className="text-ink-700 transition hover:text-accent-700"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : null}

        <div
          className={
            guide.sections.length > 1
              ? "md:col-span-8 lg:col-span-9"
              : "md:col-span-12"
          }
        >
          <div className="space-y-12 md:space-y-16">
            {guide.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 max-w-prose"
              >
                <p className="font-mono text-xs tabular-nums uppercase text-ink-300">
                  Section {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-h1 font-semibold text-ink-900">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-[1.0625rem] leading-[1.75] text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      {guide.strategicImportance && guide.strategicImportance.length > 0 ? (
        <EntitySection
          title="Strategic importance"
          description="Why this subject matters for operator planning, policy, and infrastructure resilience."
        >
          <StrategicImportance paragraphs={guide.strategicImportance} heading="Strategic importance" />
        </EntitySection>
      ) : null}

      {guide.geographicImportance && guide.geographicImportance.length > 0 ? (
        <EntitySection
          title="Geographic importance"
          description="Specific entities where the guide's subject is most visible, with editorial commentary on why each matters."
        >
          <GeographicImportance entries={guide.geographicImportance} />
        </EntitySection>
      ) : null}

      {related.length > 0 ? (
        <EntitySection title="Examples in the knowledge graph">
          <RelatedEntities title="Referenced entities" items={related} />
        </EntitySection>
      ) : null}

      {(guide.relatedDatasetSlugs && guide.relatedDatasetSlugs.length > 0) ||
      (guide.relatedIndicatorSlugs && guide.relatedIndicatorSlugs.length > 0) ||
      (guide.relatedRankingSlugs && guide.relatedRankingSlugs.length > 0) ||
      (guide.relatedMapPaths && guide.relatedMapPaths.length > 0) ||
      (guide.relatedMediaIds && guide.relatedMediaIds.length > 0) ? (
        <EntitySection
          title="Related research"
          description="Datasets, indicators, rankings, maps, and visuals that operationalise this guide's claims."
        >
          <RelatedResearch
            datasetSlugs={guide.relatedDatasetSlugs}
            indicatorSlugs={guide.relatedIndicatorSlugs}
            rankingSlugs={guide.relatedRankingSlugs}
            mapPaths={guide.relatedMapPaths}
            mediaIds={guide.relatedMediaIds}
          />
        </EntitySection>
      ) : null}

      {guide.methodologyNotes && guide.methodologyNotes.length > 0 ? (
        <EntitySection
          title="Methodology notes"
          description="How Radar's editorial process treats the claims in this guide, including what falsifies them."
        >
          <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
            {guide.methodologyNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </EntitySection>
      ) : null}

      {guide.caveats && guide.caveats.length > 0 ? (
        <EntitySection title="Caveats and limitations">
          <CaveatBlock caveats={guide.caveats} heading="Caveats and limitations" />
        </EntitySection>
      ) : null}

      <EntitySection title="Sources">
        <SourceFootnote citations={guide.sources} />
      </EntitySection>

      <EntitySection title="Continue reading">
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
          More authority guides are on the{" "}
          <Link
            href="/guides"
            className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
          >
            guides index
          </Link>
          . For editorial commentary that builds on this material, see the{" "}
          <Link
            href="/insights"
            className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
          >
            insights index
          </Link>
          .
        </p>
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-guide-${guide.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
