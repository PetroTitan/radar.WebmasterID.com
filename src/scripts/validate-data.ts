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
import { isValidIsoDate } from "../lib/dates";
import type { EditorialBlock, Provenance } from "../entities";

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

const counts = {
  countries: COUNTRIES.length,
  cities: CITIES.length,
  ixps: IXPS.length,
  cloudProviders: CLOUD_PROVIDERS.length,
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
  `  countries: ${counts.countries}, cities: ${counts.cities}, ixps: ${counts.ixps}, cloud-providers: ${counts.cloudProviders}`,
);
