const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*'
};

async function fetchViaProxy(targetUrl) {
    const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(targetUrl);
    const resp = await fetch(proxyUrl);
    if (!resp.ok) {
        throw new Error(`Proxy error: ${resp.status}`);
    }
    return resp.json();
}

async function run() {
    const query = 'بني الإسلام على خمس';
    
    // Test 1: standard search
    console.log('--- Test 1: Standard API Search ---');
    try {
        const url1 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}`;
        const json1 = await fetchViaProxy(url1);
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
        const json2 = await fetchViaProxy(url2);
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
