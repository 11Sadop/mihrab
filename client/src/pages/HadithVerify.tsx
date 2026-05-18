import { Header } from "@/components/Header";
import { useState } from "react";
import { Search, Loader2, Check, X, AlertTriangle, Share2, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSeo } from "@/hooks/use-seo";
import { useToast } from "@/hooks/use-toast";
import { hadithDatabase } from "@/data/hadithDatabase";
import { sahihBukhariHadiths } from "@/data/sahihBukhari";
import { sahihMuslimHadiths } from "@/data/sahihMuslim";

async function generateVerifyImage(text: string, grade: string, source: string): Promise<Blob | null> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0f172a'); bg.addColorStop(1, '#1e293b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(16,185,129,0.3)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(40, 40, W-80, H-80, 30); ctx.stroke();
    const topG = ctx.createLinearGradient(100,0,W-100,0);
    topG.addColorStop(0,'transparent'); topG.addColorStop(0.5,'#10b981'); topG.addColorStop(1,'transparent');
    ctx.strokeStyle = topG; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(100,90); ctx.lineTo(W-100,90); ctx.stroke();
    // Grade badge
    const isGood = grade.includes('صحيح') || grade.includes('حسن');
    ctx.fillStyle = isGood ? '#10b981' : '#ef4444';
    ctx.font = 'bold 26px Tajawal, Arial, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(`درجة الحديث: ${grade}`, W/2, 140);
    // Text
    let fontSize = 42;
    ctx.font = `bold ${fontSize}px Tajawal, Arial, sans-serif`;
    const words = text.split(' ');
    const lines: string[] = []; let cur = '';
    for (const w of words) {
        const t = cur ? cur+' '+w : w;
        if (ctx.measureText(t).width > W-200 && cur) { lines.push(cur); cur=w; } else cur=t;
    }
    if (cur) lines.push(cur);
    if (lines.length > 9) fontSize = 32; else if (lines.length > 6) fontSize = 36;
    ctx.font = `bold ${fontSize}px Tajawal, Arial, sans-serif`;
    const lines2: string[] = []; cur = '';
    for (const w of words) {
        const t = cur ? cur+' '+w : w;
        if (ctx.measureText(t).width > W-200 && cur) { lines2.push(cur); cur=w; } else cur=t;
    }
    if (cur) lines2.push(cur);
    const lh = fontSize*1.9;
    let y = Math.max(200,(H-lines2.length*lh)/2+fontSize);
    ctx.fillStyle = '#f1f5f9'; ctx.direction = 'rtl';
    for (const line of lines2) { ctx.fillText(line, W/2, y); y+=lh; }
    const btmG = ctx.createLinearGradient(100,0,W-100,0);
    btmG.addColorStop(0,'transparent'); btmG.addColorStop(0.5,'#10b981'); btmG.addColorStop(1,'transparent');
    ctx.strokeStyle = btmG; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(100,H-180); ctx.lineTo(W-100,H-180); ctx.stroke();
    ctx.font = '22px Tajawal, Arial, sans-serif'; ctx.fillStyle = '#10b981';
    if (source) ctx.fillText(source, W/2, H-130);
    ctx.font = 'bold 26px Tajawal, Arial, sans-serif'; ctx.fillStyle = 'rgba(16,185,129,0.5)';
    ctx.fillText('محراب  ❘  mihrabapp.com', W/2, H-70);
    return new Promise(r => canvas.toBlob(b => r(b), 'image/png', 1.0));
}

interface HadithResult {
    text: string;
    narrator: string;
    scholar: string;
    source: string;
    grade: string;
}

interface RankedHadithResult extends HadithResult {
    trustScore: number;
    relevanceScore: number;
}

function normalizeArabicText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[إأآا]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ة/g, "ه")
        .replace(/[ًٌٍَُِّْـ]/g, "")
        .replace(/[^\u0600-\u06FF\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function isTrustedGrade(grade: string): boolean {
    return grade.includes("صحيح") || grade.includes("حسن") || grade.includes("جيد") || grade.includes("ثابت");
}

function calcTrustScore(grade: string, source: string): number {
    let score = 0;
    if (source.includes("البخاري") || source.includes("مسلم")) score += 100;
    if (source.includes("الدرر")) score += 20;
    if (source.includes("الترمذي") || source.includes("أبو داود") || source.includes("النسائي")) score += 50;
    if (grade.includes("صحيح")) score += 40;
    if (grade.includes("حسن")) score += 30;
    if (grade.includes("ضعيف") || grade.includes("موضوع")) score -= 20;
    return score;
}

export default function HadithVerifyPage() {
    useSeo({
        title: "التحقق من صحة الأحاديث - ابحث وتحقق",
        description: "تحقق من صحة الأحاديث النبوية الشريفة بسهولة - ابحث عن أي حديث واعرف هل هو صحيح أم ضعيف مع المصدر والدرجة من الدرر السنية. تخريج الأحاديث وتحقيقها.",
        keywords: "صحة الحديث، تخريج حديث، هل الحديث صحيح، تحقق من الحديث، أحاديث صحيحة، أحاديث ضعيفة، موضوعة، البخاري، مسلم، الدرر السنية، hadith verification",
        canonicalPath: "/hadith-verify",
    });
    const { toast } = useToast();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<HadithResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filterSahih, setFilterSahih] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [generatingIdx, setGeneratingIdx] = useState<number|null>(null);

    const shareHadithText = async (hadith: HadithResult) => {
        const text = `${hadith.text}\n\n📚 ${hadith.source || ''}\n⚖️ الدرجة: ${hadith.grade}\n\nمن تطبيق محراب 🕌\nhttps://mihrabapp.com/hadith-verify`;
        if (navigator.share) {
            try { await navigator.share({ title: 'حديث من محراب', text }); } catch {}
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        }
    };

    const shareHadithImage = async (hadith: HadithResult, idx: number) => {
        setGeneratingIdx(idx);
        try {
            const blob = await generateVerifyImage(hadith.text, hadith.grade, hadith.source);
            if (!blob) return;
            const file = new File([blob], 'hadith-verify.png', { type: 'image/png' });
            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({ title: 'حديث من محراب', files: [file] });
            } else {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url; a.download = 'hadith-verify.png'; a.click();
                URL.revokeObjectURL(url);
                toast({ title: 'تم تحميل الصورة ✅' });
            }
        } catch { toast({ title: 'خطأ في إنشاء الصورة' }); }
        finally { setGeneratingIdx(null); }
    };

    const searchHadith = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError("");
        setResults([]);
        setHasSearched(true);

        const normalizedQuery = normalizeArabicText(query);
        const merged: RankedHadithResult[] = [];

        // Helper to translate any remaining English grades
        const translateGrade = (g: string): string => {
            if (!g) return 'غير محدد';
            const map: Record<string, string> = {
                'sahih': 'صحيح', 'hasan': 'حسن', 'daif': 'ضعيف', 'weak': 'ضعيف',
                'mawdu': 'موضوع', 'unknown': 'غير محدد', 'authentic': 'صحيح',
            };
            const lower = g.toLowerCase().trim();
            return map[lower] || (/[\u0600-\u06FF]/.test(g) ? g : 'غير محدد');
        };
        const translateField = (val: string): string => {
            if (!val) return '';
            const map: Record<string, string> = {
                'al-bukhari': 'البخاري', 'bukhari': 'البخاري', 'muslim': 'مسلم',
                'al-tirmidhi': 'الترمذي', 'abu dawud': 'أبو داود',
                'sahih al-bukhari': 'صحيح البخاري', 'sahih bukhari': 'صحيح البخاري',
                'sahih muslim': 'صحيح مسلم', 'local database': 'قاعدة بيانات محلية',
                'dorar': 'الدرر السنية',
            };
            const lower = val.toLowerCase().trim();
            if (map[lower]) return map[lower];
            for (const [en, ar] of Object.entries(map)) {
                if (lower.includes(en)) return val.replace(new RegExp(en, 'gi'), ar);
            }
            return val;
        };

        try {
            const serverRes = await fetch(`/api/hadith/verify?skey=${encodeURIComponent(query)}${filterSahih ? '&grade=sahih' : ''}`);
            const serverData = await serverRes.json();
            if (Array.isArray(serverData.results)) {
                // Add ALL Dorar results without filtering - Dorar already searched for us
                for (const item of serverData.results) {
                    if (filterSahih && !isTrustedGrade(item.grade || "")) continue;
                    merged.push({
                        text: item.text || "",
                        narrator: item.narrator || "",
                        scholar: translateField(item.scholar || ""),
                        source: translateField(item.source || "الدرر السنية"),
                        grade: translateGrade(item.grade || ""),
                        trustScore: calcTrustScore(item.grade || "", item.source || ""),
                        relevanceScore: 1,
                    });
                }
            }
        } catch {}

        const localCorpus: HadithResult[] = [
            ...hadithDatabase.map((item) => ({
                text: item.text,
                narrator: item.rawi || "",
                scholar: item.explanation || "",
                source: translateField(item.source || "قاعدة بيانات محلية"),
                grade: translateGrade(item.status || ""),
            })),
            ...sahihBukhariHadiths.map((item) => ({
                text: item.text,
                narrator: "",
                scholar: "البخاري",
                source: `صحيح البخاري - ${item.book}`,
                grade: "صحيح",
            })),
            ...sahihMuslimHadiths.map((item) => ({
                text: item.text,
                narrator: "",
                scholar: "مسلم",
                source: `صحيح مسلم - ${item.book}`,
                grade: "صحيح",
            })),
        ];

        for (const item of localCorpus) {
            const haystack = normalizeArabicText(`${item.text} ${item.narrator} ${item.source} ${item.grade}`);
            if (!haystack.includes(normalizedQuery)) continue;
            if (filterSahih && !isTrustedGrade(item.grade)) continue;
            merged.push({
                ...item,
                trustScore: calcTrustScore(item.grade, item.source),
                relevanceScore: haystack.length ? normalizedQuery.length / haystack.length : 0,
            });
        }

        const deduped = removeDuplicates(merged).map((item) => ({
            ...item,
            trustScore: calcTrustScore(item.grade, item.source),
            relevanceScore: (item as any).relevanceScore ?? 0,
        }));

        const ranked = deduped.sort((a, b) => {
            if ((b as any).trustScore !== (a as any).trustScore) return (b as any).trustScore - (a as any).trustScore;
            return (b as any).relevanceScore - (a as any).relevanceScore;
        });

        if (ranked.length > 0) {
            setResults(ranked.slice(0, 80));
            setLoading(false);
            return;
        }

        setError("لم يتم العثور على نتائج. تأكد من اتصالك بالإنترنت وجرب كلمات مختلفة.");
        setLoading(false);
    };

    const removeDuplicates = (items: HadithResult[]) => {
        return items.filter(
            (value, index, self) =>
                index ===
                self.findIndex(
                    (t) =>
                        t.text.trim() === value.text.trim() &&
                        t.grade.trim() === value.grade.trim() &&
                        t.narrator.trim() === value.narrator.trim()
                )
        );
    };

    const getGradeStyle = (grade: string) => {
        const g = grade.toLowerCase();
        if (
            g.includes("صحيح") ||
            g.includes("حسن") ||
            g.includes("جيد") ||
            g.includes("ثابت") ||
            g.includes("محفوظ")
        ) {
            return {
                bg: "bg-emerald-500/10",
                text: "text-emerald-500",
                border: "border-emerald-500/30",
                icon: Check,
            };
        }
        if (
            g.includes("ضعيف") ||
            g.includes("موضوع") ||
            g.includes("باطل") ||
            g.includes("منكر") ||
            g.includes("لا يصح")
        ) {
            return {
                bg: "bg-red-500/10",
                text: "text-red-500",
                border: "border-red-500/30",
                icon: X,
            };
        }
        return {
            bg: "bg-amber-500/10",
            text: "text-amber-500",
            border: "border-amber-500/30",
            icon: AlertTriangle,
        };
    };

    const examples = ["من صام رمضان", "الطهور شطر الإيمان", "إنما الأعمال بالنيات"];

    return (
        <div className="min-h-screen pb-32 bg-gradient-to-b from-background to-secondary/20">
            <Header title="التحقق من صحة الحديث" showBack />

            <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 space-y-4 pt-4">
                {/* Search Card */}
                <Card className="p-5 space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                        أدخل نص الحديث أو جزء منه للتحقق من صحته
                    </p>

                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && searchHadith()}
                            placeholder="اكتب نص الحديث أو جزء منه..."
                            className="pr-10"
                            dir="rtl"
                            data-testid="input-hadith-search"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filterSahih}
                                onChange={(e) => setFilterSahih(e.target.checked)}
                                className="w-4 h-4 rounded focus:ring-primary"
                            />
                            الأحاديث الصحيحة فقط
                        </label>

                        <Button
                            onClick={searchHadith}
                            disabled={loading || !query.trim()}
                            size="sm"
                            data-testid="button-search-hadith"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                                    جاري البحث
                                </>
                            ) : (
                                "تحقق"
                            )}
                        </Button>
                    </div>
                </Card>

                {/* Error */}
                {error && (
                    <Card className="p-4 bg-destructive/10 border-destructive/30">
                        <p className="text-destructive text-sm text-center">{error}</p>
                    </Card>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground text-center">
                            نتائج البحث ({results.length})
                        </p>

                        {results.map((hadith, index) => {
                            const style = getGradeStyle(hadith.grade);
                            const IconComponent = style.icon;

                            return (
                                <Card
                                    key={index}
                                    className={cn(
                                        "p-4 space-y-3 border-r-4",
                                        style.border
                                    )}
                                >
                                    {/* Grade Badge */}
                                    <div className="flex justify-end">
                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                                                style.bg,
                                                style.text
                                            )}
                                        >
                                            <IconComponent className="w-3.5 h-3.5" />
                                            {hadith.grade}
                                        </span>
                                    </div>

                                    {/* Hadith Text */}
                                    <p
                                        className="text-foreground leading-relaxed font-hadith text-right"
                                        dir="rtl"
                                    >
                                        {hadith.text}
                                    </p>

                                    {/* Details */}
                                    <div className="border-t border-border pt-3 space-y-1 text-xs text-muted-foreground">
                                        {hadith.narrator && (
                                            <p>
                                                <span className="font-medium">الراوي:</span>{" "}
                                                {hadith.narrator}
                                            </p>
                                        )}
                                        {hadith.scholar && (
                                            <p>
                                                <span className="font-medium">المحدث:</span>{" "}
                                                {hadith.scholar}
                                            </p>
                                        )}
                                        {hadith.source && (
                                            <p>
                                                <span className="font-medium">المصدر:</span>{" "}
                                                {hadith.source}
                                            </p>
                                        )}
                                    </div>
                                    {/* Share buttons */}
                                    <div className="flex items-center gap-2 pt-2 justify-end">
                                        <button
                                            onClick={() => shareHadithImage(hadith, index)}
                                            disabled={generatingIdx === index}
                                            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md text-muted-foreground hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                                        >
                                            {generatingIdx === index
                                                ? <div className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                                : <ImageIcon className="w-3.5 h-3.5" />}
                                            <span>حفظ صورة</span>
                                        </button>
                                        <button
                                            onClick={() => shareHadithText(hadith)}
                                            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                                        >
                                            <Share2 className="w-3.5 h-3.5" />
                                            <span>مشاركة</span>
                                        </button>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* No Results */}
                {!loading && hasSearched && results.length === 0 && !error && (
                    <Card className="p-6 text-center">
                        <p className="text-muted-foreground">لم يتم العثور على نتائج</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            جرب كلمات مختلفة أو أجزاء أخرى من الحديث
                        </p>
                    </Card>
                )}

                {/* Examples */}
                {!hasSearched && (
                    <Card className="p-6 space-y-4 text-center">
                        <div className="text-4xl">📚</div>
                        <div>
                            <h3 className="font-bold mb-1">التحقق من صحة الأحاديث</h3>
                            <p className="text-sm text-muted-foreground">
                                ابحث عن أي حديث للتحقق من صحته ومعرفة درجته
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {examples.map((example) => (
                                <Button
                                    key={example}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuery(example)}
                                    className="text-xs"
                                >
                                    {example}
                                </Button>
                            ))}
                        </div>

                        <p className="text-xs text-muted-foreground pt-2">
                            مصدر البيانات:{" "}
                            <a
                                href="https://dorar.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary"
                            >
                                الدرر السنية
                            </a>
                        </p>
                    </Card>
                )}
            </main>
        </div>
    );
}




