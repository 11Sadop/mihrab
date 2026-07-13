async function test() {
    // We will query with different filters
    const testCases = [
        // Case 1: Search for "الأعمال بالنيات" with precise match (st=p)
        { name: "Precise match", url: "https://dorar.net/dorar_api.json?skey=%D8%A5%D9%86%D9%85%D8%A7%20%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84%20%D8%A8%D8%A7%D9%84%D9%86%D9%8A%D8%A7%D8%AA&st=p&page=1" },
        // Case 2: Search for "صلاة" filtering only acceptable (d[]=1)
        { name: "Only Sahih/Hasan", url: "https://dorar.net/dorar_api.json?skey=%D8%B5%D9%84%D8%A7%D8%A9&st=w&d[]=1&page=1" },
        // Case 3: Search for "صلاة" filtering only weak/unacceptable (d[]=2)
        { name: "Only Da'if/Weak", url: "https://dorar.net/dorar_api.json?skey=%D8%B5%D9%84%D8%A7%D8%A9&st=w&d[]=2&page=1" }
    ];

    for (const tc of testCases) {
        try {
            const res = await fetch(tc.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            const data = await res.json();
            const hasAhadith = data?.ahadith?.result ? "YES" : "NO";
            console.log(`[${tc.name}] Status: ${res.status}, hasAhadith: ${hasAhadith}`);
        } catch (e) {
            console.log(`[${tc.name}] Failed:`, e.message);
        }
    }
}

test();
