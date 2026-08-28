import { EXTERNAL_LINKS } from "@/lib/constants";
import routes from "@/constants/routes";

const links = [
  { label: "App", href: routes.app.path },
  { label: "Docs", href: EXTERNAL_LINKS.DOCS },
  { label: "Telegram", href: EXTERNAL_LINKS.TELEGRAM },
  { label: "Twitter", href: EXTERNAL_LINKS.TWITTER },
  { label: "GitHub", href: EXTERNAL_LINKS.GITHUB },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border/60 mt-auto py-6 relative z-10"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-3">
        <nav
          className="flex flex-wrap gap-4 justify-center font-mono"
          aria-label="Footer navigation"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {currentYear} MetaNames
        </p>
      </div>
    </footer>
  );
}
