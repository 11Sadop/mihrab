import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Adhkar Hooks
export function useAdhkar(category?: string) {
  return useQuery({
    queryKey: [api.adhkar.list.path, category],
    queryFn: async () => {
      const url = category
        ? `${api.adhkar.list.path}?category=${category}`
        : api.adhkar.list.path;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch adhkar");
      return api.adhkar.list.responses[200].parse(await res.json());
    },
  });
}

// Duas Hooks
export function useDuas(category?: string) {
  return useQuery({
    queryKey: [api.duas.list.path, category],
    queryFn: async () => {
      const url = category
        ? `${api.duas.list.path}?category=${category}`
        : api.duas.list.path;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch duas");
      return api.duas.list.responses[200].parse(await res.json());
    },
  });
}

// Daily Hadith Hook - Refreshes on each page load
export function useDailyHadith() {
  return useQuery({
    queryKey: [api.hadith.daily.path],
    queryFn: async () => {
      // Use refresh endpoint to get a different hadith on each load
      const res = await fetch(api.hadith.refresh.path, {
        method: 'POST',
        cache: 'no-store'
      });
      if (!res.ok) throw new Error("Failed to fetch daily hadith");
      return api.hadith.daily.responses[200].parse(await res.json());
    },
    staleTime: 0, // Always refetch on page load
    gcTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// Manual Refresh Hook
export function useManualHadithRefresh() {
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.invalidateQueries({ queryKey: [api.hadith.daily.path] });
  };
}
