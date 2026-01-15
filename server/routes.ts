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

    // Hadith Search Proxy (direct Dorar.net fetching with HTML parsing)
    app.get("/api/hadith/search", async (req, res) => {
        const query = req.query.q as string;
        if (!query) {
            return res.status(400).json({ error: "Query parameter 'q' is required" });
        }

        try {
            const encodedQuery = encodeURIComponent(query);

            // Fetch directly from Dorar's search page
            const dorarUrl = `https://dorar.net/hadith/search?q=${encodedQuery}`;

            const response = await fetch(dorarUrl, {
                headers: {
                    'Accept': 'text/html,application/xhtml+xml',
                    'User-Agent': 'Mozilla/5.0 (compatible; MihrabApp/1.0)',
                    'Accept-Language': 'ar'
                }
            });

            if (!response.ok) {
                throw new Error(`Dorar returned status ${response.status}`);
            }

            const html = await response.text();
            const ahadith: any[] = [];

            // Parse the HTML to extract hadiths
            // Look for hadith results in the page
            const hadithMatches = html.matchAll(/<div[^>]*class="[^"]*hadith[^"]*"[^>]*>([\s\S]*?)<\/div>/gi);

            for (const match of hadithMatches) {
                const block = match[1];
                if (!block || block.length < 50) continue;

                // Extract text content
                const textContent = block.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                if (textContent.length < 30) continue;

                // Extract grade
                const gradeMatch = textContent.match(/(صحيح|حسن|ضعيف|موضوع|إسناده صحيح|رجاله ثقات|رجاله رجال الصحيح|لا أصل له|منكر)/);
                const grade = gradeMatch ? gradeMatch[1] : "انظر المصدر";

                // Extract narrator
                const rawiMatch = textContent.match(/الراوي\s*[:\s]*([^،\n]+)/);
                const rawi = rawiMatch ? rawiMatch[1].trim() : "غير محدد";

                // Extract source
                const sourceMatch = textContent.match(/(?:المصدر|الكتاب)\s*[:\s]*([^،\n]+)/);
                const source = sourceMatch ? sourceMatch[1].trim() : "الدرر السنية";

                ahadith.push({
                    hadith: textContent.substring(0, 500),
                    grade,
                    rawi,
                    book: source,
                    mohdith: ""
                });
            }

            // If no results found with first method, try alternative parsing
            if (ahadith.length === 0) {
                // Look for any text blocks that might be hadiths
                const textBlocks = html.split(/<div[^>]*>/gi);

                for (const block of textBlocks) {
                    const text = block.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

                    // Check if it looks like a hadith (contains Arabic and is of reasonable length)
                    if (text.length > 50 && text.length < 1000 && /[\u0600-\u06FF]/.test(text)) {
                        const gradeMatch = text.match(/(صحيح|حسن|ضعيف|موضوع)/);

                        if (gradeMatch || text.includes("الراوي") || text.includes("المصدر")) {
                            ahadith.push({
                                hadith: text.substring(0, 500),
                                grade: gradeMatch ? gradeMatch[1] : "انظر المصدر",
                                rawi: "غير محدد",
                                book: "الدرر السنية",
                                mohdith: ""
                            });
                        }
                    }

                    if (ahadith.length >= 20) break;
                }
            }

            res.json({
                results: ahadith,
                ahadith: ahadith,
                count: ahadith.length
            });
        } catch (error: any) {
            console.error("Dorar API error:", error.message);
            res.status(500).json({ error: "Failed to fetch from Dorar", results: [], ahadith: [] });
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



