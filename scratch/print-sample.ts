import { db } from '../server/db';
import { bukhariHadiths } from '../shared/schema';

async function test() {
    try {
        const results = await db.select().from(bukhariHadiths).limit(3);
        console.log("Results count:", results.length);
        for (const r of results) {
            console.log("Hadith Number:", r.hadithNumber);
            console.log("Text:", r.text);
            console.log("-----");
        }
    } catch (e: any) {
        console.error("Database query failed:", e.message);
    }
}

test();
