import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { RankingMethodology } from "@/components/ui/RankingMethodology";
import { DataLimitations } from "@/components/ui/DataLimitations";
import { SourceCoverage } from "@/components/ui/SourceCoverage";
import { ConfidenceBreakdown } from "@/components/ui/ConfidenceBreakdown";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { RANKINGS, getRanking } from "@/content/rankings";
import { getIndicator } from "@/content/indicators";
import { getCountry, getCity, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return RANKINGS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const r = getRanking(slug);
  if (!r) return {};
  return buildPageMetadata({
    title: r.title,
    description: r.dek,
    path: `/research/rankings/${r.slug}`,
    lastUpdated: r.lastUpdated,
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

export default async function RankingPage({ params }: RouteParams) {
  const { slug } = await params;
  const ranking = getRanking(slug);
  if (!ranking) notFound();

  const indicators = ranking.indicatorSlugs
    .map((s) => getIndicator(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const related = resolveRefs(ranking.relatedEntityRefs ?? []);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Research", path: "/research" },
    { name: "Rankings", path: "/research/rankings" },
    { name: ranking.title, path: `/research/rankings/${ranking.slug}` },
  ]);
  const article = articleJsonLd({
    title: ranking.title,
    dek: ranking.dek,
    path: `/research/rankings/${ranking.slug}`,
    publishedAt: ranking.publishedAt,
    lastUpdated: ranking.lastUpdated,
  });
  const ldNodes = [breadcrumb, article];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Ranking</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {ranking.title}
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">
          {ranking.dek}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span>Published {formatDisplayDate(ranking.publishedAt)}</span>
          {ranking.lastUpdated !== ranking.publishedAt ? (
            <>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
              <span>Last reviewed {formatDisplayDate(ranking.lastUpdated)}</span>
            </>
          ) : null}
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="Result"
          answer="Data not yet verified. The ranking's methodology, inputs, and weighting are published below; positions appear once the underlying dataset is ingested."
        />
      </div>

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-5 md:gap-8">
        <div className="md:col-span-3">
          <RankingMethodology ranking={ranking} />
        </div>
        <div className="md:col-span-2">
          <ConfidenceBreakdown level={ranking.confidence} />
        </div>
      </div>

      <EntitySection title="Known limitations">
        <DataLimitations
          limitations={ranking.limitations}
          heading="Known limitations"
        />
      </EntitySection>

      <EntitySection title="Source coverage">
        <SourceCoverage citations={ranking.sources} />
      </EntitySection>

      {indicators.length > 0 ? (
        <EntitySection
          title="Indicators feeding this ranking"
          description="Each indicator below contributes to the ranking. Click through for the indicator's full definition, unit, and methodology."
        >
          <ul className="divide-y divide-line border-y border-line">
            {indicators.map((i) => (
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
                  <p className="mt-2 text-xs text-ink-500">
                    Unit:{" "}
                    <span className="font-mono">{i.unit}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

      {related.length > 0 ? (
        <EntitySection title="Entities the ranking would feature">
          <RelatedEntities title="Referenced entities" items={related} />
        </EntitySection>
      ) : null}

      <EntitySection title="Sources">
        <SourceFootnote citations={ranking.sources} />
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-ranking-${ranking.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
