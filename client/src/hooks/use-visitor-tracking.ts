import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { apiRequest } from "@/lib/queryClient";

export function useVisitorTracking() {
  const hasTracked = useRef(false);

  const { mutate: trackVisit } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/stats/track");
      return res.json();
    },
  });

  const { data: visitorData } = useQuery<{ count: number }>({
    queryKey: ["/api/stats/visitors"],
  });

  useEffect(() => {
    const storageKey = "mihrab_unique_visitor";
    const isTracked = localStorage.getItem(storageKey);
    
    if (!isTracked && !hasTracked.current) {
      hasTracked.current = true;
      trackVisit();
      localStorage.setItem(storageKey, "true");
    }
  }, [trackVisit]);

  return { visitorCount: visitorData?.count || 0 };
}

export function usePageTracking(pageName: string) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    const trackPage = async () => {
      try {
        await apiRequest("POST", "/api/stats/page-visit", { page: pageName });
      } catch (e) {
      }
    };
    trackPage();
  }, [pageName]);
}
