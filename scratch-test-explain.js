const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Failed to parse JSON: ${e.message}. Data snippet: ${data.substring(0, 200)}`));
                }
            });
        }).on('error', reject);
    });
}

async function run() {
    const query = 'بني الإسلام على خمس';
    
    // Test 1: standard search
    console.log('--- Test 1: Standard API Search ---');
    try {
        const url1 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}`;
        const json1 = await fetchUrl(url1);
        const html = json1?.ahadith?.result || '';
        console.log('HTML Length:', html.length);
        console.log('Contains "sharh" link:', html.includes('sharh'));
        console.log('Contains "الشرح:" or similar:', html.includes('الشرح'));
        
        // Find a sharh link inside the HTML
        const matches = html.match(/href="([^"]*sharh[^"]*)"/i) || html.match(/href="([^"]*\/h\/[^"]*)"/i);
        if (matches) {
            console.log('Found link in result:', matches[1]);
        }
    } catch (e) {
        console.error('Test 1 error:', e.message);
    }
    
    // Test 2: search with t=3
    console.log('\n--- Test 2: API Search with t=3 ---');
    try {
        const url2 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}&t=3`;
        const json2 = await fetchUrl(url2);
        const html2 = json2?.ahadith?.result || '';
        console.log('HTML Length with t=3:', html2.length);
        console.log('Contains "sharh" class/id:', html2.includes('sharh') || html2.includes('الشرح'));
        if (html2.length > 0) {
            console.log('First 500 characters of t=3 results:');
            console.log(html2.substring(0, 500));
        }
    } catch (e) {
        console.error('Test 2 error:', e.message);
    }
}

run();
