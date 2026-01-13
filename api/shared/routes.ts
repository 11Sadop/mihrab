import { z } from 'zod';
import { adhkar, duas, hadiths, benefits, quranSurahs, reciters, dailyWard } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  adhkar: {
    list: {
      method: 'GET' as const,
      path: '/api/adhkar',
      input: z.object({
        category: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof adhkar.$inferSelect>()),
      },
    },
  },
  duas: {
    list: {
      method: 'GET' as const,
      path: '/api/duas',
      input: z.object({
        category: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof duas.$inferSelect>()),
      },
    },
  },
  hadith: {
    daily: {
      method: 'GET' as const,
      path: '/api/hadith/daily',
      responses: {
        200: z.custom<typeof hadiths.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    refresh: {
      method: 'POST' as const,
      path: '/api/hadith/refresh',
      responses: {
        200: z.custom<typeof hadiths.$inferSelect>(),
      },
    },
    protection: {
      method: 'GET' as const,
      path: '/api/hadith/protection',
      responses: {
        200: z.array(z.custom<typeof hadiths.$inferSelect>()),
      },
    },
  },
  ward: {
    list: {
      method: 'GET' as const,
      path: '/api/ward',
      responses: {
        200: z.array(z.custom<typeof dailyWard.$inferSelect>()),
      },
    },
    toggle: {
      method: 'PATCH' as const,
      path: '/api/ward/:id/toggle',
      input: z.object({ isCompleted: z.boolean() }),
      responses: {
        200: z.custom<typeof dailyWard.$inferSelect>(),
      },
    },
  },
  benefits: {
    daily: {
      method: 'GET' as const,
      path: '/api/benefits/daily',
      responses: {
        200: z.custom<typeof benefits.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  quran: {
    surahs: {
      method: 'GET' as const,
      path: '/api/quran/surahs',
      responses: {
        200: z.array(z.custom<typeof quranSurahs.$inferSelect>()),
      },
    },
    reciters: {
      method: 'GET' as const,
      path: '/api/quran/reciters',
      responses: {
        200: z.array(z.custom<typeof reciters.$inferSelect>()),
      },
    },
  },
  stats: {
    visitors: {
      method: 'GET' as const,
      path: '/api/stats/visitors',
      responses: {
        200: z.object({ count: z.number() }),
      },
    },
    track: {
      method: 'POST' as const,
      path: '/api/stats/track',
      responses: {
        200: z.object({ count: z.number() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type AdhkarListResponse = z.infer<typeof api.adhkar.list.responses[200]>;
export type DuasListResponse = z.infer<typeof api.duas.list.responses[200]>;
export type HadithResponse = z.infer<typeof api.hadith.daily.responses[200]>;
export type ProtectionHadithResponse = z.infer<typeof api.hadith.protection.responses[200]>;
export type BenefitResponse = z.infer<typeof api.benefits.daily.responses[200]>;
export type SurahListResponse = z.infer<typeof api.quran.surahs.responses[200]>;
export type ReciterListResponse = z.infer<typeof api.quran.reciters.responses[200]>;
export type WardListResponse = z.infer<typeof api.ward.list.responses[200]>;
