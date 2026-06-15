const fs = require('fs');

const content = fs.readFileSync('C:/Users/FSOS/.gemini/antigravity/scratch/mihrab-repo-new/mihrab-main/client/src/pages/Tafseer.tsx', 'utf8');
const lines = content.split('\n');

console.log('Searching for audio, recId, playVerse in Tafseer.tsx:');
lines.forEach((line, i) => {
    if (line.includes('audioRef') || line.includes('playVerse') || line.includes('audio1') || line.includes('audio2') || line.includes('recId') || line.includes('RECITERS') || line.includes('handleEnded') || line.includes('nextVerse')) {
        console.log(`Line ${i + 1}: ${line.trim()}`);
    }
});
