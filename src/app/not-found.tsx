import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container as="section" className="py-section-y">
      <p className="eyebrow text-accent-600">404</p>
      <h1 className="mt-6 text-balance font-display text-hero font-semibold text-ink-900">
        Record not found.
      </h1>
      <p className="mt-7 max-w-prose text-lead text-ink-500">
        The page you requested is not in the knowledge graph. It may have been
        renamed, or the underlying entity has not yet passed editorial review.
      </p>
      <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">
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
