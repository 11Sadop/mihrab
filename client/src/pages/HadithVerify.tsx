import { useState } from "react";
import { ArrowRight, ExternalLink, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function HadithVerify() {
    const [query, setQuery] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showIframe, setShowIframe] = useState(false);

    const handleSearch = () => {
        if (!query.trim()) return;

        setIsLoading(true);
        // Create the Dorar search URL
        const encodedQuery = encodeURIComponent(query);
        const url = `https://dorar.net/hadith/search?q=${encodedQuery}`;
        setSearchUrl(url);
        setShowIframe(true);

        // Give iframe time to load
        setTimeout(() => setIsLoading(false), 2000);
    };

    const openInDorar = () => {
        if (query.trim()) {
            const encodedQuery = encodeURIComponent(query);
            window.open(`https://dorar.net/hadith/search?q=${encodedQuery}`, '_blank');
        } else {
            window.open('https://dorar.net/hadith/search', '_blank');
        }
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
                        ابحث في موسوعة الدرر السنية - أكبر موسوعة حديثية
                    </p>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-4 -mt-4 space-y-4">
                {/* Search Box */}
                <div className="bg-[#131a24] rounded-xl p-4 border border-white/5 space-y-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="أدخل نص الحديث أو جزء منه..."
                            className="w-full h-12 bg-[#1a2332] border-white/10 text-white placeholder:text-slate-500 pr-12 text-base rounded-lg"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            className="h-9 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm flex-1 sm:flex-none"
                            onClick={handleSearch}
                            disabled={!query.trim() || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin ml-2" />
                            ) : (
                                <Search className="w-4 h-4 ml-2" />
                            )}
                            بحث
                        </Button>

                        <Button
                            variant="outline"
                            className="h-9 px-4 border-white/20 text-white hover:bg-white/10 text-sm flex-1 sm:flex-none"
                            onClick={openInDorar}
                        >
                            <ExternalLink className="w-4 h-4 ml-2" />
                            فتح في الدرر السنية
                        </Button>
                    </div>
                </div>

                {/* Dorar iframe - Full Search Experience */}
                {showIframe && (
                    <div className="bg-[#131a24] rounded-xl border border-white/5 overflow-hidden">
                        <div className="bg-[#1a2332] px-4 py-2 flex items-center justify-between border-b border-white/5">
                            <span className="text-sm text-slate-400">نتائج البحث من الدرر السنية</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-emerald-400 hover:text-emerald-300"
                                onClick={openInDorar}
                            >
                                <ExternalLink className="w-3 h-3 ml-1" />
                                فتح في نافذة جديدة
                            </Button>
                        </div>

                        {isLoading && (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                            </div>
                        )}

                        <iframe
                            src={searchUrl}
                            className={`w-full bg-white ${isLoading ? 'h-0' : 'h-[600px] sm:h-[700px]'}`}
                            title="Dorar Hadith Search"
                            onLoad={() => setIsLoading(false)}
                            sandbox="allow-same-origin allow-scripts allow-forms"
                        />
                    </div>
                )}

                {/* Quick Search Examples */}
                {!showIframe && (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500 text-center">أمثلة للبحث - اضغط للبحث مباشرة:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {[
                                "إنما الأعمال بالنيات",
                                "من كذب علي متعمدا",
                                "لا ضرر ولا ضرار",
                                "الدين النصيحة",
                                "المسلم من سلم",
                                "خيركم من تعلم القرآن"
                            ].map((example) => (
                                <button
                                    key={example}
                                    onClick={() => {
                                        setQuery(example);
                                        const encodedQuery = encodeURIComponent(example);
                                        setSearchUrl(`https://dorar.net/hadith/search?q=${encodedQuery}`);
                                        setShowIframe(true);
                                        setIsLoading(true);
                                        setTimeout(() => setIsLoading(false), 2000);
                                    }}
                                    className="p-3 bg-[#131a24] border border-white/5 rounded-xl text-sm text-slate-400 hover:text-white hover:border-emerald-500/50 transition-colors text-center line-clamp-1"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>

                        {/* Info about Dorar */}
                        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4 mt-6">
                            <h3 className="text-emerald-400 font-bold mb-2 text-sm">عن موقع الدرر السنية</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                موقع الدرر السنية هو أكبر موسوعة حديثية على الإنترنت، يحتوي على ملايين الأحاديث
                                مع تخريجها ودرجة صحتها من كتب السنة المعتمدة.
                            </p>
                            <Button
                                variant="link"
                                className="text-emerald-400 hover:text-emerald-300 p-0 h-auto mt-2 text-sm"
                                onClick={() => window.open('https://dorar.net', '_blank')}
                            >
                                زيارة الموقع الرسمي
                                <ExternalLink className="w-3 h-3 mr-1" />
                            </Button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
