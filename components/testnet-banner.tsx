import { FlaskConical } from "lucide-react";

import { config } from "@/lib/config";
import routes from "@/constants/routes";

/**
 * Renders nothing in production. On a testnet deployment it makes the
 * environment obvious, so nobody mistakes a test registration for a real one.
 */
export function TestnetBanner() {
  if (!config.isTestnet) return null;

  return (
    <div className="border-b border-border/60 bg-primary/10 px-4 py-2 text-center text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
        Testnet — names registered here are not real.{" "}
        <a
          href={routes.app.path}
          className="focus-ring underline underline-offset-4"
        >
          Open the app
        </a>
      </span>
    </div>
  );
}
