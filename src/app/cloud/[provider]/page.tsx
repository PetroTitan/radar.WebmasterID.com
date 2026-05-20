import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityHeader } from "@/components/ui/EntityHeader";
import { EntitySection } from "@/components/ui/EntitySection";
import { MetricTable } from "@/components/ui/MetricTable";
import { SourceFootnote } from "@/components/ui/SourceFootnote";
import { CLOUD_PROVIDERS, getCloudProvider } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/seo";

interface RouteParams {
  readonly params: Promise<{ readonly provider: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CLOUD_PROVIDERS.map((provider) => ({ provider: provider.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { provider: slug } = await params;
  const provider = getCloudProvider(slug);
  if (!provider) return {};
  return buildPageMetadata({
    title: provider.name,
    description: `${provider.name} — cloud platform profile: announced regions and their resolved geographic locations.`,
    path: `/cloud/${provider.slug}`,
    lastUpdated: provider.provenance.lastUpdated,
  });
}

export default async function CloudProviderPage({ params }: RouteParams) {
  const { provider: slug } = await params;
  const provider = getCloudProvider(slug);
  if (!provider) notFound();

  const ld = breadcrumbJsonLd([
    { name: "Cloud", path: "/cloud" },
    { name: provider.name, path: `/cloud/${provider.slug}` },
  ]);

  return (
    <Container as="article">
      <EntityHeader
        eyebrow={`Cloud · ${provider.tier}`}
        title={provider.name}
        summary={provider.summary}
        confidence={provider.provenance.confidence}
        lastUpdated={provider.provenance.lastUpdated}
      />

      <EntitySection
        title="Key metrics"
        description="Provider-level structural metrics drawn from the operator&apos;s own region directory."
      >
        <MetricTable
          rows={[
            { label: "Announced regions", value: null },
            { label: "Countries served", value: null },
            { label: "Sovereign regions", value: null },
            { label: "Edge / specialist regions", value: null },
          ]}
        />
      </EntitySection>

      <EntitySection title="Infrastructure role">
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
          {provider.summary}
        </p>
      </EntitySection>

      <EntitySection title="Sources">
        <SourceFootnote citations={provider.provenance.sources} />
      </EntitySection>

      <Script
        id={`ld-cloud-${provider.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
