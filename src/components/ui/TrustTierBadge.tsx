import type { TrustTier } from "@/entities";
import { getTrustTierDefinition } from "@/source-registry";

const TIER_STYLE: Readonly<Record<TrustTier, string>> = {
  "tier-1":
    "border-signal-blue-500/40 bg-signal-blue-500/10 text-signal-blue-200",
  "tier-2":
    "border-signal-blue-400/30 bg-signal-blue-400/5 text-signal-blue-300",
  "tier-3":
    "border-signal-orange-500/30 bg-signal-orange-500/5 text-signal-orange-400",
  "tier-4":
    "border-graphite-500/40 bg-graphite-700/40 text-graphite-200",
  unverified:
    "border-graphite-600/60 bg-graphite-800/60 text-graphite-300",
};

export function TrustTierBadge({ tier }: { readonly tier: TrustTier }) {
  const def = getTrustTierDefinition(tier);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${TIER_STYLE[tier]}`}
      title={def.description}
    >
      <span className="font-mono uppercase">{tier}</span>
      <span aria-hidden="true" className="text-graphite-400">·</span>
      <span>{def.label}</span>
    </span>
  );
}
