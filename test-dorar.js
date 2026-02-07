// test-dorar.js - Local test to debug grade extraction
const https = require('https');

const skey = 'صحيح';
const url = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(skey)}`;

console.log('Fetching:', url);

https.get(url, (res) => {
    let data = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const html = json?.ahadith?.result || '';

            console.log('\n=== HTML Length:', html.length, '===\n');

            // Split into blocks
            const blocks = html.split(/<div class="hadith"/i);
            console.log('Found', blocks.length - 1, 'blocks\n');

            // Analyze first 3 blocks
            for (let i = 1; i <= 3 && i < blocks.length; i++) {
                const block = blocks[i];
                console.log(`\n=== BLOCK ${i} ===`);

                // Find info section
                const infoMatch = block.match(/<div class="hadith-info"[^>]*>([\s\S]*?)(<\/div>|$)/i);
                if (infoMatch) {
                    console.log('\n--- Info Section ---');
                    console.log(infoMatch[1].substring(0, 1000));
                }

                // Check for grade field
                const gradeField = block.match(/خلاصة حكم المحدث/i);
                console.log('\nHas "خلاصة حكم المحدث":', !!gradeField);

                // Check for grade words
                const gradeWords = ['صحيح', 'ضعيف', 'حسن', 'موضوع'];
                for (const word of gradeWords) {
                    if (block.includes(word)) {
                        console.log(`Found grade word "${word}" in block`);
                    }
                }

                // Try extraction pattern
                const gradeExtract = block.match(/خلاصة حكم المحدث[^<]*<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
                if (gradeExtract) {
                    console.log('Extracted grade:', gradeExtract[1]);
                } else {
                    console.log('Grade extraction pattern failed');
                }
            }

        } catch (e) {
            console.error('Parse error:', e.message);
        }
    });
}).on('error', (e) => {
    console.error('Request error:', e.message);
});
