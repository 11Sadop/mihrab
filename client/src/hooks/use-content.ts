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
      // Use daily endpoint for consistent result throughout the day
      const res = await fetch(api.hadith.daily.path);
      if (!res.ok) throw new Error("Failed to fetch daily hadith");
      return api.hadith.daily.responses[200].parse(await res.json());
    },
    staleTime: 1000 * 60 * 60, // 1 hour cache
    gcTime: 1000 * 60 * 60 * 24, // 24 hours cache
  });
}

// Manual Refresh Hook
export function useManualHadithRefresh() {
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.invalidateQueries({ queryKey: [api.hadith.daily.path] });
  };
}
