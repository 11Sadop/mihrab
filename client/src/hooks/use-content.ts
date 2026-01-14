import { useQuery } from "@tanstack/react-query";
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

// Daily Hadith Hook - Caches for 24 hours, only refresh manually
const HADITH_CACHE_KEY = "daily_hadith_cache";
const HADITH_CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in ms

interface CachedHadith {
  data: any;
  timestamp: number;
}

function getCachedHadith(): CachedHadith | null {
  try {
    const cached = localStorage.getItem(HADITH_CACHE_KEY);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

function setCachedHadith(data: any) {
  try {
    localStorage.setItem(HADITH_CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch {
    // Ignore storage errors
  }
}

export function useDailyHadith() {
  return useQuery({
    queryKey: [api.hadith.daily.path],
    queryFn: async () => {
      // Check localStorage cache first
      const cached = getCachedHadith();
      if (cached && (Date.now() - cached.timestamp) < HADITH_CACHE_EXPIRY) {
        return cached.data;
      }

      // Fetch new hadith
      const res = await fetch(api.hadith.daily.path);
      if (!res.ok) throw new Error("Failed to fetch daily hadith");
      const data = api.hadith.daily.responses[200].parse(await res.json());

      // Cache the result
      setCachedHadith(data);
      return data;
    },
    staleTime: HADITH_CACHE_EXPIRY, // 24 hours
    gcTime: HADITH_CACHE_EXPIRY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// Manual refresh function for Daily Hadith
export async function refreshDailyHadith() {
  try {
    const res = await fetch(api.hadith.refresh.path, { method: 'POST' });
    if (!res.ok) throw new Error("Failed to refresh hadith");
    const data = await res.json();
    setCachedHadith(data);
    return data;
  } catch (error) {
    throw error;
  }
}

