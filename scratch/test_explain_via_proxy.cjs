const https = require('https');

async function fetchViaProxy(targetUrl) {
    const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(targetUrl);
    return new Promise((resolve, reject) => {
        https.get(proxyUrl, (res) => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Failed to parse: ${e.message}. Snippet: ${data.substring(0, 300)}`));
                }
            });
        }).on('error', reject);
    });
}

async function run() {
    const query = 'بني الإسلام على خمس';
    const url = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}&t=3`;
    
    console.log('Fetching via proxy:', url);
    try {
        const json = await fetchViaProxy(url);
        const html = json?.ahadith?.result || '';
        console.log('HTML Length:', html.length);
        if (html.length > 0) {
            console.log('HTML Snippet:');
            console.log(html.substring(0, 1500));
        } else {
            console.log('No HTML result in response:', JSON.stringify(json));
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

run();
