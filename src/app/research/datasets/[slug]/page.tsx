import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { DatasetSummary } from "@/components/ui/DatasetSummary";
import { DataLimitations } from "@/components/ui/DataLimitations";
import { SourceCoverage } from "@/components/ui/SourceCoverage";
import { ConfidenceBreakdown } from "@/components/ui/ConfidenceBreakdown";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { ReviewedRowsTable } from "@/components/ui/ReviewedRowsTable";
import { DATASETS, getDataset } from "@/content/datasets";
import { listIndicatorsByDataset } from "@/content/indicators";
import { getCountry, getCity, getIxp } from "@/data";
import {
  REVIEWED_CLOUD_REGIONS,
  REVIEWED_PEERINGDB_IXPS,
  REVIEWED_PEERINGDB_FACILITIES,
} from "@/data/research";
import type { InfrastructureDatasetRow } from "@/entities";
import { buildPageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return DATASETS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const d = getDataset(slug);
  if (!d) return {};
  return buildPageMetadata({
    title: d.title,
    description: d.dek,
    path: `/research/datasets/${d.slug}`,
    lastUpdated: d.lastUpdated,
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
      return c ? [{ href: `/countries/${c.slug}`, label: c.name, note: c.code }] : [];
    }
    if (kind === "city") {
      const c = getCity(slug);
      return c ? [{ href: `/cities/${c.slug}`, label: c.name, note: c.countryCode }] : [];
    }
    if (kind === "ixp") {
      const i = getIxp(slug);
      return i ? [{ href: `/ixps/${i.slug}`, label: i.name, note: i.countryCode }] : [];
    }
    return [];
  });
}

export default async function DatasetPage({ params }: RouteParams) {
  const { slug } = await params;
  const d = getDataset(slug);
  if (!d) notFound();

  const related = resolveRefs(d.relatedEntityRefs ?? []);
  const consumingIndicators = listIndicatorsByDataset(d.slug);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Research", path: "/research" },
    { name: "Datasets", path: "/research/datasets" },
    { name: d.title, path: `/research/datasets/${d.slug}` },
  ]);
  const article = articleJsonLd({
    title: d.title,
    dek: d.dek,
    path: `/research/datasets/${d.slug}`,
    publishedAt: d.publishedAt,
    lastUpdated: d.lastUpdated,
  });
  const ldNodes = [breadcrumb, article];

  // Lookup reviewed rows by dataset slug. The map is explicit
  // rather than registry-driven so adding a new dataset that has
  // no reviewed rows yet remains a single-line change.
  const reviewedRows: ReadonlyArray<InfrastructureDatasetRow> =
    d.slug === "global-cloud-regions"
      ? REVIEWED_CLOUD_REGIONS
      : d.slug === "internet-exchange-hubs"
        ? REVIEWED_PEERINGDB_IXPS
        : d.slug === "facilities"
          ? REVIEWED_PEERINGDB_FACILITIES
          : [];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Dataset</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {d.title}
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">{d.dek}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span>Published {formatDisplayDate(d.publishedAt)}</span>
          {d.lastUpdated !== d.publishedAt ? (
            <>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
              <span>Last reviewed {formatDisplayDate(d.lastUpdated)}</span>
            </>
          ) : null}
        </div>
      </header>

      {d.status === "pending" ? (
        <div className="mt-12 md:mt-16">
          <QuickAnswer
            label="Dataset status"
            answer="Dataset not yet fully verified. The card below documents the intended schema, methodology, and sources; the rows themselves await editorial ingestion."
          />
        </div>
      ) : null}

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-5 md:gap-8">
        <div className="md:col-span-3">
          <DatasetSummary dataset={d} />
        </div>
        <div className="md:col-span-2">
          <ConfidenceBreakdown
            level={d.confidence}
            rationale={
              reviewedRows.length > 0
                ? `${reviewedRows.length} reviewed row${reviewedRows.length === 1 ? "" : "s"} promoted from ingestion; every row is source-cited and editor-signed.`
                : "No reviewed rows yet. The published surface is the dataset card itself; row-level rendering activates once editorial review promotes ingestion output."
            }
          />
        </div>
      </div>

      <EntitySection
        title="Reviewed records"
        description="Rows that have been promoted from ingestion output through editorial review. Each row links back to the specific source page it was verified against."
      >
        <ReviewedRowsTable rows={reviewedRows} heading="Reviewed rows" />
      </EntitySection>

      <EntitySection title="Methodology">
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          {d.methodology}
        </p>
      </EntitySection>

      <EntitySection title="Known limitations">
        <DataLimitations limitations={d.limitations} heading="Known limitations" />
      </EntitySection>

      <EntitySection title="Source coverage">
        <SourceCoverage citations={d.sources} />
      </EntitySection>

      {consumingIndicators.length > 0 ? (
        <EntitySection
          title="Indicators built on this dataset"
          description="Research dimensions that consume this dataset to produce comparable values."
        >
          <ul className="divide-y divide-line border-y border-line">
            {consumingIndicators.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/research/indicators/${i.slug}`}
                  className="group block py-5"
                >
                  <p className="eyebrow text-accent-600">Indicator</p>
                  <p className="mt-2 font-display text-h3 font-semibold text-ink-900 transition group-hover:text-accent-700">
                    {i.title}
                  </p>
                  <p className="mt-1.5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                    {i.dek}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

      {d.mapPath ? (
        <EntitySection title="Map view">
          <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
            The geographic view of this dataset is published on{" "}
            <Link
              href={d.mapPath}
              className="text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
            >
              {d.mapPath}
            </Link>
            .
          </p>
        </EntitySection>
      ) : null}

      {related.length > 0 ? (
        <EntitySection title="Entities in this dataset">
          <RelatedEntities title="Referenced entities" items={related} />
        </EntitySection>
      ) : null}

      <EntitySection title="Sources">
        <SourceFootnote citations={d.sources} />
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-dataset-${d.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
