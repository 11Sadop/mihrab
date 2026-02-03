import React, { useState } from 'react';

interface HadithResult {
    text: string;
    narrator: string;
    scholar: string;
    source: string;
    grade: string;
}

export const HadithVerifier: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<HadithResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filterSahih, setFilterSahih] = useState(false);

    const searchHadith = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setResults([]);

        try {
            let url = `/api/hadith-search?skey=${encodeURIComponent(query)}`;
            if (filterSahih) {
                url += '&grade=sahih';
            }

            console.log('[HadithVerifier] Calling:', url);
            const response = await fetch(url);
            console.log('[HadithVerifier] Response status:', response.status);

            const text = await response.text();
            console.log('[HadithVerifier] Raw response (first 500 chars):', text.substring(0, 500));

            let data;
            try {
                data = JSON.parse(text);
            } catch (parseErr) {
                console.error('[HadithVerifier] JSON parse error:', parseErr);
                setError('خطأ في تحليل الرد من السيرفر');
                return;
            }

            console.log('[HadithVerifier] Parsed data:', data);
            console.log('[HadithVerifier] Results count:', data.results?.length || 0);

            if (data.error) {
                setError(data.error + (data.details ? ` (${data.details})` : ''));
            } else if (!data.results || data.results.length === 0) {
                setError('لم يتم العثور على نتائج. جرب كلمات أخرى.');
            } else {
                setResults(sortBySourcePriority(removeDuplicates(data.results)));
            }
        } catch (err: any) {
            console.error('[HadithVerifier] Fetch error:', err);
            setError('حدث خطأ أثناء البحث: ' + (err?.message || 'خطأ غير معروف'));
        } finally {
            setLoading(false);
        }
    };

    // Helper to deduplicate results
    const removeDuplicates = (items: HadithResult[]) => {
        return items.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.text.trim() === value.text.trim() &&
                t.grade.trim() === value.grade.trim() &&
                t.narrator.trim() === value.narrator.trim()
                // Ignore source and scholar differences for cleaner UI
            ))
        );
    };

    // Priority order for famous sources - most authentic first
    const SOURCE_PRIORITY = [
        'صحيح البخاري',
        'البخاري',
        'صحيح مسلم',
        'مسلم',
        'متفق عليه',
        'سنن أبي داود',
        'أبو داود',
        'سنن الترمذي',
        'الترمذي',
        'سنن النسائي',
        'النسائي',
        'سنن ابن ماجه',
        'ابن ماجه',
        'مسند أحمد',
        'أحمد',
        'صحيح ابن حبان',
        'ابن حبان',
        'صحيح ابن خزيمة',
        'المستدرك',
        'الحاكم',
        'موطأ مالك'
    ];

    // Sort results by famous source priority
    const sortBySourcePriority = (results: HadithResult[]) => {
        return [...results].sort((a, b) => {
            // Get priority index for each source
            const getSourceIndex = (source: string) => {
                if (!source) return 999;
                for (let i = 0; i < SOURCE_PRIORITY.length; i++) {
                    if (source.includes(SOURCE_PRIORITY[i])) return i;
                }
                return 999;
            };

            const aIndex = getSourceIndex(a.source);
            const bIndex = getSourceIndex(b.source);

            // If same priority, sort by grade (صحيح first)
            if (aIndex === bIndex) {
                const aGrade = a.grade?.toLowerCase() || '';
                const bGrade = b.grade?.toLowerCase() || '';
                const aIsSahih = aGrade.includes('صحيح') || aGrade.includes('حسن');
                const bIsSahih = bGrade.includes('صحيح') || bGrade.includes('حسن');
                if (aIsSahih && !bIsSahih) return -1;
                if (!aIsSahih && bIsSahih) return 1;
            }

            return aIndex - bIndex;
        });
    };


    const getGradeColor = (grade: string) => {
        const g = grade.toLowerCase();
        // Positive: Sahih, Hasan, Jayyid, Thabit, Mahfuz, "Sihhatihi" (his authenticity), "Sihha", "Thabat"
        if (g.includes('صحيح') || g.includes('حسن') || g.includes('جيد') || g.includes('ثابت') || g.includes('محفوظ') || g.includes('صحته') || g.includes('صحة') || g.includes('ثبت')) {
            return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800';
        }
        // Negative: Da'if, Mawdu', Batil, Munkar, Khata (Error), La Yasih (Not correct)
        else if (g.includes('ضعيف') || g.includes('موضوع') || g.includes('باطل') || g.includes('منكر') || g.includes('لا يصح') || g.includes('لا أصل له') || g.includes('ليس بحديث') || g.includes('خطأ')) {
            return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
        }
        // Default / Unclear
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800';
    };

    const getGradeIcon = (grade: string) => {
        const g = grade.toLowerCase();
        if (g.includes('صحيح') || g.includes('حسن') || g.includes('جيد') || g.includes('ثابت') || g.includes('محفوظ') || g.includes('صحته') || g.includes('صحة') || g.includes('ثبت')) return '✅';
        if (g.includes('ضعيف') || g.includes('موضوع') || g.includes('باطل') || g.includes('منكر') || g.includes('خطأ')) return '❌';
        return '⚠️';
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Search Box */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchHadith()}
                            placeholder="اكتب نص الحديث أو جزء منه..."
                            className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all text-right"
                            dir="rtl"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filterSahih}
                                onChange={(e) => setFilterSahih(e.target.checked)}
                                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                            الأحاديث الصحيحة فقط
                        </label>

                        <button
                            onClick={searchHadith}
                            disabled={loading || !query.trim()}
                            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'جاري البحث...' : 'تحقق'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 text-red-700 dark:text-red-300 text-right">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 text-right">
                        نتائج البحث ({results.length})
                    </h3>

                    {results.map((hadith, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 border-r-4 border-emerald-500"
                        >
                            {/* Grade Badge */}
                            <div className="flex items-center gap-2 mb-3 justify-end">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(hadith.grade)}`}>
                                    {getGradeIcon(hadith.grade)} {hadith.grade}
                                </span>
                            </div>

                            {/* Hadith Text */}
                            <p className="text-gray-900 dark:text-white text-lg leading-relaxed mb-4 text-right font-arabic" dir="rtl">
                                {hadith.text}
                            </p>

                            {/* Details */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400 text-right">
                                {hadith.narrator && (
                                    <p><span className="font-medium">الراوي:</span> {hadith.narrator}</p>
                                )}
                                {hadith.scholar && (
                                    <p><span className="font-medium">المحدث:</span> {hadith.scholar}</p>
                                )}
                                {hadith.source && (
                                    <p><span className="font-medium">المصدر:</span> {hadith.source}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Results */}
            {!loading && results.length === 0 && query && !error && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    لم يتم العثور على نتائج. جرب كلمات مختلفة.
                </div>
            )}

            {/* Examples (Only show if no query and no results) */}
            {!query && results.length === 0 && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-3">📚</div>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-white mb-2">
                        التحقق من صحة الأحاديث
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        ابحث عن أي حديث للتحقق من صحته ومعرفة درجته
                        <br />
                        مصدر البيانات: الدرر السنية
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {['من صام رمضان', 'الطهور شطر الإيمان', 'إنما الأعمال بالنيات'].map((example) => (
                            <button
                                key={example}
                                onClick={() => {
                                    setQuery(example);
                                }}
                                className="px-3 py-1.5 bg-white dark:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-6 text-center text-xs text-gray-400">
                مصدر البيانات: <a href="https://dorar.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-600">الدرر السنية</a>
            </div>
        </div>
    );
};

export default HadithVerifier;
