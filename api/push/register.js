// api/push/register.js
// Token storage using Vercel KV for persistence

import { kv } from '@vercel/kv';

const TOKENS_KEY = 'fcm_tokens';

export default async function handler(req, res) {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
                res.status(200).end();
                return;
    }

    try {
                if (req.method === 'POST') {
                                const { token } = req.body;
                                if (!token) {
                                                    return res.status(400).json({ error: 'Token is required' });
                                }
                                let tokens = await kv.get(TOKENS_KEY) || [];
                                if (!tokens.includes(token)) {
                                                    tokens.push(token);
                                                    await kv.set(TOKENS_KEY, tokens);
                                                    console.log('Token registered, total:', tokens.length);
                                }
                                return res.status(200).json({ success: true, totalTokens: tokens.length });
                }

            if (req.method === 'GET') {
                            const tokens = await kv.get(TOKENS_KEY) || [];
                            return res.status(200).json({ tokens: tokens, count: tokens.length });
            }

            if (req.method === 'DELETE') {
                            const { token } = req.body;
                            if (!token) {
                                                return res.status(400).json({ error: 'Token is required' });
                            }
                            let tokens = await kv.get(TOKENS_KEY) || [];
                            tokens = tokens.filter(t => t !== token);
                            await kv.set(TOKENS_KEY, tokens);
                            return res.status(200).json({ success: true, totalTokens: tokens.length });
            }

            return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
                console.error('KV Error:', error.message);
                return res.status(500).json({ error: error.message });
    }
}
