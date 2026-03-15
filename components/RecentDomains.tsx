"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

import routes from "@/constants/routes";
import { useStats } from "@/hooks/useStats";

function formatCreatedAt(date: string) {
  const parsed = new Date(date);
  return formatDistanceToNow(parsed, { addSuffix: true });
}

const RecentDomains = () => {
  const router = useRouter();
  const { stats } = useStats();

  const handleKeyDown = (e: React.KeyboardEvent, domain: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`${routes.domains.path}/${domain}`);
    }
  };

  return (
    <div 
      className="relative flex items-center overflow-hidden"
      role="region"
      aria-label="Recently registered domains"
    >
      <div className="relative flex w-full py-5">
        <div 
          className="flex w-max animate-marquee [--duration:25s] hover:[animation-play-state:paused]"
          role="list"
        >
          {stats?.recentDomains.map((item, index) => (
            <div
              key={index}
              className="h-full px-3"
              role="listitem"
            >
              <div
                className="group relative h-full w-[26rem] cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/20"
                onClick={() => router.push(`${routes.domains.path}/${item.name}`)}
                onKeyDown={(e) => handleKeyDown(e, item.name)}
                tabIndex={0}
                role="button"
                aria-label={`View domain ${item.name}, registered ${formatCreatedAt(item.createdAt)}`}
              >
                <div className="flex h-full flex-col justify-between px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-lg tracking-wide group-hover:text-purple-200 transition-colors">
                      {item.name}
                    </span>
                    <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-200 opacity-0 transition-opacity group-hover:opacity-100">
                      .mpc
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      {formatCreatedAt(item.createdAt)}
                    </span>
                    <motion.span
                      className="text-white/40 group-hover:text-white transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { RecentDomains };
