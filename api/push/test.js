// api/push/test.js
// Test endpoint to manually trigger a notification

import admin from 'firebase-admin';

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
        if (serviceAccount.project_id) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log('✅ Firebase Admin initialized for test');
        } else {
            console.error('❌ FIREBASE_SERVICE_ACCOUNT not configured');
        }
    } catch (error) {
        console.error('❌ Firebase Admin init error:', error.message);
    }
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const debugInfo = {
        timestamp: new Date().toISOString(),
        firebaseInitialized: admin.apps.length > 0,
        envVars: {
            hasFirebaseServiceAccount: !!process.env.FIREBASE_SERVICE_ACCOUNT,
            hasVercelKV: !!process.env.KV_REST_API_URL,
            vercelUrl: process.env.VERCEL_URL || 'not set'
        }
    };

    // Get tokens count
    try {
        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000';

        const tokensRes = await fetch(`${baseUrl}/api/push/register`);
        const tokensData = await tokensRes.json();
        debugInfo.tokensCount = tokensData.count || 0;
        debugInfo.tokensFetched = true;
    } catch (e) {
        debugInfo.tokensError = e.message;
        debugInfo.tokensFetched = false;
    }

    // Try to send test notification if tokens exist and method is POST
    if (req.method === 'POST' && debugInfo.tokensCount > 0) {
        try {
            const baseUrl = process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : 'http://localhost:3000';

            const sendRes = await fetch(`${baseUrl}/api/push/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tokens: (await (await fetch(`${baseUrl}/api/push/register`)).json()).tokens,
                    title: '🧪 إشعار تجريبي',
                    body: 'هذا إشعار تجريبي من محراب - ' + new Date().toLocaleTimeString('ar-SA'),
                    data: { type: 'test' }
                })
            });

            debugInfo.sendResult = await sendRes.json();
            debugInfo.testNotificationSent = true;
        } catch (e) {
            debugInfo.sendError = e.message;
            debugInfo.testNotificationSent = false;
        }
    }

    return res.status(200).json(debugInfo);
}
