# Production launch checklist

The steps below are the editorial pre-flight Radar runs before a
public-facing release. Everything is verifiable from the
repository — no internal dashboards.

## Build verification

- [ ] `pnpm typecheck` — clean
- [ ] `pnpm lint` — clean
- [ ] `pnpm validate` — passes; counts log matches expectations
- [ ] `pnpm radar:ingest:peeringdb:dry` — clean
- [ ] `pnpm radar:ingest:cloud-regions:dry` — clean
- [ ] `pnpm build` — succeeds; static-page count matches the
      previous build ± expected delta
- [ ] No `console.log` / `console.warn` from application code in
      the production output

## URL hygiene

- [ ] `SITE.url` resolves to `https://radar.webmasterid.com`
      (set via `NEXT_PUBLIC_SITE_URL` in production)
- [ ] No `localhost`, `127.0.0.1`, `vercel.app`, `vercel.sh`,
      `ngrok.io`, or `*.local` URLs in any reviewed-row sourceUrl,
      source-citation URL, or media `source.pageUrl`. The
      validator's `checkProductionUrl` guard runs these scans
      automatically.
- [ ] `og:url` and `<link rel="canonical">` on a sample of pages
      resolve to absolute production URLs.

## Indexation

- [ ] `/robots.txt` advertises `Sitemap: https://radar.webmasterid.com/sitemap.xml`
      and the host directive resolves to the production domain.
- [ ] `/sitemap.xml` covers every public route: country, city,
      cloud-provider, IXP, facility, guide, insight, dataset,
      indicator, ranking, history, infrastructure map, and visual
      pages, plus the static index pages.
- [ ] `/llms.txt` is reachable and lists every major surface
      (guides, insights, datasets, indicators, rankings, history,
      visuals, facilities, subsea cables, sources, methodology,
      governance documents).
- [ ] No public page sets `noindex` unintentionally. The default
      is `index, follow` from the root layout.

## Trust surfaces

- [ ] `/about`, `/methodology`, `/sources`, `/privacy`, and
      `/research/methodologies` all render with current
      `lastUpdated` dates.
- [ ] Footer surfaces editorial provenance, methodology link, and
      cookie-preferences link.
- [ ] `docs/` directory contains the seven editorial-discipline
      documents: `data-ingestion.md`, `media-governance.md`,
      `history-editorial-guidelines.md`,
      `subsea-intelligence-guidelines.md`,
      `datacenter-intelligence-guidelines.md`,
      `ai-infrastructure-guidelines.md`,
      `infrastructure-cartography-guidelines.md`.

## Privacy and analytics

- [ ] `WebmasterIDTracker` script is mounted in the root layout
      but does NOT load until `state.grants.analytics === true`.
- [ ] `CookieBanner` defaults to "necessary only"; analytics is
      explicit opt-in.
- [ ] The privacy page documents what is collected, what isn't,
      and how to withdraw consent.
- [ ] No advertising trackers, no fingerprinting libraries, no
      third-party cookies are loaded on any route.

## Security headers

- [ ] `next.config.mjs` sets HSTS, `X-Content-Type-Options`,
      `Referrer-Policy`, and `Permissions-Policy` on every route.
- [ ] `poweredByHeader` is disabled.
- [ ] No `X-Powered-By` header in the production response.

## Accessibility

- [ ] Skip link is the first focusable element on every page.
- [ ] All pages render a single `<h1>`.
- [ ] All inline SVG diagrams carry meaningful `aria-label`s and
      figure captions.
- [ ] All `data-radar-*` semantic markers are present on the
      AI-citable primitives (QuickAnswer, KeyTakeaways,
      StrategicImportance, CaveatBlock, AttributionPanel, etc.).
- [ ] Tab order is logical; focus rings are visible.

## Deployment

- [ ] `NEXT_PUBLIC_SITE_URL=https://radar.webmasterid.com` is set
      in the Vercel production environment.
- [ ] No development-only environment variables are referenced
      from production routes.
- [ ] DNS at `radar.webmasterid.com` points at the Vercel
      production deployment; `www.radar.webmasterid.com` redirects
      to the apex domain.
- [ ] HTTPS is enforced; HSTS rolls forward.

## Post-launch verification

- [ ] Crawl the production domain with a basic spider; confirm
      every route in `/sitemap.xml` returns 200.
- [ ] Submit the sitemap to Google Search Console and Bing
      Webmaster Tools.
- [ ] Spot-check JSON-LD validity with the structured-data
      testing tool on a sample of:
    - one country page
    - one city page
    - one IXP page
    - one facility page
    - one guide page
    - one dataset page
    - one history page
    - one map page
    - one visual page
- [ ] Confirm `/llms.txt` is picked up by AI crawlers via the
      User-Agent log.
