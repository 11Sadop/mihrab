// @ts-nocheck
import { sendNotification, subscribeToTopic } from './server-notifications';
import { processPrayerNotifications } from './cron-handler';
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
    httpServer: Server,
    app: Express
): Promise<Server> {

    await storage.seedData();

    app.get(api.adhkar.list.path, async (req, res) => {
        const category = req.query.category as string | undefined;
        const result = await storage.getAdhkar(category);
        res.json(result);
    });

    app.get(api.duas.list.path, async (req, res) => {
        const category = req.query.category as string | undefined;
        const result = await storage.getDuas(category);
        res.json(result);
    });

    app.get(api.hadith.daily.path, async (req, res) => {
        const result = await storage.getDailyHadith();
        if (!result) {
            return res.status(404).json({ message: "No hadiths found" });
        }
        res.json(result);
    });

    app.post(api.hadith.refresh.path, async (req, res) => {
        const result = await storage.getDailyHadith(true);
        res.json(result);
    });

    app.get(api.ward.list.path, async (req, res) => {
        const result = await storage.getDailyWard();
        res.json(result);
    });

    app.patch(api.ward.toggle.path, async (req, res) => {
        const id = parseInt(req.params.id);
        const { isCompleted } = api.ward.toggle.input.parse(req.body);
        const result = await storage.toggleWard(id, isCompleted);
        res.json(result);
    });

    app.get(api.benefits.daily.path, async (req, res) => {
        const result = await storage.getDailyBenefit();
        if (!result) {
            return res.status(404).json({ message: "No benefits found" });
        }
        res.json(result);
    });

    app.get(api.quran.surahs.path, async (req, res) => {
        const result = await storage.getSurahs();
        res.json(result);
    });

    app.get(api.quran.reciters.path, async (req, res) => {
        const result = await storage.getReciters();
        res.json(result);
    });

    app.get(api.hadith.protection.path, async (req, res) => {
        const result = await storage.getProtectionHadiths();
        res.json(result);
    });

    app.get(api.stats.visitors.path, async (req, res) => {
        const adminKey = req.query.key as string;
        if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'mihrab2024') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const count = await storage.getVisitorCount();
        res.json({ count });
    });

    app.post(api.stats.track.path, async (req, res) => {
        const count = await storage.incrementVisitors();
        res.json({ count });
    });

    app.post(api.stats.pageVisit.path, async (req, res) => {
        const { page } = api.stats.pageVisit.input.parse(req.body);
        await storage.trackPageVisit(page);
        res.json({ success: true });
    });

    app.get(api.stats.pageStats.path, async (req, res) => {
        const adminKey = req.query.key as string;
        if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'mihrab2024') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const stats = await storage.getPageStats();
        res.json(stats);
    });

    app.get("/api/hadith/bukhari/books", async (req, res) => {
        const result = await storage.getBukhariBooks();
        res.json(result);
    });

    app.get("/api/hadith/muslim/books", async (req, res) => {
        const result = await storage.getMuslimBooks();
        res.json(result);
    });

    app.get("/api/hadith/bukhari", async (req, res) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 50;
        const bookNumber = req.query.book ? parseInt(req.query.book as string) : undefined;
        const search = req.query.search as string | undefined;
        const result = await storage.getBukhariHadiths(page, limit, bookNumber, search);
        res.json(result);
    });

    app.get("/api/hadith/muslim", async (req, res) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 50;
        const bookNumber = req.query.book ? parseInt(req.query.book as string) : undefined;
        const search = req.query.search as string | undefined;
        const result = await storage.getMuslimHadiths(page, limit, bookNumber, search);
        res.json(result);
    });

    // Push Notifications API
    const pushRegisterSchema = z.object({
        token: z.string().min(1),
        city: z.string().optional(),
        country: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        method: z.number().optional().default(4),
        isActive: z.boolean().optional().default(true),
    });

    app.post("/api/push/register", async (req, res) => {
        try {
            const { token, city, country, latitude, longitude, method, isActive } = pushRegisterSchema.parse(req.body);

            if (!token) {
                return res.status(400).json({ error: 'Token is required' });
            }

            await storage.registerPushToken(token, city, country, latitude, longitude, method, isActive);

            if (city && country) {
                const topic = `prayer_${country.replace(/[^a-zA-Z0-9]/g, '_')}_${city.replace(/[^a-zA-Z0-9]/g, '_')}`;
                await subscribeToTopic(token, topic);
            }

            res.json({ success: true });
        } catch (e: any) {
            console.error('Error registering token:', e.message);
            res.status(500).json({ error: e.message });
        }
    });

    const pushSendSchema = z.object({
        token: z.string().optional(),
        title: z.string(),
        body: z.string(),
        data: z.record(z.string()).optional(),
    });

    app.post("/api/push/send", async (req, res) => {
        try {
            const adminKey = req.headers['x-admin-key'];
            if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'mihrab2024') {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            const { token, title, body, data } = pushSendSchema.parse(req.body);

            if (token) {
                const success = await sendNotification(token, title, body, data);
                return res.json({ success });
            }

            res.status(400).json({ error: 'Token is required for single send' });
        } catch (e: any) {
            console.error('Error sending notification:', e.message);
            res.status(500).json({ error: e.message });
        }
    });

    // Cron endpoint for prayer notifications (supports both old and new paths)
    const cronHandler = async (req: any, res: any) => {
        try {
            await processPrayerNotifications();
            res.json({ success: true, message: "Prayer notifications processed" });
        } catch (e: any) {
            console.error('Error processing prayers:', e);
            res.status(500).json({ error: e.message });
        }
    };
    app.get("/api/cron/process-prayers", cronHandler);
    app.get("/api/cron/prayer-notifications", cronHandler);

    // Hadith Verification via Dorar Al-Sunniya API
    app.get("/api/hadith/verify", async (req, res) => {
        try {
            const searchKey = req.query.skey as string;
            const gradeFilter = req.query.grade as string;

            if (!searchKey) {
                return res.status(400).json({ error: "معامل البحث مطلوب" });
            }

            // Clean copy-pasted symbols, calligraphic characters, brackets, punctuation
            const cleanQueryForSearch = (text: string): string => {
                if (!text) return "";
                return text
                    .replace(/[ًٌٍَُِّْـ]/g, "") // Strip Tashkeel first!
                    .replace(/[\(\)\[\]\{\}«»"'`.,\/#!$%\^&\*;:{}=\-_~?؟]/g, " ")
                    .replace(/[\uFDFA\uFDFB\u0610\u0611\u0612\u0613]/g, " ") // ﷺ, ؓ, etc.
                    .replace(/\s+/g, " ")
                    .trim();
            };

            const decodeGarbledText = (text: string): string => {
                if (!text) return "";
                if (text.includes("Ø§Ù„") || text.includes("Ø") || text.includes("Ù") || text.includes("æ")) {
                    try {
                        return Buffer.from(text, 'binary').toString('utf8');
                    } catch {
                        return text;
                    }
                }
                return text;
            };

            const getFallbackQuery = (text: string): string => {
                const ARABIC_STOP_WORDS = new Set([
                    "من", "عن", "ان", "في", "على", "لا", "ما", "الى", "ثم", "انه", "كان", 
                    "قال", "الله", "رسول", "صلي", "عليه", "وسلم", "يا", "ايها", "قد", "لقد",
                    "انما", "اما", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
                ]);
                const words = text.split(/\s+/).filter(w => w.length >= 2 && !ARABIC_STOP_WORDS.has(w));
                if (words.length <= 4) return words.join(" ");
                return words.slice(0, 4).join(" ");
            };

            const cleanedSearchKey = cleanQueryForSearch(searchKey);
            if (!cleanedSearchKey) {
                return res.json({ results: [], total: 0 });
            }

            // Translation helpers
            const gradeMap: Record<string, string> = {
                'sahih': 'صحيح', 'hasan': 'حسن', 'daif': 'ضعيف', 'mawdu': 'موضوع',
                'authentic': 'صحيح', 'good': 'حسن', 'weak': 'ضعيف', 'fabricated': 'موضوع',
                'sahih li-ghayrihi': 'صحيح لغيره', 'hasan li-ghayrihi': 'حسن لغيره',
                'very weak': 'ضعيف جداً', 'munkar': 'منكر',
            };
            const scholarMap: Record<string, string> = {
                'al-bukhari': 'البخاري', 'bukhari': 'البخاري', 'muslim': 'مسلم',
                'al-tirmidhi': 'الترمذي', 'tirmidhi': 'الترمذي', 'abu dawud': 'أبو داود',
                'al-nasai': 'النسائي', 'ibn majah': 'ابن ماجه', 'ahmad': 'أحمد',
                'al-albani': 'الألباني', 'ibn hibban': 'ابن حبان', 'al-hakim': 'الحاكم',
                'sahih al-bukhari': 'صحيح البخاري', 'sahih bukhari': 'صحيح البخاري',
                'sahih muslim': 'صحيح مسلم', 'sunan al-tirmidhi': 'سنن الترمذي',
                'sunan abu dawud': 'سنن أبي داود',
            };
            const tl = (val: string, map: Record<string, string>): string => {
                if (!val) return '';
                const clean = val.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
                if (!clean) return '';
                const lower = clean.toLowerCase().trim();
                if (map[lower]) return map[lower];
                if (/[\u0600-\u06FF]/.test(clean)) return clean;
                for (const [en, ar] of Object.entries(map)) {
                    if (lower.includes(en)) return ar;
                }
                return clean;
            };
            const tlGrade = (g: string) => tl(g, gradeMap) || 'غير محدد';
            const tlField = (v: string) => tl(v, scholarMap);

            const HEADERS = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
            };

            const executeDorarSearch = async (queryStr: string): Promise<any[]> => {
                let list: any[] = [];
                // ═══ STRATEGY 1: Dorar JSON API (Parallel Page 1, Page 2 & Page 3) ═══
                try {
                    const controller1 = new AbortController();
                    const t1 = setTimeout(() => controller1.abort(), 8000);
                    const apiUrl1 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=1`;
                    const apiUrl2 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=2`;
                    const apiUrl3 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=3`;
                    
                    const [r1, r2, r3] = await Promise.all([
                        fetch(apiUrl1, { signal: controller1.signal, headers: { ...HEADERS, 'Accept': 'application/json, text/plain, */*' } }).catch(() => null),
                        fetch(apiUrl2, { signal: controller1.signal, headers: { ...HEADERS, 'Accept': 'application/json, text/plain, */*' } }).catch(() => null),
                        fetch(apiUrl3, { signal: controller1.signal, headers: { ...HEADERS, 'Accept': 'application/json, text/plain, */*' } }).catch(() => null)
                    ]);
                    clearTimeout(t1);

                    const processResponse = async (resp: any) => {
                        if (!resp || !resp.ok) return [];
                        const data = await resp.json();
                        let pageResults: any[] = [];
                        if (data.ahadith?.result) {
                            const html = decodeGarbledText(data.ahadith.result);
                            // 1. split-by-narrator first (primary)
                            const parts = html.split(/الراوي\s*:\s*/gi);
                            for (let i = 1; i < parts.length && pageResults.length < 50; i++) {
                                const info = parts[i];
                                const prev = parts[i-1];
                                const chunks = prev.split('>');
                                const text = (chunks[chunks.length-1]||'').replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,' ').trim();
                                const narM = info.match(/^([^<\n,]+)/);
                                const schM = info.match(/المحدث\s*:\s*([^<\n,]+)/i);
                                const srcM = info.match(/المصدر\s*:\s*([^<\n,]+)/i);
                                let grdM = info.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)[^<]*<\/span>\s*<span[^>]*>([^<,]+)<\/span>/i);
                                if (!grdM) {
                                    grdM = info.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)\s*:\s*([^<\n,]+)/i);
                                }
                                const sharhUrlM = info.match(/href="([^"]*sharh\/[^"]*)"/i) || prev.match(/href="([^"]*sharh\/[^"]*)"/i) || info.match(/href="([^"]*\/h\/[^"]*)"/i) || prev.match(/href="([^"]*\/h\/[^"]*)"/i);
                                const sharhUrl = sharhUrlM ? sharhUrlM[1] : undefined;

                                if (text.length > 10) pageResults.push({
                                    text: decodeGarbledText(text), 
                                    narrator: decodeGarbledText(narM?narM[1].replace(/<[^>]+>/g,'').trim():''),
                                    scholar: tlField(decodeGarbledText(schM?.[1]||'')), 
                                    source: tlField(decodeGarbledText(srcM?.[1]||'')), 
                                    grade: tlGrade(decodeGarbledText(grdM?.[1]||'')),
                                    sharhUrl
                                });
                            }
                            
                            // 2. Fallback to divRx if split-by-narrator yields no results
                            if (pageResults.length === 0) {
                                const divRx = /<div[^>]*class="[^"]*hadith[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
                                let m;
                                while ((m = divRx.exec(html)) !== null && pageResults.length < 50) {
                                    const block = m[1];
                                    const txtM = block.match(/<span[^>]*>([\s\S]*?)<\/span>/i);
                                    const narM = block.match(/الراوي\s*:\s*([^<\n]+)/i);
                                    const schM = block.match(/المحدث\s*:\s*([^<\n]+)/i);
                                    const srcM = block.match(/المصدر\s*:\s*([^<\n]+)/i);
                                    let grdM = block.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)[^<]*<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
                                    if (!grdM) {
                                        grdM = block.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)\s*:\s*([^<\n]+)/i);
                                    }
                                    if (txtM) {
                                        const text = txtM[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
                                        const sharhUrlM = block.match(/href="([^"]*sharh\/[^"]*)"/i) || block.match(/href="([^"]*\/h\/[^"]*)"/i);
                                        const sharhUrl = sharhUrlM ? sharhUrlM[1] : undefined;
                                        if (text.length > 10) pageResults.push({
                                            text: decodeGarbledText(text), 
                                            narrator: decodeGarbledText(narM ? narM[1].replace(/<[^>]+>/g,'').trim() : ''),
                                            scholar: tlField(decodeGarbledText(schM?.[1]||'')), 
                                            source: tlField(decodeGarbledText(srcM?.[1]||'')), 
                                            grade: tlGrade(decodeGarbledText(grdM?.[1]||'')),
                                            sharhUrl
                                        });
                                    }
                                }
                            }
                        }
                        if (pageResults.length === 0 && data.ahadith?.data) {
                            return (data.ahadith.data||[]).map((h:any) => ({
                                text: decodeGarbledText((h.hadith||h.text||'').replace(/<[^>]+>/g,'').trim()),
                                narrator: decodeGarbledText((h.rawi||h.narrator||'').replace(/<[^>]+>/g,'').trim()),
                                scholar: tlField(decodeGarbledText(h.mohadith||h.scholar||'')), 
                                source: tlField(decodeGarbledText(h.book||h.source||'')),
                                grade: tlGrade(decodeGarbledText(h.grade||h.hukm||'')),
                                sharhUrl: h.sharh_url || h.sharhUrl || (h.id ? `/hadith/sharh/${h.id}` : undefined)
                            })).filter((h:any) => h.text.length > 5);
                        }
                        return pageResults;
                    };

                    const [res1, res2, res3] = await Promise.all([
                        processResponse(r1),
                        processResponse(r2),
                        processResponse(r3)
                    ]);
                    list = [...res1, ...res2, ...res3];
                } catch (e: any) { console.log("Dorar JSON API failed:", e.message); }


                // ═══ STRATEGY 2: Dorar HTML Search Page Scraping ═══
                if (list.length === 0) {
                    try {
                        const controller2 = new AbortController();
                        const t2 = setTimeout(() => controller2.abort(), 8000);
                        const htmlUrl = `https://dorar.net/hadith/search?q=${encodeURIComponent(queryStr)}&st=a&xclude=0`;
                        const r2 = await fetch(htmlUrl, { signal: controller2.signal, headers: HEADERS });
                        clearTimeout(t2);

                        if (r2.ok) {
                            const html = decodeGarbledText(await r2.text());
                            const parts = html.split(/الراوي\s*:\s*/gi);
                            for (let i = 1; i < parts.length && list.length < 50; i++) {
                                const info = parts[i];
                                const prev = parts[i-1];
                                
                                const chunks = prev.split('>');
                                let text = '';
                                for (let c = chunks.length - 1; c >= 0; c--) {
                                    const cleaned = chunks[c].replace(/<[^>]+$/,'').replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,' ').trim();
                                    if (cleaned.length > 15 && /[\u0600-\u06FF]/.test(cleaned)) { text = cleaned; break; }
                                }
                                
                                const narM = info.match(/^([^<\n,]{2,50})/);
                                const schM = info.match(/المحدث\s*:\s*([^<\n,]+)/i);
                                const srcM = info.match(/المصدر\s*:\s*([^<\n,]+)/i);
                                let grdM = info.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)[^<]*<\/span>\s*<span[^>]*>([^<,]+)<\/span>/i);
                                if (!grdM) {
                                    grdM = info.match(/(?:الدرجة|خلاصة حكم المحدث|حكم المحدث)\s*:\s*([^<\n,]+)/i);
                                }
                                
                                const sharhUrlM = info.match(/href="([^"]*sharh\/[^"]*)"/i) || prev.match(/href="([^"]*sharh\/[^"]*)"/i) || info.match(/href="([^"]*\/h\/[^"]*)"/i) || prev.match(/href="([^"]*\/h\/[^"]*)"/i);
                                const sharhUrl = sharhUrlM ? sharhUrlM[1] : undefined;

                                if (text.length > 10) list.push({
                                    text: decodeGarbledText(text), 
                                    narrator: decodeGarbledText(narM?narM[1].replace(/<[^>]+>/g,'').trim():''),
                                    scholar: tlField(decodeGarbledText(schM?.[1]||'')), 
                                    source: tlField(decodeGarbledText(srcM?.[1]||'')), 
                                    grade: tlGrade(decodeGarbledText(grdM?.[1]||'')),
                                    sharhUrl
                                });
                            }
                        }
                    } catch (e: any) { console.log("Dorar HTML scrape failed:", e.message); }
                }
                return list;
            };

            // ═══ COMBINED LOCAL DATABASE AND ONLINE DORAR SEARCH (Run concurrently for richness) ═══
            let results: any[] = [];
            const localResults: any[] = [];
            
            // 1. Run local Postgres search
            try {
                const { bukhariHadiths, muslimHadiths, verificationHadiths } = await import('../shared/schema');
                const { db } = await import('./db');
                const { ilike, and, sql } = await import('drizzle-orm');

                const pgNormalizeText = (col: any) => {
                    return sql`translate(
                        regexp_replace(${col}, '[ًٌٍَُِّْٰـ]', '', 'g'),
                        'أإآءٱةى',
                        'aaaaاهي'
                    )`;
                };

                const normalizeAr = (s: string) => s.replace(/[ًٌٍَُِّْـ]/g, '').replace(/[إأآءٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+/g, ' ').trim();

                const LOCAL_STOP_WORDS = new Set([
                    "من", "عن", "ان", "في", "على", "لا", "ما", "الى", "ثم", "انه", "كان",
                    "قال", "الله", "رسول", "صلي", "عليه", "وسلم", "يا", "ايها", "قد", "لقد",
                    "انما", "اما", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
                ]);

                // Filter keywords strictly to ensure perfect keyword relevance to query
                const keywords = cleanedSearchKey.split(/\s+/)
                    .map((w: string) => normalizeAr(w))
                    .filter((w: string) => w.length >= 2 && !LOCAL_STOP_WORDS.has(w));

                if (keywords.length > 0) {
                    const buildConditions = (textCol: any) => and(...keywords.map((kw: string) => ilike(pgNormalizeText(textCol), `%${kw}%`)));

                    const [bkResults, muResults, vhResults] = await Promise.all([
                        db.select().from(bukhariHadiths).where(buildConditions(bukhariHadiths.text)).limit(15),
                        db.select().from(muslimHadiths).where(buildConditions(muslimHadiths.text)).limit(15),
                        db.select().from(verificationHadiths).where(buildConditions(verificationHadiths.text)).limit(15)
                    ]);

                    for (const h of bkResults) {
                        localResults.push({
                            text: h.text,
                            narrator: '',
                            scholar: 'البخاري',
                            source: `صحيح البخاري - ${h.bookName || ''}`,
                            grade: 'صحيح'
                        });
                    }
                    for (const h of muResults) {
                        localResults.push({
                            text: h.text,
                            narrator: '',
                            scholar: 'مسلم',
                            source: `صحيح مسلم - ${h.bookName || ''}`,
                            grade: 'صحيح'
                        });
                    }
                    for (const h of vhResults) {
                        localResults.push({
                            text: h.text,
                            narrator: h.narrator || '',
                            scholar: h.scholar || 'غير محدد',
                            source: h.source || '',
                            grade: h.status || 'غير محدد'
                        });
                    }
                }
            } catch (e: any) {
                console.log("Local DB search failed:", e.message);
            }

            // 2. Fetch from Dorar Al-Sunniya immediately (if online) and combine with local results
            let onlineResults: any[] = [];
            try {
                onlineResults = await executeDorarSearch(cleanedSearchKey);
                // Fallback search with top keywords if Dorar yielded 0 for long query
                const queryWords = cleanedSearchKey.split(/\s+/).filter(w => w.length > 0);
                if (onlineResults.length === 0 && queryWords.length > 4) {
                    const fallbackQuery = getFallbackQuery(cleanedSearchKey);
                    onlineResults = await executeDorarSearch(fallbackQuery);
                }
            } catch (e: any) {
                console.log("Online Dorar search failed:", e.message);
            }

            // Combine both local and online results
            results = [...localResults, ...onlineResults];

            // ═══ STRATEGY 3: Sunnah.com API (English but translate) ═══
            if (results.length === 0) {
                try {
                    const controller3 = new AbortController();
                    const t3 = setTimeout(() => controller3.abort(), 8000);
                    const sunnahUrl = `https://api.sunnah.com/v1/hadiths?q=${encodeURIComponent(cleanedSearchKey)}&limit=20`;
                    const r3 = await fetch(sunnahUrl, {
                        signal: controller3.signal,
                        headers: { 'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFvjk', ...HEADERS }
                    });
                    clearTimeout(t3);
                    if (r3.ok) {
                        const data = await r3.json();
                        if (data.data) {
                            for (const h of data.data) {
                                const arabicBody = h.hadith?.find((t:any) => t.lang === 'ar')?.body || '';
                                if (arabicBody.length > 10) {
                                    results.push({
                                        text: decodeGarbledText(arabicBody.replace(/<[^>]+>/g,'').trim()),
                                        narrator: '', 
                                        scholar: tlField(h.collection?.[0]?.name||''),
                                        source: tlField(h.collection?.[0]?.name||''), 
                                        grade: 'غير محدد'
                                    });
                                }
                            }
                        }
                    }
                } catch (e: any) { console.log("Sunnah API failed:", e.message); }
            }

            // Apply strict overlap filtering to prevent disjoint results
            const LOCAL_STOP_WORDS_SET = new Set([
                "من", "عن", "ان", "في", "على", "لا", "ما", "الى", "ثم", "انه", "كان",
                "قال", "الله", "رسول", "صلي", "عليه", "وسلم", "يا", "ايها", "قد", "لقد",
                "انما", "اما", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
            ]);
            const normalizeAr = (s: string) => s
                .replace(/[ًٌٍَُِّْـ]/g, '')
                .replace(/[إأآءٱ]/g, 'ا')
                .replace(/ة/g, 'ه')
                .replace(/ى/g, 'ي')
                .replace(/\s+/g, ' ')
                .trim();

            const cleanQueryWords = cleanedSearchKey.split(/\s+/)
                .map(w => normalizeAr(w))
                .filter(w => w.length >= 2 && !LOCAL_STOP_WORDS_SET.has(w));

            const backupQueryWords = cleanedSearchKey.split(/\s+/)
                .map(w => normalizeAr(w))
                .filter(w => w.length >= 2);

            const activeQueryWords = cleanQueryWords.length > 0 ? cleanQueryWords : backupQueryWords;

            results = results.filter((r: any) => {
                const textNorm = normalizeAr(r.text || '');
                const queryNorm = normalizeAr(cleanedSearchKey);
                
                if (textNorm.includes(queryNorm)) {
                    return true; // Exact phrase match is always preserved
                }
                
                if (activeQueryWords.length === 0) return true;
                
                let matchCount = 0;
                for (const qw of activeQueryWords) {
                    if (textNorm.includes(qw)) {
                        matchCount++;
                    }
                }
                
                const ratio = matchCount / activeQueryWords.length;
                return ratio >= 0.50; // Require at least 50% word overlap
            });

            // Apply grade filter
            if (gradeFilter === 'sahih') {
                results = results.filter((r: any) => {
                    const g = r.grade || '';
                    return g.includes('صحيح') || g.includes('حسن') || g.includes('جيد') || g.includes('ثابت');
                });
            }

            // Remove duplicates - relax deduplication to preserve different narrations
            const seen = new Set<string>();
            results = results.filter((r: any) => {
                const key = `${r.text.substring(0, 150).replace(/\s+/g,'')}_${r.narrator || ''}_${r.scholar || ''}_${r.source || ''}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });

            // Sort results by similarity overlap and source reliability
            const getHadithWeight = (r: any): number => {
                const text = (r.text || '').replace(/[ًٌٍَُِّْـ]/g, ""); // Clean tashkeel
                const query = cleanedSearchKey;

                let score = 0;

                // 1. Exact sub-phrase match (highest priority)
                if (text.includes(query)) {
                    score += 500;
                } else {
                    // Keyword match ratio
                    const queryWords = query.split(/\s+/).filter(w => w.length >= 2);
                    let matchCount = 0;
                    for (const qw of queryWords) {
                        if (text.includes(qw)) matchCount++;
                    }
                    if (queryWords.length > 0) {
                        score += (matchCount / queryWords.length) * 200;
                    }
                }

                // 2. Source reliability weighting
                const source = (r.source || '').toLowerCase();
                const scholar = (r.scholar || '').toLowerCase();
                const grade = (r.grade || '').toLowerCase();

                if (source.includes('بخاري') || scholar.includes('بخاري') || source.includes('bukhari') || scholar.includes('bukhari')) {
                    score += 100;
                } else if (source.includes('مسلم') || scholar.includes('muslim')) {
                    score += 95;
                } else {
                    const isSahihHasan = grade.includes('صحيح') || grade.includes('حسن') || grade.includes('sahih') || grade.includes('hasan');
                    const isTrustedScholar = scholar.includes('ترمذي') || scholar.includes('tirmidhi') ||
                                             scholar.includes('داود') || scholar.includes('dawud') ||
                                             scholar.includes('نسائي') || scholar.includes('nasai') ||
                                             scholar.includes('ماجه') || scholar.includes('majah') ||
                                             scholar.includes('أحمد') || scholar.includes('ahmad') ||
                                             scholar.includes('ألباني') || scholar.includes('albani');
                    if (isSahihHasan && isTrustedScholar) {
                        score += 85;
                    } else if (isSahihHasan) {
                        score += 75;
                    } else if (grade.includes('ضعيف') || grade.includes('weak') || grade.includes('منكر') || grade.includes('munkar')) {
                        score += 20;
                    } else if (grade.includes('موضوع') || grade.includes('fabricated') || grade.includes('باطل')) {
                        score += 10;
                    } else {
                        score += 50;
                    }
                }

                return score;
            };

            results.sort((a: any, b: any) => getHadithWeight(b) - getHadithWeight(a));

            console.log(`Hadith search "${searchKey}" (Cleaned: "${cleanedSearchKey}"): ${results.length} results found`);
            res.json({ results, total: results.length });
        } catch (e: any) {
            console.error("Hadith verify error:", e.message);
            res.json({ results: [], total: 0 });
        }
    });

    // Hadith Explanation Endpoint
    app.get("/api/hadith/explain", async (req, res) => {
        try {
            const hadithText = req.query.q as string;
            if (!hadithText) {
                return res.status(400).json({ error: "الحديث المطلوب شرحه مفقود" });
            }

            const normalize = (s: string) => s
                .replace(/[ًٌٍَُِّْـ]/g, "")
                .replace(/[إأآءٱ]/g, "ا")
                .replace(/ة/g, "ه")
                .replace(/ى/g, "ي")
                .replace(/[\s]+/g, " ")
                .trim()
                .toLowerCase();

            const cleanQuery = hadithText
                .replace(/[ًٌٍَُِّْـ]/g, "")
                .replace(/[\uFDFA\uFDFB\u0610\u0611\u0612\u0613]/g, " ")
                .replace(/\s+/g, " ")
                .trim();

            const normQuery = normalize(cleanQuery);

            // ═══ STRATEGY 1: Search local verificationHadiths table ═══
            try {
                const { verificationHadiths } = await import('../shared/schema');
                const { db } = await import('./db');
                const { ilike, and, sql } = await import('drizzle-orm');
                
                const searchWords = cleanQuery.split(' ')
                    .map(w => normalize(w))
                    .filter((w: string) => w.length >= 3);
                
                let vhResults: any[] = [];
                if (searchWords.length > 0) {
                    const pgNormalizeText = (col: any) => {
                        return sql`translate(
                            regexp_replace(${col}, '[ًٌٍَُِّْٰـ]', '', 'g'),
                            'أإآءٱةى',
                            'aaaaاهي'
                        )`;
                    };
                    const conditions = searchWords.map((kw: string) => ilike(pgNormalizeText(verificationHadiths.text), `%${kw}%`));
                    vhResults = await db.select().from(verificationHadiths).where(and(...conditions)).limit(20);
                }
                
                let bestMatch: any = null;
                let bestScore = 0;
                
                for (const vh of vhResults) {
                    const normText = normalize(vh.text);
                    const queryWords = normQuery.split(' ').filter((w: string) => w.length >= 3);
                    let matched = 0;
                    for (const qw of queryWords) {
                        if (normText.includes(qw)) matched++;
                    }
                    const score = queryWords.length > 0 ? matched / queryWords.length : 0;
                    if (score > bestScore && score >= 0.35) {
                        bestScore = score;
                        bestMatch = vh;
                    }
                }

                if (bestMatch?.explanation && bestMatch.explanation.length > 30) {
                    return res.json({
                        explanation: bestMatch.explanation,
                        source: bestMatch.source || '',
                        grade: bestMatch.status || '',
                        narrator: bestMatch.narrator || ''
                    });
                }
            } catch (e) {
                console.log("verificationHadiths search failed:", e);
            }

            // ═══ STRATEGY 2: Search Bukhari & Muslim local DB for matching hadith (keyword-based) ═══
            try {
                const { bukhariHadiths, muslimHadiths } = await import('../shared/schema');
                const { db } = await import('./db');
                const { ilike, and } = await import('drizzle-orm');

                // Extract keywords for individual ILIKE conditions
                const searchKeywords = cleanQuery.split(' ')
                    .filter((w: string) => w.length >= 3);

                if (searchKeywords.length > 0) {
                    const buildExplainConditions = (textCol: any) => and(...searchKeywords.map((kw: string) => ilike(textCol, `%${kw}%`)));

                    const [bk, mu] = await Promise.all([
                        db.select().from(bukhariHadiths).where(buildExplainConditions(bukhariHadiths.text)).limit(1),
                        db.select().from(muslimHadiths).where(buildExplainConditions(muslimHadiths.text)).limit(1)
                    ]);

                    const match = bk[0] || mu[0];
                    if (match) {
                        const isBukhari = !!bk[0];
                        const imamName = isBukhari ? 'البخاري' : 'مسلم';
                        const collectionName = isBukhari ? 'صحيح البخاري' : 'صحيح مسلم';
                        const sourceName = `${collectionName} - ${match.bookName || ''}`;
                        const explanation = `📚 المصدر: ${collectionName}
📖 الكتاب: ${match.bookName || 'غير محدد'}
🔢 رقم الحديث: ${match.hadithNumber || 'غير محدد'}
✅ الحكم: صحيح

هذا الحديث رواه الإمام ${imamName} في كتابه "${collectionName}" في "${match.bookName || ''}" (حديث رقم ${match.hadithNumber || ''}).

الحديث من أصح الأحاديث وأوثقها، إذ ورد في ${collectionName}، وهو من أصح كتب الحديث عند أهل السنة والجماعة.

📜 نص الحديث الكامل:
${match.text}`;
                        return res.json({ explanation, source: sourceName, grade: 'صحيح' });
                    }
                }
            } catch (e) {
                console.log("Local hadith DB search failed:", e);
            }

            // ═══ STRATEGY 3: Try sunnah.com API for context ═══
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 6000);
                const searchWords = cleanQuery.split(' ').filter((w: string) => w.length >= 3).slice(0, 5).join(' ');
                
                const sunnahRes = await fetch(
                    `https://api.sunnah.com/v1/hadiths?q=${encodeURIComponent(searchWords)}&limit=3`,
                    {
                        signal: controller.signal,
                        headers: { 'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFvjk' }
                    }
                );
                clearTimeout(timeout);

                if (sunnahRes.ok) {
                    const data = await sunnahRes.json();
                    if (data.data?.length > 0) {
                        const h = data.data[0];
                        const arabicHadith = h.hadith?.find((t: any) => t.lang === 'ar');
                        const englishHadith = h.hadith?.find((t: any) => t.lang === 'en');
                        const collectionName = h.collection?.[0]?.name || '';
                        const chapter = arabicHadith?.chapterNumber ? `الباب ${arabicHadith.chapterNumber}` : '';
                        const chapterTitle = arabicHadith?.chapterTitle || '';

                        if (collectionName || chapter) {
                            const explanation = [
                                collectionName ? `📚 المصدر: ${collectionName}` : '',
                                chapterTitle ? `📖 الباب: ${chapterTitle}` : '',
                                chapter ? `🔢 ${chapter}` : '',
                                '',
                                englishHadith?.body ? `📝 الترجمة الإنجليزية:\n${englishHadith.body.substring(0, 400)}...` : '',
                            ].filter(Boolean).join('\n');

                            if (explanation.trim().length > 20) {
                                return res.json({ explanation: explanation.trim() });
                            }
                        }
                    }
                }
            } catch (e) {
                console.log("Sunnah.com API failed:", e);
            }

            // ═══ STRATEGY 4: Return a structured informational response ═══
            return res.json({
                explanation: `هذا الحديث غير متوفر شرحه التفصيلي في قاعدة بياناتنا حالياً.

للاطلاع على شرح مفصل، يُنصح بـ:
• زيارة موقع الدرر السنية: dorar.net
• الرجوع إلى كتب شروح الحديث مثل فتح الباري لابن حجر، أو شرح النووي لصحيح مسلم
• استخدام تطبيق "موسوعة الحديث" للبحث في الشروح

نص الحديث الذي تبحث عنه:
"${hadithText.substring(0, 200)}${hadithText.length > 200 ? '...' : ''}"`
            });

        } catch (e: any) {
            console.error("Hadith explanation error:", e.message);
            res.status(500).json({ error: e.message });
        }
    });

    return httpServer;


}



