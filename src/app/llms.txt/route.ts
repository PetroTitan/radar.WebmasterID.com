import { SITE } from "@/config/site";
import { GUIDES } from "@/content/guides";
import { listInsightsByDate } from "@/content/insights";
import { DATASETS } from "@/content/datasets";
import { INDICATORS } from "@/content/indicators";
import { RANKINGS } from "@/content/rankings";
import { MEDIA_ASSETS } from "@/content/media";
import { HISTORY_PAGES } from "@/content/history";
import { INFRASTRUCTURE_MAPS } from "@/content/maps";
import {
  COUNTRIES,
  CITIES,
  IXPS,
  SUBSEA_CABLES,
  DATACENTER_FACILITIES,
} from "@/data";
import { SOURCE_REGISTRY } from "@/source-registry";

/**
 * /llms.txt
 *
 * A plain-text site overview optimised for AI agents and
 * citation-style crawlers. Mirrors the emerging `llms.txt`
 * convention: a Markdown-ish file at the site root that
 * summarises the platform and lists its main content sections
 * with one-line descriptions and absolute URLs.
 *
 * Generated at build time from the registries so it stays in
 * sync with the rest of the site automatically.
 */

export const dynamic = "force-static";

function abs(path: string): string {
  return new URL(path, SITE.url).toString();
}

function generateLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.tagline}`);
  lines.push("");
  lines.push(SITE.description);
  lines.push("");
  lines.push(
    "Every published fact on Radar WebmasterID traces back to a registered source. Where data is unknown or contested, the platform displays \"Data not yet verified.\" rather than a guess.",
  );
  lines.push("");

  lines.push("## Guides");
  lines.push("");
  for (const g of GUIDES) {
    lines.push(`- [${g.title}](${abs(`/guides/${g.slug}`)}): ${g.dek}`);
  }
  lines.push("");

  const orderedInsights = listInsightsByDate();
  lines.push("## Insights");
  lines.push("");
  for (const i of orderedInsights) {
    lines.push(`- [${i.title}](${abs(`/insights/${i.slug}`)}): ${i.dek}`);
  }
  lines.push("");

  lines.push("## Countries");
  lines.push("");
  for (const c of COUNTRIES) {
    lines.push(
      `- [${c.name}](${abs(`/countries/${c.slug}`)}): ${c.code} · ${c.region}.`,
    );
  }
  lines.push("");

  lines.push("## Cities");
  lines.push("");
  for (const c of CITIES) {
    lines.push(
      `- [${c.name}](${abs(`/cities/${c.slug}`)}): ${c.countryCode} hub metro.`,
    );
  }
  lines.push("");

  lines.push("## Internet Exchange Points");
  lines.push("");
  for (const i of IXPS) {
    lines.push(
      `- [${i.name}](${abs(`/ixps/${i.slug}`)}): operated by ${i.operator}, ${i.countryCode}.`,
    );
  }
  lines.push("");

  lines.push("## Datacenter facilities");
  lines.push("");
  for (const f of DATACENTER_FACILITIES) {
    lines.push(
      `- [${f.name}](${abs(`/facilities/${f.slug}`)}): ${f.operator}, ${f.countryCode}${f.carrierNeutral ? " · carrier-neutral" : ""}${f.ecosystemRole ? ` · ${f.ecosystemRole}` : ""}.`,
    );
  }
  lines.push("");

  lines.push("## Research — Datasets");
  lines.push("");
  for (const d of DATASETS) {
    lines.push(
      `- [${d.title}](${abs(`/research/datasets/${d.slug}`)}) [${d.status}]: ${d.dek}`,
    );
  }
  lines.push("");

  lines.push("## Research — Indicators");
  lines.push("");
  for (const ind of INDICATORS) {
    lines.push(
      `- [${ind.title}](${abs(`/research/indicators/${ind.slug}`)}): ${ind.dek}`,
    );
  }
  lines.push("");

  lines.push("## Research — Rankings");
  lines.push("");
  for (const r of RANKINGS) {
    lines.push(
      `- [${r.title}](${abs(`/research/rankings/${r.slug}`)}) [${r.status}]: ${r.dek}`,
    );
  }
  lines.push("");

  lines.push("## Infrastructure maps");
  lines.push("");
  lines.push(
    "Editorial topology, corridor, and clustering maps. Server-rendered SVG only — no GIS, no tile servers, no client-side map frameworks. Subsea corridors are abstracted, not exact cable polylines. The methodology lives at docs/infrastructure-cartography-guidelines.md.",
  );
  lines.push("");
  for (const map of INFRASTRUCTURE_MAPS) {
    lines.push(
      `- [${map.title}](${abs(`/maps/${map.slug}`)}) [${map.category} · ${map.geographicScope}]: ${map.dek}`,
    );
  }
  lines.push("");

  lines.push("## Historical infrastructure intelligence");
  lines.push("");
  for (const page of HISTORY_PAGES) {
    lines.push(
      `- [${page.title}](${abs(`/history/${page.slug}`)}) [${page.period}]: ${page.dek}`,
    );
  }
  lines.push("");

  lines.push("## Submarine cables");
  lines.push("");
  for (const cable of SUBSEA_CABLES) {
    const rfs = cable.readyForServiceAt ?? cable.readyForServiceYear ?? "RFS year not recorded";
    lines.push(
      `- ${cable.name} [${cable.corridor ?? "corridor not labelled"}, RFS ${rfs}]: ${cable.summary ?? "Identity record only."}`,
    );
  }
  lines.push("");

  lines.push("## Visuals");
  lines.push("");
  lines.push(
    "Radar publishes only source-bound, attribution-safe visual assets. Verified assets render inline; candidate and unverified placeholders are registered intent and do not render anywhere on entity, guide, or research pages. The full media-governance workflow is documented at docs/media-governance.md.",
  );
  lines.push("");
  for (const m of MEDIA_ASSETS) {
    lines.push(
      `- [${m.title}](${abs(`/visuals/${m.id}`)}) [${m.type} · ${m.status}]: ${m.caption ?? m.altText}`,
    );
  }
  lines.push("");

  lines.push("## Sources");
  lines.push("");
  lines.push(
    `Radar maintains a registered source list of ${SOURCE_REGISTRY.length} entries. See [the full registry](${abs("/sources")}) for tier classifications and last-checked dates.`,
  );
  lines.push("");

  lines.push("## Data ingestion");
  lines.push("");
  lines.push(
    `Radar's data layer is source-bound and manually reviewed. Public pages render only from src/data/research/*.reviewed.ts files. Adapters write to a gitignored src/generated/ directory; editorial review promotes rows from there. Lifecycle documented at ${abs("/research/methodologies")}.`,
  );
  lines.push("");

  lines.push("## Methodology");
  lines.push("");
  lines.push(
    `- [Editorial principles, scoring, confidence and source governance](${abs("/methodology")})`,
  );
  lines.push("");

  lines.push("## About");
  lines.push("");
  lines.push(`- [About Radar WebmasterID](${abs("/about")})`);
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  const body = generateLlmsTxt();
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
