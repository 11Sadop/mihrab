import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen, Loader2, Search, X, Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, ChevronLeft, ChevronRight, Eye, EyeOff, Settings,
  BookMarked, Bookmark
} from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// ─── Types ───
interface Surah {
  id: number;
  name: string;
  ayahs_count: number;
  type: string;
}

interface Reciter {
  id: string;
  name: string;
  server: string;
}

interface Mufassir {
  id: number;
  name: string;
  edition: string;
}

// ─── Reciters (20+) ───
const RECITERS: Reciter[] = [
  { id: "maher", name: "ماهر المعيقلي", server: "https://server12.mp3quran.net/maher" },
  { id: "sudais", name: "عبدالرحمن السديس", server: "https://server11.mp3quran.net/sds" },
  { id: "afasy", name: "مشاري العفاسي", server: "https://server8.mp3quran.net/afs" },
  { id: "minshawi", name: "محمد صديق المنشاوي", server: "https://server10.mp3quran.net/minsh" },
  { id: "shuraim", name: "سعود الشريم", server: "https://server7.mp3quran.net/shur" },
  { id: "husary", name: "محمود خليل الحصري", server: "https://server13.mp3quran.net/husr" },
  { id: "qatami", name: "ناصر القطامي", server: "https://server10.mp3quran.net/qht" },
  { id: "dosari", name: "ياسر الدوسري", server: "https://server10.mp3quran.net/ibrahim_dosri/Rewayat-Hafs-A-n-Assem" },
  { id: "luhaidan", name: "محمد اللحيدان", server: "https://server8.mp3quran.net/lhdan" },
  { id: "basit", name: "عبدالباسط عبدالصمد", server: "https://server7.mp3quran.net/basit" },
  { id: "ghamdi", name: "سعد الغامدي", server: "https://server7.mp3quran.net/s_gmd" },
  { id: "shatri", name: "أبو بكر الشاطري", server: "https://server11.mp3quran.net/shatri" },
  { id: "ajamy", name: "أحمد العجمي", server: "https://server10.mp3quran.net/ajm" },
  { id: "jbrl", name: "محمد جبريل", server: "https://server8.mp3quran.net/jbrl" },
  { id: "tablawi", name: "محمد الطبلاوي", server: "https://server12.mp3quran.net/tblawi" },
  { id: "ayyub", name: "محمد أيوب", server: "https://server8.mp3quran.net/ayyub" },
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

// ─── 114 Surahs ───
const SURAHS: Surah[] = [
  { id: 1, name: "الفاتحة", ayahs_count: 7, type: "مكية" },
  { id: 2, name: "البقرة", ayahs_count: 286, type: "مدنية" },
  { id: 3, name: "آل عمران", ayahs_count: 200, type: "مدنية" },
  { id: 4, name: "النساء", ayahs_count: 176, type: "مدنية" },
  { id: 5, name: "المائدة", ayahs_count: 120, type: "مدنية" },
  { id: 6, name: "الأنعام", ayahs_count: 165, type: "مكية" },
  { id: 7, name: "الأعراف", ayahs_count: 206, type: "مكية" },
  { id: 8, name: "الأنفال", ayahs_count: 75, type: "مدنية" },
  { id: 9, name: "التوبة", ayahs_count: 129, type: "مدنية" },
  { id: 10, name: "يونس", ayahs_count: 109, type: "مكية" },
  { id: 11, name: "هود", ayahs_count: 123, type: "مكية" },
  { id: 12, name: "يوسف", ayahs_count: 111, type: "مكية" },
  { id: 13, name: "الرعد", ayahs_count: 43, type: "مدنية" },
  { id: 14, name: "إبراهيم", ayahs_count: 52, type: "مكية" },
  { id: 15, name: "الحجر", ayahs_count: 99, type: "مكية" },
  { id: 16, name: "النحل", ayahs_count: 128, type: "مكية" },
  { id: 17, name: "الإسراء", ayahs_count: 111, type: "مكية" },
  { id: 18, name: "الكهف", ayahs_count: 110, type: "مكية" },
  { id: 19, name: "مريم", ayahs_count: 98, type: "مكية" },
  { id: 20, name: "طه", ayahs_count: 135, type: "مكية" },
  { id: 21, name: "الأنبياء", ayahs_count: 112, type: "مكية" },
  { id: 22, name: "الحج", ayahs_count: 78, type: "مدنية" },
  { id: 23, name: "المؤمنون", ayahs_count: 118, type: "مكية" },
  { id: 24, name: "النور", ayahs_count: 64, type: "مدنية" },
  { id: 25, name: "الفرقان", ayahs_count: 77, type: "مكية" },
  { id: 26, name: "الشعراء", ayahs_count: 227, type: "مكية" },
  { id: 27, name: "النمل", ayahs_count: 93, type: "مكية" },
  { id: 28, name: "القصص", ayahs_count: 88, type: "مكية" },
  { id: 29, name: "العنكبوت", ayahs_count: 69, type: "مكية" },
  { id: 30, name: "الروم", ayahs_count: 60, type: "مكية" },
  { id: 31, name: "لقمان", ayahs_count: 34, type: "مكية" },
  { id: 32, name: "السجدة", ayahs_count: 30, type: "مكية" },
  { id: 33, name: "الأحزاب", ayahs_count: 73, type: "مدنية" },
  { id: 34, name: "سبأ", ayahs_count: 54, type: "مكية" },
  { id: 35, name: "فاطر", ayahs_count: 45, type: "مكية" },
  { id: 36, name: "يس", ayahs_count: 83, type: "مكية" },
  { id: 37, name: "الصافات", ayahs_count: 182, type: "مكية" },
  { id: 38, name: "ص", ayahs_count: 88, type: "مكية" },
  { id: 39, name: "الزمر", ayahs_count: 75, type: "مكية" },
  { id: 40, name: "غافر", ayahs_count: 85, type: "مكية" },
  { id: 41, name: "فصلت", ayahs_count: 54, type: "مكية" },
  { id: 42, name: "الشورى", ayahs_count: 53, type: "مكية" },
  { id: 43, name: "الزخرف", ayahs_count: 89, type: "مكية" },
  { id: 44, name: "الدخان", ayahs_count: 59, type: "مكية" },
  { id: 45, name: "الجاثية", ayahs_count: 37, type: "مكية" },
  { id: 46, name: "الأحقاف", ayahs_count: 35, type: "مكية" },
  { id: 47, name: "محمد", ayahs_count: 38, type: "مدنية" },
  { id: 48, name: "الفتح", ayahs_count: 29, type: "مدنية" },
  { id: 49, name: "الحجرات", ayahs_count: 18, type: "مدنية" },
  { id: 50, name: "ق", ayahs_count: 45, type: "مكية" },
  { id: 51, name: "الذاريات", ayahs_count: 60, type: "مكية" },
  { id: 52, name: "الطور", ayahs_count: 49, type: "مكية" },
  { id: 53, name: "النجم", ayahs_count: 62, type: "مكية" },
  { id: 54, name: "القمر", ayahs_count: 55, type: "مكية" },
  { id: 55, name: "الرحمن", ayahs_count: 78, type: "مدنية" },
  { id: 56, name: "الواقعة", ayahs_count: 96, type: "مكية" },
  { id: 57, name: "الحديد", ayahs_count: 29, type: "مدنية" },
  { id: 58, name: "المجادلة", ayahs_count: 22, type: "مدنية" },
  { id: 59, name: "الحشر", ayahs_count: 24, type: "مدنية" },
  { id: 60, name: "الممتحنة", ayahs_count: 13, type: "مدنية" },
  { id: 61, name: "الصف", ayahs_count: 14, type: "مدنية" },
  { id: 62, name: "الجمعة", ayahs_count: 11, type: "مدنية" },
  { id: 63, name: "المنافقون", ayahs_count: 11, type: "مدنية" },
  { id: 64, name: "التغابن", ayahs_count: 18, type: "مدنية" },
  { id: 65, name: "الطلاق", ayahs_count: 12, type: "مدنية" },
  { id: 66, name: "التحريم", ayahs_count: 12, type: "مدنية" },
  { id: 67, name: "الملك", ayahs_count: 30, type: "مكية" },
  { id: 68, name: "القلم", ayahs_count: 52, type: "مكية" },
  { id: 69, name: "الحاقة", ayahs_count: 52, type: "مكية" },
  { id: 70, name: "المعارج", ayahs_count: 44, type: "مكية" },
  { id: 71, name: "نوح", ayahs_count: 28, type: "مكية" },
  { id: 72, name: "الجن", ayahs_count: 28, type: "مكية" },
  { id: 73, name: "المزمل", ayahs_count: 20, type: "مكية" },
  { id: 74, name: "المدثر", ayahs_count: 56, type: "مكية" },
  { id: 75, name: "القيامة", ayahs_count: 40, type: "مكية" },
  { id: 76, name: "الإنسان", ayahs_count: 31, type: "مدنية" },
  { id: 77, name: "المرسلات", ayahs_count: 50, type: "مكية" },
  { id: 78, name: "النبأ", ayahs_count: 40, type: "مكية" },
  { id: 79, name: "النازعات", ayahs_count: 46, type: "مكية" },
  { id: 80, name: "عبس", ayahs_count: 42, type: "مكية" },
  { id: 81, name: "التكوير", ayahs_count: 29, type: "مكية" },
  { id: 82, name: "الانفطار", ayahs_count: 19, type: "مكية" },
  { id: 83, name: "المطففين", ayahs_count: 36, type: "مكية" },
  { id: 84, name: "الانشقاق", ayahs_count: 25, type: "مكية" },
  { id: 85, name: "البروج", ayahs_count: 22, type: "مكية" },
  { id: 86, name: "الطارق", ayahs_count: 17, type: "مكية" },
  { id: 87, name: "الأعلى", ayahs_count: 19, type: "مكية" },
  { id: 88, name: "الغاشية", ayahs_count: 26, type: "مكية" },
  { id: 89, name: "الفجر", ayahs_count: 30, type: "مكية" },
  { id: 90, name: "البلد", ayahs_count: 20, type: "مكية" },
  { id: 91, name: "الشمس", ayahs_count: 15, type: "مكية" },
  { id: 92, name: "الليل", ayahs_count: 21, type: "مكية" },
  { id: 93, name: "الضحى", ayahs_count: 11, type: "مكية" },
  { id: 94, name: "الشرح", ayahs_count: 8, type: "مكية" },
  { id: 95, name: "التين", ayahs_count: 8, type: "مكية" },
  { id: 96, name: "العلق", ayahs_count: 19, type: "مكية" },
  { id: 97, name: "القدر", ayahs_count: 5, type: "مكية" },
  { id: 98, name: "البينة", ayahs_count: 8, type: "مدنية" },
  { id: 99, name: "الزلزلة", ayahs_count: 8, type: "مدنية" },
  { id: 100, name: "العاديات", ayahs_count: 11, type: "مكية" },
  { id: 101, name: "القارعة", ayahs_count: 11, type: "مكية" },
  { id: 102, name: "التكاثر", ayahs_count: 8, type: "مكية" },
  { id: 103, name: "العصر", ayahs_count: 3, type: "مكية" },
  { id: 104, name: "الهمزة", ayahs_count: 9, type: "مكية" },
  { id: 105, name: "الفيل", ayahs_count: 5, type: "مكية" },
  { id: 106, name: "قريش", ayahs_count: 4, type: "مكية" },
  { id: 107, name: "الماعون", ayahs_count: 7, type: "مكية" },
  { id: 108, name: "الكوثر", ayahs_count: 3, type: "مكية" },
  { id: 109, name: "الكافرون", ayahs_count: 6, type: "مكية" },
  { id: 110, name: "النصر", ayahs_count: 3, type: "مدنية" },
  { id: 111, name: "المسد", ayahs_count: 5, type: "مكية" },
  { id: 112, name: "الإخلاص", ayahs_count: 4, type: "مكية" },
  { id: 113, name: "الفلق", ayahs_count: 5, type: "مكية" },
  { id: 114, name: "الناس", ayahs_count: 6, type: "مكية" },
];

const normalizeQuranText = (text: string): string =>
  text.replace(/\u0671/g, '\u0627').replace(/\uFEFF/g, '');

// ─── Page start mapping (which surah starts on which Mushaf page) ───
const SURAH_PAGE_START: Record<number, number> = {
  1:1,2:2,3:50,4:77,5:106,6:128,7:151,8:177,9:187,10:208,
  11:221,12:235,13:249,14:255,15:262,16:267,17:282,18:293,19:305,20:312,
  21:322,22:332,23:342,24:350,25:359,26:367,27:377,28:385,29:396,30:404,
  31:411,32:415,33:418,34:428,35:434,36:440,37:446,38:453,39:458,40:467,
  41:477,42:483,43:489,44:496,45:499,46:502,47:507,48:511,49:515,50:518,
  51:520,52:523,53:526,54:528,55:531,56:534,57:537,58:542,59:545,60:549,
  61:551,62:553,63:554,64:556,65:558,66:560,67:562,68:564,69:566,70:568,
  71:570,72:572,73:574,74:575,75:577,76:578,77:580,78:582,79:583,80:585,
  81:586,82:587,83:587,84:589,85:590,86:591,87:591,88:592,89:593,90:594,
  91:595,92:595,93:596,94:596,95:597,96:597,97:598,98:598,99:599,100:599,
  101:600,102:600,103:601,104:601,105:601,106:602,107:602,108:602,109:603,
  110:603,111:603,112:604,113:604,114:604,
};

// Get surah for a page
function getSurahForPage(page: number): number {
  let surah = 1;
  for (let i = 1; i <= 114; i++) {
    if (SURAH_PAGE_START[i] <= page) surah = i;
    else break;
  }
  return surah;
}

// ─── Component ───
export default function QuranPage() {
  useSeo({
    title: "القرآن الكريم - استماع وتلاوة وتفسير",
    description: "اقرأ القرآن الكريم كاملاً مع التفسير واستمع لأشهر القراء. صفحات المصحف، وضع الحفظ، 22 قارئ.",
    keywords: "القرآن الكريم، قرآن كريم، استماع قرآن، تلاوة، ماهر المعيقلي، السديس، العفاسي، ناصر القطامي، ياسر الدوسري، محمد اللحيدان، تفسير، quran",
    canonicalPath: "/tafseer",
  });

  // State
  const [view, setView] = useState<"list" | "reader">("list");
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedReciter, setSelectedReciter] = useState<string>("maher");
  const [selectedMufassir, setSelectedMufassir] = useState<number>(1);
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTafseer, setShowTafseer] = useState(false);
  const [expandedAyah, setExpandedAyah] = useState<number | null>(null);
  const [hifzMode, setHifzMode] = useState(false);
  const [revealedAyahs, setRevealedAyahs] = useState<Set<number>>(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(26);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const readerRef = useRef<HTMLDivElement | null>(null);

  const currentSurah = SURAHS.find(s => s.id === selectedSurah) || SURAHS[0];
  const currentReciter = RECITERS.find(r => r.id === selectedReciter) || RECITERS[0];
  const currentMufassir = MUFASSIREEN.find(m => m.id === selectedMufassir) || MUFASSIREEN[0];

  // Fetch surah verses
  const surahQuery = useQuery<{ number: number; text: string; page: number }[]>({
    queryKey: ["quran-surah-v2", selectedSurah],
    queryFn: async () => {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/quran-uthmani`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      return data.data.ayahs.map((a: any) => ({
        number: a.numberInSurah,
        text: normalizeQuranText(a.text),
        page: a.page,
      }));
    },
    enabled: view === "reader",
  });

  // Fetch tafseer
  const tafseerQuery = useQuery<{ number: number; text: string }[]>({
    queryKey: ["quran-tafseer-v2", currentMufassir.edition, selectedSurah],
    queryFn: async () => {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/${currentMufassir.edition}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      return data.data.ayahs.map((a: any) => ({ number: a.numberInSurah, text: a.text }));
    },
    enabled: view === "reader" && showTafseer,
  });

  // Group verses by page
  const pageGroups = surahQuery.data ? (() => {
    const groups: Map<number, typeof surahQuery.data> = new Map();
    for (const ayah of surahQuery.data!) {
      if (!groups.has(ayah.page)) groups.set(ayah.page, []);
      groups.get(ayah.page)!.push(ayah);
    }
    return groups;
  })() : new Map();

  const surahPages = Array.from(pageGroups.keys()).sort((a, b) => a - b);
  const currentPageIdx = surahPages.indexOf(currentPage);

  // Audio
  const surahNum = String(selectedSurah).padStart(3, "0");
  const audioUrl = `${currentReciter.server}/${surahNum}.mp3`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [selectedSurah, selectedReciter]);

  // Set page when surah loads
  useEffect(() => {
    if (surahPages.length > 0) {
      setCurrentPage(surahPages[0]);
    }
  }, [surahQuery.data]);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    } else if (audioRef.current.src !== audioUrl) {
      audioRef.current.src = audioUrl;
    }
    audioRef.current.muted = isMuted;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) audioRef.current.muted = !isMuted;
  };

  const openSurah = (id: number) => {
    setSelectedSurah(id);
    setView("reader");
    setShowTafseer(false);
    setExpandedAyah(null);
    setHifzMode(false);
    setRevealedAyahs(new Set());
    setShowSearch(false);
  };

  const goNextPage = () => {
    const idx = surahPages.indexOf(currentPage);
    if (idx < surahPages.length - 1) {
      setCurrentPage(surahPages[idx + 1]);
      readerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else if (selectedSurah < 114) {
      openSurah(selectedSurah + 1);
    }
  };

  const goPrevPage = () => {
    const idx = surahPages.indexOf(currentPage);
    if (idx > 0) {
      setCurrentPage(surahPages[idx - 1]);
      readerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else if (selectedSurah > 1) {
      openSurah(selectedSurah - 1);
    }
  };

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goPrevPage(); // swipe left = prev (RTL)
      else goNextPage(); // swipe right = next (RTL)
    }
  }, [currentPage, surahPages, selectedSurah]);

  // Hifz mode
  const toggleAyahReveal = (ayahNum: number) => {
    const newSet = new Set(revealedAyahs);
    if (newSet.has(ayahNum)) newSet.delete(ayahNum);
    else newSet.add(ayahNum);
    setRevealedAyahs(newSet);
  };

  const revealAll = () => {
    const pageAyahs = pageGroups.get(currentPage);
    if (pageAyahs) {
      setRevealedAyahs(new Set(pageAyahs.map(a => a.number)));
    }
  };

  // Filter surahs
  const filteredSurahs = searchText.trim()
    ? SURAHS.filter(s => s.name.includes(searchText) || s.id.toString() === searchText.trim())
    : SURAHS;

  // Focus search on show
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

  // ═══════════ SURAH LIST VIEW ═══════════
  if (view === "list") {
    return (
      <div className="min-h-screen pb-32 bg-gradient-to-b from-background to-muted/30">
        <Header title="القرآن الكريم" showBack />
        <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 space-y-4 pt-4">
          {/* Hero */}
          <Card className="p-5 bg-gradient-to-bl from-emerald-700 to-teal-800 text-white border-0 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-2 right-2 text-[80px] font-quran leading-none">﷽</div>
            </div>
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl">📖</div>
              <div>
                <h2 className="text-xl font-bold">القرآن الكريم</h2>
                <p className="text-white/70 text-sm">114 سورة • {RECITERS.length} قارئ • صفحات المصحف</p>
              </div>
            </div>
          </Card>

          {/* Search */}
          <div className="relative">
            <Input
              placeholder="ابحث عن سورة..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="text-right pl-10 h-12 rounded-xl bg-card"
              dir="rtl"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
            {searchText && (
              <button onClick={() => setSearchText("")} className="absolute left-10 top-3.5">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Reciter */}
          <Select value={selectedReciter} onValueChange={setSelectedReciter}>
            <SelectTrigger className="text-right h-11 rounded-xl">
              <SelectValue placeholder="اختر القارئ" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {RECITERS.map(r => (
                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Surah Grid */}
          <div className="grid grid-cols-1 gap-2">
            {filteredSurahs.map(surah => (
              <button
                key={surah.id}
                onClick={() => openSurah(surah.id)}
                className="w-full text-right p-4 rounded-xl bg-card border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex items-center gap-3 active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm flex-shrink-0 rotate-45">
                  <span className="-rotate-45">{surah.id}</span>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-bold text-base">سورة {surah.name}</p>
                  <p className="text-xs text-muted-foreground">{surah.ayahs_count} آية • {surah.type} • ص {SURAH_PAGE_START[surah.id]}</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ═══════════ READER VIEW ═══════════
  const currentPageAyahs = pageGroups.get(currentPage) || [];

  return (
    <div className="min-h-screen pb-40 bg-[#faf7f0] dark:bg-[#1a1510] relative" ref={readerRef}>
      {/* Top Bar — tap to show search */}
      <div className="sticky top-0 z-50 bg-[#2d5f3e] dark:bg-[#1e3a2a] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={() => setShowSearch(true)} className="flex-1 text-center">
            <h1 className="text-lg font-bold">سورة {currentSurah.name}</h1>
            <p className="text-xs text-white/60">صفحة {currentPage} • الجزء {Math.ceil(currentPage / 20)}</p>
          </button>
          <button onClick={() => { setView("list"); if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); } }} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <BookMarked className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="px-4 pb-3 space-y-2 animate-in slide-in-from-top-2 duration-200 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 w-16">الخط</span>
              <input
                type="range" min={18} max={40} value={fontSize}
                onChange={e => setFontSize(+e.target.value)}
                className="flex-1 accent-emerald-400 h-1"
              />
              <span className="text-xs w-8 text-center">{fontSize}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setHifzMode(!hifzMode); setRevealedAyahs(new Set()); }}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${hifzMode ? "bg-amber-500 text-white" : "bg-white/10 hover:bg-white/20"}`}
              >
                {hifzMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {hifzMode ? "إيقاف الحفظ" : "وضع الحفظ"}
              </button>
              <button
                onClick={() => setShowTafseer(!showTafseer)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${showTafseer ? "bg-blue-500 text-white" : "bg-white/10 hover:bg-white/20"}`}
              >
                <BookOpen className="w-4 h-4" />
                {showTafseer ? "إخفاء التفسير" : "التفسير"}
              </button>
            </div>
            {showTafseer && (
              <Select value={selectedMufassir.toString()} onValueChange={v => setSelectedMufassir(parseInt(v))}>
                <SelectTrigger className="h-8 text-xs bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MUFASSIREEN.map(m => (
                    <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-[60] bg-black/60 animate-in fade-in duration-200" onClick={() => setShowSearch(false)}>
          <div className="p-4 bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-top-4 duration-300" onClick={e => e.stopPropagation()}>
            <div className="relative mb-3">
              <Input
                ref={searchInputRef}
                placeholder="ابحث عن سورة..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="text-right pl-10 h-12 rounded-xl"
                dir="rtl"
                autoFocus
              />
              <button onClick={() => setShowSearch(false)} className="absolute left-3 top-3.5">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto space-y-1">
              {filteredSurahs.map(s => (
                <button
                  key={s.id}
                  onClick={() => { openSurah(s.id); setSearchText(""); }}
                  className="w-full text-right p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex items-center gap-3 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">{s.id}</span>
                  <span className="font-bold text-sm flex-1">سورة {s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.ayahs_count} آية</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div
        className="min-h-[calc(100vh-200px)] px-4 py-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {surahQuery.isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
            <span className="text-sm text-muted-foreground">جاري تحميل السورة...</span>
          </div>
        ) : surahQuery.error ? (
          <Card className="p-6 text-center mt-8">
            <p className="text-muted-foreground">فشل تحميل السورة. تحقق من الإنترنت.</p>
            <Button onClick={() => surahQuery.refetch()} variant="outline" className="mt-3">إعادة المحاولة</Button>
          </Card>
        ) : (
          <div className="max-w-lg mx-auto">
            {/* Bismillah for first page of surah */}
            {currentPage === surahPages[0] && selectedSurah !== 1 && selectedSurah !== 9 && (
              <div className="text-center py-4 mb-4">
                <p className="text-2xl font-quran text-[#2d5f3e] dark:text-emerald-400" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#2d5f3e]/30 to-transparent mx-auto mt-3" />
              </div>
            )}

            {/* Hifz mode hint */}
            {hifzMode && (
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">🧠 وضع الحفظ — اضغط على الآية لكشفها</span>
                <button onClick={revealAll} className="text-xs bg-amber-500 text-white px-3 py-1 rounded-full">كشف الكل</button>
              </div>
            )}

            {/* Verses — continuous text like mushaf */}
            <div className="leading-[3] text-center font-quran" dir="rtl" style={{ fontSize: `${fontSize}px` }}>
              {currentPageAyahs.map((ayah) => {
                const isHidden = hifzMode && !revealedAyahs.has(ayah.number);
                const isExpanded = expandedAyah === ayah.number;
                const tafseerText = tafseerQuery.data?.find(t => t.number === ayah.number)?.text;

                return (
                  <span key={ayah.number} className="inline">
                    <span
                      onClick={() => {
                        if (hifzMode) toggleAyahReveal(ayah.number);
                        else if (showTafseer) setExpandedAyah(isExpanded ? null : ayah.number);
                      }}
                      className={`
                        transition-all duration-300 rounded-sm px-0.5
                        ${isHidden ? "bg-amber-200/50 dark:bg-amber-800/30 text-transparent select-none cursor-pointer hover:bg-amber-300/50" : "text-[#1a1a1a] dark:text-[#e8dcc8]"}
                        ${showTafseer && !hifzMode ? "cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/20" : ""}
                        ${isExpanded ? "bg-emerald-100 dark:bg-emerald-900/30 rounded-lg" : ""}
                      `}
                    >
                      {isHidden ? ayah.text.replace(/./g, "▪") : ayah.text}
                    </span>
                    <span className="inline-flex items-center justify-center w-7 h-7 mx-1 rounded-full bg-[#2d5f3e]/10 dark:bg-emerald-500/15 text-[#2d5f3e] dark:text-emerald-400 text-[11px] font-sans font-bold align-middle">
                      {ayah.number}
                    </span>
                    {/* Inline tafseer */}
                    {showTafseer && isExpanded && tafseerText && (
                      <span className="block w-full text-right my-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200/50 dark:border-amber-800/30 text-sm font-sans leading-relaxed text-amber-900 dark:text-amber-200" style={{ fontSize: '14px' }}>
                        <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1 text-xs">📖 {currentMufassir.name}</span>
                        {tafseerText}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>

            {/* Page number ornament */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#2d5f3e]/30" />
              <span className="text-sm font-bold text-[#2d5f3e]/60 dark:text-emerald-500/40">{currentPage}</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#2d5f3e]/30" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar — Audio + Navigation */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-[#2d5f3e] dark:bg-[#1e3a2a] text-white shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        {/* Reciter */}
        <div className="px-4 pt-2">
          <Select value={selectedReciter} onValueChange={setSelectedReciter}>
            <SelectTrigger className="h-8 text-xs bg-white/10 border-white/20 text-white w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[250px]">
              {RECITERS.map(r => (
                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Prev Page */}
          <button onClick={goPrevPage} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Audio Controls */}
          <div className="flex items-center gap-3">
            <button onClick={toggleMute} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
              {isMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white text-[#2d5f3e] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>

          {/* Next Page */}
          <button onClick={goNextPage} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
