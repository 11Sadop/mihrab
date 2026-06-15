const https = require('https');

const query = 'بني الاسلام على خمس';
// Search specifically in explanations using t=3
const url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(query) + '&t=3';
const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);

console.log('Fetching Sharh via proxy:', proxyUrl);

https.get(proxyUrl, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const wrapper = JSON.parse(data);
            const json = JSON.parse(wrapper.contents);
            const html = json.ahadith.result;
            console.log('HTML Length:', html.length);
            
            // Print first 2000 chars of HTML to inspect structure
            console.log('--- Sample HTML ---');
            console.log(html.substring(0, 3000));
        } catch(e) {
            console.log('Error:', e.message);
            console.log(data.substring(0, 500));
        }
    });
}).on('error', (e) => {
    console.log('HTTP Error:', e.message);
});
