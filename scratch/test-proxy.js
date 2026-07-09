async function test() {
    const queryStr = "من بنى لله مسجدا";
    const targetUrl = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=1`;
    
    // Test 1: corsproxy.io
    try {
        console.log("Testing corsproxy.io...");
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Length:", text.length);
        console.log("Preview:", text.substring(0, 500));
    } catch (e) {
        console.error("Corsproxy.io failed:", e);
    }
}

test();
