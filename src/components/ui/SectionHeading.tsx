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
    <div className="max-w-prose">
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-eyebrow text-signal-orange-400">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-balance text-2xl font-semibold text-graphite-50 md:text-3xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-3 text-graphite-300 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
