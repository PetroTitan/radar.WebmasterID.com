import Link from "next/link";
import { getDataset } from "@/content/datasets";
import { getIndicator } from "@/content/indicators";
import { getRanking } from "@/content/rankings";
import { getMediaAsset } from "@/content/media";

interface RelatedResearchProps {
  readonly datasetSlugs?: ReadonlyArray<string>;
  readonly indicatorSlugs?: ReadonlyArray<string>;
  readonly rankingSlugs?: ReadonlyArray<string>;
  readonly mapPaths?: ReadonlyArray<string>;
  readonly mediaIds?: ReadonlyArray<string>;
  readonly heading?: string;
}

interface ResolvedLink {
  readonly kind: string;
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly meta?: string;
}

/**
 * Cross-surface "related research" block for guides and entity
 * pages.
 *
 * Resolves dataset / indicator / ranking / map / media references
 * via their respective registries, then groups them into a single
 * navigable list. Unknown references are silently dropped — the
 * validator surfaces unresolved references at build time.
 */
export function RelatedResearch({
  datasetSlugs,
  indicatorSlugs,
  rankingSlugs,
  mapPaths,
  mediaIds,
  heading = "Related research",
}: RelatedResearchProps) {
  const items: ResolvedLink[] = [];

  for (const slug of datasetSlugs ?? []) {
    const d = getDataset(slug);
    if (!d) continue;
    items.push({
      kind: "Dataset",
      href: `/research/datasets/${d.slug}`,
      title: d.title,
      description: d.dek,
      meta: d.status,
    });
  }
  for (const slug of indicatorSlugs ?? []) {
    const ind = getIndicator(slug);
    if (!ind) continue;
    items.push({
      kind: "Indicator",
      href: `/research/indicators/${ind.slug}`,
      title: ind.title,
      description: ind.dek,
    });
  }
  for (const slug of rankingSlugs ?? []) {
    const r = getRanking(slug);
    if (!r) continue;
    items.push({
      kind: "Ranking",
      href: `/research/rankings/${r.slug}`,
      title: r.title,
      description: r.dek,
      meta: r.status,
    });
  }
  for (const path of mapPaths ?? []) {
    items.push({
      kind: "Map",
      href: path,
      title: prettyMapTitle(path),
      description: "Geographic view of the records referenced in this guide.",
    });
  }
  for (const id of mediaIds ?? []) {
    const m = getMediaAsset(id);
    if (!m) continue;
    items.push({
      kind: "Visual",
      href: `/visuals/${m.id}`,
      title: m.title,
      description: m.caption ?? m.altText,
      meta: m.status,
    });
  }

  if (items.length === 0) return null;

  return (
    <section
      data-radar-related-research="true"
      aria-label={heading}
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        {heading} · {items.length}
      </h2>
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li key={`${item.kind}-${item.href}`}>
            <Link
              href={item.href}
              className="group flex flex-col gap-1 px-7 py-5 md:px-9"
            >
              <div className="flex items-baseline gap-3">
                <span className="eyebrow text-accent-600">{item.kind}</span>
                {item.meta ? (
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-300">
                    {item.meta}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 font-display text-h3 font-semibold text-ink-900 transition group-hover:text-accent-700">
                {item.title}
              </p>
              <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function prettyMapTitle(path: string): string {
  const last = path.split("/").filter(Boolean).pop() ?? path;
  return last
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ") + " map";
}
