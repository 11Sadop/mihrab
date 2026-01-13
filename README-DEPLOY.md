# دليل نشر تطبيق محراب على Render

## المتطلبات
1. حساب GitHub (github.com)
2. حساب Render (render.com)
3. حساب Neon لقاعدة البيانات (neon.tech)

---

## الخطوة 1: رفع الكود على GitHub

1. اذهب إلى github.com وسجل دخول
2. اضغط على زر "+" في الأعلى ثم "New repository"
3. اكتب اسم المشروع مثل: `mihrab-app`
4. اختر "Public" أو "Private"
5. اضغط "Create repository"
6. ارفع ملفات المشروع (يمكنك سحبها وإفلاتها)

---

## الخطوة 2: إنشاء قاعدة البيانات على Neon

1. اذهب إلى https://neon.tech
2. سجل دخول (يمكنك استخدام حساب GitHub)
3. اضغط "Create Project"
4. اكتب اسم المشروع: `mihrab-db`
5. اختر المنطقة الأقرب لك
6. اضغط "Create Project"
7. **مهم:** انسخ رابط الاتصال (Connection String)
   - ستجده في صفحة المشروع
   - يبدو مثل: `postgresql://username:password@host/database?sslmode=require`

---

## الخطوة 3: النشر على Render

1. اذهب إلى https://render.com
2. سجل دخول باستخدام حساب GitHub
3. اضغط "New" ثم "Web Service"
4. اختر المستودع (Repository) الذي أنشأته
5. في صفحة الإعدادات:

### الإعدادات الأساسية:
- **Name:** mihrab-app
- **Region:** اختر الأقرب لك
- **Branch:** main
- **Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`

### المتغيرات البيئية (Environment Variables):
اضغط "Add Environment Variable" وأضف:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | رابط Neon الذي نسخته |
| `SESSION_SECRET` | اكتب أي نص طويل عشوائي (مثل: mysecretkey123456789) |
| `NODE_ENV` | production |

6. اختر الخطة المجانية "Free"
7. اضغط "Create Web Service"

---

## الخطوة 4: انتظر البناء

- Render سيبني التطبيق تلقائياً (5-10 دقائق)
- عند الانتهاء، ستحصل على رابط مثل:
  `https://mihrab-app.onrender.com`

---

## ملاحظات مهمة

### الخطة المجانية:
- التطبيق "ينام" بعد 15 دقيقة بدون استخدام
- أول زيارة بعد النوم تأخذ 30-60 ثانية للتشغيل
- قاعدة بيانات Neon مجانية بدون حد زمني

### إذا واجهت مشاكل:
1. تحقق من رابط قاعدة البيانات (DATABASE_URL)
2. تأكد من إضافة `?sslmode=require` في نهاية الرابط
3. راجع سجلات Render (Logs) للأخطاء

---

## تحديث التطبيق لاحقاً

عند تعديل الكود:
1. ارفع التحديثات على GitHub
2. Render سيعيد البناء تلقائياً

---

## روابط مفيدة

- Render Dashboard: https://dashboard.render.com
- Neon Dashboard: https://console.neon.tech
- GitHub: https://github.com
