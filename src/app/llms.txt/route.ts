import { SITE } from "@/config/site";
import { GUIDES } from "@/content/guides";
import { INSIGHTS, listInsightsByDate } from "@/content/insights";
import { COUNTRIES, CITIES, IXPS } from "@/data";
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

  lines.push("## Sources");
  lines.push("");
  lines.push(
    `Radar maintains a registered source list of ${SOURCE_REGISTRY.length} entries. See [the full registry](${abs("/sources")}) for tier classifications and last-checked dates.`,
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
