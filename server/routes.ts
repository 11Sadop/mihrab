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

            // Call Dorar Al-Sunniya API with timeout
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);

            let results: any[] = [];

            try {
                // st=a = all narrations, xclude=0 = include all, rawi=0 = any narrator
                const dorarUrl = `https://dorar.net/dorar_api.json?skey=${encodeURIComponent(searchKey)}&st=a&xclude=0&page=1`;
                const response = await fetch(dorarUrl, {
                    signal: controller.signal,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'application/json, text/plain, */*',
                        'Accept-Language': 'ar,en;q=0.9',
                        'Referer': 'https://dorar.net/',
                        'Origin': 'https://dorar.net',
                    }
                });
                clearTimeout(timeout);

                if (!response.ok) {
                    throw new Error("Dorar API returned " + response.status);
                }

                const data = await response.json();

                if (data.ahadith && data.ahadith.result) {
                    const htmlContent = data.ahadith.result;

                    // Try multiple parsing strategies
                    // Strategy 1: Look for hadith divs
                    const hadithRegex = /<div[^>]*class="[^"]*hadith[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
                    let match;
                    while ((match = hadithRegex.exec(htmlContent)) !== null && results.length < 20) {
                        const block = match[1];
                        const textMatch = block.match(/<span[^>]*>([\s\S]*?)<\/span>/i);
                        const narratorMatch = block.match(/الراوي\s*:\s*([^<\n]+)/i);
                        const scholarMatch = block.match(/المحدث\s*:\s*([^<\n]+)/i);
                        const sourceMatch = block.match(/المصدر\s*:\s*([^<\n]+)/i);
                        const gradeMatch = block.match(/الدرجة?\s*:\s*([^<\n]+)/i);

                        if (textMatch) {
                            results.push({
                                text: textMatch[1].replace(/<[^>]+>/g, '').trim(),
                                narrator: narratorMatch ? narratorMatch[1].trim() : '',
                                scholar: scholarMatch ? scholarMatch[1].trim() : '',
                                source: sourceMatch ? sourceMatch[1].trim() : '',
                                grade: gradeMatch ? gradeMatch[1].trim() : 'غير محدد'
                            });
                        }
                    }

                    // Strategy 2: Split by الراوي pattern
                    if (results.length === 0) {
                        const sections = htmlContent.split(/الراوي\s*:/gi);
                        for (let i = 1; i < sections.length && results.length < 20; i++) {
                            const section = sections[i];
                            const prevSection = sections[i-1];
                            // Get hadith text from end of previous section
                            const textParts = prevSection.split('>');
                            const rawText = textParts[textParts.length - 1]?.replace(/<[^>]+>/g, '').trim();
                            
                            const narratorM = section.match(/^([^<\n]+)/);
                            const scholarM = section.match(/المحدث\s*:\s*([^<\n]+)/i);
                            const sourceM = section.match(/المصدر\s*:\s*([^<\n]+)/i);
                            const gradeM = section.match(/الدرجة?\s*:\s*([^<\n]+)/i);

                            if (rawText && rawText.length > 10) {
                                results.push({
                                    text: rawText,
                                    narrator: narratorM ? narratorM[1].trim() : '',
                                    scholar: scholarM ? scholarM[1].trim() : '',
                                    source: sourceM ? sourceM[1].trim() : '',
                                    grade: gradeM ? gradeM[1].trim() : 'غير محدد'
                                });
                            }
                        }
                    }
                }

                // Strategy 3: Try structured data
                if (results.length === 0 && data.ahadith?.data) {
                    results = (data.ahadith.data || []).map((h: any) => ({
                        text: h.hadith || h.text || '',
                        narrator: h.rawi || h.narrator || '',
                        scholar: h.mohadith || h.scholar || '',
                        source: h.book || h.source || '',
                        grade: h.grade || h.hukm || 'غير محدد'
                    })).filter((h: any) => h.text.length > 5);
                }

                // Apply grade filter
                if (gradeFilter === 'sahih') {
                    results = results.filter((r: any) => {
                        const g = (r.grade || '').toLowerCase();
                        return g.includes('صحيح') || g.includes('حسن') || g.includes('جيد') || g.includes('ثابت');
                    });
                }
            } catch (fetchErr: any) {
                clearTimeout(timeout);
                console.error("Dorar fetch error:", fetchErr.message);
                // Return empty results instead of error so client can try fallback
            }

            res.json({ results, total: results.length });
        } catch (e: any) {
            console.error("Hadith verify error:", e.message);
            // Return empty results so client fallback can work
            res.json({ results: [], total: 0 });
        }
    });

    return httpServer;


}



