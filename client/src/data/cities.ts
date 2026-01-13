export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const cities: City[] = [
  // السعودية
  { id: "makkah", name: "مكة المكرمة", country: "السعودية", latitude: 21.4225, longitude: 39.8262 },
  { id: "madinah", name: "المدينة المنورة", country: "السعودية", latitude: 24.5247, longitude: 39.5692 },
  { id: "riyadh", name: "الرياض", country: "السعودية", latitude: 24.7136, longitude: 46.6753 },
  { id: "jeddah", name: "جدة", country: "السعودية", latitude: 21.5433, longitude: 39.1728 },
  { id: "dammam", name: "الدمام", country: "السعودية", latitude: 26.4207, longitude: 50.0888 },
  { id: "taif", name: "الطائف", country: "السعودية", latitude: 21.2703, longitude: 40.4158 },
  { id: "abha", name: "أبها", country: "السعودية", latitude: 18.2164, longitude: 42.5053 },
  { id: "tabuk", name: "تبوك", country: "السعودية", latitude: 28.3838, longitude: 36.5550 },
  { id: "qassim", name: "القصيم", country: "السعودية", latitude: 26.3260, longitude: 43.9750 },
  { id: "hail", name: "حائل", country: "السعودية", latitude: 27.5114, longitude: 41.7208 },
  { id: "khobar", name: "الخبر", country: "السعودية", latitude: 26.2172, longitude: 50.1971 },
  { id: "jubail", name: "الجبيل", country: "السعودية", latitude: 27.0046, longitude: 49.6225 },
  { id: "yanbu", name: "ينبع", country: "السعودية", latitude: 24.0895, longitude: 38.0618 },
  { id: "najran", name: "نجران", country: "السعودية", latitude: 17.4933, longitude: 44.1277 },
  { id: "jazan", name: "جازان", country: "السعودية", latitude: 16.8894, longitude: 42.5511 },
  // الإمارات
  { id: "dubai", name: "دبي", country: "الإمارات", latitude: 25.2048, longitude: 55.2708 },
  { id: "abudhabi", name: "أبوظبي", country: "الإمارات", latitude: 24.4539, longitude: 54.3773 },
  { id: "sharjah", name: "الشارقة", country: "الإمارات", latitude: 25.3463, longitude: 55.4209 },
  { id: "alain", name: "العين", country: "الإمارات", latitude: 24.1302, longitude: 55.8023 },
  // الخليج
  { id: "doha", name: "الدوحة", country: "قطر", latitude: 25.2854, longitude: 51.5310 },
  { id: "kuwait", name: "الكويت", country: "الكويت", latitude: 29.3759, longitude: 47.9774 },
  { id: "manama", name: "المنامة", country: "البحرين", latitude: 26.2285, longitude: 50.5860 },
  { id: "muscat", name: "مسقط", country: "عمان", latitude: 23.5880, longitude: 58.3829 },
  // مصر
  { id: "cairo", name: "القاهرة", country: "مصر", latitude: 30.0444, longitude: 31.2357 },
  { id: "alexandria", name: "الإسكندرية", country: "مصر", latitude: 31.2001, longitude: 29.9187 },
  { id: "giza", name: "الجيزة", country: "مصر", latitude: 30.0131, longitude: 31.2089 },
  // الشام
  { id: "amman", name: "عمّان", country: "الأردن", latitude: 31.9454, longitude: 35.9284 },
  { id: "beirut", name: "بيروت", country: "لبنان", latitude: 33.8938, longitude: 35.5018 },
  { id: "damascus", name: "دمشق", country: "سوريا", latitude: 33.5138, longitude: 36.2765 },
  { id: "baghdad", name: "بغداد", country: "العراق", latitude: 33.3152, longitude: 44.3661 },
  { id: "jerusalem", name: "القدس", country: "فلسطين", latitude: 31.7683, longitude: 35.2137 },
  // المغرب العربي
  { id: "rabat", name: "الرباط", country: "المغرب", latitude: 34.0209, longitude: -6.8416 },
  { id: "casablanca", name: "الدار البيضاء", country: "المغرب", latitude: 33.5731, longitude: -7.5898 },
  { id: "algiers", name: "الجزائر", country: "الجزائر", latitude: 36.7538, longitude: 3.0588 },
  { id: "tunis", name: "تونس", country: "تونس", latitude: 36.8065, longitude: 10.1815 },
  { id: "tripoli", name: "طرابلس", country: "ليبيا", latitude: 32.8872, longitude: 13.1913 },
  // أفريقيا
  { id: "khartoum", name: "الخرطوم", country: "السودان", latitude: 15.5007, longitude: 32.5599 },
  // اليمن
  { id: "sanaa", name: "صنعاء", country: "اليمن", latitude: 15.3694, longitude: 44.1910 },
  { id: "aden", name: "عدن", country: "اليمن", latitude: 12.7855, longitude: 45.0187 },
  // تركيا
  { id: "istanbul", name: "إسطنبول", country: "تركيا", latitude: 41.0082, longitude: 28.9784 },
  { id: "ankara", name: "أنقرة", country: "تركيا", latitude: 39.9334, longitude: 32.8597 },
  // أوروبا
  { id: "london", name: "لندن", country: "بريطانيا", latitude: 51.5074, longitude: -0.1278 },
  { id: "paris", name: "باريس", country: "فرنسا", latitude: 48.8566, longitude: 2.3522 },
  { id: "berlin", name: "برلين", country: "ألمانيا", latitude: 52.5200, longitude: 13.4050 },
  { id: "amsterdam", name: "أمستردام", country: "هولندا", latitude: 52.3676, longitude: 4.9041 },
  { id: "brussels", name: "بروكسل", country: "بلجيكا", latitude: 50.8503, longitude: 4.3517 },
  { id: "vienna", name: "فيينا", country: "النمسا", latitude: 48.2082, longitude: 16.3738 },
  { id: "rome", name: "روما", country: "إيطاليا", latitude: 41.9028, longitude: 12.4964 },
  { id: "madrid", name: "مدريد", country: "إسبانيا", latitude: 40.4168, longitude: -3.7038 },
  // أمريكا
  { id: "newyork", name: "نيويورك", country: "أمريكا", latitude: 40.7128, longitude: -74.0060 },
  { id: "losangeles", name: "لوس أنجلوس", country: "أمريكا", latitude: 34.0522, longitude: -118.2437 },
  { id: "chicago", name: "شيكاغو", country: "أمريكا", latitude: 41.8781, longitude: -87.6298 },
  { id: "houston", name: "هيوستن", country: "أمريكا", latitude: 29.7604, longitude: -95.3698 },
  { id: "toronto", name: "تورنتو", country: "كندا", latitude: 43.6532, longitude: -79.3832 },
  { id: "montreal", name: "مونتريال", country: "كندا", latitude: 45.5017, longitude: -73.5673 },
  // آسيا
  { id: "kualalumpur", name: "كوالالمبور", country: "ماليزيا", latitude: 3.1390, longitude: 101.6869 },
  { id: "jakarta", name: "جاكرتا", country: "إندونيسيا", latitude: -6.2088, longitude: 106.8456 },
  { id: "singapore", name: "سنغافورة", country: "سنغافورة", latitude: 1.3521, longitude: 103.8198 },
  { id: "bangkok", name: "بانكوك", country: "تايلاند", latitude: 13.7563, longitude: 100.5018 },
  { id: "islamabad", name: "إسلام آباد", country: "باكستان", latitude: 33.6844, longitude: 73.0479 },
  { id: "karachi", name: "كراتشي", country: "باكستان", latitude: 24.8607, longitude: 67.0011 },
  { id: "newdelhi", name: "نيودلهي", country: "الهند", latitude: 28.6139, longitude: 77.2090 },
  { id: "mumbai", name: "مومباي", country: "الهند", latitude: 19.0760, longitude: 72.8777 },
  // أستراليا
  { id: "sydney", name: "سيدني", country: "أستراليا", latitude: -33.8688, longitude: 151.2093 },
  { id: "melbourne", name: "ملبورن", country: "أستراليا", latitude: -37.8136, longitude: 144.9631 },
];

// تجميع المدن حسب الدولة
export const citiesByCountry = cities.reduce((acc, city) => {
  if (!acc[city.country]) {
    acc[city.country] = [];
  }
  acc[city.country].push(city);
  return acc;
}, {} as Record<string, City[]>);

// ترتيب الدول (السعودية أولاً ثم الخليج ثم باقي الدول العربية ثم العالم)
export const countryOrder = [
  "السعودية",
  "الإمارات",
  "قطر",
  "الكويت",
  "البحرين",
  "عمان",
  "مصر",
  "الأردن",
  "لبنان",
  "سوريا",
  "العراق",
  "فلسطين",
  "المغرب",
  "الجزائر",
  "تونس",
  "ليبيا",
  "السودان",
  "اليمن",
  "تركيا",
  "بريطانيا",
  "فرنسا",
  "ألمانيا",
  "هولندا",
  "بلجيكا",
  "النمسا",
  "إيطاليا",
  "إسبانيا",
  "أمريكا",
  "كندا",
  "ماليزيا",
  "إندونيسيا",
  "سنغافورة",
  "تايلاند",
  "باكستان",
  "الهند",
  "أستراليا",
];
