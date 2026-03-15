import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface DomainStats {
  name: string;
  createdAt: string;
}

export interface Stats {
  domainCount: number;
  ownerCount: number;
  recentDomains: DomainStats[];
}

const STALE_TIME = 30_000; // 30 seconds
const REFETCH_INTERVAL = 60_000; // 60 seconds

export const useStats = () => {
  const { 
    data: stats, 
    isLoading,
    isError,
    error,
    refetch,
    isFetching 
  } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats", {
        next: { revalidate: 60 },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`);
      }
      
      return response.json();
    },
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  return { 
    stats, 
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    // Convenience getters
    domainCount: stats?.domainCount ?? 0,
    ownerCount: stats?.ownerCount ?? 0,
    recentDomains: stats?.recentDomains ?? [],
  };
};
