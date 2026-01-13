import React from 'react';
import { SmartAssistant } from '../components/SmartAssistant';

export const AssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <main className="container mx-auto px-4 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-4">
            المساعد الإسلامي الذكي
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            فقط اكتب حالتك وسأخبرك بأفضل الأذكار والسنن المناسبة لك.
          </p>
        </div>
        <SmartAssistant />
      </main>
    </div>
  );
};
export default AssistantPage;
