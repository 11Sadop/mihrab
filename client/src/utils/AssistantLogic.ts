import { SMART_ASSISTANT_DATA, AssistantIntent } from '../data/SmartAssistantData';

export interface AssistantResult {
  intent: AssistantIntent;
  matchScore: number;
}

export const normalizeText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ى]/g, 'ي')
    .replace(/[ة]/g, 'ه')
    .replace(/[\u064B-\u065F]/g, '')
    .toLowerCase()
    .trim();
};

export const analyzeIntent = (inputText: string): AssistantResult | null => {
  const normalizedInput = normalizeText(inputText);
  if (!normalizedInput || normalizedInput.length < 2) return null;

  let bestMatch: AssistantIntent | null = null;
  let maxScore = 0;

  for (const intent of SMART_ASSISTANT_DATA) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedInput === normalizedKeyword) {
        score += 10;
      } else if (normalizedInput.includes(normalizedKeyword)) {
        score += 5;
      } else if (normalizedKeyword.includes(normalizedInput) && normalizedInput.length > 3) {
        score += 3;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = intent;
    }
  }

  if (maxScore > 0 && bestMatch) {
    return { intent: bestMatch, matchScore: maxScore };
  }
  return null;
};
