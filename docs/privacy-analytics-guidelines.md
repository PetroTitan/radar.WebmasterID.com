# Privacy and analytics — guidelines

Radar's analytics posture is **minimal, consent-gated, and
single-vendor**. This document explains what is collected, what
isn't, and how the consent flow works.

## Editorial posture

1. **One analytics service.** Radar uses the WebmasterID
   analytics tracker — the same organisation that publishes
   Radar. No Google Analytics, no Segment, no Mixpanel, no
   Hotjar, no PostHog. The single-vendor choice keeps the data
   surface auditable.
2. **Explicit opt-in.** The analytics script does not load until
   the user has explicitly accepted analytics. The default
   posture is "necessary only" — no banner-dismiss inference,
   no implied consent from continued navigation.
3. **No advertising.** No ad networks, no retargeting pixels,
   no fingerprinting libraries.
4. **No third-party cookies.** Cookies are restricted to the
   consent-decision storage itself, plus whatever the analytics
   tracker stores when (and only when) consent has been granted.

## Architecture

Two SSR-safe React components carry the analytics layer:

- `ConsentProvider` (client component) — wraps the app, stores
  the consent decision in `localStorage`, and exposes a
  `useConsent` hook for the banner and tracker.
- `WebmasterIDTracker` (client component) — reads
  `useConsent()` and renders a `<Script
  strategy="afterInteractive">` only when
  `state.decided && state.grants.analytics === true`. Until then,
  no `<script>` element is emitted, no network request leaves
  the browser, and no identifier is stored.

The cookie banner (`CookieBanner`) is shown only when
`state.decided === false`. It offers two equally-prominent
choices ("Accept analytics" and "Continue with necessary only");
neither is styled to dominate the other.

A separate `CookiePreferencesLink` lives in the footer so users
can re-open the banner at any time.

## What the analytics tracker collects (when consented)

Per the WebmasterID tracker's published documentation:

- Page-view events with anonymised identifiers.
- Referrer, viewport, and user-agent class.
- No raw IP. No e-mail, no name, no third-party identifiers.
- No cross-site identifiers.

The ingest endpoint is
`https://webmasterid-ingest-api.vercel.app/api/events` — a
single first-party endpoint owned by the same organisation.

## What is NEVER collected

- Mouse-movement / scroll-heat / session-replay data
- Fingerprinting signals beyond what the tracker's public docs
  list
- Form-input contents
- Authentication state (the platform has no auth surface)
- Cross-site tracking identifiers

## Banner UX rules

- Two equally-prominent buttons; no dark patterns.
- The "Necessary only" button is the visual default; the "Accept
  analytics" button is equally accessible but not the default
  action.
- No giant modal that blocks the whole screen — the banner is a
  bottom-edge sticky element with a clear close affordance.
- All controls are reachable by keyboard; focus rings are
  visible.
- A link to `/privacy` is present in the banner body.

## Withdrawing consent

The footer's `Cookie preferences` link re-opens the banner. A
user can change their decision at any time; the choice is
persisted to `localStorage` and applied immediately — the
tracker script unmounts on the next render when consent is
withdrawn.

## Production hardening

- `WebmasterIDTracker` uses `next/script` `strategy="afterInteractive"`
  so it never blocks the initial render.
- The tracker carries a single hard-coded site ID and endpoint;
  it does not read from environment variables at runtime, so
  there is no risk of preview-deployment leakage of analytics
  state into production.
- The endpoint is currently hosted at `vercel.app`; the validator's
  production-URL guard excludes this specific endpoint because it
  lives inside the analytics component, not a registry record.

## What this is not

- **Not a marketing analytics stack.** No conversion funnels,
  no growth dashboards.
- **Not a behaviour-tracking pipeline.** No session replay, no
  click maps, no heat maps.
- **Not a profile builder.** The platform does not build
  per-visitor profiles.

## Reviewing the policy

`/privacy` is the canonical statement. This document is the
implementation contract that backs it.
