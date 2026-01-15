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

    // Hadith Search Proxy (using dorar-hadith-api intermediary)
    app.get("/api/hadith/search", async (req, res) => {
        const query = req.query.q as string;
        if (!query) {
            return res.status(400).json({ error: "Query parameter 'q' is required" });
        }

        try {
            const encodedQuery = encodeURIComponent(query);

            // Use the intermediary API which handles CORS and returns clean JSON
            // Try the hosted version first
            const apiUrl = `https://dorar-hadith-api.vercel.app/v1/site/hadith/search?value=${encodedQuery}&removehtml=true`;

            let response = await fetch(apiUrl, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mihrab App'
                }
            });

            if (!response.ok) {
                // Fallback: try the api endpoint
                const apiUrl2 = `https://dorar-hadith-api.vercel.app/v1/api/hadith/search?value=${encodedQuery}&removehtml=true`;
                response = await fetch(apiUrl2, {
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'Mihrab App'
                    }
                });
            }

            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }

            const jsonData = await response.json();

            // The intermediary API returns: { metadata: {...}, data: [...] }
            const ahadith = (jsonData.data || []).map((item: any) => ({
                hadith: item.hadith || "",
                grade: item.grade || "غير محدد",
                rawi: item.rawi || "غير معروف",
                mohdith: item.mohdith || "",
                book: item.book || "غير محدد",
                bookPage: item.numberOrPage || ""
            }));

            res.json({
                results: ahadith,
                ahadith: ahadith,
                count: ahadith.length,
                metadata: jsonData.metadata || {}
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



