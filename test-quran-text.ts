import fetch from 'node-fetch';

async function run() {
    const url = 'https://api.alquran.cloud/v1/page/1/quran-uthmani';
    console.log('Fetching page 1 from Quran API...');
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            console.log('API error:', resp.status);
            return;
        }
        const data: any = await resp.json();
        const ayahs = data.data.ayahs;
        
        console.log('Page 1 Ayahs:');
        for (const a of ayahs) {
            console.log(`Ayah ${a.numberInSurah}:`, JSON.stringify(a.text));
        }
    } catch (e: any) {
        console.error('Error:', e.message);
    }
}

run();
