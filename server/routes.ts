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

    // Cron endpoint for prayer notifications
    app.get("/api/cron/process-prayers", async (req, res) => {
        try {
            await processPrayerNotifications();
            res.json({ success: true, message: "Prayer notifications processed" });
        } catch (e: any) {
            console.error('Error processing prayers:', e);
            res.status(500).json({ error: e.message });
        }
    });

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
                    .replace(/[\(\)\[\]\{\}«»"'`.,\/#!$%\^&\*;:{}=\-_~?؟]/g, " ")
                    .replace(/[\uFDFA\uFDFB\u0610\u0611\u0612\u0613]/g, " ") // ﷺ, ؓ, etc.
                    .replace(/\s+/g, " ")
                    .trim();
            };

            const getFallbackQuery = (text: string): string => {
                const ARABIC_STOP_WORDS = new Set([
                    "من", "عن", "ان", "في", "على", "لا", "ما", "الى", "ثم", "انه", "كان", 
                    "قال", "الله", "رسول", "صلي", "عليه", "وسلم", "يا", "ايها", "قد", "لقد",
                    "انما", "اما", "هو", "هي", "هم", "هن", "هذا", "هذه", "الذي", "التي"
                ]);
                const words = text.split(/\s+/).filter(w => w.length >= 2 && !ARABIC_STOP_WORDS.has(w));
                if (words.length <= 4) return text;
                const sortedWords = [...words].sort((a, b) => b.length - a.length);
                return sortedWords.slice(0, 4).join(" ");
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'ar,en;q=0.9',
                'Referer': 'https://dorar.net/',
            };

            const executeDorarSearch = async (queryStr: string): Promise<any[]> => {
                let list: any[] = [];
                // ═══ STRATEGY 1: Dorar JSON API (Parallel Page 1 & Page 2) ═══
                try {
                    const controller1 = new AbortController();
                    const t1 = setTimeout(() => controller1.abort(), 8000);
                    const apiUrl1 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=1`;
                    const apiUrl2 = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(queryStr)}&st=a&xclude=0&page=2`;
                    
                    const [r1, r2] = await Promise.all([
                        fetch(apiUrl1, { signal: controller1.signal, headers: { ...HEADERS, 'Accept': 'application/json, text/plain, */*' } }).catch(() => null),
                        fetch(apiUrl2, { signal: controller1.signal, headers: { ...HEADERS, 'Accept': 'application/json, text/plain, */*' } }).catch(() => null)
                    ]);
                    clearTimeout(t1);

                    const processResponse = async (resp: any) => {
                        if (!resp || !resp.ok) return [];
                        const data = await resp.json();
                        let pageResults: any[] = [];
                        if (data.ahadith?.result) {
                            const html = data.ahadith.result;
                            // Parse HTML - try div.hadith blocks first
                            const divRx = /<div[^>]*class="[^"]*hadith[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
                            let m;
                            while ((m = divRx.exec(html)) !== null && pageResults.length < 50) {
                                const block = m[1];
                                const txtM = block.match(/<span[^>]*>([\s\S]*?)<\/span>/i);
                                const narM = block.match(/الراوي\s*:\s*([^<\n]+)/i);
                                const schM = block.match(/المحدث\s*:\s*([^<\n]+)/i);
                                const srcM = block.match(/المصدر\s*:\s*([^<\n]+)/i);
                                const grdM = block.match(/الدرجة?\s*:\s*([^<\n]+)/i);
                                if (txtM) {
                                    const text = txtM[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
                                    if (text.length > 10) pageResults.push({
                                        text, narrator: narM ? narM[1].replace(/<[^>]+>/g,'').trim() : '',
                                        scholar: tlField(schM?.[1]||''), source: tlField(srcM?.[1]||''), grade: tlGrade(grdM?.[1]||'')
                                    });
                                }
                            }
                            
                            // Fallback: split by الراوي
                            if (pageResults.length === 0) {
                                const parts = html.split(/الراوي\s*:\s*/gi);
                                for (let i = 1; i < parts.length && pageResults.length < 50; i++) {
                                    const info = parts[i];
                                    const prev = parts[i-1];
                                    const chunks = prev.split('>');
                                    const text = (chunks[chunks.length-1]||'').replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,' ').trim();
                                    const narM = info.match(/^([^<\n,]+)/);
                                    const schM = info.match(/المحدث\s*:\s*([^<\n,]+)/i);
                                    const srcM = info.match(/المصدر\s*:\s*([^<\n,]+)/i);
                                    const grdM = info.match(/الدرجة?\s*:\s*([^<\n,]+)/i);
                                    if (text.length > 10) pageResults.push({
                                        text, narrator: narM?narM[1].replace(/<[^>]+>/g,'').trim():'',
                                        scholar: tlField(schM?.[1]||''), source: tlField(srcM?.[1]||''), grade: tlGrade(grdM?.[1]||'')
                                    });
                                }
                            }
                        }
                        // Structured data fallback
                        if (pageResults.length === 0 && data.ahadith?.data) {
                            return (data.ahadith.data||[]).map((h:any) => ({
                                text: (h.hadith||h.text||'').replace(/<[^>]+>/g,'').trim(),
                                narrator: (h.rawi||h.narrator||'').replace(/<[^>]+>/g,'').trim(),
                                scholar: tlField(h.mohadith||h.scholar||''), source: tlField(h.book||h.source||''),
                                grade: tlGrade(h.grade||h.hukm||'')
                            })).filter((h:any) => h.text.length > 5);
                        }
                        return pageResults;
                    };

                    const [res1, res2] = await Promise.all([
                        processResponse(r1),
                        processResponse(r2)
                    ]);
                    list = [...res1, ...res2];
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
                            const html = await r2.text();
                            // Parse the search results page
                            const parts = html.split(/الراوي\s*:\s*/gi);
                            for (let i = 1; i < parts.length && list.length < 50; i++) {
                                const info = parts[i];
                                const prev = parts[i-1];
                                
                                // Extract hadith text - look for the last text node before الراوي
                                const chunks = prev.split('>');
                                let text = '';
                                for (let c = chunks.length - 1; c >= 0; c--) {
                                    const cleaned = chunks[c].replace(/<[^>]+$/,'').replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,' ').trim();
                                    if (cleaned.length > 15 && /[\u0600-\u06FF]/.test(cleaned)) { text = cleaned; break; }
                                }
                                
                                const narM = info.match(/^([^<\n,]{2,50})/);
                                const schM = info.match(/المحدث\s*:\s*([^<\n,]+)/i);
                                const srcM = info.match(/المصدر\s*:\s*([^<\n,]+)/i);
                                const grdM = info.match(/الدرجة?\s*:\s*([^<\n,]+)/i);
                                
                                if (text.length > 10) list.push({
                                    text, narrator: narM?narM[1].replace(/<[^>]+>/g,'').trim():'',
                                    scholar: tlField(schM?.[1]||''), source: tlField(srcM?.[1]||''), grade: tlGrade(grdM?.[1]||'')
                                });
                            }
                        }
                    } catch (e: any) { console.log("Dorar HTML scrape failed:", e.message); }
                }
                return list;
            };

            let results = await executeDorarSearch(cleanedSearchKey);

            // If a long query yields 0 results, run fallback search with top 4 significant keywords
            const queryWords = cleanedSearchKey.split(/\s+/).filter(w => w.length > 0);
            if (results.length === 0 && queryWords.length > 4) {
                const fallbackQuery = getFallbackQuery(cleanedSearchKey);
                console.log(`Running fallback query search on backend: "${fallbackQuery}"`);
                results = await executeDorarSearch(fallbackQuery);
            }

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
                                        text: arabicBody.replace(/<[^>]+>/g,'').trim(),
                                        narrator: '', scholar: tlField(h.collection?.[0]?.name||''),
                                        source: tlField(h.collection?.[0]?.name||''), grade: 'غير مححدد'
                                    });
                                }
                            }
                        }
                    }
                } catch (e: any) { console.log("Sunnah API failed:", e.message); }
            }

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

            console.log(`Hadith search "${searchKey}" (Cleaned: "${cleanedSearchKey}"): ${results.length} results found`);
            res.json({ results, total: results.length });
        } catch (e: any) {
            console.error("Hadith verify error:", e.message);
            res.json({ results: [], total: 0 });
        }
    });

    return httpServer;


}



