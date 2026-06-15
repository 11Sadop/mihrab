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
      return await res.json();
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
      return await res.json();
    },
  });
}

// Daily Hadith Hook - Auto-refreshes at midnight
export function useDailyHadith() {
  // Calculate milliseconds until midnight so it auto-refreshes each new day
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const msUntilMidnight = midnight.getTime() - now.getTime();

  return useQuery({
    queryKey: [api.hadith.daily.path],
    queryFn: async () => {
      const res = await fetch(api.hadith.daily.path);
      if (!res.ok) throw new Error("Failed to fetch daily hadith");
      return await res.json();
    },
    staleTime: msUntilMidnight, // يتحدث تلقائي عند منتصف الليل
    gcTime: 1000 * 60 * 60 * 24,
  });
}

// Manual Refresh Hook - يستدعي POST /api/hadith/refresh ويعطي حديث عشوائي مختلف
export function useManualHadithRefresh() {
  const queryClient = useQueryClient();
  return async () => {
    try {
      const res = await fetch(api.hadith.refresh.path, { method: "POST" });
      if (res.ok) {
        const newHadith = await res.json();
        // حدّث الكاش مباشرة بالحديث الجديد
        queryClient.setQueryData([api.hadith.daily.path], newHadith);
      }
    } catch (e) {
      // fallback: أعد جلب الحديث اليومي
      await queryClient.invalidateQueries({ queryKey: [api.hadith.daily.path] });
    }
  };
}
