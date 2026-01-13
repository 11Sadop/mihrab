import admin from 'firebase-admin';

// Initialize Firebase Admin with environment variable
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
    : null;

if (serviceAccount) {
    admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
    });
}

// Send notification to a single device
export async function sendNotification(
    token: string,
    title: string,
    body: string,
    data?: Record<string, string>
  ): Promise<boolean> {
    if (!serviceAccount) {
          console.error('Firebase Admin not initialized - missing FIREBASE_SERVICE_ACCOUNT');
          return false;
    }

  try {
        const message = {
                token,
                notification: { title, body },
                data: data || {},
                webpush: {
                          notification: {
                                      icon: '/icons/icon-192x192.png',
                                      badge: '/icons/badge-72x72.png',
                                      vibrate: [200, 100, 200]
                          }
                }
        };

      await admin.messaging().send(message);
        return true;
  } catch (error: any) {
        console.error('Error sending notification:', error.message);
        return false;
  }
}

// Send notification to multiple devices
export async function sendNotificationToMany(
    tokens: string[],
    title: string,
    body: string,
    data?: Record<string, string>
  ): Promise<{ success: number; failure: number }> {
    if (!serviceAccount) {
          return { success: 0, failure: tokens.length };
    }

  try {
        const message = {
                tokens,
                notification: { title, body },
                data: data || {},
                webpush: {
                          notification: {
                                      icon: '/icons/icon-192x192.png',
                                      badge: '/icons/badge-72x72.png',
                                      vibrate: [200, 100, 200]
                          }
                }
        };

      const response = await admin.messaging().sendEachForMulticast(message);
        return {
                success: response.successCount,
                failure: response.failureCount
        };
  } catch (error) {
        return { success: 0, failure: tokens.length };
  }
}

export default admin;
