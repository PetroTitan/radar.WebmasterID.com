import Link from "next/link";
import type { GuideGeographicImportance } from "@/entities";
import { getCountry, getCity, getIxp } from "@/data";

interface GeographicImportanceProps {
  readonly entries: ReadonlyArray<GuideGeographicImportance>;
  readonly heading?: string;
}

interface ResolvedEntry {
  readonly entityRef: string;
  readonly href: string;
  readonly label: string;
  readonly meta?: string;
  readonly kind: "Country" | "City" | "IXP";
  readonly prose: string;
}

function resolveEntry(
  entry: GuideGeographicImportance,
): ResolvedEntry | undefined {
  const [kind, slug] = entry.entityRef.split(":");
  if (!kind || !slug) return undefined;
  if (kind === "country") {
    const c = getCountry(slug);
    return c
      ? {
          entityRef: entry.entityRef,
          href: `/countries/${c.slug}`,
          label: c.name,
          meta: c.code,
          kind: "Country",
          prose: entry.prose,
        }
      : undefined;
  }
  if (kind === "city") {
    const c = getCity(slug);
    return c
      ? {
          entityRef: entry.entityRef,
          href: `/cities/${c.slug}`,
          label: c.name,
          meta: c.countryCode,
          kind: "City",
          prose: entry.prose,
        }
      : undefined;
  }
  if (kind === "ixp") {
    const i = getIxp(slug);
    return i
      ? {
          entityRef: entry.entityRef,
          href: `/ixps/${i.slug}`,
          label: i.name,
          meta: i.countryCode,
          kind: "IXP",
          prose: entry.prose,
        }
      : undefined;
  }
  return undefined;
}

/**
 * Per-entity importance block.
 *
 * Pairs an entity (country / city / IXP) with a short prose
 * paragraph explaining why that entity matters to the guide's
 * subject. Anchors each paragraph to the entity's canonical page
 * so a reader can drill in from the explanation.
 *
 * Semantically marked (`data-radar-geographic-importance`) so AI
 * crawlers can extract the entity-importance pairs without
 * parsing surrounding prose.
 */
export function GeographicImportance({
  entries,
  heading = "Geographic importance",
}: GeographicImportanceProps) {
  const resolved = entries
    .map(resolveEntry)
    .filter((e): e is ResolvedEntry => Boolean(e));
  if (resolved.length === 0) return null;

  return (
    <section
      data-radar-geographic-importance="true"
      aria-label={heading}
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-7 py-5 text-ink-500 md:px-9">
        {heading} · {resolved.length}
      </h2>
      <ol className="divide-y divide-line">
        {resolved.map((entry) => (
          <li key={entry.entityRef} data-radar-geographic-importance-item="true">
            <div className="flex flex-col gap-3 px-7 py-6 md:px-9 md:py-7">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="eyebrow text-accent-600">{entry.kind}</span>
                <Link
                  href={entry.href}
                  className="font-display text-h3 font-semibold text-ink-900 underline decoration-line-strong underline-offset-4 hover:decoration-accent-400 hover:text-accent-700"
                >
                  {entry.label}
                </Link>
                {entry.meta ? (
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-300">
                    {entry.meta}
                  </span>
                ) : null}
              </div>
              <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-700">
                {entry.prose}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
