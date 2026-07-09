async function test() {
    const queryStr = "من بنى لله مسجدا";
    const targetUrl = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=1`;
    
    // Test: api.allorigins.win
    try {
        console.log("Testing api.allorigins.win...");
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Data keys:", Object.keys(data));
        const contents = data.contents;
        console.log("Contents length:", contents ? contents.length : 0);
        console.log("Contents preview:", contents ? contents.substring(0, 300) : "none");
    } catch (e) {
        console.error("api.allorigins.win failed:", e);
    }
}

test();
