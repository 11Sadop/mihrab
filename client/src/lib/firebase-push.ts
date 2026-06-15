import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { apiRequest } from './queryClient';
const firebaseConfig = {
    apiKey: "AIzaSyAxSyfXuj4pLzNbOBrMlX3HKGTxi0O2VuQ",
    authDomain: "mihrabapp-32e80.firebaseapp.com",
    projectId: "mihrabapp-32e80",
    storageBucket: "mihrabapp-32e80.firebasestorage.app",
    messagingSenderId: "1057466774502",
    appId: "1:1057466774502:web:0c8f703b608ac84d8c9c27",
    measurementId: "G-F83Y15G82N"
};
const VAPID_KEY = "BEgViuHZNlIDT4Wu2lzmQKffccm5lCDoO-_Ar3_ALmE89-EBBDIYyQV8OCWJY1YmjN67OR1M_mnRgVcudgBp8gI";
let app: any = null;
let messaging: any = null;
// Check if running as installed PWA (for iOS support)
function isInstalledPWA(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
}
// Check if iOS
function isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}
// Check if iOS 16.4+ (supports web push)
function isIOSWithPushSupport(): boolean {
    if (!isIOS()) return false;
    const match = navigator.userAgent.match(/OS (\d+)_(\d+)/);
    if (match) {
        const major = parseInt(match[1], 10);
        const minor = parseInt(match[2], 10);
        return major > 16 || (major === 16 && minor >= 4);
    }
    return false;
}
// Initialize Firebase only when needed
async function initializeFirebase() {
    if (app && messaging) return { app, messaging };
    try {
        // Check if messaging is supported
        const supported = await isSupported();
        if (!supported) {
            console.log('Firebase Messaging not supported on this browser');
            return null;
        }
        app = initializeApp(firebaseConfig);
        messaging = getMessaging(app);
        return { app, messaging };
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return null;
    }
}
//Request notification permission - MUST be called from user gesture on iOS
export async function requestNotificationPermission(): Promise<string | null> {
    try {
        // Check basic support
        if (!('Notification' in window)) {
            console.log('Notifications not supported');
            return null;
        }
        // Special handling for iOS
        if (isIOS()) {
            if (!isIOSWithPushSupport()) {
                console.log('iOS version does not support web push (needs 16.4+)');
                return null;
            }
            if (!isInstalledPWA()) {
                console.log('iOS requires app to be installed to home screen for push notifications');
                return null;
            }
        }
        // Request permission
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.log('Notification permission denied');
            return null;
        }
        // Wait for Service Worker to be ready first
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.ready;
            console.log('Service Worker is ready');
        }
        // Initialize Firebase
        const firebase = await initializeFirebase();
        if (!firebase) return null;
        // Get FCM token
        const token = await getToken(firebase.messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: await navigator.serviceWorker.getRegistration('/sw.js')
        });
        console.log('FCM Token obtained:', token.substring(0, 20) + '...');

        // Get user location for prayer time notifications
        let locationData: { city?: string; country?: string; latitude?: number; longitude?: number } = {};
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000,
                    maximumAge: 3600000, // cache for 1 hour
                    enableHighAccuracy: false,
                });
            });
            const { latitude, longitude } = position.coords;
            locationData.latitude = latitude;
            locationData.longitude = longitude;

            // Reverse geocode to get city/country
            try {
                const geoResp = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
                    { headers: { 'User-Agent': 'Mihrab App' } }
                );
                const geoData = await geoResp.json();
                locationData.city = geoData.address?.city || geoData.address?.town || geoData.address?.state || 'unknown';
                locationData.country = geoData.address?.country_code?.toUpperCase() || 'unknown';
                console.log('Location resolved:', locationData.city, locationData.country);
            } catch (geoErr) {
                // Default to Riyadh if reverse geocoding fails
                locationData.city = 'Riyadh';
                locationData.country = 'SA';
            }
        } catch (locErr) {
            // Default to Riyadh if geolocation fails
            locationData = { city: 'Riyadh', country: 'SA', latitude: 24.7136, longitude: 46.6753 };
            console.log('Geolocation failed, using default: Riyadh, SA');
        }

        // Get user settings
        const methodUrl = localStorage.getItem('calculation_method');
        const method = methodUrl ? parseInt(methodUrl, 10) : 4;
        
        let isActive = true;
        try {
            const savedSettings = localStorage.getItem('notification_settings');
            if (savedSettings) {
                isActive = JSON.parse(savedSettings).enabled ?? true;
            }
        } catch(e) {}

        // Send token WITH location and settings to server
        await apiRequest("POST", "/api/push/register", { 
            token, 
            ...locationData, 
            method,
            isActive
        });
        console.log('Token registered with server (with location and method)');
        return token;
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return null;
    }
}
// Check if notifications can be enabled on this device
export function canEnableNotifications(): { supported: boolean; reason?: string } {
    if (!('Notification' in window)) {
        return { supported: false, reason: 'not_supported' };
    }
    if (isIOS()) {
        if (!isIOSWithPushSupport()) {
            return { supported: false, reason: 'ios_version' };
        }
        if (!isInstalledPWA()) {
            return { supported: false, reason: 'ios_not_installed' };
        }
    }
    return { supported: true };
}
// Setup foreground message handling
export function setupForegroundMessaging(): void {
    initializeFirebase().then((firebase) => {
        if (!firebase) return;
        onMessage(firebase.messaging, (payload) => {
            console.log('Foreground message received:', payload);
            if (payload.notification) {
                // Show notification manually for foreground
                new Notification(payload.notification.title || 'محراب', {
                    body: payload.notification.body,
                    icon: '/icon-192.png',
                    dir: 'rtl',
                    lang: 'ar'
                });
            }
        });
    }).catch(err => console.log('Foreground messaging setup failed:', err));
}
// Initialize Firebase messaging (call on app start)
export function initializeFirebaseMessaging(): void {
    try {
        // ===== FIX: Check if serviceWorker is supported before registering =====
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('Service Worker registered'))
                .catch(err => console.log('SW registration failed:', err));
        }
        console.log('Firebase messaging initialized (using /sw.js)');
        // Setup foreground messaging if already permitted
        if ('Notification' in window && Notification.permission === 'granted') {
            setupForegroundMessaging();
            requestNotificationPermission().catch(err => console.log('Token auto-refresh failed:', err));
        }
    } catch (error) {
        console.error('Firebase messaging initialization error:', error);
    }
}
// Get current notification permission status
export function getNotificationStatus(): 'granted' | 'denied' | 'default' | 'unsupported' {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
}
