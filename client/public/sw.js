// ========== MIHRAB SERVICE WORKER ==========
// يدعم: Firebase Cloud Messaging (FCM) + Local Timer Fallback

// ========== FIREBASE CLOUD MESSAGING ==========
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAxSyfXuj4pLzNbOBrMlX3HKGTxi0O2VuQ",
    authDomain: "mihrabapp-32e80.firebaseapp.com",
    projectId: "mihrabapp-32e80",
    storageBucket: "mihrabapp-32e80.firebasestorage.app",
    messagingSenderId: "1057466774502", // 
    appId: "1:1057466774502:web:0c8f703b608ac84d8c9c27"
});

const fcmMessaging = firebase.messaging();

// عند استقبال رسالة FCM في الخلفية
fcmMessaging.onBackgroundMessage((payload) => {
    console.log('🔔 FCM Background message:', payload);
    const title = payload.notification?.title || 'محراب';
    const options = {
        body: payload.notification?.body || '',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        dir: 'rtl',
        lang: 'ar',
        vibrate: [200, 100, 200],
        requireInteraction: true,
        renotify: true,
        tag: `mihrab-fcm-${Date.now()}`,
        data: payload.data || {}
    };
    return self.registration.showNotification(title, options);
});

const CACHE_NAME = 'mihrab-app-v76';
const urlsToCache = ['/manifest.json', '/icon-192.png', '/icon-512.png'];

// ========== الإسماء العربية لأوقات الصلاة ==========
const prayerNamesArabic = {
    fajr: 'الفجر',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء'
};

const morningAdhkar = [
    "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا",
    "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    "بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ",
    "حَسْبِيَ اللهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
];
const eveningAdhkar = [
    "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا",
    "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "حَسْبِيَ اللهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
];

// ========== INSTALLATION ==========
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

// ========== ACTIVATION ==========
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
        ).then(() => self.clients.claim())
          .then(() => {
              console.log('✅ SW activated - starting notification system');
              // جلب أوقات الصلاة إذا لم تكن محفوظة
              fetchAndStorePrayerTimesIfNeeded();
              // تشغيل أول فحص
              scheduleNextCheck();
          })
    );
});

// ========== FETCH ==========
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (!url.protocol.startsWith('http')) return;
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(event.request).catch(() =>
                new Response(JSON.stringify({ error: 'offline' }), {
                    status: 503, headers: { 'Content-Type': 'application/json' }
                })
            )
        );
        return;
    }
    event.respondWith(
        fetch(event.request)
            .then(resp => {
                if (resp.ok) {
                    caches.open(CACHE_NAME).then(c => c.put(event.request, resp.clone()));
                }
                return resp;
            })
            .catch(() => caches.match(event.request).then(r => r || caches.match('/')))
    );
});

// ========== MESSAGES (من React لـ SW) ==========
self.addEventListener('message', (event) => {
    if (!event.data) return;

    switch (event.data.type) {
        case 'SCHEDULE_NOTIFICATIONS': {
            const { prayerTimes, iqamaTimes, settings } = event.data;
            Promise.all([
                saveToIDB('prayerTimes', prayerTimes),
                saveToIDB('iqamaTimes', iqamaTimes),
                saveToIDB('settings', settings),
                saveToIDB('sentKeys', {}) // مسح الإشعارات المرسلة عند تحديث الأوقات
            ]).then(() => {
                console.log('✅ Prayer times saved to IDB');
                checkAndNotify();
            });
            break;
        }
        case 'UPDATE_SETTINGS': {
            saveToIDB('settings', event.data.settings).then(() => {
                console.log('✅ Settings updated in IDB');
            });
            break;
        }
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
        case 'CHECK_NOW':
            checkAndNotify();
            break;
    }
});

// ========== PERIODIC SYNC ==========
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-prayer-times') {
        event.waitUntil(checkAndNotify());
    }
});

// ========== NOTIFICATION CLICK ==========
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
            const found = cs.find(c => c.url.includes(self.location.origin));
            if (found) return found.focus();
            return clients.openWindow('/');
        })
    );
});

// ========== الخوارزمية الأساسية ==========

/**
 * scheduleNextCheck: يجدول الفحص التالي عبر setTimeout داخل waitUntil
 * هذا يُبقي الـ SW حياً لمدة كافية ثم يُعيد جدولة نفسه.
 * 
 * ملاحظة: هذا أفضل من setInterval لأن كل دورة تُنشئ waitUntil جديدة
 * تُخبر المتصفح أن الـ SW ما زال بحاجة للتشغيل.
 */
function scheduleNextCheck() {
    const INTERVAL_MS = 30 * 1000; // كل دقيقة

    // استخدام event.waitUntil لإبقاء SW حياً
    const keepAlive = new Promise((resolve) => {
        setTimeout(async () => {
            await checkAndNotify();
            scheduleNextCheck(); // جدّل الفحص التالي
            resolve();
        }, INTERVAL_MS);
    });

    // هذا الـ "trick" يُبقي Service Worker نشطاً:
    // نستخدم waitUntil مع Promise لا تنتهي بشكل فوري
    self.registration.update().catch(() => {}); registerPeriodicSync();
}

/**
 * checkAndNotify: يتحقق من أوقات الصلاة الحالية ويرسل إشعارات
 * يُحمّل كل شيء من IndexedDB في كل مرة (بدون اعتماد على متغيرات في الذاكرة)
 */
async function checkAndNotify() {
    try {
        // تحميل كل البيانات من IndexedDB في كل دورة
        const [settings, prayerTimes, iqamaTimes, sentKeys] = await Promise.all([
            loadFromIDB('settings'),
            loadFromIDB('prayerTimes'),
            loadFromIDB('iqamaTimes'),
            loadFromIDB('sentKeys'),
        ]);

        if (!settings || !settings.enabled) return;
        if (!prayerTimes || !prayerTimes.fajr) {
            // جرّب جلب أوقات الصلاة إذا لم تكن محفوظة
            await fetchAndStorePrayerTimesIfNeeded();
            return;
        }

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
        const sentNow = sentKeys || {};
        let changed = false;

        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

        for (const prayer of prayers) {
            const timeStr = prayerTimes[prayer];
            if (!timeStr) continue;

            const [pH, pM] = timeStr.split(':').map(Number);
            if (isNaN(pH) || isNaN(pM)) continue;
            const prayerMin = pH * 60 + pM;
            const arabicName = prayerNamesArabic[prayer];

            // ① إشعار التذكير قبل الصلاة
            if (settings.reminderMinutes > 0) {
                const reminderMin = prayerMin - settings.reminderMinutes;
                const reminderKey = `${todayKey}-${prayer}-reminder`;
                if (
                    currentMinutes >= reminderMin &&
                    currentMinutes < prayerMin &&
                    !sentNow[reminderKey]
                ) {
                    const remaining = prayerMin - currentMinutes;
                    await showNotification(
                        `تذكير: صلاة ${arabicName}`,
                        `بقي ${remaining} دقيقة على أذان ${arabicName}`,
                        `mihrab-reminder-${prayer}`
                    );
                    sentNow[reminderKey] = true;
                    changed = true;
                }
            }

            // ② إشعار الأذان
            const athanKey = `${todayKey}-${prayer}-athan`;
            if (
                currentMinutes >= prayerMin &&
                currentMinutes < prayerMin + 3 &&
                !sentNow[athanKey]
            ) {
                await showNotification(
                    `حان وقت صلاة ${arabicName} 🕌`,
                    'حي على الصلاة - حي على الفلاح',
                    `mihrab-athan-${prayer}`
                );
                sentNow[athanKey] = true;
                changed = true;

                // أذكار الصباح بعد الفجر
                if (prayer === 'fajr' && settings.morningAdhkarEnabled) {
                    const morningKey = `${todayKey}-morning`;
                    if (!sentNow[morningKey]) {
                        setTimeout(async () => {
                            const dhikr = morningAdhkar[Math.floor(Math.random() * morningAdhkar.length)];
                            await showNotification('أذكار الصباح 🌅', dhikr, 'mihrab-adhkar-morning');
                            sentNow[morningKey] = true;
                            await saveToIDB('sentKeys', sentNow);
                        }, 5 * 60 * 1000); // 5 دقائق بعد الفجر
                    }
                }

                // أذكار المساء بعد المغرب
                if (prayer === 'maghrib' && settings.eveningAdhkarEnabled) {
                    const eveningKey = `${todayKey}-evening`;
                    if (!sentNow[eveningKey]) {
                        setTimeout(async () => {
                            const dhikr = eveningAdhkar[Math.floor(Math.random() * eveningAdhkar.length)];
                            await showNotification('أذكار المساء 🌙', dhikr, 'mihrab-adhkar-evening');
                            sentNow[eveningKey] = true;
                            await saveToIDB('sentKeys', sentNow);
                        }, 5 * 60 * 1000); // 5 دقائق بعد المغرب
                    }
                }
            }

            // ③ إشعار الإقامة
            if (iqamaTimes && settings.iqamaNotification !== false) {
                const iqamaStr = iqamaTimes[prayer];
                if (iqamaStr) {
                    const [iH, iM] = iqamaStr.split(':').map(Number);
                    const iqamaMin = iH * 60 + iM;
                    const iqamaReminderMin = iqamaMin - 5;
                    const iqamaKey = `${todayKey}-${prayer}-iqama`;

                    if (
                        currentMinutes >= iqamaReminderMin &&
                        currentMinutes < iqamaMin &&
                        !sentNow[iqamaKey]
                    ) {
                        await showNotification(
                            `إقامة صلاة ${arabicName}`,
                            `بقي 5 دقائق على الإقامة`,
                            `mihrab-iqama-${prayer}`
                        );
                        sentNow[iqamaKey] = true;
                        changed = true;
                    }
                }
            }
        }

        // حفظ مفاتيح الإشعارات المرسلة مرة واحدة فقط إذا تغيرت
        if (changed) {
            await saveToIDB('sentKeys', sentNow);
        }

        // مسح مفاتيح اليوم السابق عند منتصف الليل
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        if (midnight.getTime() - now.getTime() < 2 * 60 * 1000) {
            // قريب من منتصف الليل - امسح المفاتيح القديمة
            await saveToIDB('sentKeys', {});
        }

    } catch (e) {
        console.error('❌ checkAndNotify error:', e);
    }
}

async function showNotification(title, body, tag) {
    try {
        if (!self.registration || typeof self.registration.showNotification !== 'function') return;
        await self.registration.showNotification(title, {
            body,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag,
            renotify: true,
            requireInteraction: false,
            vibrate: [200, 100, 200],
            data: { url: '/' }
        });
    } catch (e) {
        console.error('showNotification error:', e);
    }
}

// ========== FETCH PRAYER TIMES (FALLBACK) ==========
async function fetchAndStorePrayerTimesIfNeeded() {
    try {
        const stored = await loadFromIDB('prayerTimes');
        if (stored && stored.fajr) return; // موجودة

        console.log('🔄 Fetching prayer times (SW fallback)...');
        const today = new Date();
        const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        // استخدام الرياض كموقع افتراضي
        const url = `https://api.aladhan.com/v1/timings/${date}?latitude=24.7136&longitude=46.6753&method=4`;
        const resp = await fetch(url);
        const data = await resp.json();

        if (data?.data?.timings) {
            const t = data.data.timings;
            const prayerTimes = {
                fajr: t.Fajr?.split(' ')[0],
                dhuhr: t.Dhuhr?.split(' ')[0],
                asr: t.Asr?.split(' ')[0],
                maghrib: t.Maghrib?.split(' ')[0],
                isha: t.Isha?.split(' ')[0],
            };
            const offsets = { fajr: 20, dhuhr: 15, asr: 15, maghrib: 10, isha: 15 };
            const iqamaTimes = {};
            for (const p of Object.keys(prayerTimes)) {
                if (prayerTimes[p]) {
                    const [h, m] = prayerTimes[p].split(':').map(Number);
                    const total = h * 60 + m + (offsets[p] || 15);
                    iqamaTimes[p] = `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
                }
            }
            await Promise.all([
                saveToIDB('prayerTimes', prayerTimes),
                saveToIDB('iqamaTimes', iqamaTimes),
            ]);
            console.log('✅ Prayer times saved from SW fallback:', prayerTimes);
        }
    } catch (e) {
        console.error('❌ fetchAndStorePrayerTimesIfNeeded error:', e);
    }
}

// ========== INDEXEDDB HELPERS ==========
function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open('MihrabNotificationsV2', 1);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(req.result);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('store')) {
                db.createObjectStore('store');
            }
        };
    });
}

async function saveToIDB(key, value) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('store', 'readwrite');
            tx.objectStore('store').put(value, key);
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error);
        });
    } catch (e) {
        console.warn('saveToIDB error:', e);
    }
}

async function loadFromIDB(key) {
    try {
        const db = await openDB();
        return new Promise((resolve) => {
            const tx = db.transaction('store', 'readonly');
            const req = tx.objectStore('store').get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    } catch (e) {
        return null;
    }
}

// ========== PERIODIC SYNC REGISTRATION ==========
async function registerPeriodicSync() {
    try {
        if ('periodicSync' in self.registration) {
            await self.registration.periodicSync.register('check-prayer-times', {
                minInterval: 15 * 60 * 1000,
            });
            console.log('✅ Periodic Sync registered');
        }
    } catch (e) {
        console.log('ℹ️ Periodic Sync not available (OK - using interval fallback):', e.message);
    }
}
