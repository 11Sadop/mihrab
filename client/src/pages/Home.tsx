import { useDailyHadith } from "@/hooks/use-content";
<main className="container max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 space-y-6 pt-4">
  {/* Next Prayer Hero */}
  <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-emerald-700 text-white shadow-xl shadow-primary/20">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

    <div className="relative p-6 sm:p-8 text-center space-y-2">
      {isPrayerLoading ? (
        <div className="h-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-white/50" />
        </div>
      ) : nextPrayer ? (
        <>
          <p className="text-primary-foreground/80 font-medium tracking-wide text-sm uppercase">الصلاة القادمة</p>
          <h2 className="text-5xl font-bold font-display tracking-tight mt-1">{nextPrayer.name}</h2>
          <div className="text-3xl font-mono font-medium opacity-90 mt-2">{nextPrayer.time}</div>
          {prayerData?.date?.hijri && (
            <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-primary-foreground/70">
              {prayerData.date.hijri.day} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} هـ
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-white/80">يرجى تفعيل الموقع</p>
          <Link href="/settings" className="mt-2 inline-block text-xs underline">الإعدادات</Link>
        </div>
      )}
    </div>
  </section>


