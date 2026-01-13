import admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : undefined;

if (!admin.apps.length && serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

interface PrayerNotification {
    prayerName: string;
    prayerTime: string;
    type: 'adhan' | 'reminder' | 'adhkar';
}

export async function subscribeToTopic(token: string, topic: string): Promise<void> {
    if (!admin.apps.length) return;
    try {
        await admin.messaging().subscribeToTopic(token, topic);
        console.log(`Subscribed ${token.substring(0, 10)}... to ${topic}`);
    } catch (error) {
        console.error('Error subscribing to topic:', error);
    }
}

export async function sendToTopic(topic: string, notification: PrayerNotification): Promise<void> {
    if (!admin.apps.length) {
        console.log('Firebase not initialized, skipping notification');
        return;
    }

    const message = {
        topic: topic,
        notification: {
            title: getNotificationTitle(notification),
            body: getNotificationBody(notification)
        },
        data: {
            type: notification.type,
            prayerName: notification.prayerName,
            prayerTime: notification.prayerTime
        },
        webpush: {
            headers: { Urgency: 'high' },
            notification: {
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                dir: 'rtl' as const,
                lang: 'ar',
                vibrate: [200, 100, 200],
                requireInteraction: true
            }
        }
    };

    try {
        await admin.messaging().send(message);
        console.log(`Notification sent to topic ${topic}`);
    } catch (error) {
        console.error(`Error sending to topic ${topic}:`, error);
    }
}

export async function sendNotification(token: string, title: string, body: string, data?: Record<string, string>): Promise<boolean> {
    if (!admin.apps.length) return false;
    try {
        await admin.messaging().send({
            token,
            notification: { title, body },
            data
        });
        return true;
    } catch (error) {
        console.error('Error sending notification:', error);
        return false;
    }
}

function getNotificationTitle(notification: PrayerNotification): string {
    switch (notification.type) {
        case 'adhan': return `حان الآن وقت صلاة ${notification.prayerName}`;
        case 'reminder': return `تذكير بصلاة ${notification.prayerName}`;
        case 'adhkar': return notification.prayerName;
        default: return 'محراب';
    }
}

function getNotificationBody(notification: PrayerNotification): string {
    switch (notification.type) {
        case 'adhan': return 'حي على الصلاة - حي على الفلاح';
        case 'reminder': return 'باقي 5 دقائق على الإقامة';
        case 'adhkar': return 'حافظ على أذكارك اليومية';
        default: return '';
    }
}
