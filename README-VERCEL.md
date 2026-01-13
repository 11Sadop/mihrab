# نشر تطبيق محراب على Vercel

## الخطوة 1: رفع المشروع على GitHub

1. أنشئ حساب على GitHub إذا لم يكن لديك
2. أنشئ مستودع (Repository) جديد
3. ارفع الملفات:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mihrab.git
git push -u origin main
```

## الخطوة 2: إنشاء قاعدة بيانات Neon

1. اذهب إلى [neon.tech](https://neon.tech)
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. انسخ رابط الاتصال (Connection String)

## الخطوة 3: النشر على Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول باستخدام GitHub
3. اضغط "Add New Project"
4. اختر مستودع GitHub الخاص بالتطبيق
5. في الإعدادات:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`

6. أضف متغيرات البيئة (Environment Variables):
   - `DATABASE_URL`: رابط Neon PostgreSQL
   - `SESSION_SECRET`: مفتاح سري (أي نص عشوائي)
   - `NODE_ENV`: production

7. اضغط "Deploy"

## ملاحظات مهمة

- التطبيق يستخدم Serverless Functions للـ API
- قاعدة البيانات Neon مجانية مع حدود استخدام
- Vercel يوفر HTTPS تلقائياً
- يمكنك ربط دومين خاص مجاناً

## هيكل الملفات للـ Vercel

```
├── api/
│   └── index.ts      # Serverless API functions
├── client/           # React frontend
├── server/           # Express logic (used by api/)
├── shared/           # Shared types
├── vercel.json       # Vercel configuration
└── package.json
```
