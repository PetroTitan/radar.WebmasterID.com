# Subsea intelligence — editorial guidelines

Radar's submarine-cable intelligence is **source-bound** and
**identity-only**. This document covers what is recorded, what is
deliberately out of scope, and how new cable systems are
admitted.

## Editorial posture

1. **Identity, not telemetry.** Records describe the cable
   system's identity (name, consortium, ready-for-service date,
   landing geography). Operating capacity, current utilisation,
   in-service status, and per-consortium-share changes are
   tracked elsewhere as dated observations — they are not stored
   on the identity record.
2. **No cable polylines.** The actual sea route (the polyline
   geometry) is intentionally not stored. Radar would mislead if
   it implied a level of routing precision the underlying sources
   don't publish. Landing-point endpoint pairs are the strategic
   geography.
3. **No invented capacity.** Design capacity is recorded only
   when the operating consortium has officially disclosed it.
   Operating capacity is never recorded on identity records.

## Approved subsea sources

| Source                            | Tier   | Notes                                       |
| --------------------------------- | ------ | ------------------------------------------- |
| TeleGeography Submarine Cable Map | tier-2 | Authoritative public registry.              |
| Consortium press releases         | tier-3 | Founding facts, design capacity disclosure. |
| FCC submarine cable landing licenses | tier-1 | US landings.                             |
| ITU cable-related recommendations | tier-1 | Standards, system identifiers.              |
| PeeringDB facility records        | tier-2 | Landing-station facility presence.          |

## When to seed a cable entity

Seed a `SubseaCable` record when:

- the cable's identity facts are corroborated across TeleGeography
  and at least one operator primary doc or FCC filing;
- the cable's landing points can be pinned to at least one
  Radar `City` entity, OR the cable's broader corridor is
  editorially relevant even without a fully resolved landing
  list;
- the consortium's identity is published and stable.

Do NOT seed when:

- the only available source is a trade-press article without
  corroboration;
- the cable is announced but not RFS (those belong in editorial
  prose, not the identity registry);
- the cable is owned by a non-public consortium with no
  disclosure.

## Required fields

- `slug` (kebab-case)
- `name` (canonical operator-published name)
- `owners` (declared in canonical order)
- one of `readyForServiceAt` (ISO date) or `readyForServiceYear`
  (`YYYY`), never both
- `landingCitySlugs` (resolves to seeded city entities; may be
  empty when landings sit outside the city registry)
- optional `corridor` editorial label
- optional `designCapacityTbps` only if the consortium has
  officially disclosed it
- `provenance` with at least one source citation

## What this is not

- **Not a cable-map visualisation.** The Radar visual layer
  surfaces editorial diagrams, not interactive maps. Cable
  geography lives at TeleGeography.
- **Not a capacity dashboard.** Operating capacity is not stored.
- **Not a consortium-share tracker.** Ownership shares change;
  the identity record stores the consortium as a list, not a
  share-weighted vector.
