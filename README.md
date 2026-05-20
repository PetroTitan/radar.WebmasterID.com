# Radar WebmasterID

Verified digital infrastructure intelligence.

Radar WebmasterID is a source-governed knowledge graph of the
internet's physical layer — cloud regions, Internet Exchange Points,
datacenters, subsea cables, and the institutions that operate them.
Every published fact traces back to a registered source. Where data
is absent or contested, the platform displays
`"Data not yet verified."` rather than a guess.

## Mission

Internet infrastructure is opaque by design. Operators publish what
commerce requires and little more, while the bulk of the system —
cables, exchanges, regional points of presence — operates outside
ordinary public visibility. Radar's mission is to build a verified,
citable record of that system, so operators, researchers, and
policymakers can reason about it on shared ground.

## Core principles

1. **Source-governed.** Every value cites a registered source from
   `src/source-registry/registry.ts`. No exceptions.
2. **Honest absence.** When data is unknown or contested, the page
   renders `"Data not yet verified."` The absence is itself a signal.
3. **Confidence on every value.** `high`, `medium`, `low`, or
   `unverified`. Trust-tier of the source is separate from
   confidence in the observation.
4. **No composite "infrastructure score".** Operators care about
   different dimensions; collapsing them into one number obscures
   the trade-offs that matter.
5. **SSR/SSG-first.** Pages are server-rendered, with minimal client
   JS. Crawlers, including AI agents, see the full content.
6. **Freshness as an SEO signal.** Every page emits
   `article:modified_time` so Google, Bing, Perplexity, and AI
   crawlers can detect updates without re-fetching the document.

## Architecture

```
.
├── src/
│   ├── app/              # Next.js App Router routes
│   ├── components/
│   │   ├── layout/       # SiteHeader, SiteFooter
│   │   └── ui/           # Container, EntityHeader, MetricTable, …
│   ├── entities/         # Typed entity schemas (Country, City, IXP, …)
│   ├── data/             # Verified entity records (empty by design)
│   ├── lib/              # metadata, SEO/JSON-LD, dates, confidence
│   ├── source-registry/  # 10 initial sources + trust-tier definitions
│   ├── content/          # Methodology prose + navigation
│   ├── reports/          # Long-form editorial registry (empty)
│   ├── maps/             # Cartography artefacts (empty)
│   ├── docs/             # Editorial governance log
│   ├── scripts/          # Ingestion / refresh pipelines (empty)
│   ├── types/            # Project-wide ambient types
│   └── config/           # Site identity
├── public/               # Static assets
├── styles/               # Non-Tailwind stylesheet partials (empty)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Routes

- `/` — homepage with hero, hubs, intelligence overview, rankings,
  reports, maps, source transparency, methodology, internal linking.
- `/countries`, `/countries/[slug]`
- `/cities`, `/cities/[slug]`
- `/cloud`, `/cloud/[provider]`
- `/ixps`, `/ixps/[slug]`
- `/rankings`
- `/methodology`
- `/sources`
- `/about`

Dynamic routes use `dynamicParams = false` plus
`generateStaticParams`. Until entity registries hold verified
entries, the dynamic routes return 404. The structural pages —
index routes, methodology, sources, about — render fully.

## Source governance

Sources are graded into five tiers:

| Tier        | Examples                                            |
| ----------- | --------------------------------------------------- |
| tier-1      | IANA, ICANN, RIPE NCC, ITU                          |
| tier-2      | PeeringDB, Cloudflare Radar, World Bank, OECD, …    |
| tier-3      | Vendor primary docs (cloud region pages, IXP pages) |
| tier-4      | Industry press; corroborator-only                   |
| unverified  | Pending review; never the sole basis for a value    |

Definitions live in `src/source-registry/trust-tiers.ts`. The
initial registry of ten sources lives in
`src/source-registry/registry.ts`. Trust-tier changes are recorded
in `src/docs/`.

## SEO architecture

- Metadata is built by `src/lib/metadata.ts#buildPageMetadata`,
  which emits a canonical URL, OG card, Twitter card, and
  `article:modified_time` in one shape across every page.
- `src/app/sitemap.ts` enumerates static routes plus every verified
  entity, each with its own `lastModified` from
  `provenance.lastUpdated`.
- `src/app/robots.ts` advertises the sitemap and disallows `/api/`.
- JSON-LD: an `Organization` node sits in the root layout; every
  entity / index page emits a `BreadcrumbList`; index pages emit a
  `Dataset` node.
- Headings follow a strict H1/H2/H3 hierarchy. Every entity page
  has exactly one H1.
- Internal linking is structural: countries link to their hub
  cities and IXPs; cities link back to country and to in-metro
  IXPs; IXPs link to city and country.

## Development setup

Requirements:

- Node.js 22+ (see `.nvmrc`)
- pnpm 9+ (the repo declares `packageManager`; with Corepack
  enabled, `pnpm` resolves automatically)

```bash
pnpm install
pnpm dev          # http://localhost:3100
pnpm typecheck
pnpm lint
pnpm build
```

The app currently has no environment dependencies beyond
`NEXT_PUBLIC_SITE_URL`, which defaults to
`https://radar.webmasterid.com`.

## Deployment

The app is Vercel-compatible out of the box. Standard Next.js 16
deployment; no `vercel.json` is required for the default
configuration. Configure `NEXT_PUBLIC_SITE_URL` in the project's
environment for non-default canonical hosts.

## Roadmap

1. **Phase 1 — Foundation (this commit)**: app scaffolding, entity
   schemas, source registry, methodology, all 13 routes rendering
   with honest empty states.
2. **Phase 2 — Seed entities**: verified records for Germany,
   Singapore, United States; Frankfurt, Ashburn, Singapore; DE-CIX
   Frankfurt. Each record cites at least one tier-1 or tier-2
   source.
3. **Phase 3 — Cloud regions**: provider region directory ingestion
   (AWS, Azure, GCP, Cloudflare). Pinned to country and metro from
   `src/data/cities.ts`.
4. **Phase 4 — Metric observations**: `InfrastructureMetric`
   records for peering depth and IPv6 adoption.
5. **Phase 5 — Cartography**: country, city, and cable layers wired
   into the homepage maps slot.
6. **Phase 6 — Rankings activate** as their inputs reach tier-1/2
   coverage thresholds.

## License

Apache-2.0. See `LICENSE`. Source attribution for the data behind
any visible value is part of the published surface, not the license;
see `/methodology` for the editorial position.
