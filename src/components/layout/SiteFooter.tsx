import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/content/navigation";
import { SITE } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-surface-subtle">
      <Container as="div" className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink-500">
            {SITE.description}
          </p>
          <p className="mt-6 text-xs text-ink-300">
            Part of{" "}
            <a
              href={SITE.organization.url}
              className="text-ink-500 underline decoration-line-strong underline-offset-2 hover:text-ink-700"
            >
              {SITE.organization.name}
            </a>
            .
          </p>
        </div>
        <FooterColumn label="Explore" items={PRIMARY_NAV} className="md:col-span-3" />
        <FooterColumn label="Platform" items={SECONDARY_NAV} className="md:col-span-2" />
        <div className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
            Editorial
          </p>
          <p className="mt-4 text-sm text-ink-500">
            Radar publishes verified facts only. Where data is absent,
            see <Link href="/methodology" className="text-accent-600 hover:text-accent-700">our methodology</Link>.
          </p>
        </div>
      </Container>
      <div className="border-t border-line/70">
        <Container
          as="div"
          className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-ink-500 md:flex-row md:items-center"
        >
          <p>© {year} {SITE.organization.name}. All rights reserved.</p>
          <p>
            Source-governed digital infrastructure intelligence.
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  items,
  className = "",
}: {
  readonly label: string;
  readonly items: ReadonlyArray<{ readonly label: string; readonly href: string }>;
  readonly className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-500">
        {label}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-ink-700 hover:text-ink-900">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
