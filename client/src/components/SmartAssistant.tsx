import React, { useState } from 'react';
import { analyzeIntent } from '../utils/AssistantLogic';
import { AssistantIntent } from '../data/SmartAssistantData';

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
        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{result.icon}</span>
            <h3 className="text-xl font-bold text-emerald-800">{result.title}</h3>
          </div>
          {result.duas.map((dua, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl mb-3 shadow-sm">
              <p className="text-gray-800 text-lg leading-relaxed font-arabic mb-2">{dua.text}</p>
              {dua.source && <p className="text-xs text-emerald-600 font-bold">{dua.source}</p>}
            </div>
          ))}
          {result.sunan.length > 0 && (
            <div className="mt-6 border-t border-emerald-100 pt-4">
              <h4 className="font-bold text-emerald-800 text-lg mb-3 flex items-center gap-2">
                <span>🌟</span> سنن مهجورة:
              </h4>
              <ul className="space-y-2">
                {result.sunan.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 bg-white/50 p-2 rounded-lg">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.alert && (
            <div className="mt-4 bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-900 flex items-start gap-3">
              <span className="text-xl">💡</span>
              <p className="text-sm font-medium leading-relaxed">{result.alert}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
