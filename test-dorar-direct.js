import fetch from 'node-fetch';

async function run() {
    const query = 'بني الإسلام على خمس';
    const url = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}`;
    console.log('Fetching directly:', url);
    try {
        const resp = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
            }
        });
        console.log('Status:', resp.status);
        const text = await resp.text();
        console.log('Length:', text.length);
        console.log('Start of body:', text.substring(0, 500));
    } catch (e) {
        console.error('Fetch error:', e);
    }
}
run();
