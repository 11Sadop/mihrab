import { db } from "./server/db";
import { bukhariHadiths, muslimHadiths, verificationHadiths } from "./shared/schema";
import { ilike, and, sql } from "drizzle-orm";

async function run() {
    const searchKey = "من بنى لله مسجدا";
    
    const cleanQueryForSearch = (text: string): string => {
        if (!text) return "";
        return text
            .replace(/[ًٌٍَُِّْـ]/g, "") // Strip Tashkeel first!
            .replace(/[\(\)\[\]\{\}«»"'`.,\/#!$%\^&\*;:{}=\-_~?؟]/g, " ")
            .replace(/[\uFDFA\uFDFB\u0610\u0611\u0612\u0613]/g, " ") // ﷺ, ؓ, etc.
            .replace(/\s+/g, " ")
            .trim();
    };

    const pgNormalizeText = (col: any) => {
        return sql`translate(
            regexp_replace(${col}, '[ًٌٍَُِّْٰـ]', '', 'g'),
            'أإآءٱةى',
            'aaaaاهي'
        )`;
    };

    const normalizeAr = (s: string) => s.replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآءٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'i').replace(/\s+/g, ' ').trim(); // wait, original has 'aaaaاهي', but normalizeAr had 'aaaaاهي' -> wait, 'aaaaاهي' has 'i' for ى? No, 'aaaaاهي' has 'y' or 'i' or what? Let's check original routes.ts line 444-445: 'أإآءٱةى' to 'aaaaاهي'. Let's count:
    // أ -> a (1)
    // إ -> a (2)
    // آ -> a (3)
    // ء -> a (4)
    // ٱ -> a (5)
    // ة -> ه (6)
    // ى -> ي (7) - wait! 'aaaaاهي' has: a, a, a, a, ا (5), ه (6), ي (7). Yes! 'aaaaاهي' is 'a', 'a', 'a', 'a', 'ا', 'ه', 'ي'.
    
    const normalizeArOriginal = (s: string) => s.replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآءٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+/g, ' ').trim();

    const LOCAL_STOP_WORDS = new Set([
        "من", "عن", "ان", "في", "على", "لا", "ما", "الى", "ثم", "انه", "كان",
        "قال", "الله", "رسول", "صلي", "عليه", "وسلم", "يا", "ايها", "قد", "لقد",
        "انما", "اما", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
    ]);

    const cleanedSearchKey = cleanQueryForSearch(searchKey);
    console.log("Cleaned search key:", cleanedSearchKey);

    const keywords = cleanedSearchKey.split(/\s+/)
        .map((w: string) => normalizeArOriginal(w))
        .filter((w: string) => w.length >= 2 && !LOCAL_STOP_WORDS.has(w));

    console.log("Keywords for ILIKE:", keywords);

    const buildConditions = (textCol: any) => and(...keywords.map((kw: string) => ilike(pgNormalizeText(textCol), `%${kw}%`)));

    try {
        const [bkResults, muResults, vhResults] = await Promise.all([
            db.select().from(bukhariHadiths).where(buildConditions(bukhariHadiths.text)).limit(15),
            db.select().from(muslimHadiths).where(buildConditions(muslimHadiths.text)).limit(15),
            db.select().from(verificationHadiths).where(buildConditions(verificationHadiths.text)).limit(15)
        ]);

        console.log(`Bukhari matches: ${bkResults.length}`);
        bkResults.forEach(h => console.log(` - [Bukhari] ${h.text.substring(0, 80)}...`));

        console.log(`Muslim matches: ${muResults.length}`);
        muResults.forEach(h => console.log(` - [Muslim] ${h.text.substring(0, 80)}...`));

        console.log(`Verification matches: ${vhResults.length}`);
        vhResults.forEach(h => console.log(` - [Verification] ${h.text.substring(0, 80)}...`));

    } catch (e: any) {
        console.error("Query failed:", e);
    }
}

run();
