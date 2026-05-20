import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/content/navigation";
import { SITE } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="mt-24 border-t border-graphite-800 bg-graphite-950/80">
      <Container as="div" className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-semibold text-graphite-50">{SITE.name}</p>
          <p className="mt-2 max-w-prose text-sm text-graphite-400">
            {SITE.description}
          </p>
          <p className="mt-4 text-xs text-graphite-500">
            Part of{" "}
            <a
              href={SITE.organization.url}
              className="underline decoration-graphite-600 underline-offset-2 hover:text-graphite-200"
            >
              {SITE.organization.name}
            </a>
            .
          </p>
        </div>
        <FooterColumn label="Explore" items={PRIMARY_NAV} />
        <FooterColumn label="Platform" items={SECONDARY_NAV} />
      </Container>
      <div className="border-t border-graphite-800/70">
        <Container
          as="div"
          className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-graphite-500 md:flex-row md:items-center"
        >
          <p>© {year} {SITE.organization.name}. All rights reserved.</p>
          <p>
            Radar publishes verified facts only. Where data is absent,
            see <Link href="/methodology" className="underline decoration-graphite-700 hover:text-graphite-300">our methodology</Link>.
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  items,
}: {
  readonly label: string;
  readonly items: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-graphite-500">
        {label}
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-graphite-300 hover:text-graphite-50">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
