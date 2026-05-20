import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/content/navigation";
import { SITE } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-graphite-800/80 bg-graphite-950/85 backdrop-blur">
      <Container as="div" className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-graphite-50"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-7 items-center justify-center rounded-md bg-signal-blue-500/15 text-signal-blue-300"
          >
            <span className="size-2 rounded-sm bg-signal-orange-500" />
          </span>
          <span>{SITE.name}</span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center gap-6 md:flex"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-graphite-300 hover:text-graphite-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-graphite-400 hover:text-graphite-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  );
}
