const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            // handle redirect
            if (res.statusCode === 301 || res.statusCode === 302) {
                console.log('Redirecting to:', res.headers.location);
                return fetchUrl(res.headers.location).then(resolve).catch(reject);
            }
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', reject);
    });
}

async function run() {
    const query = 'بني الإسلام على خمس';
    // Let's use codetabs with correct redirect handling if needed, or let's use another proxy like allorigins!
    // allorigins URL: https://api.allorigins.win/get?url=...
    const targetUrl = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}&t=3`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    
    console.log('Fetching via AllOrigins:', proxyUrl);
    try {
        const respText = await fetchUrl(proxyUrl);
        const dataObj = JSON.parse(respText);
        const contents = JSON.parse(dataObj.contents);
        const html = contents?.ahadith?.result || '';
        console.log('HTML Length:', html.length);
        
        // Let's find any links to sharh
        const sharhMatch = html.match(/href="([^"]*sharh[^"]*)"/i) || html.match(/href="([^"]*\/h\/[^"]*)"/i);
        if (sharhMatch) {
            console.log('Found sharh link:', sharhMatch[1]);
            const link = sharhMatch[1].startsWith('http') ? sharhMatch[1] : `https://dorar.net${sharhMatch[1]}`;
            // Now let's fetch this link via proxy!
            const proxyLinkUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(link)}`;
            console.log('Fetching explanation page:', proxyLinkUrl);
            const pageRespText = await fetchUrl(proxyLinkUrl);
            const pageDataObj = JSON.parse(pageRespText);
            const pageHtml = pageDataObj.contents || '';
            console.log('Page HTML Length:', pageHtml.length);
            
            // Extract the explanation block: <div class="sharh">...</div> or similar
            const explainBlock = pageHtml.match(/<div[^>]*class="[^"]*sharh[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
                || pageHtml.match(/<div[^>]*id="[^"]*sharh[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
            
            if (explainBlock) {
                console.log('Found Explanation Block!');
                // Strip HTML tags to see the text
                const text = explainBlock[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
                console.log('Explanation Snippet:', text.substring(0, 500));
            } else {
                console.log('Could not find explanation block in page HTML. Snippet:', pageHtml.substring(0, 1000));
            }
        } else {
            console.log('No sharh link found. HTML snippet:', html.substring(0, 500));
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

run();
