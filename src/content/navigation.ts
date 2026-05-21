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
  { label: "Facilities", href: "/facilities", description: "Datacenter facility identity records." },
  { label: "Guides", href: "/guides", description: "Authority reference guides." },
  { label: "Research", href: "/research", description: "Datasets, indicators, rankings." },
];

export const SECONDARY_NAV: ReadonlyArray<NavLink> = [
  { label: "History", href: "/history" },
  { label: "Insights", href: "/insights" },
  { label: "Methodology", href: "/methodology" },
  { label: "Sources", href: "/sources" },
  { label: "Visuals", href: "/visuals" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
];
