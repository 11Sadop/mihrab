const fs = require('fs');

const content = fs.readFileSync('C:/Users/FSOS/.gemini/antigravity/scratch/mihrab-repo-new/mihrab-main/client/src/pages/Tafseer.tsx', 'utf8');
const lines = content.split('\n');

console.log('Searching for ⚜️, headers, and footer in Tafseer.tsx:');
lines.forEach((line, i) => {
    if (line.includes('⚜️') || line.includes('sname') || line.includes('page-number') || line.includes('Footer') || line.includes('Surah header') || line.includes('badge') || line.includes('sname') || line.includes('numberInSurah')) {
        console.log(`Line ${i + 1}: ${line.trim()}`);
    }
});
