import { useState, useCallback } from "react";
import { Loader2, Search, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";

interface HadithResult {
    hadith: string;
    grade: string;
    rawi: string;
    source: string;
    mohdith?: string;
}

// Function to fetch from Dorar using JSONP (bypasses CORS)
function fetchDorarHadiths(query: string): Promise<HadithResult[]> {
    return new Promise((resolve, reject) => {
        const callbackName = `dorarCallback_${Date.now()}`;
        const encodedQuery = encodeURIComponent(query);

        // Create script element for JSONP
        const script = document.createElement('script');
        script.src = `https://dorar.net/dorar_api.json?skey=${encodedQuery}&callback=${callbackName}`;

        // Set timeout for the request
        const timeout = setTimeout(() => {
            cleanup();
            reject(new Error('Request timeout'));
        }, 10000);

        // Cleanup function
        const cleanup = () => {
            clearTimeout(timeout);
            delete (window as any)[callbackName];
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };

        // Define callback function
        (window as any)[callbackName] = (data: any) => {
            cleanup();

            try {
                const results: HadithResult[] = [];

                if (data && data.ahadith && data.ahadith.result) {
                    const html = data.ahadith.result;

                    // Parse HTML to extract hadiths
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    // Try to find hadith containers
                    const hadithContainers = doc.querySelectorAll('.hadith-info, .border-bottom, [class*="hadith"]');

                    if (hadithContainers.length > 0) {
                        hadithContainers.forEach((container) => {
                            const text = container.textContent?.trim();
                            if (text && text.length > 20) {
                                // Extract parts
                                const gradeMatch = text.match(/(صحيح|حسن|ضعيف|موضوع|إسناده صحيح|رجاله رجال الصحيح)/);
                                const rawiMatch = text.match(/الراوي\s*:\s*([^،\n]+)/);
                                const sourceMatch = text.match(/المصدر\s*:\s*([^،\n]+)/);

                                results.push({
                                    hadith: text.substring(0, 500),
                                    grade: gradeMatch ? gradeMatch[1] : "انظر المصدر",
                                    rawi: rawiMatch ? rawiMatch[1].trim() : "غير محدد",
                                    source: sourceMatch ? sourceMatch[1].trim() : "الدرر السنية"
                                });
                            }
                        });
                    } else {
                        // Fallback: split by line breaks and extract text
                        const lines = html.replace(/<[^>]*>/g, '\n').split('\n').filter((line: string) => line.trim().length > 30);

                        for (let i = 0; i < Math.min(lines.length, 20); i++) {
                            const line = lines[i].trim();
                            if (line.length > 30) {
                                const gradeMatch = line.match(/(صحيح|حسن|ضعيف|موضوع|إسناده صحيح|رجاله رجال الصحيح|لا أصل له)/);

                                results.push({
                                    hadith: line,
                                    grade: gradeMatch ? gradeMatch[1] : "انظر المصدر",
                                    rawi: "غير محدد",
                                    source: "الدرر السنية"
                                });
                            }
                        }
                    }
                }

                resolve(results);
            } catch (error) {
                reject(error);
            }
        };

        // Handle script error
        script.onerror = () => {
            cleanup();
            reject(new Error('Failed to load script'));
        };

        // Add script to document
        document.head.appendChild(script);
    });
}

// Alternative: Use server proxy
async function fetchFromServer(query: string): Promise<HadithResult[]> {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`/api/hadith/search?q=${encodedQuery}`);

    if (!response.ok) {
        throw new Error('Server error');
    }

    const data = await response.json();
    return (data.ahadith || data.results || []).map((item: any) => ({
        hadith: item.hadith || item.text || "",
        grade: item.grade || "غير محدد",
        rawi: item.rawi || "غير معروف",
        source: item.book || item.source || "غير محدد",
        mohdith: item.mohdith || ""
    }));
}

function getGradeBadge(grade: string) {
    const g = grade.toLowerCase();

    if (g.includes("صحيح") || g.includes("إسناده صحيح") || g.includes("رجال")) {
        return { bg: "bg-emerald-600", text: "text-white", icon: true };
    }
    if (g.includes("حسن")) {
        return { bg: "bg-blue-600", text: "text-white", icon: true };
    }
    if (g.includes("ضعيف")) {
        return { bg: "bg-orange-600", text: "text-white", icon: false };
    }
    if (g.includes("موضوع") || g.includes("لا أصل")) {
        return { bg: "bg-red-600", text: "text-white", icon: false };
    }
    return { bg: "bg-slate-600", text: "text-white", icon: false };
}

function highlightText(text: string, query: string): React.ReactNode {
    if (!query.trim()) return text;

    const words = query.trim().split(/\s+/).filter(w => w.length > 1);
    let result = text;

    words.forEach(word => {
        result = result.replace(new RegExp(word, 'g'), `<mark class="bg-emerald-400/30 text-white px-0.5 rounded">${word}</mark>`);
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

export default function HadithVerify() {
    const [query, setQuery] = useState("");
    const [authenticOnly, setAuthenticOnly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<HadithResult[]>([]);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = useCallback(async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        setError("");
        setResults([]);
        setHasSearched(true);

        try {
            // Try server proxy first
            let data = await fetchFromServer(query);

            // If no results, try JSONP
            if (data.length === 0) {
                data = await fetchDorarHadiths(query);
            }

            // Filter if authenticOnly
            if (authenticOnly) {
                data = data.filter(r => {
                    const g = r.grade.toLowerCase();
                    return (g.includes("صحيح") || g.includes("حسن") || g.includes("رجال") || g.includes("إسناده"))
                        && !g.includes("ضعيف") && !g.includes("موضوع") && !g.includes("لا أصل");
                });
            }

            // Sort by grade
            data.sort((a, b) => {
                const gradeOrder = (grade: string) => {
                    const g = grade.toLowerCase();
                    if (g.includes("صحيح متواتر")) return 0;
                    if (g.includes("صحيح") && !g.includes("ضعيف")) return 1;
                    if (g.includes("إسناده صحيح")) return 2;
                    if (g.includes("رجاله رجال")) return 3;
                    if (g.includes("حسن")) return 4;
                    if (g.includes("ضعيف")) return 10;
                    if (g.includes("موضوع") || g.includes("لا أصل")) return 11;
                    return 5;
                };
                return gradeOrder(a.grade) - gradeOrder(b.grade);
            });

            setResults(data);

            if (data.length === 0) {
                setError("لم يتم العثور على نتائج. جرب كلمات مختلفة.");
            }
        } catch (err) {
            console.error("Search error:", err);
            setError("حدث خطأ في البحث. جرب مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    }, [query, authenticOnly]);

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

                {/* Error State */}
                {error && !isLoading && (
                    <div className="bg-orange-900/20 border border-orange-500/20 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <p className="text-orange-300">{error}</p>
                    </div>
                )}

                {/* Results Count */}
                {hasSearched && results.length > 0 && (
                    <div className="text-center text-slate-400 text-sm">
                        نتائج البحث ({results.length})
                    </div>
                )}

                {/* Results */}
                {results.length > 0 && (
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
                                            {result.mohdith && <div>المحدث: {result.mohdith}</div>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                        <p className="text-slate-400 text-sm">جاري البحث في الدرر السنية...</p>
                    </div>
                )}

                {/* Empty State - Before Search */}
                {!hasSearched && !isLoading && (
                    <div className="text-center py-8 text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>أدخل نص الحديث للبحث</p>
                        <p className="text-sm mt-2">سيتم البحث في موسوعة الدرر السنية</p>
                    </div>
                )}
            </main>
        </div>
    );
}
