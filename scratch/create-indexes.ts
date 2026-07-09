import { db } from '../server/db';
import { sql } from 'drizzle-orm';

async function test() {
    try {
        console.log("Creating functional index for bukhari_hadiths (first 800 chars)...");
        await db.execute(sql`
            CREATE INDEX IF NOT EXISTS bukhari_text_normalized_idx 
            ON bukhari_hadiths (
                LEFT(
                    translate(
                        regexp_replace(text, '[ًٌٍَُِّْٰـ]', '', 'g'),
                        'أإآءٱةى',
                        'aaaaاهي'
                    ),
                    800
                )
            );
        `);
        console.log("Bukhari index created successfully!");

        console.log("Creating functional index for muslim_hadiths (first 800 chars)...");
        await db.execute(sql`
            CREATE INDEX IF NOT EXISTS muslim_text_normalized_idx 
            ON muslim_hadiths (
                LEFT(
                    translate(
                        regexp_replace(text, '[ًٌٍَُِّْٰـ]', '', 'g'),
                        'أإآءٱةى',
                        'aaaaاهي'
                    ),
                    800
                )
            );
        `);
        console.log("Muslim index created successfully!");

        console.log("Creating functional index for verification_hadiths (first 800 chars)...");
        await db.execute(sql`
            CREATE INDEX IF NOT EXISTS verification_text_normalized_idx 
            ON verification_hadiths (
                LEFT(
                    translate(
                        regexp_replace(text, '[ًٌٍَُِّْٰـ]', '', 'g'),
                        'أإآءٱةى',
                        'aaaaاهي'
                    ),
                    800
                )
            );
        `);
        console.log("Verification index created successfully!");

    } catch (e: any) {
        console.error("Index creation failed:", e.message);
    }
}

test();
