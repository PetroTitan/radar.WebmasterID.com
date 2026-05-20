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
    badgeClass:
      "border-signal-blue-500/40 bg-signal-blue-500/10 text-signal-blue-200",
  },
  medium: {
    label: "Medium confidence",
    description:
      "Single tier-1/2 source, or multiple tier-3 sources, with no contradictions.",
    badgeClass:
      "border-signal-orange-500/40 bg-signal-orange-500/10 text-signal-orange-400",
  },
  low: {
    label: "Low confidence",
    description:
      "Best-available estimate. Sources disagree, are stale, or rely on tier-4 corroborators.",
    badgeClass:
      "border-graphite-500/40 bg-graphite-700/40 text-graphite-200",
  },
  unverified: {
    label: "Unverified",
    description:
      "Editorial review pending. No values are published until verification completes.",
    badgeClass:
      "border-graphite-600/60 bg-graphite-800/60 text-graphite-300",
  },
};

export function describeConfidence(level: ConfidenceLevel): ConfidenceDescriptor {
  return TABLE[level];
}
