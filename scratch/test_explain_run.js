const https = require('https');

const query = 'بني الإسلام على خمس';
const url = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}&t=3`;

console.log('Fetching:', url);

https.get(url, (res) => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const html = json?.ahadith?.result || '';
            console.log('HTML Length:', html.length);
            if (html.includes('sharh')) {
                console.log('Contains "sharh"');
            }
            // print first 1000 characters of html
            console.log('HTML Snippet:', html.substring(0, 1500));
        } catch (e) {
            console.error('Error parsing:', e.message);
            console.log('Response Snippet:', data.substring(0, 500));
        }
    });
}).on('error', e => console.error(e));
