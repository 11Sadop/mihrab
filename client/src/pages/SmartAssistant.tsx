import { useState } from "react";
import { Sparkles, ArrowRight, MapPin, ShoppingBag, Building2, Moon, Sun, Utensils, Plane, Car, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

interface ActivitySuggestion {
    title: string;
    type: "dua" | "sunnah" | "adhkar";
    text: string;
    source?: string;
}

interface Activity {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    suggestions: ActivitySuggestion[];
}

const activities: Activity[] = [
    {
        id: "leaving_home",
        name: "الخروج من المنزل",
        icon: MapPin,
        color: "bg-blue-500/10 text-blue-500",
        suggestions: [
            {
                title: "دعاء الخروج من المنزل",
                type: "dua",
                text: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
                source: "أخرجه أبو داود والترمذي"
            },
            {
                title: "سنة",
                type: "sunnah",
                text: "قول: اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ",
                source: "أخرجه أبو داود"
            }
        ]
    },
    {
        id: "market",
        name: "الذهاب للسوق",
        icon: ShoppingBag,
        color: "bg-orange-500/10 text-orange-500",
        suggestions: [
            {
                title: "دعاء دخول السوق",
                type: "dua",
                text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
                source: "أخرجه الترمذي"
            },
            {
                title: "سنة",
                type: "sunnah",
                text: "لا ترفع الصوت ولا تتعجل، وتصدق على الفقراء إن استطعت"
            }
        ]
    },
    {
        id: "mosque",
        name: "الذهاب للمسجد",
        icon: Building2,
        color: "bg-emerald-500/10 text-emerald-500",
        suggestions: [
            {
                title: "دعاء الذهاب للمسجد",
                type: "dua",
                text: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ فِي سَمْعِي نُورًا، وَاجْعَلْ فِي بَصَرِي نُورًا",
                source: "متفق عليه"
            },
            {
                title: "دعاء دخول المسجد",
                type: "dua",
                text: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
                source: "أخرجه مسلم"
            },
            {
                title: "سنة تحية المسجد",
                type: "sunnah",
                text: "صلاة ركعتين قبل الجلوس (تحية المسجد)"
            },
            {
                title: "دعاء الخروج من المسجد",
                type: "dua",
                text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
                source: "أخرجه مسلم"
            }
        ]
    },
    {
        id: "sleeping",
        name: "النوم",
        icon: Moon,
        color: "bg-indigo-500/10 text-indigo-500",
        suggestions: [
            {
                title: "دعاء النوم",
                type: "dua",
                text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
                source: "متفق عليه"
            },
            {
                title: "سنة قبل النوم",
                type: "sunnah",
                text: "قراءة آية الكرسي وسورة الإخلاص والمعوذتين ثلاث مرات"
            },
            {
                title: "سنة النوم على الشق الأيمن",
                type: "sunnah",
                text: "النوم على الجانب الأيمن ووضع اليد اليمنى تحت الخد"
            }
        ]
    },
    {
        id: "waking",
        name: "الاستيقاظ",
        icon: Sun,
        color: "bg-amber-500/10 text-amber-500",
        suggestions: [
            {
                title: "دعاء الاستيقاظ",
                type: "dua",
                text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
                source: "متفق عليه"
            },
            {
                title: "سنة",
                type: "sunnah",
                text: "السواك عند الاستيقاظ"
            }
        ]
    },
    {
        id: "eating",
        name: "الطعام",
        icon: Utensils,
        color: "bg-red-500/10 text-red-500",
        suggestions: [
            {
                title: "دعاء قبل الطعام",
                type: "dua",
                text: "بِسْمِ اللَّهِ",
                source: "أخرجه أبو داود"
            },
            {
                title: "دعاء بعد الطعام",
                type: "dua",
                text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
                source: "أخرجه أبو داود والترمذي"
            },
            {
                title: "سنة",
                type: "sunnah",
                text: "الأكل باليد اليمنى ومما يليك"
            }
        ]
    },
    {
        id: "travel",
        name: "السفر",
        icon: Plane,
        color: "bg-sky-500/10 text-sky-500",
        suggestions: [
            {
                title: "دعاء السفر",
                type: "dua",
                text: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
                source: "أخرجه مسلم"
            },
            {
                title: "سنة القصر والجمع",
                type: "sunnah",
                text: "قصر الصلاة الرباعية إلى ركعتين، والجمع بين الظهر والعصر أو المغرب والعشاء"
            }
        ]
    },
    {
        id: "car",
        name: "ركوب السيارة",
        icon: Car,
        color: "bg-slate-500/10 text-slate-500",
        suggestions: [
            {
                title: "دعاء ركوب الدابة/السيارة",
                type: "dua",
                text: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
                source: "أخرجه مسلم"
            }
        ]
    },
    {
        id: "visiting_sick",
        name: "زيارة المريض",
        icon: Heart,
        color: "bg-pink-500/10 text-pink-500",
        suggestions: [
            {
                title: "دعاء للمريض",
                type: "dua",
                text: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
                source: "متفق عليه"
            },
            {
                title: "سنة",
                type: "sunnah",
                text: "وضع اليد على موضع الألم والدعاء له"
            }
        ]
    }
];

export default function SmartAssistant() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    const filteredActivities = activities.filter((a) =>
        a.name.includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-b from-emerald-900/80 to-background backdrop-blur-xl border-b border-white/10">
                <div className="container max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <Sparkles className="w-5 h-5 text-emerald-300" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">المساعد الذكي</h1>
                                <p className="text-emerald-200/70 text-xs">اختر نشاطك للحصول على الأدعية والسنن</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Search */}
                <Input
                    type="text"
                    placeholder="ابحث عن نشاط..."
                    className="bg-card border-border"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Activity Grid or Suggestions */}
                {selectedActivity ? (
                    <div className="space-y-4">
                        <Button
                            variant="ghost"
                            className="gap-2 text-muted-foreground"
                            onClick={() => setSelectedActivity(null)}
                        >
                            <ArrowRight className="w-4 h-4" />
                            العودة للقائمة
                        </Button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-xl ${selectedActivity.color}`}>
                                <selectedActivity.icon className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold">{selectedActivity.name}</h2>
                        </div>

                        <div className="space-y-3">
                            {selectedActivity.suggestions.map((suggestion, i) => (
                                <Card key={i} className="p-4 border-l-4 border-l-emerald-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${suggestion.type === "dua" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                                suggestion.type === "sunnah" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                            }`}>
                                            {suggestion.type === "dua" ? "دعاء" : suggestion.type === "sunnah" ? "سنة" : "ذكر"}
                                        </span>
                                        <span className="text-sm font-medium">{suggestion.title}</span>
                                    </div>
                                    <p className="text-base leading-loose font-arabic text-foreground/90">
                                        {suggestion.text}
                                    </p>
                                    {suggestion.source && (
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {suggestion.source}
                                        </p>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {filteredActivities.map((activity) => (
                            <button
                                key={activity.id}
                                onClick={() => setSelectedActivity(activity)}
                                className="flex flex-col items-center justify-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                            >
                                <div className={`p-3 rounded-xl ${activity.color}`}>
                                    <activity.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium text-center">{activity.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
