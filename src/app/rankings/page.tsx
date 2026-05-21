import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, datasetJsonLd } from "@/lib/seo";

const PAGE_PATH = "/rankings";
const LAST_UPDATED = "2026-05-21";

export const metadata: Metadata = buildPageMetadata({
  title: "Rankings",
  description:
    "Source-cited comparative rankings of internet infrastructure: cloud region density, peering depth, cable diversity, IPv6 adoption, and AI infrastructure readiness. Each ranking documents its inputs and weights; no fabricated numbers.",
  path: PAGE_PATH,
  lastUpdated: LAST_UPDATED,
});

interface RankingDef {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly dimension: string;
  readonly description: string;
  readonly inputs: ReadonlyArray<{ readonly source: string; readonly tier: string }>;
  readonly recomputeCadence: string;
  readonly status: string;
}

const RANKINGS: ReadonlyArray<RankingDef> = [
  {
    id: "cloud-region-density",
    title: "Cloud region density",
    category: "Geography · Cloud",
    dimension: "Countries by count of hyperscaler-announced cloud regions on national soil.",
    description:
      "Reads the three major hyperscaler region directories (AWS Global Infrastructure, Google Cloud Locations, Microsoft Azure Geographies), normalises announced regions onto a single schema, and counts per country. Sovereignty variants are counted separately from general-availability regions.",
    inputs: [
      { source: "AWS Global Infrastructure", tier: "tier-3" },
      { source: "Google Cloud Locations", tier: "tier-3" },
      { source: "Microsoft Azure Geographies", tier: "tier-3" },
    ],
    recomputeCadence: "Monthly",
    status: "Pending verified dataset.",
  },
  {
    id: "peering-depth",
    title: "Peering depth",
    category: "Interconnection",
    dimension: "Metros ranked by connected-network count at the largest local IXP.",
    description:
      "Reads PeeringDB's published IXP-membership data, identifies the largest IXP per metro, and ranks metros by that IXP's connected-network count. The ranking is membership-based, not traffic-based — traffic figures move too quickly to be ranked in a stable comparison.",
    inputs: [{ source: "PeeringDB", tier: "tier-2" }],
    recomputeCadence: "Weekly",
    status: "Pending verified dataset.",
  },
  {
    id: "submarine-cable-diversity",
    title: "Submarine cable diversity",
    category: "Resilience",
    dimension: "Countries by count of distinct in-service submarine cable landings.",
    description:
      "Reads TeleGeography's Submarine Cable Map, counts in-service landings per country, and reports the result alongside corridor concentration as a separate axis. Two countries with the same total landing count may have very different resilience profiles depending on cable corridor overlap.",
    inputs: [{ source: "TeleGeography Submarine Cable Map", tier: "tier-2" }],
    recomputeCadence: "Quarterly",
    status: "Pending verified dataset.",
  },
  {
    id: "ipv6-adoption",
    title: "IPv6 adoption",
    category: "Modernisation",
    dimension: "Country-level deployment share of IPv6 traffic.",
    description:
      "Reads Cloudflare Radar's published IPv6 share by country, cross-references RIPE NCC measurements where available, and reports the median value over a documented observation window. A country with high allocation but low deployment is recorded as such, not collapsed into a single number.",
    inputs: [
      { source: "Cloudflare Radar", tier: "tier-2" },
      { source: "RIPE NCC", tier: "tier-1" },
    ],
    recomputeCadence: "Monthly",
    status: "Pending verified dataset.",
  },
  {
    id: "ai-infrastructure-readiness",
    title: "AI infrastructure readiness",
    category: "AI · Composite",
    dimension: "Metros / countries by capacity to host large-scale AI workloads.",
    description:
      "Composite of three dimensions: regional cloud presence (hyperscaler AI-instance availability by region), power-and-cooling supply signals (publicly disclosed only), and cable / interconnection headroom (PeeringDB + TeleGeography). The composite weighting is part of the ranking's published documentation; no opaque scores.",
    inputs: [
      { source: "AWS Global Infrastructure", tier: "tier-3" },
      { source: "Google Cloud Locations", tier: "tier-3" },
      { source: "Microsoft Azure Geographies", tier: "tier-3" },
      { source: "PeeringDB", tier: "tier-2" },
      { source: "TeleGeography", tier: "tier-2" },
    ],
    recomputeCadence: "Quarterly",
    status: "Methodology in draft.",
  },
];

export default function RankingsPage() {
  const ld = [
    datasetJsonLd({
      name: "Radar — Rankings",
      description: "Comparative rankings of internet infrastructure.",
      path: PAGE_PATH,
      keywords: ["rankings", "cloud regions", "peering", "submarine cables", "IPv6", "AI infrastructure"],
    }),
    breadcrumbJsonLd([{ name: "Rankings", path: PAGE_PATH }]),
  ];

  return (
    <Container as="article">
      <header className="border-b border-line pb-12 md:pb-16">
        <p className="eyebrow text-accent-600">Rankings</p>
        <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
          Comparative views, source-cited.
        </h1>
        <p className="mt-7 max-w-prose text-lead text-ink-500">
          Radar does not publish a single overall &ldquo;infrastructure
          score&rdquo;. Operators care about different dimensions; we rank
          each dimension separately, document the inputs, and refuse to
          publish numbers we cannot back to a registered source.
        </p>
        <p className="mt-6 max-w-prose text-sm text-ink-500">
          Updated {LAST_UPDATED}. See{" "}
          <Link
            href="/methodology#scoring"
            className="text-accent-600 hover:text-accent-700"
          >
            scoring methodology
          </Link>{" "}
          for the editorial position, and{" "}
          <Link
            href="/sources"
            className="text-accent-600 hover:text-accent-700"
          >
            sources
          </Link>{" "}
          for the registered source list.
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <QuickAnswer
          label="Editorial posture"
          answer="Every Radar ranking lists its inputs, source tiers, and recompute cadence before any number is published. Where the underlying dataset has not yet been ingested, the ranking shows &quot;Data not yet verified.&quot; instead of fabricated values."
        />
      </div>

      <section className="mt-14 md:mt-20">
        <ol className="divide-y divide-line border-y border-line">
          {RANKINGS.map((ranking, i) => (
            <li
              key={ranking.id}
              id={ranking.id}
              className="scroll-mt-28 py-10 md:py-12"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-mono text-xs tabular-nums text-ink-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow text-ink-500">{ranking.category}</span>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[0.7rem] font-medium text-amber-600">
                  {ranking.status}
                </span>
              </div>
              <h2 className="mt-4 font-display text-display font-semibold text-ink-900">
                {ranking.title}
              </h2>
              <p className="mt-3 max-w-editorial text-[1.0625rem] leading-relaxed text-ink-700">
                {ranking.dimension}
              </p>
              <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                {ranking.description}
              </p>

              <dl className="mt-7 grid gap-x-6 gap-y-5 rounded-card border border-line bg-surface-subtle p-6 sm:grid-cols-3 md:p-7">
                <div>
                  <dt className="eyebrow text-ink-500">Result</dt>
                  <dd className="mt-2 italic text-ink-300">Data not yet verified.</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-500">Recompute cadence</dt>
                  <dd className="mt-2 font-medium text-ink-900">
                    {ranking.recomputeCadence}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-500">Source inputs</dt>
                  <dd className="mt-2">
                    <ul className="space-y-1.5 text-sm">
                      {ranking.inputs.map((input) => (
                        <li
                          key={input.source}
                          className="flex items-baseline gap-2 text-ink-700"
                        >
                          <span>{input.source}</span>
                          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-amber-600">
                            {input.tier}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 md:mt-20 max-w-prose">
        <h2 className="font-display text-h1 font-semibold text-ink-900">
          Why no headline number
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">
          Composite scores hide their assumptions. A &ldquo;best country
          for internet infrastructure&rdquo; figure that collapses cloud
          presence, peering depth, cable diversity, and modernisation
          into one number is an editorial choice masquerading as a
          measurement.
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
          Radar publishes each dimension on its own terms, with its own
          sources and its own cadence, and asks the reader to compose
          them as needed. The trade-offs that matter are not the same
          for a regulator, a hyperscaler architect, and a global content
          network.
        </p>
        <p className="mt-6 text-sm">
          <Link
            href="/methodology"
            className="text-accent-600 hover:text-accent-700"
          >
            Read the editorial methodology →
          </Link>
        </p>
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
