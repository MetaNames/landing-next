"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import routes from "@/constants/routes";
import { useStats } from "@/hooks/useStats";

function formatCreatedAt(date: string) {
  const parsed = new Date(date);
  return formatDistanceToNow(parsed, { addSuffix: true });
}

const RecentDomains = () => {
  const router = useRouter();
  const { stats } = useStats();

  return (
    <div className="relative flex items-center overflow-hidden">
      <div className="relative flex w-full py-5">
        <div className="flex w-max animate-marquee [--duration:25s] hover:[animation-play-state:paused]">
          {stats?.recentDomains.map((item, index) => (
            <div
              key={index}
              className="h-full px-2.5 cursor-pointer"
              onClick={() => router.push(`${routes.domains.path}/${item.name}`)}
            >
              <div className="relative h-full w-[28rem] rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 px-8 py-6">
                <div className="pb-4 font-normal text-white">{item.name}</div>

                <div className="font-light text-white/75 text-sm">
                  {formatCreatedAt(item.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { RecentDomains };
