import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntitySection } from "@/components/ui/EntitySection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { VisualContentBlock } from "@/components/ui/VisualContentBlock";
import { ImageCredit } from "@/components/ui/ImageCredit";
import { RelatedEntities } from "@/components/ui/RelatedEntities";
import { MEDIA_ASSETS, getMediaAsset } from "@/content/media";
import { getCountry, getCity, getIxp } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

interface RouteParams {
  readonly params: Promise<{ readonly slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return MEDIA_ASSETS.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const asset = getMediaAsset(slug);
  if (!asset) return {};
  return buildPageMetadata({
    title: asset.title,
    description:
      asset.caption ??
      `${asset.title} — ${asset.type}, source: ${asset.source?.name ?? "not yet verified"}, license: ${asset.license?.name ?? "not yet recorded"}.`,
    path: `/visuals/${asset.id}`,
    lastUpdated: asset.lastVerified,
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

export default async function VisualPage({ params }: RouteParams) {
  const { slug } = await params;
  const asset = getMediaAsset(slug);
  if (!asset) notFound();

  const related = resolveRefs(asset.relatedEntityRefs ?? []);

  const ld = breadcrumbJsonLd([
    { name: "Visuals", path: "/visuals" },
    { name: asset.title, path: `/visuals/${asset.id}` },
  ]);

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Visual · {asset.type}</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          {asset.title}
        </h1>
        {asset.caption ? (
          <p className="mt-7 max-w-editorial text-lead text-ink-500">
            {asset.caption}
          </p>
        ) : null}
        <p className="mt-6 text-sm text-ink-500">
          Last verified {asset.lastVerified}.
        </p>
      </header>

      {asset.status === "unverified" ? (
        <div className="mt-12 md:mt-16">
          <QuickAnswer
            label="Status"
            answer="Visual asset not yet verified. The registry record below documents the candidate source and any risk notes; the asset is not rendered on Radar pages until editorial licensing review confirms reuse rights."
          />
        </div>
      ) : null}

      <section className="mt-12 md:mt-16">
        <VisualContentBlock asset={asset} />
      </section>

      <EntitySection title="Credit and licensing">
        <ImageCredit asset={asset} />
      </EntitySection>

      {related.length > 0 ? (
        <EntitySection title="Related entities">
          <RelatedEntities title="Entities the asset depicts" items={related} />
        </EntitySection>
      ) : null}

      <Script
        id={`ld-visual-${asset.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
