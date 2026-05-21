import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { CaveatBlock } from "@/components/ui/CaveatBlock";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { RelatedResearch } from "@/components/ui/RelatedResearch";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { InfrastructureTimeline } from "@/components/ui/InfrastructureTimeline";
import { HISTORY_PAGES, getHistoryPage } from "@/content/history";
import { getCountry, getCity, getIxp, getSubseaCable } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDisplayDate } from "@/lib/dates";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return HISTORY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const page = getHistoryPage(slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.dek,
    path: `/history/${page.slug}`,
    lastUpdated: page.lastUpdated,
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

export default async function HistoryPage({ params }: RouteParams) {
  const { slug } = await params;
  const page = getHistoryPage(slug);
  if (!page) notFound();

  const related = resolveRefs(page.relatedEntityRefs ?? []);
  const cables = (page.relatedCableSlugs ?? [])
    .map((s) => getSubseaCable(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const breadcrumb = breadcrumbJsonLd([
    { name: "History", path: "/history" },
    { name: page.title, path: `/history/${page.slug}` },
  ]);
  const article = articleJsonLd({
    title: page.title,
    dek: page.dek,
    path: `/history/${page.slug}`,
    publishedAt: page.publishedAt,
    lastUpdated: page.lastUpdated,
  });
  const ldNodes = [breadcrumb, article];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">History · {page.period}</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {page.title}
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">{page.dek}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span>Published {formatDisplayDate(page.publishedAt)}</span>
          {page.lastUpdated !== page.publishedAt ? (
            <>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
              <span>Last reviewed {formatDisplayDate(page.lastUpdated)}</span>
            </>
          ) : null}
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          <ConfidenceBadge level={page.confidence} />
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer answer={page.quickAnswer} label="Quick answer" />
      </div>

      <EntitySection title="Historical context">
        <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
          {page.context.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </EntitySection>

      <EntitySection title="Why it mattered">
        <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
          {page.whyItMattered.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </EntitySection>

      <EntitySection title="Infrastructure evolution">
        <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
          {page.evolution.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </EntitySection>

      {page.geographicImportance && page.geographicImportance.length > 0 ? (
        <EntitySection title="Geographic importance">
          <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
            {page.geographicImportance.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </EntitySection>
      ) : null}

      {page.timeline.length > 0 ? (
        <EntitySection
          title="Timeline"
          description="Year-precision milestones with per-event source citations. Day-precision dates are intentionally not stored on historical events."
        >
          <InfrastructureTimeline events={page.timeline} heading="Milestones" />
        </EntitySection>
      ) : null}

      {related.length > 0 ? (
        <EntitySection title="Related entities">
          <RelatedEntities title="Entities the page references" items={related} />
        </EntitySection>
      ) : null}

      {cables.length > 0 ? (
        <EntitySection title="Cable systems referenced">
          <ul className="divide-y divide-line border-y border-line">
            {cables.map((c) => (
              <li key={c.slug} className="py-5">
                <p className="font-display text-h3 font-semibold text-ink-900">
                  {c.name}
                </p>
                {c.summary ? (
                  <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                    {c.summary}
                  </p>
                ) : null}
                <p className="mt-2 text-xs text-ink-500">
                  {c.corridor ? `${c.corridor} · ` : ""}
                  {c.readyForServiceAt ?? c.readyForServiceYear ?? "RFS year not recorded"}
                </p>
              </li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

      {(page.relatedDatasetSlugs && page.relatedDatasetSlugs.length > 0) ||
      (page.relatedGuideSlugs && page.relatedGuideSlugs.length > 0) ||
      (page.relatedMediaIds && page.relatedMediaIds.length > 0) ||
      (page.relatedMapPaths && page.relatedMapPaths.length > 0) ? (
        <EntitySection
          title="Related research"
          description="Guides and datasets that operationalise the page's claims, plus maps and visuals that support the geographic story."
        >
          <RelatedResearch
            datasetSlugs={page.relatedDatasetSlugs}
            rankingSlugs={[]}
            indicatorSlugs={[]}
            mapPaths={page.relatedMapPaths}
            mediaIds={page.relatedMediaIds}
          />
          {page.relatedGuideSlugs && page.relatedGuideSlugs.length > 0 ? (
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {page.relatedGuideSlugs.map((g) => (
                <li key={g} className="py-4">
                  <Link
                    href={`/guides/${g}`}
                    className="font-medium text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                  >
                    {g}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </EntitySection>
      ) : null}

      {page.methodologyNotes && page.methodologyNotes.length > 0 ? (
        <EntitySection
          title="Methodology notes"
          description="How Radar's editorial process treats the page's historical claims, and what falsifies them."
        >
          <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
            {page.methodologyNotes.map((m) => (
              <p key={m}>{m}</p>
            ))}
          </div>
        </EntitySection>
      ) : null}

      {page.caveats && page.caveats.length > 0 ? (
        <EntitySection title="Caveats and limitations">
          <CaveatBlock caveats={page.caveats} heading="Caveats and limitations" />
        </EntitySection>
      ) : null}

      <EntitySection title="Sources">
        <SourceFootnote citations={page.sources} />
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-history-${page.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
