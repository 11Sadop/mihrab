import { db } from '../server/db';
import { bukhariHadiths, muslimHadiths } from '../shared/schema';
import { sql } from 'drizzle-orm';

async function test() {
    try {
        console.log("Checking bukhariHadiths count...");
        const countBk = await db.select({ count: sql`count(*)` }).from(bukhariHadiths);
        console.log("Bukhari count:", countBk[0].count);

        console.log("Checking muslimHadiths count...");
        const countMu = await db.select({ count: sql`count(*)` }).from(muslimHadiths);
        console.log("Muslim count:", countMu[0].count);

        console.log("Searching for 'مسجدا' in Bukhari...");
        const results = await db.select().from(bukhariHadiths).where(sql`text LIKE '%مسجدا%'`).limit(5);
        console.log("Results found in Bukhari:", results.length);
        for (const r of results) {
            console.log("-", r.text.substring(0, 100));
        }

        console.log("Searching for 'مسجدا' in Muslim...");
        const resultsMu = await db.select().from(muslimHadiths).where(sql`text LIKE '%مسجدا%'`).limit(5);
        console.log("Results found in Muslim:", resultsMu.length);
        for (const r of resultsMu) {
            console.log("-", r.text.substring(0, 100));
        }
    } catch (e: any) {
        console.error("Database query failed:", e.message);
    }
}

test();
