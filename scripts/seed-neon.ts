import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "../shared/schema";

const NEON_URL = process.env.NEON_DATABASE_URL;

if (!NEON_URL) {
  console.error("Error: NEON_DATABASE_URL environment variable is required");
  console.log("Usage: NEON_DATABASE_URL=<your-neon-url> npx tsx scripts/seed-neon.ts");
  process.exit(1);
}

const pool = new Pool({ connectionString: NEON_URL });
const db = drizzle(pool, { schema });

async function seedInBatches<T>(
  tableName: string,
  table: any,
  data: T[],
  batchSize = 100
) {
  console.log(`Seeding ${tableName}: ${data.length} records...`);
  
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    try {
      await db.insert(table).values(batch as any).onConflictDoNothing();
      console.log(`  ${tableName}: ${Math.min(i + batchSize, data.length)}/${data.length}`);
    } catch (error) {
      console.error(`  Error in batch ${i}-${i + batchSize}:`, error);
    }
  }
  console.log(`  ${tableName}: Done!`);
}

async function main() {
  console.log("Starting Neon database seeding...\n");

  const hadiths = [
    { text: "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى", narrator: "عمر بن الخطاب", source: "صحيح البخاري", isProtection: false },
    { text: "من حسن إسلام المرء تركه ما لا يعنيه", narrator: "أبو هريرة", source: "سنن الترمذي", isProtection: false },
    { text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه", narrator: "أنس بن مالك", source: "صحيح البخاري", isProtection: false },
    { text: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت", narrator: "أبو هريرة", source: "صحيح البخاري", isProtection: false },
    { text: "المسلم من سلم المسلمون من لسانه ويده", narrator: "عبدالله بن عمرو", source: "صحيح البخاري", isProtection: false },
    { text: "الدين النصيحة", narrator: "تميم الداري", source: "صحيح مسلم", isProtection: false },
    { text: "اتق الله حيثما كنت وأتبع السيئة الحسنة تمحها وخالق الناس بخلق حسن", narrator: "أبو ذر", source: "سنن الترمذي", isProtection: false },
    { text: "من قرأ آية الكرسي دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت", narrator: "أبو أمامة", source: "صحيح النسائي", isProtection: true },
    { text: "من قال بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم ثلاث مرات لم تصبه فجأة بلاء", narrator: "عثمان بن عفان", source: "سنن أبي داود", isProtection: true },
    { text: "أعوذ بكلمات الله التامات من شر ما خلق - من قالها حين يمسي لم يضره شيء", narrator: "أبو هريرة", source: "صحيح مسلم", isProtection: true },
  ];

  const adhkarData = [
    { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", count: 100, virtue: "من قالها مائة مرة حين يصبح وحين يمسي لم يأت أحد يوم القيامة بأفضل مما جاء به", category: "morning" },
    { text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 10, virtue: "كتبت له مائة حسنة ومحيت عنه مائة سيئة وكانت له حرزاً من الشيطان", category: "morning" },
    { text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ", count: 4, virtue: "من قالها أعتقه الله من النار", category: "morning" },
    { text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ", count: 1, virtue: "من قالها حين يصبح فقد أدى شكر يومه", category: "morning" },
    { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ", count: 3, virtue: "أفضل من أن يذكر الله من أول النهار إلى أن تطلع الشمس", category: "morning" },
    { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", count: 100, virtue: "حُطت خطاياه وإن كانت مثل زبد البحر", category: "evening" },
    { text: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 3, virtue: "لم تضره حمة تلك الليلة", category: "evening" },
    { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ", count: 1, virtue: "ذكر المساء", category: "evening" },
    { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ", count: 1, virtue: "ذكر المساء", category: "evening" },
    { text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3, virtue: "لم يضره شيء", category: "evening" },
  ];

  const duasData = [
    { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا", source: "سنن ابن ماجه", category: "morning" },
    { text: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي", source: "صحيح مسلم", category: "general" },
    { text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", source: "القرآن الكريم", category: "general" },
    { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ", source: "صحيح البخاري", category: "anxiety" },
    { text: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ", source: "سنن الترمذي", category: "rizq" },
    { text: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ", source: "القرآن الكريم", category: "parents" },
    { text: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي", source: "صحيح مسلم", category: "guidance" },
    { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى", source: "صحيح مسلم", category: "guidance" },
    { text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", source: "القرآن الكريم", category: "ease" },
    { text: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا", source: "صحيح ابن حبان", category: "ease" },
  ];

  const wardData = [
    { title: "سورة الفاتحة", description: "قراءة سورة الفاتحة", type: "quran", sortOrder: 1, isCompleted: false },
    { title: "آية الكرسي", description: "قراءة آية الكرسي", type: "quran", sortOrder: 2, isCompleted: false },
    { title: "سورة الإخلاص", description: "قراءة سورة الإخلاص ثلاث مرات", type: "quran", sortOrder: 3, isCompleted: false },
    { title: "المعوذتين", description: "قراءة سورة الفلق والناس", type: "quran", sortOrder: 4, isCompleted: false },
    { title: "أذكار الصباح", description: "قراءة أذكار الصباح كاملة", type: "adhkar", sortOrder: 5, isCompleted: false },
    { title: "أذكار المساء", description: "قراءة أذكار المساء كاملة", type: "adhkar", sortOrder: 6, isCompleted: false },
    { title: "الاستغفار", description: "الاستغفار 100 مرة", type: "adhkar", sortOrder: 7, isCompleted: false },
    { title: "الصلاة على النبي", description: "الصلاة على النبي 100 مرة", type: "adhkar", sortOrder: 8, isCompleted: false },
  ];

  const benefitsData = [
    { text: "من قال لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير في يوم مائة مرة كانت له عدل عشر رقاب", author: "النبي ﷺ", source: "صحيح البخاري" },
    { text: "الكلمة الطيبة صدقة", author: "النبي ﷺ", source: "صحيح البخاري" },
    { text: "تبسمك في وجه أخيك صدقة", author: "النبي ﷺ", source: "سنن الترمذي" },
    { text: "خيركم من تعلم القرآن وعلمه", author: "النبي ﷺ", source: "صحيح البخاري" },
    { text: "إن الله يحب إذا عمل أحدكم عملاً أن يتقنه", author: "النبي ﷺ", source: "صحيح الجامع" },
  ];

  const surahsData = Array.from({ length: 114 }, (_, i) => ({
    number: i + 1,
    name: `سورة ${i + 1}`,
    arabicName: `سورة ${i + 1}`,
    versesCount: 7,
    revelationType: i < 86 ? "مكية" : "مدنية",
  }));

  const recitersData = [
    { name: "عبدالرحمن السديس", identifier: "ar.abdurrahmaansudais" },
    { name: "مشاري العفاسي", identifier: "ar.alafasy" },
    { name: "ماهر المعيقلي", identifier: "ar.maaborkmueaqly" },
    { name: "سعود الشريم", identifier: "ar.saaborklshuraym" },
  ];

  try {
    await seedInBatches("hadiths", schema.hadiths, hadiths);
    await seedInBatches("adhkar", schema.adhkar, adhkarData);
    await seedInBatches("duas", schema.duas, duasData);
    await seedInBatches("dailyWard", schema.dailyWard, wardData);
    await seedInBatches("benefits", schema.benefits, benefitsData);
    await seedInBatches("quranSurahs", schema.quranSurahs, surahsData);
    await seedInBatches("reciters", schema.reciters, recitersData);

    console.log("\n✅ Neon database seeded successfully!");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
