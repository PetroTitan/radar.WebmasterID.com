# SEO and indexation — guidelines

Radar's SEO posture is editorial first. The platform refuses to
chase keyword density, schema-spam, or growth hacks. This
document covers the indexation surface and the rules every public
page is held to.

## Editorial posture

1. **Crawlability over cleverness.** Every public route is
   server-rendered, statically prerendered, and reachable from
   the sitemap. No client-only routes, no hash-router fragments,
   no JavaScript-required navigation.
2. **One canonical per page.** `metadataBase` is set at the
   layout level; per-page `buildPageMetadata` emits absolute
   canonical URLs through the same builder.
3. **Source-bound structured data.** JSON-LD on every page (
   `BreadcrumbList`, `TechArticle` / `Dataset` / `Organization`
   / `Country` / `City` / `Organization` for IXPs / etc.) reads
   from the same editorial fields the body uses — no separate
   "SEO data" surface that could drift.
4. **No engineered URLs.** Slugs are editorially chosen, stable,
   and kebab-case. The validator enforces ref-format uniformity
   across every cross-reference.

## Page rules

Every public page must:

- Render a single `<h1>` (the page title).
- Emit a unique `<title>` and `<meta name="description">` via
  `buildPageMetadata` — never inline strings.
- Surface a canonical URL via `alternates.canonical` in the
  metadata.
- Include at least one piece of JSON-LD: `BreadcrumbList` is the
  minimum; content pages additionally emit
  `TechArticle` / `Dataset` / domain-appropriate types.
- Carry an `lastUpdated` / `lastModified` ISO date that surfaces
  into the sitemap.

## Sitemap

`src/app/sitemap.ts` is the single source of truth. It builds
entries from every content registry plus a small static-path list
for index routes (e.g. `/maps`, `/research`, `/visuals`).

Adding a new content surface requires updating both the registry
file and the corresponding `sitemap.ts` block — the validator
does not currently enforce sitemap coverage, so this is
discipline.

## Robots

`/robots.txt` allows everything under `/` and disallows `/api/`.
The sitemap URL is advertised; the host directive resolves to
the production domain.

There are no per-page robots overrides. Any future `noindex`
exception must be documented in the relevant page's editorial
note.

## llms.txt

`/llms.txt` is a Markdown-ish digest for AI agents. It is the
human-readable index for crawlers that prefer not to follow the
sitemap. Every major surface appears as a sectioned list with
absolute URLs, dek strings, and category metadata.

The route builds from the same registries as the sitemap, so the
two surfaces stay in sync.

## Per-section discipline

- **Countries / Cities / IXPs / Facilities / Cloud providers** —
  each entity carries its own `provenance.lastUpdated`. The
  sitemap reads it directly.
- **Guides / Insights / Datasets / Indicators / Rankings /
  History / Maps** — each content record carries `lastUpdated`.
  The sitemap reads it directly.
- **Visuals (media assets)** — each asset carries `lastVerified`.
  Verified assets are weighted higher in priority than candidate
  or unverified placeholders.

## Production-URL discipline

The validator's `checkProductionUrl` guard scans every cited URL
across the registries (source citations, reviewed-row source
URLs, media-asset source URLs, license URLs). Forbidden
patterns: `localhost`, `127.0.0.1`, `vercel.app`, `vercel.sh`,
`ngrok.io`, `*.local`.

The only intentional exception is the WebmasterID analytics
ingest endpoint (`webmasterid-ingest-api.vercel.app`), which is
embedded inside the analytics component, not in a registry.

## Open Graph / social

Every page emits `og:title`, `og:description`, and `og:url` via
the root layout's `openGraph` defaults, with per-page overrides
from `buildPageMetadata`. The site default uses the
organization's brand image; future per-page OG images should be
self-authored under `/opengraph-image` routes.

## Internal linking

- Entity pages cross-link to related guides, datasets, and
  history pages.
- Guides cross-link to datasets, indicators, rankings, maps, and
  media.
- Maps cross-link to entities, guides, datasets, cables, history.
- Visuals cross-link to related entities and (where applicable)
  guides and history pages.
- History pages cross-link to guides, datasets, cables, maps, and
  media.

Dead-end pages and orphan routes are caught by the editorial
review pass, not the validator. The internal-linking graph is
also surfaced through `/sources`, `/visuals`, and `/maps` index
pages.

## What this is not

- **Not a keyword tracker.** No keyword-density logic, no
  thin-content factories.
- **Not a content farm.** Every page traces back to a source
  registry entry.
- **Not a schema-spam engine.** JSON-LD types are limited to the
  ones actually appropriate for the page's content.
