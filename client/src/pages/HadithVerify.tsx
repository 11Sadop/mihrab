import { useState } from "react";
import { Loader2, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";

interface HadithResult {
    hadith: string;
    grade: string;
    rawi: string;
    mohdith: string;
    book: string;
    bookPage?: string;
}

export default function HadithVerify() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<HadithResult[]>([]);
    const [authenticOnly, setAuthenticOnly] = useState(false);
    const [searchCount, setSearchCount] = useState(0);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        setResults([]);

        try {
            // Using Dorar.net API
            const encodedQuery = encodeURIComponent(query);
            const url = `https://dorar.net/dorar_api.json?skey=${encodedQuery}`;

            // Fetch through proxy to avoid CORS
            const proxyUrl = `/api/hadith/search?q=${encodedQuery}`;

            const res = await fetch(proxyUrl);
            if (!res.ok) throw new Error("Failed to search");

            const data = await res.json();

            // Parse and sort results
            let parsedResults: HadithResult[] = (data.ahadith || data.results || []).map((item: any) => ({
                hadith: item.hadith || item.text || "",
                grade: item.grade || item.takhrij || "غير محدد",
                rawi: item.rawi || item.narrator || "غير معروف",
                mohdith: item.mohdith || item.scholar || "",
                book: item.book || item.source || "المصدر غير محدد",
                bookPage: item.page || "",
            }));

            // Sort: Sahih first, then Hasan, then others (weak at bottom)
            parsedResults.sort((a, b) => {
                const gradeOrder = (grade: string) => {
                    const g = grade.toLowerCase();
                    if (g.includes("صحيح") && !g.includes("ضعيف")) return 1;
                    if (g.includes("إسناده صحيح")) return 2;
                    if (g.includes("حسن")) return 3;
                    if (g.includes("رجاله رجال الصحيح")) return 4;
                    if (g.includes("ضعيف")) return 10;
                    if (g.includes("موضوع")) return 11;
                    return 5;
                };
                return gradeOrder(a.grade) - gradeOrder(b.grade);
            });

            // Filter if authenticOnly
            if (authenticOnly) {
                parsedResults = parsedResults.filter(r => {
                    const g = r.grade.toLowerCase();
                    return g.includes("صحيح") || g.includes("حسن") || g.includes("رجال الصحيح");
                });
            }

            setResults(parsedResults);
            setSearchCount(parsedResults.length);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
            setSearchCount(0);
        } finally {
            setIsLoading(false);
        }
    };

    const getGradeBorderColor = (grade: string) => {
        const g = grade.toLowerCase();
        if (g.includes("صحيح") && !g.includes("ضعيف")) return "border-l-emerald-500";
        if (g.includes("إسناده صحيح")) return "border-l-lime-500";
        if (g.includes("حسن")) return "border-l-blue-500";
        if (g.includes("رجاله رجال الصحيح")) return "border-l-teal-500";
        if (g.includes("ضعيف")) return "border-l-orange-500";
        if (g.includes("موضوع")) return "border-l-red-500";
        return "border-l-slate-500";
    };

    const getGradeBadgeColor = (grade: string) => {
        const g = grade.toLowerCase();
        if (g.includes("صحيح") && !g.includes("ضعيف")) return "bg-emerald-600 text-white";
        if (g.includes("إسناده صحيح")) return "bg-lime-600 text-white";
        if (g.includes("حسن")) return "bg-blue-600 text-white";
        if (g.includes("رجاله رجال الصحيح")) return "bg-teal-600 text-white";
        if (g.includes("ضعيف")) return "bg-orange-600 text-white";
        if (g.includes("موضوع")) return "bg-red-600 text-white";
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
                            onChange={(e) => setQuery(e.target.value)}
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
                                onCheckedChange={(checked) => setAuthenticOnly(!!checked)}
                                className="border-white/30 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                            />
                            <label htmlFor="authentic" className="text-sm text-slate-400 cursor-pointer">
                                الأحاديث الصحيحة فقط
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                {searchCount > 0 && (
                    <div className="text-center text-slate-400 text-sm">
                        نتائج البحث ({searchCount})
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
                                    <div>المصدر: {result.book}{result.bookPage && ` (ص${result.bookPage})`}</div>
                                    {result.mohdith && <div>المحدث: {result.mohdith}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && results.length === 0 && query && searchCount === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>لم يتم العثور على نتائج</p>
                    </div>
                )}
            </main>
        </div>
    );
}
