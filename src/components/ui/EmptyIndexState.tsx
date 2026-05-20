import Link from "next/link";

interface EmptyIndexStateProps {
  readonly entity: string;
}

/**
 * Rendered on entity index routes while their data registries are
 * empty. Honest, structural and SEO-safe — never a fabricated list.
 */
export function EmptyIndexState({ entity }: EmptyIndexStateProps) {
  return (
    <section className="rounded-card border border-line bg-surface-subtle p-10">
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
        Pending verification
      </p>
      <h2 className="mt-3 font-display text-h2 font-semibold text-ink-900">
        Index pending verification
      </h2>
      <p className="mt-4 max-w-prose leading-relaxed text-ink-700">
        Radar publishes {entity} only after editorial review against registered
        tier-1 or tier-2 sources. Entries appear here as records pass verification.
      </p>
      <p className="mt-3 max-w-prose leading-relaxed text-ink-500">
        Until then, the structure of the page — its schema, source registry and
        methodology — is published so the criteria are public.
      </p>
      <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium">
        <Link
          href="/methodology"
          className="text-accent-600 hover:text-accent-700"
        >
          Read the methodology →
        </Link>
        <Link
          href="/sources"
          className="text-accent-600 hover:text-accent-700"
        >
          Review the source registry →
        </Link>
      </div>
    </section>
  );
}
