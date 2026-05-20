import Link from "next/link";

interface RelatedItem {
  readonly href: string;
  readonly label: string;
  readonly note?: string;
}

interface RelatedEntitiesProps {
  readonly title: string;
  readonly items: ReadonlyArray<RelatedItem>;
}

export function RelatedEntities({ title, items }: RelatedEntitiesProps) {
  if (items.length === 0) return null;
  return (
    <section className="rounded-lg border border-graphite-800 bg-graphite-900/40 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-eyebrow text-graphite-400">
        {title}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-baseline justify-between gap-3 rounded-md border border-graphite-800/80 bg-graphite-900/60 px-4 py-3 transition hover:border-signal-blue-500/40"
            >
              <span className="font-medium text-graphite-100 group-hover:text-signal-blue-200">
                {item.label}
              </span>
              {item.note ? (
                <span className="text-xs text-graphite-400">{item.note}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
