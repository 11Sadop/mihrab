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

  const inputTokens = normalizedInput.split(' ');

  let bestMatch: AssistantIntent | null = null;
  let maxScore = 0;

  for (const intent of SMART_ASSISTANT_DATA) {
    let score = 0;

    // 1. Keyword Matching (High Priority)
    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedInput.includes(normalizedKeyword)) score += 20;
      for (const token of inputTokens) {
        if (token === normalizedKeyword) score += 10;
      }
    }

    // 2. Deep Content Matching (Medium Priority)
    // Search in Duas
    for (const dua of intent.duas) {
      const normDua = normalizeText(dua.text);
      if (normDua.includes(normalizedInput)) score += 15;
    }

    // Search in Sunan
    for (const sunnah of intent.sunan) {
      const text = typeof sunnah === 'string' ? sunnah : sunnah.text;
      const normSunnah = normalizeText(text);
      if (normSunnah.includes(normalizedInput)) score += 15;
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
