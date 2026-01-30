import React, { useState } from 'react';
import { analyzeIntent } from '../utils/AssistantLogic';
import { AssistantIntent } from '../data/SmartAssistantData';
import { Quote, Book, ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SmartAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AssistantIntent | null>(null);

  const handleSearch = () => {
    if (!input.trim()) return;
    const analysis = analyzeIntent(input);
    setResult(analysis ? analysis.intent : null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setResult(null);
    setInput('');
  };

  const suggestions = [
    { label: 'بنام', icon: '🛌' },
    { label: 'مسافر', icon: '✈️' },
    { label: 'مهموم', icon: '😔' },
    { label: 'السوق', icon: '🛒' },
    { label: 'بروح اصلي', icon: '🕌' },
    { label: 'ببدأ مذاكرة', icon: '📝' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300">

      {/* Header & Search Area - Hide when result is active for cleaner look, or keep? User wanted "Back" */}
      {!result ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-3">
              المساعد الإسلامي الذكي 🤖
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              أكتب حالتك (مثلاً: "طفشان"، "بروح اصلي"، "عندي اختبار")
            </p>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب هنا.."
              className="w-full p-4 pr-12 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-500 transition-all text-right text-lg shadow-inner outline-none"
            />
            <button
              onClick={handleSearch}
              className="absolute left-2 top-2 bottom-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl transition-colors shadow-lg shadow-emerald-200 dark:shadow-none"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {suggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => { setInput(s.label); setTimeout(() => { const res = analyzeIntent(s.label); setResult(res?.intent || null); }, 100); }}
                className="p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md rounded-2xl transition-all flex flex-col items-center gap-2 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-emerald-600">{s.label}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button
            onClick={handleReset}
            className="mb-4 flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors font-bold px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowRight className="w-5 h-5" />
            <span>بحث جديد</span>
          </button>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-0 sm:p-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-5xl shadow-inner">
                {result.icon}
              </div>
              <div className="text-center sm:text-right flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {result.title}
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full w-fit mx-auto sm:mx-0">
                  سنة مؤكدة وذكر طيب
                </p>
              </div>
            </div>

            {/* Virtue Section (Fadl) */}
            {result.alert && (
              <div className="mb-8 relative overflow-hidden bg-gradient-to-l from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-2xl p-5 border border-amber-100 dark:border-amber-900/50">
                <div className="flex items-start gap-3 relative z-10">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                    <Sparkles className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">فضل هذا العمل:</h4>
                    <p className="text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                      {result.alert}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Duas Section */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-4 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-emerald-500" />
                  الأدعية والأذكار:
                </h4>
                <div className="grid gap-4">
                  {result.duas.map((dua, idx) => (
                    <div key={idx} className="relative group overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-600 rounded-2xl p-6 transition-all hover:shadow-lg">
                      <p className="relative text-xl text-gray-800 dark:text-gray-100 leading-loose font-arabic text-center">
                        "{dua.text}"
                      </p>
                      {dua.source && (
                        <div className="mt-4 flex justify-end">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                            {dua.source}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sunan Section */}
              {result.sunan.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-4 flex items-center gap-2 mt-8">
                    <Book className="w-5 h-5 text-indigo-500" />
                    السنن المهجورة:
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {result.sunan.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-100 transition-colors">
                        <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full font-bold text-sm shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```
