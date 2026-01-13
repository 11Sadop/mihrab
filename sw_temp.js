const CACHE_NAME = 'mihrab-app-v69';
const urlsToCache = [
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// ========== INSTALLATION ==========
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

// ========== ACTIVATION ==========
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        }).then(() => {
            // Register Periodic Background Sync
            registerPeriodicSync();
            // Also start interval as fallback when app is open
            startNotificationChecker();
        })
    );
});

// ========== PERIODIC BACKGROUND SYNC (الحل الجديد) ==========
async function registerPeriodicSync() {
    try {
        const registration = self.registration;

        // Check if Periodic Background Sync is supported
        if ('periodicSync' in registration) {
            // Request permission
            const status = await navigator.permissions.query({
                name: 'periodic-background-sync',
            });

            if (status.state === 'granted') {
                // Register to run every 15 minutes (minimum allowed)
                await registration.periodicSync.register('check-prayer-times', {
                    minInterval: 15 * 60 * 1000, // 15 minutes
                });
                console.log('✅ Periodic Background Sync registered');
            }
        } else {
            console.log('⚠️ Periodic Background Sync not supported, using fallback');
        }
    } catch (error) {
        console.log('Periodic Sync registration failed:', error);
    }
}

// Handle Periodic Sync event
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-prayer-times') {
        console.log('🔔 Periodic Sync triggered - checking notifications');
        event.waitUntil(checkNotifications());
    }
});

// ========== FETCH HANDLER ==========
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (!url.protocol.startsWith('http')) return;

    // API calls - Network only (failed -> error)
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return new Response(JSON.stringify({ error: 'Network error' }), {
                    status: 503,
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
        return;
    }

    // HTML/Root - Network First (don't cache indefinitely to allow updates)
    if (url.pathname === '/' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Static assets - Cache First or Stale-While-Revalidate
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response.ok) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request).then((cachedResponse) => {
                    return cachedResponse || caches.match('/');
                });
            })
    );
});

// ========== MESSAGE HANDLER ==========
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_NOTIFICATIONS') {
        const { prayerTimes, iqamaTimes, settings } = event.data;
        scheduleNotifications(prayerTimes, iqamaTimes, settings);
    }

    if (event.data && event.data.type === 'UPDATE_SETTINGS') {
        updateSettings(event.data.settings);
    }

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    // New: Force check notifications
    if (event.data && event.data.type === 'CHECK_NOW') {
        checkNotifications();
    }
});

// ========== SETTINGS ==========
let notificationSettings = {
    enabled: false,
    reminderMinutes: 5,
    morningAdhkarEnabled: false,
    eveningAdhkarEnabled: false,
    adhanNotification: true,
    iqamaNotification: true
};

let scheduledPrayerTimes = null;
let scheduledIqamaTimes = null;
let lastNotificationCheck = {};

function updateSettings(settings) {
    notificationSettings = { ...notificationSettings, ...settings };
    saveToIndexedDB('settings', notificationSettings);
}

function scheduleNotifications(prayerTimes, iqamaTimes, settings) {
    scheduledPrayerTimes = prayerTimes;
    scheduledIqamaTimes = iqamaTimes;
    if (settings) {
        notificationSettings = { ...notificationSettings, ...settings };
    }
    saveToIndexedDB('prayerTimes', prayerTimes);
    saveToIndexedDB('iqamaTimes', iqamaTimes);
    saveToIndexedDB('settings', notificationSettings);

    // Register sync after receiving prayer times
    registerPeriodicSync();
}

// ========== NOTIFICATION CHECKER ==========
function startNotificationChecker() {
    if (!self.registration || typeof self.registration.showNotification !== 'function') {
        console.log('Notifications not supported on this platform');
        return;
    }

    loadFromIndexedDB();

    // Fallback interval (works when app is open)
    setInterval(() => {
        checkNotifications();
    }, 60000); // Check every minute
}

async function loadFromIndexedDB() {
    try {
        const db = await openDB();
        const tx = db.transaction('notifications', 'readonly');
        const store = tx.objectStore('notifications');

        const settings = await getFromStore(store, 'settings');
        const prayerTimes = await getFromStore(store, 'prayerTimes');
        const iqamaTimes = await getFromStore(store, 'iqamaTimes');
        const lastCheck = await getFromStore(store, 'lastNotificationCheck');

        if (settings) notificationSettings = settings;
        if (prayerTimes) scheduledPrayerTimes = prayerTimes;
        if (iqamaTimes) scheduledIqamaTimes = iqamaTimes;
        if (lastCheck) lastNotificationCheck = lastCheck;
    } catch (e) {
        console.log('IndexedDB not available, using defaults');
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('MihrabNotifications', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('notifications')) {
                db.createObjectStore('notifications');
            }
        };
    });
}

function getFromStore(store, key) {
    return new Promise((resolve) => {
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
    });
}

async function saveToIndexedDB(key, value) {
    try {
        const db = await openDB();
        const tx = db.transaction('notifications', 'readwrite');
        const store = tx.objectStore('notifications');
        store.put(value, key);
    } catch (e) {
        console.log('Could not save to IndexedDB');
    }
}

// ========== ADHKAR ==========
const morningAdhkar = [
    "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
    "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    "بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    "حَسْبِيَ اللهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    "رَضِيتُ بِاللهِ رَبًّا، وَبِالإِسْلامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا"
];

const eveningAdhkar = [
    "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    "حَسْبِيَ اللهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    "رَضِيتُ بِاللهِ رَبًّا، وَبِالإِسْلامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا"
];

// ========== CHECK NOTIFICATIONS ==========
async function checkNotifications() {
    // Load fresh data from IndexedDB
    await loadFromIndexedDB();

    if (!notificationSettings.enabled) return;
    if (!scheduledIqamaTimes) return;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const today = now.toDateString();

    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const prayerNames = {
        fajr: 'الفجر',
        dhuhr: 'الظهر',
        asr: 'العصر',
        maghrib: 'المغرب',
        isha: 'العشاء'
    };

    for (const prayer of prayers) {
        // Adhan notification at prayer time
        const prayerTime = scheduledPrayerTimes?.[prayer];
        if (prayerTime && notificationSettings.adhanNotification !== false) {
            const [prayerH, prayerM] = prayerTime.split(':').map(Number);
            const prayerMinutes = prayerH * 60 + prayerM;
            const adhanKey = `adhan_${prayer}_${today}`;

            // Wider window (15 minutes) to catch notifications from periodic sync
            if (currentTime >= prayerMinutes && currentTime < prayerMinutes + 15) {
                if (!lastNotificationCheck[adhanKey]) {
                    await showNotification(
                        `حان وقت صلاة ${prayerNames[prayer]}`,
                        'حي على الصلاة - حي على الفلاح',
                        'prayer'
                    );
                    lastNotificationCheck[adhanKey] = true;
                    saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
                }
            }
        }

        // Iqama reminder notification
        const iqamaTime = scheduledIqamaTimes?.[prayer];
        if (!iqamaTime) continue;

        const [hours, minutes] = iqamaTime.split(':').map(Number);
        const iqamaMinutes = hours * 60 + minutes;
        const reminderTime = iqamaMinutes - notificationSettings.reminderMinutes;

        const notificationKey = `iqama_${prayer}_${today}`;

        if (currentTime >= reminderTime && currentTime < iqamaMinutes) {
            if (!lastNotificationCheck[notificationKey]) {
                await showNotification(
                    `تذكير بصلاة ${prayerNames[prayer]}`,
                    `باقي ${notificationSettings.reminderMinutes} دقائق على الإقامة`,
                    'prayer'
                );
                lastNotificationCheck[notificationKey] = true;
                saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
            }
        }
    }

    // Morning Adhkar
    if (notificationSettings.morningAdhkarEnabled && scheduledPrayerTimes?.fajr) {
        const [fajrH, fajrM] = scheduledPrayerTimes.fajr.split(':').map(Number);
        const fajrMinutes = fajrH * 60 + fajrM;
        const morningAdhkarTime = fajrMinutes + 30;

        const morningKey = `morning_${today}`;
        if (currentTime >= morningAdhkarTime && currentTime < morningAdhkarTime + 60) {
            if (!lastNotificationCheck[morningKey]) {
                const randomDhikr = morningAdhkar[Math.floor(Math.random() * morningAdhkar.length)];
                await showNotification(
                    'أذكار الصباح',
                    randomDhikr,
                    'adhkar'
                );
                lastNotificationCheck[morningKey] = true;
                saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
            }
        }
    }

    // Evening Adhkar
    if (notificationSettings.eveningAdhkarEnabled && scheduledPrayerTimes?.asr) {
        const [asrH, asrM] = scheduledPrayerTimes.asr.split(':').map(Number);
        const asrMinutes = asrH * 60 + asrM;
        const eveningAdhkarTime = asrMinutes + 30;

        const eveningKey = `evening_${today}`;
        if (currentTime >= eveningAdhkarTime && currentTime < eveningAdhkarTime + 60) {
            if (!lastNotificationCheck[eveningKey]) {
                const randomDhikr = eveningAdhkar[Math.floor(Math.random() * eveningAdhkar.length)];
                await showNotification(
                    'أذكار المساء',
                    randomDhikr,
                    'adhkar'
                );
                lastNotificationCheck[eveningKey] = true;
                saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
            }
        }
    }
}

function showNotification(title, body, tag) {
    if (self.registration && self.registration.showNotification) {
        return self.registration.showNotification(title, {
            body: body,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: tag,
            vibrate: [200, 100, 200]
        });
    }
}
