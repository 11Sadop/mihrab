async function test() {
    const queryStr = "من بنى لله مسجدا";
    const apiUrl = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=1`;
    console.log("Fetching url:", apiUrl);
    try {
        const res = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8',
                'Referer': 'https://dorar.net/',
                'Origin': 'https://dorar.net'
            }
        });
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Response text length:", text.length);
        console.log("Response text preview:", text.substring(0, 500));
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
