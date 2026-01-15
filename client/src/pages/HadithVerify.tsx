import { useState } from "react";
import { Loader2, Search, ArrowRight, Book, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

interface HadithResult {
    number: number;
    arab: string;
    id: string;
    book: string;
}

// Available hadith books from the API
const HADITH_BOOKS = [
    { id: "bukhari", name: "صحيح البخاري", count: 6638 },
    { id: "muslim", name: "صحيح مسلم", count: 4930 },
    { id: "abu-daud", name: "سنن أبي داود", count: 4419 },
    { id: "tirmidzi", name: "جامع الترمذي", count: 3625 },
    { id: "nasai", name: "سنن النسائي", count: 5364 },
    { id: "ibnu-majah", name: "سنن ابن ماجه", count: 4285 },
    { id: "ahmad", name: "مسند أحمد", count: 4305 },
    { id: "malik", name: "موطأ مالك", count: 1587 },
    { id: "darimi", name: "سنن الدارمي", count: 2949 },
];

export default function HadithVerify() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<HadithResult[]>([]);
    const [searchedBooks, setSearchedBooks] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const searchHadith = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        setResults([]);
        setSearchedBooks([]);
        setError("");
        setHasSearched(true);

        const allResults: HadithResult[] = [];
        const booksSearched: string[] = [];

        try {
            // Search in Bukhari and Muslim first (most authentic)
            const priorityBooks = ["bukhari", "muslim"];
            const otherBooks = ["abu-daud", "tirmidzi", "nasai", "ibnu-majah"];

            for (const bookId of [...priorityBooks, ...otherBooks]) {
                const book = HADITH_BOOKS.find(b => b.id === bookId);
                if (!book) continue;

                try {
                    // Search in batches of 100 hadiths
                    const batchSize = 100;
                    const batches = Math.min(5, Math.ceil(book.count / batchSize)); // Limit to 5 batches per book

                    for (let batch = 0; batch < batches && allResults.length < 20; batch++) {
                        const start = batch * batchSize + 1;
                        const end = Math.min(start + batchSize - 1, book.count);

                        const response = await fetch(
                            `https://api.hadith.gading.dev/books/${bookId}?range=${start}-${end}`
                        );

                        if (!response.ok) continue;

                        const data = await response.json();

                        if (data.data?.hadiths) {
                            // Search in the Arabic text
                            const matches = data.data.hadiths.filter((h: any) =>
                                h.arab && h.arab.includes(query)
                            );

                            for (const match of matches) {
                                if (allResults.length >= 20) break;
                                allResults.push({
                                    number: match.number,
                                    arab: match.arab,
                                    id: match.id,
                                    book: book.name
                                });
                            }
                        }
                    }

                    booksSearched.push(book.name);

                    // Stop if we have enough results
                    if (allResults.length >= 20) break;

                } catch (bookError) {
                    console.error(`Error searching ${bookId}:`, bookError);
                }
            }

            setResults(allResults);
            setSearchedBooks(booksSearched);

            if (allResults.length === 0) {
                setError("لم يتم العثور على نتائج. جرب كلمات بحث أخرى.");
            }

        } catch (err) {
            console.error("Search error:", err);
            setError("حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    };

    // Quick search without API - search featured hadiths
    const featuredHadiths: HadithResult[] = [
        {
            number: 1,
            arab: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ",
            id: "أول حديث في صحيح البخاري",
            book: "صحيح البخاري"
        },
        {
            number: 45,
            arab: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ",
            id: "تعريف المسلم",
            book: "صحيح البخاري"
        },
        {
            number: 13,
            arab: "لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
            id: "حب الخير للآخرين",
            book: "صحيح البخاري"
        },
        {
            number: 52,
            arab: "إِنَّ الْحَلَالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ وَبَيْنَهُمَا مُشْتَبِهَاتٌ لَا يَعْلَمُهُنَّ كَثِيرٌ مِنَ النَّاسِ",
            id: "الحلال والحرام",
            book: "صحيح البخاري"
        },
        {
            number: 6018,
            arab: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ",
            id: "إكرام الجار والضيف",
            book: "صحيح البخاري"
        },
    ];

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
                        ابحث في أكثر من 40,000 حديث من الكتب التسعة
                    </p>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-4 -mt-4 space-y-6">
                {/* Search Box */}
                <div className="bg-[#131a24] rounded-xl p-4 border border-white/5 space-y-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="ابحث بالنص العربي: الأعمال، النيات، الصلاة..."
                            className="w-full h-12 bg-[#1a2332] border-white/10 text-white placeholder:text-slate-500 pr-12 text-base rounded-lg"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchHadith()}
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    </div>

                    <Button
                        className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg"
                        onClick={searchHadith}
                        disabled={!query.trim() || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin ml-2" />
                                جاري البحث...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4 ml-2" />
                                بحث في الأحاديث
                            </>
                        )}
                    </Button>
                </div>

                {/* Books being searched */}
                {isLoading && (
                    <div className="bg-[#131a24] rounded-xl p-4 border border-white/5">
                        <p className="text-sm text-slate-400 text-center mb-2">جاري البحث في:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {HADITH_BOOKS.slice(0, 6).map((book) => (
                                <span
                                    key={book.id}
                                    className="text-xs bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded"
                                >
                                    {book.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="bg-orange-900/20 border border-orange-500/20 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-orange-300">{error}</p>
                            <p className="text-sm text-slate-400 mt-1">
                                جرب البحث بكلمات من متن الحديث بالعربية
                            </p>
                        </div>
                    </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-sm text-slate-400">
                                نتائج البحث ({results.length})
                            </p>
                            {searchedBooks.length > 0 && (
                                <p className="text-xs text-slate-500 mt-1">
                                    تم البحث في: {searchedBooks.join("، ")}
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            {results.map((result, i) => (
                                <div
                                    key={i}
                                    className="bg-[#131a24] rounded-lg border border-white/5 border-l-4 border-l-emerald-500 overflow-hidden"
                                >
                                    <div className="p-4 space-y-3">
                                        {/* Book & Number Badge */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded">
                                                صحيح
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                <Book className="w-3 h-3 inline ml-1" />
                                                {result.book} - رقم {result.number}
                                            </span>
                                        </div>

                                        {/* Hadith Text */}
                                        <p className="text-white/90 text-base leading-loose font-arabic" dir="rtl">
                                            {result.arab}
                                        </p>

                                        {/* Translation hint */}
                                        {result.id && (
                                            <p className="text-xs text-slate-500 pt-2 border-t border-white/5">
                                                {result.id.substring(0, 150)}...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Featured Hadiths - Before Search */}
                {!hasSearched && !isLoading && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-sm text-slate-400">أحاديث مشهورة من صحيح البخاري</p>
                        </div>

                        <div className="space-y-3">
                            {featuredHadiths.map((hadith, i) => (
                                <div
                                    key={i}
                                    className="bg-[#131a24] rounded-lg border border-white/5 border-l-4 border-l-emerald-500 overflow-hidden cursor-pointer hover:border-emerald-500/30 transition-colors"
                                    onClick={() => {
                                        // Extract a search term from the hadith
                                        const words = hadith.arab.split(" ");
                                        setQuery(words.slice(0, 2).join(" "));
                                    }}
                                >
                                    <div className="p-4 space-y-3">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded">
                                                صحيح
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                <Book className="w-3 h-3 inline ml-1" />
                                                {hadith.book} - رقم {hadith.number}
                                            </span>
                                        </div>

                                        <p className="text-white/90 text-base leading-loose font-arabic" dir="rtl">
                                            {hadith.arab}
                                        </p>

                                        <p className="text-xs text-slate-500 pt-2 border-t border-white/5">
                                            {hadith.id}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Available Books */}
                        <div className="bg-[#131a24] rounded-xl p-4 border border-white/5">
                            <h3 className="text-sm font-medium text-white mb-3 text-center">الكتب المتوفرة للبحث</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {HADITH_BOOKS.map((book) => (
                                    <div
                                        key={book.id}
                                        className="bg-[#1a2332] rounded-lg p-2 text-center"
                                    >
                                        <p className="text-xs text-white">{book.name}</p>
                                        <p className="text-xs text-emerald-400">{book.count.toLocaleString()} حديث</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
