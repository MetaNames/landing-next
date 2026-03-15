import { LoadingSkeleton, StatsSkeleton } from "@/components/ui/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-700 to-indigo-900" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <LoadingSkeleton className="h-16 md:h-24 w-64 md:w-96 mx-auto rounded-lg" />
          <LoadingSkeleton className="h-6 w-48 mx-auto rounded" />
          <LoadingSkeleton className="h-10 w-80 mx-auto rounded" />
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="bg-secondary py-12 md:py-20 px-4">
        <div className="max-w-[1280px] mx-auto text-center space-y-8">
          <LoadingSkeleton className="h-12 w-64 mx-auto rounded" />
          <StatsSkeleton />
        </div>
      </section>

      {/* Recent domains skeleton */}
      <section className="bg-primary py-12 md:py-20 px-4">
        <div className="max-w-[1280px] mx-auto text-center space-y-6">
          <LoadingSkeleton className="h-12 w-48 mx-auto rounded" />
          <LoadingSkeleton className="h-6 w-64 mx-auto rounded" />
          <LoadingSkeleton className="h-32 w-full max-w-4xl mx-auto rounded-2xl" />
        </div>
      </section>
    </div>
  );
}
