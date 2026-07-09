async function test() {
    const queryStr = "من بنى لله مسجدا";
    const targetUrl = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=1`;
    
    // Test: api.codetabs.com
    try {
        console.log("Testing api.codetabs.com...");
        const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`);
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Response text length:", text.length);
        console.log("Response text preview:", text.substring(0, 500));
    } catch (e) {
        console.error("api.codetabs.com failed:", e);
    }
}

test();
