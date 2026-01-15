import { useState, useMemo } from "react";
import { Loader2, Search, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";

interface HadithData {
    hadith: string;
    grade: string;
    rawi: string;
    mohdith: string;
    book: string;
}

// Local database of verified hadiths for reliable search
const hadithDatabase: HadithData[] = [
    // أحاديث صحيحة مشهورة
    {
        hadith: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه",
        grade: "صحيح",
        rawi: "عمر بن الخطاب",
        mohdith: "البخاري",
        book: "صحيح البخاري"
    },
    {
        hadith: "من كذب علي متعمدًا فليتبوأ مقعده من النار",
        grade: "صحيح متواتر",
        rawi: "أبو هريرة وغيره",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه",
        grade: "صحيح",
        rawi: "عبدالله بن عمرو",
        mohdith: "البخاري",
        book: "صحيح البخاري"
    },
    {
        hadith: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
        grade: "صحيح",
        rawi: "أنس بن مالك",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "من صلى البردين دخل الجنة",
        grade: "صحيح",
        rawi: "أبو موسى الأشعري",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "الطهور شطر الإيمان، والحمد لله تملأ الميزان، وسبحان الله والحمد لله تملآن أو تملأ ما بين السماوات والأرض",
        grade: "صحيح",
        rawi: "أبو مالك الأشعري",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "الصلاة نور، والصدقة برهان، والصبر ضياء، والقرآن حجة لك أو عليك",
        grade: "صحيح",
        rawi: "أبو مالك الأشعري",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "خيركم من تعلم القرآن وعلمه",
        grade: "صحيح",
        rawi: "عثمان بن عفان",
        mohdith: "البخاري",
        book: "صحيح البخاري"
    },
    {
        hadith: "الدين النصيحة، قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم",
        grade: "صحيح",
        rawi: "تميم الداري",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "من رأى منكم منكرًا فليغيره بيده، فإن لم يستطع فبلسانه، فإن لم يستطع فبقلبه، وذلك أضعف الإيمان",
        grade: "صحيح",
        rawi: "أبو سعيد الخدري",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "من حسن إسلام المرء تركه ما لا يعنيه",
        grade: "حسن",
        rawi: "أبو هريرة",
        mohdith: "الترمذي",
        book: "جامع الترمذي"
    },
    {
        hadith: "لا ضرر ولا ضرار",
        grade: "صحيح",
        rawi: "عبادة بن الصامت",
        mohdith: "ابن ماجه",
        book: "سنن ابن ماجه"
    },
    {
        hadith: "البر حسن الخلق، والإثم ما حاك في نفسك وكرهت أن يطلع عليه الناس",
        grade: "صحيح",
        rawi: "النواس بن سمعان",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن",
        grade: "حسن",
        rawi: "أبو ذر ومعاذ بن جبل",
        mohdith: "الترمذي",
        book: "جامع الترمذي"
    },
    {
        hadith: "الحياء من الإيمان",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "ما ملأ آدمي وعاء شرًّا من بطنه، بحسب ابن آدم أكلات يقمن صلبه",
        grade: "صحيح",
        rawi: "المقدام بن معديكرب",
        mohdith: "الترمذي",
        book: "جامع الترمذي"
    },
    {
        hadith: "الدنيا سجن المؤمن وجنة الكافر",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "كل أمتي يدخلون الجنة إلا من أبى، قالوا: ومن يأبى يا رسول الله؟ قال: من أطاعني دخل الجنة، ومن عصاني فقد أبى",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        book: "صحيح البخاري"
    },
    {
        hadith: "أحب الأعمال إلى الله أدومها وإن قل",
        grade: "صحيح",
        rawi: "عائشة",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "أفضل الصيام بعد رمضان شهر الله المحرم، وأفضل الصلاة بعد الفريضة صلاة الليل",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    // أحاديث ضعيفة وموضوعة للتحذير
    {
        hadith: "من لم تنهه صلاته عن الفحشاء والمنكر لم يزدد من الله إلا بعدًا",
        grade: "ضعيف",
        rawi: "ابن عباس",
        mohdith: "الطبراني",
        book: "المعجم الكبير"
    },
    {
        hadith: "اختلاف أمتي رحمة",
        grade: "لا أصل له",
        rawi: "-",
        mohdith: "الألباني",
        book: "السلسلة الضعيفة"
    },
    {
        hadith: "حب الوطن من الإيمان",
        grade: "موضوع",
        rawi: "-",
        mohdith: "الصغاني",
        book: "الموضوعات"
    },
    {
        hadith: "أنا مدينة العلم وعلي بابها",
        grade: "موضوع",
        rawi: "-",
        mohdith: "ابن الجوزي",
        book: "الموضوعات"
    },
    {
        hadith: "الجنة تحت أقدام الأمهات",
        grade: "ضعيف",
        rawi: "-",
        mohdith: "العراقي",
        book: "المغني عن حمل الأسفار"
    },
    {
        hadith: "أدبني ربي فأحسن تأديبي",
        grade: "لا أصل له",
        rawi: "-",
        mohdith: "السخاوي",
        book: "المقاصد الحسنة"
    },
    // المزيد من الأحاديث الصحيحة
    {
        hadith: "إن من أحبكم إلي وأقربكم مني مجلسًا يوم القيامة أحاسنكم أخلاقًا",
        grade: "صحيح",
        rawi: "جابر بن عبدالله",
        mohdith: "الترمذي",
        book: "جامع الترمذي"
    },
    {
        hadith: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "لا تحاسدوا، ولا تناجشوا، ولا تباغضوا، ولا تدابروا، وكونوا عباد الله إخوانًا",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
    {
        hadith: "الظلم ظلمات يوم القيامة",
        grade: "صحيح",
        rawi: "عبدالله بن عمر",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "لا يدخل الجنة قاطع رحم",
        grade: "صحيح",
        rawi: "جبير بن مطعم",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "من صام رمضان إيمانًا واحتسابًا غفر له ما تقدم من ذنبه",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "من قام رمضان إيمانًا واحتسابًا غفر له ما تقدم من ذنبه",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "من قام ليلة القدر إيمانًا واحتسابًا غفر له ما تقدم من ذنبه",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "الصوم جُنة، فإذا كان يوم صوم أحدكم فلا يرفث ولا يصخب",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "تسحروا فإن في السحور بركة",
        grade: "صحيح",
        rawi: "أنس بن مالك",
        mohdith: "البخاري ومسلم",
        book: "متفق عليه"
    },
    {
        hadith: "من لم يدع قول الزور والعمل به فليس لله حاجة في أن يدع طعامه وشرابه",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        book: "صحيح البخاري"
    },
    {
        hadith: "رب صائم ليس له من صيامه إلا الجوع، ورب قائم ليس له من قيامه إلا السهر",
        grade: "صحيح",
        rawi: "أبو هريرة",
        mohdith: "ابن ماجه",
        book: "سنن ابن ماجه"
    },
    {
        hadith: "صلوا كما رأيتموني أصلي",
        grade: "صحيح",
        rawi: "مالك بن الحويرث",
        mohdith: "البخاري",
        book: "صحيح البخاري"
    },
    {
        hadith: "خذوا عني مناسككم",
        grade: "صحيح",
        rawi: "جابر بن عبدالله",
        mohdith: "مسلم",
        book: "صحيح مسلم"
    },
];

function searchHadiths(query: string, authenticOnly: boolean): HadithData[] {
    if (!query.trim()) return [];

    const normalizedQuery = query.trim().toLowerCase();
    const words = normalizedQuery.split(/\s+/);

    let results = hadithDatabase.filter(h => {
        // Check if hadith text contains the search words
        const hadithLower = h.hadith.toLowerCase();
        return words.some(word => hadithLower.includes(word));
    });

    // Sort by relevance (more matching words = higher)
    results.sort((a, b) => {
        const scoreA = words.filter(w => a.hadith.toLowerCase().includes(w)).length;
        const scoreB = words.filter(w => b.hadith.toLowerCase().includes(w)).length;
        return scoreB - scoreA;
    });

    // Then sort by grade
    results.sort((a, b) => {
        const gradeOrder = (grade: string) => {
            const g = grade.toLowerCase();
            if (g.includes("صحيح متواتر")) return 0;
            if (g.includes("صحيح") && !g.includes("ضعيف")) return 1;
            if (g.includes("حسن")) return 2;
            if (g.includes("ضعيف")) return 10;
            if (g.includes("موضوع") || g.includes("لا أصل")) return 11;
            return 5;
        };
        return gradeOrder(a.grade) - gradeOrder(b.grade);
    });

    // Filter if authenticOnly
    if (authenticOnly) {
        results = results.filter(r => {
            const g = r.grade.toLowerCase();
            return (g.includes("صحيح") || g.includes("حسن")) && !g.includes("ضعيف") && !g.includes("موضوع") && !g.includes("لا أصل");
        });
    }

    return results;
}

export default function HadithVerify() {
    const [query, setQuery] = useState("");
    const [authenticOnly, setAuthenticOnly] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const results = useMemo(() => {
        if (!hasSearched) return [];
        return searchHadiths(query, authenticOnly);
    }, [query, authenticOnly, hasSearched]);

    const handleSearch = () => {
        if (!query.trim()) return;
        setHasSearched(true);
    };

    const getGradeBorderColor = (grade: string) => {
        const g = grade.toLowerCase();
        if (g.includes("صحيح") && !g.includes("ضعيف")) return "border-l-emerald-500";
        if (g.includes("حسن")) return "border-l-blue-500";
        if (g.includes("ضعيف")) return "border-l-orange-500";
        if (g.includes("موضوع") || g.includes("لا أصل")) return "border-l-red-500";
        return "border-l-slate-500";
    };

    const getGradeBadgeColor = (grade: string) => {
        const g = grade.toLowerCase();
        if (g.includes("صحيح") && !g.includes("ضعيف")) return "bg-emerald-600 text-white";
        if (g.includes("حسن")) return "bg-blue-600 text-white";
        if (g.includes("ضعيف")) return "bg-orange-600 text-white";
        if (g.includes("موضوع") || g.includes("لا أصل")) return "bg-red-600 text-white";
        return "bg-slate-600 text-white";
    };

    return (
        <div className="min-h-screen bg-[#0a0f14] pb-24">
            {/* Header - Purple Gradient */}
            <header className="bg-gradient-to-b from-violet-900/60 to-[#0a0f14] pb-8">
                <div className="container max-w-4xl mx-auto px-4 pt-6">
                    <div className="flex items-center gap-4 mb-6">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400 text-center mb-2">
                        التحقق من صحة الحديث
                    </h1>
                    <p className="text-slate-400 text-center text-sm">
                        ابحث في قاعدة بيانات الأحاديث المُحققة
                    </p>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-4 -mt-4 space-y-6">
                {/* Search Box */}
                <div className="bg-[#131a24] rounded-xl p-4 border border-white/5 space-y-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="ابحث: النيات، الأعمال، الصوم، الإيمان..."
                            className="w-full h-12 bg-[#1a2332] border-white/10 text-white placeholder:text-slate-500 pr-12 text-base rounded-lg"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                if (hasSearched) setHasSearched(false);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Button
                            className="h-9 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm"
                            onClick={handleSearch}
                            disabled={!query.trim()}
                        >
                            بحث
                        </Button>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="authentic"
                                checked={authenticOnly}
                                onCheckedChange={(checked) => {
                                    setAuthenticOnly(!!checked);
                                    if (hasSearched) setHasSearched(true);
                                }}
                                className="border-white/30 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                            />
                            <label htmlFor="authentic" className="text-sm text-slate-400 cursor-pointer">
                                الأحاديث الصحيحة فقط
                            </label>
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-300/80 text-sm">
                        هذه قاعدة بيانات محلية تحتوي على أشهر الأحاديث المُحققة. للبحث الشامل، يُنصح بالرجوع إلى موقع الدرر السنية.
                    </p>
                </div>

                {/* Results Count */}
                {hasSearched && (
                    <div className="text-center text-slate-400 text-sm">
                        نتائج البحث ({results.length})
                    </div>
                )}

                {/* Results */}
                <div className="space-y-3">
                    {results.map((result, i) => (
                        <div
                            key={i}
                            className={`bg-[#131a24] rounded-lg border border-white/5 border-l-4 ${getGradeBorderColor(result.grade)} overflow-hidden`}
                        >
                            <div className="p-4 space-y-3">
                                {/* Grade Badge */}
                                <div className="flex items-start justify-between gap-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getGradeBadgeColor(result.grade)}`}>
                                        {result.grade}
                                    </span>
                                </div>

                                {/* Hadith Text */}
                                <p className="text-white/90 text-base leading-loose font-arabic">
                                    {result.hadith}
                                </p>

                                {/* Metadata */}
                                <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-white/5">
                                    <div>الراوي: {result.rawi}</div>
                                    <div>المصدر: {result.book}</div>
                                    {result.mohdith && <div>المحدث: {result.mohdith}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {hasSearched && results.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>لم يتم العثور على نتائج لـ "{query}"</p>
                        <p className="text-sm mt-2">جرب كلمات مثل: الأعمال، النيات، الصوم، الصلاة...</p>
                    </div>
                )}

                {/* Examples (before search) */}
                {!hasSearched && (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground text-center">أمثلة للبحث:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {["الأعمال بالنيات", "كذب علي", "صام رمضان", "الطهور", "القرآن", "الظلم"].map((example) => (
                                <button
                                    key={example}
                                    onClick={() => {
                                        setQuery(example);
                                        setHasSearched(true);
                                    }}
                                    className="p-3 bg-[#131a24] border border-white/5 rounded-xl text-sm text-slate-400 hover:text-white hover:border-emerald-500/50 transition-colors text-center"
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
