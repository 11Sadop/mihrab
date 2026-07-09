import { db } from '../server/db';
import { bukhariHadiths, muslimHadiths } from '../shared/schema';
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
    try {
        const queryStr = "من بنى لله مسجدا";
        const cleaned = queryStr.replace(/[ًٌٍَُِّْـ]/g, ""); // Clean tashkeel
        const keywords = cleaned.split(/\s+/)
            .map((w: string) => normalizeAr(w))
            .filter((w: string) => w.length >= 2);
        
        console.log("Keywords:", keywords);

        const conditions = and(...keywords.map((kw: string) => ilike(pgNormalizeText(bukhariHadiths.text), `%${kw}%`)));
        
        const results = await db.select().from(bukhariHadiths).where(conditions).limit(5);
        console.log("Results found in Bukhari:", results.length);
        for (const r of results) {
            console.log("Number:", r.hadithNumber);
            console.log("Text:", r.text.substring(0, 150));
            console.log("-----");
        }
    } catch (e: any) {
        console.error("Database query failed:", e.message);
    }
}

test();
