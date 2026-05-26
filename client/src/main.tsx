import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// ===== FIX: Clear update flag immediately on startup =====
try {
    sessionStorage.removeItem('sw_update_available');
} catch (e) {
    // Ignore errors in non-browser environments
}

// Send cached prayer times to Service Worker
async function sendCachedPrayerTimesToSW() {
    // Skip on platforms that don't support notifications (like iOS Safari)
    if (!('Notification' in window)) return;

    try {
        const cachedPrayerTimes = localStorage.getItem('cached_prayer_times');
        const cachedIqamaTimes = localStorage.getItem('cached_iqama_times');
        const notificationSettings = localStorage.getItem('notification_settings');

        if (cachedPrayerTimes && cachedIqamaTimes) {
            const prayerTimes = JSON.parse(cachedPrayerTimes);
            const iqamaTimes = JSON.parse(cachedIqamaTimes);
            const settings = notificationSettings ? JSON.parse(notificationSettings) : {};

            const message = {
                type: 'SCHEDULE_NOTIFICATIONS',
                prayerTimes: {
                    fajr: prayerTimes.Fajr || prayerTimes.fajr,
                    dhuhr: prayerTimes.Dhuhr || prayerTimes.dhuhr,
                    asr: prayerTimes.Asr || prayerTimes.asr,
                    maghrib: prayerTimes.Maghrib || prayerTimes.maghrib,
                    isha: prayerTimes.Isha || prayerTimes.isha
                },
                iqamaTimes: {
                    fajr: iqamaTimes.Fajr || iqamaTimes.fajr,
                    dhuhr: iqamaTimes.Dhuhr || iqamaTimes.dhuhr,
                    asr: iqamaTimes.Asr || iqamaTimes.asr,
                    maghrib: iqamaTimes.Maghrib || iqamaTimes.maghrib,
                    isha: iqamaTimes.Isha || iqamaTimes.isha
                },
                settings: {
                    enabled: ('Notification' in window && Notification.permission === 'granted') || settings.enabled || true,
                    reminderMinutes: settings.reminderMinutes || 10,
                    morningAdhkarEnabled: settings.morningAdhkar !== false,
                    eveningAdhkarEnabled: settings.eveningAdhkar !== false,
                    adhanNotification: true,
                    iqamaNotification: true,
                }
            };

            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage(message);
            } else {
                const registration = await navigator.serviceWorker.ready;
                if (registration.active) {
                    registration.active.postMessage(message);
                }
            }
        }
    } catch (e) {
        console.warn('Failed to send cached prayer times to SW:', e);
    }
}

// Register service worker (only in production)
const isProduction = import.meta.env.PROD;
if ('serviceWorker' in navigator && isProduction) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then((registration) => {
            // Send cached prayer times to SW on startup
            sendCachedPrayerTimesToSW();

            // ===== Drive periodic notification checks from client =====
            // Since setInterval in SW is unreliable (fires on every restart),
            // we send CHECK_NOW from the client every 60 seconds instead.
            // This only runs while the app is open - periodicSync handles background.
            const sendCheckNow = () => {
                if (!('Notification' in window) || Notification.permission !== 'granted') return;
                try {
                    const sw = registration.active || navigator.serviceWorker.controller;
                    if (sw) sw.postMessage({ type: 'CHECK_NOW' });
                } catch (e) { /* ignore */ }
            };

            // Check once on startup (after a short delay for SW to initialize)
            setTimeout(sendCheckNow, 3000);

            // Check every 60 seconds while app is open
            setInterval(sendCheckNow, 60 * 1000);

        }).catch((error) => {
            console.log('SW registration failed:', error);
        });
    });
}

createRoot(document.getElementById("root")!).render(<App />);
