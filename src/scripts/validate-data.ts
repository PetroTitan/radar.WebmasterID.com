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
import { isValidIsoDate } from "../lib/dates";
import type { EditorialBlock, Provenance, SourceCitation } from "../entities";

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

const counts = {
  countries: COUNTRIES.length,
  cities: CITIES.length,
  ixps: IXPS.length,
  cloudProviders: CLOUD_PROVIDERS.length,
  insights: INSIGHTS.length,
  guides: GUIDES.length,
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
  `  countries: ${counts.countries}, cities: ${counts.cities}, ixps: ${counts.ixps}, cloud-providers: ${counts.cloudProviders}, insights: ${counts.insights}, guides: ${counts.guides}`,
);
