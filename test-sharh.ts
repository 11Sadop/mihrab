import fetch from 'node-fetch';

async function run() {
    // A sample Hadith explanation URL on Dorar.net
    const url = 'https://dorar.net/hadith/sharh/34850';
    // Let's use the proxy api.allorigins.win
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    console.log('Fetching via proxy:', proxyUrl);

    try {
        const resp = await fetch(proxyUrl);
        if (!resp.ok) {
            console.log('Proxy error:', resp.status);
            return;
        }
        const data: any = await resp.json();
        const html = data.contents || '';
        console.log('HTML Length:', html.length);
        
        // Save the first 10000 characters to a debug file to inspect the structure
        console.log('Does it contain "الشرح" (explanation)?', html.includes('الشرح'));
        console.log('Does it contain class="explanation" or similar?', html.includes('class="explanation"') || html.includes('class="sharh"'));
        
        // Find tags containing explanation text
        const matches = html.match(/<div[^>]*class="[^"]*explanation[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                        html.match(/<div[^>]*class="[^"]*sharh[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                        html.match(/<div[^>]*class="[^"]*hadith-explanation[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
                        
        if (matches) {
            console.log('Found explanation container! Length:', matches[0].length);
            console.log('First 500 chars of container:', matches[0].substring(0, 500));
        } else {
            console.log('Explanation container NOT found via standard regex.');
            // Let's find some elements that might contain it
            const divClasses = html.match(/class="([^"]*)"/g);
            console.log('Sample classes found in HTML:', divClasses ? divClasses.slice(0, 30) : 'none');
        }
    } catch (e: any) {
        console.error('Error:', e.message);
    }
}

run();
