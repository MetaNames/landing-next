"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { Home, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="spotlight-beam flex flex-1 items-center justify-center px-4 py-24">
      <div className="relative z-10 max-w-md text-center flex flex-col items-center gap-4 animate-fade-up">
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground">
          We hit an unexpected error. Try again, or head back home.
        </p>
        {error?.digest && (
          <p className="font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Button size="lg" onClick={reset}>
            <RotateCw data-icon="inline-start" />
            Try again
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={
              <Link href="/">
                <Home data-icon="inline-start" />
                Home
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
}
