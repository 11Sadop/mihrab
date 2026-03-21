import { storage } from "./storage";
import { sendToTopic } from "./server-notifications";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

export async function processPrayerNotifications() {
    try {
        const locations = await storage.getDistinctLocations();
        const now = new Date();

        console.log(`Processing prayers for ${locations.length} locations at ${now.toISOString()}`);

        for (const loc of locations) {
            if (!loc.latitude || !loc.longitude) continue;

            const coords = new Coordinates(loc.latitude, loc.longitude);
            let params = CalculationMethod.UmmAlQura();
            
            // Map integer method to adhan library CalculationMethod
            switch (loc.method) {
                case 0: params = CalculationMethod.Tehran(); break; // Shia Ithna-Ashari uses Tehran params approximation
                case 1: params = CalculationMethod.Karachi(); break;
                case 2: params = CalculationMethod.NorthAmerica(); break;
                case 3: params = CalculationMethod.MuslimWorldLeague(); break;
                case 4: params = CalculationMethod.UmmAlQura(); break;
                case 5: params = CalculationMethod.Egyptian(); break;
                case 7: params = CalculationMethod.Tehran(); break;
                case 8: params = CalculationMethod.Dubai(); break;
                case 9: params = CalculationMethod.Kuwait(); break;
                case 10: params = CalculationMethod.Qatar(); break;
                case 11: params = CalculationMethod.Singapore(); break;
                case 12: params = CalculationMethod.MuslimWorldLeague(); break; // France Uses MWL angles usually
                case 13: params = CalculationMethod.Turkey(); break;
                case 14: params = CalculationMethod.MuslimWorldLeague(); break; // Russia approximation
            }
            
            const prayerTimes = new PrayerTimes(coords, now, params);

            // Prayer notifications
            await checkAndSendPrayer(now, prayerTimes.fajr, 'الفجر', loc);
            await checkAndSendPrayer(now, prayerTimes.dhuhr, 'الظهر', loc);
            await checkAndSendPrayer(now, prayerTimes.asr, 'العصر', loc);
            await checkAndSendPrayer(now, prayerTimes.maghrib, 'المغرب', loc);
            await checkAndSendPrayer(now, prayerTimes.isha, 'العشاء', loc);

            // Morning Adhkar - after Fajr (within 30 mins)
            await checkAndSendAdhkar(now, prayerTimes.fajr, 'أذكار الصباح', loc, 30);
            
            // Evening Adhkar - after Asr (within 30 mins)
            await checkAndSendAdhkar(now, prayerTimes.asr, 'أذكار المساء', loc, 30);
        }
    } catch (error) {
        console.error('Error in processPrayerNotifications:', error);
    }
}

async function checkAndSendPrayer(now: Date, prayerTime: Date, name: string, loc: any) {
    const diff = (prayerTime.getTime() - now.getTime()) / 1000 / 60;

    // Send if prayer is within next 16 minutes
    if (diff >= 0 && diff <= 16) {
        const topic = `prayer_${sanitize(loc.country)}_${sanitize(loc.city)}`;
        console.log(`Sending adhan notification to ${topic}: ${name}`);

        await sendToTopic(topic, {
            prayerName: name,
            prayerTime: prayerTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
            type: 'adhan'
        });
    }
}

async function checkAndSendAdhkar(now: Date, prayerTime: Date, name: string, loc: any, windowMins: number) {
    const diff = (now.getTime() - prayerTime.getTime()) / 1000 / 60;

    // Send if prayer was within last windowMins minutes
    if (diff >= 0 && diff <= windowMins && diff >= windowMins - 16) {
        const topic = `prayer_${sanitize(loc.country)}_${sanitize(loc.city)}`;
        console.log(`Sending adhkar notification to ${topic}: ${name}`);

        await sendToTopic(topic, {
            prayerName: name,
            prayerTime: '',
            type: 'adhkar'
        });
    }
}

function sanitize(str: string) {
    if (!str) return 'unknown';
    return str.replace(/[^a-zA-Z0-9]/g, '_');
}
