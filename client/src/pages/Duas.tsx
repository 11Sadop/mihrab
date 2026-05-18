import { useDuas } from "@/hooks/use-content";
import { Header } from "@/components/Header";
import { ContentCard } from "@/components/ContentCard";
import { Loader2, Search, Sparkles, X } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useSeo } from "@/hooks/use-seo";

const categories = [
  { id: "forgiveness", label: "الاستغفار", icon: "🤲" },
  { id: "stress", label: "الهم والغم", icon: "💫" },
  { id: "travel", label: "السفر", icon: "✈️" },
  { id: "family", label: "الأهل والمنزل", icon: "🏠" },
  { id: "health", label: "الشفاء", icon: "💚" },
];

// Smart context-based suggestions database
const SMART_SUGGESTIONS: Record<string, { title: string; items: { text: string; source: string }[] }> = {
  'عمرة': {
    title: '🕋 أدعية وسنن العمرة',
    items: [
      { text: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً، لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ", source: "دعاء التلبية — متفق عليه" },
      { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَسْأَلَةِ وَخَيْرَ الدُّعَاءِ وَخَيْرَ النَّجَاحِ وَخَيْرَ الْعَمَلِ وَخَيْرَ الثَّوَابِ", source: "دعاء الطواف" },
      { text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", source: "بين الركنين — صحيح مسلم" },
      { text: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ", source: "دعاء بداية السعي — صحيح مسلم" },
      { text: "سُنَّة: الإكثار من الدعاء أثناء الطواف والسعي، والدعاء عند الملتزم، والشرب من زمزم", source: "سنن العمرة" },
    ]
  },
  'حج': {
    title: '🕌 أدعية وسنن الحج',
    items: [
      { text: "لَبَّيْكَ اللَّهُمَّ حَجًّا، لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ", source: "التلبية في الحج" },
      { text: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَـهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ", source: "تكبيرات الحج" },
      { text: "خَيْرُ الدُّعَاءِ دُعَاءُ يَوْمِ عَرَفَةَ، وَخَيْرُ مَا قُلْتُ أَنَا وَالنَّبِيُّونَ مِنْ قَبْلِي: لَا إِلَـهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", source: "دعاء عرفة — الترمذي" },
      { text: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ", source: "دعاء إبراهيم — البقرة:127" },
      { text: "سُنَّة: رمي الجمرات، الحلق أو التقصير، طواف الإفاضة، الإكثار من الذكر والدعاء", source: "سنن الحج" },
    ]
  },
  'سفر': {
    title: '✈️ أدعية وسنن السفر',
    items: [
      { text: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَـٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ", source: "دعاء ركوب الدابة — صحيح مسلم" },
      { text: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى", source: "دعاء السفر — صحيح مسلم" },
      { text: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ", source: "دعاء السفر — صحيح مسلم" },
      { text: "أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لَا تَضِيعُ وَدَائِعُهُ", source: "وداع المسافر — أحمد" },
      { text: "سُنَّة: الجمع والقصر في الصلاة، الدعاء أثناء السفر مستجاب، المسح على الخفين 3 أيام", source: "سنن السفر" },
    ]
  },
  'قرآن': {
    title: '📖 أدعية وسنن قراءة القرآن',
    items: [
      { text: "اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلَاءَ حُزْنِي وَذَهَابَ هَمِّي", source: "دعاء عند قراءة القرآن — أحمد" },
      { text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", source: "الاستعاذة قبل القراءة — النحل:98" },
      { text: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", source: "فضل القرآن — صحيح البخاري" },
      { text: "اقْرَؤُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ", source: "صحيح مسلم" },
      { text: "سُنَّة: الوضوء قبل القراءة، الترتيل، التدبر والتمعن، ختم القرآن والدعاء عند الختم", source: "سنن قراءة القرآن" },
    ]
  },
  'صلاة': {
    title: '🕌 أدعية وسنن الصلاة',
    items: [
      { text: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ", source: "دعاء الاستفتاح — صحيح" },
      { text: "رَبِّ اغْفِرْ لِي رَبِّ اغْفِرْ لِي", source: "دعاء بين السجدتين — أبو داود" },
      { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ", source: "قبل التسليم — صحيح مسلم" },
      { text: "سُنَّة: صلاة 12 ركعة سنة راتبة يومياً، صلاة الضحى، قيام الليل، صلاة الوتر", source: "السنن الرواتب" },
    ]
  },
  'نوم': {
    title: '🌙 أدعية وسنن النوم',
    items: [
      { text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", source: "دعاء النوم — البخاري" },
      { text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", source: "دعاء النوم — أبو داود" },
      { text: "باسمك ربي وضعت جنبي وبك أرفعه، إن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين", source: "صحيح البخاري" },
      { text: "سُنَّة: الوضوء قبل النوم، قراءة آية الكرسي، المعوذات، النوم على الشق الأيمن", source: "سنن النوم" },
    ]
  },
  'صباح': {
    title: '🌅 أذكار وسنن الصباح',
    items: [
      { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَـهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", source: "أذكار الصباح — صحيح مسلم" },
      { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ", source: "أذكار الصباح — الترمذي" },
      { text: "سُنَّة: صلاة الفجر في جماعة، أذكار الصباح، صلاة الضحى، قراءة سورة الكهف يوم الجمعة", source: "سنن الصباح" },
    ]
  },
  'مساء': {
    title: '🌆 أذكار وسنن المساء',
    items: [
      { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَـهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", source: "أذكار المساء — صحيح مسلم" },
      { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", source: "أذكار المساء — صحيح مسلم (3 مرات)" },
      { text: "سُنَّة: صلاة المغرب في وقتها، أذكار المساء، قراءة المعوذات، الوتر قبل النوم", source: "سنن المساء" },
    ]
  },
  'طعام': {
    title: '🍽️ أدعية وسنن الطعام',
    items: [
      { text: "بِسْمِ اللَّهِ", source: "قبل الأكل — صحيح" },
      { text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", source: "بعد الأكل — الترمذي" },
      { text: "سُنَّة: التسمية، الأكل باليمين، الأكل مما يليك، عدم الإسراف", source: "سنن الطعام" },
    ]
  },
  'مرض': {
    title: '💊 أدعية الشفاء والمرض',
    items: [
      { text: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ اشْفِهِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا", source: "رقية الشفاء — متفق عليه" },
      { text: "بِسْمِ اللَّهِ أَرْقِيكَ مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ اللَّهُ يَشْفِيكَ", source: "رقية المريض — صحيح مسلم" },
      { text: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ (7 مرات)", source: "دعاء عيادة المريض — أبو داود" },
    ]
  },
};

// Keywords mapping for smart search
const KEYWORD_MAP: Record<string, string> = {
  'عمرة': 'عمرة', 'اعتمر': 'عمرة', 'بعتمر': 'عمرة', 'معتمر': 'عمرة',
  'حج': 'حج', 'بحج': 'حج', 'حاج': 'حج', 'عرفة': 'حج',
  'سفر': 'سفر', 'بسافر': 'سفر', 'مسافر': 'سفر', 'طيارة': 'سفر', 'رحلة': 'سفر',
  'قرآن': 'قرآن', 'بقرا': 'قرآن', 'اقرا': 'قرآن', 'تلاوة': 'قرآن', 'بقرأ': 'قرآن',
  'صلاة': 'صلاة', 'بصلي': 'صلاة', 'اصلي': 'صلاة', 'صلي': 'صلاة',
  'نوم': 'نوم', 'بنام': 'نوم', 'انام': 'نوم', 'نام': 'نوم',
  'صباح': 'صباح', 'صبح': 'صباح', 'فجر': 'صباح',
  'مساء': 'مساء', 'مغرب': 'مساء', 'عشاء': 'مساء',
  'طعام': 'طعام', 'اكل': 'طعام', 'آكل': 'طعام', 'باكل': 'طعام', 'غداء': 'طعام', 'عشاء': 'طعام',
  'مرض': 'مرض', 'مريض': 'مرض', 'شفاء': 'مرض', 'تعبان': 'مرض', 'وجع': 'مرض',
};

export default function DuasPage() {
  useSeo({
    title: "الأدعية والسنن - أدعية من الكتاب والسنة",
    description: "أدعية وسنن شاملة من القرآن والسنة النبوية. أدعية السفر والعمرة والحج والصلاة والنوم وغيرها. اكتب ما تريد واحصل على الأدعية والسنن المناسبة.",
    keywords: "أدعية، سنن، دعاء، عمرة، حج، سفر، صلاة، نوم، أذكار",
    canonicalPath: "/duas",
  });
  const [selectedCategory, setSelectedCategory] = useState("forgiveness");
  const { data: duasList, isLoading } = useDuas(selectedCategory);
  const [smartQuery, setSmartQuery] = useState("");

  // Smart search result
  const smartResult = useMemo(() => {
    if (!smartQuery.trim()) return null;
    const words = smartQuery.trim().split(/\s+/);
    for (const word of words) {
      const key = KEYWORD_MAP[word];
      if (key && SMART_SUGGESTIONS[key]) {
        return SMART_SUGGESTIONS[key];
      }
    }
    // Fuzzy: check if any keyword is included in the query
    for (const [keyword, category] of Object.entries(KEYWORD_MAP)) {
      if (smartQuery.includes(keyword)) {
        return SMART_SUGGESTIONS[category];
      }
    }
    return null;
  }, [smartQuery]);

  return (
    <div className="min-h-screen pb-32 bg-background">
      <Header title="الأدعية والسنن" subtitle="أدعية وسنن من الكتاب والسنة" />
      
      <main className="container max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-6 space-y-6">
        
        {/* Smart Search */}
        <div className="relative" dir="rtl">
          <div className="relative">
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
            <Input
              value={smartQuery}
              onChange={e => setSmartQuery(e.target.value)}
              placeholder="اكتب أي شيء... بسافر، بروح أعتمر، بقرا قرآن..."
              className="pr-10 pl-10 text-right text-base h-12 rounded-xl border-amber-200 dark:border-amber-800 focus:border-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
            />
            {smartQuery && (
              <button onClick={() => setSmartQuery("")} className="absolute left-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 text-right">
            💡 جرب: "بروح أعتمر" أو "بسافر" أو "بقرا قرآن" أو "بنام"
          </p>
        </div>

        {/* Smart Results */}
        {smartResult && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <h2 className="text-lg font-bold text-right">{smartResult.title}</h2>
            {smartResult.items.map((item, i) => (
              <div key={i} className={cn(
                "p-4 rounded-2xl border text-right",
                item.text.startsWith("سُنَّة:")
                  ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                  : "bg-card border-border"
              )}>
                <p className={cn(
                  "font-bold leading-[2]",
                  item.text.startsWith("سُنَّة:") ? "text-sm text-amber-800 dark:text-amber-200" : "text-base"
                )} style={{ fontFamily: item.text.startsWith("سُنَّة:") ? 'inherit' : "'Amiri', 'Noto Naskh Arabic', serif" }}>
                  {item.text}
                </p>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1 justify-end">
                  📚 {item.source}
                </p>
              </div>
            ))}
          </div>
        )}

        {smartQuery && !smartResult && (
          <div className="text-center py-6 text-muted-foreground bg-card rounded-2xl border border-border">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">لم أجد نتائج مطابقة</p>
            <p className="text-xs mt-1">جرب كلمات مثل: عمرة، حج، سفر، صلاة، قرآن، نوم</p>
          </div>
        )}

        {/* Divider when smart results shown */}
        {smartResult && (
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-bold">أدعية حسب التصنيف</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 flex-row-reverse">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              )}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : duasList && duasList.length > 0 ? (
            duasList.map((item) => (
              <ContentCard
                key={item.id}
                arabic={item.arabicText}
                translation={item.translation}
                reference={item.reference}
              />
            ))
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              لا توجد أدعية لهذا التصنيف حالياً.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
