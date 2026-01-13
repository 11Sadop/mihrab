export type IntentType = 
    | 'sleep' | 'wake_up' | 'market' | 'travel' | 'food' | 'sadness' | 'mosque' 
    | 'home_exit' | 'home_enter' | 'morning' | 'evening' | 'exam' | 'school' 
    | 'surgery' | 'hospital' | 'work' | 'interview' | 'wedding' | 'rain' 
    | 'thunder' | 'visit_sick' | 'debt' | 'anger' | 'new_clothes' | 'mirror'
    | 'car' | 'airplane' | 'death' | 'newborn' | 'meeting' | 'stress' | 'fear';

export interface AssistantIntent {
    id: IntentType;
    keywords: string[];
    title: string;
    icon: string;
    duas: { text: string; source?: string }[];
    sunan: string[];
    alert?: string;
}

export const SMART_ASSISTANT_DATA: AssistantIntent[] = [
    {
        id: 'sleep',
        keywords: ['بنام', 'نوم', 'نعسان', 'برقد', 'تصبحون', 'فراش', 'سرير', 'ابغى انام'],
        title: 'آداب وأذكار النوم',
        icon: '🛌',
        duas: [
            { text: "بِاسْمِكَ رَبِّـي وَضَعْـتُ جَنْـبي", source: "رواه البخاري" }
        ],
        sunan: ["الوضوء قبل النوم", "النوم على الشق الأيمن"],
        alert: "من قرأ آية الكرسي قبل النوم لن يزال عليه من الله حافظ"
    },
    {
        id: 'exam',
        keywords: ['اختبار', 'امتحان', 'فاينل', 'كويز', 'عندي اختبار'],
        title: 'أدعية قبل الاختبار',
        icon: '📝',
        duas: [
            { text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", source: "سورة طه" },
            { text: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا", source: "صحيح ابن حبان" }
        ],
        sunan: ["التوكل على الله", "صلاة ركعتين قبل الخروج"],
        alert: "احرص على ما ينفعك واستعن بالله ولا تعجز"
    },
    {
        id: 'surgery',
        keywords: ['عملية', 'جراحة', 'مستشفى', 'تخدير'],
        title: 'قبل العمليات الجراحية',
        icon: '🏥',
        duas: [
            { text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ", source: "رواه الترمذي" },
            { text: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي", source: "متفق عليه" }
        ],
        sunan: ["التوكل على الله", "حسن الظن بالله"]
    },
    {
        id: 'work',
        keywords: ['شغل', 'دوام', 'وظيفة', 'رايح الشغل', 'عمل'],
        title: 'الذهاب للعمل',
        icon: '💼',
        duas: [
            { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا", source: "رواه ابن ماجه" }
        ],
        sunan: ["الإتقان في العمل", "أداء الأمانة"]
    },
    {
        id: 'rain',
        keywords: ['مطر', 'غيث', 'امطار', 'تمطر'],
        title: 'دعاء نزول المطر',
        icon: '🌧️',
        duas: [
            { text: "اللَّهُمَّ صَيِّبًا نَافِعًا", source: "رواه البخاري" }
        ],
        sunan: ["الدعاء عند نزول المطر"],
        alert: "اطلبوا إجابة الدعاء عند نزول الغيث"
    },
    {
        id: 'market',
        keywords: ['سوق', 'مول', 'بقالة', 'تسوق'],
        title: 'دخول السوق',
        icon: '🛒',
        duas: [
            { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", source: "رواه الترمذي" }
        ],
        sunan: ["غض البصر"]
    }
];
