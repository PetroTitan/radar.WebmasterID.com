import type { TrustTier } from "@/entities";

/**
 * Editorial definitions of each trust tier.
 *
 * Anything published on Radar must cite at least one tier-1, tier-2,
 * or tier-3 source. tier-4 is corroborator-only. unverified never
 * appears as the sole basis for a published value.
 */
export interface TrustTierDefinition {
  readonly tier: TrustTier;
  readonly label: string;
  readonly description: string;
}

export const TRUST_TIER_DEFINITIONS: ReadonlyArray<TrustTierDefinition> = [
  {
    tier: "tier-1",
    label: "Standards bodies & registries",
    description:
      "Authoritative registries and standards organisations. The official record for the facts they publish (IANA, ICANN, the RIRs, the ITU).",
  },
  {
    tier: "tier-2",
    label: "Neutral aggregators",
    description:
      "Established, editorially-independent aggregators with documented methodology (PeeringDB, Cloudflare Radar, World Bank Open Data, OECD, Eurostat, TeleGeography).",
  },
  {
    tier: "tier-3",
    label: "Vendor primary docs",
    description:
      "First-party documentation from infrastructure operators (cloud-provider region pages, IXP operator pages). Trusted for self-attested facts about their own infrastructure.",
  },
  {
    tier: "tier-4",
    label: "Secondary reporting",
    description:
      "Industry press and trade publications. Used only as corroborators alongside a tier-1, tier-2, or tier-3 source.",
  },
  {
    tier: "unverified",
    label: "Unverified",
    description:
      "Pending editorial review. Never the sole basis for a published value.",
  },
];

const TIER_INDEX: Readonly<Record<TrustTier, TrustTierDefinition>> = Object.freeze(
  TRUST_TIER_DEFINITIONS.reduce(
    (acc, def) => {
      acc[def.tier] = def;
      return acc;
    },
    {} as Record<TrustTier, TrustTierDefinition>,
  ),
);

export function getTrustTierDefinition(tier: TrustTier): TrustTierDefinition {
  return TIER_INDEX[tier];
}
