import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Loader2, Search, X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Mic, MicOff, CheckCircle, XCircle, BookMarked, List } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Reciter { id: string; name: string; server: string; everyayah?: string; }
interface Mufassir { id: number; name: string; edition: string; }

const RECITERS: Reciter[] = [
  { id: "maher", name: "ماهر المعيقلي", server: "https://server12.mp3quran.net/maher", everyayah: "Maher_AlMuaiqly_64kbps" },
  { id: "sudais", name: "عبدالرحمن السديس", server: "https://server11.mp3quran.net/sds", everyayah: "Abdurrahmaan_As-Sudais_192kbps" },
  { id: "afasy", name: "مشاري العفاسي", server: "https://server8.mp3quran.net/afs", everyayah: "Alafasy_128kbps" },
  { id: "minshawi", name: "محمد صديق المنشاوي", server: "https://server10.mp3quran.net/minsh", everyayah: "Minshawy_Murattal_128kbps" },
  { id: "shuraim", name: "سعود الشريم", server: "https://server7.mp3quran.net/shur", everyayah: "Saood_ash-Shuraym_128kbps" },
  { id: "husary", name: "محمود خليل الحصري", server: "https://server13.mp3quran.net/husr", everyayah: "Husary_128kbps" },
  { id: "qatami", name: "ناصر القطامي", server: "https://server10.mp3quran.net/qht", everyayah: "Nasser_Alqatami_128kbps" },
  { id: "dosari", name: "ياسر الدوسري", server: "https://server10.mp3quran.net/ibrahim_dosri/Rewayat-Hafs-A-n-Assem" },
  { id: "luhaidan", name: "محمد اللحيدان", server: "https://server8.mp3quran.net/lhdan" },
  { id: "basit", name: "عبدالباسط عبدالصمد", server: "https://server7.mp3quran.net/basit", everyayah: "Abdul_Basit_Murattal_192kbps" },
  { id: "ghamdi", name: "سعد الغامدي", server: "https://server7.mp3quran.net/s_gmd", everyayah: "Ghamadi_40kbps" },
  { id: "shatri", name: "أبو بكر الشاطري", server: "https://server11.mp3quran.net/shatri", everyayah: "Abu_Bakr_Ash-Shaatree_128kbps" },
  { id: "ajamy", name: "أحمد العجمي", server: "https://server10.mp3quran.net/ajm" },
  { id: "jbrl", name: "محمد جبريل", server: "https://server8.mp3quran.net/jbrl", everyayah: "Muhammad_Jibreel_128kbps" },
  { id: "tablawi", name: "محمد الطبلاوي", server: "https://server12.mp3quran.net/tblawi" },
  { id: "ayyub", name: "محمد أيوب", server: "https://server8.mp3quran.net/ayyub", everyayah: "Muhammad_Ayyoub_128kbps" },
  { id: "budair", name: "صلاح البدير", server: "https://server6.mp3quran.net/s_bud" },
  { id: "jleel", name: "خالد الجليل", server: "https://server10.mp3quran.net/jleel" },
  { id: "bsfr", name: "عبدالله بصفر", server: "https://server6.mp3quran.net/bsfr" },
  { id: "bukhatir", name: "صلاح بو خاطر", server: "https://server8.mp3quran.net/bu_khtr" },
  { id: "thubti", name: "عبدالبارئ الثبيتي", server: "https://server6.mp3quran.net/thubti" },
  { id: "kafi", name: "خالد عبدالكافي", server: "https://server11.mp3quran.net/kafi" },
];

const MUFASSIREEN: Mufassir[] = [
  { id: 1, name: "التفسير الميسر", edition: "ar.muyassar" },
  { id: 2, name: "تفسير الجلالين", edition: "ar.jalalayn" },
];

const SURAHS = [
  { id:1,name:"الفاتحة",ayahs_count:7,type:"مكية" },{ id:2,name:"البقرة",ayahs_count:286,type:"مدنية" },{ id:3,name:"آل عمران",ayahs_count:200,type:"مدنية" },{ id:4,name:"النساء",ayahs_count:176,type:"مدنية" },{ id:5,name:"المائدة",ayahs_count:120,type:"مدنية" },{ id:6,name:"الأنعام",ayahs_count:165,type:"مكية" },{ id:7,name:"الأعراف",ayahs_count:206,type:"مكية" },{ id:8,name:"الأنفال",ayahs_count:75,type:"مدنية" },{ id:9,name:"التوبة",ayahs_count:129,type:"مدنية" },{ id:10,name:"يونس",ayahs_count:109,type:"مكية" },
  { id:11,name:"هود",ayahs_count:123,type:"مكية" },{ id:12,name:"يوسف",ayahs_count:111,type:"مكية" },{ id:13,name:"الرعد",ayahs_count:43,type:"مدنية" },{ id:14,name:"إبراهيم",ayahs_count:52,type:"مكية" },{ id:15,name:"الحجر",ayahs_count:99,type:"مكية" },{ id:16,name:"النحل",ayahs_count:128,type:"مكية" },{ id:17,name:"الإسراء",ayahs_count:111,type:"مكية" },{ id:18,name:"الكهف",ayahs_count:110,type:"مكية" },{ id:19,name:"مريم",ayahs_count:98,type:"مكية" },{ id:20,name:"طه",ayahs_count:135,type:"مكية" },
  { id:21,name:"الأنبياء",ayahs_count:112,type:"مكية" },{ id:22,name:"الحج",ayahs_count:78,type:"مدنية" },{ id:23,name:"المؤمنون",ayahs_count:118,type:"مكية" },{ id:24,name:"النور",ayahs_count:64,type:"مدنية" },{ id:25,name:"الفرقان",ayahs_count:77,type:"مكية" },{ id:26,name:"الشعراء",ayahs_count:227,type:"مكية" },{ id:27,name:"النمل",ayahs_count:93,type:"مكية" },{ id:28,name:"القصص",ayahs_count:88,type:"مكية" },{ id:29,name:"العنكبوت",ayahs_count:69,type:"مكية" },{ id:30,name:"الروم",ayahs_count:60,type:"مكية" },
  { id:31,name:"لقمان",ayahs_count:34,type:"مكية" },{ id:32,name:"السجدة",ayahs_count:30,type:"مكية" },{ id:33,name:"الأحزاب",ayahs_count:73,type:"مدنية" },{ id:34,name:"سبأ",ayahs_count:54,type:"مكية" },{ id:35,name:"فاطر",ayahs_count:45,type:"مكية" },{ id:36,name:"يس",ayahs_count:83,type:"مكية" },{ id:37,name:"الصافات",ayahs_count:182,type:"مكية" },{ id:38,name:"ص",ayahs_count:88,type:"مكية" },{ id:39,name:"الزمر",ayahs_count:75,type:"مكية" },{ id:40,name:"غافر",ayahs_count:85,type:"مكية" },
  { id:41,name:"فصلت",ayahs_count:54,type:"مكية" },{ id:42,name:"الشورى",ayahs_count:53,type:"مكية" },{ id:43,name:"الزخرف",ayahs_count:89,type:"مكية" },{ id:44,name:"الدخان",ayahs_count:59,type:"مكية" },{ id:45,name:"الجاثية",ayahs_count:37,type:"مكية" },{ id:46,name:"الأحقاف",ayahs_count:35,type:"مكية" },{ id:47,name:"محمد",ayahs_count:38,type:"مدنية" },{ id:48,name:"الفتح",ayahs_count:29,type:"مدنية" },{ id:49,name:"الحجرات",ayahs_count:18,type:"مدنية" },{ id:50,name:"ق",ayahs_count:45,type:"مكية" },
  { id:51,name:"الذاريات",ayahs_count:60,type:"مكية" },{ id:52,name:"الطور",ayahs_count:49,type:"مكية" },{ id:53,name:"النجم",ayahs_count:62,type:"مكية" },{ id:54,name:"القمر",ayahs_count:55,type:"مكية" },{ id:55,name:"الرحمن",ayahs_count:78,type:"مدنية" },{ id:56,name:"الواقعة",ayahs_count:96,type:"مكية" },{ id:57,name:"الحديد",ayahs_count:29,type:"مدنية" },{ id:58,name:"المجادلة",ayahs_count:22,type:"مدنية" },{ id:59,name:"الحشر",ayahs_count:24,type:"مدنية" },{ id:60,name:"الممتحنة",ayahs_count:13,type:"مدنية" },
  { id:61,name:"الصف",ayahs_count:14,type:"مدنية" },{ id:62,name:"الجمعة",ayahs_count:11,type:"مدنية" },{ id:63,name:"المنافقون",ayahs_count:11,type:"مدنية" },{ id:64,name:"التغابن",ayahs_count:18,type:"مدنية" },{ id:65,name:"الطلاق",ayahs_count:12,type:"مدنية" },{ id:66,name:"التحريم",ayahs_count:12,type:"مدنية" },{ id:67,name:"الملك",ayahs_count:30,type:"مكية" },{ id:68,name:"القلم",ayahs_count:52,type:"مكية" },{ id:69,name:"الحاقة",ayahs_count:52,type:"مكية" },{ id:70,name:"المعارج",ayahs_count:44,type:"مكية" },
  { id:71,name:"نوح",ayahs_count:28,type:"مكية" },{ id:72,name:"الجن",ayahs_count:28,type:"مكية" },{ id:73,name:"المزمل",ayahs_count:20,type:"مكية" },{ id:74,name:"المدثر",ayahs_count:56,type:"مكية" },{ id:75,name:"القيامة",ayahs_count:40,type:"مكية" },{ id:76,name:"الإنسان",ayahs_count:31,type:"مدنية" },{ id:77,name:"المرسلات",ayahs_count:50,type:"مكية" },{ id:78,name:"النبأ",ayahs_count:40,type:"مكية" },{ id:79,name:"النازعات",ayahs_count:46,type:"مكية" },{ id:80,name:"عبس",ayahs_count:42,type:"مكية" },
  { id:81,name:"التكوير",ayahs_count:29,type:"مكية" },{ id:82,name:"الانفطار",ayahs_count:19,type:"مكية" },{ id:83,name:"المطففين",ayahs_count:36,type:"مكية" },{ id:84,name:"الانشقاق",ayahs_count:25,type:"مكية" },{ id:85,name:"البروج",ayahs_count:22,type:"مكية" },{ id:86,name:"الطارق",ayahs_count:17,type:"مكية" },{ id:87,name:"الأعلى",ayahs_count:19,type:"مكية" },{ id:88,name:"الغاشية",ayahs_count:26,type:"مكية" },{ id:89,name:"الفجر",ayahs_count:30,type:"مكية" },{ id:90,name:"البلد",ayahs_count:20,type:"مكية" },
  { id:91,name:"الشمس",ayahs_count:15,type:"مكية" },{ id:92,name:"الليل",ayahs_count:21,type:"مكية" },{ id:93,name:"الضحى",ayahs_count:11,type:"مكية" },{ id:94,name:"الشرح",ayahs_count:8,type:"مكية" },{ id:95,name:"التين",ayahs_count:8,type:"مكية" },{ id:96,name:"العلق",ayahs_count:19,type:"مكية" },{ id:97,name:"القدر",ayahs_count:5,type:"مكية" },{ id:98,name:"البينة",ayahs_count:8,type:"مدنية" },{ id:99,name:"الزلزلة",ayahs_count:8,type:"مدنية" },{ id:100,name:"العاديات",ayahs_count:11,type:"مكية" },
  { id:101,name:"القارعة",ayahs_count:11,type:"مكية" },{ id:102,name:"التكاثر",ayahs_count:8,type:"مكية" },{ id:103,name:"العصر",ayahs_count:3,type:"مكية" },{ id:104,name:"الهمزة",ayahs_count:9,type:"مكية" },{ id:105,name:"الفيل",ayahs_count:5,type:"مكية" },{ id:106,name:"قريش",ayahs_count:4,type:"مكية" },{ id:107,name:"الماعون",ayahs_count:7,type:"مكية" },{ id:108,name:"الكوثر",ayahs_count:3,type:"مكية" },{ id:109,name:"الكافرون",ayahs_count:6,type:"مكية" },{ id:110,name:"النصر",ayahs_count:3,type:"مدنية" },
  { id:111,name:"المسد",ayahs_count:5,type:"مكية" },{ id:112,name:"الإخلاص",ayahs_count:4,type:"مكية" },{ id:113,name:"الفلق",ayahs_count:5,type:"مكية" },{ id:114,name:"الناس",ayahs_count:6,type:"مكية" },
];

const normalize = (t: string) => t.replace(/\u0671/g,'\u0627').replace(/\uFEFF/g,'');
const strip = (t: string) => t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[ٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/أ|إ|آ/g,'ا').replace(/\s+/g,' ').trim();

// Get current page's surah info
function getSurahForPage(page: number) {
  const starts: [number,number][] = [[1,1],[2,2],[3,50],[4,77],[5,106],[6,128],[7,151],[8,177],[9,187],[10,208],[11,221],[12,235],[13,249],[14,255],[15,262],[16,267],[17,282],[18,293],[19,305],[20,312],[21,322],[22,332],[23,342],[24,350],[25,359],[26,367],[27,377],[28,385],[29,396],[30,404],[31,411],[32,415],[33,418],[34,428],[35,434],[36,440],[37,446],[38,453],[39,458],[40,467],[41,477],[42,483],[43,489],[44,496],[45,499],[46,502],[47,507],[48,511],[49,515],[50,518],[51,520],[52,523],[53,526],[54,528],[55,531],[56,534],[57,537],[58,542],[59,545],[60,549],[61,551],[62,553],[63,554],[64,556],[65,558],[66,560],[67,562],[68,564],[69,566],[70,568],[71,570],[72,572],[73,574],[74,575],[75,577],[76,578],[77,580],[78,582],[79,583],[80,585],[81,586],[82,587],[83,587],[84,589],[85,590],[86,591],[87,591],[88,592],[89,593],[90,594],[91,595],[92,595],[93,596],[94,596],[95,597],[96,597],[97,598],[98,598],[99,599],[100,599],[101,600],[102,600],[103,601],[104,601],[105,601],[106,602],[107,602],[108,602],[109,603],[110,603],[111,603],[112,604],[113,604],[114,604]];
  let s = 1;
  for (const [id,p] of starts) { if (p <= page) s = id; else break; }
  return SURAHS[s-1];
}

export default function QuranPage() {
  useSeo({ title: "القرآن الكريم - محراب", description: "اقرأ القرآن الكريم بخط المصحف مع 22 قارئ وتفسير ووضع حفظ بالصوت", keywords: "القرآن،قرآن،تلاوة،حفظ،تفسير", canonicalPath: "/tafseer" });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReciter, setSelectedReciter] = useState("maher");
  const [selectedMufassir, setSelectedMufassir] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showUI, setShowUI] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<{surah:number;ayah:number;text:string}|null>(null);
  const [isPlayingVerse, setIsPlayingVerse] = useState(false);
  const [hifzMode, setHifzMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentHifzAyah, setCurrentHifzAyah] = useState(0);
  const [hifzResults, setHifzResults] = useState<Map<string,"correct"|"wrong">>(new Map());
  const [recognizedText, setRecognizedText] = useState("");
  const [slideDir, setSlideDir] = useState<""|"left"|"right">("");
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const recognitionRef = useRef<any>(null);
  const touchStartX = useRef(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const pageSurah = getSurahForPage(currentPage);
  const reciter = RECITERS.find(r=>r.id===selectedReciter)||RECITERS[0];
  const mufassir = MUFASSIREEN.find(m=>m.id===selectedMufassir)||MUFASSIREEN[0];

  // Fetch page verses
  const pageQuery = useQuery<{number:number;numberInSurah:number;surah:{number:number;name:string;englishName:string};text:string}[]>({
    queryKey: ["quran-page", currentPage],
    queryFn: async () => {
      const r = await fetch(`https://api.alquran.cloud/v1/page/${currentPage}/quran-uthmani`);
      if (!r.ok) throw new Error("Failed");
      const d = await r.json();
      return d.data.ayahs.map((a:any)=>({number:a.number,numberInSurah:a.numberInSurah,surah:{number:a.surah.number,name:a.surah.name,englishName:a.surah.englishName},text:normalize(a.text)}));
    },
  });

  // Fetch tafseer for selected verse
  const tafseerQuery = useQuery<string>({
    queryKey: ["tafseer-verse", mufassir.edition, selectedVerse?.surah, selectedVerse?.ayah],
    queryFn: async () => {
      if (!selectedVerse) return "";
      const r = await fetch(`https://api.alquran.cloud/v1/ayah/${selectedVerse.surah}:${selectedVerse.ayah}/${mufassir.edition}`);
      if (!r.ok) return "فشل تحميل التفسير";
      const d = await r.json();
      return d.data.text;
    },
    enabled: !!selectedVerse,
  });

  // Swipe handlers (mobile only)
  const onTouchStart = useCallback((e:React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e:React.TouchEvent) => {
    if (!isMobile) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0 && currentPage > 1) { setSlideDir("right"); setTimeout(()=>{setCurrentPage(p=>p-1);setSlideDir("");},200); }
      else if (diff < 0 && currentPage < 604) { setSlideDir("left"); setTimeout(()=>{setCurrentPage(p=>p+1);setSlideDir("");},200); }
    }
  }, [currentPage, isMobile]);

  // Play verse audio
  const playVerse = (surahNum:number, ayahNum:number) => {
    if (audioRef.current) { audioRef.current.pause(); }
    const folder = reciter.everyayah;
    if (!folder) { // fallback to full surah
      const url = `${reciter.server}/${String(surahNum).padStart(3,"0")}.mp3`;
      audioRef.current = new Audio(url);
    } else {
      const url = `https://everyayah.com/data/${folder}/${String(surahNum).padStart(3,"0")}${String(ayahNum).padStart(3,"0")}.mp3`;
      audioRef.current = new Audio(url);
    }
    audioRef.current.onended = () => setIsPlayingVerse(false);
    audioRef.current.play().catch(()=>{});
    setIsPlayingVerse(true);
  };

  const stopAudio = () => { if(audioRef.current){audioRef.current.pause();setIsPlayingVerse(false);} };

  // Voice memorization
  const startHifz = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("المتصفح لا يدعم التعرف على الصوت. جرب Chrome."); return; }
    const rec = new SR();
    rec.lang = "ar-SA"; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 5;
    rec.onresult = (e:any) => {
      let txt = "";
      for (let i=0;i<e.results.length;i++) {
        for (let j=0;j<e.results[i].length;j++) { txt += " " + e.results[i][j].transcript; }
      }
      setRecognizedText(txt.trim());
      if (!pageQuery.data) return;
      const expected = pageQuery.data[currentHifzAyah];
      if (!expected) return;
      const expStripped = strip(expected.text);
      const spkStripped = strip(txt);
      const expWords = expStripped.split(' ').filter(w=>w.length>1);
      const spkWords = spkStripped.split(' ');
      let matched = 0;
      for (const ew of expWords) { if (spkWords.some(sw => sw.includes(ew) || ew.includes(sw) || (ew.length>2 && sw.length>2 && (ew.slice(0,3)===sw.slice(0,3))))) matched++; }
      const ratio = expWords.length > 0 ? matched/expWords.length : 0;
      if (ratio >= 0.3 || spkStripped.length > 10) {
        const key = `${expected.surah.number}-${expected.numberInSurah}`;
        setHifzResults(prev => { const m = new Map(prev); m.set(key, ratio >= 0.5 ? "correct" : "wrong"); return m; });
        if (currentHifzAyah < pageQuery.data.length - 1) { setCurrentHifzAyah(prev=>prev+1); }
        setRecognizedText("");
        try { rec.stop(); } catch(e){}
        setTimeout(()=>{try{rec.start();}catch(e){}},300);
      }
    };
    rec.onerror = () => {};
    rec.onend = () => { if (isRecording) try{rec.start();}catch(e){} };
    recognitionRef.current = rec;
    rec.start();
    setIsRecording(true);
  }, [currentHifzAyah, pageQuery.data, isRecording]);

  const stopHifz = useCallback(() => {
    if (recognitionRef.current) { recognitionRef.current.onend=null; try{recognitionRef.current.stop();}catch(e){} recognitionRef.current=null; }
    setIsRecording(false);
  }, []);

  const revealAyah = (idx:number) => {
    if (!pageQuery.data) return;
    const a = pageQuery.data[idx];
    const key = `${a.surah.number}-${a.numberInSurah}`;
    setHifzResults(prev=>{const m=new Map(prev);m.set(key,"wrong");return m;});
    if (idx === currentHifzAyah) setCurrentHifzAyah(prev=>prev+1);
  };

  useEffect(() => { return () => { stopHifz(); stopAudio(); }; }, []);
  useEffect(() => { if(showSearch && searchRef.current) setTimeout(()=>searchRef.current?.focus(),100); }, [showSearch]);
  useEffect(() => { setCurrentHifzAyah(0); setHifzResults(new Map()); setRecognizedText(""); }, [currentPage]);

  const filteredSurahs = searchText.trim() ? SURAHS.filter(s=>s.name.includes(searchText)||s.id.toString()===searchText.trim()) : SURAHS;
  const goToSurah = (id:number) => {
    const starts: Record<number,number> = {1:1,2:2,3:50,4:77,5:106,6:128,7:151,8:177,9:187,10:208,11:221,12:235,13:249,14:255,15:262,16:267,17:282,18:293,19:305,20:312,21:322,22:332,23:342,24:350,25:359,26:367,27:377,28:385,29:396,30:404,31:411,32:415,33:418,34:428,35:434,36:440,37:446,38:453,39:458,40:467,41:477,42:483,43:489,44:496,45:499,46:502,47:507,48:511,49:515,50:518,51:520,52:523,53:526,54:528,55:531,56:534,57:537,58:542,59:545,60:549,61:551,62:553,63:554,64:556,65:558,66:560,67:562,68:564,69:566,70:568,71:570,72:572,73:574,74:575,75:577,76:578,77:580,78:582,79:583,80:585,81:586,82:587,83:587,84:589,85:590,86:591,87:591,88:592,89:593,90:594,91:595,92:595,93:596,94:596,95:597,96:597,97:598,98:598,99:599,100:599,101:600,102:600,103:601,104:601,105:601,106:602,107:602,108:602,109:603,110:603,111:603,112:604,113:604,114:604};
    setCurrentPage(starts[id]||1); setShowSearch(false); setSearchText(""); setSelectedVerse(null); setHifzMode(false); stopHifz();
  };

  // Group verses by surah for display
  const surahGroups: {surahNum:number;surahName:string;ayahs:{numberInSurah:number;text:string;globalIdx:number}[]}[] = [];
  if (pageQuery.data) {
    let cur: typeof surahGroups[0]|null = null;
    pageQuery.data.forEach((a,i) => {
      if (!cur || cur.surahNum !== a.surah.number) {
        cur = {surahNum:a.surah.number,surahName:a.surah.name,ayahs:[]};
        surahGroups.push(cur);
      }
      cur.ayahs.push({numberInSurah:a.numberInSurah,text:a.text,globalIdx:i});
    });
  }

  return (
    <div className="min-h-screen bg-[#1A1510] relative select-none" style={{touchAction:isMobile?"pan-y":"auto"}}>
      {/* ═══ TOP BAR ═══ */}
      {showUI && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#2D5F3E] text-white shadow-lg animate-in fade-in duration-150">
          <div className="flex items-center justify-between px-3 h-11">
            <button onClick={()=>setShowSearch(true)} className="p-2"><Search className="w-5 h-5"/></button>
            <div className="text-center flex-1">
              <span className="text-sm font-bold">{pageSurah.name}</span>
              <span className="text-[10px] text-white/50 block">صفحة {currentPage}</span>
            </div>
            <button onClick={()=>{setHifzMode(!hifzMode);if(hifzMode)stopHifz();}} className={`p-2 rounded-lg ${hifzMode?"bg-amber-500":"hover:bg-white/10"}`}>
              <Mic className="w-5 h-5"/>
            </button>
          </div>
        </div>
      )}

      {/* ═══ SEARCH OVERLAY ═══ */}
      {showSearch && (
        <div className="fixed inset-0 z-[60] bg-black/70" onClick={()=>setShowSearch(false)}>
          <div className="bg-[#1A1510] h-full overflow-y-auto animate-in slide-in-from-right duration-300" onClick={e=>e.stopPropagation()}>
            <div className="sticky top-0 bg-[#2D5F3E] p-3">
              <div className="relative">
                <Input ref={searchRef} placeholder="ابحث عن سورة..." value={searchText} onChange={e=>setSearchText(e.target.value)} className="text-right pl-10 h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40" dir="rtl"/>
                <button onClick={()=>setShowSearch(false)} className="absolute left-3 top-3"><X className="w-5 h-5 text-white/60"/></button>
              </div>
            </div>
            <div className="p-2 space-y-1">
              {filteredSurahs.map(s=>(
                <button key={s.id} onClick={()=>goToSurah(s.id)} className="w-full text-right p-3 rounded-lg hover:bg-white/5 flex items-center gap-3 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-[#2D5F3E]/30 text-emerald-400 text-xs font-bold flex items-center justify-center">{s.id}</span>
                  <span className="font-bold text-sm text-white/90 flex-1">{s.name}</span>
                  <span className="text-[11px] text-white/40">{s.ayahs_count} آية</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ VERSE POPUP ═══ */}
      {selectedVerse && (
        <div className="fixed inset-0 z-[55] flex items-end justify-center" onClick={()=>{setSelectedVerse(null);stopAudio();}}>
          <div className="w-full max-w-lg bg-[#2A2318] rounded-t-2xl shadow-2xl p-4 animate-in slide-in-from-bottom duration-300 border-t border-[#C8A96E]/20" onClick={e=>e.stopPropagation()}>
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3"/>
            <p className="text-right font-quran text-lg text-[#E8DCC8] leading-[2.2] mb-3" dir="rtl">{selectedVerse.text}</p>
            <div className="flex gap-2 mb-3">
              <Select value={selectedReciter} onValueChange={setSelectedReciter}>
                <SelectTrigger className="flex-1 h-9 text-xs bg-white/5 border-white/10 text-white"><SelectValue/></SelectTrigger>
                <SelectContent className="max-h-[200px]">{RECITERS.map(r=><SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}</SelectContent>
              </Select>
              <button onClick={()=>isPlayingVerse?stopAudio():playVerse(selectedVerse.surah,selectedVerse.ayah)}
                className="w-10 h-9 rounded-lg bg-[#2D5F3E] text-white flex items-center justify-center">
                {isPlayingVerse?<Pause className="w-4 h-4"/>:<Play className="w-4 h-4 ml-0.5"/>}
              </button>
            </div>
            {/* Tafseer */}
            <div className="border-t border-white/10 pt-3">
              <Select value={selectedMufassir.toString()} onValueChange={v=>setSelectedMufassir(+v)}>
                <SelectTrigger className="h-8 text-[11px] bg-white/5 border-white/10 text-white mb-2"><SelectValue/></SelectTrigger>
                <SelectContent>{MUFASSIREEN.map(m=><SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
              </Select>
              <div className="text-right text-sm text-[#C8A96E]/80 leading-relaxed max-h-32 overflow-y-auto" dir="rtl">
                {tafseerQuery.isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto text-[#C8A96E]"/> : (tafseerQuery.data || "اضغط لعرض التفسير")}
              </div>
            </div>
            <button onClick={()=>{setSelectedVerse(null);stopAudio();}} className="w-full mt-3 py-2 rounded-xl bg-white/5 text-white/60 text-sm">إغلاق</button>
          </div>
        </div>
      )}

      {/* ═══ HIFZ PANEL ═══ */}
      {hifzMode && showUI && (
        <div className="fixed top-11 left-0 right-0 z-40 bg-amber-900/95 text-white px-3 py-2 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold">🎤 الحفظ</span>
            <div className="flex gap-1">
              <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">✓{Array.from(hifzResults.values()).filter(v=>v==="correct").length}</span>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">✗{Array.from(hifzResults.values()).filter(v=>v==="wrong").length}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>isRecording?stopHifz():startHifz()}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 ${isRecording?"bg-red-500 animate-pulse":"bg-amber-500"}`}>
              {isRecording?<><MicOff className="w-3.5 h-3.5"/>إيقاف</>:<><Mic className="w-3.5 h-3.5"/>ابدأ</>}
            </button>
            <button onClick={()=>revealAyah(currentHifzAyah)} className="px-4 py-2 rounded-lg bg-white/10 text-xs font-bold">كشف</button>
            <button onClick={()=>{revealAyah(currentHifzAyah);}} className="px-4 py-2 rounded-lg bg-white/10 text-xs font-bold">تخطي</button>
          </div>
          {recognizedText && <p className="text-[10px] text-amber-200/60 mt-1 text-right truncate" dir="rtl">🎙️ {recognizedText}</p>}
        </div>
      )}

      {/* ═══ MUSHAF PAGE ═══ */}
      <div className={`pt-${showUI?'11':'0'} ${hifzMode&&showUI?'pt-[100px]':''} min-h-screen flex flex-col justify-center transition-transform duration-200 ${slideDir==="left"?"translate-x-full opacity-0":slideDir==="right"?"-translate-x-full opacity-0":""}`}
        style={{paddingTop:showUI?(hifzMode?100:44):0}}
        onClick={(e)=>{if(!(e.target as HTMLElement).closest('[data-verse]')){setShowUI(!showUI);setSelectedVerse(null);}}}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

        {pageQuery.isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-[#C8A96E]"/>
            <span className="text-sm text-[#C8A96E]/50">جاري التحميل...</span>
          </div>
        ) : pageQuery.error ? (
          <div className="text-center p-8">
            <p className="text-[#C8A96E]/50 text-sm">فشل التحميل</p>
            <Button onClick={()=>pageQuery.refetch()} variant="outline" size="sm" className="mt-2">إعادة</Button>
          </div>
        ) : (
          <div className="px-4 py-6 max-w-xl mx-auto">
            {surahGroups.map((group,gi) => (
              <div key={`${group.surahNum}-${gi}`}>
                {/* Surah header if first ayah is 1 */}
                {group.ayahs[0].numberInSurah === 1 && (
                  <div className="text-center mb-4">
                    <div className="inline-block px-6 py-2 bg-[#2D5F3E]/20 rounded-xl border border-[#C8A96E]/15">
                      <span className="text-[#C8A96E] font-bold text-base font-quran">{group.surahName}</span>
                    </div>
                    {group.surahNum !== 1 && group.surahNum !== 9 && (
                      <p className="text-[22px] font-quran text-[#C8A96E]/80 mt-3" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                    )}
                  </div>
                )}
                {/* Verses - continuous flow */}
                <div className="text-center font-quran leading-[2.8]" dir="rtl" style={{fontSize:'20px'}}>
                  {group.ayahs.map(ayah => {
                    const key = `${group.surahNum}-${ayah.numberInSurah}`;
                    const hResult = hifzResults.get(key);
                    const isHidden = hifzMode && !hResult && ayah.globalIdx >= currentHifzAyah;
                    const isCurrent = hifzMode && ayah.globalIdx === currentHifzAyah;
                    return (
                      <span key={key} className="inline" data-verse>
                        <span onClick={(e)=>{e.stopPropagation();if(!hifzMode)setSelectedVerse({surah:group.surahNum,ayah:ayah.numberInSurah,text:ayah.text});}}
                          className={`transition-all duration-300 px-0.5 ${
                            isHidden ? "text-transparent" :
                            hResult==="correct" ? "text-green-500" :
                            hResult==="wrong" ? "text-red-400" :
                            "text-[#E8DCC8]"
                          } ${isCurrent ? "bg-amber-500/10 rounded" : ""} ${!hifzMode ? "active:bg-[#C8A96E]/10 rounded cursor-pointer" : ""}`}>
                          {isHidden ? ayah.text.replace(/[^\s]/g,"·") : ayah.text}
                        </span>
                        <span className="inline-flex items-center justify-center w-6 h-6 mx-0.5 text-[10px] text-[#C8A96E]/50 font-sans align-middle">
                          {isHidden?"٠":ayah.numberInSurah}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
            {/* Page number */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-16 h-px bg-[#C8A96E]/15"/>
              <span className="text-[12px] text-[#C8A96E]/30 font-sans">{currentPage}</span>
              <div className="w-16 h-px bg-[#C8A96E]/15"/>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Page navigation at bottom */}
      {!isMobile && showUI && (
        <div className="fixed bottom-16 left-0 right-0 z-40 flex justify-center gap-4 py-2">
          <button onClick={()=>{if(currentPage<604)setCurrentPage(p=>p+1);}} disabled={currentPage>=604}
            className="px-4 py-2 rounded-xl bg-[#2D5F3E]/80 text-white text-sm disabled:opacity-30 hover:bg-[#2D5F3E] transition-colors flex items-center gap-1">
            <ChevronRight className="w-4 h-4"/>الصفحة السابقة
          </button>
          <button onClick={()=>{if(currentPage>1)setCurrentPage(p=>p-1);}} disabled={currentPage<=1}
            className="px-4 py-2 rounded-xl bg-[#2D5F3E]/80 text-white text-sm disabled:opacity-30 hover:bg-[#2D5F3E] transition-colors flex items-center gap-1">
            الصفحة التالية<ChevronLeft className="w-4 h-4"/>
          </button>
        </div>
      )}
    </div>
  );
}
