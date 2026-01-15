import { useState, useMemo } from "react";
import { Sparkles, ArrowRight, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

interface Suggestion {
    title: string;
    type: "dua" | "sunnah" | "adhkar";
    text: string;
    source?: string;
    keywords: string[];
}

// Database of duas and sunnahs with keywords
const suggestionsDatabase: Suggestion[] = [
    // الخروج من المنزل
    {
        title: "دعاء الخروج من المنزل",
        type: "dua",
        text: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        source: "أخرجه أبو داود والترمذي",
        keywords: ["خروج", "المنزل", "البيت", "طالع", "رايح", "خارج", "اطلع", "اخرج"]
    },
    {
        title: "دعاء الخروج - الحفظ من الشر",
        type: "dua",
        text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ",
        source: "أخرجه أبو داود",
        keywords: ["خروج", "المنزل", "البيت", "طالع", "رايح", "خارج"]
    },
    // السوق والتسوق
    {
        title: "دعاء دخول السوق",
        type: "dua",
        text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        source: "أخرجه الترمذي",
        keywords: ["سوق", "تسوق", "مول", "محل", "شراء", "اشتري", "سوبرماركت", "بقالة"]
    },
    {
        title: "سنة في السوق",
        type: "sunnah",
        text: "لا ترفع الصوت، ولا تتعجل، وتصدق على الفقراء إن استطعت، واحذر من الغش والكذب",
        keywords: ["سوق", "تسوق", "مول"]
    },
    // المسجد
    {
        title: "دعاء الذهاب للمسجد",
        type: "dua",
        text: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ فِي سَمْعِي نُورًا، وَاجْعَلْ فِي بَصَرِي نُورًا",
        source: "متفق عليه",
        keywords: ["مسجد", "جامع", "صلاة", "صلي", "اصلي", "الجمعة"]
    },
    {
        title: "دعاء دخول المسجد",
        type: "dua",
        text: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        source: "أخرجه مسلم",
        keywords: ["مسجد", "جامع", "دخول"]
    },
    {
        title: "تحية المسجد",
        type: "sunnah",
        text: "صلاة ركعتين قبل الجلوس (تحية المسجد)",
        keywords: ["مسجد", "جامع"]
    },
    {
        title: "دعاء الخروج من المسجد",
        type: "dua",
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        source: "أخرجه مسلم",
        keywords: ["مسجد", "جامع", "خروج"]
    },
    // النوم
    {
        title: "دعاء النوم",
        type: "dua",
        text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        source: "متفق عليه",
        keywords: ["نوم", "نايم", "انام", "سرير", "نعسان", "رقود"]
    },
    {
        title: "سنن قبل النوم",
        type: "sunnah",
        text: "قراءة آية الكرسي وسورة الإخلاص والمعوذتين ثلاث مرات، والنوم على الشق الأيمن",
        keywords: ["نوم", "نايم", "انام", "سرير"]
    },
    // الاستيقاظ
    {
        title: "دعاء الاستيقاظ",
        type: "dua",
        text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        source: "متفق عليه",
        keywords: ["استيقاظ", "صحيت", "قمت", "صباح", "فجر"]
    },
    {
        title: "سنة الاستيقاظ",
        type: "sunnah",
        text: "السواك عند الاستيقاظ، والوضوء، وصلاة ركعتي الفجر",
        keywords: ["استيقاظ", "صحيت", "قمت", "صباح"]
    },
    // الطعام
    {
        title: "دعاء قبل الطعام",
        type: "dua",
        text: "بِسْمِ اللَّهِ",
        source: "أخرجه أبو داود",
        keywords: ["اكل", "طعام", "غداء", "عشاء", "فطور", "وجبة", "مطعم"]
    },
    {
        title: "دعاء بعد الطعام",
        type: "dua",
        text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        source: "أخرجه أبو داود والترمذي",
        keywords: ["اكل", "طعام", "غداء", "عشاء", "فطور", "وجبة", "مطعم", "انتهيت"]
    },
    {
        title: "سنن الطعام",
        type: "sunnah",
        text: "الأكل باليد اليمنى، ومما يليك، وعدم الإسراف",
        keywords: ["اكل", "طعام", "غداء", "عشاء"]
    },
    // السفر
    {
        title: "دعاء السفر",
        type: "dua",
        text: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        source: "أخرجه مسلم",
        keywords: ["سفر", "مسافر", "رحلة", "طيارة", "مطار", "سيارة", "قطار"]
    },
    {
        title: "سنن السفر",
        type: "sunnah",
        text: "قصر الصلاة الرباعية إلى ركعتين، والجمع بين الظهر والعصر أو المغرب والعشاء",
        keywords: ["سفر", "مسافر", "رحلة"]
    },
    // ركوب السيارة
    {
        title: "دعاء ركوب السيارة",
        type: "dua",
        text: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        source: "أخرجه مسلم",
        keywords: ["سيارة", "ركوب", "سواقة", "قيادة", "سوق", "اسوق"]
    },
    // زيارة المريض
    {
        title: "دعاء للمريض",
        type: "dua",
        text: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
        source: "متفق عليه",
        keywords: ["مريض", "مستشفى", "عيادة", "مرض", "زيارة", "عافية"]
    },
    {
        title: "سنة زيارة المريض",
        type: "sunnah",
        text: "وضع اليد على موضع الألم والدعاء، وتخفيف الزيارة وعدم الإطالة",
        keywords: ["مريض", "زيارة", "مستشفى"]
    },
    // الحمام
    {
        title: "دعاء دخول الخلاء",
        type: "dua",
        text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        source: "متفق عليه",
        keywords: ["حمام", "خلاء", "دورة مياه", "مرحاض"]
    },
    {
        title: "دعاء الخروج من الخلاء",
        type: "dua",
        text: "غُفْرَانَكَ",
        source: "أخرجه الترمذي",
        keywords: ["حمام", "خلاء", "خروج"]
    },
    // اللباس
    {
        title: "دعاء لبس الثوب الجديد",
        type: "dua",
        text: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
        source: "أخرجه أبو داود والترمذي",
        keywords: ["ثوب", "لبس", "ملابس", "جديد", "شراء"]
    },
    // المطر
    {
        title: "دعاء نزول المطر",
        type: "dua",
        text: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        source: "أخرجه البخاري",
        keywords: ["مطر", "غيث", "سحاب", "برق", "رعد"]
    },
    // العمل والدراسة
    {
        title: "دعاء بداية العمل",
        type: "dua",
        text: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
        source: "سورة طه",
        keywords: ["عمل", "شغل", "دوام", "مكتب", "دراسة", "جامعة", "مدرسة", "اختبار", "امتحان"]
    },
    {
        title: "سنة في العمل",
        type: "sunnah",
        text: "الإخلاص في العمل والإتقان، وعدم الغش، والصدق في المعاملة",
        keywords: ["عمل", "شغل", "دوام"]
    },
    // الضيف
    {
        title: "دعاء للمضيف",
        type: "dua",
        text: "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ",
        source: "أخرجه مسلم",
        keywords: ["ضيف", "ضيافة", "زيارة", "عزيمة", "اكل عند"]
    },
    // المشي والرياضة
    {
        title: "دعاء الخروج للمشي",
        type: "dua",
        text: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        source: "أخرجه أبو داود والترمذي",
        keywords: ["مشي", "تمشي", "اتمشى", "رياضة", "جري", "نادي", "كورنيش", "حديقة", "تريض"]
    },
    {
        title: "سنة في المشي",
        type: "sunnah",
        text: "التسبيح والذكر أثناء المشي، وعدم الأذى للناس، والتأمل في خلق الله",
        keywords: ["مشي", "تمشي", "رياضة"]
    },
    // دخول المنزل
    {
        title: "دعاء دخول المنزل",
        type: "dua",
        text: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
        source: "أخرجه أبو داود",
        keywords: ["دخول", "رجعت", "وصلت", "البيت", "المنزل"]
    },
    {
        title: "سنة دخول المنزل",
        type: "sunnah",
        text: "السلام على أهل البيت، والسواك، وصلاة ركعتين إن أمكن",
        keywords: ["دخول", "رجعت", "البيت", "المنزل"]
    },
    // الصباح
    {
        title: "أذكار الصباح",
        type: "adhkar",
        text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        source: "أخرجه مسلم",
        keywords: ["صباح", "صبحت", "قمت", "فجر", "صباحية"]
    },
    // المساء
    {
        title: "أذكار المساء",
        type: "adhkar",
        text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        source: "أخرجه مسلم",
        keywords: ["مساء", "ليل", "غروب", "مغرب", "عشاء", "مسائية"]
    },
    // الوضوء
    {
        title: "دعاء بعد الوضوء",
        type: "dua",
        text: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
        source: "أخرجه الترمذي",
        keywords: ["وضوء", "توضأ", "اتوضأ"]
    },
    // الشرب
    {
        title: "سنن الشرب",
        type: "sunnah",
        text: "التسمية أولاً، والشرب جالساً، وعلى ثلاث دفعات، والحمد بعد الانتهاء",
        keywords: ["شرب", "ماء", "عطشان", "اشرب"]
    },
    // النظر في المرآة
    {
        title: "دعاء النظر في المرآة",
        type: "dua",
        text: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
        source: "أخرجه أحمد",
        keywords: ["مرآه", "مراه", "تمشط", "جاهز", "تزين"]
    },
    // الهم والضيق
    {
        title: "دعاء الهم والحزن",
        type: "dua",
        text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        source: "متفق عليه",
        keywords: ["هم", "ضيق", "حزن", "قلق", "تعبان", "مهموم", "زعلان"]
    },
    // الخوف
    {
        title: "دعاء الخوف",
        type: "dua",
        text: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
        source: "متفق عليه",
        keywords: ["خوف", "خايف", "قلقان", "متوتر"]
    },
];

function findSuggestions(query: string): Suggestion[] {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase();
    const results: { suggestion: Suggestion; score: number }[] = [];

    for (const suggestion of suggestionsDatabase) {
        let score = 0;
        for (const keyword of suggestion.keywords) {
            if (normalizedQuery.includes(keyword)) {
                score += 2;
            }
        }
        if (score > 0) {
            results.push({ suggestion, score });
        }
    }

    // Sort by score and return top matches
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 6).map(r => r.suggestion);
}

export default function SmartAssistant() {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const suggestions = useMemo(() => {
        if (!hasSearched) return [];
        return findSuggestions(query);
    }, [query, hasSearched]);

    const handleSearch = () => {
        if (!query.trim()) return;
        setIsSearching(true);
        setHasSearched(true);
        // Small delay for UX
        setTimeout(() => {
            setIsSearching(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-b from-emerald-900/80 to-background backdrop-blur-xl border-b border-white/10">
                <div className="container max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <Sparkles className="w-5 h-5 text-emerald-300" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">المساعد الذكي</h1>
                                <p className="text-emerald-200/70 text-xs">اكتب وش رايح تسوي وراح أعطيك الأدعية والسنن</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Search Input */}
                <div className="bg-card rounded-xl border border-border p-4 space-y-4">
                    <Textarea
                        placeholder="مثال: رايح السوق، طالع للمسجد، نايم، جالس اكل..."
                        className="min-h-[80px] resize-none bg-background border-border text-base"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (hasSearched) setHasSearched(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                    />
                    <Button
                        className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleSearch}
                        disabled={!query.trim() || isSearching}
                    >
                        {isSearching ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                        ابحث عن الأدعية والسنن
                    </Button>
                </div>

                {/* Results */}
                {hasSearched && (
                    <div className="space-y-4">
                        {suggestions.length > 0 ? (
                            <>
                                <p className="text-sm text-muted-foreground text-center">
                                    وجدت {suggestions.length} نتائج
                                </p>
                                <div className="space-y-3">
                                    {suggestions.map((suggestion, i) => (
                                        <Card key={i} className="p-4 border-l-4 border-l-emerald-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${suggestion.type === "dua"
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                    : suggestion.type === "sunnah"
                                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                    }`}>
                                                    {suggestion.type === "dua" ? "دعاء" : suggestion.type === "sunnah" ? "سنة" : "ذكر"}
                                                </span>
                                                <span className="text-sm font-medium">{suggestion.title}</span>
                                            </div>
                                            <p className="text-base leading-loose font-arabic text-foreground/90">
                                                {suggestion.text}
                                            </p>
                                            {suggestion.source && (
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {suggestion.source}
                                                </p>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>لم أجد نتائج لـ "{query}"</p>
                                <p className="text-sm mt-2">جرب كلمات مثل: السوق، المسجد، النوم، الطعام...</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Examples (before search) */}
                {!hasSearched && (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground text-center">أمثلة يمكنك كتابتها:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {["رايح السوق", "رايح المسجد", "طالع اتمشى", "بنام", "جالس اكل", "مسافر", "رايح الشغل", "تعبان ومهموم"].map((example) => (
                                <button
                                    key={example}
                                    onClick={() => {
                                        setQuery(example);
                                        setHasSearched(true);
                                    }}
                                    className="p-3 bg-card border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors text-center"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
