import { useState, useEffect } from "react";
import { Loader2, Search, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";

interface HadithResult {
    hadith: string;
    grade: string;
    rawi: string;
    book: string;
}

export default function HadithVerify() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<HadithResult[]>([]);
    const [authenticOnly, setAuthenticOnly] = useState(false);
    const [searchCount, setSearchCount] = useState(0);

    // Auto-refresh when returning to page
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && query.trim()) {
                handleSearch();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [query]);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            // Using Dorar al-Saniya API
            const url = `https://dorar-hadith-api.herokuapp.com/api/search?value=${encodeURIComponent(query)}${authenticOnly ? '&sahih=true' : ''}`;

            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to search");

            const data = await res.json();

            // Parse results
            const parsedResults: HadithResult[] = (data.ahadith || []).map((item: any) => ({
                hadith: item.hadith || item.text || "",
                grade: item.grade || item.degree || "غير محدد",
                rawi: item.rawi || item.narrator || "غير معروف",
                book: item.book || item.source || "المصدر غير محدد",
            }));

            setResults(parsedResults);
            setSearchCount(data.count || parsedResults.length);
        } catch (error) {
            console.error("Search error:", error);
            // Fallback: try local API
            try {
                const localRes = await fetch("/api/hadith/verification", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: query, authenticOnly }),
                });
                if (localRes.ok) {
                    const localData = await localRes.json();
                    setResults(localData.results || []);
                    setSearchCount(localData.count || 0);
                }
            } catch {
                setResults([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getGradeStyle = (grade: string) => {
        const lowerGrade = grade.toLowerCase();
        if (lowerGrade.includes("صحيح") || lowerGrade.includes("sahih")) {
            return "bg-emerald-600 text-white";
        }
        if (lowerGrade.includes("حسن") || lowerGrade.includes("hasan")) {
            return "bg-blue-600 text-white";
        }
        if (lowerGrade.includes("ضعيف") || lowerGrade.includes("daif")) {
            return "bg-amber-600 text-white";
        }
        if (lowerGrade.includes("موضوع") || lowerGrade.includes("fabricat")) {
            return "bg-red-600 text-white";
        }
        return "bg-slate-600 text-white";
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-b from-violet-900/80 to-violet-800/60 backdrop-blur-xl border-b border-white/10">
                <div className="container max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
                        التحقق من صحة الحديث
                    </h1>
                    <p className="text-violet-200/80 text-center text-sm mt-2">
                        أدخل نص الحديث أو جزء منه للتحقق من صحته.
                    </p>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Search Box */}
                <div className="bg-[#1a2332] rounded-2xl p-4 sm:p-6 border border-white/5 space-y-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="سبحان الله والحمدلله ولا اله الا الله..."
                            className="w-full h-12 bg-[#0f1620] border-white/10 text-white placeholder:text-slate-500 pr-12 text-lg rounded-xl"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Button
                            className="h-10 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                            onClick={handleSearch}
                            disabled={!query.trim() || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "تحقق"
                            )}
                        </Button>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="authentic"
                                checked={authenticOnly}
                                onCheckedChange={(checked) => setAuthenticOnly(!!checked)}
                                className="border-white/30 data-[state=checked]:bg-emerald-600"
                            />
                            <label htmlFor="authentic" className="text-sm text-slate-400 cursor-pointer">
                                الأحاديث الصحيحة فقط
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {searchCount > 0 && (
                    <div className="text-center text-slate-400 text-sm">
                        نتائج البحث ({searchCount})
                    </div>
                )}

                <div className="space-y-4">
                    {results.map((result, i) => (
                        <div
                            key={i}
                            className="bg-[#1a2332] rounded-2xl p-5 border border-white/5 space-y-4 hover:border-white/10 transition-colors"
                        >
                            {/* Grade Badge */}
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getGradeStyle(result.grade)}`}>
                                    {result.grade.includes("صحيح") && <CheckCircle className="w-3 h-3 inline ml-1" />}
                                    {result.grade}
                                </span>
                            </div>

                            {/* Hadith Text */}
                            <p className="text-white/90 text-lg leading-loose font-arabic">
                                {result.hadith}
                            </p>

                            {/* Metadata */}
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400 pt-3 border-t border-white/5">
                                <span>الراوي: {result.rawi}</span>
                                <span>المصدر: {result.book}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {!isLoading && results.length === 0 && query && (
                    <div className="text-center py-12 text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>لم يتم العثور على نتائج</p>
                    </div>
                )}
            </main>
        </div>
    );
}
