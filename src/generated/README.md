# Generated ingestion output

This directory holds raw output from Radar's ingestion adapters
(see `../ingestion/`). Files here are **gitignored** and **never
imported by the public site**.

The contents of this directory are intentionally not committed.
Each file represents one ingestion run; an editor reviews the
rows, promotes them to the matching `../data/research/*.reviewed.ts`
file, and discards the generated file.

If you find yourself reading from `src/generated/` inside an
`app/` route file, that is a bug — public pages must only read
reviewed data.

## Why a directory at all?

Adapters need a stable filesystem location to write to. The
README and `.gitkeep` make the directory present in fresh
clones so `pnpm radar:ingest:*` runs do not fail on a missing
path.
