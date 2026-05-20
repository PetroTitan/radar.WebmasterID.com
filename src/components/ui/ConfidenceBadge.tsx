import type { ConfidenceLevel } from "@/entities";
import { describeConfidence } from "@/lib/confidence";

export function ConfidenceBadge({ level }: { readonly level: ConfidenceLevel }) {
  const { label, description, badgeClass } = describeConfidence(level);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] font-medium ${badgeClass}`}
      title={description}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
