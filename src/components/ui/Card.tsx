import type { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  readonly title: string;
  readonly description: string;
  readonly href?: string;
  readonly eyebrow?: string;
  readonly footer?: ReactNode;
}

/**
 * Compact entity / topic card used on index pages and the homepage.
 * When `href` is supplied the entire card is the link target.
 */
export function Card({ title, description, href, eyebrow, footer }: CardProps) {
  const body = (
    <>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col rounded-card border border-line bg-surface-base p-7 transition hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card-hover"
      >
        {body}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 transition group-hover:gap-2.5">
          Explore <span aria-hidden="true">→</span>
        </span>
      </Link>
    );
  }

  return (
    <article className="rounded-card border border-line bg-surface-base p-7">
      {body}
    </article>
  );
}
