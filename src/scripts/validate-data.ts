/**
 * Data integrity validator.
 *
 * Runs as `pnpm validate` (and as a `prebuild` hook). Fails the
 * build if any of the editorial rules are violated:
 *
 *   1. every entity carries a `provenance` record with a valid
 *      ISO date and at least one source citation,
 *   2. every cited `sourceId` exists in the SourceRegistry,
 *   3. every related-entity slug resolves to a real entity,
 *   4. no required field is empty,
 *   5. no entity record literally contains the canonical
 *      "Data not yet verified." placeholder — that string is
 *      reserved for the EmptyMetric component, never embedded
 *      in data.
 *
 * Run via `pnpm validate` (which uses tsx). Relative imports are
 * used deliberately so the script can run outside the Next.js
 * bundler without a paths-resolver plugin.
 */

import {
  COUNTRIES,
  CITIES,
  IXPS,
  CLOUD_PROVIDERS,
  getCity,
  getCountry,
  getCountryByCode,
  getIxp,
} from "../data";
import { getSourceRecord } from "../source-registry";
import { INSIGHTS } from "../content/insights";
import { GUIDES } from "../content/guides";
import { DATASETS } from "../content/datasets";
import { INDICATORS } from "../content/indicators";
import { RANKINGS } from "../content/rankings";
import { MEDIA_ASSETS } from "../content/media";
import {
  REVIEWED_CLOUD_REGIONS,
  REVIEWED_PEERINGDB_IXPS,
  REVIEWED_PEERINGDB_FACILITIES,
} from "../data/research";
import { isValidIsoDate } from "../lib/dates";
import type {
  EditorialBlock,
  IngestedRecord,
  Provenance,
  SourceCitation,
} from "../entities";

const UNVERIFIED_PLACEHOLDER = "Data not yet verified.";

interface Failure {
  readonly scope: string;
  readonly id: string;
  readonly message: string;
}

const failures: Failure[] = [];

function fail(scope: string, id: string, message: string) {
  failures.push({ scope, id, message });
}

function validateProvenance(scope: string, id: string, p: Provenance) {
  if (!isValidIsoDate(p.lastUpdated)) {
    fail(scope, id, `invalid lastUpdated date: ${p.lastUpdated}`);
  }
  if (p.sources.length === 0) {
    fail(scope, id, "no source citations");
  }
  p.sources.forEach((citation, i) => {
    const record = getSourceRecord(citation.sourceId);
    if (!record) {
      fail(scope, id, `sources[${i}].sourceId "${citation.sourceId}" not in registry`);
    }
    if (citation.checkedAt && !isValidIsoDate(citation.checkedAt)) {
      fail(scope, id, `sources[${i}].checkedAt invalid: ${citation.checkedAt}`);
    }
  });
}

function assertNonEmptyString(scope: string, id: string, field: string, value: string) {
  if (!value.trim()) fail(scope, id, `${field} is empty`);
  if (value === UNVERIFIED_PLACEHOLDER) {
    fail(
      scope,
      id,
      `${field} literally equals the EmptyMetric placeholder string — unverified values must not be embedded in entity records`,
    );
  }
}

const EDITORIAL_SECTIONS: ReadonlyArray<keyof EditorialBlock> = [
  "significance",
  "connectivityRole",
  "cloudRelevance",
  "interconnectionContext",
  "strategicImportance",
];

function validateEditorial(
  scope: string,
  id: string,
  editorial: EditorialBlock | undefined,
) {
  if (!editorial) return;
  for (const section of EDITORIAL_SECTIONS) {
    const paragraphs = editorial[section];
    if (!paragraphs) continue;
    if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
      fail(
        scope,
        id,
        `editorial.${section} is present but empty — omit the key entirely instead`,
      );
      continue;
    }
    paragraphs.forEach((p, i) => {
      if (typeof p !== "string" || !p.trim()) {
        fail(scope, id, `editorial.${section}[${i}] is empty or non-string`);
      }
      if (p === UNVERIFIED_PLACEHOLDER) {
        fail(
          scope,
          id,
          `editorial.${section}[${i}] literally equals the EmptyMetric placeholder string`,
        );
      }
    });
  }
}

for (const country of COUNTRIES) {
  const id = country.slug;
  assertNonEmptyString("country", id, "slug", country.slug);
  assertNonEmptyString("country", id, "code", country.code);
  assertNonEmptyString("country", id, "name", country.name);
  assertNonEmptyString("country", id, "region", country.region);
  assertNonEmptyString("country", id, "continent", country.continent);
  assertNonEmptyString("country", id, "summary", country.summary);
  if (country.code.length !== 2) {
    fail("country", id, `code "${country.code}" is not 2 chars (ISO 3166-1 alpha-2)`);
  }
  if (country.code !== country.code.toUpperCase()) {
    fail("country", id, `code "${country.code}" must be uppercase`);
  }
  for (const slug of country.hubCitySlugs ?? []) {
    if (!getCity(slug)) fail("country", id, `hubCitySlugs references unknown city "${slug}"`);
  }
  for (const slug of country.ixpSlugs ?? []) {
    if (!getIxp(slug)) fail("country", id, `ixpSlugs references unknown IXP "${slug}"`);
  }
  validateProvenance("country", id, country.provenance);
  validateEditorial("country", id, country.editorial);
}

for (const city of CITIES) {
  const id = city.slug;
  assertNonEmptyString("city", id, "slug", city.slug);
  assertNonEmptyString("city", id, "name", city.name);
  assertNonEmptyString("city", id, "countryCode", city.countryCode);
  assertNonEmptyString("city", id, "countrySlug", city.countrySlug);
  assertNonEmptyString("city", id, "summary", city.summary);
  if (!getCountry(city.countrySlug)) {
    fail("city", id, `countrySlug "${city.countrySlug}" not in countries registry`);
  }
  const byCode = getCountryByCode(city.countryCode);
  if (!byCode) {
    fail("city", id, `countryCode "${city.countryCode}" not in countries registry`);
  } else if (byCode.slug !== city.countrySlug) {
    fail(
      "city",
      id,
      `countryCode "${city.countryCode}" resolves to "${byCode.slug}", not the declared countrySlug "${city.countrySlug}"`,
    );
  }
  for (const slug of city.ixpSlugs ?? []) {
    if (!getIxp(slug)) fail("city", id, `ixpSlugs references unknown IXP "${slug}"`);
  }
  for (const slug of city.peerMetroSlugs ?? []) {
    if (slug === city.slug) {
      fail("city", id, `peerMetroSlugs references self ("${slug}")`);
      continue;
    }
    if (!getCity(slug)) {
      fail("city", id, `peerMetroSlugs references unknown city "${slug}"`);
    }
  }
  validateProvenance("city", id, city.provenance);
  validateEditorial("city", id, city.editorial);
}

for (const ixp of IXPS) {
  const id = ixp.slug;
  assertNonEmptyString("ixp", id, "slug", ixp.slug);
  assertNonEmptyString("ixp", id, "name", ixp.name);
  assertNonEmptyString("ixp", id, "operator", ixp.operator);
  assertNonEmptyString("ixp", id, "countryCode", ixp.countryCode);
  assertNonEmptyString("ixp", id, "citySlug", ixp.citySlug);
  assertNonEmptyString("ixp", id, "summary", ixp.summary);
  if (!getCity(ixp.citySlug)) {
    fail("ixp", id, `citySlug "${ixp.citySlug}" not in cities registry`);
  }
  if (!getCountryByCode(ixp.countryCode)) {
    fail("ixp", id, `countryCode "${ixp.countryCode}" not in countries registry`);
  }
  validateProvenance("ixp", id, ixp.provenance);
  validateEditorial("ixp", id, ixp.editorial);
}

for (const provider of CLOUD_PROVIDERS) {
  const id = provider.slug;
  assertNonEmptyString("cloud-provider", id, "slug", provider.slug);
  assertNonEmptyString("cloud-provider", id, "name", provider.name);
  assertNonEmptyString("cloud-provider", id, "summary", provider.summary);
  validateProvenance("cloud-provider", id, provider.provenance);
}

function validateCitations(
  scope: string,
  id: string,
  citations: ReadonlyArray<SourceCitation>,
) {
  if (citations.length === 0) {
    fail(scope, id, "no source citations");
  }
  citations.forEach((citation, i) => {
    if (!getSourceRecord(citation.sourceId)) {
      fail(
        scope,
        id,
        `sources[${i}].sourceId "${citation.sourceId}" not in registry`,
      );
    }
    if (citation.checkedAt && !isValidIsoDate(citation.checkedAt)) {
      fail(scope, id, `sources[${i}].checkedAt invalid: ${citation.checkedAt}`);
    }
  });
}

const seenInsightSlugs = new Set<string>();
for (const insight of INSIGHTS) {
  const id = insight.slug;
  assertNonEmptyString("insight", id, "slug", insight.slug);
  assertNonEmptyString("insight", id, "title", insight.title);
  assertNonEmptyString("insight", id, "dek", insight.dek);
  if (seenInsightSlugs.has(insight.slug)) {
    fail("insight", id, `duplicate slug "${insight.slug}"`);
  }
  seenInsightSlugs.add(insight.slug);
  if (!isValidIsoDate(insight.publishedAt)) {
    fail("insight", id, `invalid publishedAt: ${insight.publishedAt}`);
  }
  if (!isValidIsoDate(insight.lastUpdated)) {
    fail("insight", id, `invalid lastUpdated: ${insight.lastUpdated}`);
  }
  if (insight.sections.length === 0) {
    fail("insight", id, "insight has no body sections");
  }
  const seenSectionIds = new Set<string>();
  insight.sections.forEach((section, sIdx) => {
    if (!section.id.trim()) {
      fail("insight", id, `sections[${sIdx}].id is empty`);
    }
    if (seenSectionIds.has(section.id)) {
      fail("insight", id, `duplicate section id "${section.id}"`);
    }
    seenSectionIds.add(section.id);
    if (!section.paragraphs || section.paragraphs.length === 0) {
      fail("insight", id, `sections[${sIdx}] has no paragraphs`);
    }
    section.paragraphs.forEach((p, pIdx) => {
      if (typeof p !== "string" || !p.trim()) {
        fail(
          "insight",
          id,
          `sections[${sIdx}].paragraphs[${pIdx}] is empty or non-string`,
        );
      }
      if (p === UNVERIFIED_PLACEHOLDER) {
        fail(
          "insight",
          id,
          `sections[${sIdx}].paragraphs[${pIdx}] literally equals the EmptyMetric placeholder string`,
        );
      }
    });
  });
  for (const ref of insight.entityRefs ?? []) {
    const [kind, slug] = ref.split(":");
    if (!kind || !slug) {
      fail("insight", id, `entityRefs entry "${ref}" is malformed`);
      continue;
    }
    if (kind === "country") {
      if (!getCountry(slug)) {
        fail("insight", id, `entityRefs "${ref}" points at unknown country`);
      }
    } else if (kind === "city") {
      if (!getCity(slug)) {
        fail("insight", id, `entityRefs "${ref}" points at unknown city`);
      }
    } else if (kind === "ixp") {
      if (!getIxp(slug)) {
        fail("insight", id, `entityRefs "${ref}" points at unknown IXP`);
      }
    } else {
      fail("insight", id, `entityRefs "${ref}" uses unknown kind "${kind}"`);
    }
  }
  validateCitations("insight", id, insight.sources);
}

const seenGuideSlugs = new Set<string>();
for (const guide of GUIDES) {
  const id = guide.slug;
  assertNonEmptyString("guide", id, "slug", guide.slug);
  assertNonEmptyString("guide", id, "title", guide.title);
  assertNonEmptyString("guide", id, "dek", guide.dek);
  assertNonEmptyString("guide", id, "definition", guide.definition);
  if (seenGuideSlugs.has(guide.slug)) {
    fail("guide", id, `duplicate slug "${guide.slug}"`);
  }
  seenGuideSlugs.add(guide.slug);
  if (!isValidIsoDate(guide.publishedAt)) {
    fail("guide", id, `invalid publishedAt: ${guide.publishedAt}`);
  }
  if (!isValidIsoDate(guide.lastUpdated)) {
    fail("guide", id, `invalid lastUpdated: ${guide.lastUpdated}`);
  }
  if (guide.keyTakeaways.length === 0) {
    fail("guide", id, "guide has no keyTakeaways");
  }
  guide.keyTakeaways.forEach((t, i) => {
    if (typeof t !== "string" || !t.trim()) {
      fail("guide", id, `keyTakeaways[${i}] is empty or non-string`);
    }
    if (t === UNVERIFIED_PLACEHOLDER) {
      fail("guide", id, `keyTakeaways[${i}] equals the EmptyMetric placeholder`);
    }
  });
  if (guide.summary.length === 0) {
    fail("guide", id, "guide has no summary facts");
  }
  guide.summary.forEach((fact, i) => {
    if (!fact.label.trim() || !fact.value.trim()) {
      fail("guide", id, `summary[${i}] has empty label or value`);
    }
  });
  if (guide.sections.length === 0) {
    fail("guide", id, "guide has no body sections");
  }
  const seenGuideSectionIds = new Set<string>();
  guide.sections.forEach((section, sIdx) => {
    if (!section.id.trim()) {
      fail("guide", id, `sections[${sIdx}].id is empty`);
    }
    if (!section.heading.trim()) {
      fail("guide", id, `sections[${sIdx}].heading is empty`);
    }
    if (seenGuideSectionIds.has(section.id)) {
      fail("guide", id, `duplicate section id "${section.id}"`);
    }
    seenGuideSectionIds.add(section.id);
    if (!section.paragraphs || section.paragraphs.length === 0) {
      fail("guide", id, `sections[${sIdx}] has no paragraphs`);
    }
    section.paragraphs.forEach((p, pIdx) => {
      if (typeof p !== "string" || !p.trim()) {
        fail(
          "guide",
          id,
          `sections[${sIdx}].paragraphs[${pIdx}] is empty or non-string`,
        );
      }
      if (p === UNVERIFIED_PLACEHOLDER) {
        fail(
          "guide",
          id,
          `sections[${sIdx}].paragraphs[${pIdx}] equals the EmptyMetric placeholder`,
        );
      }
    });
  });
  (guide.strategicImportance ?? []).forEach((p, i) => {
    if (typeof p !== "string" || !p.trim()) {
      fail("guide", id, `strategicImportance[${i}] is empty or non-string`);
    }
  });
  for (const ref of guide.relatedEntityRefs ?? []) {
    const [kind, slug] = ref.split(":");
    if (!kind || !slug) {
      fail("guide", id, `relatedEntityRefs "${ref}" is malformed`);
      continue;
    }
    if (kind === "country") {
      if (!getCountry(slug)) {
        fail("guide", id, `relatedEntityRefs "${ref}" points at unknown country`);
      }
    } else if (kind === "city") {
      if (!getCity(slug)) {
        fail("guide", id, `relatedEntityRefs "${ref}" points at unknown city`);
      }
    } else if (kind === "ixp") {
      if (!getIxp(slug)) {
        fail("guide", id, `relatedEntityRefs "${ref}" points at unknown IXP`);
      }
    } else {
      fail("guide", id, `relatedEntityRefs "${ref}" uses unknown kind "${kind}"`);
    }
  }
  validateCitations("guide", id, guide.sources);
}

const ENTITY_REF_PATTERN = /^(country|city|ixp):[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateEntityRef(scope: string, id: string, ref: string, field: string) {
  if (!ENTITY_REF_PATTERN.test(ref)) {
    fail(
      scope,
      id,
      `${field} "${ref}" must match \`(country|city|ixp):<kebab-slug>\``,
    );
    return;
  }
  const [kind, slug] = ref.split(":");
  if (kind === "country") {
    if (!getCountry(slug!)) fail(scope, id, `${field} "${ref}" points at unknown country`);
  } else if (kind === "city") {
    if (!getCity(slug!)) fail(scope, id, `${field} "${ref}" points at unknown city`);
  } else if (kind === "ixp") {
    if (!getIxp(slug!)) fail(scope, id, `${field} "${ref}" points at unknown IXP`);
  }
}

const datasetSlugs = new Set(DATASETS.map((d) => d.slug));
const indicatorSlugs = new Set(INDICATORS.map((i) => i.slug));
const rankingSlugs = new Set(RANKINGS.map((r) => r.slug));

const seenDatasetSlugs = new Set<string>();
for (const d of DATASETS) {
  const id = d.slug;
  assertNonEmptyString("dataset", id, "slug", d.slug);
  assertNonEmptyString("dataset", id, "title", d.title);
  assertNonEmptyString("dataset", id, "dek", d.dek);
  assertNonEmptyString("dataset", id, "methodology", d.methodology);
  if (seenDatasetSlugs.has(d.slug)) fail("dataset", id, `duplicate slug "${d.slug}"`);
  seenDatasetSlugs.add(d.slug);
  if (!isValidIsoDate(d.publishedAt)) fail("dataset", id, `invalid publishedAt: ${d.publishedAt}`);
  if (!isValidIsoDate(d.lastUpdated)) fail("dataset", id, `invalid lastUpdated: ${d.lastUpdated}`);
  if (d.limitations.length === 0) fail("dataset", id, "dataset has no limitations");
  d.limitations.forEach((lim, i) => {
    if (typeof lim !== "string" || !lim.trim()) fail("dataset", id, `limitations[${i}] empty`);
    if (lim === UNVERIFIED_PLACEHOLDER) fail("dataset", id, `limitations[${i}] is placeholder`);
  });
  for (const ref of d.relatedEntityRefs ?? []) {
    validateEntityRef("dataset", id, ref, "relatedEntityRefs");
  }
  for (const slug of d.indicatorSlugs ?? []) {
    if (!indicatorSlugs.has(slug)) {
      fail("dataset", id, `indicatorSlugs "${slug}" not in indicator registry`);
    }
  }
  validateCitations("dataset", id, d.sources);
}

const seenIndicatorSlugs = new Set<string>();
for (const ind of INDICATORS) {
  const id = ind.slug;
  assertNonEmptyString("indicator", id, "slug", ind.slug);
  assertNonEmptyString("indicator", id, "title", ind.title);
  assertNonEmptyString("indicator", id, "dek", ind.dek);
  assertNonEmptyString("indicator", id, "measures", ind.measures);
  assertNonEmptyString("indicator", id, "significance", ind.significance);
  assertNonEmptyString("indicator", id, "methodology", ind.methodology);
  assertNonEmptyString("indicator", id, "unit", ind.unit);
  if (seenIndicatorSlugs.has(ind.slug)) fail("indicator", id, `duplicate slug "${ind.slug}"`);
  seenIndicatorSlugs.add(ind.slug);
  if (!isValidIsoDate(ind.publishedAt)) fail("indicator", id, `invalid publishedAt: ${ind.publishedAt}`);
  if (!isValidIsoDate(ind.lastUpdated)) fail("indicator", id, `invalid lastUpdated: ${ind.lastUpdated}`);
  if (ind.limitations.length === 0) fail("indicator", id, "indicator has no limitations");
  ind.limitations.forEach((lim, i) => {
    if (typeof lim !== "string" || !lim.trim()) fail("indicator", id, `limitations[${i}] empty`);
  });
  for (const slug of ind.datasetSlugs ?? []) {
    if (!datasetSlugs.has(slug)) {
      fail("indicator", id, `datasetSlugs "${slug}" not in dataset registry`);
    }
  }
  for (const slug of ind.rankingSlugs ?? []) {
    if (!rankingSlugs.has(slug)) {
      fail("indicator", id, `rankingSlugs "${slug}" not in ranking registry`);
    }
  }
  for (const ref of ind.relatedEntityRefs ?? []) {
    validateEntityRef("indicator", id, ref, "relatedEntityRefs");
  }
  validateCitations("indicator", id, ind.sources);
}

const seenRankingSlugs = new Set<string>();
for (const r of RANKINGS) {
  const id = r.slug;
  assertNonEmptyString("ranking", id, "slug", r.slug);
  assertNonEmptyString("ranking", id, "title", r.title);
  assertNonEmptyString("ranking", id, "dek", r.dek);
  assertNonEmptyString("ranking", id, "dimension", r.dimension);
  assertNonEmptyString("ranking", id, "methodology", r.methodology);
  assertNonEmptyString("ranking", id, "weighting", r.weighting);
  assertNonEmptyString("ranking", id, "recomputeCadence", r.recomputeCadence);
  if (seenRankingSlugs.has(r.slug)) fail("ranking", id, `duplicate slug "${r.slug}"`);
  seenRankingSlugs.add(r.slug);
  if (!isValidIsoDate(r.publishedAt)) fail("ranking", id, `invalid publishedAt: ${r.publishedAt}`);
  if (!isValidIsoDate(r.lastUpdated)) fail("ranking", id, `invalid lastUpdated: ${r.lastUpdated}`);
  if (r.indicatorSlugs.length === 0) fail("ranking", id, "ranking has no indicators");
  for (const slug of r.indicatorSlugs) {
    if (!indicatorSlugs.has(slug)) {
      fail("ranking", id, `indicatorSlugs "${slug}" not in indicator registry`);
    }
  }
  if (r.limitations.length === 0) fail("ranking", id, "ranking has no limitations");
  r.limitations.forEach((lim, i) => {
    if (typeof lim !== "string" || !lim.trim()) fail("ranking", id, `limitations[${i}] empty`);
  });
  for (const ref of r.relatedEntityRefs ?? []) {
    validateEntityRef("ranking", id, ref, "relatedEntityRefs");
  }
  validateCitations("ranking", id, r.sources);
}

const seenMediaIds = new Set<string>();
for (const m of MEDIA_ASSETS) {
  const id = m.id;
  assertNonEmptyString("media", id, "id", m.id);
  assertNonEmptyString("media", id, "title", m.title);
  assertNonEmptyString("media", id, "altText", m.altText);
  if (seenMediaIds.has(m.id)) fail("media", id, `duplicate id "${m.id}"`);
  seenMediaIds.add(m.id);
  if (!isValidIsoDate(m.lastVerified)) {
    fail("media", id, `invalid lastVerified: ${m.lastVerified}`);
  }
  if (m.status === "verified") {
    if (!m.source) fail("media", id, "verified asset has no source");
    if (!m.license) fail("media", id, "verified asset has no license");
    if (m.license?.attributionRequired && !m.attribution) {
      fail("media", id, "verified asset requires attribution but has none");
    }
    if (!m.inlineComponent && !m.localPath) {
      fail("media", id, "verified asset has neither inlineComponent nor localPath");
    }
    if (m.inlineComponent && m.localPath) {
      fail("media", id, "verified asset declares both inlineComponent and localPath");
    }
  }
  if (m.status === "candidate" && (!m.source || !m.license)) {
    fail("media", id, "candidate asset must declare source and license");
  }
  for (const ref of m.relatedEntityRefs ?? []) {
    validateEntityRef("media", id, ref, "relatedEntityRefs");
  }
}

// ---------------------------------------------------------------
// Reviewed dataset rows
//
// Every row in src/data/research/*.reviewed.ts goes through the
// same provenance integrity rules. Rules:
//   - sourceId must resolve in the source registry.
//   - sourceUrl must look like an http(s) URL.
//   - observedAt + lastVerified must be ISO dates.
//   - confidence is one of the four valid levels.
//   - relatedEntityRefs (if present) must all resolve.
//   - row IDs must be unique within their type.
//   - no field may contain literal "unknown" as a value.
// ---------------------------------------------------------------

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//.test(value);
}

const VALID_CONFIDENCE = new Set([
  "high",
  "medium",
  "low",
  "unverified",
] as const);

function validateRow(scope: string, row: IngestedRecord) {
  const id = row.id;
  assertNonEmptyString(scope, id, "id", row.id);
  assertNonEmptyString(scope, id, "sourceUrl", row.sourceUrl);
  assertNonEmptyString(scope, id, "rawSourceName", row.rawSourceName);
  if (!isHttpUrl(row.sourceUrl)) {
    fail(scope, id, `sourceUrl "${row.sourceUrl}" is not a http(s) URL`);
  }
  if (!getSourceRecord(row.sourceId)) {
    fail(scope, id, `sourceId "${row.sourceId}" not in source registry`);
  }
  if (!isValidIsoDate(row.observedAt)) {
    fail(scope, id, `invalid observedAt: ${row.observedAt}`);
  }
  if (!isValidIsoDate(row.lastVerified)) {
    fail(scope, id, `invalid lastVerified: ${row.lastVerified}`);
  }
  if (!VALID_CONFIDENCE.has(row.confidence as never)) {
    fail(scope, id, `invalid confidence: ${String(row.confidence)}`);
  }
  for (const ref of row.relatedEntityRefs ?? []) {
    validateEntityRef(scope, id, ref, "relatedEntityRefs");
  }
}

/**
 * Cross-consistency check: a row that declares both a country code
 * and a metro slug must agree about which country the metro is in,
 * and any `city:` / `country:` refs in `relatedEntityRefs` must
 * match those identity fields.
 */
function validateRowLocationConsistency(
  scope: string,
  row: IngestedRecord & {
    readonly countryCode: string;
    readonly metroSlug?: string;
  },
) {
  const id = row.id;
  if (row.metroSlug) {
    const city = getCity(row.metroSlug);
    if (city && city.countryCode !== row.countryCode) {
      fail(
        scope,
        id,
        `metroSlug "${row.metroSlug}" is in ${city.countryCode}, but row declares countryCode ${row.countryCode}`,
      );
    }
  }
  for (const ref of row.relatedEntityRefs ?? []) {
    const [kind, slug] = ref.split(":");
    if (kind === "city" && slug) {
      const city = getCity(slug);
      if (city && city.countryCode !== row.countryCode) {
        fail(
          scope,
          id,
          `relatedEntityRefs "${ref}" sits in ${city.countryCode}, but row declares countryCode ${row.countryCode}`,
        );
      }
      if (row.metroSlug && slug !== row.metroSlug) {
        fail(
          scope,
          id,
          `relatedEntityRefs "${ref}" disagrees with metroSlug "${row.metroSlug}"`,
        );
      }
    }
    if (kind === "country" && slug) {
      const c = getCountry(slug);
      if (c && c.code !== row.countryCode) {
        fail(
          scope,
          id,
          `relatedEntityRefs "${ref}" resolves to ${c.code}, but row declares countryCode ${row.countryCode}`,
        );
      }
    }
  }
}

function rejectUnknownLiteral(scope: string, id: string, field: string, value: unknown) {
  if (typeof value === "string" && value.trim().toLowerCase() === "unknown") {
    fail(
      scope,
      id,
      `${field} contains the literal string "unknown" — use undefined for missing values`,
    );
  }
}

const seenRowIds = new Map<string, Set<string>>();
function checkRowIdUnique(scope: string, id: string) {
  let scopeSet = seenRowIds.get(scope);
  if (!scopeSet) {
    scopeSet = new Set();
    seenRowIds.set(scope, scopeSet);
  }
  if (scopeSet.has(id)) {
    fail(scope, id, `duplicate row id within ${scope}`);
  }
  scopeSet.add(id);
}

for (const row of REVIEWED_CLOUD_REGIONS) {
  const scope = "reviewed-cloud-region";
  checkRowIdUnique(scope, row.id);
  validateRow(scope, row);
  rejectUnknownLiteral(scope, row.id, "regionCode", row.regionCode);
  rejectUnknownLiteral(scope, row.id, "displayName", row.displayName);
  rejectUnknownLiteral(scope, row.id, "countryCode", row.countryCode);
  rejectUnknownLiteral(scope, row.id, "geography", row.geography);
  if (row.countryCode.length !== 2) {
    fail(scope, row.id, `countryCode "${row.countryCode}" must be ISO 3166-1 alpha-2`);
  }
  if (row.metroSlug && !getCity(row.metroSlug)) {
    fail(scope, row.id, `metroSlug "${row.metroSlug}" not in cities registry`);
  }
  if (row.availabilityZoneCount !== undefined && row.availabilityZoneCount < 1) {
    fail(scope, row.id, `availabilityZoneCount must be >= 1 when present`);
  }
  validateRowLocationConsistency(scope, row);
}

for (const row of REVIEWED_PEERINGDB_IXPS) {
  const scope = "reviewed-peeringdb-ix";
  checkRowIdUnique(scope, row.id);
  validateRow(scope, row);
  rejectUnknownLiteral(scope, row.id, "name", row.name);
  rejectUnknownLiteral(scope, row.id, "operator", row.operator);
  rejectUnknownLiteral(scope, row.id, "countryCode", row.countryCode);
  if (row.countryCode.length !== 2) {
    fail(scope, row.id, `countryCode "${row.countryCode}" must be ISO 3166-1 alpha-2`);
  }
  if (row.metroSlug && !getCity(row.metroSlug)) {
    fail(scope, row.id, `metroSlug "${row.metroSlug}" not in cities registry`);
  }
  validateRowLocationConsistency(scope, row);
}

for (const row of REVIEWED_PEERINGDB_FACILITIES) {
  const scope = "reviewed-peeringdb-facility";
  checkRowIdUnique(scope, row.id);
  validateRow(scope, row);
  rejectUnknownLiteral(scope, row.id, "name", row.name);
  rejectUnknownLiteral(scope, row.id, "operator", row.operator);
  rejectUnknownLiteral(scope, row.id, "countryCode", row.countryCode);
  if (row.countryCode.length !== 2) {
    fail(scope, row.id, `countryCode "${row.countryCode}" must be ISO 3166-1 alpha-2`);
  }
  if (row.metroSlug && !getCity(row.metroSlug)) {
    fail(scope, row.id, `metroSlug "${row.metroSlug}" not in cities registry`);
  }
  validateRowLocationConsistency(scope, row);
}

const counts = {
  countries: COUNTRIES.length,
  cities: CITIES.length,
  ixps: IXPS.length,
  cloudProviders: CLOUD_PROVIDERS.length,
  insights: INSIGHTS.length,
  guides: GUIDES.length,
  datasets: DATASETS.length,
  indicators: INDICATORS.length,
  rankings: RANKINGS.length,
  media: MEDIA_ASSETS.length,
  reviewedCloudRegions: REVIEWED_CLOUD_REGIONS.length,
  reviewedPeeringdbIxps: REVIEWED_PEERINGDB_IXPS.length,
  reviewedPeeringdbFacilities: REVIEWED_PEERINGDB_FACILITIES.length,
};

if (failures.length > 0) {
  console.error("\nData validation FAILED — editorial rules violated:\n");
  for (const f of failures) {
    console.error(`  · [${f.scope}/${f.id}] ${f.message}`);
  }
  console.error(`\n${failures.length} failure(s).`);
  process.exit(1);
}

console.log("Data validation passed.");
console.log(
  `  countries: ${counts.countries}, cities: ${counts.cities}, ixps: ${counts.ixps}, cloud-providers: ${counts.cloudProviders}, insights: ${counts.insights}, guides: ${counts.guides}, datasets: ${counts.datasets}, indicators: ${counts.indicators}, rankings: ${counts.rankings}, media: ${counts.media}`,
);
console.log(
  `  reviewed rows: cloud-regions: ${counts.reviewedCloudRegions}, peeringdb-ixps: ${counts.reviewedPeeringdbIxps}, peeringdb-facilities: ${counts.reviewedPeeringdbFacilities}`,
);
