import { Header } from "@/components/Header";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Globe, Users, Bell, Volume2, VolumeX, Sun, Moon, Clock, AlarmClock, Heart, Landmark, Mail, Copy, Check, Save, Download, Share2, Plus, MoreVertical, Smartphone, ChevronDown, ChevronUp, Navigation, Loader2, Search, ChevronsUpDown } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";
import { requestNotificationPermission } from "@/lib/firebase-push";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { cities, citiesByCountry, countryOrder } from "@/data/cities";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";

interface Rec{id:string;name:string;server:string;ev?:string;}
const RECITERS:Rec[]=[
  {id:"afasy",   name:"مشاري العفاسي",      server:"https://server8.mp3quran.net/afs",             ev:"Alafasy_128kbps"},
  {id:"maher",   name:"ماهر المعيقلي",      server:"https://server12.mp3quran.net/maher",          ev:"Maher_AlMuaiqly_128kbps"},
  {id:"sudais",  name:"عبدالرحمن السديس",   server:"https://server11.mp3quran.net/sds",            ev:"AbdurRahmaanAs-Sudais_192kbps"},
  {id:"hosary",  name:"محمود خليل الحصري", server:"https://server13.mp3quran.net/husr",           ev:"Husary_128kbps"},
  {id:"minshawi",name:"محمد صديق المنشاوي",server:"https://server10.mp3quran.net/minsh",          ev:"Minshawy_Murattal_128kbps"},
  {id:"basit",   name:"عبدالباسط عبدالصمد",server:"https://server7.mp3quran.net/basit",           ev:"Abdul_Basit_Murattal_192kbps"},
  {id:"dosari",  name:"ياسر الدوسري",       server:"https://server11.mp3quran.net/yasser",         ev:"Yasser_Ad-Dussary_128kbps"},
  {id:"ghamdi",  name:"سعد الغامدي",        server:"https://server7.mp3quran.net/s_gmd",          ev:"Sa_d_al-Ghaamidi_128kbps"},
  {id:"shuraym", name:"سعود الشريم",        server:"https://server7.mp3quran.net/shur",           ev:"Sa_ood_ash-Shuraym_128kbps"},
  {id:"ajamy",   name:"أحمد العجمي",        server:"https://server10.mp3quran.net/ajm",           ev:"Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net"},
  {id:"ayyoub",  name:"محمد أيوب",          server:"https://server8.mp3quran.net/ayyub",          ev:"Muhammad_Ayyoub_128kbps"},
  {id:"juhany",  name:"عبدالله الجهني",     server:"https://server11.mp3quran.net/jhn",           ev:"Abdullah_Juhany_128kbps"},
  {id:"tablawi", name:"محمد الطبلاوي",      server:"https://server6.mp3quran.net/tablawi",        ev:"Mohammad_al_Tablaway_128kbps"},
];

const SURAHS=[{id:1,n:"الفاتحة",c:7},{id:2,n:"البقرة",c:286},{id:3,n:"آل عمران",c:200},{id:4,n:"النساء",c:176},{id:5,n:"المائدة",c:120},{id:6,n:"الأنعام",c:165},{id:7,n:"الأعراف",c:206},{id:8,n:"الأنفال",c:75},{id:9,n:"التوبة",c:129},{id:10,n:"يونس",c:109},{id:11,n:"هود",c:123},{id:12,n:"يوسف",c:111},{id:13,n:"الرعد",c:43},{id:14,n:"إبراهيم",c:52},{id:15,n:"الحجر",c:99},{id:16,n:"النحل",c:128},{id:17,n:"الإسراء",c:111},{id:18,n:"الكهف",c:110},{id:19,n:"مريم",c:98},{id:20,n:"طه",c:135},{id:21,n:"الأنبياء",c:112},{id:22,n:"الحج",c:78},{id:23,n:"المؤمنون",c:118},{id:24,n:"النور",c:64},{id:25,n:"الفرقان",c:77},{id:26,n:"الشعراء",c:227},{id:27,n:"النمل",c:93},{id:28,n:"القصص",c:88},{id:29,n:"العنكبوت",c:69},{id:30,n:"الروم",c:60},{id:31,n:"لقمان",c:34},{id:32,n:"السجدة",c:30},{id:33,n:"الأحزاب",c:73},{id:34,n:"سبأ",c:54},{id:35,n:"فاطر",c:45},{id:36,n:"يس",c:83},{id:37,n:"الصافات",c:182},{id:38,n:"ص",c:88},{id:39,n:"الزمر",c:75},{id:40,n:"غافر",c:85},{id:41,n:"فصلت",c:54},{id:42,n:"الشورى",c:53},{id:43,n:"الزخرف",c:89},{id:44,n:"الدخان",c:59},{id:45,n:"الجاثية",c:37},{id:46,n:"الأحقاف",c:35},{id:47,n:"محمد",c:38},{id:48,n:"الفتح",c:29},{id:49,n:"الحجرات",c:18},{id:50,n:"ق",c:45},{id:51,n:"الذاريات",c:60},{id:52,n:"الطور",c:49},{id:53,n:"النجم",c:62},{id:54,n:"القمر",c:55},{id:55,n:"الرحمن",c:78},{id:56,n:"الواقعة",c:96},{id:57,n:"الحديد",c:29},{id:58,n:"المجادلة",c:22},{id:59,n:"الحشر",c:24},{id:60,n:"الممتحنة",c:13},{id:61,n:"الصف",c:14},{id:62,n:"الجمعة",c:11},{id:63,n:"المنافقون",c:11},{id:64,n:"التغابن",c:18},{id:65,n:"الطلاق",c:12},{id:66,n:"التحريم",c:12},{id:67,n:"الملك",c:30},{id:68,n:"القلم",c:52},{id:69,n:"الحاقة",c:52},{id:70,n:"المعارج",c:44},{id:71,n:"نوح",c:28},{id:72,n:"الجن",c:28},{id:73,n:"المزمل",c:20},{id:74,n:"المدثر",c:56},{id:75,n:"القيامة",c:40},{id:76,n:"الإنسان",c:31},{id:77,n:"المرسلات",c:50},{id:78,n:"النبأ",c:40},{id:79,n:"النازعات",c:46},{id:80,n:"عبس",c:42},{id:81,n:"التكوير",c:29},{id:82,n:"الانفطار",c:19},{id:83,n:"المطففين",c:36},{id:84,n:"الانشقاق",c:25},{id:85,n:"البروج",c:22},{id:86,n:"الطارق",c:17},{id:87,n:"الأعلى",c:19},{id:88,n:"الغاشية",c:26},{id:89,n:"الفجر",c:30},{id:90,n:"البلد",c:20},{id:91,n:"الشمس",c:15},{id:92,n:"الليل",c:21},{id:93,n:"الضحى",c:11},{id:94,n:"الشرح",c:8},{id:95,n:"التين",c:8},{id:96,n:"العلق",c:19},{id:97,n:"القدر",c:5},{id:98,n:"البينة",c:8},{id:99,n:"الزلزلة",c:8},{id:100,n:"العاديات",c:11},{id:101,n:"القارعة",c:11},{id:102,n:"التكاثر",c:8},{id:103,n:"العصر",c:3},{id:104,n:"الهمزة",c:9},{id:105,n:"الفيل",c:5},{id:106,n:"قريش",c:4},{id:107,n:"الماعون",c:7},{id:108,n:"الكوثر",c:3},{id:109,n:"الكافرون",c:6},{id:110,n:"النصر",c:3},{id:111,n:"المسد",c:5},{id:112,n:"الإخلاص",c:4},{id:113,n:"الفلق",c:5},{id:114,n:"الناس",c:6}];

export default function SettingsPage() {
  const { toast } = useToast();
  const [location, setLocation] = useLocalStorage<{ city?: string, country?: string, latitude?: number, longitude?: number, isManual?: boolean } | null>("user_location", null);
  const [method, setMethod] = useLocalStorage("calculation_method", "4");
  const [isAdmin, setIsAdmin] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [notificationsExpanded, setNotificationsExpanded] = useLocalStorage("notifications_section_expanded", true);
  const [locationType, setLocationType] = useLocalStorage<"auto" | "manual">("location_type", "auto");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [citySearchOpen, setCitySearchOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();
  const [appTheme, setAppTheme] = useLocalStorage("app_theme", "emerald");

  // iOS Safari check
  const isIOS = useMemo(() => {
    return typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !(window as any).MSStream;
  }, []);

  const isStandalone = useMemo(() => {
    return typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true);
  }, []);

  // Offline Text Downloader
  const [isDownloadingText, setIsDownloadingText] = useState(false);
  const [progressText, setProgressText] = useState(0);
  const [currentTextPage, setCurrentTextPage] = useState(0);
  const cancelTextDownload = useRef(false);

  // Offline Audio Downloader
  const [selectedReciter, setSelectedReciter] = useState("afasy");
  const [selectedSurah, setSelectedSurah] = useState("1");
  const [isDownloadingAudio, setIsDownloadingAudio] = useState(false);
  const [progressAudio, setProgressAudio] = useState(0);
  const [currentAudioAyah, setCurrentAudioAyah] = useState(0);
  const [totalAudioAyahs, setTotalAudioAyahs] = useState(0);
  const cancelAudioDownload = useRef(false);

  const startDownloadingText = async () => {
    setIsDownloadingText(true);
    cancelTextDownload.current = false;
    setProgressText(0);

    const cleanDisplay = (t: string) => t.replace(/[\u06D6-\u06ED]/g, '');
    const norm = (t: string) => t.replace(/\uFEFF/g, '');
    const removeBismillah = (t: string): string => {
      let s = t.replace(/\uFEFF/g, '').trim();
      const BISM = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
      if (s.startsWith(BISM)) {
        return s.slice(BISM.length).trim();
      }
      return s;
    };

    for (let p = 1; p <= 604; p++) {
      if (cancelTextDownload.current) {
        setIsDownloadingText(false);
        toast({
          title: "تم إيقاف التنزيل",
          description: "تم إيقاف تنزيل المصحف والتفسير يدوياً",
        });
        return;
      }

      setCurrentTextPage(p);
      setProgressText(Math.round((p / 604) * 100));

      try {
        // Fetch and cache Quran Page
        const qKey = `quran_page_${p}`;
        if (!localStorage.getItem(qKey)) {
          const qResp = await fetch(`https://api.alquran.cloud/v1/page/${p}/quran-uthmani`);
          if (!qResp.ok) throw new Error(`Failed to fetch Quran page ${p}`);
          const qData = await qResp.json();
          const qRes = qData.data.ayahs.filter((a: any) => a.numberInSurah > 0).map((a: any) => {
            let t = a.text;
            if (a.numberInSurah === 1 && a.surah.number !== 9 && a.surah.number !== 1) {
              t = removeBismillah(t);
            }
            return {
              num: a.number,
              nis: a.numberInSurah,
              sn: a.surah.number,
              sname: a.surah.name,
              text: cleanDisplay(t.trim()),
              orig: norm(a.text),
              juz: a.juz
            };
          });
          localStorage.setItem(qKey, JSON.stringify(qRes));
        }

        // Fetch and cache Tafseer Page
        const tKey = `tafseer_page_ar.muyassar_${p}`;
        if (!localStorage.getItem(tKey)) {
          const tResp = await fetch(`https://api.alquran.cloud/v1/page/${p}/ar.muyassar`);
          if (!tResp.ok) throw new Error(`Failed to fetch Tafseer page ${p}`);
          const tData = await tResp.json();
          const tRes = tData.data.ayahs.map((a: any) => ({
            sn: a.surah.number,
            nis: a.numberInSurah,
            text: a.text
          }));
          localStorage.setItem(tKey, JSON.stringify(tRes));
        }
      } catch (e) {
        console.error(`Error downloading page ${p}:`, e);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        p--; // Retry current page
      }

      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setIsDownloadingText(false);
    toast({
      title: "اكتمل التنزيل!",
      description: "تم تنزيل المصحف الشريف والتفسير الميسر كاملاً بنجاح",
    });
  };

  const startDownloadingAudio = async () => {
    const surahId = parseInt(selectedSurah);
    const surahInfo = SURAHS.find(s => s.id === surahId);
    if (!surahInfo) return;

    setIsDownloadingAudio(true);
    cancelAudioDownload.current = false;
    setProgressAudio(0);
    setTotalAudioAyahs(surahInfo.c);

    const rec = RECITERS.find(r => r.id === selectedReciter) || RECITERS[0];
    const cache = await caches.open('quran-audio-cache');
    const pad3 = (n: number) => String(n).padStart(3, '0');

    for (let nis = 1; nis <= surahInfo.c; nis++) {
      if (cancelAudioDownload.current) {
        setIsDownloadingAudio(false);
        toast({
          title: "تم إيقاف التنزيل",
          description: "تم إيقاف تنزيل الصوت يدوياً",
        });
        return;
      }

      setCurrentAudioAyah(nis);
      setProgressAudio(Math.round((nis / surahInfo.c) * 100));

      const url = `${rec.server}/${pad3(surahId)}${pad3(nis)}.mp3`;

      try {
        const match = await cache.match(url);
        if (!match) {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
          } else {
            throw new Error(`Failed to fetch audio for verse ${nis}`);
          }
        }
      } catch (e) {
        console.error(`Error downloading audio for surah ${surahId} ayah ${nis}:`, e);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        nis--; // Retry
      }

      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setIsDownloadingAudio(false);
    toast({
      title: "اكتمل تنزيل التلاوة!",
      description: `تم تنزيل سورة ${surahInfo.n} بصوت ${rec.name} بنجاح للتشغيل دون اتصال`,
    });
  };


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appTheme);
  }, [appTheme]);

  const filteredCitiesByCountry = useMemo(() => {
    if (!citySearchQuery.trim()) {
      return citiesByCountry;
    }
    const query = citySearchQuery.toLowerCase();
    const result: Record<string, typeof cities> = {};
    for (const country of countryOrder) {
      const countryCities = citiesByCountry[country];
      if (!countryCities) continue;
      const matchingCities = countryCities.filter(city =>
        city.name.toLowerCase().includes(query) ||
        city.country.toLowerCase().includes(query)
      );
      if (matchingCities.length > 0 || country.toLowerCase().includes(query)) {
        result[country] = country.toLowerCase().includes(query) ? countryCities : matchingCities;
      }
    }
    return result;
  }, [citySearchQuery]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adminKey = urlParams.get('admin');
    if (adminKey === 'mihrab2024') {
      setIsAdmin(true);
    }
    const storedAdmin = localStorage.getItem('is_admin');
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('is_admin', 'true');
    }
  }, [isAdmin]);

  const {
    permission,
    settings,
    hasUnsavedChanges,
    requestPermission,
    updateSettings,
    saveSettings,
    discardChanges,
    isSupported,
    sendNotification
  } = useNotifications();

  const { data: visitorData } = useQuery<{ count: number }>({
    queryKey: ["/api/stats/visitors"],
    queryFn: async () => {
      const res = await fetch("/api/stats/visitors?key=mihrab2024");
      if (!res.ok) return { count: 0 };
      return res.json();
    },
    enabled: isAdmin,
  });

  const handleEnableNotifications = async () => {
    if (permission === 'granted') {
      const newEnabled = !settings.enabled;
      updateSettings({ enabled: newEnabled });

      // ===== FIX: Register FCM token when enabling notifications =====
      if (newEnabled) {
        try {
          const token = await requestNotificationPermission();
          if (token) {
            console.log('✅ FCM Token registered successfully');
          } else {
            console.warn('⚠️ Could not get FCM token');
          }
        } catch (error) {
          console.error('❌ Failed to register FCM token:', error);
        }
      }

      toast({
        title: newEnabled ? "تم تفعيل الإشعارات" : "تم إيقاف الإشعارات",
      });
    } else {
      const granted = await requestPermission();
      if (granted) {
        toast({
          title: "تم تفعيل الإشعارات",
          description: "ستصلك تذكيرات الصلاة والأذكار",
        });
      } else {
        toast({
          title: "لم يتم منح الإذن",
          description: "يرجى السماح بالإشعارات من إعدادات المتصفح",
          variant: "destructive",
        });
      }
    }
  };

  const testNotification = () => {
    sendNotification("اختبار الإشعارات", "هذا إشعار تجريبي من تطبيق محراب");
  };

  const handleSaveSettings = () => {
    saveSettings();
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الإشعارات بنجاح",
    });
  };

  const methods = [
    { id: "2", name: "ISNA (North America)" },
    { id: "3", name: "Muslim World League" },
    { id: "4", name: "Umm Al-Qura (Makkah)" },
    { id: "5", name: "Egyptian General Authority" },
  ];

  const handleResetLocation = () => {
    setLocation(null);
    setLocationType("auto");
    window.location.reload();
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "غير مدعوم",
        description: "المتصفح لا يدعم تحديد الموقع التلقائي",
        variant: "destructive",
      });
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isManual: false,
        });
        setLocationType("auto");
        setIsDetectingLocation(false);
        toast({
          title: "تم تحديد الموقع",
          description: "تم تحديد موقعك تلقائياً",
        });
      },
      (error) => {
        setIsDetectingLocation(false);
        toast({
          title: "فشل تحديد الموقع",
          description: "يرجى السماح بتحديد الموقع أو اختيار مدينة يدوياً",
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSelectCity = (cityId: string) => {
    const city = cities.find(c => c.id === cityId);
    if (city) {
      setLocation({
        city: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
        isManual: true,
      });
      setLocationType("manual");
      toast({
        title: "تم اختيار المدينة",
        description: city.name === city.country ? city.name : `${city.name}، ${city.country}`,
      });
    }
  };

  const getSelectedCityId = () => {
    if (!location?.isManual) return undefined;
    const city = cities.find(c =>
      c.latitude === location.latitude &&
      c.longitude === location.longitude
    );
    return city?.id;
  };

  const handleInstallClick = async () => {
    const success = await promptInstall();
    if (success) {
      toast({
        title: "تم التثبيت بنجاح",
        description: "يمكنك الآن الوصول للتطبيق من شاشتك الرئيسية",
      });
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المعلومات بنجاح",
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen pb-32 bg-background">
      <Header title="الإعدادات" showBack={true} />

      <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-8">


        <section>
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">الموقع والوقت</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-right flex-1">
                  <p className="font-medium text-sm">تحديد الموقع</p>
                  <p className="text-xs text-muted-foreground">
                    {location?.isManual && location.city
                      ? (location.city === location.country ? location.city : `${location.city}، ${location.country}`)
                      : location
                        ? `إحداثيات: ${location.latitude?.toFixed(4)}, ${location.longitude?.toFixed(4)}`
                        : "لم يتم تحديد الموقع بعد"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mb-3">
                <Button
                  variant={locationType === "auto" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  data-testid="button-auto-location"
                >
                  {isDetectingLocation ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Navigation className="w-4 h-4" />
                  )}
                  تلقائي (GPS)
                </Button>
                <Button
                  variant={locationType === "manual" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => setLocationType("manual")}
                  data-testid="button-manual-location"
                >
                  <MapPin className="w-4 h-4" />
                  اختيار مدينة
                </Button>
              </div>

              {locationType === "manual" && (
                <Popover open={citySearchOpen} onOpenChange={setCitySearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={citySearchOpen}
                      className="w-full justify-between text-right"
                      data-testid="select-city"
                    >
                      {location?.city
                        ? (location.city === location.country ? location.city : `${location.city}، ${location.country}`)
                        : "اختر المدينة..."}
                      <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-card dark:bg-card border border-border shadow-xl" align="start">
                    <div className="p-2 border-b border-border">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="ابحث عن الدولة أو المدينة..."
                          value={citySearchQuery}
                          onChange={(e) => setCitySearchQuery(e.target.value)}
                          className="pr-10 text-right"
                          data-testid="input-city-search"
                        />
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {Object.keys(filteredCitiesByCountry).length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                          لا توجد نتائج
                        </div>
                      ) : (
                        countryOrder.map(country => {
                          const countryCities = filteredCitiesByCountry[country];
                          if (!countryCities || countryCities.length === 0) return null;
                          return (
                            <div key={country}>
                              <div className="px-3 py-2 text-xs font-bold text-muted-foreground bg-muted/50 text-right sticky top-0">
                                {country}
                              </div>
                              {countryCities.map(city => (
                                <button
                                  key={city.id}
                                  onClick={() => {
                                    handleSelectCity(city.id);
                                    setCitySearchOpen(false);
                                    setCitySearchQuery("");
                                  }}
                                  className="w-full px-4 py-2 text-right text-sm hover:bg-muted transition-colors flex items-center justify-between"
                                  data-testid={`city-option-${city.id}`}
                                >
                                  <Check className={`w-4 h-4 ${getSelectedCityId() === city.id ? 'opacity-100' : 'opacity-0'}`} />
                                  <span>{city.name}</span>
                                </button>
                              ))}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-3 mb-2 flex-row-reverse">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">طريقة الحساب</p>
                </div>
              </div>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full mt-2 p-2 rounded-lg bg-secondary/30 text-sm border-none focus:ring-1 focus:ring-primary text-right"
                data-testid="select-calculation-method"
              >
                {methods.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {isSupported && (
          <section>
            <div className="flex items-center justify-between mb-3 px-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotificationsExpanded(!notificationsExpanded)}
                className="gap-1 text-muted-foreground"
                data-testid="button-toggle-notifications"
              >
                {notificationsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {notificationsExpanded ? "طي" : "توسيع"}
              </Button>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-right">الإشعارات</h3>
            </div>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {isIOS && !isStandalone && (
                <div className="p-4 bg-amber-500/10 border-b border-border/50 text-right" dir="rtl">
                  <div className="flex items-start gap-2.5 flex-row-reverse">
                    <span className="text-amber-600 text-lg">⚠️</span>
                    <div className="flex-1">
                      <p className="font-bold text-xs text-amber-600 dark:text-amber-500">تنبيه هام لمستخدمي الآيفون (iOS):</p>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                        لتشغيل إشعارات الأذان وتذكيرات الأذكار على جهازك، يجب أولاً إضافة التطبيق للشاشة الرئيسية (Safari {"->"} زر المشاركة {"->"} إضافة للشاشة الرئيسية) وتشغيله كـ تطبيق Standalone.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/20 text-amber-600 rounded-lg">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">تفعيل الإشعارات</p>
                    <p className="text-xs text-muted-foreground">تذكيرات الصلاة والأذكار</p>
                  </div>
                </div>
                <Switch
                  checked={settings.enabled && permission === 'granted'}
                  onCheckedChange={handleEnableNotifications}
                  className="data-[state=checked]:bg-primary"
                  data-testid="switch-notifications"
                />
              </div>

              {settings.enabled && permission === 'granted' && notificationsExpanded && (
                <>
                  <div className="p-3 bg-muted/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground text-right">تنبيهات الصلاة</p>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">إشعار قبل الأذان</p>
                        <p className="text-xs text-muted-foreground">تنبيه قبل حلول وقت الصلاة</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={settings.reminderMinutes.toString()}
                        onValueChange={(value) => updateSettings({ reminderMinutes: parseInt(value) })}
                        disabled={!settings.prayerReminder}
                      >
                        <SelectTrigger className="w-24" data-testid="select-reminder-time">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 دقائق</SelectItem>
                          <SelectItem value="10">10 دقائق</SelectItem>
                          <SelectItem value="15">15 دقيقة</SelectItem>
                          <SelectItem value="30">30 دقيقة</SelectItem>
                        </SelectContent>
                      </Select>
                      <Switch
                        checked={settings.prayerReminder}
                        onCheckedChange={(checked) => updateSettings({ prayerReminder: checked })}
                        className="data-[state=checked]:bg-primary"
                        data-testid="switch-prayer-reminder"
                      />
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900/20 text-teal-600 rounded-lg">
                        <AlarmClock className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">تنبيه الإقامة</p>
                        <p className="text-xs text-muted-foreground">إشعار عند حلول وقت الإقامة</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.iqamaReminder || false}
                      onCheckedChange={(checked) => updateSettings({ iqamaReminder: checked })}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-iqama-reminder"
                    />
                  </div>

                  <div className="p-3 bg-muted/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground text-right">تنبيهات الأذكار</p>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-lg">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">أذكار الصباح</p>
                        <p className="text-xs text-muted-foreground">تُرسل تلقائياً بعد صلاة الفجر</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.morningAdhkar}
                      onCheckedChange={(checked) => updateSettings({ morningAdhkar: checked })}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-morning-adhkar"
                    />
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                        <Moon className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">أذكار المساء</p>
                        <p className="text-xs text-muted-foreground">تُرسل تلقائياً بعد صلاة المغرب</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.eveningAdhkar}
                      onCheckedChange={(checked) => updateSettings({ eveningAdhkar: checked })}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-evening-adhkar"
                    />
                  </div>

                  <div className="p-3 bg-muted/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground text-right">إعدادات عامة</p>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <Switch
                      checked={settings.sound}
                      onCheckedChange={(checked) => updateSettings({ sound: checked })}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-sound"
                    />
                  </div>

                  <div className="p-3 bg-muted/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground text-right">تذكيرات العبادة والسنن</p>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="text-right">
                      <p className="font-medium text-sm">صلاة الضحى والوتر</p>
                      <p className="text-xs text-muted-foreground">تنبيهات للمحافظة على السنن الرواتب</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px]">الضحى</span>
                        <Switch checked={settings.duhaReminder || false} onCheckedChange={c=>updateSettings({duhaReminder:c})} />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px]">الوتر</span>
                        <Switch checked={settings.witrReminder || false} onCheckedChange={c=>updateSettings({witrReminder:c})} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="text-right">
                      <p className="font-medium text-sm">صيام النوافل</p>
                      <p className="text-xs text-muted-foreground">الاثنين والخميس والأيام البيض</p>
                    </div>
                    <Switch checked={settings.fastingReminder || false} onCheckedChange={c=>updateSettings({fastingReminder:c})} />
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="text-right">
                      <p className="font-medium text-sm">سنن الجمعة</p>
                      <p className="text-xs text-muted-foreground">تنبيه بسورة الكهف والسنن المهجورة</p>
                    </div>
                    <Switch checked={settings.fridayReminder || false} onCheckedChange={c=>updateSettings({fridayReminder:c})} />
                  </div>

                  <div className="p-4 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={testNotification}
                      data-testid="button-test-notification"
                    >
                      اختبار الإشعارات
                    </Button>
                  </div>
                </>
               )}
            </div>
          </section>
        )}

        {/* Offline Downloader Section */}
        <section>
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">التشغيل دون اتصال بالإنترنت</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border/50">
            
            {/* Mushaf & Tafseer Text Downloader Card */}
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                  <Download className="w-5 h-5" />
                </div>
                <div className="text-right flex-1">
                  <p className="font-medium text-sm">تحميل المصحف والتفسير كاملاً</p>
                  <p className="text-xs text-muted-foreground">تنزيل صفحات المصحف الشريف الـ 604 والتفسير الميسر للقراءة دون إنترنت (~2.5 ميجابايت)</p>
                </div>
              </div>

              {isDownloadingText ? (
                <div className="space-y-2 text-right" dir="rtl">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">جاري تنزيل صفحة {currentTextPage} من 604...</span>
                    <span className="font-bold text-primary">{progressText}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300 rounded-full" 
                      style={{ width: `${progressText}%` }}
                    />
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => cancelTextDownload.current = true}
                  >
                    إيقاف مؤقت
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={startDownloadingText} 
                  className="w-full gap-2 flex items-center justify-center animate-pulse"
                  variant="outline"
                >
                  <Download className="w-4 h-4" />
                  بدء تحميل صفحات المصحف والتفسير
                </Button>
              )}
            </div>

            {/* Recitation Audio Downloader Card */}
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div className="text-right flex-1">
                  <p className="font-medium text-sm">تحميل التلاوات الصوتية للسور</p>
                  <p className="text-xs text-muted-foreground">اختر القارئ والسورة لتحميل التلاوة العذبة وتشغيلها دون اتصال بالإنترنت</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3" dir="rtl">
                <div className="space-y-1 text-right">
                  <label className="text-xs text-muted-foreground">القارئ</label>
                  <Select value={selectedReciter} onValueChange={setSelectedReciter}>
                    <SelectTrigger className="w-full text-right" data-testid="select-reciter-download">
                      <SelectValue placeholder="اختر القارئ" />
                    </SelectTrigger>
                    <SelectContent>
                      {RECITERS.map(r => (
                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 text-right">
                  <label className="text-xs text-muted-foreground">السورة</label>
                  <Select value={selectedSurah} onValueChange={setSelectedSurah}>
                    <SelectTrigger className="w-full text-right" data-testid="select-surah-download">
                      <SelectValue placeholder="اختر السورة" />
                    </SelectTrigger>
                    <SelectContent>
                      {SURAHS.map(s => (
                        <SelectItem key={s.id} value={s.id.toString()}>{s.n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isDownloadingAudio ? (
                <div className="space-y-2 text-right" dir="rtl">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">جاري تنزيل الآية {currentAudioAyah} من {totalAudioAyahs}...</span>
                    <span className="font-bold text-primary">{progressAudio}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300 rounded-full" 
                      style={{ width: `${progressAudio}%` }}
                    />
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => cancelAudioDownload.current = true}
                  >
                    إيقاف التحميل
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={startDownloadingAudio} 
                  className="w-full gap-2 flex items-center justify-center"
                >
                  <Download className="w-4 h-4" />
                  تحميل السورة المختارة
                </Button>
              )}
            </div>

          </div>
        </section>


        <AnimatePresence>
          {hasUnsavedChanges && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50"
            >
              <div className="bg-card border border-border rounded-2xl shadow-lg p-4">
                <p className="text-sm text-center mb-3 text-muted-foreground">لديك تغييرات غير محفوظة</p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={discardChanges}
                    data-testid="button-discard-changes"
                  >
                    تجاهل
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={handleSaveSettings}
                    data-testid="button-save-settings"
                  >
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isAdmin && (
          <section>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">إحصائيات</h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/20 text-teal-600 rounded-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">عدد الزوار</p>
                    <p className="text-xs text-muted-foreground">إجمالي زيارات الموقع</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary" data-testid="text-visitor-count">
                  {visitorData?.count?.toLocaleString('ar-SA') || '0'}
                </span>
              </div>
            </div>
          </section>
        )}

        {!isInstalled && (
          <section>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">تثبيت التطبيق</h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 bg-gradient-to-l from-primary/10 to-primary/5 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="p-2 bg-primary/20 text-primary rounded-full">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="text-right flex-1">
                    <p className="font-bold text-sm">حوّل الموقع إلى تطبيق</p>
                    <p className="text-xs text-muted-foreground mt-1">أضف محراب إلى شاشتك الرئيسية للوصول السريع</p>
                  </div>
                </div>
              </div>

              {canInstall && (
                <div className="p-4 border-b border-border/50">
                  <Button
                    onClick={handleInstallClick}
                    className="w-full gap-2"
                    data-testid="button-install-app"
                  >
                    <Download className="w-5 h-5" />
                    تثبيت التطبيق الآن
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    اضغط هنا لإضافة التطبيق مباشرة إلى جهازك
                  </p>
                </div>
              )}

              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse mb-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">للآيفون (iOS)</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 space-y-3 text-right">
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">١</div>
                    <div className="flex-1">
                      <p className="text-sm">افتح الموقع في متصفح <span className="font-bold">Safari</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٢</div>
                    <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                      <p className="text-sm">اضغط على زر</p>
                      <div className="inline-flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-md">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <p className="text-sm">(المشاركة)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٣</div>
                    <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                      <p className="text-sm">اختر</p>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                        <Plus className="w-3 h-3" />
                        <span>إضافة للشاشة الرئيسية</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٤</div>
                    <div className="flex-1">
                      <p className="text-sm">اضغط <span className="font-bold text-primary">إضافة</span> في الأعلى</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3 flex-row-reverse mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 2H6.477C5.1 2 4 3.1 4 4.477v15.046C4 20.9 5.1 22 6.477 22h11.046C18.9 22 20 20.9 20 19.523V4.477C20 3.1 18.9 2 17.523 2zM12 20.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm5-3.5H7V5h10v12z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">للأندرويد (Android)</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 space-y-3 text-right">
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">١</div>
                    <div className="flex-1">
                      <p className="text-sm">افتح الموقع في متصفح <span className="font-bold">Chrome</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٢</div>
                    <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                      <p className="text-sm">اضغط على</p>
                      <div className="inline-flex items-center justify-center w-7 h-7 bg-muted rounded-md">
                        <MoreVertical className="w-4 h-4" />
                      </div>
                      <p className="text-sm">(القائمة)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٣</div>
                    <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                      <p className="text-sm">اختر</p>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                        <Download className="w-3 h-3" />
                        <span>تثبيت التطبيق</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٤</div>
                    <div className="flex-1">
                      <p className="text-sm">اضغط <span className="font-bold text-primary">تثبيت</span> للتأكيد</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}


        {isInstalled && (
          <section>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">ادعمنا</h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 bg-gradient-to-l from-primary/10 to-primary/5 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="p-2 bg-primary/20 text-primary rounded-full">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="text-right flex-1">
                    <p className="font-bold text-sm">ساهم في دعم التطبيق</p>
                    <p className="text-xs text-muted-foreground mt-1">جزاكم الله خيراً على دعمكم ومساهمتكم في استمرار هذا العمل</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse mb-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">تحويل بنكي - الراجحي</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">الاسم</p>
                      <p className="font-medium text-sm">عبدالله المواش</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-row-reverse gap-2">
                    <div className="text-right flex-1">
                      <p className="text-xs text-muted-foreground">رقم الآيبان</p>
                      <p className="font-mono text-sm font-medium break-all" dir="ltr">SA82 8000 0142 6080 1614 8941</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard("SA8280000142608016148941", "iban")}
                      data-testid="button-copy-iban"
                    >
                      {copiedField === "iban" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">باي بال (PayPal)</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center justify-between flex-row-reverse gap-2">
                    <div className="text-right flex-1">
                      <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                      <p className="font-mono text-sm font-medium" dir="ltr">aboodgamer0192@gmail.com</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard("aboodgamer0192@gmail.com", "paypal")}
                      data-testid="button-copy-paypal"
                    >
                      {copiedField === "paypal" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <a
                  href="/support"
                  className="flex items-center gap-3 flex-row-reverse p-4 bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors"
                  data-testid="link-support-card"
                >
                  <div className="p-2 bg-primary/20 text-primary rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <div className="text-right flex-1">
                    <p className="font-bold text-sm">دعم التطبيق</p>
                    <p className="text-xs text-muted-foreground">ساهم في تطوير التطبيق</p>
                  </div>
                </a>
              </div>
            </div>
          </section>
        )}

        <div className="text-center text-xs text-muted-foreground pt-8">
          <p>الإصدار 1.0.0</p>
        </div>


      </main>
    </div>
  );
}
