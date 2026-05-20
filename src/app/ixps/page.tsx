import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { EmptyIndexState } from "@/components/ui/EmptyIndexState";
import { IXPS } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";

const PAGE_PATH = "/ixps";
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Internet Exchange Points",
  description:
    "IXPs in the Radar knowledge graph. Identity records sourced from PeeringDB and operator pages; volatile traffic metrics are dated and confidence-scored.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function IxpsIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Internet Exchange Points",
      description: "Global index of internet exchange points.",
      path: PAGE_PATH,
      keywords: ["ixp", "internet exchange", "peering"],
    }),
    breadcrumbJsonLd([{ name: "IXPs", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-accent-600">
          Index · Internet Exchange Points
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-ink-900 md:text-5xl">
          The peering fabrics that move regional traffic.
        </h1>
        <p className="mt-5 max-w-prose text-ink-700 md:text-lg">
          IXPs are the physical interconnect points where networks exchange
          traffic directly. The largest IXPs carry traffic on the same order of
          magnitude as the largest national backbones.
        </p>
        <p className="mt-4 max-w-prose text-sm text-ink-9000">
          Index updated {LAST_UPDATED}. IXP identity records reference{" "}
          <Link
            href="/sources#peeringdb"
            className="text-accent-600 hover:text-accent-700"
          >
            PeeringDB
          </Link>
          .
        </p>
      </header>

      <section className="mt-10">
        {IXPS.length === 0 ? (
          <EmptyIndexState entity="IXP records" />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {IXPS.map((ixp) => (
              <li key={ixp.slug}>
                <Card
                  title={ixp.name}
                  description={ixp.summary}
                  href={`/ixps/${ixp.slug}`}
                  eyebrow={`${ixp.countryCode} · ${ixp.operator}`}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-ixps-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
