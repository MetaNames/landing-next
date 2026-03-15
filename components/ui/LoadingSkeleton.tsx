"use client";

import { motion } from "framer-motion";

const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-white/10 rounded-lg ${className}`} />
);

const StatsSkeleton = () => (
  <motion.div 
    className="flex justify-between gap-4 md:flex-row flex-col mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl justify-center min-w-full md:min-w-[30%]"
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <LoadingSkeleton className="h-10 w-20 rounded" />
          <LoadingSkeleton className="h-4 w-28 rounded" />
        </div>
      </div>
    ))}
  </motion.div>
);

const DomainCardSkeleton = () => (
  <div className="h-full px-3">
    <div className="h-full w-[26rem] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-5">
      <div className="flex justify-between">
        <LoadingSkeleton className="h-6 w-32 rounded" />
        <LoadingSkeleton className="h-5 w-12 rounded-full" />
      </div>
      <div className="mt-4">
        <LoadingSkeleton className="h-4 w-24 rounded" />
      </div>
    </div>
  </div>
);

export { LoadingSkeleton, StatsSkeleton, DomainCardSkeleton };
