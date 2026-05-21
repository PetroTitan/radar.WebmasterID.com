# Radar ingestion

Source adapters that read structured data from registered sources,
normalise it into Radar's row-level types, and write to
`src/generated/<adapter>-<date>.json` for editorial review.

**Public pages never read from `src/generated/`.** They read only
from `src/data/research/*.reviewed.ts` — files that an editor has
hand-promoted from the generated output after spot-checking.

## Adapters

- `peeringdb/` — PeeringDB IXP and facility records.
- `cloud-regions/` — AWS / Google Cloud / Microsoft Azure region
  directories.

## Lifecycle

1. **Dry-run.** The adapter prints what it would fetch (endpoints,
   normalisation mapping, expected row count) without making any
   network call.

   ```
   pnpm radar:ingest:peeringdb:dry
   pnpm radar:ingest:cloud-regions:dry
   ```

2. **Real run.** The adapter fetches from the source, normalises,
   and writes the result to `src/generated/<adapter>-<iso>.json`.

   *Phase 13 wires the adapter machinery; the real-run path is
   deliberately a developer-machine action, not an automated
   build step.*

3. **Editorial review.** An editor opens the generated JSON,
   spot-checks rows against the source URLs they carry, and
   promotes rows by appending them to the matching
   `src/data/research/*.reviewed.ts` file.

4. **Validation.** `pnpm validate` runs the platform-wide
   integrity checks, which now include row-level rules
   (sourceId resolution, URL validity, ISO dates, entity-ref
   resolution, no placeholder values).

5. **Commit.** Only `.reviewed.ts` changes are committed. The
   generated JSON stays gitignored.

## What this is *not*

- Not a runtime data fetcher. Public pages never make outbound
  requests to PeeringDB, AWS, or anywhere else.
- Not a live telemetry stream. Volatile values (peering peaks,
  current member counts) belong on dated `InfrastructureMetric`
  observations elsewhere.
- Not an auth-gated dashboard. There is no UI for ingestion;
  it is a Node script run from a developer machine.

## Adding a new source adapter

1. Add the source to `src/source-registry/registry.ts` with its
   trust tier, license note, and last-checked date.
2. Add a new directory under `src/ingestion/<slug>/` with
   `types.ts`, `adapter.ts`, and `dry-run.ts`.
3. Add a `radar:ingest:<slug>:dry` script in `package.json`.
4. Add a matching `src/data/research/<slug>.reviewed.ts` file,
   initially exporting an empty array.
5. Extend the validator if the new row type needs additional
   integrity rules.
