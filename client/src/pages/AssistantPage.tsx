import React from 'react';
import { SmartAssistant } from '../components/SmartAssistant';

export const AssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <main className="container mx-auto px-4 pt-8">
        <div className="mb-10" />
        <SmartAssistant />
      </main>
    </div>
  );
};
export default AssistantPage;
