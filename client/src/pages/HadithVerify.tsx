import { useState } from "react";
import { Loader2, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";

interface HadithResult {
    hadith: string;
    grade: string;
    rawi: string;
    source: string;
}

// Sample hadiths database for searching
const hadithDatabase: HadithResult[] = [
    {
        hadith: "عليكم بهذه الخمس : سبحان الله ، والحمد لله ، ولا إله إلا الله ، والله أكبر ، ولا حول ولا قوة إلا بالله .",
        grade: "صحيح",
        rawi: "أبو موسى الأشعري",
        source: "الجامع الصغير"
    },
    {
        hadith: "أفضل الكلام : سبحان الله والحمد لله ولا إله إلا الله والله أكبر .",
        grade: "إسناده صحيح",
        rawi: "رجل من الصحابة",
        source: "المسند الرابع"
    },
    {
        hadith: "سبحان الله والحمد لله ولا إله إلا الله والله أكبر تملأ الميزان",
        grade: "رجاله رجال الصحيح",
        rawi: "أبو مالك الأشعري",
        source: "صحيح مسلم"
    },
    {
        hadith: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم",
        grade: "صحيح",
        rawi: "أبو هريرة",
        source: "صحيح البخاري"
    },
    {
        hadith: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه",
        grade: "صحيح",
        rawi: "عمر بن الخطاب",
        source: "صحيح البخاري"
    },
    {
        hadith: "من كذب علي متعمدًا فليتبوأ مقعده من النار",
        grade: "صحيح متواتر",
        rawi: "أبو هريرة وغيره",
        source: "متفق عليه"
    },
    {
        hadith: "المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه",
        grade: "صحيح",
        rawi: "عبدالله بن عمرو",
        source: "صحيح البخاري"
    },
    {
        hadith: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
        grade: "صحيح",
        rawi: "أنس بن مالك",
        source: "متفق عليه"
    },
    {
        hadith: "الطهور شطر الإيمان، والحمد لله تملأ الميزان، وسبحان الله والحمد لله تملآن ما بين السماوات والأرض",
        grade: "صحيح",
        rawi: "أبو مالك الأشعري",
        source: "صحيح مسلم"
    },
    {
        hadith: "الصلاة نور، والصدقة برهان، والصبر ضياء، والقرآن حجة لك أو عليك",
        grade: "صحيح",
        rawi: "أبو مالك الأشعري",
        source: "صحيح مسلم"
    },
    {
        hadith: "خيركم من تعلم القرآن وعلمه",
        grade: "صحيح",
        rawi: "عثمان بن عفان",
        source: "صحيح البخاري"
    },
    {
        hadith: "الدين النصيحة، قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم",
        grade: "صحيح",
        rawi: "تميم الداري",
        source: "صحيح مسلم"
    },
    {
        hadith: "من رأى منكم منكرًا فليغيره بيده، فإن لم يستطع فبلسانه، فإن لم يستطع فبقلبه، وذلك أضعف الإيمان",
        grade: "صحيح",
        rawi: "أبو سعيد الخدري",
        source: "صحيح مسلم"
    },
    {
        hadith: "من حسن إسلام المرء تركه ما لا يعنيه",
        grade: "حسن",
        rawi: "أبو هريرة",
        source: "جامع الترمذي"
    },
    {
        hadith: "لا ضرر ولا ضرار",
        grade: "صحيح",
        rawi: "عبادة بن الصامت",
        source: "سنن ابن ماجه"
    },
    {
        hadith: "البر حسن الخلق، والإثم ما حاك في نفسك وكرهت أن يطلع عليه الناس",
        grade: "صحيح",
        rawi: "النواس بن سمعان",
        source: "صحيح مسلم"
    },
    {
        hadith: "اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن",
        grade: "حسن",
        rawi: "أبو ذر ومعاذ بن جبل",
        source: "جامع الترمذي"
    },
    {
        hadith: "الحياء من الإيمان",
        grade: "صحيح",
        rawi: "أبو هريرة",
        source: "متفق عليه"
    },
    {
        hadith: "الدنيا سجن المؤمن وجنة الكافر",
        grade: "صحيح",
        rawi: "أبو هريرة",
        source: "صحيح مسلم"
    },
    {
        hadith: "إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم",
        grade: "صحيح",
        rawi: "أبو هريرة",
        source: "صحيح مسلم"
    },
    {
        hadith: "أحب الأعمال إلى الله أدومها وإن قل",
        grade: "صحيح",
        rawi: "عائشة",
        source: "متفق عليه"
    },
    {
        hadith: "الظلم ظلمات يوم القيامة",
        grade: "صحيح",
        rawi: "عبدالله بن عمر",
        source: "متفق عليه"
    },
    {
        hadith: "لا يدخل الجنة قاطع رحم",
        grade: "صحيح",
        rawi: "جبير بن مطعم",
        source: "متفق عليه"
    },
    {
        hadith: "من صام رمضان إيمانًا واحتسابًا غفر له ما تقدم من ذنبه",
        grade: "صحيح",
        rawi: "أبو هريرة",
        source: "متفق عليه"
    },
    {
        hadith: "صلوا كما رأيتموني أصلي",
        grade: "صحيح",
        rawi: "مالك بن الحويرث",
        source: "صحيح البخاري"
    },
    {
        hadith: "تسحروا فإن في السحور بركة",
        grade: "صحيح",
        rawi: "أنس بن مالك",
        source: "متفق عليه"
    },
    // أحاديث ضعيفة
    {
        hadith: "اختلاف أمتي رحمة",
        grade: "لا أصل له",
        rawi: "-",
        source: "السلسلة الضعيفة"
    },
    {
        hadith: "حب الوطن من الإيمان",
        grade: "موضوع",
        rawi: "-",
        source: "الموضوعات"
    },
];

function searchHadiths(query: string, authenticOnly: boolean): HadithResult[] {
    if (!query.trim()) return [];

    const words = query.trim().split(/\s+/);

    let results = hadithDatabase.filter(h => {
        return words.some(word => h.hadith.includes(word));
    });

    // Sort by relevance
    results.sort((a, b) => {
        const scoreA = words.filter(w => a.hadith.includes(w)).length;
        const scoreB = words.filter(w => b.hadith.includes(w)).length;
        return scoreB - scoreA;
    });

    // Sort by grade
    results.sort((a, b) => {
        const gradeOrder = (grade: string) => {
            const g = grade.toLowerCase();
            if (g.includes("صحيح متواتر")) return 0;
            if (g.includes("صحيح") && !g.includes("ضعيف")) return 1;
            if (g.includes("إسناده صحيح")) return 2;
            if (g.includes("رجاله رجال الصحيح")) return 3;
            if (g.includes("حسن")) return 4;
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
            return (g.includes("صحيح") || g.includes("حسن") || g.includes("رجال") || g.includes("إسناده"))
                && !g.includes("ضعيف") && !g.includes("موضوع") && !g.includes("لا أصل");
        });
    }

    return results;
}

function highlightText(text: string, query: string): React.ReactNode {
    if (!query.trim()) return text;

    const words = query.trim().split(/\s+/);
    let result = text;

    words.forEach(word => {
        if (word.length > 1) {
            result = result.replace(new RegExp(word, 'g'), `<mark class="bg-emerald-400/30 text-white px-0.5 rounded">${word}</mark>`);
        }
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

function getGradeBadge(grade: string) {
    const g = grade.toLowerCase();

    if (g.includes("صحيح") || g.includes("إسناده صحيح") || g.includes("رجال")) {
        return {
            bg: "bg-emerald-600",
            text: "text-white",
            icon: true
        };
    }
    if (g.includes("حسن")) {
        return {
            bg: "bg-blue-600",
            text: "text-white",
            icon: true
        };
    }
    if (g.includes("ضعيف")) {
        return {
            bg: "bg-orange-600",
            text: "text-white",
            icon: false
        };
    }
    if (g.includes("موضوع") || g.includes("لا أصل")) {
        return {
            bg: "bg-red-600",
            text: "text-white",
            icon: false
        };
    }
    return {
        bg: "bg-slate-600",
        text: "text-white",
        icon: false
    };
}

export default function HadithVerify() {
    const [query, setQuery] = useState("");
    const [authenticOnly, setAuthenticOnly] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const results = hasSearched ? searchHadiths(query, authenticOnly) : [];

    const handleSearch = () => {
        if (!query.trim()) return;
        setIsLoading(true);
        setTimeout(() => {
            setHasSearched(true);
            setIsLoading(false);
        }, 300);
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
                        أدخل نص الحديث أو جزء منه للتحقق من صحته.
                    </p>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-4 -mt-4 space-y-6">
                {/* Search Box */}
                <div className="bg-[#131a24] rounded-xl p-4 border border-white/5 space-y-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="سبحان الله والحمدلله ولا اله الا الله..."
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
                            disabled={!query.trim() || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "تحقق"
                            )}
                        </Button>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="authentic"
                                checked={authenticOnly}
                                onCheckedChange={(checked) => {
                                    setAuthenticOnly(!!checked);
                                    if (hasSearched) {
                                        setHasSearched(false);
                                        setTimeout(() => setHasSearched(true), 50);
                                    }
                                }}
                                className="border-white/30 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                            />
                            <label htmlFor="authentic" className="text-sm text-slate-400 cursor-pointer">
                                الأحاديث الصحيحة فقط
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                {hasSearched && (
                    <div className="text-center text-slate-400 text-sm">
                        نتائج البحث ({results.length})
                    </div>
                )}

                {/* Results */}
                {hasSearched && (
                    <div className="space-y-3">
                        {results.map((result, i) => {
                            const badge = getGradeBadge(result.grade);
                            return (
                                <div
                                    key={i}
                                    className="bg-[#3d3d2a] rounded-lg overflow-hidden"
                                >
                                    <div className="p-4 space-y-3">
                                        {/* Grade Badge */}
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                                                {badge.icon && <CheckCircle2 className="w-3 h-3" />}
                                                {result.grade}
                                            </span>
                                        </div>

                                        {/* Hadith Text */}
                                        <p className="text-white text-base leading-loose font-arabic" dir="rtl">
                                            {highlightText(result.hadith, query)}
                                        </p>

                                        {/* Metadata */}
                                        <div className="text-xs text-slate-400 space-y-0.5">
                                            <div>الراوي: {result.rawi}</div>
                                            <div>المصدر: {result.source}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                    </div>
                )}

                {/* Empty State */}
                {hasSearched && !isLoading && results.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>لم يتم العثور على نتائج</p>
                    </div>
                )}
            </main>
        </div>
    );
}
