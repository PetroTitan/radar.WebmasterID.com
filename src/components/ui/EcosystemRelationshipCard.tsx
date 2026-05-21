import Link from "next/link";

interface EcosystemRelationshipCardProps {
  readonly heading: string;
  readonly items: ReadonlyArray<{
    readonly href: string;
    readonly label: string;
    readonly note?: string;
  }>;
  readonly emptyNote?: string;
}

/**
 * Compact relationship card for ecosystem graph surfaces.
 *
 * Distinct from `RelatedEntities` in that the layout is a
 * single-column list with a heading badge and an optional
 * empty-state note rather than a paragraph fallback. Used on
 * facility, IXP, and city detail pages to surface the linked
 * pieces of the metro's ecosystem.
 */
export function EcosystemRelationshipCard({
  heading,
  items,
  emptyNote,
}: EcosystemRelationshipCardProps) {
  return (
    <section
      data-radar-ecosystem-card="true"
      aria-label={heading}
      className="rounded-card border border-line bg-surface-base"
    >
      <h2 className="eyebrow border-b border-line px-6 py-4 text-ink-500 md:px-7">
        {heading} {items.length > 0 ? `· ${items.length}` : null}
      </h2>
      {items.length === 0 ? (
        <p className="px-6 py-5 text-[0.9375rem] italic text-ink-500 md:px-7">
          {emptyNote ?? "No related entries yet."}
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-baseline justify-between gap-3 px-6 py-4 md:px-7"
              >
                <span className="font-medium text-ink-900 transition group-hover:text-accent-700">
                  {item.label}
                </span>
                {item.note ? (
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-300">
                    {item.note}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
