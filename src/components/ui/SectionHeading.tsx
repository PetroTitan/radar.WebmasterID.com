import type { ReactNode } from "react";

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: ReactNode;
  readonly level?: 2 | 3;
  /** Optional CTA placed to the right on desktop, below the heading
   *  on mobile. Used for "view all →" links. */
  readonly trailing?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
  trailing,
}: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
      <div className="max-w-editorial">
        {eyebrow ? (
          <p className="eyebrow mb-5 text-accent-600">{eyebrow}</p>
        ) : null}
        <Heading className="text-balance font-display text-display font-semibold text-ink-900">
          {title}
        </Heading>
        {description ? (
          <p className="mt-5 max-w-prose text-lead text-ink-500">
            {description}
          </p>
        ) : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}
