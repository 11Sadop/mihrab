import { db } from '../server/db';
import { bukhariHadiths, muslimHadiths, verificationHadiths } from '../shared/schema';
import { sql, and, ilike } from 'drizzle-orm';

const pgNormalizeText = (col: any) => {
    return sql`translate(
        regexp_replace(${col}, '[ًٌٍَُِّْٰـ]', '', 'g'),
        'أإآءٱةى',
        'aaaaاهي'
    )`;
};

const normalizeAr = (s: string) => s.replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآءٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+/g, ' ').trim();

async function test() {
    console.time("Total GIN Indexed Search Time");
    const cleanedSearchKey = "من بنى لله مسجدا";

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

            console.time("GIN Query time");
            const [bkResults, muResults, vhResults] = await Promise.all([
                db.select().from(bukhariHadiths).where(buildConditions(bukhariHadiths.text)).limit(15),
                db.select().from(muslimHadiths).where(buildConditions(muslimHadiths.text)).limit(15),
                db.select().from(verificationHadiths).where(buildConditions(verificationHadiths.text)).limit(15)
            ]);
            console.timeEnd("GIN Query time");
            console.log(`Found Bk: ${bkResults.length}, Mu: ${muResults.length}, Vh: ${vhResults.length}`);
        }
    } catch (e: any) {
        console.log("Local DB search failed:", e.message);
    }

    console.timeEnd("Total GIN Indexed Search Time");
}

test();
