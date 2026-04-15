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
  RotateCcw,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

  const handleShareHadith = async () => {
    if (!dailyHadith) return;

    const textToShare = `${dailyHadith.arabicText || dailyHadith.text}\n\nيومك أجمل مع تطبيق محراب رفيقك الإسلامي 🕋\nhttps://mihrabapp.com`;

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
    <main className="container max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-32 space-y-5 pt-12 sm:pt-14">

      {/* 1. Next Prayer Hero - Premium Gold/Emerald Gradient */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0c4a3e] via-[#10b981] to-[#047857] text-white shadow-2xl shadow-emerald-900/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

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
              <h2 className="text-5xl sm:text-6xl font-black font-display tracking-tight text-white mb-2 drop-shadow-lg">{nextPrayer.name}</h2>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-emerald-50" dir="ltr">{nextPrayer.time}</div>

              {prayerData?.date?.hijri && (
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/70 font-bold flex items-center justify-center gap-2">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>{prayerData.date.hijri.day} {prayerData.date.hijri.month.ar} {prayerData.date.hijri.year} هـ</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <Compass className="w-12 h-12 mx-auto text-white/30 mb-4 animate-pulse" />
              <p className="text-white/80 font-bold">يرجى تفعيل الموقع لعرض المواقيت</p>
              <Link href="/settings" className="mt-3 inline-block bg-white/20 px-6 py-2 rounded-full text-xs font-bold text-white hover:bg-white/30 transition-colors">ضبط الإعدادات</Link>
            </div>
          )}
        </div>
      </section>



      {/* 2. Primary Action: Mushaf/Quran - VERY PROMINENT */}
      <Link href="/tafseer">
        <div className="relative overflow-hidden group h-36 rounded-3xl bg-gradient-to-br from-[#c19e5d] via-[#d4b57e] to-[#8b6b35] p-6 shadow-xl shadow-amber-900/10 cursor-pointer overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]">
           <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
           <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-32 h-32 text-white/10 -rotate-12 transition-transform group-hover:scale-110" />
           <div className="relative z-10 h-full flex flex-col justify-center">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner">
                 <Book className="w-7 h-7 text-white" />
               </div>
               <div>
                 <h2 className="text-2xl font-black text-white leading-tight">القرآن الكريم</h2>
                 <p className="text-white/80 text-sm font-medium">مصحف محراب - تلاوة وتفسير</p>
               </div>
             </div>
           </div>
           <div className="absolute bottom-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm">
             <ChevronLeft className="w-5 h-5 text-white" />
           </div>
        </div>
      </Link>

      {/* 3. Middle Stacked Cards (Verification & Sunnan) */}
      <section className="grid grid-cols-2 gap-3">
        {/* Verification Card */}
        <Link href="/hadith-verify">
          <div className="bg-[#0f172a] hover:bg-[#1e293b] text-white p-5 rounded-[2rem] flex flex-col items-center text-center gap-3 border border-white/5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group shadow-lg">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:bg-amber-500/20 transition-colors">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm">تأكد من الحديث</h3>
              <p className="text-[10px] text-slate-500 mt-1">التحقق اللحظي</p>
            </div>
          </div>
        </Link>

        {/* Sunnah Card - Symbolic for Sunnah */}
        <Link href="/assistant">
          <div className="bg-[#0f172a] hover:bg-[#1e293b] text-white p-5 rounded-[2rem] flex flex-col items-center text-center gap-3 border border-white/5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group shadow-lg">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm">محراب رفيقك</h3>
              <p className="text-[10px] text-slate-500 mt-1">السنن والأذكار</p>
            </div>
          </div>
        </Link>
      </section>

      {/* 4. Large Action Cards (Adhkar & Hadith Books) */}
      <section className="grid grid-cols-2 gap-3">
        {/* Adhkar */}
        <Link href="/adhkar">
          <div className="relative overflow-hidden h-32 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-800 p-4 flex flex-col items-center justify-center text-center shadow-lg shadow-indigo-900/20 cursor-pointer hover:scale-[1.02] transition-transform group">
            <Shield className="absolute right-[-10%] bottom-[-10%] w-16 h-16 text-white/10 -rotate-12" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-white text-sm">الأذكار اليومية</span>
            </div>
          </div>
        </Link>

        {/* Hadith Books */}
        <Link href="/hadith-collections">
          <div className="relative overflow-hidden h-32 rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 p-4 flex flex-col items-center justify-center text-center shadow-lg shadow-black/20 cursor-pointer hover:scale-[1.02] transition-transform group">
            <Library className="absolute right-[-10%] bottom-[-10%] w-16 h-16 text-white/10 -rotate-12" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Library className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-white text-sm">أمهات الكتب</span>
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
            <div className="flex gap-1">
              {/* Share Button */}
              {dailyHadith && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
                  onClick={handleShareHadith}
                  title="مشاركة الحديث"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
              {/* Refresh Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
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
          // Order for grid:
          // Row 1: أذكار الوقاية (Left), الورد اليومي (Right)
          // Row 2: اتجاه القبلة (Left), حاسبة الزكاة (Right)
          { href: "/protection", label: "أذكار الوقاية", icon: Shield, color: "text-indigo-400 bg-indigo-500/10" },
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
