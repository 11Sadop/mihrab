import { useState, useRef, useEffect } from "react";
import { Loader2, Send, ArrowRight, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function SmartAssistant() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(-10) // Send last 10 messages for context
                }),
            });

            if (!res.ok) throw new Error("Failed to get response");

            const data = await res.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-b from-emerald-900/80 to-emerald-800/60 backdrop-blur-xl border-b border-white/10">
                <div className="container max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <Sparkles className="w-5 h-5 text-emerald-300" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">المساعد الذكي</h1>
                                <p className="text-emerald-200/70 text-xs">اسألني عن أي شيء إسلامي</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <main className="flex-1 container max-w-4xl mx-auto px-4 py-6 overflow-y-auto pb-32">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="p-4 bg-emerald-500/10 rounded-full mb-4">
                            <Bot className="w-12 h-12 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-2">مرحباً بك!</h2>
                        <p className="text-muted-foreground max-w-sm">
                            أنا مساعدك الذكي للأسئلة الإسلامية. اسألني عن الصلاة، الزكاة، الصيام، أو أي موضوع ديني آخر.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-6 max-w-sm">
                            {["ما هي أركان الإسلام؟", "كيف أصلي صلاة الاستخارة؟", "ما حكم صيام يوم عرفة؟", "اشرح لي سورة الفاتحة"].map((q) => (
                                <button
                                    key={q}
                                    onClick={() => { setInput(q); }}
                                    className="p-3 bg-card border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors text-right"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex gap-3",
                                    msg.role === "user" ? "flex-row-reverse" : ""
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-full h-fit",
                                    msg.role === "user" ? "bg-primary/10" : "bg-emerald-500/10"
                                )}>
                                    {msg.role === "user" ? (
                                        <User className="w-5 h-5 text-primary" />
                                    ) : (
                                        <Bot className="w-5 h-5 text-emerald-500" />
                                    )}
                                </div>
                                <div className={cn(
                                    "max-w-[80%] p-4 rounded-2xl",
                                    msg.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-tr-none"
                                        : "bg-card border border-border rounded-tl-none"
                                )}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-full h-fit">
                                    <Bot className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="bg-card border border-border rounded-2xl rounded-tl-none p-4">
                                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </main>

            {/* Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}>
                <div className="container max-w-4xl mx-auto px-4 py-3">
                    <div className="flex gap-2">
                        <Textarea
                            placeholder="اكتب سؤالك هنا..."
                            className="min-h-[44px] max-h-32 resize-none bg-card border-border"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <Button
                            size="icon"
                            className="h-11 w-11 shrink-0 bg-emerald-600 hover:bg-emerald-700"
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
