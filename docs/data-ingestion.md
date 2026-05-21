# Data ingestion

Radar's data layer is **source-bound** and **manually reviewed**.
This document explains the rules, the lifecycle, and how to add a
new source adapter.

## Philosophy

Three properties define the layer:

1. **No fake data.** Every row that appears on a public page
   traces back to a registered source. If a value cannot be
   sourced, the platform renders `"Data not yet verified."`
   rather than a guess.
2. **No silent automation.** Ingestion does not run inside the
   public bundle. There is no scheduled job that promotes rows
   from raw output to published surface. Editorial review is a
   manual gate.
3. **No live telemetry.** Volatile values (peering peaks, current
   member counts, live cable capacity) belong on dated
   `InfrastructureMetric` observations elsewhere — not on
   identity records.

## Source governance

Sources are graded in `src/source-registry/registry.ts`:

| Tier        | Examples                                            |
| ----------- | --------------------------------------------------- |
| tier-1      | IANA, ICANN, RIPE NCC, ITU                          |
| tier-2      | PeeringDB, Cloudflare Radar, TeleGeography, GeoNames|
| tier-3      | Vendor primary docs (cloud-region pages, IXP pages) |
| tier-4      | Industry press; corroborator-only                   |
| unverified  | Pending review; never the sole basis for a value    |

Every row a public page renders must cite a `sourceId` that
resolves to an entry in the registry. The validator enforces this.

## The lifecycle

```
01  Registered source     PeeringDB, AWS/GCP/Azure regions, ...
       │
       ▼
02  Adapter               src/ingestion/<slug>/adapter.ts
       │  (developer machine)
       ▼
03  Generated rows        src/generated/<slug>-<date>.json (gitignored)
       │
       ▼
04  Editorial review      Human reads rows, spot-checks source URLs,
       │                  promotes rows by appending to *.reviewed.ts
       ▼
05  Reviewed dataset      src/data/research/*.reviewed.ts (committed)
       │
       ▼
06  Public page           /research/datasets/<slug> renders rows
```

Public pages read only from stage 05. Stages 01–03 never appear
in the production bundle.

## Dry-run vs real-run

Adapters ship with a dry-run entry point that prints the source
endpoints they would call, the normalised record shape, and the
editorial constraints — without making any network call.

```bash
pnpm radar:ingest:peeringdb:dry
pnpm radar:ingest:cloud-regions:dry
```

The real-run path (no `--dry-run`) is intentionally not wired in
Phase 13. When wired, it will:

- Fetch from the source endpoint with an authenticated request.
- Normalise rows via the adapter's `normalize*()` functions.
- Write to `src/generated/<slug>-<iso>.json`.
- Print a per-row summary so the editor can decide which rows to
  promote.

## Reviewed-data files

Each dataset has a matching reviewed-rows file:

```
src/data/research/cloud-regions.reviewed.ts
src/data/research/peeringdb-ixps.reviewed.ts
src/data/research/facilities.reviewed.ts
```

Rows in these files use the `buildCloudRegionRow()` /
`withProvenance()` helpers so the provenance fields are attached
uniformly. The validator runs the same integrity rules across
every reviewed file:

- `sourceId` resolves in the source registry.
- `sourceUrl` is a valid http(s) URL.
- `observedAt` and `lastVerified` are ISO dates.
- `confidence` is one of `high | medium | low | unverified`.
- `relatedEntityRefs` (when present) resolve to existing entities.
- No string field equals the literal `"unknown"`.
- Row IDs are unique within their record type.

## Why rankings do not publish unverified scores

Reviewed datasets feed indicators; indicators feed rankings. Until
a ranking's underlying indicators have *enough* reviewed rows to
support comparable values across the entities being ranked, the
ranking's per-position cells render `"Data not yet verified."`

This is an editorial choice. A ranking computed from partial data
is more misleading than no ranking at all — the absence of
positions is itself a signal.

## How to add a new source adapter

1. Add the source to `src/source-registry/registry.ts` with its
   trust tier, license note, and last-checked date.
2. Create `src/ingestion/<slug>/` with `adapter.ts` and
   `dry-run.ts`.
   - `adapter.ts` documents the endpoint(s) and exports
     `normalize*()` functions that return rows of the shape
     declared in `src/entities/dataset-row.ts`.
   - `dry-run.ts` is the entry point for the `*-dry` script. It
     uses `printDryRunReport()` from `src/ingestion/shared/dry-run.ts`.
3. Add a script in `package.json`:

   ```json
   "radar:ingest:<slug>:dry": "tsx src/ingestion/<slug>/dry-run.ts"
   ```

4. Add a matching `src/data/research/<slug>.reviewed.ts`
   exporting an initially-empty `ReadonlyArray<...>` of the row
   type.
5. Wire the slug to the public dataset page in
   `src/app/research/datasets/[slug]/page.tsx`'s `reviewedRows`
   lookup.
6. Extend the validator if the new row type has additional
   integrity rules.

## How to promote generated records to reviewed records

1. Run the real-run adapter on a developer machine to write
   `src/generated/<slug>-<iso>.json`.
2. Open the generated JSON. Pick a small batch of rows to
   promote.
3. For each row:
   - Open the row's `sourceUrl` in a browser. Confirm the value
     is published as recorded.
   - Decide a confidence level: `high` for direct identity facts
     from tier-1/2 sources, `medium` for tier-3 vendor docs,
     `low` for ambiguous cases.
   - Append the row to the matching `*.reviewed.ts` file, using
     `buildCloudRegionRow()` (for cloud regions) or
     `withProvenance()` (for other row types).
4. Run `pnpm validate`. Fix any failures.
5. Run `pnpm build` to confirm the dataset page renders.
6. Commit. The committed change should never include the raw
   generated JSON.

## What this is not

- **Not a runtime fetcher.** Public pages never request external
  data.
- **Not an auto-pipeline.** No CI job promotes rows.
- **Not a dashboard.** There is no UI for ingestion.
- **Not Supabase / Postgres.** Reviewed data is TypeScript modules
  on disk. The platform can move to a database when row counts
  grow past the editorial bandwidth of a single editor; for now,
  TypeScript modules give us schema validation for free.
