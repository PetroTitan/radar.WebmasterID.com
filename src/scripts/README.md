# Data pipeline scripts

Ingestion, verification, and refresh scripts live here. Each script
must:

1. read from a source listed in `src/source-registry/registry.ts`,
2. write to a typed entity in `src/data/`,
3. set `provenance.lastUpdated` to the run date,
4. attach at least one `SourceCitation` per published value.

The folder is empty until the first verified pipeline ships.
