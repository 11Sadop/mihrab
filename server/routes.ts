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

    // Hadith Search Proxy (Dorar.net API)
    app.get("/api/hadith/search", async (req, res) => {
        const query = req.query.q as string;
        if (!query) {
            return res.status(400).json({ error: "Query parameter 'q' is required" });
        }

        try {
            const encodedQuery = encodeURIComponent(query);
            const dorarUrl = `https://dorar.net/dorar_api.json?skey=${encodedQuery}`;

            const response = await fetch(dorarUrl);
            const text = await response.text();

            // Parse JSON response
            let jsonData;
            try {
                jsonData = JSON.parse(text);
            } catch {
                // Try to extract JSON from JSONP callback
                const match = text.match(/\{[\s\S]*\}/);
                if (match) {
                    jsonData = JSON.parse(match[0]);
                } else {
                    throw new Error("Could not parse response");
                }
            }

            const ahadith: any[] = [];

            if (jsonData.ahadith && typeof jsonData.ahadith === 'string') {
                const htmlContent = jsonData.ahadith;

                // Split by hadith containers - looking for patterns in Dorar HTML
                // Common patterns: <div class="border-bottom..."> or result blocks
                const resultBlocks = htmlContent.split(/<div[^>]*class="[^"]*hadith[^"]*"[^>]*>/gi);

                // Alternative: split by common separator patterns
                const altBlocks = htmlContent.split(/<div[^>]*class="[^"]*border-bottom[^"]*"[^>]*>/gi);

                const blocks = resultBlocks.length > 1 ? resultBlocks : altBlocks.length > 1 ? altBlocks : [htmlContent];

                for (const block of blocks) {
                    if (!block.trim()) continue;

                    // Extract hadith text (usually in main-text or hadith-text class, or just plain text)
                    let hadithText = "";
                    const textMatch = block.match(/<span[^>]*class="[^"]*text[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
                    if (textMatch) {
                        hadithText = textMatch[1].replace(/<[^>]*>/g, '').trim();
                    } else {
                        // Fallback: get first significant text content
                        const plainText = block.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                        if (plainText.length > 20) {
                            hadithText = plainText.substring(0, 500);
                        }
                    }

                    if (!hadithText || hadithText.length < 10) continue;

                    // Extract grade (درجة الحديث)
                    let grade = "غير محدد";
                    const gradeMatch = block.match(/(?:صحيح|حسن|ضعيف|موضوع|إسناده صحيح|رجاله ثقات|رجاله رجال الصحيح|منكر|لا أصل له)/i);
                    if (gradeMatch) {
                        grade = gradeMatch[0];
                    }

                    // Extract narrator (الراوي)
                    let rawi = "غير معروف";
                    const rawiMatch = block.match(/الراوي[:\s]*([^<\n]+)/i);
                    if (rawiMatch) {
                        rawi = rawiMatch[1].replace(/<[^>]*>/g, '').trim();
                    }

                    // Extract source/book (المصدر)
                    let book = "غير محدد";
                    const bookMatch = block.match(/(?:المصدر|الكتاب)[:\s]*([^<\n]+)/i);
                    if (bookMatch) {
                        book = bookMatch[1].replace(/<[^>]*>/g, '').trim();
                    }

                    // Extract mohdith (المحدث)
                    let mohdith = "";
                    const mohdithMatch = block.match(/(?:المحدث|قال)[:\s]*([^<\n]+)/i);
                    if (mohdithMatch) {
                        mohdith = mohdithMatch[1].replace(/<[^>]*>/g, '').trim();
                    }

                    ahadith.push({
                        hadith: hadithText,
                        grade: grade,
                        rawi: rawi,
                        book: book,
                        mohdith: mohdith
                    });
                }
            }

            // If parsing failed, return raw data info
            if (ahadith.length === 0 && jsonData.ahadith) {
                // Try simpler extraction - just get text chunks
                const plainHtml = jsonData.ahadith;
                const simpleText = plainHtml.replace(/<[^>]*>/g, '\n').split('\n').filter((line: string) => line.trim().length > 30);

                for (let i = 0; i < Math.min(simpleText.length, 10); i++) {
                    const line = simpleText[i].trim();
                    if (line.length > 30) {
                        ahadith.push({
                            hadith: line,
                            grade: "انظر المصدر",
                            rawi: "-",
                            book: "موقع الدرر السنية",
                            mohdith: ""
                        });
                    }
                }
            }

            res.json({
                results: ahadith,
                ahadith: ahadith,
                count: ahadith.length
            });
        } catch (error: any) {
            console.error("Dorar API error:", error.message);
            res.status(500).json({ error: "Failed to fetch from Dorar API", results: [], ahadith: [] });
        }
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
    });

    app.post("/api/push/register", async (req, res) => {
        try {
            const { token, city, country, latitude, longitude } = pushRegisterSchema.parse(req.body);

            if (!token) {
                return res.status(400).json({ error: 'Token is required' });
            }

            await storage.registerPushToken(token, city, country, latitude, longitude);

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

    return httpServer;

}



