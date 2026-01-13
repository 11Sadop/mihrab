import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useDailyHadith } from "@/hooks/use-content";
import { usePrayerTimes, getNextPrayer } from "@/hooks/use-prayer-times";
import {
  Loader2,
  Moon,
  Sun,
  Book,
  Fingerprint,
  Calculator,
  Compass,
  Shield,
  BookOpen,
  Heart,
  Quote
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: prayerData, isLoading: isPrayerLoading, isRequestingLocation } = usePrayerTimes();
  const nextPrayer = prayerData ? getNextPrayer(prayerData.timings) : null;
  const { data: dailyHadith, isLoading: isHadithLoading } = useDailyHadith();

  // Grid items typically displayed Right-to-Left in RTL layout.
  // We list them in the order they should appear in the DOM.
  const menuItems = [
    { href: "/adhkar", label: "أذكار الصباح والمساء", icon: Heart, color: "text-rose-500 bg-rose-50" },
    { href: "/hadith-collections", label: "كتب الحديث", icon: Book, color: "text-amber-500 bg-amber-50" },
    { href: "/duas", label: "أدعية مختارة", icon: Sun, color: "text-sky-500 bg-sky-50" },
    { href: "/tasbeeh", label: "المسبحة الإلكترونية", icon: Fingerprint, color: "text-emerald-500 bg-emerald-50" },

    { href: "/qibla", label: "القبلة", icon: Compass, color: "text-indigo-500 bg-indigo-50" },
    { href: "/zakat", label: "حاسبة الزكاة", icon: Calculator, color: "text-violet-500 bg-violet-50" },
    { href: "/ward", label: "الورد اليومي", icon: Shield, color: "text-teal-500 bg-teal-50" },
    { href: "/tafseer", label: "تفسير القرآن", icon: BookOpen, color: "text-cyan-500 bg-cyan-50" },
  ];

  return (
    <main className="container max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 space-y-6 pt-4 min-h-[85vh] pb-24">

      {/* Next Prayer Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c4a3e] to-[#052e26] text-white shadow-xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative p-6 sm:p-8 text-center space-y-2">
          {isPrayerLoading || isRequestingLocation ? (
            <div className="h-32 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </div>
          ) : nextPrayer ? (
            <>
              <p className="text-white/80 font-medium tracking-wide text-sm uppercase">الصلاة القادمة</p>
              <h2 className="text-5xl font-bold font-display tracking-tight mt-1 text-white">{nextPrayer.name}</h2>
              <div className="text-3xl font-mono font-medium opacity-90 mt-2 text-white/90" dir="ltr">{nextPrayer.time}</div>
              {prayerData?.date?.hijri && (
                <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/70">
                  {prayerData.date.hijri.day} {prayerData.date.hijri.month.ar} {prayerData.date.hijri.year} هـ
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/80">يرجى تفعيل الموقع لحساب أوقات الصلاة</p>
              <Link href="/settings" className="mt-2 inline-block text-xs underline text-white/70 hover:text-white">الإعدادات</Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="group relative flex flex-col items-center justify-center p-4 h-28 bg-white dark:bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
              <div className={cn("p-3 rounded-xl mb-3 transition-colors", item.color)}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground text-center line-clamp-1">
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Daily Hadith Section */}
      <section className="bg-white dark:bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
        <div className="flex items-center gap-2 mb-4 border-b border-border/50 pb-3">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Quote className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-bold text-lg text-foreground">حديث اليوم</h2>
        </div>

        {isHadithLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : dailyHadith ? (
          <div className="space-y-4">
            <p className="font-arabic text-lg leading-loose text-center text-foreground/90">
              {dailyHadith.arabicText || dailyHadith.text}
            </p>
            {dailyHadith.translation && (
              <p className="text-sm text-muted-foreground leading-relaxed text-center italic px-4 border-t border-border/30 pt-4">
                "{dailyHadith.translation}"
              </p>
            )}
            <div className="flex justify-center mt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80 bg-primary/5 px-3 py-1 rounded-full">
                {dailyHadith.source}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-sm py-4">لا يوجد حديث اليوم</p>
        )}
      </section>

    </main>
  );
}
