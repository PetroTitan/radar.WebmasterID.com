import type { TrustTier } from "@/entities";
import { getTrustTierDefinition } from "@/source-registry";

const TIER_STYLE: Readonly<Record<TrustTier, string>> = {
  "tier-1": "border-accent-100 bg-accent-50 text-accent-700",
  "tier-2": "border-accent-100 bg-accent-50 text-accent-600",
  "tier-3": "border-amber-100 bg-amber-50 text-amber-600",
  "tier-4": "border-line bg-surface-subtle text-ink-500",
  unverified: "border-line bg-surface-raised text-ink-500",
};

export function TrustTierBadge({ tier }: { readonly tier: TrustTier }) {
  const def = getTrustTierDefinition(tier);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] font-medium ${TIER_STYLE[tier]}`}
      title={def.description}
    >
      <span className="font-mono uppercase tracking-wide">{tier}</span>
      <span aria-hidden="true" className="opacity-50">·</span>
      <span>{def.label}</span>
    </span>
  );
}
