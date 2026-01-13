import { db } from "./db";
import { 
  adhkar, 
  duas, 
  hadiths, 
  benefits, 
  quranSurahs, 
  reciters,
  dailyWard,
  siteStats,
  bukhariHadiths,
  muslimHadiths,
  verificationHadiths,
  type Adhkar, 
  type Dua, 
  type Hadith, 
  type Benefit, 
  type QuranSurah, 
  type Reciter,
  type DailyWard,
  type BukhariHadith,
  type MuslimHadith,
  type VerificationHadith,
} from "./shared/schema";
import { eq, sql, and, ilike, or } from "drizzle-orm";

export interface HadithQueryResult {
  hadiths: BukhariHadith[] | MuslimHadith[];
  total: number;
  books: { bookNumber: number; bookName: string; count: number }[];
}

export interface IStorage {
  getAdhkar(category?: string): Promise<Adhkar[]>;
  getDuas(category?: string): Promise<Dua[]>;
  getDailyHadith(refresh?: boolean): Promise<Hadith | undefined>;
  getProtectionHadiths(): Promise<Hadith[]>;
  getDailyBenefit(): Promise<Benefit | undefined>;
  getSurahs(): Promise<QuranSurah[]>;
  getReciters(): Promise<Reciter[]>;
  getDailyWard(): Promise<DailyWard[]>;
  toggleWard(id: number, isCompleted: boolean): Promise<DailyWard>;
  incrementVisitors(): Promise<number>;
  getVisitorCount(): Promise<number>;
  seedData(): Promise<void>;
  getBukhariHadiths(page: number, limit: number, bookNumber?: number, search?: string): Promise<HadithQueryResult>;
  getMuslimHadiths(page: number, limit: number, bookNumber?: number, search?: string): Promise<HadithQueryResult>;
}

export class DatabaseStorage implements IStorage {
  async getAdhkar(category?: string): Promise<Adhkar[]> {
    if (category) {
      return await db.select().from(adhkar).where(eq(adhkar.category, category));
    }
    return await db.select().from(adhkar);
  }

  async getDuas(category?: string): Promise<Dua[]> {
    if (category) {
      return await db.select().from(duas).where(eq(duas.category, category));
    }
    return await db.select().from(duas);
  }

  async getDailyHadith(refresh = false): Promise<Hadith | undefined> {
    // Get all hadiths sorted by ID for consistent ordering
    const allHadiths = await db.select().from(hadiths).orderBy(hadiths.id);
    const count = allHadiths.length;
    if (count === 0) return undefined;

    // Use a combination of day of year and year to cycle through hadiths without repeating
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    const year = now.getFullYear();
    
    // Create a unique seed based on date that cycles through all hadiths before repeating
    const seed = (dayOfYear + year * 365) % count;
    
    if (refresh) {
      // When refreshing, pick a different hadith using current time as randomizer
      const randomOffset = Math.floor(Date.now() / 1000) % count;
      // Make sure we get a different one by adding an offset
      const newIndex = (seed + randomOffset + 1) % count;
      return allHadiths[newIndex];
    }
    
    return allHadiths[seed];
  }

  async getProtectionHadiths(): Promise<Hadith[]> {
    return await db.select().from(hadiths).where(eq(hadiths.isProtection, true));
  }

  async getDailyBenefit(): Promise<Benefit | undefined> {
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(benefits);
    const count = Number(countResult[0]?.count || 0);
    if (count === 0) return undefined;
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const offset = dayOfYear % count;
    const result = await db.select().from(benefits).limit(1).offset(offset);
    return result[0];
  }

  async getDailyWard(): Promise<DailyWard[]> {
    return await db.select().from(dailyWard).orderBy(dailyWard.sortOrder);
  }

  async toggleWard(id: number, isCompleted: boolean): Promise<DailyWard> {
    const [updated] = await db.update(dailyWard).set({ isCompleted }).where(eq(dailyWard.id, id)).returning();
    return updated;
  }

  async getSurahs(): Promise<QuranSurah[]> {
    return await db.select().from(quranSurahs);
  }

  async getReciters(): Promise<Reciter[]> {
    return await db.select().from(reciters);
  }

  async seedData(): Promise<void> {
    // Seed Hadiths - Only seed if no hadiths exist
    const existingHadiths = await db.select().from(hadiths).limit(1);
    if (existingHadiths.length === 0) {
      await db.insert(hadiths).values([
        { 
          category: "general", 
          arabicText: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى", 
          translation: "Actions are judged by intentions, and everyone will be rewarded according to what they intended.", 
          source: "صحيح البخاري",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", 
          translation: "None of you truly believes until he loves for his brother what he loves for himself.", 
          source: "صحيح البخاري ومسلم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "من حسن إسلام المرء تركه ما لا يعنيه", 
          translation: "Part of the perfection of one's Islam is leaving that which does not concern him.", 
          source: "جامع الترمذي",
          isProtection: false
        },
        { 
          category: "protection", 
          arabicText: "من قرأ آية الكرسي دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت", 
          translation: "Whoever recites Ayat Al-Kursi after every obligatory prayer, nothing prevents him from entering Paradise except death.", 
          source: "صحيح النسائي",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "من قرأ بالآيتين من آخر سورة البقرة في ليلة كفتاه", 
          translation: "Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him.", 
          source: "صحيح البخاري",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "قل هو الله أحد والمعوذتين حين تمسي وحين تصبح ثلاث مرات تكفيك من كل شيء", 
          translation: "Recite Surah Al-Ikhlas and Al-Mu'awwidhatayn (Al-Falaq and An-Nas) three times in the morning and evening; they will suffice you against everything.", 
          source: "سنن أبي داود",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", 
          translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.", 
          source: "صحيح مسلم",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", 
          translation: "In the Name of Allah, with Whose Name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.", 
          source: "سنن أبي داود",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ", 
          translation: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, from being heavily in debt and from being overpowered by men.", 
          source: "صحيح البخاري",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ", 
          translation: "O Allah, grant my body health, O Allah, grant my hearing health, O Allah, grant my sight health. None has the right to be worshipped except You.", 
          source: "سنن أبي داود",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", 
          translation: "Allah is sufficient for me. There is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.", 
          source: "سنن أبي داود",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ", 
          translation: "I seek refuge in the perfect words of Allah from every devil and poisonous creature and from every evil eye.", 
          source: "صحيح البخاري",
          isProtection: true
        },
        { 
          category: "protection", 
          arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِوَجْهِكَ الْكَرِيمِ وَكَلِمَاتِكَ التَّامَّةِ مِنْ شَرِّ مَا أَنْتَ آخِذٌ بِنَاصِيَتِهِ", 
          translation: "O Allah, I seek refuge in Your noble Face and Your perfect words from the evil of that which You have control over.", 
          source: "سنن أبي داود",
          isProtection: true
        },
        { 
          category: "general", 
          arabicText: "خير الكلام أربع: سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر", 
          translation: "The best of speech is four phrases: SubhanAllah, Alhamdulillah, La ilaha illAllah, and Allahu Akbar.", 
          source: "صحيح مسلم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "أحب الكلام إلى الله أربع: سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر، لا يضرك بأيهن بدأت", 
          translation: "The most beloved speech to Allah is four phrases: SubhanAllah, Alhamdulillah, La ilaha illAllah, and Allahu Akbar. It does not matter with which you begin.", 
          source: "صحيح مسلم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم", 
          translation: "Two words which are light on the tongue but heavy on the Scale and beloved to the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem.", 
          source: "صحيح البخاري",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "الطهور شطر الإيمان، والحمد لله تملأ الميزان، وسبحان الله والحمد لله تملآن ما بين السماء والأرض", 
          translation: "Purity is half of faith. Alhamdulillah fills the Scale, and SubhanAllah and Alhamdulillah fill what is between the heaven and the earth.", 
          source: "صحيح مسلم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "من قال لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير في يوم مائة مرة، كانت له عدل عشر رقاب", 
          translation: "Whoever says 'La ilaha illAllahu wahdahu la sharika lahu...' a hundred times a day, it is equivalent to freeing ten slaves.", 
          source: "صحيح البخاري",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "ألا أدلك على غراس هو خير من هذا؟ تقول: سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر، يغرس لك بكل كلمة منها شجرة في الجنة", 
          translation: "Shall I tell you of a planting better than this? You say: SubhanAllah, Alhamdulillah, La ilaha illAllah, Allahu Akbar - a tree is planted for you in Paradise for each word.", 
          source: "سنن ابن ماجه",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "من سبح الله في دبر كل صلاة ثلاثاً وثلاثين، وحمد الله ثلاثاً وثلاثين، وكبر الله ثلاثاً وثلاثين، ثم قال تمام المائة: لا إله إلا الله وحده لا شريك له، غفرت خطاياه وإن كانت مثل زبد البحر", 
          translation: "Whoever glorifies Allah after every prayer 33 times, praises Allah 33 times, exalts Allah 33 times, and says to complete 100: 'La ilaha illAllah...' - his sins will be forgiven even if they are like the foam of the sea.", 
          source: "صحيح مسلم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "سبحان الله والحمد لله ولا إله إلا الله والله أكبر", 
          translation: "Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest.", 
          source: "صحيح مسلم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "لا حول ولا قوة إلا بالله", 
          translation: "There is no power and no strength except with Allah.", 
          source: "صحيح البخاري",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "اللهم صل وسلم على نبينا محمد", 
          translation: "O Allah, send blessings and peace upon our Prophet Muhammad.", 
          source: "القرآن الكريم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "رب اغفر لي وتب علي إنك أنت التواب الغفور", 
          translation: "My Lord, forgive me and accept my repentance, for You are the Accepter of repentance, the Forgiving.", 
          source: "سنن أبي داود",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "سبحان الله عدد ما خلق، سبحان الله ملء ما خلق، سبحان الله عدد ما في الأرض والسماء، سبحان الله ملء ما في الأرض والسماء", 
          translation: "Glory be to Allah as many times as what He has created, glory be to Allah to fill what He has created...", 
          source: "صحيح مسلم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "اللهم أنت ربي لا إله إلا أنت، عليك توكلت، وأنت رب العرش العظيم", 
          translation: "O Allah, You are my Lord, there is no god but You, upon You I rely, and You are the Lord of the Mighty Throne.", 
          source: "سنن أبي داود",
          isProtection: true
        },
        { 
          category: "general", 
          arabicText: "يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله، ولا تكلني إلى نفسي طرفة عين", 
          translation: "O Ever Living, O Self-Sustaining, by Your mercy I seek help, rectify all my affairs, and do not leave me to myself even for the blink of an eye.", 
          source: "الحاكم",
          isProtection: false
        },
        { 
          category: "general", 
          arabicText: "اللهم إني أعوذ بك من الهم والحزن، وأعوذ بك من العجز والكسل، وأعوذ بك من الجبن والبخل، وأعوذ بك من غلبة الدين وقهر الرجال", 
          translation: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, from being heavily in debt and from being overpowered by men.", 
          source: "صحيح البخاري",
          isProtection: true
        }
      ]);
    }

    // Seed Adhkar with virtues
    const existingAdhkar = await db.select().from(adhkar).limit(1);
    if (existingAdhkar.length === 0) {
      await db.insert(adhkar).values([
        // أذكار الصباح - Morning Adhkar
        {
          category: "morning",
          arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          translation: "We have entered a new day and with it all dominion belongs to Allah. Praise be to Allah. None has the right to be worshipped but Allah alone, Who has no partner. To Allah belongs the dominion and to Him is all praise, and He is Able to do all things.",
          reference: "صحيح مسلم",
          virtueHadith: "من قالها حين يصبح عشر مرات كتب الله له عشر حسنات ومحى عنه عشر سيئات",
          virtueSource: "صحيح الجامع",
          count: 1
        },
        {
          category: "morning",
          arabicText: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
          translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
          reference: "سنن الترمذي",
          virtueHadith: "كان النبي صلى الله عليه وسلم إذا أصبح قال هذا الدعاء",
          virtueSource: "سنن الترمذي",
          count: 1
        },
        {
          category: "morning",
          arabicText: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
          translation: "Glory be to Allah and His is the praise.",
          reference: "صحيح مسلم",
          virtueHadith: "من قال سبحان الله وبحمده مائة مرة حين يصبح وحين يمسي لم يأت أحد يوم القيامة بأفضل مما جاء به إلا أحد قال مثل ما قال أو زاد عليه",
          virtueSource: "صحيح مسلم",
          count: 100
        },
        {
          category: "morning",
          arabicText: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          translation: "None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion, to Him belongs all praise, and He is Able to do all things.",
          reference: "صحيح البخاري",
          virtueHadith: "من قالها عشر مرات كانت له عدل عشر رقاب، وكتبت له مائة حسنة، ومحيت عنه مائة سيئة، وكانت له حرزاً من الشيطان يومه ذلك حتى يمسي",
          virtueSource: "صحيح البخاري",
          count: 10
        },
        {
          category: "morning",
          arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
          translation: "O Allah, I ask You for well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family and my wealth.",
          reference: "سنن ابن ماجه",
          virtueHadith: "ما سُئل الله شيئاً أحب إليه من العافية",
          virtueSource: "سنن الترمذي",
          count: 1
        },
        {
          category: "morning",
          arabicText: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
          translation: "In the Name of Allah, with Whose Name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.",
          reference: "سنن أبي داود",
          virtueHadith: "من قالها ثلاث مرات إذا أصبح وثلاث مرات إذا أمسى لم يضره شيء",
          virtueSource: "سنن أبي داود",
          count: 3
        },
        // أذكار المساء - Evening Adhkar
        {
          category: "evening",
          arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          translation: "We have entered the evening and with it all dominion belongs to Allah. Praise be to Allah. None has the right to be worshipped but Allah alone, Who has no partner.",
          reference: "صحيح مسلم",
          virtueHadith: "من قالها حين يمسي عشر مرات كتب الله له عشر حسنات ومحى عنه عشر سيئات",
          virtueSource: "صحيح الجامع",
          count: 1
        },
        {
          category: "evening",
          arabicText: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
          translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.",
          reference: "سنن الترمذي",
          virtueHadith: "كان النبي صلى الله عليه وسلم إذا أمسى قال هذا الدعاء",
          virtueSource: "سنن الترمذي",
          count: 1
        },
        {
          category: "evening",
          arabicText: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
          translation: "Glory be to Allah and His is the praise.",
          reference: "صحيح مسلم",
          virtueHadith: "من قالها مائة مرة حين يمسي حُطَّت خطاياه وإن كانت مثل زبد البحر",
          virtueSource: "صحيح البخاري",
          count: 100
        },
        {
          category: "evening",
          arabicText: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
          translation: "I seek refuge in the Perfect Words of Allah from the evil of what He has created.",
          reference: "صحيح مسلم",
          virtueHadith: "من قالها حين يمسي ثلاث مرات لم تضره حُمَة تلك الليلة",
          virtueSource: "صحيح مسلم",
          count: 3
        },
        {
          category: "evening",
          arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
          translation: "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, from being heavily in debt and from being overpowered by men.",
          reference: "صحيح البخاري",
          virtueHadith: "كان النبي صلى الله عليه وسلم يكثر من هذا الدعاء",
          virtueSource: "صحيح البخاري",
          count: 1
        },
        // أذكار بعد الصلاة - After Prayer Adhkar
        {
          category: "after_prayer",
          arabicText: "أَسْتَغْفِرُ اللهَ، أَسْتَغْفِرُ اللهَ، أَسْتَغْفِرُ اللهَ",
          translation: "I seek forgiveness from Allah (three times).",
          reference: "صحيح مسلم",
          virtueHadith: "كان رسول الله صلى الله عليه وسلم إذا انصرف من صلاته استغفر ثلاثاً",
          virtueSource: "صحيح مسلم",
          count: 3
        },
        {
          category: "after_prayer",
          arabicText: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
          translation: "O Allah, You are As-Salam (Peace), and from You is peace. Blessed are You, O Owner of Majesty and Honor.",
          reference: "صحيح مسلم",
          virtueHadith: "كان النبي صلى الله عليه وسلم إذا سلم من صلاته قال هذا الدعاء",
          virtueSource: "صحيح مسلم",
          count: 1
        },
        {
          category: "after_prayer",
          arabicText: "سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَاللهُ أَكْبَرُ",
          translation: "Glory be to Allah, praise be to Allah, Allah is the Greatest.",
          reference: "صحيح مسلم",
          virtueHadith: "من سبح الله دبر كل صلاة ثلاثاً وثلاثين وحمد الله ثلاثاً وثلاثين وكبر الله ثلاثاً وثلاثين فتلك تسعة وتسعون وقال تمام المائة لا إله إلا الله وحده لا شريك له غُفرت خطاياه وإن كانت مثل زبد البحر",
          virtueSource: "صحيح مسلم",
          count: 33
        },
        {
          category: "after_prayer",
          arabicText: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          translation: "None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion, to Him belongs all praise, and He is Able to do all things.",
          reference: "صحيح البخاري",
          virtueHadith: "يقال بعد التسبيح والتحميد والتكبير لإتمام المائة",
          virtueSource: "صحيح مسلم",
          count: 1
        },
        {
          category: "after_prayer",
          arabicText: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
          translation: "O Allah, help me to remember You, to thank You, and to worship You properly.",
          reference: "سنن أبي داود",
          virtueHadith: "قال النبي لمعاذ: لا تدعن في دبر كل صلاة أن تقول هذا الدعاء",
          virtueSource: "سنن أبي داود",
          count: 1
        },
        {
          category: "after_prayer",
          arabicText: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          translation: "None has the right to be worshipped but Allah alone, Who has no partner, His is the dominion and His is the praise, He gives life and causes death and He is Able to do all things.",
          reference: "سنن الترمذي",
          virtueHadith: "من قالها بعد صلاة المغرب والفجر عشر مرات كتب الله له عشر حسنات",
          virtueSource: "سنن الترمذي",
          count: 10
        },
        {
          category: "after_prayer",
          arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
          translation: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
          reference: "سنن ابن ماجه",
          virtueHadith: "كان النبي يدعو بعد صلاة الفجر بهذا الدعاء",
          virtueSource: "سنن ابن ماجه",
          count: 1
        },
        {
          category: "after_prayer",
          arabicText: "رَبِّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
          translation: "My Lord, protect me from Your punishment on the Day You resurrect Your servants.",
          reference: "سنن أبي داود",
          virtueHadith: "كان النبي إذا صلى الفجر جلس في مصلاه حتى تطلع الشمس وقال هذا",
          virtueSource: "صحيح مسلم",
          count: 1
        },
        {
          category: "after_prayer",
          arabicText: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
          translation: "There is no power and no strength except with Allah.",
          reference: "صحيح البخاري",
          virtueHadith: "كنز من كنوز الجنة",
          virtueSource: "صحيح البخاري ومسلم",
          count: 1
        },
        // أذكار الاستيقاظ - Upon Waking Adhkar
        {
          category: "upon_waking",
          arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَمَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
          translation: "Praise be to Allah Who has given us life after causing us to die, and to Him is the resurrection.",
          reference: "صحيح البخاري",
          virtueHadith: "كان النبي صلى الله عليه وسلم إذا استيقظ قال هذا الدعاء",
          virtueSource: "صحيح البخاري",
          count: 1
        },
        {
          category: "upon_waking",
          arabicText: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
          translation: "None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion, to Him belongs all praise, and He is Able to do all things. Glory be to Allah, praise be to Allah, there is no god but Allah, Allah is the Greatest, and there is no power or strength except with Allah, the Most High, the Most Great.",
          reference: "صحيح البخاري",
          virtueHadith: "من تعارَّ من الليل فقال هذا ثم دعا استُجيب له، فإن توضأ وصلى قُبلت صلاته",
          virtueSource: "صحيح البخاري",
          count: 1
        },
        {
          category: "upon_waking",
          arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ فَتْحَهُ وَنَصْرَهُ وَنُورَهُ وَبَرَكَتَهُ وَهُدَاهُ",
          translation: "O Allah, I ask You for the good of this day: its victory, its help, its light, its blessings, and its guidance.",
          reference: "سنن أبي داود",
          virtueHadith: "كان النبي يدعو بهذا الدعاء إذا أصبح",
          virtueSource: "سنن أبي داود",
          count: 1
        },
        {
          category: "upon_waking",
          arabicText: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
          translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
          reference: "سنن الترمذي",
          virtueHadith: "سيد الاستغفار وخير ما يقوله العبد إذا أصبح",
          virtueSource: "سنن الترمذي",
          count: 1
        }
      ]);
    }

    // Seed Duas with comprehensive content
    const existingDuas = await db.select().from(duas).limit(1);
    if (existingDuas.length === 0) {
      await db.insert(duas).values([
        // أدعية الاستغفار
        {
          category: "forgiveness",
          arabicText: "أَسْتَغْفِرُ اللهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
          translation: "أستغفر الله الذي لا إله إلا هو الحي القيوم وأتوب إليه",
          reference: "سنن أبي داود"
        },
        {
          category: "forgiveness",
          arabicText: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
          translation: "سيد الاستغفار - من قالها موقناً بها فمات فهو من أهل الجنة",
          reference: "صحيح البخاري"
        },
        {
          category: "forgiveness",
          arabicText: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
          translation: "رب اغفر لي وتب علي إنك أنت التواب الرحيم",
          reference: "سنن أبي داود"
        },
        {
          category: "forgiveness",
          arabicText: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
          translation: "دعاء علمه النبي لأبي بكر الصديق ليقوله في صلاته",
          reference: "صحيح البخاري"
        },
        {
          category: "forgiveness",
          arabicText: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
          translation: "دعاء آدم وحواء عليهما السلام",
          reference: "سورة الأعراف: 23"
        },
        // أدعية الهم والغم
        {
          category: "stress",
          arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
          translation: "دعاء كان النبي صلى الله عليه وسلم يكثر منه",
          reference: "صحيح البخاري"
        },
        {
          category: "stress",
          arabicText: "لَا إِلَهَ إِلَّا اللهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
          translation: "دعاء الكرب - كان النبي يقوله عند الكرب",
          reference: "صحيح البخاري"
        },
        {
          category: "stress",
          arabicText: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ",
          translation: "دعاء لتفريج الهم والكرب",
          reference: "سنن أبي داود"
        },
        {
          category: "stress",
          arabicText: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
          translation: "دعاء يونس عليه السلام في بطن الحوت",
          reference: "سورة الأنبياء: 87"
        },
        {
          category: "stress",
          arabicText: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
          translation: "دعاء للاستغاثة برحمة الله",
          reference: "سنن الترمذي"
        },
        {
          category: "stress",
          arabicText: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
          translation: "دعاء لتسهيل الأمور",
          reference: "صحيح ابن حبان"
        },
        // أدعية السفر
        {
          category: "travel",
          arabicText: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
          translation: "دعاء ركوب الدابة والمركبة",
          reference: "صحيح مسلم"
        },
        {
          category: "travel",
          arabicText: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
          translation: "دعاء السفر الطويل",
          reference: "صحيح مسلم"
        },
        {
          category: "travel",
          arabicText: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ",
          translation: "الدعاء عند السفر",
          reference: "صحيح مسلم"
        },
        {
          category: "travel",
          arabicText: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
          translation: "دعاء العودة من السفر",
          reference: "صحيح مسلم"
        },
        // أدعية الأهل والمنزل
        {
          category: "family",
          arabicText: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
          translation: "دعاء للذرية الصالحة",
          reference: "سورة الفرقان: 74"
        },
        {
          category: "family",
          arabicText: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
          translation: "دعاء إبراهيم عليه السلام",
          reference: "سورة إبراهيم: 40"
        },
        {
          category: "family",
          arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
          translation: "دعاء عند الزواج",
          reference: "سنن أبي داود"
        },
        {
          category: "family",
          arabicText: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
          translation: "دعاء دخول المنزل",
          reference: "سنن أبي داود"
        },
        {
          category: "family",
          arabicText: "اللَّهُمَّ بَارِكْ لَنَا فِي بَيْتِنَا، وَارْزُقْنَا فِيهِ الْبَرَكَةَ وَالسَّكِينَةَ",
          translation: "دعاء للبركة في المنزل",
          reference: "مأثور"
        },
        {
          category: "family",
          arabicText: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
          translation: "دعاء للوالدين والذرية",
          reference: "سورة الأحقاف: 15"
        },
        {
          category: "family",
          arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          translation: "دعاء جامع للخير في الدنيا والآخرة",
          reference: "سورة البقرة: 201"
        },
        {
          category: "family",
          arabicText: "اللَّهُمَّ احْفَظْ أَهْلِي وَأَوْلَادِي مِنْ كُلِّ سُوءٍ وَمَكْرُوهٍ",
          translation: "دعاء لحفظ الأهل والأولاد",
          reference: "مأثور"
        },
        {
          category: "family",
          arabicText: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا، وَاهْدِنَا سُبُلَ السَّلَامِ",
          translation: "دعاء للألفة والسلام في الأسرة",
          reference: "سنن أبي داود"
        },
        // أدعية الشفاء
        {
          category: "health",
          arabicText: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
          translation: "دعاء الشفاء الذي كان يدعو به النبي للمريض",
          reference: "صحيح البخاري"
        },
        {
          category: "health",
          arabicText: "أَسْأَلُ اللهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
          translation: "من عاد مريضاً فقالها سبع مرات شفاه الله",
          reference: "سنن أبي داود"
        },
        {
          category: "health",
          arabicText: "بِسْمِ اللهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللهُ يَشْفِيكَ، بِسْمِ اللهِ أَرْقِيكَ",
          translation: "رقية جبريل عليه السلام للنبي صلى الله عليه وسلم",
          reference: "صحيح مسلم"
        },
        {
          category: "health",
          arabicText: "أَعُوذُ بِعِزَّةِ اللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
          translation: "يضع يده على موضع الألم ويقولها سبع مرات",
          reference: "صحيح مسلم"
        },
        {
          category: "health",
          arabicText: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللهُ",
          translation: "دعاء عند عيادة المريض",
          reference: "صحيح البخاري"
        },
        {
          category: "health",
          arabicText: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي",
          translation: "دعاء للعافية في البدن والحواس",
          reference: "سنن أبي داود"
        },
        {
          category: "health",
          arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
          translation: "دعاء للعفو والعافية",
          reference: "سنن ابن ماجه"
        },
        {
          category: "health",
          arabicText: "أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
          translation: "دعاء الشفاء المختصر",
          reference: "صحيح البخاري"
        },
        {
          category: "health",
          arabicText: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
          translation: "للوقاية من الأمراض والأضرار (3 مرات)",
          reference: "سنن أبي داود والترمذي"
        }
      ]);
    }
    
    // Seed Ward - Delete existing and re-seed with proper items
    await db.delete(dailyWard);
    await db.insert(dailyWard).values([
      { 
        title: "الإخلاص والمعوذتين وآية الكرسي", 
        arabicText: `سورة الإخلاص (٣ مرات):
قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾

سورة الفلق (٣ مرات):
قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾

سورة الناس (٣ مرات):
قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾

آية الكرسي (مرة واحدة):
اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ`, 
        translation: "Surah Al-Ikhlas (3x), Surah Al-Falaq (3x), Surah An-Nas (3x), and Ayat Al-Kursi (1x)",
        virtueHadith: "قل هو الله أحد والمعوذتين حين تمسي وحين تصبح ثلاث مرات تكفيك من كل شيء، ومن قرأ آية الكرسي دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت",
        virtueSource: "سنن أبي داود، صحيح النسائي",
        repeatCount: 1,
        sortOrder: 1
      },
      { 
        title: "آخر آيتين من سورة البقرة", 
        arabicText: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ﴿٢٨٥﴾ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ ﴿٢٨٦﴾", 
        translation: "The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers...",
        virtueHadith: "من قرأ بالآيتين من آخر سورة البقرة في ليلة كفتاه",
        virtueSource: "صحيح البخاري",
        repeatCount: 1,
        sortOrder: 2
      },
      { 
        title: "سيد الاستغفار", 
        arabicText: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", 
        translation: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can...",
        virtueHadith: "من قالها من النهار موقناً بها فمات من يومه قبل أن يمسي فهو من أهل الجنة، ومن قالها من الليل وهو موقن بها فمات قبل أن يصبح فهو من أهل الجنة",
        virtueSource: "صحيح البخاري",
        repeatCount: 1,
        sortOrder: 3
      },
      { 
        title: "سورة الملك", 
        arabicText: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ﴿١﴾ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ ﴿٢﴾ ... (اقرأ السورة كاملة)", 
        translation: "Blessed is He in whose hand is dominion, and He is over all things competent - [He] who created death and life to test you as to which of you is best in deed...",
        virtueHadith: "إن سورة من القرآن ثلاثون آية شفعت لرجل حتى غفر له، وهي: تبارك الذي بيده الملك",
        virtueSource: "سنن الترمذي",
        repeatCount: 1,
        sortOrder: 4
      }
    ]);

    // Initialize visitor counter if it doesn't exist
    const existingVisitors = await db.select().from(siteStats).where(eq(siteStats.key, 'visitors'));
    if (existingVisitors.length === 0) {
      await db.insert(siteStats).values({ key: 'visitors', value: 0 });
    }
  }

  async incrementVisitors(): Promise<number> {
    const [result] = await db
      .update(siteStats)
      .set({ value: sql`${siteStats.value} + 1` })
      .where(eq(siteStats.key, 'visitors'))
      .returning();
    return result?.value || 0;
  }

  async getVisitorCount(): Promise<number> {
    const [result] = await db.select().from(siteStats).where(eq(siteStats.key, 'visitors'));
    return result?.value || 0;
  }

  async getBukhariHadiths(page: number, limit: number, bookNumber?: number, search?: string): Promise<HadithQueryResult> {
    const offset = (page - 1) * limit;
    
    let conditions: ReturnType<typeof eq>[] = [];
    if (bookNumber) {
      conditions.push(eq(bukhariHadiths.bookNumber, bookNumber));
    }
    if (search) {
      conditions.push(ilike(bukhariHadiths.text, `%${search}%`));
    }
    
    const whereClause = conditions.length === 1 ? conditions[0] : conditions.length > 1 ? and(...conditions) : undefined;
    
    const hadiths = await db
      .select()
      .from(bukhariHadiths)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(bukhariHadiths.hadithNumber);
    
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(bukhariHadiths)
      .where(whereClause);
    
    const books = await db
      .select({
        bookNumber: bukhariHadiths.bookNumber,
        bookName: bukhariHadiths.bookName,
        count: sql<number>`count(*)`
      })
      .from(bukhariHadiths)
      .groupBy(bukhariHadiths.bookNumber, bukhariHadiths.bookName)
      .orderBy(bukhariHadiths.bookNumber);
    
    return {
      hadiths,
      total: Number(countResult?.count || 0),
      books: books.map(b => ({ bookNumber: b.bookNumber, bookName: b.bookName, count: Number(b.count) }))
    };
  }

  async getMuslimHadiths(page: number, limit: number, bookNumber?: number, search?: string): Promise<HadithQueryResult> {
    const offset = (page - 1) * limit;
    
    let conditions: ReturnType<typeof eq>[] = [];
    if (bookNumber) {
      conditions.push(eq(muslimHadiths.bookNumber, bookNumber));
    }
    if (search) {
      conditions.push(ilike(muslimHadiths.text, `%${search}%`));
    }
    
    const whereClause = conditions.length === 1 ? conditions[0] : conditions.length > 1 ? and(...conditions) : undefined;
    
    const hadiths = await db
      .select()
      .from(muslimHadiths)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(muslimHadiths.hadithNumber);
    
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(muslimHadiths)
      .where(whereClause);
    
    const books = await db
      .select({
        bookNumber: muslimHadiths.bookNumber,
        bookName: muslimHadiths.bookName,
        count: sql<number>`count(*)`
      })
      .from(muslimHadiths)
      .groupBy(muslimHadiths.bookNumber, muslimHadiths.bookName)
      .orderBy(muslimHadiths.bookNumber);
    
    return {
      hadiths,
      total: Number(countResult?.count || 0),
      books: books.map(b => ({ bookNumber: b.bookNumber, bookName: b.bookName, count: Number(b.count) }))
    };
  }

  async searchVerificationHadiths(search: string): Promise<VerificationHadith[]> {
    const results = await db
      .select()
      .from(verificationHadiths)
      .where(ilike(verificationHadiths.text, `%${search}%`))
      .limit(100);
    
    return results;
  }

  async getVerificationStats(): Promise<{ total: number; sahih: number; hasan: number; daif: number; mawdu: number }> {
    const [totalResult] = await db.select({ count: sql<number>`count(*)` }).from(verificationHadiths);
    
    const grades = await db.execute(sql`
      SELECT status, COUNT(*) as count 
      FROM verification_hadiths 
      GROUP BY status
    `);
    
    const stats = {
      total: Number(totalResult?.count || 0),
      sahih: 0,
      hasan: 0,
      daif: 0,
      mawdu: 0
    };
    
    for (const row of grades.rows as any[]) {
      if (row.status === "صحيح") stats.sahih = Number(row.count);
      else if (row.status === "حسن") stats.hasan = Number(row.count);
      else if (row.status === "ضعيف") stats.daif = Number(row.count);
      else if (row.status === "موضوع") stats.mawdu = Number(row.count);
    }
    
    return stats;
  }
}

export const storage = new DatabaseStorage();
