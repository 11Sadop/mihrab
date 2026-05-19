const CACHE_NAME = 'mihrab-app-v70';
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
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        }).then(() => {
            registerPeriodicSync();
            startNotificationChecker();
        })
    );
});

// ========== PERIODIC BACKGROUND SYNC ==========
async function registerPeriodicSync() {
    try {
        const registration = self.registration;
        if ('periodicSync' in registration) {
            const status = await navigator.permissions.query({
                name: 'periodic-background-sync',
            });
            if (status.state === 'granted') {
                await registration.periodicSync.register('check-prayer-times', {
                    minInterval: 15 * 60 * 1000,
                });
            }
        }
    } catch (error) {
        // Periodic Sync not supported, fallback interval is active
    }
}

self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-prayer-times') {
        event.waitUntil(checkNotifications());
    }
});

// ========== PUSH NOTIFICATIONS (FCM) ==========
self.addEventListener('push', (event) => {
    let data = { title: 'محراب', body: 'تذكير من تطبيق محراب' };
    try {
        if (event.data) data = event.data.json();
    } catch (e) {
        if (event.data) data.body = event.data.text();
    }
    event.waitUntil(
        self.registration.showNotification(data.title || 'محراب', {
            body: data.body || '',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: data.tag || 'mihrab-push',
            vibrate: [200, 100, 200],
            data: data
        })
    );
});

// ========== NOTIFICATION CLICK ==========
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('mihrabapp.com') && 'focus' in client) {
                    return client.focus();
                }
            }
            return clients.openWindow('/');
        })
    );
});

// ========== FETCH HANDLER ==========
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (!url.protocol.startsWith('http')) return;

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

    if (url.pathname === '/' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

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
    if (event.data && event.data.type === 'CHECK_NOW') {
        checkNotifications();
    }
});

// ========== SETTINGS ==========
let notificationSettings = {
    enabled: false,
    reminderMinutes: 10,
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
    registerPeriodicSync();
    // Check immediately after scheduling
    checkNotifications();
}

// ========== NOTIFICATION CHECKER ==========
function startNotificationChecker() {
    loadFromIndexedDB();
    // Check every 30 seconds when app is open for more reliable timing
    setInterval(() => {
        checkNotifications();
    }, 30000);
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
        // IndexedDB not available
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
    } catch (e) {}
}

// ========== ADHKAR ==========
const morningAdhkar = [
    "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا",
    "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
    "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    "بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ",
    "حَسْبِيَ اللهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ",
];

const eveningAdhkar = [
    "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا",
    "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    "حَسْبِيَ اللهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ",
];

// ========== CHECK NOTIFICATIONS ==========
async function checkNotifications() {
    await loadFromIndexedDB();

    if (!notificationSettings.enabled) return;
    if (!scheduledPrayerTimes) return;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const today = now.toDateString();

    // Reset daily checks at midnight
    const resetKey = `reset_${today}`;
    if (!lastNotificationCheck[resetKey]) {
        lastNotificationCheck = {};
        lastNotificationCheck[resetKey] = true;
        saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
    }

    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const prayerNames = {
        fajr: 'الفجر', dhuhr: 'الظهر', asr: 'العصر',
        maghrib: 'المغرب', isha: 'العشاء'
    };

    for (const prayer of prayers) {
        const prayerTime = scheduledPrayerTimes[prayer];
        if (!prayerTime) continue;

        const [prayerH, prayerM] = prayerTime.split(':').map(Number);
        if (isNaN(prayerH) || isNaN(prayerM)) continue;
        const prayerMinutes = prayerH * 60 + prayerM;

        // Reminder before adhan
        const reminderMinutes = notificationSettings.reminderMinutes || 10;
        const reminderTime = prayerMinutes - reminderMinutes;
        const reminderKey = `reminder_${prayer}_${today}`;
        if (currentTime >= reminderTime && currentTime < prayerMinutes && !lastNotificationCheck[reminderKey]) {
            const diff = prayerMinutes - currentTime;
            await showNotification(
                `تذكير بصلاة ${prayerNames[prayer]}`,
                `بقي ${diff} دقيقة على أذان ${prayerNames[prayer]}`,
                `mihrab-reminder-${prayer}`
            );
            lastNotificationCheck[reminderKey] = true;
            saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
        }

        // Adhan notification
        const adhanKey = `adhan_${prayer}_${today}`;
        if (currentTime >= prayerMinutes && currentTime < prayerMinutes + 5 && !lastNotificationCheck[adhanKey]) {
            await showNotification(
                `حان وقت صلاة ${prayerNames[prayer]}`,
                'حيّ على الصلاة - حيّ على الفلاح',
                `mihrab-adhan-${prayer}`
            );
            lastNotificationCheck[adhanKey] = true;
            saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
        }

        // Iqama reminder
        if (notificationSettings.iqamaNotification && scheduledIqamaTimes) {
            const iqamaTime = scheduledIqamaTimes[prayer];
            if (iqamaTime) {
                const [iH, iM] = iqamaTime.split(':').map(Number);
                if (!isNaN(iH) && !isNaN(iM)) {
                    const iqamaMinutes = iH * 60 + iM;
                    const iqamaReminderTime = iqamaMinutes - 5;
                    const iqamaKey = `iqama_${prayer}_${today}`;
                    if (currentTime >= iqamaReminderTime && currentTime <= iqamaMinutes && !lastNotificationCheck[iqamaKey]) {
                        await showNotification(
                            `تنبيه الإقامة - ${prayerNames[prayer]}`,
                            `بقي ${iqamaMinutes - currentTime} دقائق على الإقامة`,
                            `mihrab-iqama-${prayer}`
                        );
                        lastNotificationCheck[iqamaKey] = true;
                        saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
                    }
                }
            }
        }
    }

    // Morning Adhkar - 30 min after Fajr
    if (notificationSettings.morningAdhkarEnabled && scheduledPrayerTimes.fajr) {
        const [fajrH, fajrM] = scheduledPrayerTimes.fajr.split(':').map(Number);
        const morningTime = fajrH * 60 + fajrM + 30;
        const morningKey = `morning_${today}`;
        if (currentTime >= morningTime && currentTime < morningTime + 30 && !lastNotificationCheck[morningKey]) {
            const dhikr = morningAdhkar[Math.floor(Math.random() * morningAdhkar.length)];
            await showNotification('حان وقت أذكار الصباح', dhikr, 'mihrab-morning');
            lastNotificationCheck[morningKey] = true;
            saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
        }
    }

    // Evening Adhkar - at Maghrib
    if (notificationSettings.eveningAdhkarEnabled && scheduledPrayerTimes.maghrib) {
        const [magH, magM] = scheduledPrayerTimes.maghrib.split(':').map(Number);
        const eveningTime = magH * 60 + magM;
        const eveningKey = `evening_${today}`;
        if (currentTime >= eveningTime && currentTime < eveningTime + 30 && !lastNotificationCheck[eveningKey]) {
            const dhikr = eveningAdhkar[Math.floor(Math.random() * eveningAdhkar.length)];
            await showNotification('حان وقت أذكار المساء', dhikr, 'mihrab-evening');
            lastNotificationCheck[eveningKey] = true;
            saveToIndexedDB('lastNotificationCheck', lastNotificationCheck);
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
            renotify: false,
            requireInteraction: true,
            vibrate: [200, 100, 200]
        });
    }
}
