import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container as="section" className="py-24">
      <p className="text-xs font-medium uppercase tracking-eyebrow text-accent-600">
        404
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold text-ink-900 md:text-5xl">
        Record not found.
      </h1>
      <p className="mt-5 max-w-prose text-ink-700">
        The page you requested is not in the knowledge graph. It may have been
        renamed, or the underlying entity has not yet passed editorial review.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
        <Link href="/" className="text-accent-600 hover:text-accent-700">
          Return to Radar →
        </Link>
        <Link
          href="/methodology"
          className="text-accent-600 hover:text-accent-700"
        >
          Read the methodology →
        </Link>
      </div>
    </Container>
  );
}
