import type { ReactNode } from "react";

interface EntitySectionProps {
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
}

/**
 * Layout helper for entity-page sub-sections.
 *
 * Every entity page (country, city, IXP) follows the same rhythm:
 * an H2 title, an optional muted description, and a body block.
 * Wrapping that shape in one component keeps the visual cadence
 * identical across routes and removes copy-pasted spacing values.
 */
export function EntitySection({
  title,
  description,
  children,
}: EntitySectionProps) {
  return (
    <section className="mt-14 md:mt-20">
      <h2 className="font-display text-h2 font-semibold text-ink-900">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-500">
          {description}
        </p>
      ) : null}
      <div className="mt-7">{children}</div>
    </section>
  );
}
