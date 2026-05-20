import type { ConfidenceLevel } from "@/entities";

interface ConfidenceDescriptor {
  readonly label: string;
  readonly description: string;
  /** Tailwind classes for the small badge pill. */
  readonly badgeClass: string;
}

const TABLE: Readonly<Record<ConfidenceLevel, ConfidenceDescriptor>> = {
  high: {
    label: "High confidence",
    description:
      "Multiple tier-1 or tier-2 sources agree on the published values.",
    badgeClass: "border-accent-100 bg-accent-50 text-accent-700",
  },
  medium: {
    label: "Medium confidence",
    description:
      "Single tier-1/2 source, or multiple tier-3 sources, with no contradictions.",
    badgeClass: "border-amber-100 bg-amber-50 text-amber-600",
  },
  low: {
    label: "Low confidence",
    description:
      "Best-available estimate. Sources disagree, are stale, or rely on tier-4 corroborators.",
    badgeClass: "border-line bg-surface-subtle text-ink-500",
  },
  unverified: {
    label: "Unverified",
    description:
      "Editorial review pending. No values are published until verification completes.",
    badgeClass: "border-line bg-surface-raised text-ink-500",
  },
};

export function describeConfidence(level: ConfidenceLevel): ConfidenceDescriptor {
  return TABLE[level];
}
