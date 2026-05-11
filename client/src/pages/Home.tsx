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
  BookText,
  Search,
  Library,
  ChevronLeft,
  Mic,
  Quote,
  RotateCcw,
  Share2
} from "lucide-react";
import { useNotifications, usePrayerNotifications } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSeo } from "@/hooks/use-seo";

export default function Home() {
  useSeo({
    title: "محراب - رفيقك الإسلامي: مواقيت الصلاة، تفسير القرآن، صحة الأحاديث",
    description: "محراب رفيقك الإسلامي - مواقيت صلاة دقيقة، تفسير القرآن الكريم، التحقق من صحة الأحاديث، حاسبة الزكاة، أذكار الصباح والمساء، بوصلة القبلة. رفيقك الإسلامي اليومي.",
    keywords: "محراب، تطبيق إسلامي، مواقيت الصلاة، تفسير القرآن، صحة الأحاديث، حاسبة الزكاة، أذكار، بوصلة القبلة، mihrab app",
    canonicalPath: "/",
  });
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

  usePrayerNotifications(prayerData?.timings || null, prayerData?.date?.hijri);

  // Live countdown to next prayer
  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    if (!nextPrayer) return;
    const update = () => {
      const now = new Date();
      const [h, m] = nextPrayer.time.split(':').map(Number);
      let target = new Date(now);
      target.setHours(h, m, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) { setCountdown(''); return; }
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      if (hrs > 0) setCountdown(`${hrs} ساعة و ${mins} دقيقة`);
      else if (mins > 0) setCountdown(`${mins} دقيقة و ${secs} ثانية`);
      else setCountdown(`${secs} ثانية`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [nextPrayer?.time]);

  const handleShareHadith = async () => {
    if (!dailyHadith) return;

    const textToShare = `${dailyHadith.arabicText || dailyHadith.translation}\n\nيومك أجمل مع تطبيق محراب رفيقك الإسلامي 🕋\nhttps://mihrabapp.com`;

    // Check if the native Share API is available (usually works well on mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'حديث اليوم من تطبيق محراب',
          text: textToShare,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for desktop/unsupported browsers: Copy to clipboard or open WhatsApp
      const waUrl = `https://wa.me/?text=${encodeURIComponent(textToShare)}`;
      window.open(waUrl, '_blank');
    }
  };


  return (
    <main className="container max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-32 space-y-6 pt-12 sm:pt-14">

      {/* 1. Next Prayer Hero - Emerald Glassmorphism */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-[#064e3b] text-white shadow-2xl shadow-emerald-900/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative p-8 text-center space-y-2">
          {isPrayerLoading || isRequestingLocation ? (
            <div className="h-40 flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-white/50" />
            </div>
          ) : nextPrayer ? (
            <>
              <div className="flex flex-col items-center mb-4">
                <span className="bg-white/10 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-emerald-100 backdrop-blur-md border border-white/5 mb-2">محراب رفيقك الإسلامي</span>
                <p className="text-emerald-50/70 font-medium text-xs sm:text-sm">الصلاة القادمة</p>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black font-display tracking-tight text-white mb-2">{nextPrayer.name}</h2>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-emerald-50" dir="ltr">{nextPrayer.time}</div>
              {countdown && (
                <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 inline-flex items-center gap-2 border border-white/10">
                  <span className="text-emerald-200 text-sm font-bold">⏱ متبقي {countdown}</span>
                </div>
              )}

              {prayerData?.date?.hijri && (
                <div className="mt-6 pt-4 border-t border-white/5 text-xs text-white/50 font-bold flex items-center justify-center gap-2">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>{prayerData.date.hijri.day} {prayerData.date.hijri.month.ar} {prayerData.date.hijri.year} هـ</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <Compass className="w-12 h-12 mx-auto text-white/30 mb-4 animate-pulse" />
              <p className="text-white/80 font-bold">يرجى تفعيل الموقع لعرض المواقيت</p>
              <Link href="/settings" className="mt-3 inline-block bg-white/10 px-6 py-2 rounded-full text-xs font-bold text-white hover:bg-white/20 transition-colors">ضبط الإعدادات</Link>
            </div>
          )}
        </div>
      </section>

      {/* 2. List Actions (Hadith) */}
      <section className="space-y-3">
        <Link href="/hadith-collections">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-card transition-colors">
            <div className="flex items-center gap-4 flex-row-reverse w-full">
              <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500">
                <Library className="w-6 h-6" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-bold text-base">كتب الحديث الصحيحة</h3>
                <p className="text-xs text-muted-foreground">البخاري ومسلم والكتب الستة</p>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
        <Link href="/hadith-verify">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-card transition-colors">
            <div className="flex items-center gap-4 flex-row-reverse w-full">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500">
                <Search className="w-6 h-6" />
              </div>
              <div className="text-right flex-1">
                <h3 className="font-bold text-base">التحقق من صحة الحديث</h3>
                <p className="text-xs text-muted-foreground">تأكد من صحة الأحاديث المروية</p>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </section>

      {/* 3. Main Action Grid (Adhkar/Duas) */}
      <section className="grid grid-cols-2 gap-4">
        <Link href="/duas">
          <div className="relative overflow-hidden group cursor-pointer h-40 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] shadow-lg shadow-blue-900/20 p-6 flex flex-col justify-end">
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black text-white text-2xl border border-white/20">د</div>
            <div className="relative z-10 text-right">
              <h3 className="text-white font-black text-xl">الأدعية</h3>
              <p className="text-blue-100/70 text-xs font-medium">أدعية من الكتاب والسنة</p>
            </div>
          </div>
        </Link>
        <Link href="/adhkar">
          <div className="relative overflow-hidden group cursor-pointer h-40 bg-gradient-to-br from-amber-500 to-amber-600 rounded-[2.5rem] shadow-lg shadow-amber-900/20 p-6 flex flex-col justify-end">
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black text-white text-2xl border border-white/20">أ</div>
            <div className="relative z-10 text-right">
              <h3 className="text-white font-black text-xl">الأذكار</h3>
              <p className="text-amber-50/70 text-xs font-medium">الحصن والورد اليومي</p>
            </div>
          </div>
        </Link>
      </section>

      {/* 4. Daily Hadith */}
      <section className="bg-card/30 backdrop-blur-md rounded-[2rem] p-6 border border-border/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Quote className="w-16 h-16 text-foreground" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary font-bold text-sm flex items-center gap-2">
              <Quote className="w-4 h-4" />
              حديث اليوم
            </h3>
            <div className="flex gap-1">
              {dailyHadith && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={handleShareHadith}
                  title="مشاركة الحديث"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={handleRefresh}
                disabled={isRefreshing}
                title="تحديث الحديث"
              >
                <RotateCcw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
              </Button>
            </div>
          </div>

          {isHadithLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : dailyHadith ? (
            <div className="space-y-4">
              <p className="text-foreground text-lg sm:text-xl leading-loose font-bold font-arabic text-center px-2">
                {dailyHadith.arabicText}
              </p>
              <div className="flex justify-center">
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {dailyHadith.source}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">لا يوجد حديث</p>
          )}
        </div>
      </section>

      {/* 5. Bottom Tool Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: "/ward", label: "الورد اليومي", icon: Book, color: "text-emerald-500 bg-emerald-500/10" },
          { href: "/qibla", label: "اتجاه القبلة", icon: Compass, color: "text-teal-500 bg-teal-500/10" },
          { href: "/zakat", label: "حاسبة الزكاة", icon: Calculator, color: "text-amber-500 bg-amber-500/10" },
          { href: "/protection", label: "أذكار الوقاية", icon: Shield, color: "text-indigo-500 bg-indigo-500/10" },
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="bg-card/40 hover:bg-card border border-border/50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 h-24 transition-all cursor-pointer group">
              <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110", item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-muted-foreground">{item.label}</span>
            </div>
          </Link>
        ))}
      </section>

    </main>
  );
}
