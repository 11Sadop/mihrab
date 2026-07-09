import { db } from '../server/db';
import { bukhariHadiths, muslimHadiths, verificationHadiths } from '../shared/schema';
import { sql, and, ilike } from 'drizzle-orm';

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
};

const pgNormalizeText = (col: any) => {
    return sql`translate(
        regexp_replace(${col}, '[ًٌٍَُِّْٰـ]', '', 'g'),
        'أإآءٱةى',
        'aaaaاهي'
    )`;
};

const normalizeAr = (s: string) => s.replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآءٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+/g, ' ').trim();

const decodeGarbledText = (text: string): string => {
    if (!text) return "";
    if (text.includes("Ø§Ù„") || text.includes("Ø") || text.includes("Ù") || text.includes("æ")) {
        try {
            return Buffer.from(text, 'binary').toString('utf8');
        } catch {
            return text;
        }
    }
    return text;
};

const getFallbackQuery = (text: string): string => {
    const ARABIC_STOP_WORDS = new Set([
        "من", "عن", "ان", "في", "على", "لا", "ما", "الى", "ثم", "انه", "كان", 
        "قال", "الله", "رسول", "صلي", "عليه", "وسلم", "يا", "ايها", "قد", "لقد",
        "انما", "اما", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
    ]);
    const words = text.split(/\s+/).filter(w => w.length >= 2 && !ARABIC_STOP_WORDS.has(w));
    if (words.length <= 4) return words.join(" ");
    return words.slice(0, 4).join(" ");
};

const executeDorarSearch = async (queryStr: string): Promise<any[]> => {
    let list: any[] = [];
    try {
        const controller1 = new AbortController();
        const t1 = setTimeout(() => controller1.abort(), 5000);
        const apiUrl1 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=1`;
        const apiUrl2 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=2`;
        
        const [r1, r2] = await Promise.all([
            fetch(apiUrl1, { signal: controller1.signal, headers: { ...HEADERS, 'Accept': 'application/json, text/plain, */*' } }).catch(() => null),
            fetch(apiUrl2, { signal: controller1.signal, headers: { ...HEADERS, 'Accept': 'application/json, text/plain, */*' } }).catch(() => null)
        ]);
        clearTimeout(t1);

        const processResponse = async (resp: any) => {
            if (!resp || !resp.ok) return [];
            const data = await resp.json();
            return data.ahadith?.data || [];
        };

        const [res1, res2] = await Promise.all([
            processResponse(r1),
            processResponse(r2)
        ]);
        list = [...res1, ...res2];
    } catch (e: any) { console.log("Dorar JSON API failed:", e.message); }

    if (list.length === 0) {
        try {
            const controller2 = new AbortController();
            const t2 = setTimeout(() => controller2.abort(), 4000);
            const htmlUrl = `https://dorar.net/hadith/search?q=${encodeURIComponent(queryStr)}&st=a&xclude=0`;
            const r2 = await fetch(htmlUrl, { signal: controller2.signal, headers: HEADERS });
            clearTimeout(t2);
            if (r2.ok) {
                console.log("HTML scrape call ok");
            }
        } catch (e: any) { console.log("Dorar HTML scrape failed:", e.message); }
    }
    return list;
};

async function test() {
    console.time("Total Search Time");
    const cleanedSearchKey = "من بنى لله مسجدا";

    const [localSearchResults, onlineResults] = await Promise.all([
        (async () => {
            console.time("Local DB time");
            const localResults: any[] = [];
            try {
                const LOCAL_STOP_WORDS = new Set([
                    "من", "عن", "ان", "في", "على", "لا", "ما", "الى", "ثم", "انه", "كان",
                    "قال", "الله", "رسول", "صلي", "عليه", "وسلم", "يا", "ايها", "قد", "لقد",
                    "انما", "اما", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
                ]);

                const keywords = cleanedSearchKey.split(/\s+/)
                    .map((w: string) => normalizeAr(w))
                    .filter((w: string) => w.length >= 2 && !LOCAL_STOP_WORDS.has(w));

                if (keywords.length > 0) {
                    const buildConditions = (textCol: any) => and(...keywords.map((kw: string) => ilike(pgNormalizeText(textCol), `%${kw}%`)));

                    const [bkResults, muResults, vhResults] = await Promise.all([
                        db.select().from(bukhariHadiths).where(buildConditions(bukhariHadiths.text)).limit(15),
                        db.select().from(muslimHadiths).where(buildConditions(muslimHadiths.text)).limit(15),
                        db.select().from(verificationHadiths).where(buildConditions(verificationHadiths.text)).limit(15)
                    ]);
                }
            } catch (e: any) {
                console.log("Local DB search failed:", e.message);
            }
            console.timeEnd("Local DB time");
            return localResults;
        })(),
        (async () => {
            console.time("Online time");
            let online: any[] = [];
            try {
                online = await executeDorarSearch(cleanedSearchKey);
            } catch (e: any) {
                console.log("Online Dorar search failed:", e.message);
            }
            console.timeEnd("Online time");
            return online;
        })()
    ]);

    console.timeEnd("Total Search Time");
}

test();
