# Datacenter intelligence — editorial guidelines

Radar's `/facilities` surface is an **ecosystem graph**, not a
capacity directory. This document covers what is recorded on a
facility identity record, what is deliberately out of scope, and
how new facilities are admitted.

## Editorial posture

1. **Identity, not capacity.** Records describe the operator,
   metro, country, carrier-neutrality assertion, and the
   ecosystem the facility sits inside (IXPs whose fabric extends
   into the building, cloud regions the metro serves as on-ramp
   for). Power envelopes, rack counts, occupancy, customer lists,
   and per-tenant contract details are NOT stored.
2. **Source-bound.** Every facility row carries at least one
   citation. PeeringDB facility records + the operator's own
   location page are the principal references; TeleGeography
   colocation reporting supplies metro context.
3. **No marketing copy.** Facility pages are analytical. The
   editorial summary explains the facility's role in the
   ecosystem; it does not promote the operator.
4. **No invented metrics.** Trade-press capacity claims for an
   entire cluster do not get pinned to a single building. Radar
   does not publish per-building megawatt counts unless the
   operator has officially disclosed them at a citable URL.

## When to seed a facility entity

Seed a `DatacenterFacility` record when:

- the facility's identity is corroborated across PeeringDB and
  the operator's own location pages;
- the parent metro is already seeded as a `City` entity;
- the facility has a non-trivial ecosystem role — at minimum, the
  building hosts an IXP node OR is a cloud-on-ramp facility OR
  anchors transatlantic backhaul.

Do NOT seed when:

- the only available source is operator marketing material;
- the parent metro is not yet in Radar's city registry;
- the facility's ecosystem role would require speculation
  (a building that "might" host a major IXP node, for example).

## Carrier-neutrality assertion

`carrierNeutral: true` is asserted only when:

- the operator's own location page describes the facility as
  carrier-neutral or open-access, OR
- PeeringDB records corroborate dense multi-network presence (a
  long tail of distinct AS networks listed at the facility).

Carrier-neutrality is **per-building**, not per-corporation. The
same operator can run neutral and non-neutral buildings in
different metros. The validator does not enforce a corporate
mapping.

## Cloud-region references

`cloudRegionRefs` uses the form `<provider-slug>:<region-slug>`,
where the provider slug is one of `aws`, `gcp`, or `azure`. The
reference documents the metro the facility serves as on-ramp for,
not exclusive on-ramp status. The validator enforces the format.

## Prohibited fields

The platform refuses to store:

- estimated rack counts
- estimated power usage (the optional `statedPowerMw` field
  captures the operator's official disclosure when published; it
  is never inferred)
- estimated customer counts
- estimated occupancy
- estimated network participants
- "largest / first / biggest" labels

The validator catches placeholder strings but does not catch
fabricated numeric values; the editor is responsible for the
discipline.

## Required fields

- `slug` (kebab-case)
- `name` (operator-published facility name)
- `operator` (operating organisation)
- `countryCode` (ISO 3166-1 alpha-2)
- `citySlug` (resolves to a seeded city; city's countryCode must
  match)
- `provenance` with at least one source citation

Optional but encouraged:

- `summary` (editorial overview, 2-3 sentences)
- `ecosystemRole` (one-line label)
- `relatedIxpSlugs` (resolves to seeded IXPs)
- `cloudRegionRefs` (uses the `<provider>:<region>` form)
- `editorialNotes` (free-text caveats / context)

## What this is not

- **Not a colocation marketplace.** Radar does not publish
  pricing, contracts, or partner-program details.
- **Not a capacity dashboard.** Operating capacity is not stored.
- **Not a "Top datacenter companies" list.** Operators are
  recorded per-facility; corporate-level rankings are out of
  scope.
- **Not a tenant directory.** Tenant lists are not stored.
