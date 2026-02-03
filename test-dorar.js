// Test script to debug Dorar API
async function test() {
    const skey = 'إنما الأعمال';
    const url = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(skey);

    console.log('Fetching:', url);

    const response = await fetch(url);
    const data = await response.json();

    console.log('\n=== RAW RESPONSE STRUCTURE ===');
    console.log('Keys:', Object.keys(data));

    if (data.ahadith) {
        console.log('\nahadith keys:', Object.keys(data.ahadith));
        console.log('ahadith.result length:', data.ahadith.result?.length);
        console.log('\n=== FIRST 2000 CHARS OF HTML ===');
        console.log(data.ahadith.result?.substring(0, 2000));
    }
}

test().catch(console.error);
