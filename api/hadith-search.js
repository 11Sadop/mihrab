// Standalone hadith search API - live proxy to الموسوعة الحديثية - الدرر السنية (dorar.net).
// Dorar's actual response wraps each hadith as:
//   <div class="hadith" ...>N -  <span class="search-keys">word</span> ... text .</div>
//   <div class="hadith-info">
//     <span class="info-subtitle">الراوي:</span> NAME</span>
//     <span class="info-subtitle">المحدث:</span> NAME
//     <span class="info-subtitle">المصدر:</span> SOURCE
//     <span class="info-subtitle">الصفحة أو الرقم:</span> PAGE
//     <span class="info-subtitle">خلاصة حكم المحدث:</span>  <span >GRADE TEXT</span>
//   </div>
// Earlier versions of this endpoint guessed at different class names
// (e.g. "hadith-text", "primary-text-color") that don't actually appear in
// Dorar's markup, so results were frequently empty or 'غير محدد'. This
// version matches the verified real structure directly.

function decodeEntities(text) {
        return text
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
}

function stripTags(html) {
        return decodeEntities(html.replace(/<[^>]+>/g, ' '))
            .replace(/\s+/g, ' ')
            .trim();
}

function extractField(block, label) {
        const re = new RegExp(
                    '<span[^>]*class="info-subtitle"[^>]*>\\s*' + label + '\\s*:?\\s*<\\/span>([\\s\\S]*?)(?=<span[^>]*class="info-subtitle"|$)',
                    'i'
                );
        const match = block.match(re);
        if (!match) return '';
        return stripTags(match[1]).replace(/^:\s*/, '').trim();
}

export default async function handler(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    if (req.method === 'OPTIONS') {
                return res.status(200).end();
    }

    try {
                const skey = req.query.skey;
                const grade = req.query.grade;

            if (!skey) {
                            return res.status(400).json({ error: 'Missing skey parameter' });
            }

            const url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(skey);

            const response = await fetch(url, {
                            headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                                                'Accept': 'application/json, text/plain, */*',
                                                'Accept-Charset': 'utf-8',
                                                'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8', 'Referer': 'https://dorar.net/', 'Origin': 'https://dorar.net'
                            }
            });

            if (!response.ok) {
                            throw new Error('Dorar API returned ' + response.status);
            }

            const data = await response.json();
                const html = data && data.ahadith && data.ahadith.result;

            if (!html) {
                            return res.status(200).json({ results: [], total: 0, message: 'لم يتم العثور على نتائج' });
            }

            let results = [];
                const blockRe = /<div class="hadith"[^>]*>([\s\S]*?)<\/div>\s*<div class="hadith-info">([\s\S]*?)<\/div>/gi;
                let match;
                while ((match = blockRe.exec(html)) !== null && results.length < 15) {
                                const hadithBlock = match[1];
                                const infoBlock = match[2];

                    let text = stripTags(hadithBlock).replace(/^\d+\s*-\s*/, '').trim();
                                text = text.replace(/\s*\.\s*$/, '.').trim();
                                if (!text || text.length < 5) continue;

                    const narrator = extractField(infoBlock, 'الراوي');
                                const scholar = extractField(infoBlock, 'المحدث');
                                const source = extractField(infoBlock, 'المصدر');
                                const gradeText = extractField(infoBlock, 'خلاصة حكم المحدث');

                    results.push({
                                        text: text.substring(0, 500),
                                        narrator: narrator || 'غير محدد',
                                        source: source || 'غير محدد',
                                        scholar: scholar || '',
                                        grade: gradeText || 'غير محدد'
                    });
                }

            // Optional grade filter (Dorar's own API does not support this server-side)
            if (grade === 'sahih') {
                            results = results.filter((r) => /صحيح|حسن|ثبت/.test(r.grade));
            }

            // Sort by source priority (well-known books first)
            const getSourcePriority = (source) => {
                            const s = (source || '').toLowerCase();
                            if (s.includes('البخاري')) return 1;
                            if (s.includes('مسلم')) return 2;
                            if (s.includes('أبي داود') || s.includes('أبو داود')) return 3;
                            if (s.includes('الترمذي')) return 4;
                            if (s.includes('النسائي')) return 5;
                            if (s.includes('ابن ماجه') || s.includes('ابن ماجة')) return 6;
                            return 10;
            };
                results.sort((a, b) => getSourcePriority(a.source) - getSourcePriority(b.source));

            return res.status(200).json({
                            results,
                            total: results.length,
                            source: 'dorar.net',
                            sourceLabel: 'الموسوعة الحديثية - الدرر السنية'
            });

    } catch (e) {
                console.error('[Hadith Search] Error:', e.message);
                return res.status(500).json({ error: 'حدث خطأ أثناء البحث', details: e.message });
    }
}
