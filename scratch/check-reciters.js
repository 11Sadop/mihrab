async function checkUrl(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.status === 200;
    } catch {
        return false;
    }
}

async function test() {
    const list = [
        "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/001001.mp3",
        "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/001002.mp3",
        "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/001003.mp3",
        "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/002001.mp3",
        "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/002002.mp3",
        // Test different names for Maher
        "https://everyayah.com/data/MaherAlMuaiqly128kbps/001001.mp3",
        "https://everyayah.com/data/Maher_AlMuaiqly_128kbps/001001.mp3",
        "https://everyayah.com/data/Maher_AlMuaiqly_128kbps_ketaballah.net/001001.mp3",
        // Test different names for Sudais
        "https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/001001.mp3",
        "https://everyayah.com/data/AbdurRahmaanAs-Sudais_192kbps/001001.mp3",
        // Test Ibrahim Dosari
        "https://everyayah.com/data/Ibrahim_Dosri_128kbps/001001.mp3"
    ];

    for (const url of list) {
        const ok = await checkUrl(url);
        console.log(`${url} -> ${ok ? "200 OK" : "FAILED"}`);
    }
}

test();
