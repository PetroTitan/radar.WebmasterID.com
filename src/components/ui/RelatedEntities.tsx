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
    <section className="rounded-card border border-line bg-surface-base p-7">
      <h2 className="text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
        {title}
      </h2>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-baseline justify-between gap-3 rounded-md px-3 py-2.5 transition hover:bg-surface-subtle"
            >
              <span className="font-medium text-ink-900">
                {item.label}
              </span>
              {item.note ? (
                <span className="font-mono text-xs uppercase text-ink-500">{item.note}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
