import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Download, Share2, Image as ImageIcon, Type, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BACKGROUNDS = [
    "linear-gradient(135deg, #10b981 0%, #047857 100%)", // Emerald
    "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", // Blue
    "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", // Purple
    "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)", // Amber
    "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", // Slate Dark
];

export default function CardGenerator() {
    const [userName, setUserName] = useState("");
    const [cardText, setCardText] = useState("اللهم إني أسألك العافية في الدنيا والآخرة");
    const [bgIndex, setBgIndex] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    const generateCanvas = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        // Set canvas dimensions (Square for Instagram/WhatsApp)
        canvas.width = 1080;
        canvas.height = 1080;

        // 1. Draw Background
        const bgGradient = BACKGROUNDS[bgIndex];
        if (bgGradient.includes("linear-gradient")) {
            const colors = bgGradient.match(/#[a-fA-F0-9_]+/g) || ["#10b981", "#047857"];
            const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            grd.addColorStop(0, colors[0]);
            grd.addColorStop(1, colors[1] || colors[0]);
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // 2. Add subtle pattern/overlay (Circles)
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.beginPath();
        ctx.arc(150, 150, 400, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(900, 900, 300, 0, 2 * Math.PI);
        ctx.fill();

        // 3. Draw Main Text (Hadith/Dua)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.direction = "rtl";

        // Auto-wrap text function
        const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
            const words = text.split(' ');
            let line = '';
            let currentY = y;

            context.font = "bold 60px 'Amiri', 'Noto Naskh Arabic', serif";

            // Calculate total height first to center vertically
            const lines = [];
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = context.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line);

            const startY = y - ((lines.length - 1) * lineHeight) / 2;

            for (let i = 0; i < lines.length; i++) {
                context.fillText(lines[i], x, startY + (i * lineHeight));
            }
        };

        // Draw the main large text
        wrapText(ctx, cardText, canvas.width / 2, canvas.height / 2 - 50, 900, 90);

        // 4. Draw User Name (Credit)
        if (userName.trim()) {
            ctx.font = "300 40px 'Plus Jakarta Sans', sans-serif";
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.fillText(`صدقة جارية عن: ${userName}`, canvas.width / 2, canvas.height - 200);
        }

        // 5. Draw Branding (Mihrab.app)
        ctx.font = "bold 30px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";

        // Add small line above branding
        ctx.beginPath();
        ctx.moveTo(340, canvas.height - 110);
        ctx.lineTo(740, canvas.height - 110);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillText("صُنع عبر موقع محراب | mihrab.app", canvas.width / 2, canvas.height - 60);

        return canvas.toDataURL("image/jpeg", 0.9);
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            // Small delay to allow fonts to load properly if not already cached
            await new Promise(resolve => setTimeout(resolve, 100));
            const dataUrl = await generateCanvas();

            if (dataUrl) {
                const link = document.createElement('a');
                link.download = `mihrab-card-${Date.now()}.jpg`;
                link.href = dataUrl;
                link.click();

                toast({
                    title: "تم الحفظ بنجاح",
                    description: "تم تحميل البطاقة لجهازك بسلام.",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء إنشاء الصورة.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleShare = async () => {
        setIsGenerating(true);
        try {
            const dataUrl = await generateCanvas();
            if (!dataUrl) return;

            // Convert base64 to blob
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([blob], "mihrab-card.jpg", { type: "image/jpeg" });

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'بطاقتي من محراب',
                    text: 'تصميم بطاقة دعوية عبر موقع محراب 🕋\nhttps://mihrab.app',
                });
            } else {
                // Fallback for browsers that don't support file sharing
                handleDownload();
            }
        } catch (error) {
            console.error(error);
            // Don't show toast on user cancellation
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen pb-32 bg-gradient-to-b from-background to-secondary/20">
            <Header title="صانع البطاقات" showBack />

            <main className="container max-w-md mx-auto px-4 space-y-6 pt-4">

                {/* Preview Container */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out">
                    <div
                        className="absolute inset-0 w-full h-full p-8 flex flex-col justify-center items-center text-center"
                        style={{ background: BACKGROUNDS[bgIndex] }}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <p className="relative z-10 text-white font-arabic text-2xl sm:text-3xl font-bold leading-relaxed mb-8">
                            {cardText || "اكتب دعائك هنا..."}
                        </p>

                        {userName && (
                            <p className="relative z-10 text-white/90 text-sm mt-auto mb-4 tracking-wide">
                                صدقة جارية عن: {userName}
                            </p>
                        )}

                        <div className="relative z-10 w-full pt-4 border-t border-white/20 mt-auto text-white/60 text-xs font-medium">
                            صُنع عبر موقع محراب | mihrab.app
                        </div>
                    </div>
                </div>

                {/* Hidden Canvas for actual rendering */}
                <canvas ref={canvasRef} className="hidden" />

                <Card className="p-5 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-right block flex items-center gap-2">
                            <Type className="w-4 h-4 text-emerald-500" />
                            النص والدعاء
                        </label>
                        <Textarea
                            value={cardText}
                            onChange={(e) => setCardText(e.target.value)}
                            placeholder="اكتب حديثاً أو دعاءً..."
                            className="text-right resize-none h-24 font-arabic text-base"
                            dir="rtl"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-right block flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            اسم المُهدي (اختياري)
                        </label>
                        <Input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="اسمك لتظهر كصدقة جارية"
                            className="text-right"
                            dir="rtl"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-right block flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-blue-500" />
                            لون الخلفية
                        </label>
                        <div className="flex gap-2 p-1 overflow-x-auto hide-scrollbar pb-2">
                            {BACKGROUNDS.map((bg, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setBgIndex(idx)}
                                    className={`w-12 h-12 rounded-full flex-shrink-0 transition-all border-2 ${bgIndex === idx ? 'border-primary scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                                    style={{ background: bg }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            onClick={handleDownload}
                            variant="outline"
                            className="flex-1 gap-2 border-primary/20 hover:bg-primary/5"
                            disabled={isGenerating || !cardText}
                        >
                            <Download className="w-4 h-4" />
                            تحميل الصورة
                        </Button>

                        <Button
                            onClick={handleShare}
                            className="flex-1 gap-2"
                            disabled={isGenerating || !cardText}
                        >
                            <Share2 className="w-4 h-4" />
                            مشاركة مباشرة
                        </Button>
                    </div>
                </Card>

            </main>
        </div>
    );
}
