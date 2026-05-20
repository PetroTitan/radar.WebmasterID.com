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
    <section className="rounded-card border border-line bg-surface-base p-7 sm:p-8">
      <h2 className="eyebrow text-ink-500">{title}</h2>
      <ul className="mt-6 divide-y divide-line/60">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-baseline justify-between gap-3 py-3 transition first:pt-0 last:pb-0 hover:text-accent-700"
            >
              <span className="text-[0.95rem] font-medium text-ink-900 group-hover:text-accent-700">
                {item.label}
              </span>
              {item.note ? (
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-500">
                  {item.note}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
