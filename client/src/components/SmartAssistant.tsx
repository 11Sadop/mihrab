import React, { useState } from 'react';
import { analyzeIntent } from '../utils/AssistantLogic';
import { AssistantIntent } from '../data/SmartAssistantData';
import { Quote, Book } from 'lucide-react';

export const SmartAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AssistantIntent | null>(null);

  const handleSearch = (text: string) => {
    setInput(text);
    const analysis = analyzeIntent(text);
    setResult(analysis ? analysis.intent : null);
  };

  const suggestions = [
    { label: 'بنام', icon: '🛌' },
    { label: 'مسافر', icon: '✈️' },
    { label: 'مهموم', icon: '😔' },
    { label: 'السوق', icon: '🛒' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-600 mb-2">المساعد الإسلامي الذكي 🤖</h2>
        <p className="text-gray-500 text-sm">بماذا تشعر أو ماذا تفعل الآن؟</p>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="اكتب هنا.. (مثلاً: طفشان، بطلع، بنام)"
        className="w-full p-4 rounded-xl mb-4 bg-gray-50 dark:bg-gray-800 text-right"
      />

      {!result && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {suggestions.map((s) => (
            <button key={s.label} onClick={() => handleSearch(s.label)}
              className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 rounded-xl">
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <span className="text-5xl animate-bounce-slow">{result.icon}</span>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-l from-emerald-600 to-teal-800 bg-clip-text text-transparent">
                {result.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">حصن نفسك وتابع سنة نبيك</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Duas Section */}
            {result.duas.map((dua, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-900/10 border-r-4 border-r-emerald-500 rounded-xl p-5 hover:shadow-md transition-all">
                <div className="absolute top-0 left-0 p-2 opacity-5">
                  <Quote className="w-12 h-12 text-emerald-800" />
                </div>
                <p className="relative text-gray-800 dark:text-gray-200 text-lg leading-loose font-arabic mb-3">
                  {dua.text}
                </p>
                {dua.source && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-white/60 dark:bg-black/20 w-fit px-2 py-1 rounded-lg">
                    <Book className="w-3 h-3" />
                    {dua.source}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sunan Section */}
          {result.sunan.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4 bg-amber-50 dark:bg-amber-900/20 w-fit px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-800">
                <span className="text-lg">🌟</span>
                <h4 className="font-bold text-amber-800 dark:text-amber-400">سنن مهجورة حافظ عليها</h4>
              </div>

              <div className="grid gap-3">
                {result.sunan.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors border border-transparent hover:border-amber-100/50">
                    <div className="min-w-[24px] h-6 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{s}</span>
                  </div>
                ))}
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
      )}
    </div>
  );
};
