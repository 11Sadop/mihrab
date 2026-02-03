// Debug endpoint to test raw Dorar API response
export default async function handler(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const skey = req.query.skey || 'إنما الأعمال';
        const url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(skey);

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const text = await response.text();

        // Return debug info
        return res.status(200).json({
            status: response.status,
            statusText: response.statusText,
            url: url,
            responseLength: text.length,
            // First 3000 chars to see the structure
            sample: text.substring(0, 3000),
            // Try to parse as JSON
            parsed: (() => {
                try {
                    const data = JSON.parse(text);
                    return {
                        keys: Object.keys(data),
                        ahadithExists: !!data.ahadith,
                        ahadithKeys: data.ahadith ? Object.keys(data.ahadith) : [],
                        resultLength: data.ahadith?.result?.length || 0,
                        resultSample: data.ahadith?.result?.substring(0, 1500) || 'NO RESULT'
                    };
                } catch (e) {
                    return { parseError: e.message };
                }
            })()
        });

    } catch (e) {
        return res.status(500).json({
            error: e.message,
            stack: e.stack
        });
    }
}
