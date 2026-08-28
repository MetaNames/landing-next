"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ExternalLink, Menu, X } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#recent", label: "Recent" },
  { href: "#generator", label: "Generator" },
  { href: "#sdk", label: "SDK" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="border-b border-border/60 sticky top-0 z-50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex items-center gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Button
            size="lg"
            className="hidden sm:inline-flex"
            render={
              <a href={routes.app.path}>
                Launch App
                <ExternalLink data-icon="inline-end" />
              </a>
            }
          />
          <button
            onClick={toggleMobileMenu}
            className="focus-ring p-2 hover:bg-muted rounded-md transition-colors md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={closeMobileMenu}
              >
                {label}
              </Link>
            ))}
            <Button
              size="lg"
              className="sm:hidden"
              render={
                <a href={routes.app.path} onClick={closeMobileMenu}>
                  Launch App
                  <ExternalLink data-icon="inline-end" />
                </a>
              }
            />
          </nav>
        </div>
      )}
    </header>
  );
}
