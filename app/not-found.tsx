import Link from "next/link";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="spotlight-beam flex flex-1 items-center justify-center px-4 py-24">
      <div className="relative z-10 max-w-md text-center flex flex-col items-center gap-4 animate-fade-up">
        <span className="font-heading text-6xl sm:text-7xl font-extrabold tracking-tight text-primary-glow text-glow">
          404
        </span>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button
          size="lg"
          className="mt-2"
          render={
            <Link href="/">
              <Home data-icon="inline-start" />
              Go home
            </Link>
          }
        />
      </div>
    </div>
  );
}
