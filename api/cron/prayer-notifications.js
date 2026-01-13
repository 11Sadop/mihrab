// api/cron/prayer-notifications.js
// Called by Vercel Cron to check and send prayer time notifications

const prayerNames = {
    fajr: 'الفجر',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء'
};

async function getPrayerTimes(latitude, longitude) {
    const today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const url = 'https://api.aladhan.com/v1/timings/' + date + '?latitude=' + latitude + '&longitude=' + longitude + '&method=4';
    const response = await fetch(url);
    const data = await response.json();
    return data.data.timings;
}

function isWithinTimeWindow(prayerTime, windowMinutes) {
    const now = new Date();
    const parts = prayerTime.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const prayerDate = new Date();
    prayerDate.setHours(hours, minutes, 0, 0);
    const diffMs = Math.abs(now - prayerDate);
    const diffMinutes = diffMs / (1000 * 60);
    return diffMinutes <= (windowMinutes || 5);
}

export default async function handler(req, res) {
    console.log('Prayer notification cron triggered at:', new Date().toISOString());
    try {
        const baseUrl = process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000';
        const tokensRes = await fetch(baseUrl + '/api/push/register');
        const tokensData = await tokensRes.json();
        const tokens = tokensData.tokens;

        if (!tokens || tokens.length === 0) {
            return res.status(200).json({ message: 'No tokens to notify' });
        }

        const latitude = 24.7136;
        const longitude = 46.6753;
        const prayerTimes = await getPrayerTimes(latitude, longitude);
        let notificationSent = false;

        for (const prayer in prayerTimes) {
            const time = prayerTimes[prayer];
            const prayerKey = prayer.toLowerCase();
            const prayerName = prayerNames[prayerKey];
            if (prayerName && isWithinTimeWindow(time, 2)) {
                await fetch(baseUrl + '/api/push/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tokens: tokens,
                        title: 'حان وقت صلاة ' + prayerName,
                        body: 'حي على الصلاة - حي على الفلاح',
                        data: { type: 'adhan', prayer: prayerKey, time: time }
                    })
                });
                notificationSent = true;
            }
        }
        return res.status(200).json({ success: true, notificationSent: notificationSent });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
