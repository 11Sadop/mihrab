// Standalone hadith search API - no TypeScript to avoid compilation issues
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const skey = req.query.skey;
        const grade = req.query.grade;

        if (!skey) {
            return res.status(400).json({ error: 'Missing skey parameter' });
        }

        let url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(skey);
        if (grade === 'sahih') url += '&d[]=1';

        console.log('[Hadith Search] Fetching:', url);

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json; charset=utf-8',
                'Accept-Charset': 'utf-8',
                'Accept-Language': 'ar,en'
            }
        });

        if (!response.ok) {
            throw new Error('Dorar API returned ' + response.status);
        }

        const textResponse = await response.text();
        let data;
        try {
            data = JSON.parse(textResponse);
        } catch (e) {
            return res.status(500).json({ error: 'Failed to parse Dorar response' });
        }

        const html = data?.ahadith?.result;

        if (!html) {
            return res.status(200).json({ results: [], message: 'لم يتم العثور على نتائج' });
        }

        const clean = (s) => {
            if (!s) return '';
            return s
                .replace(/<[^>]+>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/\\n/g, ' ')
                .replace(/\\s+/g, ' ')
                .trim();
        };

        const results = [];
        const blocks = html.split(/<div class="hadith"[^>]*>/i);

        console.log('[Hadith Search] Found', blocks.length - 1, 'hadith blocks');

        for (let i = 1; i < blocks.length && results.length < 15; i++) {
            const block = blocks[i];
            if (!block || block.length < 50) continue;

            try {
                const infoSplit = block.split(/<div class="hadith-info"[^>]*>/i);
                let text = clean(infoSplit[0]).replace(/^\d+\s*[-–]\s*/, '');

                if (!text || text.length < 10) continue;

                const infoSection = infoSplit.length > 1 ? infoSplit[1] : block;

                const extractField = (fieldName) => {
                    const patterns = [
                        new RegExp(fieldName + '[:\\s]*</span>\\s*([^<]+)', 'i'),
                        new RegExp(fieldName + '[:\\s]+([^<\\n،]+)', 'i'),
                        new RegExp('>' + fieldName + '[:\\s]*([^<]+)<', 'i'),
                        new RegExp('info-subtitle[^>]*>' + fieldName + '[^<]*</span>\\s*([^<]+)', 'i'),
                        new RegExp(fieldName + '</span>([^<]+)', 'i'),
                    ];
                    for (const pattern of patterns) {
                        const match = infoSection.match(pattern);
                        if (match && match[1] && match[1].trim().length > 0) {
                            return clean(match[1]);
                        }
                    }
                    return '';
                };

                // Extract grade with multiple strategies
                let extractedGrade = '';

                // Strategy 1: Look for خلاصة حكم المحدث pattern
                const gradePatterns = [
                    /خلاصة حكم المحدث[^<]*<\/span>\s*<span[^>]*>([^<]+)<\/span>/i,
                    /خلاصة حكم المحدث[:\s]*<\/span>\s*([^<]+)</i,
                    /حكم المحدث[^<]*<\/span>\s*<span[^>]*>([^<]+)<\/span>/i,
                    /الحكم[^<]*<\/span>\s*<span[^>]*>([^<]+)<\/span>/i,
                ];

                for (const pattern of gradePatterns) {
                    const match = block.match(pattern);
                    if (match && match[1] && match[1].trim()) {
                        extractedGrade = clean(match[1]);
                        break;
                    }
                }

                // Strategy 2: Look for common grade words in the entire block
                if (!extractedGrade) {
                    const gradeWords = [
                        'إسناده صحيح على شرط',
                        'إسناده صحيح',
                        'إسناده ضعيف',
                        'صحيح على شرط',
                        'حسن صحيح',
                        'رجاله ثقات',
                        'متفق عليه',
                        'صحيح لغيره',
                        'حسن لغيره',
                        'ضعيف جداً',
                        'ضعيف جدا',
                        'لا أصل له',
                        'لا يصح',
                        'موضوع',
                        'منكر',
                        'صحيح',
                        'حسن',
                        'ضعيف',
                        'ثابت',
                    ];

                    for (const word of gradeWords) {
                        if (block.includes(word)) {
                            extractedGrade = word;
                            break;
                        }
                    }
                }

                results.push({
                    text: text.substring(0, 500),
                    narrator: extractField('الراوي') || 'غير محدد',
                    source: extractField('المصدر') || 'غير محدد',
                    scholar: extractField('المحدث') || '',
                    grade: extractedGrade || 'غير محدد'
                });

            } catch (parseError) {
                console.error('[Hadith Search] Error parsing block:', parseError.message);
                continue;
            }
        }

        console.log('[Hadith Search] Returning', results.length, 'results');

        // Source priority for sorting - lower number = higher priority
        const getSourcePriority = (source) => {
            const s = source.toLowerCase();
            if (s.includes('البخاري') || s.includes('bukhari')) return 1;
            if (s.includes('مسلم') || s.includes('muslim')) return 2;
            if (s.includes('أبي داود') || s.includes('أبو داود')) return 3;
            if (s.includes('الترمذي')) return 4;
            if (s.includes('النسائي')) return 5;
            if (s.includes('ابن ماجه') || s.includes('ابن ماجة')) return 6;
            if (s.includes('صحيح')) return 7;
            if (s.includes('الألباني')) return 8;
            return 10; // Other sources
        };

        // Sort results by source priority
        results.sort((a, b) => {
            const priorityA = getSourcePriority(a.source);
            const priorityB = getSourcePriority(b.source);
            return priorityA - priorityB;
        });

        // Take sample from first block info section for debugging
        const firstBlock = blocks[1] || '';
        const infoStart = firstBlock.indexOf('hadith-info');
        const sampleInfo = infoStart > -1 ? firstBlock.substring(infoStart, infoStart + 800) : firstBlock.substring(0, 800);

        return res.status(200).json({
            results,
            total: results.length,
            debug: {
                blocksFound: blocks.length - 1,
                htmlLength: html.length,
                sampleInfo: sampleInfo
            }
        });

    } catch (e) {
        console.error('[Hadith Search] Error:', e.message);
        return res.status(500).json({ error: 'حدث خطأ أثناء البحث', details: e.message });
    }
}
