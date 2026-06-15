import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { schedulePrayerNotificationsInSW } from "./use-notifications";

// Types for Aladhan API
interface PrayerTimesData {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    [key: string]: string;
  };
  date: {
    readable: string;
    hijri: {
      day: string;
      month: { en: string; ar: string };
      year: string;
      weekday: { en: string; ar: string };
    };
  };
  meta: {
    method: { name: string };
  };
}

interface AladhanResponse {
  code: number;
  status: string;
  data: PrayerTimesData;
}

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

// Arabic prayer names mapping
const prayerNamesArabic: { [key: string]: string } = {
  Fajr: "صلاة الفجر",
  Sunrise: "الشروق",
  Dhuhr: "صلاة الظهر",
  Asr: "صلاة العصر",
  Maghrib: "صلاة المغرب",
  Isha: "صلاة العشاء"
};

// Normalize time string (strip timezone and seconds)
function normalizeTime(time: string): string {
  return time.replace(/\s*\([^)]*\)$/, '').split(':').slice(0, 2).join(':');
}

// Convert 24-hour time to 12-hour Arabic format
function formatTo12Hour(time24: string): string {
  const normalized = normalizeTime(time24);
  const [hours, minutes] = normalized.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return time24;
  const period = hours >= 12 ? 'م' : 'ص';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Helper to get next prayer
export function getNextPrayer(timings: PrayerTimesData['timings']) {
  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const IQAMA_OFFSETS: Record<string, number> = {
    Fajr: 20,
    Dhuhr: 15,
    Asr: 15,
    Maghrib: 10,
    Isha: 15
  };

  // Find if we are currently in an Iqamah window for any prayer today
  let activeIqamaPrayer: string | null = null;
  let activeIqamaRemaining: number | null = null;

  for (const prayer of prayers) {
    const normalized = normalizeTime(timings[prayer]);
    const [hours, minutes] = normalized.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) continue;
    const adhanTime = hours * 60 + minutes;
    const iqamaTime = adhanTime + (IQAMA_OFFSETS[prayer] || 15);

    if (currentTime >= adhanTime && currentTime < iqamaTime) {
      activeIqamaPrayer = prayer;
      activeIqamaRemaining = iqamaTime - currentTime;
      break;
    }
  }

  // Find next Adhan today
  let nextAdhanPrayer: string | null = null;
  let nextAdhanRemaining: number | null = null;
  let nextAdhanFormatted: string = '';

  for (const prayer of prayers) {
    const normalized = normalizeTime(timings[prayer]);
    const [hours, minutes] = normalized.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) continue;
    const adhanTime = hours * 60 + minutes;

    if (adhanTime > currentTime) {
      nextAdhanPrayer = prayer;
      nextAdhanRemaining = adhanTime - currentTime;
      nextAdhanFormatted = formatTo12Hour(timings[prayer]);
      break;
    }
  }

  // If no more Adhan today, the next is Fajr tomorrow
  if (!nextAdhanPrayer) {
    const fajrNormalized = normalizeTime(timings['Fajr']);
    const [fajrHours, fajrMinutes] = fajrNormalized.split(':').map(Number);
    const fajrTime = (isNaN(fajrHours) || isNaN(fajrMinutes)) ? 0 : fajrHours * 60 + fajrMinutes;
    nextAdhanPrayer = 'Fajr';
    nextAdhanRemaining = (24 * 60 + fajrTime) - currentTime;
    nextAdhanFormatted = formatTo12Hour(timings['Fajr']);
  }

  // Next Iqamah calculation:
  // If we have an active Iqamah window right now, the next Iqamah is that one.
  // Otherwise, the next Iqamah is the one associated with the next Adhan.
  let nextIqamaPrayer = activeIqamaPrayer || nextAdhanPrayer;
  let nextIqamaRemaining = 0;
  
  if (activeIqamaPrayer && activeIqamaRemaining !== null) {
    nextIqamaRemaining = activeIqamaRemaining;
  } else {
    const offset = IQAMA_OFFSETS[nextAdhanPrayer] || 15;
    nextIqamaRemaining = nextAdhanRemaining + offset;
  }

  return {
    name: prayerNamesArabic[nextAdhanPrayer] || nextAdhanPrayer,
    time: nextAdhanFormatted,
    diff: nextAdhanRemaining,
    
    iqamaName: prayerNamesArabic[nextIqamaPrayer] || nextIqamaPrayer,
    iqamaDiff: nextIqamaRemaining,
    
    isAfterAdhan: !!activeIqamaPrayer,
    activeIqamaPrayer: activeIqamaPrayer ? prayerNamesArabic[activeIqamaPrayer] : null
  };
}

export function usePrayerTimes() {
  const [location, setLocation] = useState<Location | null>(() => {
    try {
      const stored = localStorage.getItem('user_location');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.latitude === 'number' && typeof parsed.longitude === 'number') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored location:', e);
    }
    return null;
  });

  const [method, setMethod] = useState(() => localStorage.getItem('calculation_method') || '4'); // 4 is Umm Al-Qura (Saudi Arabia)
  
  // Initialize isRequestingLocation to true if no location stored (to show loading immediately)
  const [isRequestingLocation, setIsRequestingLocation] = useState(() => {
    const stored = localStorage.getItem('user_location');
    return !stored; // true if no location stored
  });
  const [gpsRequested, setGpsRequested] = useState(false);

  // Request geolocation on mount if no location stored
  useEffect(() => {
    if (!location && !gpsRequested) {
      setGpsRequested(true);
      setIsRequestingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLoc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
          setLocation(newLoc);
          localStorage.setItem('user_location', JSON.stringify(newLoc));
          setIsRequestingLocation(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setIsRequestingLocation(false);
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
      );
    }
  }, [location, gpsRequested]);

  // Listen for storage changes to update location (cross-tab only, no polling)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_location' && e.newValue) {
        const parsedLocation = JSON.parse(e.newValue);
        if (parsedLocation.latitude !== location?.latitude || parsedLocation.longitude !== location?.longitude) {
          setLocation(parsedLocation);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]);

  const query = useQuery({
    queryKey: ['prayer-times', location?.latitude, location?.longitude, method],
    queryFn: async () => {
      if (!location) return null;
      
      try {
        const date = new Date();
        // Using Timings endpoint
        const url = `https://api.aladhan.com/v1/timings/${Math.floor(date.getTime() / 1000)}?latitude=${location.latitude}&longitude=${location.longitude}&method=${method}`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error("Failed to fetch prayer times");
        const json = await res.json() as AladhanResponse;
        return json.data;
      } catch (e) {
        console.error('Prayer times fetch error:', e);
        throw e;
      }
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: 1000,
  });

  // Send prayer times to Service Worker whenever they're fetched
  useEffect(() => {
    if (query.data?.timings) {
      const timings = query.data.timings;
      
      // Calculate iqama times (prayer time + offset)
      const iqamaOffsets: Record<string, number> = {
        Fajr: 20,
        Dhuhr: 15,
        Asr: 15,
        Maghrib: 10,
        Isha: 15,
      };
      
      const iqamaTimes: Record<string, string> = {};
      for (const [prayer, offset] of Object.entries(iqamaOffsets)) {
        const prayerTime = timings[prayer];
        if (prayerTime) {
          const normalized = normalizeTime(prayerTime);
          const [hours, minutes] = normalized.split(':').map(Number);
          if (!isNaN(hours) && !isNaN(minutes)) {
            const totalMinutes = hours * 60 + minutes + offset;
            const newHours = Math.floor(totalMinutes / 60) % 24;
            const newMinutes = totalMinutes % 60;
            iqamaTimes[prayer] = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
          }
        }
      }
      
      // Save to localStorage for persistence
      localStorage.setItem('cached_prayer_times', JSON.stringify(timings));
      localStorage.setItem('cached_iqama_times', JSON.stringify(iqamaTimes));
      
      // Send to Service Worker
      schedulePrayerNotificationsInSW(timings, iqamaTimes);
    }
  }, [query.data?.timings]);

  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    localStorage.setItem('user_location', JSON.stringify(newLocation));
  };

  return {
    ...query,
    isRequestingLocation,
    hasLocation: !!location,
    updateLocation,
  };
}
