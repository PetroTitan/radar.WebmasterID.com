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
        <p className="text-xs font-medium uppercase tracking-eyebrow text-graphite-400">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-2 text-lg font-semibold text-graphite-50">{title}</h3>
      <p className="mt-2 text-sm text-graphite-300">{description}</p>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block rounded-lg border border-graphite-800 bg-graphite-900/60 p-6 transition hover:border-signal-blue-500/40 hover:bg-graphite-900/80"
      >
        {body}
      </Link>
    );
  }

  return (
    <article className="rounded-lg border border-graphite-800 bg-graphite-900/60 p-6">
      {body}
    </article>
  );
}
