"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";
import { FaHome, FaRedo } from "react-icons/fa";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            💥
          </h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-white/60 mb-8">
            We encountered an unexpected error. Please try again or return home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              variant="primary"
              icon={<FaRedo />}
            >
              Try Again
            </Button>
            <a href="/">
              <Button
                variant="secondary"
                icon={<FaHome />}
              >
                Go Home
              </Button>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
