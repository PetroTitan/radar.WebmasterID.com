export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
}

export const PRIMARY_NAV: ReadonlyArray<NavLink> = [
  { label: "Countries", href: "/countries", description: "Sovereign infrastructure jurisdictions." },
  { label: "Cities", href: "/cities", description: "Infrastructure hub metros." },
  { label: "Maps", href: "/maps", description: "Geographic intelligence layer." },
  { label: "Cloud", href: "/cloud", description: "Provider region directories." },
  { label: "IXPs", href: "/ixps", description: "Internet Exchange Points." },
  { label: "Guides", href: "/guides", description: "Authority reference guides." },
  { label: "Insights", href: "/insights", description: "Editorial infrastructure explainers." },
  { label: "Rankings", href: "/rankings", description: "Source-cited comparative rankings." },
];

export const SECONDARY_NAV: ReadonlyArray<NavLink> = [
  { label: "Methodology", href: "/methodology" },
  { label: "Sources", href: "/sources" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
];
