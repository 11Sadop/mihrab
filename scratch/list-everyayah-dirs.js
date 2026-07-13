async function test() {
    try {
        const res = await fetch("https://everyayah.com/data/");
        const html = await res.text();
        const regex = /href="([^"]+\/)"/g;
        let match;
        const dirs = [];
        while ((match = regex.exec(html)) !== null) {
            const dir = match[1];
            if (dir !== '../' && !dir.startsWith('http')) {
                dirs.push(dir.replace('/', ''));
            }
        }
        console.log("Found directories:", dirs.length);
        console.log(dirs.sort().join("\n"));
    } catch (e) {
        console.error("Failed to fetch index:", e);
    }
}

test();
