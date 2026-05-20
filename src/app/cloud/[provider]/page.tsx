import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { EntityHeader } from "@/components/ui/EntityHeader";
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

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-ink-900">Key metrics</h2>
        <p className="mt-2 max-w-prose text-sm text-ink-500">
          Provider-level structural metrics drawn from the operator&apos;s own
          region directory.
        </p>
        <div className="mt-6">
          <MetricTable
            rows={[
              { label: "Announced regions", value: null },
              { label: "Countries served", value: null },
              { label: "Sovereign regions", value: null },
              { label: "Edge / specialist regions", value: null },
            ]}
          />
        </div>
      </section>

      <section className="mt-12 max-w-prose">
        <h2 className="text-xl font-semibold text-ink-900">
          Infrastructure role
        </h2>
        <p className="mt-3 text-ink-700">{provider.summary}</p>
      </section>

      <section className="mt-12 max-w-prose">
        <h2 className="text-xl font-semibold text-ink-900">Sources</h2>
        <div className="mt-4">
          <SourceFootnote citations={provider.provenance.sources} />
        </div>
      </section>

      <Script
        id={`ld-cloud-${provider.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </Container>
  );
}
