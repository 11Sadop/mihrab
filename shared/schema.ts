import { sql } from "drizzle-orm";
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const adhkar = pgTable("adhkar", {
    id: serial("id").primaryKey(),
    category: text("category").notNull(), // morning, evening, after_prayer, upon_waking, protection
    arabicText: text("arabic_text").notNull(),
    translation: text("translation").notNull(),
    transliteration: text("transliteration"),
    reference: text("reference"),
    virtueHadith: text("virtue_hadith"), // Hadith explaining the virtue of this dhikr
    virtueSource: text("virtue_source"), // Source of the virtue hadith
    count: integer("count").default(1).notNull(),
    countLabel: text("count_label"), // Optional text label for count (e.g., "بدون عدد")
    isCompleted: boolean("is_completed").default(false).notNull(),
});

export const dailyWard = pgTable("daily_ward", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    arabicText: text("arabic_text").notNull(),
    translation: text("translation").notNull(),
    virtueHadith: text("virtue_hadith"), // Hadith explaining the virtue
    virtueSource: text("virtue_source"), // Source of the virtue hadith
    repeatCount: integer("repeat_count").default(1).notNull(),
    isCompleted: boolean("is_completed").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
});

export const duas = pgTable("duas", {
    id: serial("id").primaryKey(),
    category: text("category").notNull(), // forgiveness, stress, travel, etc.
    arabicText: text("arabic_text").notNull(),
    translation: text("translation").notNull(),
    reference: text("reference"),
});

export const hadiths = pgTable("hadiths", {
    id: serial("id").primaryKey(),
    category: text("category").default("general").notNull(), // prayer, dhikr, manners, faith, protection
    arabicText: text("arabic_text").notNull(),
    translation: text("translation").notNull(),
    source: text("source").notNull(), // e.g., Sahih Bukhari
    isProtection: boolean("is_protection").default(false).notNull(),
});

export const benefits = pgTable("benefits", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    explanation: text("explanation").notNull(),
    evidence: text("evidence").notNull(), // Quran verse or Sahih Hadith
    source: text("source").notNull(),
    reference: text("reference").notNull(),
});

export const quranSurahs = pgTable("quran_surahs", {
    id: serial("id").primaryKey(),
    number: integer("number").notNull().unique(),
    nameArabic: text("name_arabic").notNull(),
    nameEnglish: text("name_english").notNull(),
    revelationType: text("revelation_type").notNull(), // Meccan/Medinan
    versesCount: integer("verses_count").notNull(),
});

export const reciters = pgTable("reciters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    serverUrl: text("server_url").notNull(),
    identifier: text("identifier").notNull(), // identifier for the API
});

export const siteStats = pgTable("site_stats", {
    id: serial("id").primaryKey(),
    key: text("key").notNull().unique(),
    value: integer("value").default(0).notNull(),
});

export const pageVisits = pgTable("page_visits", {
    id: serial("id").primaryKey(),
    page: text("page").notNull(),
    visitDate: text("visit_date").notNull(),
    visitCount: integer("visit_count").default(1).notNull(),
});

export const bukhariHadiths = pgTable("bukhari_hadiths", {
    id: serial("id").primaryKey(),
    hadithNumber: integer("hadith_number").notNull(),
    bookNumber: integer("book_number").notNull(),
    bookName: text("book_name").notNull(),
    text: text("text").notNull(),
});

export const muslimHadiths = pgTable("muslim_hadiths", {
    id: serial("id").primaryKey(),
    hadithNumber: integer("hadith_number").notNull(),
    bookNumber: integer("book_number").notNull(),
    bookName: text("book_name").notNull(),
    text: text("text").notNull(),
});

export const verificationHadiths = pgTable("verification_hadiths", {
    id: serial("id").primaryKey(),
    text: text("text").notNull(),
    status: text("status").notNull(), // صحيح, حسن, ضعيف, موضوع
    source: text("source").notNull(),
    narrator: text("narrator"),
    explanation: text("explanation"),
});

export const pushSubscriptions = pgTable("push_subscriptions", {
    token: text("token").primaryKey(),
    deviceType: text("device_type"),
    userId: integer("user_id"), 
    city: text("city"),
    country: text("country"),
    latitude: text("latitude"),
    longitude: text("longitude"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
// === SCHEMAS ===

export const insertAdhkarSchema = createInsertSchema(adhkar).omit({ id: true });
export const insertDuaSchema = createInsertSchema(duas).omit({ id: true });
export const insertPushSubscriptionSchema = createInsertSchema(pushSubscriptions);
export type PushSubscription = z.infer<typeof insertPushSubscriptionSchema>;

