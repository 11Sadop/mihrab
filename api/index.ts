import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon, neonConfig } from "@neondatabase/serverless";

// Configure Neon for Vercel serverless
neonConfig.fetchConnectionCache = true;

// Helper function to convert snake_case to camelCase
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      newObj[camelKey] = toCamelCase(obj[key]);
    }
    return newObj;
  }
  return obj;
}

// API Handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url, method } = req;
  const path = url?.split('?')[0] || '';

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check DATABASE_URL - use NEON_DATABASE_URL as fallback for Vercel
    const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    if (!dbUrl) {
      console.error('DATABASE_URL and NEON_DATABASE_URL are not set');
      return res.status(500).json({ error: 'Database configuration error' });
    }

    // Initialize SQL client inside handler for Vercel serverless
    const sql = neon(dbUrl);

    // GET /api/hadith/bukhari/books - dedicated endpoint for books list
    if (path === '/api/hadith/bukhari/books' && method === 'GET') {
      try {
        const booksResult = await sql`SELECT book_number, book_name, count(*)::int as count FROM bukhari_hadiths GROUP BY book_number, book_name ORDER BY book_number`;
        return res.json(toCamelCase(booksResult));
      } catch (e: any) {
        console.error('Books query error:', e);
        return res.status(500).json({ error: e.message });
      }
    }

    // GET /api/hadith/muslim/books - dedicated endpoint for books list
    if (path === '/api/hadith/muslim/books' && method === 'GET') {
      try {
        const booksResult = await sql`SELECT book_number, book_name, count(*)::int as count FROM muslim_hadiths GROUP BY book_number, book_name ORDER BY book_number`;
        return res.json(toCamelCase(booksResult));
      } catch (e: any) {
        console.error('Books query error:', e);
        return res.status(500).json({ error: e.message });
      }
    }

    // GET /api/adhkar
    if (path === '/api/adhkar' && method === 'GET') {
      const category = req.query.category as string | undefined;
      const result = category
        ? await sql`SELECT * FROM adhkar WHERE category = ${category}`
        : await sql`SELECT * FROM adhkar`;
      return res.json(toCamelCase(result));
    }

    // GET /api/duas
    if (path === '/api/duas' && method === 'GET') {
      const category = req.query.category as string | undefined;
      const result = category
        ? await sql`SELECT * FROM duas WHERE category = ${category}`
        : await sql`SELECT * FROM duas`;
      return res.json(toCamelCase(result));
    }

    // GET /api/hadith/daily - rotates based on current date
    if (path === '/api/hadith/daily' && method === 'GET') {
      // Get total count of hadiths
      const countResult = await sql`SELECT count(*) as count FROM hadiths`;
      const totalCount = Number(countResult[0]?.count) || 1;

      // Use date to determine which hadith to show (rotates daily)
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const hadithIndex = dayOfYear % totalCount;

      const result = await sql`SELECT * FROM hadiths LIMIT 1 OFFSET ${hadithIndex}`;
      if (result.length === 0) {
        // Fallback to first hadith if offset fails
        const fallback = await sql`SELECT * FROM hadiths LIMIT 1`;
        if (fallback.length === 0) {
          return res.status(404).json({ message: "No hadiths found" });
        }
        return res.json(toCamelCase(fallback[0]));
      }
      return res.json(toCamelCase(result[0]));
    }

    // POST /api/hadith/refresh - get a random hadith
    if (path === '/api/hadith/refresh' && method === 'POST') {
      const countResult = await sql`SELECT count(*) as count FROM hadiths`;
      const totalCount = Number(countResult[0]?.count) || 1;
      const randomIndex = Math.floor(Math.random() * totalCount);
      const result = await sql`SELECT * FROM hadiths LIMIT 1 OFFSET ${randomIndex}`;
      if (result.length === 0) {
        const fallback = await sql`SELECT * FROM hadiths LIMIT 1`;
        if (fallback.length === 0) {
          return res.status(404).json({ message: "No hadiths found" });
        }
        return res.json(toCamelCase(fallback[0]));
      }
      return res.json(toCamelCase(result[0]));
    }

    // GET /api/hadith/protection
    if (path === '/api/hadith/protection' && method === 'GET') {
      const result = await sql`SELECT * FROM hadiths WHERE is_protection = true`;
      return res.json(toCamelCase(result));
    }

    // GET /api/benefits/daily
    if (path === '/api/benefits/daily' && method === 'GET') {
      const result = await sql`SELECT * FROM benefits LIMIT 1`;
      if (result.length === 0) {
        return res.status(404).json({ message: "No benefits found" });
      }
      return res.json(toCamelCase(result[0]));
    }

    // GET /api/quran/surahs
    if (path === '/api/quran/surahs' && method === 'GET') {
      const result = await sql`SELECT * FROM quran_surahs`;
      return res.json(toCamelCase(result));
    }

    // GET /api/quran/reciters
    if (path === '/api/quran/reciters' && method === 'GET') {
      const result = await sql`SELECT * FROM reciters`;
      return res.json(toCamelCase(result));
    }

    // GET /api/ward
    if (path === '/api/ward' && method === 'GET') {
      const result = await sql`SELECT * FROM daily_ward ORDER BY sort_order`;
      return res.json(toCamelCase(result));
    }

    // POST /api/stats/track
    if (path === '/api/stats/track' && method === 'POST') {
      await sql`UPDATE site_stats SET value = value + 1 WHERE key = 'visitors'`;
      const result = await sql`SELECT value FROM site_stats WHERE key = 'visitors'`;
      return res.json({ count: Number(result[0]?.value) || 0 });
    }

    // GET /api/stats/visitors
    if (path === '/api/stats/visitors' && method === 'GET') {
      const result = await sql`SELECT value FROM site_stats WHERE key = 'visitors'`;
      return res.json({ count: Number(result[0]?.value) || 0 });
    }

    // POST /api/stats/page-visit
    if (path === '/api/stats/page-visit' && method === 'POST') {
      const { page } = req.body || {};
      if (!page) {
        return res.json({ success: false });
      }
      const today = new Date().toISOString().split('T')[0];
      try {
        await sql`
          INSERT INTO page_visits (page, visit_date, visit_count)
          VALUES (${page}, ${today}, 1)
          ON CONFLICT (page, visit_date) DO UPDATE SET visit_count = page_visits.visit_count + 1
        `;
        return res.json({ success: true });
      } catch (e: any) {
        console.error('Page visit error:', e);
        return res.json({ success: false });
      }
    }

    // GET /api/stats/page-stats
    if (path === '/api/stats/page-stats' && method === 'GET') {
      const key = req.query.key as string;
      if (key !== 'mihrab2024') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const today = new Date().toISOString().split('T')[0];

      const totalResult = await sql`SELECT COALESCE(SUM(visit_count), 0)::int as total FROM page_visits`;
      const todayResult = await sql`SELECT COALESCE(SUM(visit_count), 0)::int as today FROM page_visits WHERE visit_date = ${today}`;
      const pagesResult = await sql`SELECT page, SUM(visit_count)::int as count FROM page_visits GROUP BY page ORDER BY count DESC`;

      const last7Days: { date: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayResult = await sql`SELECT COALESCE(SUM(visit_count), 0)::int as count FROM page_visits WHERE visit_date = ${dateStr}`;
        last7Days.push({ date: dateStr, count: Number(dayResult[0]?.count) || 0 });
      }

      return res.json({
        totalVisits: Number(totalResult[0]?.total) || 0,
        todayVisits: Number(todayResult[0]?.today) || 0,
        pages: pagesResult.map((p: any) => ({ page: p.page, count: Number(p.count) })),
        last7Days
      });
    }

    // GET /api/hadith/bukhari
    if (path === '/api/hadith/bukhari' && method === 'GET') {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = (page - 1) * limit;
      const bookNum = req.query.book ? parseInt(req.query.book as string) : null;
      const search = req.query.search as string || '';

      // Get books list - separate query to ensure it works
      let booksResult: any[] = [];
      try {
        booksResult = await sql`SELECT book_number, book_name, count(*)::int as count FROM bukhari_hadiths GROUP BY book_number, book_name ORDER BY book_number`;
      } catch (e) {
        console.error('Books query error:', e);
      }

      let result, countResult;
      if (search) {
        const searchPattern = `%${search}%`;
        result = await sql`SELECT * FROM bukhari_hadiths WHERE text ILIKE ${searchPattern} LIMIT ${limit} OFFSET ${offset}`;
        countResult = await sql`SELECT count(*) as count FROM bukhari_hadiths WHERE text ILIKE ${searchPattern}`;
      } else if (bookNum) {
        result = await sql`SELECT * FROM bukhari_hadiths WHERE book_number = ${bookNum} LIMIT ${limit} OFFSET ${offset}`;
        countResult = await sql`SELECT count(*) as count FROM bukhari_hadiths WHERE book_number = ${bookNum}`;
      } else {
        result = await sql`SELECT * FROM bukhari_hadiths LIMIT ${limit} OFFSET ${offset}`;
        countResult = await sql`SELECT count(*) as count FROM bukhari_hadiths`;
      }

      return res.json({
        hadiths: toCamelCase(result),
        total: Number(countResult[0]?.count) || 0,
        books: toCamelCase(booksResult)
      });
    }

    // GET /api/hadith/muslim
    if (path === '/api/hadith/muslim' && method === 'GET') {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = (page - 1) * limit;
      const bookNum = req.query.book ? parseInt(req.query.book as string) : null;
      const search = req.query.search as string || '';

      // Get books list - separate query to ensure it works
      let booksResult: any[] = [];
      try {
        booksResult = await sql`SELECT book_number, book_name, count(*)::int as count FROM muslim_hadiths GROUP BY book_number, book_name ORDER BY book_number`;
      } catch (e) {
        console.error('Books query error:', e);
      }

      let result, countResult;
      if (search) {
        const searchPattern = `%${search}%`;
        result = await sql`SELECT * FROM muslim_hadiths WHERE text ILIKE ${searchPattern} LIMIT ${limit} OFFSET ${offset}`;
        countResult = await sql`SELECT count(*) as count FROM muslim_hadiths WHERE text ILIKE ${searchPattern}`;
      } else if (bookNum) {
        result = await sql`SELECT * FROM muslim_hadiths WHERE book_number = ${bookNum} LIMIT ${limit} OFFSET ${offset}`;
        countResult = await sql`SELECT count(*) as count FROM muslim_hadiths WHERE book_number = ${bookNum}`;
      } else {
        result = await sql`SELECT * FROM muslim_hadiths LIMIT ${limit} OFFSET ${offset}`;
        countResult = await sql`SELECT count(*) as count FROM muslim_hadiths`;
      }

      return res.json({
        hadiths: toCamelCase(result),
        total: Number(countResult[0]?.count) || 0,
        books: toCamelCase(booksResult)
      });
    }

    // GET /api/hadith/verify (Dorar.net Proxy)
    if ((path === '/api/hadith/verify' || path === '/api/hadith/verification') && method === 'GET') {
      const skey = req.query.skey as string || req.query.q as string;
      const grade = req.query.grade as string;

      if (!skey) {
        return res.status(400).json({ error: "Search text is required" });
      }

      try {
        let dorarUrl = 'https://dorar.net/dorar_api.json?skey=' + encodeURIComponent(skey);
        if (grade === 'sahih') dorarUrl += '&d[]=1';

        const response = await fetch(dorarUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json'
          }
        });

        let html = '';
        if (response.ok) {
          const data: any = await response.json();
          html = data?.ahadith?.result || '';
        }

        const results: any[] = [];

        // Static Fallback Data (if API fails or returns nothing)
        const STATIC_FALLBACKS: Record<string, any[]> = {
          'نية': [{ text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى...", grade: "صحيح", source: "البخاري" }],
          'صلاة': [{ text: "صلوا كما رأيتموني أصلي", grade: "صحيح", source: "البخاري" }],
          'وضوء': [{ text: "من توضأ فأحسن الوضوء خرجت خطاياه من جسده", grade: "صحيح", source: "مسلم" }]
        };

        // Check static fallback if query matches key
        for (const key in STATIC_FALLBACKS) {
          if (skey.includes(key) && html.length < 100) {
            results.push(...STATIC_FALLBACKS[key]);
          }
        }

        // Primary Regex (Detailed)
        // Extract text and grade if possible
        const regex = /<div class="hadith-text">([\s\S]*?)<\/div>[\s\S]*?<span class="info-subtitle">حكم المحدث:<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>/g;

        let m;
        while ((m = regex.exec(html)) !== null) {
          const text = m[1].replace(/<[^>]+>/g, '').trim();
          const grade = m[2].replace(/<[^>]+>/g, '').trim();
          results.push({
            text: text.substring(0, 300) + (text.length > 300 ? '...' : ''),
            grade: grade,
            source: "الدرر السنية",
            narrator: "انظر المصدر",
            scholar: "انظر المصدر"
          });
        }

        // Fallback Regex (Simple - from Guide)
        if (results.length === 0) {
          const fallbackRegex = /<span[^>]*primary[^>]*>([^<]+)/g;
          let m2;
          while ((m2 = fallbackRegex.exec(html)) !== null && results.length < 10) {
            if (m2[1].length > 20) {
              results.push({
                text: m2[1].trim(),
                grade: 'راجع المصدر',
                source: 'dorar.net',
                narrator: "غير متوفر",
                scholar: "غير متوفر"
              });
            }
          }
        }

        res.json({ results });

      } catch (e: any) {
        console.error('Dorar Proxy Error:', e);
        res.status(500).json({ error: e.message });
      }
      return;
    }

    // GET /api/hadith/verification/stats
    if (path === '/api/hadith/verification/stats' && method === 'GET') {
      const total = await sql`SELECT count(*) as count FROM verification_hadiths`;
      const sahih = await sql`SELECT count(*) as count FROM verification_hadiths WHERE status = 'صحيح'`;
      const hasan = await sql`SELECT count(*) as count FROM verification_hadiths WHERE status = 'حسن'`;
      const daif = await sql`SELECT count(*) as count FROM verification_hadiths WHERE status = 'ضعيف'`;
      const mawdu = await sql`SELECT count(*) as count FROM verification_hadiths WHERE status = 'موضوع'`;
      return res.json({
        total: Number(total[0]?.count) || 0,
        byGrade: {
          'صحيح': Number(sahih[0]?.count) || 0,
          'حسن': Number(hasan[0]?.count) || 0,
          'ضعيف': Number(daif[0]?.count) || 0,
          'موضوع': Number(mawdu[0]?.count) || 0,
        }
      });
    }

    // GET /api/tafseer/surahs
    if (path === '/api/tafseer/surahs' && method === 'GET') {
      const result = await sql`SELECT * FROM quran_surahs`;
      return res.json(toCamelCase(result));
    }

    // GET /api/tafseer/mufassireen
    if (path === '/api/tafseer/mufassireen' && method === 'GET') {
      return res.json([
        { id: 1, name: "ابن كثير" },
        { id: 2, name: "السعدي" },
        { id: 3, name: "الميسر" },
        { id: 4, name: "الجلالين" },
        { id: 5, name: "الطبري" },
        { id: 6, name: "القرطبي" },
        { id: 7, name: "البغوي" }
      ]);
    }

    console.log(`Route not found: ${method} ${path}`);
    return res.status(404).json({ error: "Not found", path, method });
  } catch (error: any) {
    console.error("API Error:", {
      path,
      method,
      message: error?.message,
      stack: error?.stack,
      name: error?.name
    });
    return res.status(500).json({
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    });
  }
}
