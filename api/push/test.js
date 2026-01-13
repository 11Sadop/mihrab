// api/push/test.js
// Quick test endpoint to send a notification to all registered tokens

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'POST only' });
    }

    try {
        // Use the request host header to build the base URL
        const host = req.headers.host || 'mihrabapp.com';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const baseUrl = protocol + '://' + host;
        
        console.log('Using baseUrl:', baseUrl);
        
        // Get all tokens from register endpoint
        const tokensRes = await fetch(baseUrl + '/api/push/register', {
            method: 'GET'
        });
        
        if (!tokensRes.ok) {
            const text = await tokensRes.text();
            console.error('Register endpoint error:', text);
            return res.status(500).json({ error: 'Failed to get tokens', status: tokensRes.status });
        }
        
        const tokensData = await tokensRes.json();
        const tokens = tokensData.tokens || [];

        if (tokens.length === 0) {
            return res.status(400).json({
                error: 'No tokens registered',
                message: 'Enable notifications in the app first'
            });
        }

        // Send test notification
        const sendRes = await fetch(baseUrl + '/api/push/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tokens: tokens,
                title: 'Test Notification',
                body: 'Notifications are working!',
                data: { type: 'test' }
            })
        });

        if (!sendRes.ok) {
            const text = await sendRes.text();
            console.error('Send endpoint error:', text);
            return res.status(500).json({ error: 'Failed to send', status: sendRes.status });
        }

        const result = await sendRes.json();

        return res.status(200).json({
            success: true,
            tokensCount: tokens.length,
            ...result
        });
    } catch (error) {
        console.error('Test error:', error);
        return res.status(500).json({ error: error.message });
    }
}
