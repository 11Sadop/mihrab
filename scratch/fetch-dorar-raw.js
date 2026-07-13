async function test() {
    const url = "https://dorar.net/hadith/search?q=%D9%85%D8%B3%D8%AC%D8%AF&st=a&xclude=0";
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Length:", text.length);
        const fs = require('fs');
        fs.writeFileSync('scratch/dorar-raw.html', text);
        console.log("Saved to scratch/dorar-raw.html");
    } catch (e) {
        console.error("Failed:", e);
    }
}

test();
