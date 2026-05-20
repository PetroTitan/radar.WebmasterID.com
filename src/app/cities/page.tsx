import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { EmptyIndexState } from "@/components/ui/EmptyIndexState";
import { CITIES } from "@/data";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";

const PAGE_PATH = "/cities";
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Cities",
  description:
    "Infrastructure hub metros in the Radar knowledge graph. The practical unit of internet infrastructure is the metro — Ashburn, Frankfurt, Singapore, São Paulo — not the country.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

export default function CitiesIndex() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Cities",
      description: "Metro-level index of internet infrastructure hubs.",
      path: PAGE_PATH,
      keywords: ["cities", "metros", "internet hubs", "colocation"],
    }),
    breadcrumbJsonLd([{ name: "Cities", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-graphite-800 pb-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-signal-orange-400">
          Index · Cities
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-graphite-50 md:text-5xl">
          Where the internet physically converges.
        </h1>
        <p className="mt-5 max-w-prose text-graphite-300 md:text-lg">
          The metro is the operational unit of internet infrastructure. Routing,
          peering, and cable landings cluster at the city level — and so does
          the Radar graph.
        </p>
        <p className="mt-4 max-w-prose text-sm text-graphite-500">
          Index updated {LAST_UPDATED}. See{" "}
          <Link href="/methodology" className="text-signal-blue-300 hover:text-signal-blue-200">
            methodology
          </Link>{" "}
          for verification criteria.
        </p>
      </header>

      <section className="mt-10">
        {CITIES.length === 0 ? (
          <EmptyIndexState entity="metro records" />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <li key={city.slug}>
                <Card
                  title={city.name}
                  description={city.summary}
                  href={`/cities/${city.slug}`}
                  eyebrow={`${city.countryCode}`}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-cities-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
