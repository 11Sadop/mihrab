import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import { Search, Loader2, Check, X, AlertTriangle, Share2, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSeo } from "@/hooks/use-seo";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
    explanation?: string;
    sharhUrl?: string;
    pageNumber?: string;
    takhrij?: string;
}

interface RankedHadithResult extends HadithResult {
    trustScore: number;
    relevanceScore: number;
}

function normalizeArabicText(text: string): string {
    if (!text) return "";
    return text
        .toLowerCase()
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u06DF-\u06E8\u06EA-\u06ED\u0640]/g, "")
        .replace(/[أإآءٱ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/[ىئ]/g, "ي")
        .replace(/ؤ/g, "و")
        .replace(/[^\u0600-\u06FF\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function passesStrictOverlapFilter(text: string, normalizedQuery: string, activeTokens: string[]): boolean {
    const textNorm = normalizeArabicText(text);
    if (textNorm.includes(normalizedQuery)) {
        return true;
    }
    const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 0);
    if (queryWords.length <= 1) {
        return true;
    }
    if (activeTokens.length === 0) return true;
    let matchCount = 0;
    for (const token of activeTokens) {
        if (textNorm.includes(token)) {
            matchCount++;
        }
    }
    const ratio = matchCount / activeTokens.length;
    return ratio >= 0.25;
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

function deduceScholar(item: any): string {
    const src = (item.source || "").toLowerCase();
    if (src.includes("بخاري") || src.includes("bukhari")) return "البخاري";
    if (src.includes("مسلم") || src.includes("muslim")) return "مسلم";
    if (src.includes("ترمذي") || src.includes("tirmidhi")) return "الترمذي";
    if (src.includes("نسائي") || src.includes("nasai")) return "النسائي";
    if (src.includes("ابن ماجه") || src.includes("ibn majah")) return "ابن ماجه";
    if (src.includes("أبو داود") || src.includes("abu dawud")) return "أبو داود";
    if (src.includes("أحمد") || src.includes("ahmad")) return "أحمد (في المسند)";
    if (src.includes("الألباني") || src.includes("albani")) return "الألباني";
    return "غير محدد";
}

function calcRelevanceScore(
    text: string,
    narrator: string,
    source: string,
    grade: string,
    normalizedQuery: string,
    activeTokens: string[]
): number {
    const normalizedText = normalizeArabicText(text);
    const haystack = normalizeArabicText(`${text} ${narrator} ${source} ${grade}`);
    
    // Strict exact full phrase match yields highest score
    if (haystack.includes(normalizedQuery)) {
        return 5.0;
    }
    
    if (activeTokens.length === 0) return 0.0;
    
    let matchCount = 0;
    for (const token of activeTokens) {
        if (normalizedText.includes(token)) {
            matchCount++;
        }
    }
    
    // Standard keyword match percentage (high inclusivity)
    return matchCount / activeTokens.length;
}

function decodeGarbledDorarText(text: string): string {
    if (!text) return "";
    if (text.includes("Ø§Ù„") || text.includes("Ø") || text.includes("Ù") || text.includes("æ")) {
        try {
            const bytes = new Uint8Array(text.length);
            for (let i = 0; i < text.length; i++) {
                bytes[i] = text.charCodeAt(i) & 0xff;
            }
            return new TextDecoder('utf-8').decode(bytes);
        } catch {
            return text;
        }
    }
    return text;
}

const fetchWithProxy = async (url: string): Promise<string | null> => {
    // 1. Try AllOrigins
    try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        if (res.ok) {
            const data = await res.json();
            return data.contents || null;
        }
    } catch {}
    // 2. Try Corsproxy.io
    try {
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
        if (res.ok) return await res.text();
    } catch {}
    // 3. Try Codetabs
    try {
        const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`);
        if (res.ok) return await res.text();
    } catch {}
    return null;
};

function cleanQuerySymbols(text: string): string {
    if (!text) return "";
    return text
        .replace(/[ًٌٍَُِّْـ]/g, "") // Strip Tashkeel (diacritics) first
        .replace(/[\u0610\u0611\u0612\u0613\u0614\u0615\u0616\u0617\u0618\u0619\u061A]/g, "") // Quranic annotation marks
        .replace(/[\uFDFA\uFDFB\uFDFC\uFDFD\uFE70-\uFEFF]/g, " ") // ﷺ ﷻ and Arabic presentation forms
        .replace(/[\u0600-\u0605\u060C\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, "") // Extended tashkeel & annotation
        .replace(/[«»"'"`()[\]{}*\-–—_+=\/\\|؛،؟?.,:;!@#$%^&~<>]/g, " ") // Punctuation & symbols
        .replace(/\s+/g, " ")
        .trim();
}

export default function HadithVerifyPage() {
    useSeo({
        title: "التحقق من صحة الأحاديث - ابحث وتحقق",
        description: "تحقق من صحة الأحاديث النبوية الشريفة بسهولة - ابحث عن أي حديث واعرف هل هو صحيح أم ضعيف مع المصدر والدرجة من الدرر السنية. تخريج الأحاديث وتحقيقها.",
        keywords: "صحة الحديث، تخريج حديث، هل الحديث صحيح، تحقق من الحديث، أحاديث صحيحة، أحاديث ضعيفة، موضوعة، البخاري، مسلم، الدرر السنية، hadith verification",
        canonicalPath: "/hadith-verify",
    });
    const { toast } = useToast();
    const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        if (typeof window !== 'undefined') {
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            }
        };
    }, []);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<HadithResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filterSahih, setFilterSahih] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [generatingIdx, setGeneratingIdx] = useState<number|null>(null);
    const [explanations, setExplanations] = useState<Record<number, string>>({});
    
    const [explanationHadith, setExplanationHadith] = useState<HadithResult | null>(null);
    const [explanationText, setExplanationText] = useState<string>("");
    const [explanationLoading, setExplanationLoading] = useState(false);

    const searchMode = "w";
    const searchScope = "*";
    const gradeFilter = "0";
    const excludeWords = "";
    const dedup = "yes";

    const loadHadithExplanation = async (hadith: HadithResult, idx: number) => {
        setExplanationHadith(hadith);
        
        if (hadith.explanation) {
            setExplanationText(hadith.explanation);
            return;
        }

        if (explanations[idx]) {
            setExplanationText(explanations[idx]);
            return;
        }

        setExplanationLoading(true);
        setExplanationText("");

        let textResult = "";
        let fetchedFromBackend = false;

        // Try backend explain endpoint first
        try {
            const res = await fetch(`/api/hadith/explain?q=${encodeURIComponent(hadith.text)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.explanation) {
                    textResult = data.explanation;
                    fetchedFromBackend = true;
                }
            }
        } catch (err) {
            console.error("Backend explanation failed:", err);
        }

        const isPlaceholder = !fetchedFromBackend || 
            textResult.includes("غير متوفر") || 
            textResult.includes("غير متوفر شرحه التفصيلي") ||
            textResult.includes("لم يتم العثور على شرح");

        // If backend fallback didn't yield detailed result, and we have a sharhUrl, fetch & scrape online
        if (isPlaceholder && hadith.sharhUrl) {
            try {
                let absoluteUrl = hadith.sharhUrl;
                if (!absoluteUrl.startsWith("http")) {
                    if (absoluteUrl.startsWith("/")) {
                        absoluteUrl = `https://dorar.net${absoluteUrl}`;
                    } else {
                        absoluteUrl = `https://dorar.net/${absoluteUrl}`;
                    }
                }

                const html = await fetchWithProxy(absoluteUrl);
                if (html) {
                    const decodedHtml = decodeGarbledDorarText(html);
                    const explainRegex = /<div[^>]*class="[^"]*(?:explanation|hadith-explanation|sharh)[^"]*"[^>]*>([\s\S]*?)<\/div>/i;
                    const match = decodedHtml.match(explainRegex);
                    if (match) {
                        const cleanText = match[1]
                            .replace(/<[^>]+>/g, "")
                            .replace(/&nbsp;/g, " ")
                            .replace(/&[^;]+;/g, " ")
                            .replace(/\s+/g, " ")
                            .trim();
                        if (cleanText.length > 20) {
                            textResult = cleanText;
                        }
                    }
                }
            } catch (err) {
                console.error("Client side explanation scrap failed:", err);
            }
        }

        const finalExplanation = textResult || "لم يتم العثور على شرح تفصيلي للحديث حالياً.";
        setExplanationText(finalExplanation);
        setExplanations(prev => ({ ...prev, [idx]: finalExplanation }));
        setExplanationLoading(false);
    };

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
        } catch {
            toast({ title: 'خطأ في إنشاء الصورة' });
        } finally {
            setGeneratingIdx(null);
        }
    };

    const searchHadith = async () => {
        if (!query.trim()) return;

        setError("");
        setResults([]);
        setHasSearched(true);
        setLoading(true);

        const cleanedQuery = cleanQuerySymbols(query);
        const normalizedQuery = normalizeArabicText(cleanedQuery);

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

        const parseDorarHtml = (html: string): HadithResult[] => {
            const parsed: HadithResult[] = [];
            
            // Strategy 1: Split by الراوي (Primary)
            const parts = html.split(/الراوي\s*:\s*/gi);
            for (let i = 1; i < parts.length && parsed.length < 50; i++) {
                const info = parts[i];
                const prev = parts[i-1];
                const chunks = prev.split('>');
                const text = (chunks[chunks.length-1]||'').replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,' ').trim();
                const narratorM = info.match(/^([^<\n,]{2,60})/);
                const scholarM = info.match(/المحدث\s*:\s*([^<\n,]+)/i);
                const sourceM = info.match(/المصدر\s*:\s*([^<\n,]+)/i);
                const pgM = info.match(/(?:الصفحة أو الرقم|رقم الحديث|الصفحة|الجزء أو الصفحة)\s*:\s*([^<\n,]+)/i);
                const takhM = info.match(/(?:تخريج|التخريج|تخريج الحديث)\s*:\s*([^<\n]+)/i);
                let gradeM = info.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)[^<]*<\/span>\s*<span[^>]*>([^<,]+)<\/span>/i);
                if (!gradeM) {
                    gradeM = info.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)\s*:\s*([^<\n,]+)/i);
                }
                const sharhUrlM = info.match(/href="([^"]*sharh\/[^"]*)"/i) || prev.match(/href="([^"]*sharh\/[^"]*)"/i) || info.match(/href="([^"]*\/h\/[^"]*)"/i) || prev.match(/href="([^"]*\/h\/[^"]*)"/i);
                const sharhUrl = sharhUrlM ? sharhUrlM[1] : undefined;

                if (text.length > 10) parsed.push({
                    text, 
                    narrator: narratorM ? narratorM[1].replace(/<[^>]+>/g,'').trim() : '',
                    scholar: translateField(scholarM?.[1]?.replace(/<[^>]+>/g,'')||''),
                    source: translateField(sourceM?.[1]?.replace(/<[^>]+>/g,'')||''),
                    pageNumber: pgM ? pgM[1].replace(/<[^>]+>/g,'').trim() : undefined,
                    takhrij: takhM ? takhM[1].replace(/<[^>]+>/g,'').trim() : undefined,
                    grade: translateGrade(gradeM?.[1]?.replace(/<[^>]+>/g,'')||''),
                    sharhUrl
                });
            }
            
            // Strategy 2: Fallback to divRx if Split-by-narrator yields no results
            if (parsed.length === 0) {
                const divRx = /<div[^>]*class="[^"]*hadith[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
                let m;
                while ((m = divRx.exec(html)) !== null && parsed.length < 50) {
                    const block = m[1];
                    const txtM = block.match(/<span[^>]*>([\s\S]*?)<\/span>/i);
                    const narratorM = block.match(/الراوي\s*:\s*([^<\n]+)/i);
                    const scholarM = block.match(/المحدث\s*:\s*([^<\n]+)/i);
                    const sourceM = block.match(/المصدر\s*:\s*([^<\n]+)/i);
                    const pgM = block.match(/(?:الصفحة أو الرقم|رقم الحديث|الصفحة|الجزء أو الصفحة)\s*:\s*([^<\n,]+)/i);
                    const takhM = block.match(/(?:تخريج|التخريج|تخريج الحديث)\s*:\s*([^<\n]+)/i);
                    let gradeM = block.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)[^<]*<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
                    if (!gradeM) {
                        gradeM = block.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)\s*:\s*([^<\n]+)/i);
                    }
                    if (txtM) {
                        const text = txtM[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
                        const sharhUrlM = block.match(/href="([^"]*sharh\/[^"]*)"/i) || block.match(/href="([^"]*\/h\/[^"]*)"/i);
                        const sharhUrl = sharhUrlM ? sharhUrlM[1] : undefined;
                        if (text.length > 10) parsed.push({
                            text, 
                            narrator: narratorM ? narratorM[1].replace(/<[^>]+>/g,'').trim() : '',
                            scholar: translateField(scholarM?.[1]?.replace(/<[^>]+>/g,'')||''),
                            source: translateField(sourceM?.[1]?.replace(/<[^>]+>/g,'')||''),
                            pageNumber: pgM ? pgM[1].replace(/<[^>]+>/g,'').trim() : undefined,
                            takhrij: takhM ? takhM[1].replace(/<[^>]+>/g,'').trim() : undefined,
                            grade: translateGrade(gradeM?.[1]?.replace(/<[^>]+>/g,'')||''),
                            sharhUrl
                        });
                    }
                }
            }
            
            return parsed;
        };

        const localCorpus: HadithResult[] = [
            ...hadithDatabase.map((item) => ({
                text: item.text,
                narrator: item.rawi || "",
                scholar: deduceScholar(item),
                source: translateField(item.source || "قاعدة بيانات محلية"),
                grade: translateGrade(item.status || ""),
                explanation: item.explanation || "",
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

        const ARABIC_STOP_WORDS = new Set([
            "في", "ما", "ثم", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
        ]);

        const queryTokens = searchMode === 'p' ? [normalizedQuery] : normalizedQuery.split(/\s+/)
            .map(t => normalizeArabicText(t))
            .filter(t => t.length >= 2 && !ARABIC_STOP_WORDS.has(t));

        const backupTokens = searchMode === 'p' ? [normalizedQuery] : normalizedQuery.split(/\s+/)
            .map(t => normalizeArabicText(t))
            .filter(t => t.length >= 2);

        const activeTokens = queryTokens.length > 0 ? queryTokens : backupTokens;

        const localResults: RankedHadithResult[] = [];
        for (const item of localCorpus) {
            const normalizedText = normalizeArabicText(item.text);
            const haystack = normalizeArabicText(`${item.text} ${item.narrator} ${item.source} ${item.grade}`);
            
            let isMatch = searchMode === 'p' ? normalizedText.includes(normalizedQuery) : haystack.includes(normalizedQuery);
            let overlapRatio = 0.0;
            
            if (isMatch) {
                overlapRatio = 5.0;
            } else if (searchMode !== 'p' && activeTokens.length > 0) {
                let matchCount = 0;
                for (const token of activeTokens) {
                    if (normalizedText.includes(token)) {
                        matchCount++;
                    }
                }
                overlapRatio = matchCount / activeTokens.length;
                isMatch = overlapRatio >= 0.30;
            }

            if (!isMatch) continue;
            if (searchMode !== 'p' && !passesStrictOverlapFilter(item.text, normalizedQuery, activeTokens)) continue;
            
            if (gradeFilter === '1' && !isTrustedGrade(item.grade)) continue;
            if (gradeFilter === '2' && isTrustedGrade(item.grade)) continue;

            localResults.push({
                ...item,
                trustScore: calcTrustScore(item.grade, item.source),
                relevanceScore: overlapRatio,
            });
        }

        const initialDeduped = (dedup === 'yes' ? removeDuplicates(localResults) : localResults).sort((a, b) => {
            const scoreA = a.relevanceScore * 1000 + a.trustScore;
            const scoreB = b.relevanceScore * 1000 + b.trustScore;
            return scoreB - scoreA;
        });

        // 1. Optimistic Local Rendering - Set results immediately
        setResults(initialDeduped.slice(0, 80));

        if (isOffline) {
            setLoading(false);
            if (initialDeduped.length === 0) {
                setError("لم يتم العثور على نتائج في قاعدة البيانات المحلية. تأكد من اتصالك بالإنترنت وجرب كلمات مختلفة.");
            }
            return;
        }

        // Safety timeout: ensure loading stops after 8 seconds max
        const loadingTimeout = setTimeout(() => { setLoading(false); }, 8000);

        // 2. Background Concurrent Online Search
        (async () => {
            const merged: RankedHadithResult[] = [...localResults];
            
            // Try backend API proxy
            try {
                const gradeVal = gradeFilter === '1' ? '1' : (gradeFilter === '2' ? '2' : '');
                const stVal = searchMode;
                const tVal = searchScope;
                const exclVal = excludeWords ? `&xclude=${encodeURIComponent(excludeWords)}` : '';
                const dedupVal = dedup;

                const serverRes = await fetch(`/api/hadith/verify?skey=${encodeURIComponent(cleanedQuery)}&grade=${gradeVal}&st=${stVal}&t=${tVal}${exclVal}&dedup=${dedupVal}`);
                if (serverRes.ok) {
                    const serverData = await serverRes.json();
                    if (Array.isArray(serverData.results)) {
                        for (const item of serverData.results) {
                            if (gradeFilter === '1' && !isTrustedGrade(item.grade || "")) continue;
                            if (gradeFilter === '2' && isTrustedGrade(item.grade || "")) continue;
                            merged.push({
                                text: item.text || "", 
                                narrator: item.narrator || "",
                                scholar: translateField(item.scholar || ""),
                                source: translateField(item.source || "الدرر السنية"),
                                pageNumber: item.pageNumber,
                                takhrij: item.takhrij,
                                grade: translateGrade(item.grade || ""),
                                trustScore: calcTrustScore(item.grade || "", item.source || ""),
                                relevanceScore: 1.0,
                                sharhUrl: item.sharhUrl || item.sharh_url,
                            });
                        }
                    }
                }
            } catch { /* Fallback */ }

            // If no online results obtained yet, fallback to client-side CORS proxy fallbacks
            const hasOnlineResults = merged.some(r => r.source !== "قاعدة بيانات محلية" && !r.source.startsWith("صحيح"));
            if (!hasOnlineResults) {
                try {
                    const gradeVal = gradeFilter === '1' ? '1' : (gradeFilter === '2' ? '2' : '');
                    const stVal = searchMode;
                    const tVal = searchScope;
                    const exclVal = excludeWords ? `&xclude=${encodeURIComponent(excludeWords)}` : '';

                    const dParam = gradeVal ? `&d[]=${gradeVal}` : '';
                    const tParam = tVal ? `&t=${tVal}` : '';
                    
                    const dorarUrl = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(cleanedQuery)}&st=${stVal}${dParam}${tParam}${exclVal}&page=1`;
                    const proxyResponseHtml = await fetchWithProxy(dorarUrl);
                    if (proxyResponseHtml) {
                        const decodedHtml = decodeGarbledDorarText(proxyResponseHtml);
                        let data: any = null;
                        try {
                            data = JSON.parse(decodedHtml);
                        } catch {
                            try {
                                const directObj = typeof proxyResponseHtml === 'string' ? JSON.parse(proxyResponseHtml) : proxyResponseHtml;
                                if (directObj.contents) {
                                    data = JSON.parse(decodeGarbledDorarText(directObj.contents));
                                } else {
                                    data = directObj;
                                }
                            } catch {}
                        }

                        if (data) {
                            let rawHtml = data.ahadith?.result;
                            if (rawHtml) {
                                rawHtml = decodeGarbledDorarText(rawHtml);
                                const dorarResults = parseDorarHtml(rawHtml);
                                for (const item of dorarResults) {
                                    if (gradeFilter === '1' && !isTrustedGrade(item.grade)) continue;
                                    if (gradeFilter === '2' && isTrustedGrade(item.grade)) continue;
                                    merged.push({
                                        ...item,
                                        trustScore: calcTrustScore(item.grade, item.source),
                                        relevanceScore: 1.0
                                    });
                                }
                            }
                            
                            if (data.ahadith?.data) {
                                for (const h of (data.ahadith.data || [])) {
                                    const rawText = h.hadith || h.text || '';
                                    const text = decodeGarbledDorarText(rawText).replace(/<[^>]+>/g,'').trim();
                                    if (text.length > 5) {
                                        const item = {
                                            text, 
                                            narrator: decodeGarbledDorarText(h.rawi || h.narrator || '').replace(/<[^>]+>/g,'').trim(),
                                            scholar: translateField(decodeGarbledDorarText(h.mohadith || h.scholar || '')),
                                            source: translateField(decodeGarbledDorarText(h.book || h.source || '')),
                                            pageNumber: h.page || h.number || h.pageNumber || undefined,
                                            takhrij: h.takhrij || undefined,
                                            grade: translateGrade(decodeGarbledDorarText(h.grade || h.hukm || '')),
                                            sharhUrl: h.sharh_url || h.sharhUrl || (h.id ? `/hadith/sharh/${h.id}` : undefined)
                                        };
                                        if (gradeFilter === '1' && !isTrustedGrade(item.grade)) continue;
                                        if (gradeFilter === '2' && isTrustedGrade(item.grade)) continue;
                                        merged.push({
                                            ...item,
                                            trustScore: calcTrustScore(item.grade, item.source),
                                            relevanceScore: 1.0
                                        });
                                    }
                                }
                            }
                        }
                    }
                } catch {}
            }

            const finalDeduped = (dedup === 'yes' ? removeDuplicates(merged) : merged).map((item) => {
                const relevance = calcRelevanceScore(
                    item.text,
                    item.narrator,
                    item.source,
                    item.grade,
                    normalizedQuery,
                    activeTokens
                );
                return {
                    ...item,
                    trustScore: calcTrustScore(item.grade, item.source),
                    relevanceScore: relevance,
                };
            }).filter((item) => passesStrictOverlapFilter(item.text, normalizedQuery, activeTokens));

            const finalRanked = finalDeduped.sort((a, b) => {
                const scoreA = a.relevanceScore * 1000 + a.trustScore;
                const scoreB = b.relevanceScore * 1000 + b.trustScore;
                return scoreB - scoreA;
            });

            setResults(finalRanked.slice(0, 80));
            if (finalRanked.length === 0) {
                setError("لم يتم العثور على نتائج. تأكد من اتصالك بالإنترنت وجرب كلمات مختلفة.");
            } else {
                setError("");
            }
            setLoading(false);
            clearTimeout(loadingTimeout);
        })().catch(() => { setLoading(false); clearTimeout(loadingTimeout); });
    };

    const removeDuplicates = <T extends HadithResult>(items: T[]): T[] => {
        return items.filter(
            (value, index, self) =>
                index ===
                self.findIndex((t) => {
                    const normA = normalizeArabicText(t.text).replace(/\s+/g, '');
                    const normB = normalizeArabicText(value.text).replace(/\s+/g, '');
                    const sourceA = normalizeArabicText(t.source || '');
                    const sourceB = normalizeArabicText(value.source || '');
                    const scholarA = normalizeArabicText(t.scholar || '');
                    const scholarB = normalizeArabicText(value.scholar || '');
                    // Only deduplicate if text AND source AND scholar are ALL the same
                    return normA === normB && sourceA === sourceB && scholarA === scholarB;
                })
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

    const examples = ["من صام رمضان", "الطهور شطر الإيمان", "إنما الأعمال بالنيات", "لا يؤمن أحدكم", "الدين النصيحة", "من كان يؤمن بالله", "خيركم من تعلم القرآن", "المسلم من سلم المسلمون"];

    return (
        <div className="min-h-screen pb-32 bg-gradient-to-b from-background to-secondary/20">
            <Header title="التحقق من صحة الحديث" showBack />

            <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 space-y-4 pt-4">
                {isOffline && (
                    <Card className="p-4 bg-emerald-500/10 border-emerald-500/30 flex items-center gap-3 flex-row-reverse text-right" dir="rtl">
                        <span className="text-emerald-600 text-lg">📶</span>
                        <div className="flex-1">
                            <p className="font-bold text-xs text-emerald-600 dark:text-emerald-500">أنت تعمل دون اتصال بالإنترنت (Offline Mode)</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                                يتم البحث حالياً في قاعدة البيانات المحلية المدمجة التي تحتوي على صحيح البخاري وصحيح مسلم بالكامل.
                            </p>
                        </div>
                    </Card>
                )}
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


                    <div className="flex items-center justify-end">
                        <Button
                            onClick={searchHadith}
                            disabled={loading || !query.trim()}
                            className="px-6 py-2"
                            data-testid="button-search-hadith"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                                    جاري البحث...
                                </>
                            ) : (
                                "تحقق من الحديث"
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
                            عدد النتائج: {results.length} حديث
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
                                    {/* Hadith Text */}
                                    <p
                                        className="text-foreground leading-relaxed font-hadith text-right text-base sm:text-lg"
                                        dir="rtl"
                                    >
                                        {hadith.text}
                                    </p>

                                    {/* Details */}
                                    <div className="border-t border-border pt-3 space-y-1.5 text-xs text-muted-foreground" dir="rtl">
                                        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                            <span className="font-bold text-foreground/70 shrink-0">الراوي:</span>
                                            <span className="text-foreground">{hadith.narrator || "غير محدد"}</span>
                                            
                                            <span className="font-bold text-foreground/70 shrink-0">المحدث:</span>
                                            <span className="text-foreground">{hadith.scholar || "غير محدد"}</span>
                                            
                                            <span className="font-bold text-foreground/70 shrink-0">المصدر:</span>
                                            <span className="text-foreground">{hadith.source || "غير محدد"}</span>
                                            
                                            {hadith.pageNumber && (
                                                <>
                                                    <span className="font-bold text-foreground/70 shrink-0">الصفحة أو الرقم:</span>
                                                    <span className="text-foreground">{hadith.pageNumber}</span>
                                                </>
                                            )}
                                        </div>

                                        {hadith.takhrij && (
                                            <div className="pt-2 border-t border-border/50 flex gap-2">
                                                <span className="font-bold text-foreground/70 shrink-0">تخريج الحديث:</span>
                                                <span className="text-[11px] leading-relaxed text-muted-foreground">{hadith.takhrij}</span>
                                            </div>
                                        )}

                                        <div className="pt-2 border-t border-border/50 flex items-center gap-2">
                                            <span className="font-bold text-foreground/70 shrink-0">خلاصة حكم المحدث:</span>
                                            <span
                                                className={cn(
                                                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-bold text-[10px]",
                                                    style.bg,
                                                    style.text
                                                )}
                                            >
                                                <IconComponent className="w-3 h-3" />
                                                {hadith.grade}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Explanation Trigger */}
                                    <div className="border-t border-dashed border-border pt-2 mt-2">
                                        <button
                                            onClick={() => loadHadithExplanation(hadith, index)}
                                            className="w-full flex items-center justify-between text-xs font-semibold py-1.5 px-3 rounded bg-secondary/50 text-primary hover:bg-secondary transition-all"
                                        >
                                            <span>شرح الحديث الشريف</span>
                                            <span className="text-[10px]">📖</span>
                                        </button>
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
                                ابحث عن أي حديث للتحقق من صحته ومعرفة درجته ومصدره وشرحه
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {examples.map((example) => (
                                <Button
                                    key={example}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => { setQuery(example); }}
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
                            {" | صحيح البخاري | صحيح مسلم"}
                        </p>
                    </Card>
                )}
            </main>

            {/* Hadith Explanation Dialog */}
            <Dialog open={!!explanationHadith} onOpenChange={(open) => !open && setExplanationHadith(null)}>
                <DialogContent className="max-w-lg w-[95%] max-h-[85vh] overflow-y-auto rounded-xl p-5 text-right font-sans" dir="rtl">
                    <DialogHeader className="border-b border-border pb-3 mb-4 text-right">
                        <DialogTitle className="text-lg font-bold text-primary flex items-center gap-2">
                            <span>شرح الحديث الشريف</span>
                        </DialogTitle>
                    </DialogHeader>

                    {explanationLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <span className="text-sm">جاري تحميل شرح الحديث من الدرر السنية...</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Hadith text snippet */}
                            {explanationHadith && (
                                <div className="p-3 bg-secondary/30 rounded-lg border border-border/50 text-right">
                                    <p className="font-hadith text-sm md:text-base text-foreground/90 leading-relaxed">
                                        {explanationHadith.text}
                                    </p>
                                </div>
                            )}

                            {/* Detailed explanation text */}
                            <div className="font-hadith text-base md:text-lg leading-[1.9] text-foreground/80 text-justify select-text whitespace-pre-line">
                                {explanationText}
                            </div>

                            {/* Source URL link */}
                            {explanationHadith?.sharhUrl && (
                                <div className="pt-3 border-t border-border/50 text-xs text-muted-foreground flex flex-col gap-1 select-text">
                                    <span className="font-semibold text-foreground/75">المصدر: موسوعة الدرر السنية</span>
                                    <a
                                        href={explanationHadith.sharhUrl.startsWith("http") ? explanationHadith.sharhUrl : `https://dorar.net${explanationHadith.sharhUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline break-all"
                                    >
                                        {explanationHadith.sharhUrl.startsWith("http") ? explanationHadith.sharhUrl : `https://dorar.net${explanationHadith.sharhUrl}`}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}




