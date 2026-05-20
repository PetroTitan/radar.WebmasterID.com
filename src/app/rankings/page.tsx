import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";

const PAGE_PATH = "/rankings";
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = buildPageMetadata({
  title: "Rankings",
  description:
    "Source-cited comparative rankings of internet infrastructure: cloud region density, peering depth, cable diversity, and AI infrastructure readiness. Each ranking documents its inputs and weights.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

const RANKINGS = [
  {
    title: "Cloud region density",
    description:
      "Countries by count of hyperscaler-announced cloud regions. Inputs: provider region directories (tier-3). Recomputed monthly.",
    eyebrow: "Geography · pending data ingestion",
  },
  {
    title: "Peering depth",
    description:
      "Metros ranked by connected-networks count at the largest local IXP. Inputs: PeeringDB (tier-2). Recomputed weekly.",
    eyebrow: "Interconnection · pending data ingestion",
  },
  {
    title: "Submarine cable diversity",
    description:
      "Countries by count of distinct in-service cable landings. Inputs: TeleGeography (tier-2). Recomputed quarterly.",
    eyebrow: "Resilience · pending data ingestion",
  },
  {
    title: "IPv6 adoption",
    description:
      "Country-level deployment share for IPv6 traffic. Inputs: Cloudflare Radar, RIPE NCC measurements. Recomputed monthly.",
    eyebrow: "Modernisation · pending data ingestion",
  },
  {
    title: "AI infrastructure readiness",
    description:
      "Composite of regional cloud presence, power availability disclosures, and cable headroom. Methodology in draft.",
    eyebrow: "AI · methodology drafting",
  },
] as const;

export default function RankingsPage() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Rankings",
      description: "Comparative rankings of internet infrastructure.",
      path: PAGE_PATH,
      keywords: ["rankings", "cloud regions", "peering", "submarine cables"],
    }),
    breadcrumbJsonLd([{ name: "Rankings", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-graphite-800 pb-10">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-signal-orange-400">
          Rankings
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-graphite-50 md:text-5xl">
          Comparative views, source-cited.
        </h1>
        <p className="mt-5 max-w-prose text-graphite-300 md:text-lg">
          Radar does not publish a single overall &ldquo;infrastructure score&rdquo;. Operators
          care about different dimensions; we rank each dimension separately and
          document the inputs.
        </p>
        <p className="mt-4 max-w-prose text-sm text-graphite-500">
          Updated {LAST_UPDATED}. See{" "}
          <Link href="/methodology#scoring" className="text-signal-blue-300 hover:text-signal-blue-200">
            scoring methodology
          </Link>{" "}
          for the editorial position.
        </p>
      </header>

      <section className="mt-10">
        <ul className="grid gap-4 md:grid-cols-2">
          {RANKINGS.map((ranking) => (
            <li key={ranking.title}>
              <Card
                title={ranking.title}
                description={ranking.description}
                eyebrow={ranking.eyebrow}
              />
            </li>
          ))}
        </ul>
      </section>

      {ld.map((node, i) => (
        <Script
          key={i}
          id={`ld-rankings-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </Container>
  );
}
