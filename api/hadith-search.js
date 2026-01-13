export default async function handler(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        const { skey, grade } = req.query;
        if (!skey) return res.status(400).json({ error: 'Missing skey' });

        let url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(skey);
        if (grade === 'sahih') url += '&d[]=1';

        const response = await fetch(url);
        if (!response.ok) throw new Error('Dorar API Error');
        
        const data = await response.json();
        const html = data && data.ahadith && data.ahadith.result;
        
        if (!html) return res.status(200).json({ results: [] });

        const clean = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
        const results = [];
        
        // V5: Use simple reliable splitting on the info div primarily
        const blocks = html.split('<div class="hadith"');
        
        for (const block of blocks) {
             if (results.length >= 20) break;
             if (!block.trim()) continue;

             const fullBlock = '<div class="hadith"' + block;
             
             // Extract Text
             const textPart = fullBlock.split('<div class="hadith-info">')[0];
             let text = clean(textPart);
             text = text.replace(/^\d+\s*-\s*/, '');
             
             // Extract Info Block
             const infoPart = fullBlock.split('<div class="hadith-info">')[1];
             if (!infoPart) continue;

             // Extract Fields using simple string searches, avoiding complex Regex that might fail
             const getVal = (key) => {
                 // Keys as unicode
                 // الراوي = &#1575;&#1604;&#1585;&#1575;&#1608;&#1610;
                 // But in the HTML it's likely just text.
                 // We will search for the span class="info-subtitle"
                 
                 // e.g. <span class="info-subtitle">الراوي:</span> ...
                 const idx = infoPart.indexOf(key);
                 if (idx === -1) return '\u063a\u064a\u0631 \u0645\u062d\u062f\u062f'; // unspecified
                 
                 let sub = infoPart.substring(idx + key.length);
                 // remove the colon and span close
                 sub = sub.replace(/^:?\s*<\/span>/, '');
                 
                 // Value ends at next <span class="info-subtitle" or <br> or </div>
                 const endIdx = sub.search(/<span class="info-subtitle"|<br|<\/div>/);
                 if (endIdx !== -1) sub = sub.substring(0, endIdx);
                 
                 return clean(sub);
             };
             
             // UNICODE STRINGS FOR SEARCHING:
             // \u0627\u0644\u0631\u0627\u0648\u064a = The Narrator
             // \u0627\u0644\u0645\u0635\u062f\u0631 = The Source
             // \u062e\u0644\u0627\u0635\u0629 \u062d\u0643\u0645 \u0627\u0644\u0645\u062d\u062f\u062b = The Grade
             
             const narrator = getVal('\u0627\u0644\u0631\u0627\u0648\u064a');
             const source = getVal('\u0627\u0644\u0645\u0635\u062f\u0631');
             const grade = getVal('\u062e\u0644\u0627ص\u0629 \u062d\u0643\u0645 \u0627\u0644\u0645\u062d\u062f\u062b');

             if (text.length > 5) {
                 results.push({ text, grade, source, narrator });
             }
        }
        
        return res.status(200).json({ results });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
