import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
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
    explanation?: string;
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
        .replace(/[أإآٱء]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/[ىئ]/g, "ي")
        .replace(/ؤ/g, "و")
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
    
    // Check if at least 2 consecutive words from query match
    const words = normalizedQuery.split(' ').filter(w => w.length >= 3);
    if (words.length >= 2) {
        for (let i = 0; i < words.length - 1; i++) {
            const bigram = `${words[i]} ${words[i+1]}`;
            if (normalizedText.includes(bigram)) {
                return 3.0;
            }
        }
    }
    
    if (activeTokens.length === 0) return 0.0;
    
    let matchCount = 0;
    for (const token of activeTokens) {
        if (normalizedText.includes(token)) {
            matchCount++;
        }
    }
    
    // Penalize disjoint token matching to prevent unrelated mixing results
    const ratio = matchCount / activeTokens.length;
    return ratio >= 0.5 ? ratio : 0.0;
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
    const [explationLoadings, setExplanationLoadings] = useState<Record<number, boolean>>({});
    const [expandedIdxs, setExpandedIdxs] = useState<Record<number, boolean>>({});

    const toggleExplanation = async (idx: number, hadith: HadithResult) => {
        if (expandedIdxs[idx]) {
            setExpandedIdxs(prev => ({ ...prev, [idx]: false }));
            return;
        }
        
        setExpandedIdxs(prev => ({ ...prev, [idx]: true }));
        
        if (explanations[idx] || hadith.explanation) {
            return;
        }
        
        setExplanationLoadings(prev => ({ ...prev, [idx]: true }));
        try {
            const res = await fetch(`/api/hadith/explain?q=${encodeURIComponent(hadith.text)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.explanation) {
                    setExplanations(prev => ({ ...prev, [idx]: data.explanation }));
                } else {
                    setExplanations(prev => ({ ...prev, [idx]: "لم يتم العثور على شرح للحديث." }));
                }
            } else {
                setExplanations(prev => ({ ...prev, [idx]: "حدث خطأ أثناء جلب الشرح." }));
            }
        } catch {
            setExplanations(prev => ({ ...prev, [idx]: "حدث خطأ أثناء الاتصال بالخادم." }));
        } finally {
            setExplanationLoadings(prev => ({ ...prev, [idx]: false }));
        }
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
                let gradeM = info.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)[^<]*<\/span>\s*<span[^>]*>([^<,]+)<\/span>/i);
                if (!gradeM) {
                    gradeM = info.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)\s*:\s*([^<\n,]+)/i);
                }
                if (text.length > 10) parsed.push({
                    text, 
                    narrator: narratorM ? narratorM[1].replace(/<[^>]+>/g,'').trim() : '',
                    scholar: translateField(scholarM?.[1]?.replace(/<[^>]+>/g,'')||''),
                    source: translateField(sourceM?.[1]?.replace(/<[^>]+>/g,'')||''),
                    grade: translateGrade(gradeM?.[1]?.replace(/<[^>]+>/g,'')||'')
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
                    let gradeM = block.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)[^<]*<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
                    if (!gradeM) {
                        gradeM = block.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)\s*:\s*([^<\n]+)/i);
                    }
                    if (txtM) {
                        const text = txtM[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
                        if (text.length > 10) parsed.push({
                            text, 
                            narrator: narratorM ? narratorM[1].replace(/<[^>]+>/g,'').trim() : '',
                            scholar: translateField(scholarM?.[1]?.replace(/<[^>]+>/g,'')||''),
                            source: translateField(sourceM?.[1]?.replace(/<[^>]+>/g,'')||''),
                            grade: translateGrade(gradeM?.[1]?.replace(/<[^>]+>/g,'')||'')
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
            "من", "عن", "ان", "في", "على", "لا", "ما", "الى", "ثم", "انه", "كان", 
            "قال", "الله", "رسول", "صلي", "عليه", "وسلم", "يا", "ايها", "قد", "لقد",
            "انما", "اما", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
        ]);

        const queryTokens = normalizedQuery.split(/\s+/)
            .map(t => normalizeArabicText(t))
            .filter(t => t.length >= 2 && !ARABIC_STOP_WORDS.has(t));

        const backupTokens = normalizedQuery.split(/\s+/)
            .map(t => normalizeArabicText(t))
            .filter(t => t.length >= 2);

        const activeTokens = queryTokens.length > 0 ? queryTokens : backupTokens;

        const localResults: RankedHadithResult[] = [];
        for (const item of localCorpus) {
            const normalizedText = normalizeArabicText(item.text);
            const haystack = normalizeArabicText(`${item.text} ${item.narrator} ${item.source} ${item.grade}`);
            
            let isMatch = haystack.includes(normalizedQuery);
            let overlapRatio = 0.0;
            
            if (isMatch) {
                overlapRatio = 1.0;
            } else if (activeTokens.length > 0) {
                let matchCount = 0;
                for (const token of activeTokens) {
                    if (normalizedText.includes(token)) {
                        matchCount++;
                    }
                }
                overlapRatio = matchCount / activeTokens.length;
                const wordCount = query.trim().split(/\s+/).length;
                if (wordCount <= 2) {
                    if (overlapRatio >= 0.50) {
                        isMatch = true;
                    }
                } else {
                    if (overlapRatio >= 0.40) {
                        isMatch = true;
                    }
                }
            }

            if (!isMatch) continue;
            if (filterSahih && !isTrustedGrade(item.grade)) continue;

            localResults.push({
                ...item,
                trustScore: calcTrustScore(item.grade, item.source),
                relevanceScore: overlapRatio,
            });
        }

        const initialDeduped = removeDuplicates(localResults).sort((a, b) => {
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

        // 2. Background Concurrent Online Search
        (async () => {
            const merged: RankedHadithResult[] = [...localResults];
            
            // Try backend API proxy
            try {
                const serverRes = await fetch(`/api/hadith/verify?skey=${encodeURIComponent(cleanedQuery)}${filterSahih ? '&grade=sahih' : ''}`);
                if (serverRes.ok) {
                    const serverData = await serverRes.json();
                    if (Array.isArray(serverData.results)) {
                        for (const item of serverData.results) {
                            if (filterSahih && !isTrustedGrade(item.grade || "")) continue;
                            merged.push({
                                text: item.text || "", 
                                narrator: item.narrator || "",
                                scholar: translateField(item.scholar || ""),
                                source: translateField(item.source || "الدرر السنية"),
                                grade: translateGrade(item.grade || ""),
                                trustScore: calcTrustScore(item.grade || "", item.source || ""),
                                relevanceScore: 1.0,
                            });
                        }
                    }
                }
            } catch { /* Fallback */ }

            // If no online results obtained yet, fallback to client-side CORS proxy fallbacks
            const hasOnlineResults = merged.some(r => r.source !== "قاعدة بيانات محلية" && !r.source.startsWith("صحيح"));
            if (!hasOnlineResults) {
                try {
                    const dorarUrl = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(cleanedQuery)}&st=a&xclude=0&page=1`;
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
                                    if (filterSahih && !isTrustedGrade(item.grade)) continue;
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
                                            grade: translateGrade(decodeGarbledDorarText(h.grade || h.hukm || ''))
                                        };
                                        if (filterSahih && !isTrustedGrade(item.grade)) continue;
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

            const finalDeduped = removeDuplicates(merged).map((item) => {
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
            });

            const finalRanked = finalDeduped.sort((a, b) => {
                const scoreA = a.relevanceScore * 1000 + a.trustScore;
                const scoreB = b.relevanceScore * 1000 + b.trustScore;
                return scoreB - scoreA;
            });

            if (finalRanked.length > 0) {
                setResults(finalRanked.slice(0, 80));
                setError("");
            } else {
                if (initialDeduped.length === 0) {
                    setError("لم يتم العثور على نتائج. تأكد من اتصالك بالإنترنت وجرب كلمات مختلفة.");
                }
            }
            setLoading(false);
        })();
    };

    const removeDuplicates = <T extends HadithResult>(items: T[]): T[] => {
        return items.filter(
            (value, index, self) =>
                index ===
                self.findIndex((t) => {
                    const normA = normalizeArabicText(t.text).substring(0, 80).replace(/\s+/g, '');
                    const normB = normalizeArabicText(value.text).substring(0, 80).replace(/\s+/g, '');
                    const narratorA = normalizeArabicText(t.narrator || '');
                    const narratorB = normalizeArabicText(value.narrator || '');
                    const sourceA = normalizeArabicText(t.source || '');
                    const sourceB = normalizeArabicText(value.source || '');
                    return normA === normB && narratorA === narratorB && sourceA === sourceB;
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

    const examples = ["من صام رمضان", "الطهور شطر الإيمان", "إنما الأعمال بالنيات"];

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
                                        <p>
                                            <span className="font-medium">الراوي:</span>{" "}
                                            {hadith.narrator || "غير محدد"}
                                        </p>
                                        <p>
                                            <span className="font-medium">المحدث:</span>{" "}
                                            {hadith.scholar || "غير محدد"}
                                        </p>
                                        <p>
                                            <span className="font-medium">المصدر:</span>{" "}
                                            {hadith.source || "غير محدد"}
                                        </p>
                                    </div>

                                    {/* Collapsible Explanation Block */}
                                    <div className="border-t border-dashed border-border pt-2 mt-2">
                                        <button
                                            onClick={() => toggleExplanation(index, hadith)}
                                            className="w-full flex items-center justify-between text-xs font-semibold py-1 px-2 rounded bg-secondary/50 text-primary hover:bg-secondary transition-all"
                                        >
                                            <span>شرح الحديث الشريف</span>
                                            <span className="text-[10px]">{expandedIdxs[index] ? "▲" : "▼"}</span>
                                        </button>
                                        
                                        {expandedIdxs[index] && (
                                            <div className="mt-2 p-3 bg-secondary/30 rounded-lg text-xs leading-relaxed text-foreground text-right border border-border/50 animate-in fade-in slide-in-from-top-1 duration-200" dir="rtl">
                                                {hadith.explanation ? (
                                                    hadith.explanation
                                                ) : explationLoadings[index] ? (
                                                    <div className="flex items-center gap-2 justify-center py-2 text-muted-foreground">
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        <span>جاري تحميل شرح الحديث من الدرر السنية...</span>
                                                    </div>
                                                ) : (
                                                    explanations[index] || "لا يوجد شرح متوفر."
                                                )}
                                            </div>
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




