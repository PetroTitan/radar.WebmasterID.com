import type { ReactNode } from "react";

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: ReactNode;
  readonly level?: 2 | 3;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className="max-w-editorial">
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-accent-600">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-balance font-display text-display font-semibold text-ink-900">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-500">
          {description}
        </p>
      ) : null}
    </div>
  );
}
