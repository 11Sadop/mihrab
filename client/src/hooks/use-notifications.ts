import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
// ===== FIX: Import FCM token registration =====
import { requestNotificationPermission } from '@/lib/firebase-push';

interface NotificationSettings {
    enabled: boolean;
    prayerReminder: boolean;
    reminderMinutes: number;
    morningAdhkar: boolean;
    eveningAdhkar: boolean;
    iqamaReminder: boolean;
    sound: boolean;
}

const defaultSettings: NotificationSettings = {
    enabled: false,
    prayerReminder: true,
    reminderMinutes: 10,
    morningAdhkar: true,
    eveningAdhkar: true,
    iqamaReminder: true,
    sound: true,
};

const STORAGE_KEY = 'notification_settings';
const PENDING_KEY = 'notification_settings_pending';

const morningAdhkar = [
    "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "أَصْبَحْنَا عَلَى فِطْرَةِ الإِسْلامِ وَعَلَى كَلِمَةِ الإِخْلاصِ",
    "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
];

const eveningAdhkar = [
    "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا",
];

const prayerNamesArabic: Record<string, string> = {
    Fajr: "الفجر",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
};

function getStoredSettings(): NotificationSettings {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
        return defaultSettings;
    }
}

function saveSettingsToStorage(settings: NotificationSettings): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('notification-settings-changed', { detail: settings }));

    sendSettingsToServiceWorker(settings);
}

async function sendSettingsToServiceWorker(settings: NotificationSettings): Promise<void> {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'UPDATE_SETTINGS',
            settings: {
                enabled: settings.enabled,
                reminderMinutes: settings.reminderMinutes,
                morningAdhkarEnabled: settings.morningAdhkar,
                eveningAdhkarEnabled: settings.eveningAdhkar
            }
        });
    }
}

// ===== FIX: Global deduplication for notifications =====
const recentNotifications = new Set<string>();
const NOTIFICATION_DEBOUNCE_MS = 60000; // 1 minute debounce

function getNotificationKey(title: string, body: string): string {
    return `${title}::${body}`;
}

function canSendNotification(title: string, body: string): boolean {
    const key = getNotificationKey(title, body);
    if (recentNotifications.has(key)) {
        return false;
    }
    recentNotifications.add(key);
    setTimeout(() => {
        recentNotifications.delete(key);
    }, NOTIFICATION_DEBOUNCE_MS);
    return true;
}

export async function schedulePrayerNotificationsInSW(
    prayerTimes: Record<string, string>,
    iqamaTimes: Record<string, string>
): Promise<void> {
    if (!('serviceWorker' in navigator)) return;
    if (typeof window !== 'undefined' && !('Notification' in window)) return;

    try {
        const settings = getStoredSettings();
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
                enabled: settings.enabled,
                reminderMinutes: settings.reminderMinutes,
                morningAdhkarEnabled: settings.morningAdhkar,
                eveningAdhkarEnabled: settings.eveningAdhkar
            }
        };

        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage(message);
        } else {
            const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
            const registration = await Promise.race([navigator.serviceWorker.ready, timeoutPromise]);
            if (registration && registration.active) {
                registration.active.postMessage(message);
            }
        }
    } catch (e) {
        console.warn('Failed to schedule prayer notifications in SW:', e);
    }
}

export function useNotifications() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [settings, setSettings] = useState<NotificationSettings>(getStoredSettings);
    const [pendingSettings, setPendingSettings] = useState<NotificationSettings | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    useEffect(() => {
        const handleSettingsChange = (e: CustomEvent<NotificationSettings>) => {
            setSettings(e.detail);
        };

        window.addEventListener('notification-settings-changed', handleSettingsChange as EventListener);
        return () => {
            window.removeEventListener('notification-settings-changed', handleSettingsChange as EventListener);
        };
    }, []);

    const saveSettings = useCallback(() => {
        if (pendingSettings) {
            saveSettingsToStorage(pendingSettings);
            setSettings(pendingSettings);
            setHasUnsavedChanges(false);
            setPendingSettings(null);
            return true;
        }
        return false;
    }, [pendingSettings]);

    // ===== FIX: Updated to also register FCM token =====
    const requestPermission = useCallback(async () => {
        if (!('Notification' in window)) {
            return false;
        }

        const result = await Notification.requestPermission();
        setPermission(result);

        if (result === 'granted') {
            const newSettings = { ...settings, enabled: true };
            saveSettingsToStorage(newSettings);
            setSettings(newSettings);

            // ===== FIX: Register FCM token with Firebase =====
            try {
                const token = await requestNotificationPermission();
                if (token) {
                    console.log('✅ FCM Token registered successfully');
                } else {
                    console.warn('⚠️ Could not get FCM token');
                }
            } catch (error) {
                console.error('❌ Failed to register FCM token:', error);
            }
        }

        return result === 'granted';
    }, [settings]);

    const sendNotification = useCallback((title: string, body: string, playSound = true) => {
        if (!('Notification' in window)) return;
        const currentSettings = getStoredSettings();
        if (Notification.permission !== 'granted' || !currentSettings.enabled) return;

        // Prevent duplicate notifications
        if (!canSendNotification(title, body)) return;

        try {
            const notification = new Notification(title, {
                body,
                icon: '/icon-192x192.png',
                badge: '/icon-192x192.png',
                tag: `mihrab-${Date.now()}`,
                requireInteraction: true,
                silent: !currentSettings.sound || !playSound,
            });

            if (currentSettings.sound && playSound) {
                try {
                    const audio = new Audio('/notification.mp3');
                    audio.volume = 0.5;
                    audio.play().catch(() => { });
                } catch (e) {
                }
            }

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            return notification;
        } catch (e) {
            console.error('Failed to send notification:', e);
        }
    }, []);

    const sendPrayerReminder = useCallback((prayerName: string, minutesLeft: number) => {
        const currentSettings = getStoredSettings();
        if (!currentSettings.prayerReminder) return;

        const arabicName = prayerNamesArabic[prayerName] || prayerName;

        if (minutesLeft > 0) {
            const title = `تذكير بصلاة ${arabicName}`;
            const body = `بقي ${minutesLeft} دقيقة على أذان ${arabicName}`;
            sendNotification(title, body);
        } else {
            const title = `حان وقت أذان ${arabicName}`;
            const body = `حيّ على الصلاة - حان الآن موعد صلاة ${arabicName}`;
            sendNotification(title, body);
        }
    }, [sendNotification]);

    const sendIqamaReminder = useCallback((prayerName: string) => {
        const currentSettings = getStoredSettings();
        if (!currentSettings.iqamaReminder) return;

        const arabicName = prayerNamesArabic[prayerName] || prayerName;
        const title = `تنبيه الإقامة - صلاة ${arabicName}`;
        const body = `بقي 5 دقائق على إقامة صلاة ${arabicName}`;
        sendNotification(title, body);
    }, [sendNotification]);

    const sendMorningAdhkar = useCallback(() => {
        const currentSettings = getStoredSettings();
        if (!currentSettings.morningAdhkar) return;

        const randomDhikr = morningAdhkar[Math.floor(Math.random() * morningAdhkar.length)];
        sendNotification('حان وقت أذكار الصباح', randomDhikr);
    }, [sendNotification]);

    const sendEveningAdhkar = useCallback(() => {
        const currentSettings = getStoredSettings();
        if (!currentSettings.eveningAdhkar) return;

        const randomDhikr = eveningAdhkar[Math.floor(Math.random() * eveningAdhkar.length)];
        sendNotification('حان وقت أذكار المساء', randomDhikr);
    }, [sendNotification]);

    const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
        const updated = { ...(pendingSettings || settings), ...newSettings };
        setPendingSettings(updated);
        setHasUnsavedChanges(true);
    }, [settings, pendingSettings]);

    const discardChanges = useCallback(() => {
        setPendingSettings(null);
        setHasUnsavedChanges(false);
    }, []);

    const currentSettings = pendingSettings || settings;

    return {
        permission,
        settings: currentSettings,
        savedSettings: settings,
        hasUnsavedChanges,
        requestPermission,
        sendNotification,
        sendPrayerReminder,
        sendIqamaReminder,
        sendMorningAdhkar,
        sendEveningAdhkar,
        updateSettings,
        saveSettings,
        discardChanges,
        isSupported: 'Notification' in window,
    };
}

function normalizeTime(time: string): string {
    return time.replace(/\s*\([^)]*\)$/, '').split(':').slice(0, 2).join(':');
}

const IQAMA_OFFSETS: Record<string, number> = {
    Fajr: 20,
    Dhuhr: 15,
    Asr: 15,
    Maghrib: 10,
    Isha: 15,
};

export function usePrayerNotifications(prayerTimings: Record<string, string> | null) {
    const sentNotificationsRef = useRef<Set<string>>(new Set());
    const lastCheckMinuteRef = useRef<number>(-1);

    const isNotificationSupported = typeof window !== 'undefined' && 'Notification' in window;

    const sendNotification = useCallback((title: string, body: string) => {
        if (!isNotificationSupported) return;
        const settings = getStoredSettings();
        if (Notification.permission !== 'granted' || !settings.enabled) return;

        // Prevent duplicate notifications
        if (!canSendNotification(title, body)) return;

        try {
            new Notification(title, {
                body,
                icon: '/icon-192x192.png',
                badge: '/icon-192x192.png',
                tag: `mihrab-${Date.now()}`,
                requireInteraction: true,
                silent: !settings.sound,
            });

            if (settings.sound) {
                try {
                    const audio = new Audio('/notification.mp3');
                    audio.volume = 0.5;
                    audio.play().catch(() => { });
                } catch (e) { }
            }
        } catch (e) {
            console.error('Notification failed:', e);
        }
    }, []);

    useEffect(() => {
        if (!prayerTimings || !isNotificationSupported) return;

        const getTodayKey = () => {
            const now = new Date();
            return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
        };

        const checkPrayerTimes = () => {
            if (!isNotificationSupported) return;
            const settings = getStoredSettings();
            if (Notification.permission !== 'granted' || !settings.enabled) return;

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            if (currentMinutes === lastCheckMinuteRef.current) return;
            lastCheckMinuteRef.current = currentMinutes;

            const todayKey = getTodayKey();
            const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

            for (const prayer of prayers) {
                const timeStr = prayerTimings[prayer];
                if (!timeStr) continue;

                const normalized = normalizeTime(timeStr);
                const [hours, minutes] = normalized.split(':').map(Number);
                if (isNaN(hours) || isNaN(minutes)) continue;

                const prayerMinutes = hours * 60 + minutes;
                const diff = prayerMinutes - currentMinutes;

                if (settings.prayerReminder) {
                    const reminderKey = `${todayKey}-${prayer}-reminder`;
                    if (diff >= 0 && diff <= settings.reminderMinutes && !sentNotificationsRef.current.has(reminderKey)) {
                        const arabicName = prayerNamesArabic[prayer];
                        if (diff > 0) {
                            sendNotification(`تذكير بصلاة ${arabicName}`, `بقي ${diff} دقيقة على أذان ${arabicName}`);
                        }
                        sentNotificationsRef.current.add(reminderKey);
                    }

                    const athanKey = `${todayKey}-${prayer}-athan`;
                    if (diff === 0 && !sentNotificationsRef.current.has(athanKey)) {
                        const arabicName = prayerNamesArabic[prayer];
                        sendNotification(`حان وقت أذان ${arabicName}`, `حيّ على الصلاة - حان الآن موعد صلاة ${arabicName}`);
                        sentNotificationsRef.current.add(athanKey);

                        if (prayer === 'Fajr' && settings.morningAdhkar) {
                            const morningKey = `${todayKey}-morning-adhkar`;
                            if (!sentNotificationsRef.current.has(morningKey)) {
                                setTimeout(() => {
                                    const dhikr = morningAdhkar[Math.floor(Math.random() * morningAdhkar.length)];
                                    sendNotification('حان وقت أذكار الصباح', dhikr);
                                    sentNotificationsRef.current.add(morningKey);
                                }, 3000);
                            }
                        }
                    }
                }

                if (settings.iqamaReminder) {
                    const iqamaOffset = IQAMA_OFFSETS[prayer] || 15;
                    const iqamaTime = prayerMinutes + iqamaOffset;
                    const iqamaReminderTime = iqamaTime - 5;

                    const iqamaKey = `${todayKey}-${prayer}-iqama`;
                    if (currentMinutes >= iqamaReminderTime && currentMinutes <= iqamaTime && !sentNotificationsRef.current.has(iqamaKey)) {
                        const arabicName = prayerNamesArabic[prayer];
                        const remaining = iqamaTime - currentMinutes;
                        sendNotification(`تنبيه الإقامة - صلاة ${arabicName}`, `بقي ${remaining} دقائق على إقامة صلاة ${arabicName}`);
                        sentNotificationsRef.current.add(iqamaKey);
                    }
                }
            }

            const maghribTime = prayerTimings['Maghrib'];
            if (maghribTime && settings.eveningAdhkar) {
                const normalizedMaghrib = normalizeTime(maghribTime);
                const [mHours, mMinutes] = normalizedMaghrib.split(':').map(Number);
                if (!isNaN(mHours) && !isNaN(mMinutes)) {
                    const maghribMinutes = mHours * 60 + mMinutes;
                    const eveningKey = `${todayKey}-evening-adhkar`;

                    if (currentMinutes === maghribMinutes && !sentNotificationsRef.current.has(eveningKey)) {
                        setTimeout(() => {
                            const dhikr = eveningAdhkar[Math.floor(Math.random() * eveningAdhkar.length)];
                            sendNotification('حان وقت أذكار المساء', dhikr);
                            sentNotificationsRef.current.add(eveningKey);
                        }, 3000);
                    }
                }
            }
        };

        checkPrayerTimes();
        const interval = setInterval(checkPrayerTimes, 15000);

        return () => clearInterval(interval);
    }, [prayerTimings, sendNotification]);

    useEffect(() => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const msUntilMidnight = midnight.getTime() - now.getTime();

        const resetTimeout = setTimeout(() => {
            sentNotificationsRef.current.clear();
            lastCheckMinuteRef.current = -1;
        }, msUntilMidnight);

        return () => clearTimeout(resetTimeout);
    }, []);
}
