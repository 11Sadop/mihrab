import { db } from "./server/db.js";
import { bukhariHadiths, muslimHadiths, verificationHadiths } from "./shared/schema.js";
import { sql } from "drizzle-orm";

async function check() {
  try {
    const bkCount = await db.select({ count: sql`count(*)` }).from(bukhariHadiths);
    const msCount = await db.select({ count: sql`count(*)` }).from(muslimHadiths);
    const vCount = await db.select({ count: sql`count(*)` }).from(verificationHadiths);

    console.log("Bukhari Hadiths Count:", bkCount[0]?.count);
    console.log("Muslim Hadiths Count:", msCount[0]?.count);
    console.log("Verification Hadiths Count:", vCount[0]?.count);
  } catch (e) {
    console.error("Error checking db:", e);
  }
  process.exit(0);
}

check();
