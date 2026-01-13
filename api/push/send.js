// api/push/send.js
// Send push notifications using Firebase Admin SDK

import admin from 'firebase-admin';

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
      try {
                const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
                admin.initializeApp({
                              credential: admin.credential.cert(serviceAccount)
                });
                console.log('Firebase Admin initialized');
      } catch (error) {
                console.error('Firebase Admin init error:', error.message);
      }
}

export default async function handler(req, res) {
      // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
              return res.status(200).end();
    }

    if (req.method !== 'POST') {
              return res.status(405).json({ error: 'Method not allowed' });
    }

    const { tokens, title, body, data } = req.body;

    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
              return res.status(400).json({ error: 'tokens array is required' });
    }

    if (!title) {
              return res.status(400).json({ error: 'title is required' });
    }

    try {
              const message = {
                            tokens: tokens,
                            notification: {
                                              title: title,
                                              body: body || ''
                            },
                            data: data || {},
                            webpush: {
                                              notification: {
                                                                    icon: '/icon-192.png',
                                                                    badge: '/icon-192.png',
                                                                    dir: 'rtl',
                                                                    lang: 'ar',
                                                                    vibrate: [200, 100, 200],
                                                                    requireInteraction: true
                                              }
                            }
              };

          const response = await admin.messaging().sendEachForMulticast(message);

          console.log('Sent:', response.successCount, 'Failed:', response.failureCount);

          return res.status(200).json({
                        success: true,
                        successCount: response.successCount,
                        failureCount: response.failureCount
          });
    } catch (error) {
              console.error('Send error:', error.message);
              return res.status(500).json({ error: error.message });
    }
}
