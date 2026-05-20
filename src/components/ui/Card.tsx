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
 *
 * The hover affordance is intentionally restrained: a soft border
 * tone shift plus a faint shadow, no transform. The "Explore →"
 * indicator stays muted by default and lights up on hover.
 */
export function Card({ title, description, href, eyebrow, footer }: CardProps) {
  const body = (
    <>
      {eyebrow ? (
        <p className="eyebrow text-ink-500">{eyebrow}</p>
      ) : null}
      <h3 className="mt-3.5 font-display text-h3 font-semibold text-ink-900">
        {title}
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">
        {description}
      </p>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col justify-between gap-7 rounded-card border border-line bg-surface-base p-7 transition hover:border-line-strong hover:shadow-card-hover sm:p-8"
      >
        <div>{body}</div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition group-hover:gap-2.5 group-hover:text-accent-600">
          Explore <span aria-hidden="true">→</span>
        </span>
      </Link>
    );
  }

  return (
    <article className="rounded-card border border-line bg-surface-base p-7 sm:p-8">
      {body}
    </article>
  );
}
