export default async function handler(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json; charset=utf-8');

        const { skey } = req.query;
        if (!skey) {
            return res.status(400).json({ error: 'Missing skey' });
        }

        const url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(skey);

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const data = await response.json();
        const html = data?.ahadith?.result || '';

        // Take a sample block
        const blocks = html.split(/<div class="hadith"/i);
        let sampleBlock = '';
        let infoSample = '';

        if (blocks.length > 1) {
            sampleBlock = blocks[1].substring(0, 2000);

            // Find the info section
            const infoStart = sampleBlock.indexOf('hadith-info');
            if (infoStart > -1) {
                infoSample = sampleBlock.substring(infoStart, infoStart + 1500);
            }
        }

        // Look for grade pattern
        const gradeRegex = /خلاصة حكم المحدث/i;
        const hasGradeField = gradeRegex.test(html);

        // Try to extract a grade
        const gradeExtract = html.match(/خلاصة حكم المحدث[^<]*<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);

        return res.status(200).json({
            htmlLength: html.length,
            blocksFound: blocks.length - 1,
            hasGradeField,
            gradeExtractResult: gradeExtract ? gradeExtract[1] : null,
            sampleInfoSection: infoSample,
            rawSample: sampleBlock.substring(0, 800)
        });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
