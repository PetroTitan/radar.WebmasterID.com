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
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { VisualContentBlock } from "@/components/ui/VisualContentBlock";
import {
  INFRASTRUCTURE_MAPS,
  getInfrastructureMap,
} from "@/content/maps";
import { getMediaAsset } from "@/content/media";
import {
  getCountry,
  getCity,
  getIxp,
  getDatacenterFacility,
  getSubseaCable,
} from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return INFRASTRUCTURE_MAPS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const map = getInfrastructureMap(slug);
  if (!map) return {};
  return buildPageMetadata({
    title: map.title,
    description: map.dek,
    path: `/maps/${map.slug}`,
    lastUpdated: map.lastUpdated,
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
    if (kind === "facility") {
      const f = getDatacenterFacility(slug);
      return f
        ? [
            {
              href: `/facilities/${f.slug}`,
              label: f.name,
              note: f.countryCode,
            },
          ]
        : [];
    }
    return [];
  });
}

export default async function MapDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const map = getInfrastructureMap(slug);
  if (!map) notFound();

  const asset = getMediaAsset(map.mediaId);
  const related = resolveRefs(map.relatedEntityRefs ?? []);
  const cables = (map.relatedCableSlugs ?? [])
    .map((s) => getSubseaCable(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const breadcrumb = breadcrumbJsonLd([
    { name: "Maps", path: "/maps" },
    { name: map.title, path: `/maps/${map.slug}` },
  ]);
  const article = articleJsonLd({
    title: map.title,
    dek: map.dek,
    path: `/maps/${map.slug}`,
    publishedAt: map.lastUpdated,
    lastUpdated: map.lastUpdated,
  });
  const ldNodes = [breadcrumb, article];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Map · {map.category}</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {map.title}
        </h1>
        <p className="mt-7 max-w-editorial text-lead text-ink-500">{map.dek}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span>{map.geographicScope}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          <ConfidenceBadge level={map.confidence} />
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          <span>Last reviewed {map.lastUpdated}</span>
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer answer={map.summary} label="Summary" />
      </div>

      {asset ? (
        <section className="mt-12 md:mt-16">
          <VisualContentBlock asset={asset} />
        </section>
      ) : null}

      <EntitySection
        title="Methodology"
        description="What the map represents faithfully, and what it abstracts on purpose."
      >
        <div className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink-700">
          {map.methodology.map((m) => (
            <p key={m}>{m}</p>
          ))}
        </div>
      </EntitySection>

      <EntitySection
        title="Caveats and limitations"
        description="What this map deliberately does not assert."
      >
        <CaveatBlock caveats={map.caveats} heading="Caveats and limitations" />
      </EntitySection>

      {related.length > 0 ? (
        <EntitySection title="Entities depicted">
          <RelatedEntities title="Entities on the map" items={related} />
        </EntitySection>
      ) : null}

      {cables.length > 0 ? (
        <EntitySection title="Cable systems referenced">
          <ul className="divide-y divide-line border-y border-line">
            {cables.map((c) => (
              <li key={c.slug} className="py-4">
                <p className="font-medium text-ink-900">{c.name}</p>
                <p className="mt-1 text-xs text-ink-500">
                  {c.corridor ? `${c.corridor} · ` : ""}
                  {c.readyForServiceAt ?? c.readyForServiceYear ?? "RFS year not recorded"}
                </p>
              </li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

      {(map.relatedGuideSlugs && map.relatedGuideSlugs.length > 0) ||
      (map.relatedDatasetSlugs && map.relatedDatasetSlugs.length > 0) ||
      (map.relatedHistorySlugs && map.relatedHistorySlugs.length > 0) ? (
        <EntitySection
          title="Cross-references"
          description="Guides, datasets, and history pages that contextualise the map."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {map.relatedGuideSlugs && map.relatedGuideSlugs.length > 0 ? (
              <div>
                <p className="eyebrow text-ink-500">Guides</p>
                <ul className="mt-3 space-y-2">
                  {map.relatedGuideSlugs.map((g) => (
                    <li key={g}>
                      <Link
                        href={`/guides/${g}`}
                        className="text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                      >
                        {g}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {map.relatedDatasetSlugs && map.relatedDatasetSlugs.length > 0 ? (
              <div>
                <p className="eyebrow text-ink-500">Datasets</p>
                <ul className="mt-3 space-y-2">
                  {map.relatedDatasetSlugs.map((d) => (
                    <li key={d}>
                      <Link
                        href={`/research/datasets/${d}`}
                        className="text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                      >
                        {d}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {map.relatedHistorySlugs && map.relatedHistorySlugs.length > 0 ? (
              <div>
                <p className="eyebrow text-ink-500">History</p>
                <ul className="mt-3 space-y-2">
                  {map.relatedHistorySlugs.map((h) => (
                    <li key={h}>
                      <Link
                        href={`/history/${h}`}
                        className="text-ink-900 underline decoration-line-strong underline-offset-2 hover:text-accent-700"
                      >
                        {h}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </EntitySection>
      ) : null}

      {map.editorialNotes && map.editorialNotes.length > 0 ? (
        <EntitySection
          title="Editorial notes"
          description="Versioning intent and anticipated changes."
        >
          <ul className="max-w-prose space-y-2 text-[0.9375rem] leading-relaxed text-ink-500">
            {map.editorialNotes.map((n) => (
              <li key={n}>· {n}</li>
            ))}
          </ul>
        </EntitySection>
      ) : null}

      <EntitySection title="Sources">
        <SourceFootnote citations={map.sources} />
      </EntitySection>

      {ldNodes.map((node, i) => (
        <Script
          key={i}
          id={`ld-map-${map.slug}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
