import { usePrayerTimes, getNextPrayer } from "@/hooks/use-prayer-times";
import { Header } from "@/components/Header";
import { Loader2, MapPin, Search, Navigation, Clock, Moon, Sun } from "lucide-react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { usePrayerNotifications, schedulePrayerNotificationsInSW } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";
import { useSeo } from "@/hooks/use-seo";

function normalizeTime(time: string): string {
  return time.replace(/\s*\([^)]*\)$/, '').split(':').slice(0, 2).join(':');
}

function formatTo12Hour(time24: string): string {
  const normalized = normalizeTime(time24);
  const [hours, minutes] = normalized.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return time24;
  const period = hours >= 12 ? 'م' : 'ص';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function getTimeInMinutes(time: string): number {
  const normalized = normalizeTime(time);
  const [hours, minutes] = normalized.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return -1;
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'م' : 'ص';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

const IQAMA_OFFSETS: { [key: string]: number } = {
  Fajr: 20,
  Dhuhr: 15,
  Asr: 15,
  Maghrib: 10,
  Isha: 15,
};

const saudiCities = [
  { name: "مكة المكرمة", lat: 21.4225, lng: 39.8262 },
  { name: "المدينة المنورة", lat: 24.5247, lng: 39.5692 },
  { name: "الرياض", lat: 24.7136, lng: 46.6753 },
  { name: "جدة", lat: 21.5433, lng: 39.1728 },
  { name: "الدمام", lat: 26.4207, lng: 50.0888 },
  { name: "الخبر", lat: 26.2172, lng: 50.1971 },
  { name: "الطائف", lat: 21.2854, lng: 40.4150 },
  { name: "تبوك", lat: 28.3998, lng: 36.5715 },
  { name: "بريدة", lat: 26.3286, lng: 43.9710 },
  { name: "أبها", lat: 18.2164, lng: 42.5053 },
];

interface PrayerGridCardProps {
  id: string;
  name: string;
  time: string;
  isNext: boolean;
  iqamaOffset?: number;
  currentTime: number;
}

function PrayerGridCard({ id, name, time, isNext, iqamaOffset, currentTime }: PrayerGridCardProps) {
  const adhanTime = getTimeInMinutes(time);
  const iqamaTime = iqamaOffset ? adhanTime + iqamaOffset : null;
  
  const isInIqamaWindow = iqamaTime && currentTime >= adhanTime && currentTime < iqamaTime;
  const iqamaRemaining = iqamaTime && isInIqamaWindow ? iqamaTime - currentTime : null;

  return (
    <div
      className={cn(
        "relative p-4 rounded-xl transition-all duration-300 text-center",
        isNext 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
          : "bg-card border border-border/50"
      )}
      data-testid={`prayer-card-${id}`}
    >
      <div className={cn(
        "mx-auto mb-2 p-2 rounded-lg w-fit",
        isNext ? "bg-white/20" : "bg-muted"
      )}>
        <Clock className={cn("w-5 h-5", isNext ? "text-white" : "text-muted-foreground")} />
      </div>
      
      <h3 className={cn("font-semibold text-sm mb-1", isNext ? "text-white" : "text-foreground")}>
        {name}
      </h3>
      
      <div className={cn(
        "text-lg font-bold font-mono",
        isNext ? "text-white" : "text-primary"
      )}>
        {formatTo12Hour(time)}
      </div>

      {isNext && <span className="text-xs text-primary-foreground/80 block mt-1">الصلاة القادمة</span>}

      {iqamaRemaining !== null && iqamaRemaining > 0 && (
        <div className="mt-2 pt-2 border-t border-white/20 text-xs">
          <span className="text-primary-foreground/80">الإقامة بعد {iqamaRemaining} دقيقة</span>
        </div>
      )}
      
      {iqamaTime && id !== 'Sunrise' && !isInIqamaWindow && (
        <div className="text-xs text-muted-foreground mt-1">
          الإقامة: {minutesToTime(iqamaTime)}
        </div>
      )}
    </div>
  );
}

export default function PrayerTimes() {
  useSeo({
    title: "مواقيت الصلاة الآن - حسب موقعك",
    description: "اعرف مواقيت الصلاة الدقيقة (الفجر، الشروق، الظهر، العصر، المغرب، العشاء) حسب موقعك الحالي أو مدينتك. مع وقت الإقامة والصلاة القادمة.",
    keywords: "مواقيت الصلاة، أوقات الصلاة، وقت الفجر، وقت الظهر، وقت العصر، وقت المغرب، وقت العشاء، prayer times, salah times",
    canonicalPath: "/prayer-times",
  });
  const { toast } = useToast();
  const [savedLocation, setSavedLocation] = useLocalStorage<{latitude: number, longitude: number, city?: string} | null>("user_location", null);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  const { data: prayerData, isLoading, error, refetch, isRequestingLocation, hasLocation, updateLocation } = usePrayerTimes();

  // Memoize timings to prevent unnecessary re-renders in usePrayerNotifications
  const memoizedTimings = useMemo(() => prayerData?.timings || null, [
    prayerData?.timings?.Fajr,
    prayerData?.timings?.Dhuhr,
    prayerData?.timings?.Asr,
    prayerData?.timings?.Maghrib,
    prayerData?.timings?.Isha,
    prayerData?.timings?.Sunrise
  ]);

  usePrayerNotifications(memoizedTimings);

  const lastScheduledTimingsRef = useRef<string | null>(null);
  
  useEffect(() => {
    if (prayerData?.timings) {
      const timingsKey = JSON.stringify(prayerData.timings);
      if (lastScheduledTimingsRef.current === timingsKey) {
        return;
      }
      lastScheduledTimingsRef.current = timingsKey;
      
      const iqamaTimes: Record<string, string> = {};
      const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      
      for (const prayer of prayers) {
        const timeStr = prayerData.timings[prayer];
        if (timeStr) {
          const normalized = normalizeTime(timeStr);
          const [hours, minutes] = normalized.split(':').map(Number);
          const adhanMinutes = hours * 60 + minutes;
          const iqamaMinutes = adhanMinutes + (IQAMA_OFFSETS[prayer] || 15);
          const iqamaHours = Math.floor(iqamaMinutes / 60) % 24;
          const iqamaMins = iqamaMinutes % 60;
          iqamaTimes[prayer] = `${iqamaHours.toString().padStart(2, '0')}:${iqamaMins.toString().padStart(2, '0')}`;
        }
      }
      
      schedulePrayerNotificationsInSW(prayerData.timings, iqamaTimes);
    }
  }, [prayerData?.timings]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() * 60 + now.getMinutes());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredCities = saudiCities.filter(city => 
    city.name.includes(searchQuery)
  );

  const selectCity = (city: typeof saudiCities[0]) => {
    const newLocation = { latitude: city.lat, longitude: city.lng, city: city.name };
    updateLocation(newLocation);
    setSavedLocation(newLocation);
    setShowCityPicker(false);
    toast({
      title: "تم تحديد الموقع",
      description: `تم اختيار ${city.name}`,
    });
  };

  const getAutoLocation = () => {
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newLoc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        updateLocation(newLoc);
        setSavedLocation(newLoc);
        setIsGettingLocation(false);
        setShowCityPicker(false);
        toast({
          title: "تم تحديد الموقع",
          description: "تم الحصول على موقعك تلقائياً",
        });
      },
      (err) => {
        setIsGettingLocation(false);
        toast({
          title: "خطأ",
          description: "لم نتمكن من الحصول على موقعك. يرجى اختيار مدينتك يدوياً.",
          variant: "destructive",
        });
      }
    );
  };

  const prayerRows = [
    [
      { id: 'Fajr', name: 'الفجر' },
      { id: 'Sunrise', name: 'الشروق' },
    ],
    [
      { id: 'Dhuhr', name: 'الظهر' },
      { id: 'Asr', name: 'العصر' },
    ],
    [
      { id: 'Maghrib', name: 'المغرب' },
      { id: 'Isha', name: 'العشاء' },
    ],
  ];

  const getNextPrayerWithIqama = () => {
    if (!prayerData?.timings) return null;
    
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const arabicNames: { [key: string]: string } = {
      Fajr: 'الفجر',
      Dhuhr: 'الظهر',
      Asr: 'العصر',
      Maghrib: 'المغرب',
      Isha: 'العشاء'
    };

    for (const prayer of prayers) {
      const prayerTime = prayerData.timings[prayer];
      if (!prayerTime) continue;
      
      const adhanTime = getTimeInMinutes(prayerTime);
      if (adhanTime < 0) continue;
      const iqamaOffset = IQAMA_OFFSETS[prayer] || 15;
      const iqamaTime = adhanTime + iqamaOffset;
      
      if (iqamaTime > currentTime) {
        const isInIqamaWindow = currentTime >= adhanTime && currentTime < iqamaTime;
        const remainingMinutes = isInIqamaWindow ? iqamaTime - currentTime : adhanTime - currentTime;
        
        return {
          id: prayer,
          name: arabicNames[prayer],
          time: formatTo12Hour(prayerTime),
          iqamaTimeFormatted: minutesToTime(iqamaTime),
          remainingMinutes,
          isInIqamaWindow,
          iqamaRemaining: isInIqamaWindow ? iqamaTime - currentTime : null
        };
      }
    }

    const fajrTime = prayerData.timings['Fajr'];
    if (!fajrTime) return null;
    
    const fajrAdhan = getTimeInMinutes(fajrTime);
    if (fajrAdhan < 0) return null;
    const fajrIqama = fajrAdhan + (IQAMA_OFFSETS['Fajr'] || 20);
    return {
      id: 'Fajr',
      name: arabicNames['Fajr'],
      time: formatTo12Hour(fajrTime),
      iqamaTimeFormatted: minutesToTime(fajrIqama),
      remainingMinutes: (24 * 60 + fajrAdhan) - currentTime,
      isInIqamaWindow: false,
      iqamaRemaining: null
    };
  };

  const nextPrayer = getNextPrayerWithIqama();

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  const currentPrayer = useMemo(() => {
    if (!prayerData?.timings) return null;

    const prayers = [
      { id: 'Fajr', name: 'الفجر' },
      { id: 'Dhuhr', name: 'الظهر' },
      { id: 'Asr', name: 'العصر' },
      { id: 'Maghrib', name: 'المغرب' },
      { id: 'Isha', name: 'العشاء' },
    ];

    const valid = prayers
      .map((prayer) => ({
        ...prayer,
        time: prayerData.timings[prayer.id],
        minutes: getTimeInMinutes(prayerData.timings[prayer.id]),
      }))
      .filter((prayer) => !!prayer.time && prayer.minutes >= 0);

    if (!valid.length) return null;

    for (let i = valid.length - 1; i >= 0; i--) {
      if (currentTime >= valid[i].minutes) {
        return valid[i];
      }
    }

    return valid[valid.length - 1];
  }, [currentTime, prayerData?.timings]);

  // If no location and not requesting, show city picker automatically
  if (!hasLocation && !isRequestingLocation && !showCityPicker) {
    return (
      <div className="min-h-screen pb-32 bg-background">
        <Header title="اختر مدينتك" />
        
        <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-4">
          <div className="text-center mb-4">
            <p className="text-muted-foreground">لم نتمكن من تحديد موقعك تلقائياً</p>
            <p className="text-sm text-muted-foreground">يرجى اختيار مدينتك أو تفعيل خدمة الموقع</p>
          </div>

          <Button
            onClick={getAutoLocation}
            disabled={isGettingLocation}
            className="w-full"
            variant="default"
            data-testid="button-retry-location"
          >
            {isGettingLocation ? (
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 ml-2" />
            )}
            المحاولة مرة أخرى
          </Button>

          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن مدينتك..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 text-right"
              data-testid="input-city-search-fallback"
            />
          </div>

          <div className="space-y-2">
            {filteredCities.map((city) => (
              <button
                key={city.name}
                onClick={() => selectCity(city)}
                className="w-full text-right p-4 rounded-xl bg-card border border-border/50 hover-elevate transition-all"
                data-testid={`button-city-fallback-${city.name}`}
              >
                <div className="flex items-center justify-between">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{city.name}</span>
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (showCityPicker) {
    return (
      <div className="min-h-screen pb-32 bg-background">
        <Header title="اختر مدينتك" />
        
        <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-4">
          <Button
            onClick={getAutoLocation}
            disabled={isGettingLocation}
            className="w-full"
            variant="outline"
            data-testid="button-auto-location"
          >
            {isGettingLocation ? (
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 ml-2" />
            )}
            تحديد الموقع تلقائياً
          </Button>

          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن مدينتك..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 text-right"
              data-testid="input-city-search"
            />
          </div>

          <div className="space-y-2">
            {filteredCities.map((city) => (
              <button
                key={city.name}
                onClick={() => selectCity(city)}
                className="w-full text-right p-4 rounded-xl bg-card border border-border/50 hover-elevate transition-all"
                data-testid={`button-city-${city.name}`}
              >
                <div className="flex items-center justify-between">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{city.name}</span>
                </div>
              </button>
            ))}
          </div>

          {savedLocation && (
            <Button
              onClick={() => setShowCityPicker(false)}
              variant="ghost"
              className="w-full"
              data-testid="button-cancel-city-picker"
            >
              إلغاء
            </Button>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 bg-background">
      <Header title="أوقات الصلاة" />
      
      <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {(isLoading || isRequestingLocation) ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-muted-foreground space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p>{isRequestingLocation ? "جاري تحديد موقعك..." : "جاري حساب الأوقات..."}</p>
            <Button 
              variant="outline" 
              onClick={() => setShowCityPicker(true)}
              data-testid="button-skip-location"
            >
              اختيار المدينة يدوياً
            </Button>
          </div>
        ) : error ? (
          <div className="text-center py-12 px-4 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-lg font-bold">حدث خطأ</h3>
            <p className="text-muted-foreground text-sm">
              تعذر الحصول على أوقات الصلاة. يرجى المحاولة مرة أخرى.
            </p>
            <Button onClick={() => refetch()} data-testid="button-retry">
              إعادة المحاولة
            </Button>
          </div>
        ) : prayerData ? (
          <>
            <button 
              onClick={() => setShowCityPicker(true)}
              className="w-full flex items-center justify-center gap-2 text-muted-foreground text-sm bg-secondary/50 py-3 rounded-lg hover-elevate"
              data-testid="button-change-location"
            >
              <MapPin className="w-4 h-4" />
              <span>{savedLocation?.city || "موقعك الحالي"}</span>
            </button>

            <Button onClick={toggleTheme} variant="outline" className="w-full" data-testid="button-theme-toggle-prayer">
              {isDarkMode ? <Sun className="w-4 h-4 ml-2" /> : <Moon className="w-4 h-4 ml-2" />}
              {isDarkMode ? "Light mode" : "Dark mode"}
            </Button>


            {nextPrayer && (
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-center">
                {currentPrayer && (
                  <p className="text-xs text-primary font-semibold mb-2">Current prayer: {currentPrayer.name}</p>
                )}
                <p className="text-sm text-muted-foreground mb-1">
                  {nextPrayer.isInIqamaWindow ? "وقت الإقامة" : "الصلاة القادمة"}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {nextPrayer.name}
                </p>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">الأذان</p>
                    <p className="text-lg font-mono font-bold">{nextPrayer.time}</p>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div>
                    <p className="text-xs text-muted-foreground">الإقامة</p>
                    <p className="text-lg font-mono font-bold">{nextPrayer.iqamaTimeFormatted}</p>
                  </div>
                </div>
                {nextPrayer.isInIqamaWindow && nextPrayer.iqamaRemaining ? (
                  <p className="text-xs text-muted-foreground mt-2">
                    الإقامة بعد {nextPrayer.iqamaRemaining} دقيقة
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-2">
                    {Number.isFinite(nextPrayer.remainingMinutes) ? `In ${Math.floor(nextPrayer.remainingMinutes / 60)}h ${nextPrayer.remainingMinutes % 60}m` : "Calculating remaining time..."}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              {prayerRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 gap-3">
                  {row.map((prayer) => {
                    const time = prayerData.timings?.[prayer.id];
                    if (!time) return null;
                    return (
                      <PrayerGridCard
                        key={prayer.id}
                        id={prayer.id}
                        name={prayer.name}
                        time={time}
                        isNext={nextPrayer?.id === prayer.id}
                        iqamaOffset={prayer.id !== 'Sunrise' ? IQAMA_OFFSETS[prayer.id] : undefined}
                        currentTime={currentTime}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {prayerData.meta?.method?.name && (
              <div className="text-center text-xs text-muted-foreground px-4 py-8 text-right">
                طريقة الحساب: <br />
                <span className="font-medium">{prayerData.meta.method.name}</span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 px-4 space-y-4">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-bold">الموقع مطلوب</h3>
            <p className="text-muted-foreground text-sm">
              يرجى تحديد موقعك لعرض أوقات الصلاة
            </p>
            <Button onClick={() => setShowCityPicker(true)} data-testid="button-set-location">
              <MapPin className="w-4 h-4 ml-2" />
              تحديد الموقع
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}



