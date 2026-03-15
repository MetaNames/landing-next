"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>
        <p className="text-white/70 text-lg mb-8">
          Something went wrong. We're working on fixing it.
        </p>
        
        {error?.digest && (
          <p className="text-white/40 text-sm mb-8">
            Error ID: {error.digest}
          </p>
        )}
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            variant="primary"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="secondary"
              icon={<FaHome />}
            >
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
