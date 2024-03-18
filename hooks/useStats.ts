import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Vercel Edge Runtime
export const runtime = 'edge'
export const useStats = () => {
  const { data: stats, ...rest } = useQuery<{
    domainCount: number;
    ownerCount: number;
    recentDomains: { name: string; createdAt: string }[];
  }>({
    queryKey: ["stats"],
    queryFn: () => fetch("/api/stats").then((res) => res.json()),
    placeholderData: keepPreviousData,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  return { stats, ...rest };
};
