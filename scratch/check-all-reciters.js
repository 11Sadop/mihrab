async function checkUrl(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.status === 200;
    } catch {
        return false;
    }
}

async function test() {
    const recitersFromTafseer = [
        {id:"maher",name:"ماهر المعيقلي",server:"https://server12.mp3quran.net/maher",ev:"MaherAlMuaiqly128kbps"},
        {id:"afasy",name:"مشاري العفاسي",server:"https://server8.mp3quran.net/afs",ev:"Alafasy_128kbps"},
        {id:"sudais",name:"عبدالرحمن السديس",server:"https://server11.mp3quran.net/sds",ev:"Abdurrahmaan_As-Sudais_192kbps"},
        {id:"hosary",name:"محمود خليل الحصري",server:"https://server13.mp3quran.net/husr",ev:"Husary_128kbps"},
        {id:"minshawi",name:"محمد صديق المنشاوي",server:"https://server10.mp3quran.net/minsh",ev:"Minshawy_Mujawwad_128kbps"},
        {id:"basit",name:"عبدالباسط عبدالصمد",server:"https://server7.mp3quran.net/basit",ev:"AbdulBasit_Mujawwad_128kbps"},
        {id:"ghamdi",name:"سعد الغامدي",server:"https://server7.mp3quran.net/s_gmd",ev:"Sa_d_al-Ghaamidi_128kbps"},
        {id:"ajamy",name:"أحمد العجمي",server:"https://server10.mp3quran.net/ajm",ev:"Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net"},
        {id:"luhaidan",name:"محمد اللحيدان",server:"https://server15.mp3quran.net/lhdan",ev:"Muhammad_Al-Luhaidan_128kbps"},
        {id:"dosari",name:"ياسر الدوسري",server:"https://server10.mp3quran.net/ibrahim_dosri",ev:"Yasser_Ad-Dussary_128kbps"},
    ];

    const recitersFromSettings = [
        {id:"afasy",   name:"مشاري العفاسي",      server:"https://server8.mp3quran.net/afs",             ev:"Alafasy_128kbps"},
        {id:"maher",   name:"ماهر المعيقلي",      server:"https://server12.mp3quran.net/maher",          ev:"Maher_AlMuaiqly_128kbps"},
        {id:"sudais",  name:"عبدالرحمن السديس",   server:"https://server11.mp3quran.net/sds",            ev:"AbdurRahmaanAs-Sudais_192kbps"},
        {id:"hosary",  name:"محمود خليل الحصري", server:"https://server13.mp3quran.net/husr",           ev:"Husary_128kbps"},
        {id:"minshawi",name:"محمد صديق المنشاوي",server:"https://server10.mp3quran.net/minsh",          ev:"Minshawy_Murattal_128kbps"},
        {id:"basit",   name:"عبدالباسط عبدالصمد",server:"https://server7.mp3quran.net/basit",           ev:"Abdul_Basit_Murattal_192kbps"},
        {id:"dosari",  name:"ياسر الدوسري",       server:"https://server11.mp3quran.net/yasser",         ev:"Yasser_Ad-Dussary_128kbps"},
        {id:"ghamdi",  name:"سعد الغامدي",        server:"https://server7.mp3quran.net/s_gmd",          ev:"Sa_d_al-Ghaamidi_128kbps"},
        {id:"shuraym", name:"سعود الشريم",        server:"https://server7.mp3quran.net/shur",           ev:"Sa_ood_ash-Shuraym_128kbps"},
        {id:"ajamy",   name:"أحمد العجمي",        server:"https://server10.mp3quran.net/ajm",           ev:"Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net"},
        {id:"ayyoub",  name:"محمد أيوب",          server:"https://server8.mp3quran.net/ayyub",          ev:"Muhammad_Ayyoub_128kbps"},
        {id:"juhany",  name:"عبدالله الجهني",     server:"https://server11.mp3quran.net/jhn",           ev:"Abdullah_Juhany_128kbps"},
        {id:"tablawi", name:"محمد الطبلاوي",      server:"https://server6.mp3quran.net/tablawi",        ev:"Mohammad_al_Tablaway_128kbps"},
    ];

    console.log("--- Checking Tafseer Reciters ---");
    for (const r of recitersFromTafseer) {
        if (r.ev) {
            const url = `https://everyayah.com/data/${r.ev}/001001.mp3`;
            const ok = await checkUrl(url);
            console.log(`Tafseer [${r.id}] ${r.name} (${r.ev}) -> ${ok ? "OK" : "FAILED"}`);
        }
    }

    console.log("\n--- Checking Settings Reciters ---");
    for (const r of recitersFromSettings) {
        if (r.ev) {
            const url = `https://everyayah.com/data/${r.ev}/001001.mp3`;
            const ok = await checkUrl(url);
            console.log(`Settings [${r.id}] ${r.name} (${r.ev}) -> ${ok ? "OK" : "FAILED"}`);
        }
    }
}

test();
