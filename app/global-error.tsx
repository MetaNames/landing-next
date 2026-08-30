"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  // A global error replaces the root layout, so the theme tokens in
  // globals.css are not available here: the colours are inlined instead.
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body
        style={{
          minHeight: "100vh",
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(240 22% 3%)",
          color: "hsl(240 20% 94%)",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{ maxWidth: "28rem", padding: "0 1rem", textAlign: "center" }}
        >
          <h1
            style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.75rem" }}
          >
            Something went wrong
          </h1>
          <p style={{ color: "hsl(240 11% 60%)", margin: "0 0 1.5rem" }}>
            We encountered an unexpected error. Please try again or return home.
          </p>
          <button
            onClick={reset}
            style={{
              background: "hsl(249 91% 63%)",
              color: "#fff",
              border: 0,
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
