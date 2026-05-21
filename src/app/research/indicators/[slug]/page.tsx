import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { IndicatorDefinition } from "@/components/ui/IndicatorDefinition";
import { DataLimitations } from "@/components/ui/DataLimitations";
import { SourceCoverage } from "@/components/ui/SourceCoverage";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { INDICATORS, getIndicator } from "@/content/indicators";
import { getDataset } from "@/content/datasets";
import { getRanking } from "@/content/rankings";
import { getCountry, getCity, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return INDICATORS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndicator(slug);
  if (!i) return {};
  return buildPageMetadata({
    title: i.title,
    description: i.dek,
    path: `/research/indicators/${i.slug}`,
    lastUpdated: i.lastUpdated,
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

export default async function IndicatorPage({ params }: RouteParams) {
  const { slug } = await params;
  const indicator = getIndicator(slug);
  if (!indicator) notFound();

  const datasets = (indicator.datasetSlugs ?? [])
    .map((s) => getDataset(s))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
  const rankings = (indicator.rankingSlugs ?? [])
    .map((s) => getRanking(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const related = resolveRefs(indicator.relatedEntityRefs ?? []);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Research", path: "/research" },
    { name: "Indicators", path: "/research/indicators" },
    { name: indicator.title, path: `/research/indicators/${indicator.slug}` },
  ]);
  const article = articleJsonLd({
    title: indicator.title,
    dek: indicator.dek,
    path: `/research/indicators/${indicator.slug}`,
    publishedAt: indicator.publishedAt,
    lastUpdated: indicator.lastUpdated,
  });
  const ldNodes = [breadcrumb, article];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Indicator</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {indicator.title}
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">
          {indicator.dek}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span>Published {formatDisplayDate(indicator.publishedAt)}</span>
          {indicator.lastUpdated !== indicator.publishedAt ? (
            <>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
              <span>Last reviewed {formatDisplayDate(indicator.lastUpdated)}</span>
            </>
          ) : null}
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        <IndicatorDefinition indicator={indicator} />
      </div>

      <EntitySection title="Methodology">
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          {indicator.methodology}
        </p>
      </EntitySection>

      <EntitySection title="Known limitations">
        <DataLimitations limitations={indicator.limitations} heading="Known limitations" />
      </EntitySection>

      <EntitySection title="Source coverage">
        <SourceCoverage citations={indicator.sources} />
      </EntitySection>

      {datasets.length > 0 ? (
        <EntitySection
          title="Datasets that source this"
          description="Dataset cards whose published cells feed this indicator."
        >
          <ul className="divide-y divide-line border-y border-line">
            {datasets.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/research/datasets/${d.slug}`}
                  className="group block py-5"
                >
                  <p className="eyebrow text-accent-600">Dataset</p>
                  <p className="mt-2 font-display text-h3 font-semibold text-ink-900 transition group-hover:text-accent-700">
                    {d.title}
                  </p>
                  <p className="mt-1.5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                    {d.dek}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

      {rankings.length > 0 ? (
        <EntitySection
          title="Rankings that use this indicator"
          description="Comparative views built on top of this indicator."
        >
          <ul className="divide-y divide-line border-y border-line">
            {rankings.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/research/rankings/${r.slug}`}
                  className="group block py-5"
                >
                  <p className="eyebrow text-ink-500">Ranking</p>
                  <p className="mt-2 font-display text-h3 font-semibold text-ink-900 transition group-hover:text-accent-700">
                    {r.title}
                  </p>
                  <p className="mt-1.5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                    {r.dek}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

      {related.length > 0 ? (
        <EntitySection title="Exemplified by">
          <RelatedEntities title="Entities that illustrate this indicator" items={related} />
        </EntitySection>
      ) : null}

      <EntitySection title="Sources">
        <SourceFootnote citations={indicator.sources} />
      </EntitySection>

      {ldNodes.map((node, idx) => (
        <Script
          key={idx}
          id={`ld-indicator-${indicator.slug}-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
