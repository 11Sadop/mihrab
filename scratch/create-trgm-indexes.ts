import { db } from '../server/db';
import { sql } from 'drizzle-orm';

async function test() {
    try {
        console.log("Creating pg_trgm extension...");
        await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
        console.log("Extension created/verified!");

        console.log("Creating GIN trigram index for bukhari_hadiths...");
        await db.execute(sql`
            CREATE INDEX IF NOT EXISTS bukhari_text_normalized_gin_idx 
            ON bukhari_hadiths USING gin (
                translate(
                    regexp_replace(text, '[ًٌٍَُِّْٰـ]', '', 'g'),
                    'أإآءٱةى',
                    'aaaaاهي'
                ) gin_trgm_ops
            );
        `);
        console.log("Bukhari GIN index created!");

        console.log("Creating GIN trigram index for muslim_hadiths...");
        await db.execute(sql`
            CREATE INDEX IF NOT EXISTS muslim_text_normalized_gin_idx 
            ON muslim_hadiths USING gin (
                translate(
                    regexp_replace(text, '[ًٌٍَُِّْٰـ]', '', 'g'),
                    'أإآءٱةى',
                    'aaaaاهي'
                ) gin_trgm_ops
            );
        `);
        console.log("Muslim GIN index created!");

        console.log("Creating GIN trigram index for verification_hadiths...");
        await db.execute(sql`
            CREATE INDEX IF NOT EXISTS verification_text_normalized_gin_idx 
            ON verification_hadiths USING gin (
                translate(
                    regexp_replace(text, '[ًٌٍَُِّْٰـ]', '', 'g'),
                    'أإآءٱةى',
                    'aaaaاهي'
                ) gin_trgm_ops
            );
        `);
        console.log("Verification GIN index created!");

    } catch (e: any) {
        console.error("Index creation failed:", e.message);
    }
}

test();
