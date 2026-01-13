
import { Link } from "wouter";
import { Loader2, Moon, Sun, BookOpen, Heart, Shield, Calculator, Compass, Book, MessageCircle, BarChart } from "lucide-react";
import { usePrayerTimes, getNextPrayer } from "@/hooks/use-prayer-times";
import { useDailyHadith } from "@/hooks/use-content";

export default function Home() {
  const { data: prayerData, isLoading: isPrayerLoading } = usePrayerTimes();
  const { data: dailyHadith, isLoading: isHadithLoading } = useDailyHadith();

  const nextPrayer = prayerData?.timings ? getNextPrayer(prayerData.timings) : null;

  return (
    <main className="container max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 space-y-6 pt-4 pb-24">

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
                  {prayerData.date.hijri.day} {prayerData.date.hijri.month.ar} {prayerData.date.hijri.year} هـ
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

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickLink href="/adhkar" icon={Heart} label="أذكار الصباح والمساء" color="text-rose-500" bg="bg-rose-500/10" />
        <QuickLink href="/hadith-collections" icon={Book} label="كتب الحديث" color="text-amber-500" bg="bg-amber-500/10" />
        <QuickLink href="/duas" icon={Sun} label="أدعية مختارة" color="text-sky-500" bg="bg-sky-500/10" />
        <QuickLink href="/tasbeeh" icon={MessageCircle} label="المسبحة الإلكترونية" color="text-emerald-500" bg="bg-emerald-500/10" />
        <QuickLink href="/qibla" icon={Compass} label="القبلة" color="text-indigo-500" bg="bg-indigo-500/10" />
        <QuickLink href="/zakat" icon={Calculator} label="حاسبة الزكاة" color="text-violet-500" bg="bg-violet-500/10" />
        <QuickLink href="/ward" icon={Shield} label="الورد اليومي" color="text-teal-500" bg="bg-teal-500/10" />
        <QuickLink href="/tafseer" icon={BookOpen} label="تفسير القرآن" color="text-cyan-500" bg="bg-cyan-500/10" />
      </div>

      {/* Daily Hadith Section */}
      {dailyHadith && (
        <section className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold">حديث اليوم</h3>
          </div>
          {isHadithLoading ? (
            <div className="py-8 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="font-arabic text-lg leading-loose text-foreground/90">{dailyHadith.text}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                <span>{dailyHadith.category}</span>
                <span>{dailyHadith.reference}</span>
              </div>
            </div>
          )}
        </section>
      )}

    </main>
  );
}

function QuickLink({ href, icon: Icon, label, color, bg }: { href: string, icon: any, label: string, color: string, bg: string }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
      <div className={`p-3 rounded-xl mb-3 ${bg} ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium text-center leading-tight">{label}</span>
    </Link>
  )
}
