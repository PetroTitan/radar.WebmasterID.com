# History — editorial guidelines

Radar's `/history` surface is an **analytical** record of how
specific pieces of internet infrastructure came to be, not a
narrative archive. This document covers what belongs there, how
it is sourced, and what is deliberately out of scope.

## Editorial posture

Four properties define the layer:

1. **Source-bound.** Every historical claim cites a primary
   source or a tier-1 / tier-2 secondary source. The validator
   enforces source coverage on every page.
2. **Year-precision.** Historical events are dated to year or
   year-month (`YYYY` or `YYYY-MM`). Day-precision is
   intentionally not supported on historical events to avoid
   spurious specificity that the underlying sources don't carry.
3. **No "first / largest / biggest" without source.** The platform
   refuses to publish ranking labels the underlying sources don't
   consistently support. The validator does not enforce this
   directly; the editor is responsible.
4. **No speculation.** No geopolitical theory-spinning. No
   counterfactual narration. No nostalgic prose. History pages
   explain *what happened* and *what it implies for the present
   footprint*; speculation belongs in `Insight`, if anywhere.

## When to add a history page

Add a `/history/<slug>` page when:

- the subject is documented in primary or tier-2 secondary
  sources at sufficient depth for at least a year-precision
  timeline of five events;
- the subject is structurally connected to current Radar
  infrastructure entities (countries, cities, IXPs, cable
  systems);
- a reader's understanding of the present footprint genuinely
  improves with the historical context.

Do NOT add a page when:

- the only available sources are blog posts, social media, or
  unsourced industry folklore;
- the subject is a specific personality rather than an
  infrastructure event;
- the subject is a single-vendor product launch (those belong on
  the operator's primary doc, not on Radar);
- the page would consist mostly of speculation about what *could
  have* happened.

## Required structure

Every page must include, in order:

1. Quick answer (single paragraph)
2. Historical context
3. Why it mattered
4. Infrastructure evolution
5. Geographic importance (optional but recommended)
6. Timeline (year-precision, at least one event)
7. Related entities / datasets / guides / cables / media / maps
8. Methodology notes
9. Caveats
10. Source coverage

The validator enforces non-empty `quickAnswer`, `context`,
`whyItMattered`, `evolution`, and `timeline`.

## Approved historical sources

| Source                            | Tier   | Notes                                  |
| --------------------------------- | ------ | -------------------------------------- |
| NSF historical material           | tier-1 | NSFNET and early commercial NAP era.   |
| FCC merger / license filings      | tier-1 | Ownership transitions, cable landings. |
| IEEE / RFC archives               | tier-1 | Standards-development history.         |
| Internet Hall of Fame             | tier-2 | Biographical / infrastructural.        |
| TeleGeography historical reporting| tier-2 | Cable / carrier / interconnection eras.|
| Operator primary docs             | tier-3 | Founding dates, location histories.    |

## Prohibited sources

- Wikipedia summaries used as the primary source for a claim
  (Wikipedia citations are useful as discovery, not as the
  primary authority).
- Unsourced industry blog posts and social media reshares.
- Operator marketing material claiming "first / largest"
  without independent corroboration.
- AI-generated content of any kind.

## Timeline rules

- Date precision: `YYYY` (preferred) or `YYYY-MM`. Day-precision
  is not supported.
- Each event carries its own source citation when the parent
  page's source list does not already cover the specific claim.
- `confidence` is recorded on events where the date or claim is
  contested across secondary sources.
- `caveats` is used to record points where the editor consciously
  preserved a year-precision date despite the existence of
  sometimes-more-specific operator material that is not
  consistently corroborated.

## What this is not

- **Not a content management system.** Pages are TypeScript
  modules under `src/content/history/`; the validator runs at
  build time.
- **Not a research dashboard.** History pages support the
  research layer; they do not generate datasets or indicators.
- **Not a publication schedule.** Pages ship only when their
  source coverage meets the standard above.
