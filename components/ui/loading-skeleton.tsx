import { Skeleton } from "@/components/ui/skeleton";

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="glass-panel rounded-2xl p-6 flex flex-col gap-2 items-center justify-center"
        >
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

export function DomainCardSkeleton() {
  return (
    <div className="h-full px-2">
      <div className="glass-panel w-[20rem] rounded-2xl px-5 py-4 flex flex-col gap-4">
        <div className="flex justify-between gap-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function RecentDomainsSkeleton() {
  return (
    <div className="flex w-full overflow-hidden py-4" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <DomainCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GeneratorSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-28 w-full rounded-2xl" />
    </div>
  );
}

export function PricingSkeleton() {
  return (
    <div
      className="grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-3"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="glass-panel flex flex-col items-center gap-2 rounded-2xl px-4 py-6"
        >
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}
