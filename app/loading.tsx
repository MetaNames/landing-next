import { Skeleton } from "@/components/ui/skeleton";
import {
  RecentDomainsSkeleton,
  StatsSkeleton,
} from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="spotlight-beam flex flex-col items-center gap-8 py-16 sm:py-24 w-full">
        <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-3xl px-4">
          <Skeleton className="h-6 w-56 rounded-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-5 w-72" />
          <Skeleton className="h-9 w-36 rounded-lg" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border/60 bg-card/40 py-16 sm:py-20">
        <div className="container mx-auto px-4 flex flex-col items-center gap-6">
          <Skeleton className="h-10 w-72" />
          <StatsSkeleton />
        </div>
      </section>

      {/* Recent domains */}
      <section className="border-t border-border/60 py-16 sm:py-20">
        <div className="container mx-auto flex flex-col items-center gap-6">
          <Skeleton className="h-10 w-56" />
          <RecentDomainsSkeleton />
        </div>
      </section>
    </div>
  );
}
