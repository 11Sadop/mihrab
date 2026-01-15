import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useDailyHadith, useManualHadithRefresh } from "@/hooks/use-content";
import { usePrayerTimes, getNextPrayer } from "@/hooks/use-prayer-times";
import {
  Loader2,
  Sun,
  Book,
  Calculator,
  Compass,
  Shield,
  Heart,
  Quote,
  Search,
  Library,
  ChevronLeft,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const { data: prayerData, isLoading: isPrayerLoading, isRequestingLocation } = usePrayerTimes();
  const nextPrayer = prayerData ? getNextPrayer(prayerData.timings) : null;
  const { data: dailyHadith, isLoading: isHadithLoading } = useDailyHadith();
  const manualRefresh = useManualHadithRefresh();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await manualRefresh();
    setIsRefreshing(false);
  };


  return (
    <main className="container max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-24 space-y-5 pt-4">

      {/* 1. Next Prayer Hero - Green Gradient */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#10b981] to-[#047857] text-white shadow-xl shadow-emerald-900/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative p-6 text-center space-y-1">
          {isPrayerLoading || isRequestingLocation ? (
            <div className="h-32 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </div>
          ) : nextPrayer ? (
            <>
              <p className="text-emerald-100 font-medium tracking-wide text-xs sm:text-sm uppercase mb-1">الصلاة القادمة</p>
              <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-white mb-2">{nextPrayer.name}</h2>
              <div className="text-3xl sm:text-4xl font-mono font-medium opacity-90 text-white" dir="ltr">{nextPrayer.time}</div>

              {prayerData?.date?.hijri && (
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-emerald-50 opacity-80 font-medium">
                  {prayerData.date.hijri.day} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/80">يرجى تفعيل الموقع</p>
              <Link href="/settings" className="mt-2 inline-block text-xs underline text-white/70 hover:text-white">الإعدادات</Link>
            </div>
          )}
        </div>
      </section>

      {/* 2. Top Stacked Cards (Books & Verification) */}
      <section className="grid gap-3">
        {/* Authentic Books Card */}
        <Link href="/hadith-collections">
          <div className="bg-[#0f172a] hover:bg-[#1e293b] text-white p-4 rounded-2xl flex items-center justify-between group transition-colors cursor-pointer border border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#1e293b] rounded-xl text-emerald-400">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">كتب الحديث الصحيحة</h3>
                <p className="text-xs text-slate-400 mt-0.5">صحيح البخاري ومسلم</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </Link>

        {/* Verification Card (Restored & Enabled) */}
        <Link href="/protection">
          {/* Note: User requested verification logic but mapped to 'protection' route in prev code? 
               Wait, previously it was /hadith-verify? User said "return it exactly".
               Actually, I will link to /hadith-verify and ensure the route exists in App.tsx later.
           */}
        </Link>
        <Link href="/hadith-verify">
          <div className="bg-[#0f172a] hover:bg-[#1e293b] text-white p-4 rounded-2xl flex items-center justify-between cursor-pointer border border-white/5 group transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#1e293b] rounded-xl text-amber-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">التحقق من صحة الحديث</h3>
                <p className="text-xs text-slate-400 mt-0.5">تأكد من صحة الأحاديث</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </Link>
      </section>

      {/* 3. Large Gradient Cards (Adhkar & Duas) - RTL: Adhkar RIGHT, Duas LEFT */}
      <section className="grid grid-cols-2 gap-3">
        {/* Duas - Orange/Red (LEFT in RTL = FIRST in DOM) */}
        <Link href="/duas">
          <div className="relative overflow-hidden h-32 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-4 flex flex-col items-center justify-center text-center shadow-lg shadow-orange-900/20 cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <p className="text-xl font-bold text-white">د</p>
              </div>
              <span className="font-bold text-white text-sm">الأدعية</span>
            </div>
          </div>
        </Link>

        {/* Adhkar - Teal/Cyan (RIGHT in RTL = SECOND in DOM) */}
        <Link href="/adhkar">
          <div className="relative overflow-hidden h-32 rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-600 to-teal-700 p-4 flex flex-col items-center justify-center text-center shadow-lg shadow-teal-900/20 cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <p className="text-xl font-bold text-white">أ</p>
              </div>
              <span className="font-bold text-white text-sm">الأذكار</span>
            </div>
          </div>
        </Link>
      </section>

      {/* 4. Daily Hadith */}
      <section className="bg-[#0f172a] rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Quote className="w-16 h-16 text-white" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              <Quote className="w-4 h-4" />
              حديث اليوم
            </h3>
            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RotateCcw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
            </Button>
          </div>

          {isHadithLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
            </div>
          ) : dailyHadith ? (
            <div className="space-y-4">
              {/* Increased Font Size */}
              <p className="text-white/95 text-lg sm:text-xl leading-loose font-arabic text-center px-2">
                {dailyHadith.arabicText || dailyHadith.text}
              </p>
              {dailyHadith.translation && (
                <p className="text-sm text-slate-400 text-center italic border-t border-white/5 pt-3">
                  "{dailyHadith.translation}"
                </p>
              )}
              <div className="flex justify-center">
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium">
                  {dailyHadith.source}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-500 text-sm">لا يوجد حديث</p>
          )}
        </div>
      </section>

      {/* 5. Bottom Grid */}
      <section className="grid grid-cols-2 gap-3">
        {[
          // Swapped Order for RTL matching:
          // User Screenshot: Protection (Right), Wird (Left)
          // Code Order (RTL): Protection (First), Wird (Second) -> Matches.
          { href: "/adhkar?category=protection", label: "أذكار الوقاية", icon: Shield, color: "text-indigo-400 bg-indigo-500/10" },
          { href: "/ward", label: "الورد اليومي", icon: Book, color: "text-emerald-400 bg-emerald-500/10" },
          { href: "/qibla", label: "اتجاه القبلة", icon: Compass, color: "text-teal-400 bg-teal-500/10" },
          { href: "/zakat", label: "حاسبة الزكاة", icon: Calculator, color: "text-amber-400 bg-amber-500/10" },
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="bg-[#0f172a] hover:bg-[#1e293b] p-4 rounded-2xl flex flex-col items-center justify-center gap-3 h-24 border border-white/5 transition-colors cursor-pointer group">
              <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110", item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-300">{item.label}</span>
            </div>
          </Link>
        ))}
      </section>

    </main>
  );
}
