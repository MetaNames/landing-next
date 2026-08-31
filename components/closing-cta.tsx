import { ArrowRight, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

/**
 * The page's last word. Everything above it is explanation; a visitor who read
 * to the bottom should not have to scroll back to the hero to act, so the two
 * things they can do — search a name, open the app — are repeated here.
 */
export function ClosingCta() {
  return (
    <section
      id="claim"
      className="w-full border-t border-border/60 py-16 sm:py-20 relative"
      aria-labelledby="claim-title"
    >
      <div className="container mx-auto px-4">
        <div className="glass-panel mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl px-6 py-10 text-center sm:px-10">
          <h2
            id="claim-title"
            className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-balance"
          >
            Claim your name
          </h2>
          <p className="max-w-xl text-muted-foreground text-balance">
            Names are first come, first served. Take yours before someone else
            does — a year of ownership, one transaction, no renewals to think
            about until next year.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              size="lg"
              render={
                <a href="#hero">
                  Search a name
                  <ArrowRight data-icon="inline-end" />
                </a>
              }
            />
            <Button
              size="lg"
              variant="outline"
              render={
                <a href={routes.app.path}>
                  Launch the app
                  <ExternalLink data-icon="inline-end" />
                </a>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
