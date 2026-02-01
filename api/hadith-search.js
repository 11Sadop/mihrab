export default async function handler(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        const { skey, grade } = req.query;
        if (!skey) return res.status(400).json({ error: 'Missing skey parameter' });

        // Build Dorar API URL
        let url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(skey);
        if (grade === 'sahih') url += '&d[]=1';

        console.log('[Hadith Search] Fetching:', url);

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            console.error('[Hadith Search] Dorar API returned:', response.status);
            throw new Error('Dorar API returned status ' + response.status);
        }

        const data = await response.json();
        console.log('[Hadith Search] Got response, ahadith exists:', !!data.ahadith);

        const html = data?.ahadith?.result;

        if (!html) {
            console.log('[Hadith Search] No HTML content in response');
            return res.status(200).json({ results: [], message: 'لم يتم العثور على نتائج' });
        }

        console.log('[Hadith Search] HTML length:', html.length);

        // Helper function to clean HTML tags
        const clean = (s) => {
            if (!s) return '';
            return s
                .replace(/<[^>]+>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/\\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        };

        const results = [];

        // Split by hadith blocks - try multiple patterns
        let blocks = html.split(/<div class="hadith"[^>]*>/i);

        console.log('[Hadith Search] Found', blocks.length - 1, 'hadith blocks');

        for (let i = 1; i < blocks.length && results.length < 15; i++) {
            const block = blocks[i];
            if (!block || block.length < 50) continue;

            try {
                // Extract hadith text (before hadith-info div)
                let text = '';
                const infoSplit = block.split(/<div class="hadith-info"[^>]*>/i);
                if (infoSplit.length >= 1) {
                    text = clean(infoSplit[0]);
                    // Remove leading number like "1 - "
                    text = text.replace(/^\d+\s*[-–]\s*/, '');
                }

                if (!text || text.length < 10) continue;

                // Extract info fields from the info section
                const infoSection = infoSplit.length > 1 ? infoSplit[1] : block;

                // Helper to extract field value
                const extractField = (fieldName) => {
                    const patterns = [
                        new RegExp(fieldName + '[:\\s]*</span>\\s*([^<]+)', 'i'),
                        new RegExp(fieldName + '[:\\s]+([^<\\n]+)', 'i'),
                        new RegExp('>' + fieldName + '[:\\s]*([^<]+)<', 'i')
                    ];

                    for (const pattern of patterns) {
                        const match = infoSection.match(pattern);
                        if (match && match[1]) {
                            return clean(match[1]);
                        }
                    }
                    return '';
                };

                const narrator = extractField('الراوي') || 'غير محدد';
                const source = extractField('المصدر') || 'غير محدد';
                const scholar = extractField('المحدث') || '';

                // Grade can be in different formats
                let hadithGrade = extractField('خلاصة حكم المحدث')
                    || extractField('الحكم')
                    || extractField('الدرجة')
                    || 'غير محدد';

                results.push({
                    text: text.substring(0, 500), // Limit text length
                    narrator,
                    source,
                    scholar,
                    grade: hadithGrade
                });

            } catch (parseError) {
                console.error('[Hadith Search] Error parsing block:', parseError.message);
                continue;
            }
        }

        console.log('[Hadith Search] Returning', results.length, 'results');

        return res.status(200).json({
            results,
            total: results.length,
            debug: {
                blocksFound: blocks.length - 1,
                htmlLength: html.length
            }
        });

    } catch (e) {
        console.error('[Hadith Search] Error:', e.message);
        return res.status(500).json({
            error: 'حدث خطأ أثناء البحث',
            details: e.message
        });
    }
}
