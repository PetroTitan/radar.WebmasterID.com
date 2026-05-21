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
  DATACENTER_FACILITIES,
  getCity,
  getCountry,
  getCountryByCode,
  getIxp,
  getDatacenterFacility,
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
import { WIKIMEDIA_CANDIDATES } from "../content/wikimedia-candidates";
import { HISTORY_PAGES } from "../content/history";
import { SUBSEA_CABLES } from "../data/subsea-cables";
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

const seenCountrySlugs = new Set<string>();
const seenCountryCodes = new Set<string>();
for (const country of COUNTRIES) {
  const id = country.slug;
  if (seenCountrySlugs.has(country.slug)) {
    fail("country", id, `duplicate slug "${country.slug}"`);
  }
  seenCountrySlugs.add(country.slug);
  if (seenCountryCodes.has(country.code)) {
    fail("country", id, `duplicate ISO 3166-1 code "${country.code}"`);
  }
  seenCountryCodes.add(country.code);
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

const seenCitySlugs = new Set<string>();
for (const city of CITIES) {
  const id = city.slug;
  if (seenCitySlugs.has(city.slug)) {
    fail("city", id, `duplicate slug "${city.slug}"`);
  }
  seenCitySlugs.add(city.slug);
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

// ---------------------------------------------------------------
// Datacenter facilities
//
// Identity records for named datacenter facilities. The validator
// enforces:
//   - unique slug
//   - city/country agreement (citySlug's country must match the
//     facility's countryCode)
//   - relatedIxpSlugs resolve to IXP entities
//   - cloudRegionRefs match the `<provider-slug>:<region-slug>`
//     shape and the provider prefix is one of the known providers
//   - statedPowerMw is a positive number when present
//   - no editorial field carries the canonical "Data not yet
//     verified." placeholder
// ---------------------------------------------------------------
const seenFacilitySlugs = new Set<string>();
const KNOWN_CLOUD_PROVIDER_SLUGS = new Set(["aws", "gcp", "azure"]);

for (const facility of DATACENTER_FACILITIES) {
  const id = facility.slug;
  if (seenFacilitySlugs.has(facility.slug)) {
    fail("facility", id, `duplicate slug "${facility.slug}"`);
  }
  seenFacilitySlugs.add(facility.slug);
  assertNonEmptyString("facility", id, "slug", facility.slug);
  assertNonEmptyString("facility", id, "name", facility.name);
  assertNonEmptyString("facility", id, "operator", facility.operator);
  assertNonEmptyString("facility", id, "countryCode", facility.countryCode);
  assertNonEmptyString("facility", id, "citySlug", facility.citySlug);
  if (facility.countryCode.length !== 2) {
    fail("facility", id, `countryCode "${facility.countryCode}" must be ISO 3166-1 alpha-2`);
  }
  const city = getCity(facility.citySlug);
  if (!city) {
    fail("facility", id, `citySlug "${facility.citySlug}" not in cities registry`);
  } else if (city.countryCode !== facility.countryCode) {
    fail(
      "facility",
      id,
      `countryCode "${facility.countryCode}" disagrees with citySlug "${facility.citySlug}" (city sits in ${city.countryCode})`,
    );
  }
  if (!getCountryByCode(facility.countryCode)) {
    fail("facility", id, `countryCode "${facility.countryCode}" not in countries registry`);
  }
  if (facility.statedPowerMw !== undefined && facility.statedPowerMw <= 0) {
    fail("facility", id, `statedPowerMw must be a positive number when present`);
  }
  for (const ixpSlug of facility.relatedIxpSlugs ?? []) {
    if (!getIxp(ixpSlug)) {
      fail("facility", id, `relatedIxpSlugs "${ixpSlug}" not in IXP registry`);
    }
  }
  for (const ref of facility.cloudRegionRefs ?? []) {
    const [provider, regionCode] = ref.split(":");
    if (!provider || !regionCode) {
      fail("facility", id, `cloudRegionRefs "${ref}" must use "<provider>:<region>" form`);
      continue;
    }
    if (!KNOWN_CLOUD_PROVIDER_SLUGS.has(provider)) {
      fail("facility", id, `cloudRegionRefs "${ref}" uses unknown provider "${provider}"`);
    }
  }
  if (facility.openedYear && !/^[0-9]{4}$/.test(facility.openedYear)) {
    fail("facility", id, `openedYear "${facility.openedYear}" must be a four-digit year`);
  }
  (facility.editorialNotes ?? []).forEach((n, i) => {
    if (typeof n !== "string" || !n.trim()) {
      fail("facility", id, `editorialNotes[${i}] is empty or non-string`);
    }
    if (n === UNVERIFIED_PLACEHOLDER) {
      fail("facility", id, `editorialNotes[${i}] equals the EmptyMetric placeholder`);
    }
  });
  validateProvenance("facility", id, facility.provenance);
  validateEditorial("facility", id, facility.editorial);
}

const seenIxpSlugs = new Set<string>();
const seenIxpPeeringDbIds = new Map<number, string>();
for (const ixp of IXPS) {
  const id = ixp.slug;
  if (seenIxpSlugs.has(ixp.slug)) {
    fail("ixp", id, `duplicate slug "${ixp.slug}"`);
  }
  seenIxpSlugs.add(ixp.slug);
  assertNonEmptyString("ixp", id, "slug", ixp.slug);
  assertNonEmptyString("ixp", id, "name", ixp.name);
  assertNonEmptyString("ixp", id, "operator", ixp.operator);
  assertNonEmptyString("ixp", id, "countryCode", ixp.countryCode);
  assertNonEmptyString("ixp", id, "citySlug", ixp.citySlug);
  assertNonEmptyString("ixp", id, "summary", ixp.summary);
  const city = getCity(ixp.citySlug);
  if (!city) {
    fail("ixp", id, `citySlug "${ixp.citySlug}" not in cities registry`);
  } else if (city.countryCode !== ixp.countryCode) {
    fail(
      "ixp",
      id,
      `countryCode "${ixp.countryCode}" disagrees with citySlug "${ixp.citySlug}" (city sits in ${city.countryCode})`,
    );
  }
  if (!getCountryByCode(ixp.countryCode)) {
    fail("ixp", id, `countryCode "${ixp.countryCode}" not in countries registry`);
  }
  if (ixp.peeringDbId !== undefined) {
    if (!Number.isInteger(ixp.peeringDbId) || ixp.peeringDbId <= 0) {
      fail("ixp", id, `peeringDbId "${ixp.peeringDbId}" must be a positive integer`);
    }
    const existing = seenIxpPeeringDbIds.get(ixp.peeringDbId);
    if (existing) {
      fail("ixp", id, `peeringDbId "${ixp.peeringDbId}" already claimed by "${existing}"`);
    } else {
      seenIxpPeeringDbIds.set(ixp.peeringDbId, ixp.slug);
    }
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

// Cross-registry slug sets — declared up front so they are
// available to every page-content validator (guides, insights,
// datasets, indicators, rankings) without depending on loop order.
const datasetSlugs = new Set(DATASETS.map((d) => d.slug));
const indicatorSlugs = new Set(INDICATORS.map((i) => i.slug));
const rankingSlugs = new Set(RANKINGS.map((r) => r.slug));
const mediaIds = new Set(MEDIA_ASSETS.map((m) => m.id));

const ENTITY_REF_PATTERN =
  /^(country|city|ixp|facility):[a-z0-9]+(?:-[a-z0-9]+)*$/;

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
  for (const slug of guide.relatedDatasetSlugs ?? []) {
    if (!datasetSlugs.has(slug)) {
      fail("guide", id, `relatedDatasetSlugs "${slug}" not in dataset registry`);
    }
  }
  for (const slug of guide.relatedIndicatorSlugs ?? []) {
    if (!indicatorSlugs.has(slug)) {
      fail("guide", id, `relatedIndicatorSlugs "${slug}" not in indicator registry`);
    }
  }
  for (const slug of guide.relatedRankingSlugs ?? []) {
    if (!rankingSlugs.has(slug)) {
      fail("guide", id, `relatedRankingSlugs "${slug}" not in ranking registry`);
    }
  }
  for (const path of guide.relatedMapPaths ?? []) {
    if (!path.startsWith("/maps/")) {
      fail("guide", id, `relatedMapPaths "${path}" must be a /maps/* path`);
    }
  }
  for (const mediaId of guide.relatedMediaIds ?? []) {
    if (!mediaIds.has(mediaId)) {
      fail("guide", id, `relatedMediaIds "${mediaId}" not in media registry`);
    }
  }
  for (const entry of guide.geographicImportance ?? []) {
    if (!entry.prose || !entry.prose.trim()) {
      fail("guide", id, `geographicImportance entry for "${entry.entityRef}" has empty prose`);
    }
    if (entry.prose === UNVERIFIED_PLACEHOLDER) {
      fail("guide", id, `geographicImportance prose equals the EmptyMetric placeholder`);
    }
    validateEntityRef("guide", id, entry.entityRef, "geographicImportance.entityRef");
  }
  (guide.caveats ?? []).forEach((c, i) => {
    if (typeof c !== "string" || !c.trim()) {
      fail("guide", id, `caveats[${i}] is empty or non-string`);
    }
    if (c === UNVERIFIED_PLACEHOLDER) {
      fail("guide", id, `caveats[${i}] equals the EmptyMetric placeholder`);
    }
  });
  (guide.methodologyNotes ?? []).forEach((m, i) => {
    if (typeof m !== "string" || !m.trim()) {
      fail("guide", id, `methodologyNotes[${i}] is empty or non-string`);
    }
    if (m === UNVERIFIED_PLACEHOLDER) {
      fail("guide", id, `methodologyNotes[${i}] equals the EmptyMetric placeholder`);
    }
  });
  validateCitations("guide", id, guide.sources);
}

function validateEntityRef(scope: string, id: string, ref: string, field: string) {
  if (!ENTITY_REF_PATTERN.test(ref)) {
    fail(
      scope,
      id,
      `${field} "${ref}" must match \`(country|city|ixp|facility):<kebab-slug>\``,
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
  } else if (kind === "facility") {
    if (!getDatacenterFacility(slug!)) {
      fail(scope, id, `${field} "${ref}" points at unknown datacenter facility`);
    }
  }
}


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
  // Rankings whose status is not "verified" must not publish
  // positions or scores. The Ranking type does not yet carry a
  // positions field, so this guard is defensive: any future
  // ranking-position field must be added with a status === "verified"
  // gate. We assert here so the discipline is enforced at build time.
  if (r.status !== "verified") {
    // Cast through unknown so a future `positions` addition is caught.
    const maybeHasPositions = (r as unknown as { readonly positions?: unknown }).positions;
    if (maybeHasPositions !== undefined) {
      fail(
        "ranking",
        id,
        `ranking carries positions while status is "${r.status}" — rankings must be verified before publishing positions`,
      );
    }
  }
  validateCitations("ranking", id, r.sources);
}

function isCommonsFileOrCategoryUrl(value: string): boolean {
  return /^https:\/\/commons\.wikimedia\.org\/wiki\/(File|Category):/.test(value);
}

const seenMediaIds = new Set<string>();
for (const m of MEDIA_ASSETS) {
  const id = m.id;
  assertNonEmptyString("media", id, "id", m.id);
  assertNonEmptyString("media", id, "title", m.title);
  if (seenMediaIds.has(m.id)) fail("media", id, `duplicate id "${m.id}"`);
  seenMediaIds.add(m.id);
  if (!isValidIsoDate(m.lastVerified)) {
    fail("media", id, `invalid lastVerified: ${m.lastVerified}`);
  }
  if (m.status === "verified") {
    assertNonEmptyString("media", id, "altText", m.altText);
    if (!m.source) fail("media", id, "verified asset has no source");
    if (!m.license) fail("media", id, "verified asset has no license");
    if (m.license?.attributionRequired && !m.attribution) {
      fail("media", id, "verified asset requires attribution but has none");
    }
    if (m.license && /^unknown/i.test(m.license.name.trim())) {
      fail("media", id, `verified asset license "${m.license.name}" must not read as "unknown"`);
    }
    if (!m.inlineComponent && !m.localPath) {
      fail("media", id, "verified asset has neither inlineComponent nor localPath");
    }
    if (m.inlineComponent && m.localPath) {
      fail("media", id, "verified asset declares both inlineComponent and localPath");
    }
    if (!m.relatedEntityRefs || m.relatedEntityRefs.length === 0) {
      // Self-authored diagrams may legitimately lack entity refs;
      // photographic / archival evidence must point at something.
      if (m.type === "photo" || m.type === "infrastructure-photo" || m.type === "archival-image") {
        fail("media", id, "verified photographic asset must declare at least one relatedEntityRef");
      }
    }
    if (m.visibleBrandRisk && (!m.riskNotes || m.riskNotes.length === 0)) {
      fail("media", id, "verified asset with visibleBrandRisk=true must document the brand in riskNotes");
    }
    if (m.source && /commons\.wikimedia\.org/.test(m.source.pageUrl) && !isCommonsFileOrCategoryUrl(m.source.pageUrl)) {
      fail("media", id, `verified Wikimedia source URL "${m.source.pageUrl}" must point at a File: or Category: page`);
    }
  }
  if (m.status === "candidate") {
    if (!m.source || !m.license) {
      fail("media", id, "candidate asset must declare source and license");
    }
    // Candidates must not slip a localPath into the published bundle.
    if (m.localPath) {
      fail("media", id, "candidate asset must not declare localPath — promote to verified first");
    }
    if (m.inlineComponent) {
      fail("media", id, "candidate asset must not declare inlineComponent — promote to verified first");
    }
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

// ---------------------------------------------------------------
// Wikimedia candidate registry
//
// Candidates are intent records that never render in public
// pages. The validator enforces:
//   - unique ids
//   - commonsPageUrl points at a Commons File: or Category: page
//   - recordedLicense is not literally "unknown"
//   - reviewStatus is one of the valid literals
//   - relatedEntityRefs (if present) all resolve
//   - discoveredAt and lastReviewedAt are ISO dates
// ---------------------------------------------------------------
const VALID_WIKIMEDIA_REVIEW_STATUS = new Set([
  "discovered",
  "license-confirmed",
  "attribution-pending",
  "rejected",
] as const);

const seenWikimediaCandidateIds = new Set<string>();
for (const c of WIKIMEDIA_CANDIDATES) {
  const id = c.id;
  assertNonEmptyString("wikimedia-candidate", id, "id", c.id);
  assertNonEmptyString("wikimedia-candidate", id, "title", c.title);
  assertNonEmptyString("wikimedia-candidate", id, "commonsPageUrl", c.commonsPageUrl);
  assertNonEmptyString("wikimedia-candidate", id, "recordedLicense", c.recordedLicense);
  if (seenWikimediaCandidateIds.has(c.id)) {
    fail("wikimedia-candidate", id, `duplicate id "${c.id}"`);
  }
  seenWikimediaCandidateIds.add(c.id);
  if (!isCommonsFileOrCategoryUrl(c.commonsPageUrl)) {
    fail(
      "wikimedia-candidate",
      id,
      `commonsPageUrl "${c.commonsPageUrl}" must point at https://commons.wikimedia.org/wiki/File:... or .../Category:...`,
    );
  }
  if (c.commonsCategoryUrl && !isCommonsFileOrCategoryUrl(c.commonsCategoryUrl)) {
    fail(
      "wikimedia-candidate",
      id,
      `commonsCategoryUrl "${c.commonsCategoryUrl}" must point at a Commons File: or Category: page`,
    );
  }
  if (/^unknown/i.test(c.recordedLicense.trim())) {
    fail("wikimedia-candidate", id, `recordedLicense "${c.recordedLicense}" must not read as "unknown"`);
  }
  if (!VALID_WIKIMEDIA_REVIEW_STATUS.has(c.reviewStatus as never)) {
    fail("wikimedia-candidate", id, `invalid reviewStatus: ${String(c.reviewStatus)}`);
  }
  if (!isValidIsoDate(c.discoveredAt)) {
    fail("wikimedia-candidate", id, `invalid discoveredAt: ${c.discoveredAt}`);
  }
  if (!isValidIsoDate(c.lastReviewedAt)) {
    fail("wikimedia-candidate", id, `invalid lastReviewedAt: ${c.lastReviewedAt}`);
  }
  for (const ref of c.relatedEntityRefs ?? []) {
    validateEntityRef("wikimedia-candidate", id, ref, "relatedEntityRefs");
  }
}

// ---------------------------------------------------------------
// Subsea cables
//
// Identity records for submarine cable systems. The validator
// enforces:
//   - unique slugs
//   - at least one source citation
//   - readyForServiceAt is an ISO date when present
//   - readyForServiceYear is a four-digit year when present and
//     mutually exclusive with readyForServiceAt
//   - landingCitySlugs all resolve to a city entity
//   - designCapacityTbps, when present, is a positive number
// ---------------------------------------------------------------
const seenCableSlugs = new Set<string>();
const YEAR_PATTERN = /^[0-9]{4}$/;
const YEAR_OR_MONTH_PATTERN = /^[0-9]{4}(-(0[1-9]|1[0-2]))?$/;

for (const cable of SUBSEA_CABLES) {
  const id = cable.slug;
  assertNonEmptyString("subsea-cable", id, "slug", cable.slug);
  assertNonEmptyString("subsea-cable", id, "name", cable.name);
  if (seenCableSlugs.has(cable.slug)) {
    fail("subsea-cable", id, `duplicate slug "${cable.slug}"`);
  }
  seenCableSlugs.add(cable.slug);
  if (cable.owners.length === 0) {
    fail("subsea-cable", id, "cable has no declared owners");
  }
  if (cable.readyForServiceAt && cable.readyForServiceYear) {
    fail(
      "subsea-cable",
      id,
      "cable declares both readyForServiceAt and readyForServiceYear — use one",
    );
  }
  if (cable.readyForServiceAt && !isValidIsoDate(cable.readyForServiceAt)) {
    fail("subsea-cable", id, `invalid readyForServiceAt: ${cable.readyForServiceAt}`);
  }
  if (cable.readyForServiceYear && !YEAR_PATTERN.test(cable.readyForServiceYear)) {
    fail(
      "subsea-cable",
      id,
      `readyForServiceYear "${cable.readyForServiceYear}" must be a four-digit year`,
    );
  }
  for (const slug of cable.landingCitySlugs) {
    if (!getCity(slug)) {
      fail("subsea-cable", id, `landingCitySlugs references unknown city "${slug}"`);
    }
  }
  if (cable.designCapacityTbps !== undefined && cable.designCapacityTbps <= 0) {
    fail("subsea-cable", id, "designCapacityTbps must be a positive number when present");
  }
  validateProvenance("subsea-cable", id, cable.provenance);
}

// ---------------------------------------------------------------
// History pages
//
// Historical infrastructure intelligence pages. The validator
// enforces:
//   - unique slug
//   - source coverage (at least one citation; every cited source
//     resolves in the registry)
//   - quickAnswer + context + whyItMattered + evolution non-empty
//   - timeline events carry year-precision dates (YYYY or YYYY-MM)
//   - timeline events with a cable ref must reference a known
//     subsea cable
//   - relatedEntityRefs / relatedDatasetSlugs / relatedGuideSlugs
//     / relatedMapPaths / relatedMediaIds all resolve
//   - no speculative-precision day-level event dates
// ---------------------------------------------------------------
const guideSlugs = new Set(GUIDES.map((g) => g.slug));
const seenHistorySlugs = new Set<string>();

for (const page of HISTORY_PAGES) {
  const id = page.slug;
  assertNonEmptyString("history", id, "slug", page.slug);
  assertNonEmptyString("history", id, "title", page.title);
  assertNonEmptyString("history", id, "dek", page.dek);
  assertNonEmptyString("history", id, "period", page.period);
  assertNonEmptyString("history", id, "quickAnswer", page.quickAnswer);
  if (seenHistorySlugs.has(page.slug)) {
    fail("history", id, `duplicate slug "${page.slug}"`);
  }
  seenHistorySlugs.add(page.slug);
  if (!isValidIsoDate(page.publishedAt)) {
    fail("history", id, `invalid publishedAt: ${page.publishedAt}`);
  }
  if (!isValidIsoDate(page.lastUpdated)) {
    fail("history", id, `invalid lastUpdated: ${page.lastUpdated}`);
  }
  if (page.context.length === 0) fail("history", id, "page has no historical context");
  if (page.whyItMattered.length === 0) fail("history", id, "page has no whyItMattered prose");
  if (page.evolution.length === 0) fail("history", id, "page has no evolution prose");

  if (page.timeline.length === 0) {
    fail("history", id, "history page has no timeline events");
  }
  page.timeline.forEach((event, idx) => {
    if (!event.title.trim()) fail("history", id, `timeline[${idx}].title is empty`);
    if (!event.summary.trim()) fail("history", id, `timeline[${idx}].summary is empty`);
    if (!event.year.trim()) {
      fail("history", id, `timeline[${idx}].year is empty`);
    } else if (!YEAR_OR_MONTH_PATTERN.test(event.year)) {
      fail(
        "history",
        id,
        `timeline[${idx}].year "${event.year}" must be YYYY or YYYY-MM (day-precision dates not supported on historical events)`,
      );
    }
    if (event.confidence && !VALID_CONFIDENCE.has(event.confidence as never)) {
      fail("history", id, `timeline[${idx}].confidence is invalid: ${String(event.confidence)}`);
    }
    for (const ref of event.relatedEntityRefs ?? []) {
      validateEntityRef("history", id, ref, `timeline[${idx}].relatedEntityRefs`);
    }
    for (const cableSlug of event.relatedCableSlugs ?? []) {
      if (!seenCableSlugs.has(cableSlug)) {
        fail(
          "history",
          id,
          `timeline[${idx}].relatedCableSlugs references unknown cable "${cableSlug}"`,
        );
      }
    }
    if (event.sources) {
      validateCitations("history", id, event.sources);
    }
  });

  for (const ref of page.relatedEntityRefs ?? []) {
    validateEntityRef("history", id, ref, "relatedEntityRefs");
  }
  for (const slug of page.relatedDatasetSlugs ?? []) {
    if (!datasetSlugs.has(slug)) {
      fail("history", id, `relatedDatasetSlugs "${slug}" not in dataset registry`);
    }
  }
  for (const slug of page.relatedGuideSlugs ?? []) {
    if (!guideSlugs.has(slug)) {
      fail("history", id, `relatedGuideSlugs "${slug}" not in guide registry`);
    }
  }
  for (const slug of page.relatedCableSlugs ?? []) {
    if (!seenCableSlugs.has(slug)) {
      fail("history", id, `relatedCableSlugs references unknown cable "${slug}"`);
    }
  }
  for (const path of page.relatedMapPaths ?? []) {
    if (!path.startsWith("/maps/")) {
      fail("history", id, `relatedMapPaths "${path}" must be a /maps/* path`);
    }
  }
  for (const mediaId of page.relatedMediaIds ?? []) {
    if (!mediaIds.has(mediaId)) {
      fail("history", id, `relatedMediaIds "${mediaId}" not in media registry`);
    }
  }
  if (!VALID_CONFIDENCE.has(page.confidence as never)) {
    fail("history", id, `invalid confidence: ${String(page.confidence)}`);
  }
  (page.caveats ?? []).forEach((c, i) => {
    if (typeof c !== "string" || !c.trim()) {
      fail("history", id, `caveats[${i}] is empty or non-string`);
    }
  });
  (page.methodologyNotes ?? []).forEach((m, i) => {
    if (typeof m !== "string" || !m.trim()) {
      fail("history", id, `methodologyNotes[${i}] is empty or non-string`);
    }
  });
  validateCitations("history", id, page.sources);
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
  wikimediaCandidates: WIKIMEDIA_CANDIDATES.length,
  history: HISTORY_PAGES.length,
  subseaCables: SUBSEA_CABLES.length,
  facilities: DATACENTER_FACILITIES.length,
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
console.log(`  wikimedia candidates: ${counts.wikimediaCandidates}`);
console.log(`  history pages: ${counts.history}, subsea cables: ${counts.subseaCables}, facilities: ${counts.facilities}`);
