import Link from "next/link";

interface EmptyIndexStateProps {
  readonly entity: string;
}

/**
 * Rendered on entity index routes (/countries, /cities, /ixps, /cloud)
 * while their data registries are empty. Honest, structural and
 * SEO-safe — never a fabricated list.
 */
export function EmptyIndexState({ entity }: EmptyIndexStateProps) {
  return (
    <section className="rounded-lg border border-graphite-800 bg-graphite-900/40 p-8">
      <h2 className="text-lg font-semibold text-graphite-50">
        Index pending verification
      </h2>
      <p className="mt-3 max-w-prose text-graphite-300">
        Radar publishes {entity} only after editorial review against
        registered tier-1 or tier-2 sources. Entries appear here as
        records pass verification.
      </p>
      <p className="mt-2 max-w-prose text-graphite-400">
        Until then, the structure of the page — its schema, source
        registry and methodology — is published so the criteria are
        public.
      </p>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
        <Link
          href="/methodology"
          className="text-signal-blue-300 hover:text-signal-blue-200"
        >
          Read the methodology →
        </Link>
        <Link
          href="/sources"
          className="text-signal-blue-300 hover:text-signal-blue-200"
        >
          Review the source registry →
        </Link>
      </div>
    </section>
  );
}
