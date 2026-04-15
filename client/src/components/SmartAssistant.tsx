import React, { useState } from 'react';
import { analyzeIntent } from '../utils/AssistantLogic';
import { AssistantIntent } from '../data/SmartAssistantData';
import { Quote, Book, ArrowRight, Search } from 'lucide-react';
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

      {!result ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-3">
              السنن 🕌
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              اكتشف السنن الصحيحة والأدعية المناسبة لكل موقف في حياتك اليومية
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

            {/* Virtue Section (Fadl of the Action General) */}
            {result.alert && (
              <div className="mb-8 relative overflow-hidden bg-gradient-to-l from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-2xl p-5 border border-amber-100 dark:border-amber-900/50">
                <div className="flex items-start gap-3 relative z-10">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2.5 rounded-lg text-2xl">
                    ☀️
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
                    <div key={idx} className="relative group bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-900/10 border-r-4 border-r-emerald-500 rounded-xl p-5 hover:shadow-md transition-all">
                      <div className="absolute top-0 left-0 p-2 opacity-5">
                        <Quote className="w-12 h-12 text-emerald-800" />
                      </div>
                      <p className="relative text-gray-800 dark:text-gray-200 text-lg leading-loose font-arabic mb-3">
                        {dua.text}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                        {dua.source && (
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-white/60 dark:bg-black/20 px-2 py-1 rounded-lg">
                            <Book className="w-3 h-3" />
                            {dua.source}
                          </div>
                        )}
                        {dua.fadl && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-800/50">
                            <span>☀️</span>
                            فضل: {dua.fadl}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sunan Section */}
              {result.sunan.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4 bg-amber-50 dark:bg-amber-900/20 w-fit px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-800">
                    <span className="text-lg">🌟</span>
                    <h4 className="font-bold text-amber-800 dark:text-amber-400">سنن مهجورة حافظ عليها</h4>
                  </div>

                  <div className="grid gap-3">
                    {result.sunan.map((s, i) => {
                      const text = typeof s === 'string' ? s : s.text;
                      const fadl = typeof s === 'string' ? null : s.fadl;
                      return (
                        <div key={i} className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors border border-transparent hover:border-amber-100/50">
                          <div className="flex items-start gap-3">
                            <div className="min-w-[24px] h-6 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold mt-0.5">
                              {i + 1}
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{text}</span>
                          </div>
                          {fadl && (
                            <div className="mr-9 text-xs text-amber-600/80 dark:text-amber-400/80 flex items-center gap-1">
                              <span>🌙</span> {fadl}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {result.alert && (
                <div className="mt-6 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800 p-4 rounded-xl flex gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full h-fit">
                    <span className="text-xl">💡</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">هل تعلم؟</h5>
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">{result.alert}</p>
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
