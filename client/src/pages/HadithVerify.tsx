import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Loader2, Search, AlertCircle, CheckCircle, XCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function HadithVerify() {
    const [text, setText] = useState("");
    const { toast } = useToast();

    const verifyMutation = useMutation({
        mutationFn: async (hadithText: string) => {
            const res = await fetch(api.hadith.verification.path, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: hadithText }),
            });

            if (!res.ok) {
                throw new Error("Failed to verify hadith");
            }

            return api.hadith.verification.responses[200].parse(await res.json());
        },
        onError: () => {
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء التحقق من الحديث. يرجى المحاولة مرة أخرى.",
                variant: "destructive",
            });
        },
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "sahih": return "text-emerald-500 bg-emerald-50 border-emerald-200";
            case "hasan": return "text-blue-500 bg-blue-50 border-blue-200";
            case "daif": return "text-orange-500 bg-orange-50 border-orange-200";
            case "fabrication": return "text-red-500 bg-red-50 border-red-200";
            default: return "text-slate-500 bg-slate-50 border-slate-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "sahih": return CheckCircle;
            case "hasan": return CheckCircle;
            case "daif": return AlertCircle;
            case "fabrication": return XCircle;
            default: return HelpCircle;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "sahih": return "صحيح";
            case "hasan": return "حسن";
            case "daif": return "ضعيف";
            case "fabrication": return "موضوع (مكذوب)";
            default: return "غير معروف";
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container max-w-lg mx-auto px-4 py-6 space-y-6">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">التحقق من صحة الحديث</h1>
                </div>

                <Card className="p-6 border-2 border-primary/10 bg-card/50 backdrop-blur-sm space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                            نص الحديث
                        </label>
                        <Textarea
                            placeholder="اكتب نص الحديث هنا للتحقق من صحته..."
                            className="min-h-[150px] resize-none text-lg leading-relaxed bg-background/50 focus:bg-background transition-colors"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full h-12 text-lg font-medium"
                        onClick={() => verifyMutation.mutate(text)}
                        disabled={!text.trim() || verifyMutation.isPending}
                    >
                        {verifyMutation.isPending ? (
                            <>
                                <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                                جاري التحقق...
                            </>
                        ) : (
                            <>
                                <Search className="w-5 h-5 ml-2" />
                                تحقق
                            </>
                        )}
                    </Button>
                </Card>

                {verifyMutation.data && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 text-muted-foreground px-2">
                            <Search className="w-4 h-4" />
                            <span className="text-sm font-medium">نتيجة البحث</span>
                        </div>

                        {verifyMutation.data.results.map((result, i) => {
                            const Icon = getStatusIcon(result.grade);
                            return (
                                <Card key={i} className={`p-5 border-l-4 space-y-3 ${getStatusColor(result.grade)}`}>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-5 h-5" />
                                            <span className="font-bold">{getStatusLabel(result.grade)}</span>
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                                            {Math.round(result.score * 100)}% تطابق
                                        </span>
                                    </div>

                                    <p className="text-lg leading-loose font-arabic text-foreground/90">
                                        {result.text}
                                    </p>

                                    <div className="flex flex-wrap gap-2 text-xs pt-2 border-t border-black/5">
                                        <span className="font-bold text-foreground/70">الراوي: {result.narrator}</span>
                                        <span className="mx-1">•</span>
                                        <span className="text-foreground/60">{result.source}</span>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
