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
    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalizeText(keyword);

      // Check full phrase match
      if (normalizedInput.includes(normalizedKeyword)) {
        score += 10;
      }

      // Check word-by-word match
      for (const token of inputTokens) {
        if (token === normalizedKeyword || (token.length > 3 && normalizedKeyword.includes(token))) {
          score += 5;
        }
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = intent;
    }
  }

  // Lower threshold to catch more checks
  if (maxScore > 0 && bestMatch) {
    return { intent: bestMatch, matchScore: maxScore };
  }
  return null;
};
