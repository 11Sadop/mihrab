const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\FSOS\\.gemini\\antigravity\\scratch\\mihrab-repo-new\\mihrab-main\\client\\src\\pages\\Tafseer.tsx', 'utf8');
const lines = content.split('\n');

console.log('Searching for Hifz/Speech/Similarity in Tafseer.tsx:');
lines.forEach((line, i) => {
    if (line.includes('wordSimilarity') || line.includes('SpeechRecognition') || line.includes('recognition') || line.includes('similarity') || line.includes('Levenshtein') || line.includes('hifz') || line.includes('Hifz') || line.includes('listen') || line.includes('Speech')) {
        console.log(`Line ${i + 1}: ${line.trim()}`);
    }
});
