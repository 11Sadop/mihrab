import { motion } from "framer-motion";
import { Copy, Bookmark, ChevronDown, ChevronUp, Star, Share2, Image, Download } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContentCardProps {
    arabic: string;
    translation: string;
    transliteration?: string | null;
    reference?: string | null;
    virtueHadith?: string | null;
    virtueSource?: string | null;
    count?: number;
    countLabel?: string | null;
    category?: string;
    index?: number;
}

/**
 * تحويل الذكر إلى صورة PNG باستخدام Canvas (بدون مكتبات خارجية)
 */
async function generateDhikrImage(arabic: string, reference?: string | null): Promise<Blob | null> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const W = 1080, H = 1080;
    canvas.width = W;
    canvas.height = H;

    // خلفية متدرجة داكنة مع لمسة إسلامية
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(1, '#1e293b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // إطار داخلي
    ctx.strokeStyle = 'rgba(16,185,129,0.3)';
    ctx.lineWidth = 3;
    const r = 30;
    ctx.beginPath();
    ctx.roundRect(40, 40, W - 80, H - 80, r);
    ctx.stroke();

    // خط زينة أخضر في الأعلى
    const topGrad = ctx.createLinearGradient(100, 0, W - 100, 0);
    topGrad.addColorStop(0, 'transparent');
    topGrad.addColorStop(0.5, '#10b981');
    topGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = topGrad;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 90);
    ctx.lineTo(W - 100, 90);
    ctx.stroke();

    // النص العربي
    ctx.textAlign = 'center';
    ctx.direction = 'rtl';

    // حساب حجم الخط المناسب
    let fontSize = 48;
    ctx.font = `bold ${fontSize}px 'Tajawal', 'Arial', sans-serif`;
    const maxWidth = W - 200;
    const lines = wrapText(ctx, arabic, maxWidth);
    
    if (lines.length > 8) fontSize = 36;
    else if (lines.length > 5) fontSize = 40;
    
    ctx.font = `bold ${fontSize}px 'Tajawal', 'Arial', sans-serif`;
    const finalLines = wrapText(ctx, arabic, maxWidth);
    
    const lineHeight = fontSize * 2;
    const totalTextHeight = finalLines.length * lineHeight;
    let startY = Math.max(160, (H - totalTextHeight) / 2 + fontSize);

    // رسم النص
    ctx.fillStyle = '#f1f5f9';
    for (const line of finalLines) {
        ctx.fillText(line, W / 2, startY);
        startY += lineHeight;
    }

    // خط زينة سفلي
    const btmGrad = ctx.createLinearGradient(100, 0, W - 100, 0);
    btmGrad.addColorStop(0, 'transparent');
    btmGrad.addColorStop(0.5, '#10b981');
    btmGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = btmGrad;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, H - 180);
    ctx.lineTo(W - 100, H - 180);
    ctx.stroke();

    // المصدر
    if (reference) {
        ctx.font = `24px 'Tajawal', 'Arial', sans-serif`;
        ctx.fillStyle = '#10b981';
        ctx.fillText(reference, W / 2, H - 130);
    }

    // العلامة المائية
    ctx.font = `bold 28px 'Tajawal', 'Arial', sans-serif`;
    ctx.fillStyle = 'rgba(16,185,129,0.5)';
    ctx.fillText('محراب  ❘  mihrabapp.com', W / 2, H - 70);

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
    });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

export function ContentCard({ arabic, translation, transliteration, reference, virtueHadith, virtueSource, count, countLabel, index = 0 }: ContentCardProps) {
    const { toast } = useToast();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showVirtue, setShowVirtue] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${arabic}\n\n${translation}`);
        toast({
            title: "تم النسخ",
            description: "يمكنك الآن مشاركته مع الآخرين",
        });
    };

    const handleShareLink = async () => {
        const textToShare = `${arabic}\n\n${reference ? `📚 ${reference}` : ''}\n\nمن تطبيق محراب 🕌\nhttps://mihrabapp.com/adhkar`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'ذكر من محراب',
                    text: textToShare,
                });
            } catch (e) {
                // user cancelled
            }
        } else {
            const waUrl = `https://wa.me/?text=${encodeURIComponent(textToShare)}`;
            window.open(waUrl, '_blank');
        }
    };

    const handleShareImage = async () => {
        setIsGenerating(true);
        try {
            const blob = await generateDhikrImage(arabic, reference);
            if (!blob) {
                toast({ title: "خطأ", description: "لم يتم إنشاء الصورة" });
                return;
            }

            const file = new File([blob], 'dhikr-mihrab.png', { type: 'image/png' });

            // محاولة المشاركة مباشرة (موبايل)
            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    title: 'ذكر من محراب',
                    files: [file],
                });
            } else {
                // تحميل الصورة مباشرة (ديسكتوب)
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'dhikr-mihrab.png';
                a.click();
                URL.revokeObjectURL(url);
                toast({ title: "تم تحميل الصورة ✅", description: "يمكنك إرسالها الآن" });
            }
        } catch (e) {
            toast({ title: "خطأ", description: "حدث خطأ أثناء إنشاء الصورة" });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
            data-testid={`card-content-${index}`}
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full" />

                <div className="relative p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        {(count || countLabel) && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{countLabel ? countLabel : count === 1 ? "مرة واحدة" : `${count} مرات`}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-1 mr-auto">
                            {/* زر مشاركة كصورة */}
                            <button
                                onClick={handleShareImage}
                                disabled={isGenerating}
                                className="p-2 rounded-full text-muted-foreground hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                                title="حفظ كصورة"
                                data-testid={`button-share-image-${index}`}
                            >
                                {isGenerating ? (
                                    <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Image className="w-4 h-4" />
                                )}
                            </button>
                            {/* زر مشاركة كرابط */}
                            <button
                                onClick={handleShareLink}
                                className="p-2 rounded-full text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                                title="مشاركة"
                                data-testid={`button-share-link-${index}`}
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                            {/* نسخ */}
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                data-testid={`button-copy-${index}`}
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                data-testid={`button-bookmark-${index}`}
                            >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="relative">
                            <div className="absolute -right-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                            <p className="text-right font-arabic text-xl sm:text-2xl md:text-3xl leading-[2] text-foreground pr-4">
                                {arabic}
                            </p>
                        </div>

                        {transliteration && (
                            <p className="text-sm text-muted-foreground/80 italic text-right pr-4">
                                {transliteration}
                            </p>
                        )}

                        <div className="bg-muted/30 rounded-xl p-4 text-right">
                            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                                {translation}
                            </p>
                        </div>

                        {reference && (
                            <div className="flex justify-end">
                                <span className="inline-flex items-center gap-1 text-xs text-primary/80 font-medium">
                                    <span className="w-1 h-1 rounded-full bg-primary/60" />
                                    {reference}
                                </span>
                            </div>
                        )}

                        {virtueHadith && (
                            <div className="pt-3 border-t border-border/30">
                                <button
                                    onClick={() => setShowVirtue(!showVirtue)}
                                    className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors flex-row-reverse w-full justify-end"
                                    data-testid={`button-virtue-${index}`}
                                >
                                    <span className="font-medium">فضل هذا الذكر</span>
                                    {showVirtue ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                {showVirtue && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-3 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/10"
                                    >
                                        <p className="text-sm font-arabic text-right leading-relaxed text-foreground/80">
                                            {virtueHadith}
                                        </p>
                                        {virtueSource && (
                                            <p className="text-xs text-primary font-medium mt-3 text-right">
                                                — {virtueSource}
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
