const https = require('https');

const query = 'بني الاسلام على خمس';
const url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(query);
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url);

console.log('Fetching via proxy:', proxyUrl);

https.get(proxyUrl, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const html = json.ahadith.result;
            console.log('HTML Length:', html.length);
            
            const sharhMatches = html.match(/href="[^"]*sharh[^"]*"/gi);
            console.log('Sharh link matches:', sharhMatches);
            
            const hMatches = html.match(/href="[^"]*\/h\/[^"]*"/gi);
            console.log('h link matches:', hMatches);
            
            const blocks = html.split(/<div class="hadith"/gi);
            if (blocks.length > 1) {
                console.log('--- Sample block ---');
                console.log(blocks[1].substring(0, 1500));
            }
        } catch(e) {
            console.log('Error:', e.message);
            console.log(data.substring(0, 300));
        }
    });
}).on('error', (e) => {
    console.log('HTTP Error:', e.message);
});
