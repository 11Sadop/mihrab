import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, X, Play, Pause, SkipForward, SkipBack, Mic, MicOff, ChevronLeft, ChevronRight, BookOpen, Share2, Square, Settings, ArrowRight, Volume2 } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

interface Rec{id:string;name:string;server:string;ev?:string;}
// FIXED: corrected everyayah folder names for reliable playback and fixed Maher speed issue
const RECITERS:Rec[]=[
  {id:"afasy",   name:"مشاري العفاسي",      server:"https://server8.mp3quran.net/afs",             ev:"Alafasy_128kbps"},
  {id:"maher",   name:"ماهر المعيقلي",      server:"https://server12.mp3quran.net/maher",          ev:"MaherAlMuaiqly128kbps"}, // Restored real Maher Al-Muaiqly recitation folder
  {id:"sudais",  name:"عبدالرحمن السديس",   server:"https://server11.mp3quran.net/sds",            ev:"Abdurrahmaan_As-Sudais_192kbps"},
  {id:"hosary",  name:"محمود خليل الحصري", server:"https://server13.mp3quran.net/husr",           ev:"Husary_128kbps"},
  {id:"minshawi",name:"محمد صديق المنشاوي",server:"https://server10.mp3quran.net/minsh",          ev:"Minshawy_Murattal_128kbps"},
  {id:"basit",   name:"عبدالباسط عبدالصمد",server:"https://server7.mp3quran.net/basit",           ev:"Abdul_Basit_Murattal_192kbps"},
  {id:"dosari",  name:"ياسر الدوسري",       server:"https://server11.mp3quran.net/yasser",         ev:"Yasser_Ad-Dussary_128kbps"}, // Fixed folder name
  {id:"ghamdi",  name:"سعد الغامدي",        server:"https://server7.mp3quran.net/s_gmd",          ev:"Ghamadi_40kbps"}, // Fixed folder name
  {id:"shuraym", name:"سعود الشريم",        server:"https://server7.mp3quran.net/shur",           ev:"Saood_ash-Shuraym_128kbps"}, // Fixed folder name
  {id:"ajamy",   name:"أحمد العجمي",        server:"https://server10.mp3quran.net/ajm",           ev:"Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net"},
  {id:"ayyoub",  name:"محمد أيوب",          server:"https://server8.mp3quran.net/ayyub",          ev:"Muhammad_Ayyoub_128kbps"},
  {id:"juhany",  name:"عبدالله الجهني",     server:"https://server11.mp3quran.net/jhn",           ev:"Abdullaah_3awwaad_Al-Juhaynee_128kbps"}, // Fixed folder name
  {id:"tablawi", name:"محمد الطبلاوي",      server:"https://server6.mp3quran.net/tablawi",        ev:"Mohammad_al_Tablaway_128kbps"},
  {id:"shatri",  name:"أبو بكر الشاطري",    server:"https://server11.mp3quran.net/shatri",         ev:"Abu_Bakr_Ash-Shaatree_128kbps"},
  {id:"huthaify",name:"علي الحذيفي",        server:"https://server9.mp3quran.net/hthfi",           ev:"Hudhaify_128kbps"},
  {id:"abbad",   name:"فارس عباد",          server:"https://server8.mp3quran.net/frs_a",           ev:"Fares_Abbad_64kbps"},
]

const SURAHS=[{id:1,n:"الفاتحة",c:7},{id:2,n:"البقرة",c:286},{id:3,n:"آل عمران",c:200},{id:4,n:"النساء",c:176},{id:5,n:"المائدة",c:120},{id:6,n:"الأنعام",c:165},{id:7,n:"الأعراف",c:206},{id:8,n:"الأنفال",c:75},{id:9,n:"التوبة",c:129},{id:10,n:"يونس",c:109},{id:11,n:"هود",c:123},{id:12,n:"يوسف",c:111},{id:13,n:"الرعد",c:43},{id:14,n:"إبراهيم",c:52},{id:15,n:"الحجر",c:99},{id:16,n:"النحل",c:128},{id:17,n:"الإسراء",c:111},{id:18,n:"الكهف",c:110},{id:19,n:"مريم",c:98},{id:20,n:"طه",c:135},{id:21,n:"الأنبياء",c:112},{id:22,n:"الحج",c:78},{id:23,n:"المؤمنون",c:118},{id:24,n:"النور",c:64},{id:25,n:"الفرقان",c:77},{id:26,n:"الشعراء",c:227},{id:27,n:"النمل",c:93},{id:28,n:"القصص",c:88},{id:29,n:"العنكبوت",c:69},{id:30,n:"الروم",c:60},{id:31,n:"لقمان",c:34},{id:32,n:"السجدة",c:30},{id:33,n:"الأحزاب",c:73},{id:34,n:"سبأ",c:54},{id:35,n:"فاطر",c:45},{id:36,n:"يس",c:83},{id:37,n:"الصافات",c:182},{id:38,n:"ص",c:88},{id:39,n:"الزمر",c:75},{id:40,n:"غافر",c:85},{id:41,n:"فصلت",c:54},{id:42,n:"الشورى",c:53},{id:43,n:"الزخرف",c:89},{id:44,n:"الدخان",c:59},{id:45,n:"الجاثية",c:37},{id:46,n:"الأحقاف",c:35},{id:47,n:"محمد",c:38},{id:48,n:"الفتح",c:29},{id:49,n:"الحجرات",c:18},{id:50,n:"ق",c:45},{id:51,n:"الذاريات",c:60},{id:52,n:"الطور",c:49},{id:53,n:"النجم",c:62},{id:54,n:"القمر",c:55},{id:55,n:"الرحمن",c:78},{id:56,n:"الواقعة",c:96},{id:57,n:"الحديد",c:29},{id:58,n:"المجادلة",c:22},{id:59,n:"الحشر",c:24},{id:60,n:"الممتحنة",c:13},{id:61,n:"الصف",c:14},{id:62,n:"الجمعة",c:11},{id:63,n:"المنافقون",c:11},{id:64,n:"التغابن",c:18},{id:65,n:"الطلاق",c:12},{id:66,n:"التحريم",c:12},{id:67,n:"الملك",c:30},{id:68,n:"القلم",c:52},{id:69,n:"الحاقة",c:52},{id:70,n:"المعارج",c:44},{id:71,n:"نوح",c:28},{id:72,n:"الجن",c:28},{id:73,n:"المزمل",c:20},{id:74,n:"المدثر",c:56},{id:75,n:"القيامة",c:40},{id:76,n:"الإنسان",c:31},{id:77,n:"المرسلات",c:50},{id:78,n:"النبأ",c:40},{id:79,n:"النازعات",c:46},{id:80,n:"عبس",c:42},{id:81,n:"التكوير",c:29},{id:82,n:"الانفطار",c:19},{id:83,n:"المطففين",c:36},{id:84,n:"الانشقاق",c:25},{id:85,n:"البروج",c:22},{id:86,n:"الطارق",c:17},{id:87,n:"الأعلى",c:19},{id:88,n:"الغاشية",c:26},{id:89,n:"الفجر",c:30},{id:90,n:"البلد",c:20},{id:91,n:"الشمس",c:15},{id:92,n:"الليل",c:21},{id:93,n:"الضحى",c:11},{id:94,n:"الشرح",c:8},{id:95,n:"التين",c:8},{id:96,n:"العلق",c:19},{id:97,n:"القدر",c:5},{id:98,n:"البينة",c:8},{id:99,n:"الزلزلة",c:8},{id:100,n:"العاديات",c:11},{id:101,n:"القارعة",c:11},{id:102,n:"التكاثر",c:8},{id:103,n:"العصر",c:3},{id:104,n:"الهمزة",c:9},{id:105,n:"الفيل",c:5},{id:106,n:"قريش",c:4},{id:107,n:"الماعون",c:7},{id:108,n:"الكوثر",c:3},{id:109,n:"الكافرون",c:6},{id:110,n:"النصر",c:3},{id:111,n:"المسد",c:5},{id:112,n:"الإخلاص",c:4},{id:113,n:"الفلق",c:5},{id:114,n:"الناس",c:6}];

const PS:Record<number,number>={1:1,2:2,3:50,4:77,5:106,6:128,7:151,8:177,9:187,10:208,11:221,12:235,13:249,14:255,15:262,16:267,17:282,18:293,19:305,20:312,21:322,22:332,23:342,24:350,25:359,26:367,27:377,28:385,29:396,30:404,31:411,32:415,33:418,34:428,35:434,36:440,37:446,38:453,39:458,40:467,41:477,42:483,43:489,44:496,45:499,46:502,47:507,48:511,49:515,50:518,51:520,52:523,53:526,54:528,55:531,56:534,57:537,58:542,59:545,60:549,61:551,62:553,63:554,64:556,65:558,66:560,67:562,68:564,69:566,70:568,71:570,72:572,73:574,74:575,75:577,76:578,77:580,78:582,79:583,80:585,81:586,82:587,83:587,84:589,85:590,86:591,87:591,88:592,89:593,90:594,91:595,92:595,93:596,94:596,95:597,96:597,97:598,98:598,99:599,100:599,101:600,102:600,103:601,104:601,105:601,106:602,107:602,108:602,109:603,110:603,111:603,112:604,113:604,114:604};

const JUZ:Record<number,number>={1:1,22:2,42:3,62:4,82:5,102:6,121:7,142:8,162:9,182:10,201:11,222:12,242:13,262:14,282:15,302:16,322:17,342:18,362:19,382:20,402:21,422:22,442:23,462:24,482:25,502:26,522:27,542:28,562:29,582:30};
function juzForPage(p:number){let j=1;for(const pg of Object.keys(JUZ).map(Number).sort((a,b)=>a-b)){if(pg<=p)j=JUZ[pg];else break;}return j;}

// Normalize text
const norm=(t:string)=>t.replace(/\uFEFF/g,'');
// Strip ALL Quranic annotation marks (U+06D6-U+06ED) that render as ugly black dots/circles in the font
const cleanDisplay=(t:string)=>t.replace(/[\u06D6-\u06ED]/g,'');
// Add space between muqatta'at letters (e.g., الم) for better diacritic display
const strip=(t:string)=>t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u0653]/g,'').replace(/[ٱإأآا]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,' ').trim();
const pad3=(n:number)=>String(n).padStart(3,'0');
function surahForPage(p:number){let s=1;for(const id of Object.keys(PS).map(Number)){if(PS[id]<=p)s=id;else break;}return SURAHS[s-1];}

// Robust Uthmani Bismillah removal
function removeBismillah(t:string):string{
  let s = t.replace(/\uFEFF/g, '').trim();
  const BISM = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
  if(s.startsWith(BISM)){
    return s.slice(BISM.length).trim();
  }
  return s;
}

const fetchPage=async(p:number)=>{
  const r=await fetch(`https://api.alquran.cloud/v1/page/${p}/quran-uthmani`);
  if(!r.ok)throw new Error("Fail");const d=await r.json();
    return d.data.ayahs.filter((a:any)=>a.numberInSurah>0).map((a:any)=>{
    let t=a.text;
    if(a.numberInSurah===1&&a.surah.number!==9&&a.surah.number!==1){
      t=removeBismillah(t);
    }
    // Clean multiple space characters inside Uthmani text rendering to prevent browser typography gaps
    return{num:a.number,nis:a.numberInSurah,sn:a.surah.number,sname:a.surah.name,text:cleanDisplay(t.trim()).replace(/\s+/g, ' '),orig:norm(a.text),juz:a.juz};
  });
};

const QBG:Record<string,{bg:string;text:string;border:string;hi:string}>={
  dark:{bg:'#1a2332',text:'#d4c5a0',border:'#3d5a3d',hi:'rgba(34,197,94,0.25)'},
  cream:{bg:'#F5ECD7',text:'#2c1810',border:'#c8a96e',hi:'rgba(34,150,94,0.2)'},
  white:{bg:'#ffffff',text:'#1a1a1a',border:'#ddd',hi:'rgba(34,197,94,0.15)'},
  green:{bg:'#1a3a2a',text:'#d4c5a0',border:'#3d5a3d',hi:'rgba(34,197,94,0.25)'},
};

const SAJDA_VERSES=new Set(['7:206','13:15','16:50','17:109','19:58','22:18','22:77','25:60','27:26','32:15','38:24','41:38','53:62','84:21','96:19']);

const TAFSEER_SOURCES=[
  {id:'ar.muyassar',name:'التفسير الميسر',api:'alquran'},
  {id:'ar.jalalayn',name:'تفسير الجلالين',api:'alquran'},
  {id:'1',name:'تفسير ابن كثير',api:'tafseer'},
  {id:'2',name:'تفسير الطبري',api:'tafseer'},
  {id:'3',name:'تفسير القرطبي',api:'tafseer'},
  {id:'4',name:'تفسير السعدي',api:'tafseer'},
  {id:'5',name:'تفسير البغوي',api:'tafseer'},
  {id:'8',name:'تفسير الوسيط',api:'tafseer'},
];

export default function TafseerPage(){
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  const activeIndexRef = useRef<number>(1);
  
  const getActiveAudio = () => activeIndexRef.current === 1 ? audio1Ref.current : audio2Ref.current;
  const getInactiveAudio = () => activeIndexRef.current === 1 ? audio2Ref.current : audio1Ref.current;

  const nextPreloadedKey = useRef<string>("");
  // Refs for event handlers to avoid stale closures
  const handleEndedRef = useRef<()=>void>(()=>{});
  const handleErrRef = useRef<()=>void>(()=>{});
  const handleTimeUpdateRef = useRef<()=>void>(()=>{});

  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    const a1 = new Audio();
    const a2 = new Audio();
    audio1Ref.current = a1;
    audio2Ref.current = a2;
    
    const onEnded = (e: Event) => {
      if (e.target !== getActiveAudio()) return;
      handleEndedRef.current();
    };
    const onTimeUpdate = (e: Event) => {
      if (e.target !== getActiveAudio()) return;
      handleTimeUpdateRef.current();
    };
    const onError = (e: Event) => {
      if (e.target !== getActiveAudio()) return;
      handleErrRef.current();
    };
    const onWaiting = (e: Event) => {
      if (e.target !== getActiveAudio()) return;
      setIsBuffering(true);
    };
    const onPlaying = (e: Event) => {
      if (e.target !== getActiveAudio()) return;
      setIsBuffering(false);
    };
    const onCanPlay = (e: Event) => {
      if (e.target !== getActiveAudio()) return;
      setIsBuffering(false);
    };
    const onStalled = (e: Event) => {
      if (e.target !== getActiveAudio()) return;
      setIsBuffering(true);
    };
    
    [a1, a2].forEach(a => {
      a.addEventListener('ended', onEnded);
      a.addEventListener('timeupdate', onTimeUpdate);
      a.addEventListener('error', onError);
      a.addEventListener('waiting', onWaiting);
      a.addEventListener('playing', onPlaying);
      a.addEventListener('canplay', onCanPlay);
      a.addEventListener('stalled', onStalled);
      a.preload = 'auto';
    });

    return () => {
      [a1, a2].forEach(a => {
        a.pause();
        a.removeEventListener('ended', onEnded);
        a.removeEventListener('timeupdate', onTimeUpdate);
        a.removeEventListener('error', onError);
        a.removeEventListener('waiting', onWaiting);
        a.removeEventListener('playing', onPlaying);
        a.removeEventListener('canplay', onCanPlay);
        a.removeEventListener('stalled', onStalled);
      });
    };
  }, []);

  const playLocalSound = (type: 'ok'|'error') => {
    const urls = {
      ok: 'https://cdn.pixabay.com/audio/2022/03/15/audio_7833324f4e.mp3',
      error: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bb6430386c.mp3'
    };
    new Audio(urls[type]).play().catch(()=>{});
  };

  const currentAudio = () => getActiveAudio();
  const bufferAudio = () => getInactiveAudio();

  const handleEnded = () => {
    const q = playQueueRef.current;
    if (q && q.nis < q.maxNis) {
      const nextNis = q.nis + 1;
      playQueueRef.current = { ...q, nis: nextNis };
      
      // Swap active audio pointer!
      activeIndexRef.current = activeIndexRef.current === 1 ? 2 : 1;
      
      // ===== Gaps fully removed to prevent natural breathing lag or pauses between verses =====
      setTimeout(() => {
        playVerse(q.sn, nextNis, true); // true = gapless transition using preloaded
      }, 0);
    } else {
      setPlayingKey("");
      playQueueRef.current = null;
      setIsPlaying(false);
      if('mediaSession' in navigator) navigator.mediaSession.playbackState='none';
    }
  };
  // Keep ref updated so event listener always calls latest version
  handleEndedRef.current = handleEnded;


  // Helper: build audio URL — everyayah CDN primary (fastest/cached), mp3quran primary fallback
  const buildUrl = (rec: Rec, sn: number, nis: number) => {
    if (rec.ev) {
      return `https://everyayah.com/data/${rec.ev}/${pad3(sn)}${pad3(nis)}.mp3`;
    }
    return `${rec.server}/${pad3(sn)}${pad3(nis)}.mp3`;
  };


  const handleTimeUpdate = () => {
    const a = getActiveAudio();
    if (!a) return;
    
    // Scrub bar
    const bar = document.getElementById('scrubBar') as HTMLInputElement;
    if (bar && a.duration && isFinite(a.duration)) {
      bar.value = String((a.currentTime / a.duration) * 100);
    }
    
    // Preload next ayah when 4s remain (give more buffer)
    const q = playQueueRef.current;
    if (q && q.nis < q.maxNis && a.duration > 0 && isFinite(a.duration)) {
      const remaining = a.duration - a.currentTime;
      const nextNis = q.nis + 1;
      const nextKey = `${q.sn}-${nextNis}`;
      if (remaining <= 6.0 && nextPreloadedKey.current !== nextKey) {
        const rec = getReciter();
        const url = buildUrl(rec, q.sn, nextNis);
        const b = bufferAudio();
        if (b) {
          b.src = url;
          b.load();
          nextPreloadedKey.current = nextKey;
        }
      }
    }
  };
  handleTimeUpdateRef.current = handleTimeUpdate;

  useSeo({title:"محراب - رفيقك الإسلامي",description:"محراب رفيقك الإسلامي - القرآن الكريم والتفسير ومواقيت الصلاة",canonicalPath:"/tafseer"});
  const qc=useQueryClient();
  const [pg,setPg]=useState(1);
  const [recId,setRecId]=useState("afasy");
  const [showSearch,setShowSearch]=useState(false);
  const [search,setSearch]=useState("");
  const [showUI,setShowUI]=useState(true);
  const [selVerse,setSelVerse]=useState<{sn:number;nis:number;text:string}|null>(null);
  const [showOptions,setShowOptions]=useState(false);
  const [showSharePage,setShowSharePage]=useState(false);
  const [shareMode,setShareMode]=useState<"text"|"noharakat"|"image">("image");
  const [shareEndNis,setShareEndNis]=useState(1);
  const [isSharing,setIsSharing]=useState(false);
  const [isSearchingAyahs,setIsSearchingAyahs]=useState(false);
  const [ayahSearchResults,setAyahSearchResults]=useState<any[]>([]);
  const [qTheme,setQTheme]=useState('cream');
  const [showSettings,setShowSettings]=useState(false);
  const [showTafseer,setShowTafseer]=useState(false);
  const [tafseerText,setTafseerText]=useState('');
  const [tafseerLoading,setTafseerLoading]=useState(false);
  const [tafseerSource,setTafseerSource]=useState('ar.muyassar');
  const [hifzFeedback,setHifzFeedback]=useState<{type:'ok'|'wrong_verse'|'wrong_pron';msg:string;details?:string[]}|null>(null);
  const [hifzStatus,setHifzStatus]=useState<'none'|'ok'|'wrong'|'pron'>('none');
  const [hifzTimer,setHifzTimer]=useState<any>(null);
  const [bookmarks,setBookmarks]=useState<Set<string>>(new Set());

  useEffect(()=>{
    try{const b=localStorage.getItem('q-bookmarks');if(b)setBookmarks(new Set(JSON.parse(b)));}catch{}
  },[]);
  const toggleBookmark=(k:string)=>{
    setBookmarks(p=>{
      const n=new Set(p); if(n.has(k))n.delete(k); else n.add(k);
      localStorage.setItem('q-bookmarks',JSON.stringify(Array.from(n)));
      return n;
    });
  };

  const [isPlaying,setIsPlaying]=useState(false);
  const [playingKey,setPlayingKey]=useState("");
  const [playingSn,setPlayingSn]=useState(0);

  const searchRef=useRef<HTMLInputElement>(null);
  const playQueueRef=useRef<{sn:number;nis:number;maxNis:number}|null>(null);
  const hifzTxtRef=useRef(''); 
  const isAdvancingRef=useRef(false);
  const recIdRef=useRef(recId);
  const pgRef=useRef(pg);
  const hifzIdxRef=useRef(0);
  const finalTranscriptRef=useRef('');

  const [hifz,setHifz]=useState(false);
  const [recording,setRecording]=useState(false);
  const [hifzIdx,setHifzIdx]=useState(0);
  
  const playedErrorIndices = useRef<Set<number>>(new Set());
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const startQuranDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadSuccess(false);
    setDownloadProgress(0);

    try {
      const cache = await caches.open('mihrab-app-v77');
      const totalPages = 604;
      const batchSize = 15;

      for (let start = 1; start <= totalPages; start += batchSize) {
        const end = Math.min(start + batchSize - 1, totalPages);
        const promises = [];

        for (let p = start; p <= end; p++) {
          const url = `https://api.alquran.cloud/v1/page/${p}/quran-uthmani`;
          promises.push(
            fetch(url)
              .then(async (res) => {
                if (res.ok) {
                  await cache.put(url, res.clone());
                  setDownloadProgress((prev) => prev + 1);
                } else {
                  throw new Error(`Page ${p} failed`);
                }
              })
              .catch((err) => {
                console.error(`Failed page download: ${p}`, err);
              })
          );
        }

        await Promise.all(promises);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      setDownloadSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  // Keep ref in sync with state so recognition handler always has latest value
  useEffect(()=>{
    hifzIdxRef.current=hifzIdx;
    setWordMatchLevels([]);
    playedErrorIndices.current.clear();
  },[hifzIdx]);
  
  const [hifzRes,setHifzRes]=useState<Map<string,"ok"|"err">>(new Map());
  const [recTxt,setRecTxt]=useState("");
  const [wordMatchLevels,setWordMatchLevels]=useState<number[]>([]);
  const recRef=useRef<any>(null);
  const txRef=useRef(0);
  
  useEffect(()=>{pgRef.current=pg;},[pg]);
  useEffect(()=>{recIdRef.current=recId;},[recId]);

  const reciter=RECITERS.find(r=>r.id===recId)||RECITERS[0];
  const surah=surahForPage(pg);
  const juz=juzForPage(pg);
  const pq=useQuery({queryKey:["qp",pg],queryFn:()=>fetchPage(pg)});
  const pqDataRef = useRef<any[] | null>(null);
  useEffect(()=>{
    pqDataRef.current = pq.data || null;
  },[pq.data]);
  const colors=QBG[qTheme]||QBG.dark;

  useEffect(()=>{localStorage.setItem('q-theme',qTheme);},[qTheme]);
  useEffect(()=>{
    if(pg<604)qc.prefetchQuery({queryKey:["qp",pg+1],queryFn:()=>fetchPage(pg+1)});
    if(pg>1)qc.prefetchQuery({queryKey:["qp",pg-1],queryFn:()=>fetchPage(pg-1)});
  },[pg,qc]);

  const onTS=useCallback((e:React.TouchEvent)=>{txRef.current=e.touches[0].clientX;},[]);
  const onTE=useCallback((e:React.TouchEvent)=>{
    const d=txRef.current-e.changedTouches[0].clientX;
    if(d>50&&pg>1){setPg(p=>p-1);resetHifz();}
    else if(d<-50&&pg<604){setPg(p=>p+1);resetHifz();}
  },[pg]);

  // Desktop keyboard navigation
  useEffect(()=>{
    const handleKey=(e:KeyboardEvent)=>{
      if(showSearch||showOptions||showTafseer||showSettings||showSharePage) return;
      if(e.key==='ArrowLeft'&&pg<604){setPg(p=>p+1);resetHifz();window.scrollTo(0,0);}
      if(e.key==='ArrowRight'&&pg>1){setPg(p=>p-1);resetHifz();window.scrollTo(0,0);}
      if(e.key===' '){e.preventDefault();togglePlay();}
    };
    window.addEventListener('keydown',handleKey);
    return ()=>window.removeEventListener('keydown',handleKey);
  },[pg,showSearch,showOptions,showTafseer,showSettings,showSharePage]);
  const resetHifz=()=>{
    setHifzIdx(0);
    setHifzRes(new Map());
    setRecTxt("");
    setWordMatchLevels([]);
    finalTranscriptRef.current = '';
    hifzTxtRef.current = '';
    playedErrorIndices.current.clear();
  };

  const searchTimeout=useRef<any>(null);
  const handleSearch=(val:string)=>{
    setSearch(val);
    if(searchTimeout.current)clearTimeout(searchTimeout.current);
    if(val.trim().length>2&&!SURAHS.some(s=>s.n.includes(val.trim()))){
      searchTimeout.current=setTimeout(async()=>{
        setIsSearchingAyahs(true);
        try{const encoded=encodeURIComponent(val.trim());const r=await fetch(`https://api.alquran.cloud/v1/search/${encoded}/all/ar`);const d=await r.json();
          if(d.code===200&&d.data?.matches){const u:any[]=[],seen=new Set();for(const m of d.data.matches){const k=`${m.surah.number}-${m.numberInSurah}`;if(!seen.has(k)){seen.add(k);u.push(m);if(u.length>=20)break;}}setAyahSearchResults(u);}
          else setAyahSearchResults([]);
        }catch{setAyahSearchResults([]);}setIsSearchingAyahs(false);
      },600);
    }else setAyahSearchResults([]);
  };
  const goSurah=(id:number)=>{setPg(PS[id]||1);setShowSearch(false);setSearch("");setSelVerse(null);setShowOptions(false);setHifz(false);stopHifz();resetHifz();setAyahSearchResults([]);};

  // ═══ AUDIO ═══
  const getReciter=()=>RECITERS.find(r=>r.id===recIdRef.current)||RECITERS[0];

  const ensureVerseVisible=(sn:number,nis:number)=>{
    const data=qc.getQueryData<any[]>(["qp",pgRef.current]);
    if(data&&!data.some((a:any)=>a.sn===sn&&a.nis===nis)){
      fetch(`https://api.alquran.cloud/v1/ayah/${sn}:${nis}`).then(r=>r.json()).then(d=>{
        if(d?.data?.page){
          setPg(d.data.page);
          // scroll after page loads
          setTimeout(()=>{const el=document.getElementById(`verse-${sn}-${nis}`);if(el)el.scrollIntoView({behavior:'smooth',block:'center'});},350);
        }
      }).catch(()=>{});
    } else {
      setTimeout(()=>{const el=document.getElementById(`verse-${sn}-${nis}`);if(el)el.scrollIntoView({behavior:'smooth',block:'center'});}, 80);
    }
  };

  const playVerse=(sn:number,nis:number,isGaplessTransition:boolean=false)=>{
    const rec=getReciter();
    const a=currentAudio();
    if(!a)return;
    
    if('mediaSession' in navigator){
      navigator.mediaSession.metadata=new MediaMetadata({
        title:`سورة ${SURAHS.find(s=>s.id===sn)?.n||''}`,
        artist:rec.name,
        album:`آية ${nis}`,
        artwork:[{src:'/icon-512x512.png',sizes:'512x512',type:'image/png'}]
      });
      navigator.mediaSession.setActionHandler('play',()=>togglePlay());
      navigator.mediaSession.setActionHandler('pause',()=>togglePlay());
      navigator.mediaSession.setActionHandler('previoustrack',()=>skipPrev());
      navigator.mediaSession.setActionHandler('nexttrack',()=>skipNext());
    }

    setIsBuffering(true);
    const url = buildUrl(rec, sn, nis);
    
    if (isGaplessTransition) {
      if (a.src !== url) {
        a.src = url;
        a.load();
      }
      a.play().then(()=>{
        setIsBuffering(false);
        if('mediaSession' in navigator)navigator.mediaSession.playbackState='playing';
      }).catch(()=>{
        handleErr();
      });
    } else {
      const inactive = getInactiveAudio();
      if (inactive) {
        inactive.pause();
        inactive.currentTime = 0;
        inactive.src = "";
      }
      nextPreloadedKey.current = "";
      
      a.src = url;
      a.load();
      a.play().then(()=>{
        if('mediaSession' in navigator)navigator.mediaSession.playbackState='playing';
      }).catch(()=>{});
    }
    
    setIsPlaying(true);setPlayingKey(`${sn}-${nis}`);setPlayingSn(sn);
    ensureVerseVisible(sn,nis);
  };

  const playSurahFrom=(sn:number,startNis:number)=>{
    const maxNis=SURAHS.find(s=>s.id===sn)?.c||1;
    playQueueRef.current={sn,nis:startNis,maxNis};
    playVerse(sn,startNis,false);
  };

  const stopAudio=()=>{
    audio1Ref.current?.pause();
    if(audio1Ref.current){audio1Ref.current.currentTime=0;}
    audio2Ref.current?.pause();
    if(audio2Ref.current){audio2Ref.current.currentTime=0;}
    nextPreloadedKey.current='';
    setIsPlaying(false);setPlayingKey("");setPlayingSn(0);playQueueRef.current=null;
    setIsBuffering(false);
    if('mediaSession' in navigator)navigator.mediaSession.playbackState='none';
  };

  const togglePlay=()=>{
    const a=currentAudio();
    if(isPlaying){
      if(a)a.pause();
      setIsPlaying(false);
      if('mediaSession' in navigator)navigator.mediaSession.playbackState='paused';
    }
    else if(a&&a.src&&a.src!==''){
      a.play().then(()=>{if('mediaSession' in navigator)navigator.mediaSession.playbackState='playing';}).catch(()=>{
        // If play fails (e.g. after stop), restart from surah
        playSurahFrom(surah.id,1);
      });
      setIsPlaying(true);
    }
    else playSurahFrom(surah.id,1);
  };

  const skipNext=()=>{const q=playQueueRef.current;if(q&&q.nis<q.maxNis){q.nis++;playVerse(q.sn,q.nis);}};
  const skipPrev=()=>{const q=playQueueRef.current;if(q&&q.nis>1){q.nis--;playVerse(q.sn,q.nis);}};

  const handleErr=()=>{
    const q=playQueueRef.current;if(!q)return;
    const rec=getReciter();
    const a=currentAudio();
    if(!a)return;

    const src = a.src || "";
    const evUrl = rec.ev ? `https://everyayah.com/data/${rec.ev}/${pad3(q.sn)}${pad3(q.nis)}.mp3` : "";
    const mirrorUrl = rec.ev ? `https://mirrors.quranicaudio.com/everyayah/${rec.ev}/${pad3(q.sn)}${pad3(q.nis)}.mp3` : "";
    const mp3quranUrl = `${rec.server}/${pad3(q.sn)}${pad3(q.nis)}.mp3`;

    if (src.includes("everyayah.com") && mirrorUrl) {
      a.src = mirrorUrl;
      a.load();
      a.play().catch(() => {
        a.src = mp3quranUrl;
        a.load();
        a.play().catch(() => handleEnded());
      });
    } else if (src.includes("quranicaudio.com")) {
      a.src = mp3quranUrl;
      a.load();
      a.play().catch(() => handleEnded());
    } else {
      if (evUrl) {
        a.src = evUrl;
        a.load();
        a.play().catch(() => {
          if (mirrorUrl) {
            a.src = mirrorUrl;
            a.load();
            a.play().catch(() => handleEnded());
          } else {
            handleEnded();
          }
        });
      } else {
        handleEnded();
      }
    }
  };
  handleErrRef.current = handleErr;

  const handleReciterChange=(newId:string)=>{
    setRecId(newId);recIdRef.current=newId;
    const q=playQueueRef.current;
    if(q&&isPlaying){
      currentAudio()?.pause();
      setTimeout(()=>playVerse(q.sn,q.nis),50);
    }
  };

  // Hifz — Sequential word-by-word matching for high accuracy
  const startHifz=useCallback(()=>{
    const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
    if(!SR){alert("المتصفح لا يدعم التعرف على الصوت. استخدم Chrome");return;}
    const r=new SR();
    r.lang="ar-SA"; // Saudi Arabic — closest to Quranic pronunciation
    r.continuous=true;
    r.interimResults=true;
    r.maxAlternatives=10; // Maximum alternatives for best accuracy
    
    // Normalize Arabic text for comparison (strip diacritics, unify letters)
    const normAr = (s:string) => s
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u06DF\u06E0\u06E2\u06E3\u06E5\u06E6\u06E8\u06EA\u06EB\u06EC\u06ED\u0640]/g,'')
      .replace(/[أإآءٱ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Strip prefixes (و، ف، ب، ل، ك) for flexible speech recognition matching
    const cleanWord = (w: string): string => {
      let cleaned = normAr(w);
      if (cleaned.length > 3) {
        const prefixes = ['و', 'ف', 'ب', 'ل', 'ك'];
        if (prefixes.includes(cleaned[0])) {
          cleaned = cleaned.substring(1);
        }
      }
      return cleaned;
    };

    // Calculate standard Levenshtein distance
    const getLevenshteinDistance = (a: string, b: string): number => {
      const matrix: number[][] = [];
      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }
      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              matrix[i][j - 1] + 1,     // insertion
              matrix[i - 1][j] + 1      // deletion
            );
          }
        }
      }
      return matrix[b.length][a.length];
    };

    // Calculate word-level similarity based on Levenshtein distance
    const wordSimilarity = (a: string, b: string): number => {
      const cleanA = cleanWord(a);
      const cleanB = cleanWord(b);
      
      if (cleanA === cleanB) return 1.0;
      if (cleanA.length === 0 || cleanB.length === 0) return 0.0;
      
      const dist = getLevenshteinDistance(cleanA, cleanB);
      const maxLen = Math.max(cleanA.length, cleanB.length);
      return 1.0 - (dist / maxLen);
    };
    
    let allTranscripts:string[] = []; // Accumulate all heard words
    let lastResultCount = 0;
    let lastCheckedIdx = hifzIdxRef.current;
    
    r.onresult=(e:any)=>{
      if(!pqDataRef.current) return;
      const idx=hifzIdxRef.current; // Always use ref for current index
      
      // Auto-reset accumulated variables when the verse advances
      if (idx !== lastCheckedIdx) {
        allTranscripts = [];
        lastResultCount = 0;
        lastCheckedIdx = idx;
      }
      
      const exp=pqDataRef.current[idx]; if(!exp) return;
      if(isAdvancingRef.current) return;

      // Collect ALL results (not just latest) for better coverage
      let fullTranscript = '';
      let newWords:string[] = [];
      
      for(let i = 0; i < e.results.length; i++) {
        const result = e.results[i];
        // Check all alternatives for best match
        let bestText = result[0].transcript;
        if(result.length > 1) {
          const expNorm = normAr(exp.text);
          let bestScore = 0;
          for(let j = 0; j < result.length; j++) {
            const altNorm = normAr(result[j].transcript);
            const words = altNorm.split(' ').filter((w:string) => w.length > 1);
            const expWords = expNorm.split(' ').filter((w:string) => w.length > 1);
            let score = 0;
            for(const w of words) {
              if(expWords.some((ew:string) => wordSimilarity(w, ew) > 0.6)) score++;
            }
            if(score > bestScore) { bestScore = score; bestText = result[j].transcript; }
          }
        }
        
        if(result.isFinal || i >= lastResultCount) {
          const words = normAr(bestText).split(' ').filter((w:string) => w.length > 1);
          newWords.push(...words);
        }
        fullTranscript += bestText + ' ';
      }

      // ═══ CHECK FOR "قد قريتها" COMMAND (go back to previous verse) ═══
      const fullNorm = normAr(fullTranscript.trim());
      const GO_BACK_PHRASES = ['قد قريتها', 'قريتها', 'قد قراتها', 'قراتها', 'قرأتها', 'قد قرأتها'];
      const wantsGoBack = GO_BACK_PHRASES.some(phrase => fullNorm.includes(normAr(phrase)));
      if (wantsGoBack && !isAdvancingRef.current) {
        isAdvancingRef.current = true;
        allTranscripts = [];
        lastResultCount = 0;
        setHifzFeedback({type: 'ok', msg: '↩️ رجعنا للآية السابقة'});
        setHifzStatus('ok');
        setHifzIdx(prev => {
          const prevIdx = Math.max(0, prev - 1);
          setTimeout(() => {
            const el = document.getElementById(`verse-${pqDataRef.current![prevIdx].sn}-${pqDataRef.current![prevIdx].nis}`);
            if (el) el.scrollIntoView({behavior: 'smooth', block: 'center'});
          }, 200);
          isAdvancingRef.current = false;
          return prevIdx;
        });
        setWordMatchLevels([]);
        hifzTxtRef.current = '';
        setRecTxt('');
        try { r.stop(); } catch {}
        setTimeout(() => { try { r.start(); } catch {} }, 300);
        return;
      }
      
      // ═══ SMART JUMP: detect if spoken text matches a DIFFERENT verse anywhere on the page ═══
      // Use case: "اذا قرأت اية قرأتها قبل يرجع لك" - even if 60 verses away
      if (!isAdvancingRef.current && newWords.length >= 3 && pqDataRef.current) {
        const currentIdx = hifzIdxRef.current;
        let jumpTargetIdx = -1;
        let bestJumpScore = 0;

        for (let vi = 0; vi < pqDataRef.current.length; vi++) {
          if (vi === currentIdx || vi === currentIdx + 1) continue; // Skip current and normal next
          const v = pqDataRef.current[vi];
          const verseWords = normAr(v.text).split(' ').filter((w: string) => w.length >= 2);
          const spokenFiltered = newWords.filter((w: string) => w.length >= 2);
          if (spokenFiltered.length < 2) continue;

          let matched = 0;
          for (const sw of spokenFiltered) {
            if (verseWords.some((vw: string) => wordSimilarity(sw, vw) >= 0.75)) matched++;
          }
          const score = matched / Math.max(spokenFiltered.length, 1);

          if (score >= 0.60 && matched >= 3 && score > bestJumpScore) {
            bestJumpScore = score;
            jumpTargetIdx = vi;
          }
        }

        if (jumpTargetIdx !== -1) {
          isAdvancingRef.current = true;
          allTranscripts = [];
          lastResultCount = 0;
          const jumpVerse = pqDataRef.current[jumpTargetIdx];
          const direction = jumpTargetIdx < currentIdx ? '↩️ رجعنا للآية' : '⏩ تخطينا للآية';
          setHifzFeedback({type: 'ok', msg: `${direction} (${jumpVerse.nis})`});
          setHifzStatus('ok');
          setHifzIdx(jumpTargetIdx);
          setWordMatchLevels([]);
          hifzTxtRef.current = '';
          setRecTxt('');
          try { r.stop(); } catch {}
          setTimeout(() => { try { r.start(); } catch {} }, 300);
          return;
        }
      }

      lastResultCount = e.results.length;
      hifzTxtRef.current = fullTranscript;
      setRecTxt(fullTranscript.split(' ').slice(-6).join(' '));

      // Compare accumulated words against expected verse
      const originalWords = exp.text.split(' ');
      const ew = originalWords.map((w: string) => normAr(w));
      const spokenWords = allTranscripts.slice(-Math.max(ew.length * 2, 20)); // Use recent window

      const newMatchLevels = new Array(ew.length).fill(0);
      let expPtr = 0;
      let wrongWords: string[] = [];
      let matchedCount = 0;

      for (let i = 0; i < spokenWords.length && expPtr < ew.length; i++) {
        const said = spokenWords[i];
        if (said.length < 2) continue;

        // Try matching against expPtr, expPtr+1, expPtr+2
        const sim0 = wordSimilarity(said, ew[expPtr]);
        const sim1 = expPtr + 1 < ew.length ? wordSimilarity(said, ew[expPtr + 1]) : 0;
        const sim2 = expPtr + 2 < ew.length ? wordSimilarity(said, ew[expPtr + 2]) : 0;

        if (sim0 >= 0.65) {
          // sim0 >= 0.75 = perfectly correct (green), 0.65-0.75 = minor error (amber)
          newMatchLevels[expPtr] = sim0 < 0.75 ? 2 : 1;
          if (sim0 < 0.75) {
            wrongWords.push(`⚠️ "${originalWords[expPtr]}" (نطقت: "${said}")`);
          }
          matchedCount++;
          expPtr++;
        }
        else if (sim1 >= 0.65) {
          // Skipped 1 word
          newMatchLevels[expPtr] = 3; // Red
          newMatchLevels[expPtr + 1] = 1; // Green
          wrongWords.push(`❌ نسيت كلمة "${originalWords[expPtr]}"`);
          if (!playedErrorIndices.current.has(expPtr)) {
            playLocalSound('error');
            playedErrorIndices.current.add(expPtr);
          }
          matchedCount += 2;
          expPtr += 2;
        }
        else if (sim2 >= 0.65) {
          // Skipped 2 words
          newMatchLevels[expPtr] = 3; // Red
          newMatchLevels[expPtr + 1] = 3; // Red
          newMatchLevels[expPtr + 2] = 1; // Green
          wrongWords.push(`❌ نسيت "${originalWords[expPtr]} ${originalWords[expPtr+1]}"`);
          if (!playedErrorIndices.current.has(expPtr)) {
            playLocalSound('error');
            playedErrorIndices.current.add(expPtr);
          }
          if (!playedErrorIndices.current.has(expPtr + 1)) {
            playedErrorIndices.current.add(expPtr + 1);
          }
          matchedCount += 3;
          expPtr += 3;
        }
        else {
          // No match in window: treat as a mispronunciation of expPtr to prevent getting stuck
          newMatchLevels[expPtr] = 3; // Red (wrong)
          wrongWords.push(`❌ خطأ في نطق "${originalWords[expPtr]}" (نطقت: "${said}")`);
          if (!playedErrorIndices.current.has(expPtr)) {
            playLocalSound('error');
            playedErrorIndices.current.add(expPtr);
          }
          expPtr++; // ADVANCE POINTER TO PREVENT GETTING STUCK
        }
      }
      
      setWordMatchLevels(newMatchLevels);
      
      const validEwCount = ew.filter((w:string)=>w.length>=1).length;
      const completeRatio = validEwCount > 0 ? matchedCount / validEwCount : 0;
      
      // Show real-time feedback on progress or errors
      if (wrongWords.length > 0) {
        const lastErr = wrongWords[wrongWords.length - 1];
        setHifzFeedback({type: 'wrong_pron', msg: lastErr});
        setHifzStatus('pron');
      } else if (completeRatio > 0) {
        setHifzFeedback({type: 'ok', msg: `⏳ ${Math.round(completeRatio*100)}% من الآية...`});
        setHifzStatus('none');
      }
      
      // ✅ Verse completed (65% match or reached the end)
      if ((completeRatio >= 0.65 || expPtr >= ew.length) && !isAdvancingRef.current) {
        isAdvancingRef.current = true;
        
        const hasErrors = wrongWords.filter(w => w.startsWith('❌')).length > 0;
        const isPerfect = completeRatio >= 0.75 && wrongWords.filter(w=>w.startsWith('❌')).length === 0;
        
        if (isPerfect) {
          setHifzFeedback({type: 'ok', msg: 'ممتاز! أحسنت ✅'});
          setHifzStatus('ok');
        } else if (hasErrors) {
          setHifzFeedback({type: 'wrong_verse', msg: '⚠️ صحيح مع ملاحظات', details: wrongWords.slice(0, 3)});
          setHifzStatus('pron');
        } else {
          setHifzFeedback({type: 'ok', msg: 'أحسنت ✅'});
          setHifzStatus('ok');
        }
        
        playLocalSound('ok');
        const k = `${exp.sn}-${exp.nis}`;
        setHifzRes(prev => { const n = new Map(prev); n.set(k, isPerfect ? 'ok' : 'err'); return n; });
        
        // Auto-advance to next verse
        setTimeout(() => {
          allTranscripts = [];
          lastResultCount = 0;
          
          setHifzIdx(prev => {
            const next = Math.min(prev + 1, (pqDataRef.current?.length || 1) - 1);
            setTimeout(() => {
              const el = document.getElementById(`verse-${pqDataRef.current![next].sn}-${pqDataRef.current![next].nis}`);
              if (el) el.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 200);
            isAdvancingRef.current = false;
            return next;
          });
          setHifzFeedback(null);
          setHifzStatus('none');
          hifzTxtRef.current = '';
          setRecTxt('');
          setWordMatchLevels([]);
          
          try { r.stop(); } catch {}
          setTimeout(() => { try { r.start(); } catch {} }, 300);
        }, 400);
      }
    };

    r.onerror=(e:any)=>{
      console.log('Speech error:', e.error);
      // Auto-restart on non-fatal errors
      if(e.error === 'no-speech' || e.error === 'audio-capture') {
        setTimeout(() => { try { r.start(); } catch {} }, 500);
      }
    };
    r.onend=()=>{
      // Always auto-restart if still recording
      if(!isAdvancingRef.current){
        setTimeout(()=>{try{r.start();}catch{}},300);
      }
    };
    recRef.current=r;
    r.start();
    setRecording(true);
  },[]); // removed hifzIdx and pq.data from deps - we use ref instead

  const stopHifz=useCallback(()=>{if(recRef.current){recRef.current.onend=null;try{recRef.current.stop();}catch{}recRef.current=null;}setRecording(false);},[]);

  useEffect(() => {
    if (hifz) {
      startHifz();
    } else {
      stopHifz();
    }
  }, [hifz, startHifz, stopHifz]);

  useEffect(() => {
    return () => {
      stopHifz();
    };
  }, [stopHifz]);
  const reveal=(i:number)=>{
    if(!pq.data)return;
    const a=pq.data[i];
    playLocalSound('error');
    setHifzRes(prev=>{const m=new Map(prev);m.set(`${a.sn}-${a.nis}`,"err");return m;});
    if(i===hifzIdx){
      setHifzIdx(prev=>Math.min(prev+1,(pq.data?.length||1)-1));
      setWordMatchLevels([]);
      finalTranscriptRef.current = '';
      hifzTxtRef.current = '';
    }
  };

  useEffect(()=>{return()=>{stopHifz();stopAudio();};},[]);
  useEffect(()=>{if(showSearch&&searchRef.current)setTimeout(()=>searchRef.current?.focus(),100);},[showSearch]);
  useEffect(()=>{if(selVerse)setShareEndNis(selVerse.nis)},[selVerse]);

  // Share
  const getShareRange=async()=>{
    if(!selVerse)return{text:"",refs:""};
    if(shareEndNis===selVerse.nis)return{text:selVerse.text,refs:`${selVerse.nis}`};
    setIsSharing(true);
    try{const r=await fetch(`https://api.alquran.cloud/v1/surah/${selVerse.sn}/quran-uthmani`);const d=await r.json();
      const ayahs=d.data.ayahs.slice(selVerse.nis-1,shareEndNis);
      const combined=ayahs.map((a:any)=>`${norm(a.text)} ﴿${a.numberInSurah}﴾`).join(' ');
      setIsSharing(false);return{text:combined,refs:`${selVerse.nis}-${shareEndNis}`};
    }catch{setIsSharing(false);return{text:selVerse.text,refs:`${selVerse.nis}`};}
  };

  const shareAsImage=async(text:string,refs:string)=>{
    if(!selVerse)return;
    const c=QBG[qTheme]||QBG.cream;
    const sname=SURAHS.find(s=>s.id===selVerse.sn)?.n||'';
    const cv=document.createElement('canvas');
    cv.width=1080;
    const ctx=cv.getContext('2d');if(!ctx)return;
    const fontQ="'Amiri Quran','Amiri','Scheherazade New',serif";
    const fontUI="'Amiri','Scheherazade New',serif";

    // Measure text height first
    ctx.font=`44px ${fontQ}`;
    const maxW=900;
    const words=cleanDisplay(text).split(' ');
    let lines:string[]=[]; let curLine='';
    for(const w of words){
      const test=curLine+w+' ';
      if(ctx.measureText(test).width>maxW&&curLine){lines.push(curLine.trim());curLine=w+' ';}
      else curLine=test;
    }
    if(curLine)lines.push(curLine.trim());
    const lineH=90;
    const headerH=180;
    const textStartY=headerH+60;
    const totalTextH=lines.length*lineH;
    const footerH=80;
    const totalH=textStartY+totalTextH+footerH+40;
    cv.height=Math.max(800,totalH);

    // Background
    ctx.fillStyle=c.bg;ctx.fillRect(0,0,cv.width,cv.height);

    // Decorative border
    ctx.strokeStyle=c.border;ctx.lineWidth=2;
    ctx.strokeRect(30,30,cv.width-60,cv.height-60);
    ctx.strokeStyle=c.border+'60';ctx.lineWidth=1;
    ctx.strokeRect(40,40,cv.width-80,cv.height-80);

    // Corner ornaments
    const drawCorner=(x:number,y:number)=>{
      ctx.fillStyle=c.border;ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fill();
    };
    drawCorner(30,30);drawCorner(cv.width-30,30);drawCorner(30,cv.height-30);drawCorner(cv.width-30,cv.height-30);

    // Surah name header with ornamental frame
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='rtl';
    const hdrY=100;
    // Decorative lines around surah name
    const nameW=ctx.measureText(sname).width+160;
    const boxX=(cv.width-Math.min(nameW,500))/2;
    const boxW=Math.min(nameW,500);
    ctx.strokeStyle=c.border;ctx.lineWidth=2;
    // Draw ornamental surah name box
    ctx.beginPath();
    ctx.moveTo(boxX+15,hdrY-30);ctx.lineTo(boxX+boxW-15,hdrY-30);
    ctx.quadraticCurveTo(boxX+boxW,hdrY-30,boxX+boxW,hdrY-15);
    ctx.lineTo(boxX+boxW,hdrY+15);
    ctx.quadraticCurveTo(boxX+boxW,hdrY+30,boxX+boxW-15,hdrY+30);
    ctx.lineTo(boxX+15,hdrY+30);
    ctx.quadraticCurveTo(boxX,hdrY+30,boxX,hdrY+15);
    ctx.lineTo(boxX,hdrY-15);
    ctx.quadraticCurveTo(boxX,hdrY-30,boxX+15,hdrY-30);
    ctx.stroke();
    // Small diamonds at corners of box
    const drawDiamond=(x:number,y:number,s:number)=>{
      ctx.fillStyle=c.border;ctx.beginPath();
      ctx.moveTo(x,y-s);ctx.lineTo(x+s,y);ctx.lineTo(x,y+s);ctx.lineTo(x-s,y);ctx.closePath();ctx.fill();
    };
    drawDiamond(boxX,hdrY,5);drawDiamond(boxX+boxW,hdrY,5);
    // Decorative lines extending from box
    ctx.strokeStyle=c.border+'80';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(80,hdrY);ctx.lineTo(boxX-10,hdrY);ctx.stroke();
    ctx.beginPath();ctx.moveTo(boxX+boxW+10,hdrY);ctx.lineTo(cv.width-80,hdrY);ctx.stroke();

    // Surah name text (just the name, no "سورة")
    ctx.font=`bold 38px ${fontUI}`;ctx.fillStyle=c.text;
    ctx.fillText(sname,cv.width/2,hdrY+2);

    // Verse text with Uthmanic font
    ctx.font=`44px ${fontQ}`;ctx.fillStyle=c.text;
    let y=textStartY;
    for(const line of lines){
      ctx.fillText(line,cv.width/2,y);
      y+=lineH;
    }

    // Subtle watermark at bottom
    const wmY=cv.height-50;
    ctx.font=`18px ${fontUI}`;ctx.fillStyle=c.border+'90';
    ctx.fillText('mihrabapp.com',cv.width/2,wmY);

    // Trim canvas to content
    if(y+80<cv.height){
      const finalH=Math.max(y+80,500);
      const imgData=ctx.getImageData(0,0,cv.width,finalH);
      cv.height=finalH;
      ctx.putImageData(imgData,0,0);
    }

    cv.toBlob(blob=>{
      if(!blob)return;
      const dl=document.createElement('a');dl.href=URL.createObjectURL(blob);dl.download=`Quran_${sname}_${refs}.png`;
      const file=new File([blob],'ayah.png',{type:'image/png'});
      if(navigator.share&&navigator.canShare?.({files:[file]}))navigator.share({files:[file]}).catch(()=>dl.click());
      else dl.click();
    },'image/png');
  };

  const doShare=async()=>{
    if(!selVerse)return;const{text,refs}=await getShareRange();
    if(shareMode==='image'){shareAsImage(text,refs);return;}
    let t=text;if(shareMode==='noharakat')t=t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,'');
    const full=`${t}${SURAHS.find(s=>s.id===selVerse.sn)?.n}: ${refs} https://mihrabapp.com/tafseer`;
    if(navigator.share)navigator.share({text:full}).catch(()=>{});
    else{navigator.clipboard.writeText(full);alert("تم النسخ!");}
    setShowSharePage(false);
  };

  const downloadVerseAudio = async (sn:number, nis:number) => {
    try {
      const rec = getReciter();
      const url = buildUrl(rec, sn, nis);
      const res = await fetch(url);
      if (!res.ok) throw new Error("download_failed");
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `quran-${rec.id}-${pad3(sn)}${pad3(nis)}.mp3`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    } catch {
      alert("تعذر تحميل التلاوة الآن، حاول مرة أخرى");
    }
  };

  // Groups
  const groups:{sn:number;sname:string;ayahs:{nis:number;text:string;gi:number;orig:string}[]}[]=[];
  if(pq.data){let cur:typeof groups[0]|null=null;pq.data.forEach((a:any,i:number)=>{if(!cur||cur.sn!==a.sn){cur={sn:a.sn,sname:a.sname,ayahs:[]};groups.push(cur);}cur.ayahs.push({nis:a.nis,text:a.text,gi:i,orig:a.orig});});}
  const filteredS=search.trim()?SURAHS.filter(s=>s.n.includes(search)||s.id.toString()===search.trim()):SURAHS;
  const playingName=playingSn?SURAHS.find(s=>s.id===playingSn)?.n:"";
  const isMobile=typeof window!=='undefined'&&window.innerWidth<768;

  // ═══ SHARE PAGE ═══
  if(showSharePage&&selVerse){
    const sname=SURAHS.find(s=>s.id===selVerse.sn)?.n||"";
    const maxNis=SURAHS.find(s=>s.id===selVerse.sn)?.c||1;
    const len=shareEndNis-selVerse.nis+1;
    return(
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border" style={{paddingTop:'calc(env(safe-area-inset-top,12px) + 8px)'}}>
          <button onClick={()=>setShowSharePage(false)} className="p-2"><X className="w-5 h-5"/></button>
          <span className="text-sm font-bold">مشاركة الآيات</span>
          <span className="text-sm text-primary font-bold">{sname}: {selVerse.nis}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-5" dir="rtl">
          <div><h3 className="text-sm font-bold mb-2">نوع المشاركة:</h3>
            <div className="space-y-2">{([["image","📷 صورة (حفظ/إرسال)"],["text","📝 نص"],["noharakat","📝 نص بدون تشكيل"]] as const).map(([v,l])=>(
              <button key={v} onClick={()=>setShareMode(v)} className={`w-full flex items-center justify-between p-3 rounded-xl border ${shareMode===v?"border-primary bg-primary/5 font-bold":"border-border"}`}>
                <span className="text-sm">{l}</span>{shareMode===v&&<span className="text-primary text-lg">✓</span>}
              </button>))}</div></div>
          <div><h3 className="text-sm font-bold mb-2">النطاق (أقصى 20 آية)</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3"><span className="text-sm text-muted-foreground w-8">من</span>
                <div className="flex-1 p-3 rounded-xl border border-border text-sm bg-card">{sname}: آية {selVerse.nis}</div></div>
              <div className="flex items-center gap-3"><span className="text-sm text-muted-foreground w-8">إلى</span>
                <select value={shareEndNis} onChange={e=>setShareEndNis(Number(e.target.value))}
                  className="flex-1 p-3 rounded-xl border border-border text-sm bg-card outline-none">
                  {Array.from({length:Math.min(20,maxNis-selVerse.nis+1)}).map((_,i)=>{const n=selVerse.nis+i;return<option key={n} value={n}>آية {n}</option>})}
                </select></div></div></div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="font-quran text-center leading-[2.5]" style={{fontSize:'clamp(16px,4vw,20px)'}}>
              {shareMode==='noharakat'?selVerse.text.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,''):selVerse.text}
            </p><p className="text-center text-xs text-muted-foreground mt-2">— {sname}: {selVerse.nis}</p></div>
        </div>
        <div className="p-4 border-t border-border" style={{paddingBottom:'calc(env(safe-area-inset-bottom,12px) + 8px)'}}>
          <button onClick={doShare} disabled={isSharing} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base">
            {isSharing?<Loader2 className="w-5 h-5 animate-spin mx-auto"/>:shareMode==='image'?`💾 حفظ/مشاركة ${len} آية كصورة`:`📤 مشاركة ${len} آية`}
          </button></div>
      </div>);
  }

  return(
    <div className="select-none overflow-hidden" style={{background:colors.bg,color:colors.text,height:'100dvh'}}>
      {/* ═══ TOP BAR (Unified) ═══ */}
      {showUI&&<div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4" style={{paddingTop:'env(safe-area-inset-top, 20px)',background:colors.bg+'ee',borderBottom:'1px solid '+colors.border+'40',height:55}}>
          <div className="flex items-center gap-2">
            <button onClick={() => window.location.href = "/"} className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><ArrowRight className="w-4 h-4"/></button>
          </div>
          
          {/* Hifz Indicators HUD */}
          {hifz && <div className="flex gap-2 items-center bg-black/5 px-3 py-1 rounded-full scale-90">
            <div className="flex flex-col items-center"><span className={`w-2 h-2 rounded-full transition-all duration-300 ${hifzStatus==='ok'?'bg-green-500 scale-125 shadow-[0_0_8px_rgba(34,197,94,0.6)]':'bg-green-500/20'}`}/><span className="text-[8px] opacity-40 mt-0.5">صحيح</span></div>
            <div className="flex flex-col items-center"><span className={`w-2 h-2 rounded-full transition-all duration-300 ${hifzStatus==='wrong'?'bg-red-500 scale-125 shadow-[0_0_8px_rgba(239,68,68,0.6)]':'bg-red-500/20'}`}/><span className="text-[8px] opacity-40 mt-0.5">خطأ</span></div>
            <div className="flex flex-col items-center"><span className={`w-2 h-2 rounded-full transition-all duration-300 ${hifzStatus==='pron'?'bg-amber-500 scale-125 shadow-[0_0_8px_rgba(245,158,11,0.6)]':'bg-amber-500/20'}`}/><span className="text-[8px] opacity-40 mt-0.5">نطق</span></div>
          </div>}

          <div className="flex items-center gap-1">
            <button onClick={()=>setShowSearch(true)} className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><Search className="w-4 h-4"/></button>
            <button onClick={()=>setShowSettings(!showSettings)} className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><Settings className="w-4 h-4"/></button>
            <button onClick={()=>{setHifz(!hifz);resetHifz();}} className={`p-1.5 rounded-lg ${hifz?'bg-amber-500 text-white shadow-md':'opacity-60 hover:opacity-100'}`} style={hifz?{}:{color:colors.text}}>
              <Mic className="w-4 h-4"/></button>
            <button onClick={()=>setShowUI(false)} className="p-1.5 rounded-lg opacity-50 hover:opacity-100" style={{color:colors.text}}><ChevronLeft className="w-4 h-4" style={{transform:'rotate(90deg)'}}/></button>
          </div>
        </div>}
      {!showUI&&<button onClick={()=>setShowUI(true)} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full flex items-center justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity shadow-sm" style={{background:colors.bg+'ee',color:colors.text,border:'1px solid '+colors.border+'50',paddingTop:'calc(env(safe-area-inset-top,0px) + 4px)',fontSize:'11px',fontWeight:700}}><ChevronLeft className="w-3 h-3" style={{transform:'rotate(-90deg)'}}/> إظهار</button>}

      {/* Fixed Side Nav Arrows — Desktop only */}
      <button
        onClick={()=>{if(pg>1){setPg(p=>p-1);resetHifz();window.scrollTo(0,0);}}}
        disabled={pg<=1}
        className="hidden md:flex fixed right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 disabled:opacity-20"
        style={{background:colors.bg+'f0',color:colors.text,border:'1.5px solid '+colors.border+'60',backdropFilter:'blur(8px)'}}
        title="الصفحة السابقة">
        <ChevronRight className="w-5 h-5"/>
      </button>
      <button
        onClick={()=>{if(pg<604){setPg(p=>p+1);resetHifz();window.scrollTo(0,0);}}}
        disabled={pg>=604}
        className="hidden md:flex fixed left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 disabled:opacity-20"
        style={{background:colors.bg+'f0',color:colors.text,border:'1.5px solid '+colors.border+'60',backdropFilter:'blur(8px)'}}
        title="الصفحة التالية">
        <ChevronLeft className="w-5 h-5"/>
      </button>


      {/* SETTINGS */}
      {showSettings&&<div className="fixed inset-0 z-[58] flex items-end" onClick={()=>setShowSettings(false)}>
        <div className="w-full bg-card rounded-t-2xl p-4 border-t border-border shadow-2xl" onClick={e=>e.stopPropagation()}>
          <h3 className="text-sm font-bold mb-3 text-center text-foreground">لون صفحة القرآن</h3>
          <div className="flex justify-center gap-3">
            {Object.entries(QBG).map(([k,v])=>(
              <button key={k} onClick={()=>{setQTheme(k);setShowSettings(false);}}
                className={`w-14 h-14 rounded-xl border-2 ${qTheme===k?'border-primary shadow-lg':'border-transparent'}`}
                style={{background:v.bg}}/>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-4" dir="rtl">
            <h4 className="text-sm font-bold mb-1 text-foreground">تحميل المصحف للقراءة بدون إنترنت</h4>
            <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
              قم بتحميل جميع صفحات المصحف الشريف الـ 604 إلى ذاكرة المتصفح لتتمكن من قراءتها وتصفحها كاملةً بدون اتصال بالإنترنت في أي وقت.
            </p>
            {downloading ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-primary">
                  <span>جاري تحميل صفحات المصحف...</span>
                  <span>{Math.round((downloadProgress / 604) * 100)}%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-150" style={{width: `${(downloadProgress / 604) * 100}%`}} />
                </div>
                <span className="text-[10px] text-muted-foreground block text-left">صفحة {downloadProgress} من 604</span>
              </div>
            ) : downloadSuccess ? (
              <div className="p-2.5 bg-green-500/10 text-green-600 rounded-xl text-xs font-bold text-center border border-green-500/25">
                ✓ تم تحميل المصحف كاملاً بنجاح! جاهز للقراءة دون إنترنت.
              </div>
            ) : (
              <button onClick={startQuranDownload} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity">
                تحميل المصحف كاملاً (1.5 ميجابايت)
              </button>
            )}
          </div>
        </div>
      </div>}

      {/* SEARCH */}
      {showSearch&&<div className="fixed inset-0 z-[60] bg-black/50" onClick={()=>setShowSearch(false)}>
        <div className="bg-card h-full w-full max-w-sm ml-auto flex flex-col" onClick={e=>e.stopPropagation()}>
          <div className="bg-primary p-3 shrink-0" style={{paddingTop:'env(safe-area-inset-top, 25px)'}}><div className="relative">
            <Input ref={searchRef} placeholder="ابحث باسم السورة أو نص آية..." value={search} onChange={e=>handleSearch(e.target.value)}
              className="text-right pl-10 h-10 rounded-xl bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/40" dir="rtl"/>
            <button onClick={()=>setShowSearch(false)} className="absolute left-3 top-2.5"><X className="w-5 h-5 text-white/60"/></button>
          </div></div>
          <div className="flex-1 overflow-y-auto p-2">
            {isSearchingAyahs?<div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary"/></div>:
            ayahSearchResults.length>0?ayahSearchResults.map((m,i)=><button key={i} onClick={()=>goSurah(m.surah.number)}
              className="w-full text-right p-3 rounded-lg hover:bg-muted border-b border-border/50" dir="rtl">
              <div className="flex justify-between mb-1"><span className="text-xs font-bold text-primary">{m.surah.name}</span><span className="text-[10px] text-muted-foreground">آية {m.numberInSurah}</span></div>
              <p className="text-sm font-quran leading-loose">{m.text}</p>
            </button>):
            filteredS.map(s=><button key={s.id} onClick={()=>goSurah(s.id)} className="w-full text-right p-3 rounded-lg hover:bg-muted flex items-center gap-3">
              <span className="w-7 h-7 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{s.id}</span>
              <span className="font-bold text-sm flex-1">{s.n}</span><span className="text-[11px] text-muted-foreground">{s.c} آية</span>
            </button>)}
          </div>
        </div>
      </div>}

      {/* VERSE OPTIONS */}
      {showOptions&&selVerse&&<div className="fixed inset-0 z-[55] flex items-end" onClick={()=>setShowOptions(false)}>
        <div className="w-full bg-card rounded-t-2xl shadow-2xl border-t border-border max-h-[55vh] overflow-y-auto" style={{paddingBottom:'env(safe-area-inset-bottom,8px)'}} onClick={e=>e.stopPropagation()}>
          <div className="sticky top-0 bg-card pt-3 px-4 pb-2 border-b border-border flex items-center justify-between z-10">
            <button onClick={()=>setShowOptions(false)} className="bg-muted p-1.5 rounded-full"><X className="w-4 h-4"/></button>
            <span className="text-sm font-bold">{SURAHS.find(s=>s.id===selVerse.sn)?.n}: {selVerse.nis}</span><span className="w-7"/>
          </div>
          <div className="p-3 space-y-3" dir="rtl">
            <div><h3 className="text-xs font-bold mb-1.5 opacity-60">القارئ</h3>
              <select value={recId} onChange={e=>handleReciterChange(e.target.value)} className="w-full h-10 rounded-xl border border-border bg-muted/50 text-sm px-3 mb-2 outline-none">
                {RECITERS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
              <div className="flex gap-2">
                <button onClick={()=>{playSurahFrom(selVerse.sn,selVerse.nis);setShowOptions(false);}} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-1"><Play className="w-4 h-4"/>من هنا</button>
                <button onClick={()=>{playQueueRef.current=null;playVerse(selVerse.sn,selVerse.nis);setShowOptions(false);}} className="flex-1 py-2.5 rounded-xl bg-muted text-sm font-bold flex items-center justify-center gap-1"><Play className="w-4 h-4"/>الآية</button>
                <button onClick={()=>{toggleBookmark(`${selVerse.sn}-${selVerse.nis}`);setShowOptions(false);}} className="flex-1 py-2.5 rounded-xl bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-sm font-bold flex items-center justify-center gap-1"><BookOpen className="w-4 h-4"/>{bookmarks.has(`${selVerse.sn}-${selVerse.nis}`)?"إزالة الحفظ":"حفظ العلامة"}</button>
              </div></div>
            <button onClick={()=>downloadVerseAudio(selVerse.sn, selVerse.nis)} className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold flex items-center justify-center gap-1"><Volume2 className="w-4 h-4"/>Download verse recitation</button>
            <button onClick={()=>{setShowOptions(false);setShowTafseer(true);setTafseerText('');setTafseerLoading(true);(() => {
              const src = TAFSEER_SOURCES.find(s=>s.id===tafseerSource);
              if(src?.api==='tafseer'){
                fetch(`https://api.quran-tafseer.com/tafseer/${src.id}/${selVerse.sn}/${selVerse.nis}`).then(r=>r.json()).then(d=>{setTafseerText(d.text||'لا يوجد تفسير');setTafseerLoading(false);}).catch(()=>{setTafseerText('فشل في تحميل التفسير');setTafseerLoading(false);});
              } else {
                fetch(`https://api.alquran.cloud/v1/ayah/${selVerse.sn}:${selVerse.nis}/${tafseerSource}`).then(r=>r.json()).then(d=>{setTafseerText(d.data?.text||'لا يوجد تفسير');setTafseerLoading(false);}).catch(()=>{setTafseerText('فشل في تحميل التفسير');setTafseerLoading(false);});
              }
            })();}} className="w-full py-2.5 rounded-xl bg-muted text-sm font-bold flex items-center justify-center gap-1"><BookOpen className="w-4 h-4 text-primary"/>التفسير</button>
            <button onClick={()=>{setShowOptions(false);setShowSharePage(true);}} className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-bold flex items-center justify-center gap-1"><Share2 className="w-4 h-4"/>مشاركة / حفظ كصورة</button>
          </div>
        </div>
      </div>}

      {/* TAFSEER MODAL */}
      {showTafseer&&selVerse&&<div className="fixed inset-0 z-[62] flex flex-col" style={{background:colors.bg}}>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{borderColor:colors.border+'40',paddingTop:'calc(env(safe-area-inset-top,12px) + 8px)'}}>
          <button onClick={()=>setShowTafseer(false)} className="p-2"><X className="w-5 h-5"/></button>
          <span className="text-sm font-bold" style={{color:colors.text}}>{SURAHS.find(s=>s.id===selVerse.sn)?.n}: {selVerse.nis}</span>
          <span className="w-9"/>
        </div>
        <div className="px-4 py-3 border-b" style={{borderColor:colors.border+'40'}} dir="rtl">
          <select value={tafseerSource} onChange={e=>{setTafseerSource(e.target.value);setTafseerLoading(true);setTafseerText('');            (() => {
              const src = TAFSEER_SOURCES.find(s=>s.id===e.target.value);
              if(src?.api==='tafseer'){
                fetch(`https://api.quran-tafseer.com/tafseer/${src.id}/${selVerse.sn}/${selVerse.nis}`).then(r=>r.json()).then(d=>{setTafseerText(d.text||'لا يوجد تفسير');setTafseerLoading(false);}).catch(()=>{setTafseerText('فشل');setTafseerLoading(false);});
              } else {
                fetch(`https://api.alquran.cloud/v1/ayah/${selVerse.sn}:${selVerse.nis}/${e.target.value}`).then(r=>r.json()).then(d=>{setTafseerText(d.data?.text||'لا يوجد تفسير');setTafseerLoading(false);}).catch(()=>{setTafseerText('فشل');setTafseerLoading(false);});
              }
            })();          }} className="w-full h-10 rounded-xl border px-3 text-sm outline-none" style={{borderColor:colors.border,background:colors.bg,color:colors.text}}>
            {TAFSEER_SOURCES.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="flex-1 overflow-y-auto p-5" dir="rtl">
          <div className="p-5 rounded-xl mb-5" style={{background:colors.border+'15',border:'1px solid '+colors.border+'30'}}>
            <p className="font-quran text-center leading-[2.2]" style={{fontSize:'clamp(22px,6vw,28px)',color:colors.text}}>{selVerse.text}</p>
          </div>
          {tafseerLoading?<div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" style={{color:colors.text}}/></div>
          :<div className="leading-[2.2] font-medium" style={{fontSize:'clamp(16px,4.5vw,20px)',color:colors.text}}>{tafseerText}</div>}
        </div>
        <div className="p-3 border-t flex gap-2" style={{borderColor:colors.border+'40',paddingBottom:'calc(env(safe-area-inset-bottom,8px) + 4px)'}}>
          <button onClick={()=>{const t=tafseerText;const sn=SURAHS.find(s=>s.id===selVerse.sn)?.n||'';const full=selVerse.text+'\n\n'+t+'\n\n'+sn+': '+selVerse.nis;if(navigator.share)navigator.share({text:full}).catch(()=>{});else{navigator.clipboard.writeText(full);alert("تم النسخ!");}}} className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1" style={{background:colors.border+'30',color:colors.text}}><Share2 className="w-4 h-4"/>مشاركة</button>
        </div>
      </div>}

      {/* HIFZ */}
      {hifz&&showUI&&<div className="fixed left-0 right-0 z-40 px-3 py-1.5" style={{top:'calc(48px + env(safe-area-inset-top,0px))',background:colors.bg,borderBottom:`1px solid ${colors.border}`}}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold">🎤 الحفظ</span>
          {recTxt&&<span className="text-[9px] opacity-60 mr-2 truncate max-w-[150px]">🗣️ {recTxt.split(" ").slice(-4).join(" ")}</span>}
          <div className="flex gap-1">
            <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">✓{Array.from(hifzRes.values()).filter(v=>v==="ok").length}</span>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">✗{Array.from(hifzRes.values()).filter(v=>v==="err").length}</span>
          </div>
        </div>
        {hifzFeedback && (
          <div className="mt-1 px-2 py-1 rounded-lg text-[11px] font-bold text-center animate-pulse"
               style={{
                 background: hifzFeedback.type === 'ok' ? 'rgba(34,197,94,0.2)' : hifzFeedback.type === 'wrong_verse' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                 color: hifzFeedback.type === 'ok' ? '#4ade80' : hifzFeedback.type === 'wrong_verse' ? '#f87171' : '#f59e0b'
               }}>
            {hifzFeedback.msg}
            {hifzFeedback.details&&<span className="block text-[10px] opacity-80 mt-0.5">{hifzFeedback.details.join(' • ')}</span>}
          </div>
        )}
        <div className="flex gap-1.5 mt-1">
          <button onClick={()=>recording?stopHifz():startHifz()} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 ${recording?"bg-red-500 text-white animate-pulse":"bg-amber-500 text-white"}`}>
            {recording?<><MicOff className="w-3 h-3"/>إيقاف</>:<><Mic className="w-3 h-3"/>ابدأ</>}</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:colors.border+'40',color:colors.text}}>كشف</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:colors.border+'40',color:colors.text}}>تخطي</button>
        </div>
      </div>}

      {/* ═══ MAIN PAGE CONTAINER ═══ */}
      {pq.isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-60 mb-4" />
          <p className="text-sm opacity-50" style={{color:colors.text}}>جاري تحميل الصفحة الشريفة...</p>
        </div>
      ) : (
        <div onTouchStart={onTS} onTouchEnd={onTE} className="flex-1 overflow-y-auto w-full h-full" style={{
          paddingTop: showUI ? 'calc(55px + env(safe-area-inset-top, 20px) + (hifz ? 48px : 0px))' : 'env(safe-area-inset-top, 0px)',
          scrollBehavior: 'smooth'
        }}>
          <div className="flex-1 w-full max-w-2xl mx-auto px-4 md:px-8 relative min-h-full">
            <div className={`flex flex-col pt-8 md:pt-16 pb-12 md:pb-20 ${groups.reduce((t,gg)=>t+gg.ayahs.length,0)<15?'justify-center min-h-[70vh]':''}`}>
              {groups.map((g,gi)=>{
                return <div key={`${g.sn}-${gi}`} className="relative w-full">
                  {/* Surah/Juz Header */}
                  <div className="flex justify-between items-center mb-6 px-2 opacity-50 font-bold" dir="rtl" style={{fontSize:'12px',color:colors.text}}>
                    <span>سُورَةُ {g.sname.replace(/^سُورَةُ\s*/,'')}</span>
                    <span>الْجُزْءُ {juzForPage(pg).toLocaleString('ar-EG')}</span>
                  </div>                  {/* Modern Minimalist Surah Header (Ayah App style) */}
                  {g.ayahs[0].nis===1&&<div className="text-center my-6 flex justify-center w-full">
                    {/* ═══ Premium Islamic Cartouche — Unified Surah Header ═══ */}
                    <div className="relative w-full max-w-[450px] mx-auto">
                      <svg viewBox="0 0 450 100" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMid meet" style={{overflow:'visible'}}>
                        <defs>
                          {/* Gold gradient fills */}
                          <linearGradient id={`gold-h-${g.sn}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.1"/>
                            <stop offset="25%" stopColor="#d4af37" stopOpacity="0.35"/>
                            <stop offset="50%" stopColor="#f0d878" stopOpacity="0.45"/>
                            <stop offset="75%" stopColor="#d4af37" stopOpacity="0.35"/>
                            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.1"/>
                          </linearGradient>
                          <linearGradient id={`gold-stroke-${g.sn}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#b8942e" stopOpacity="0.3"/>
                            <stop offset="20%" stopColor="#d4af37" stopOpacity="0.85"/>
                            <stop offset="50%" stopColor="#f0d878" stopOpacity="1"/>
                            <stop offset="80%" stopColor="#d4af37" stopOpacity="0.85"/>
                            <stop offset="100%" stopColor="#b8942e" stopOpacity="0.3"/>
                          </linearGradient>
                          <linearGradient id={`gold-v-${g.sn}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.9"/>
                            <stop offset="50%" stopColor="#f0d878" stopOpacity="1"/>
                            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.9"/>
                          </linearGradient>
                          <radialGradient id={`gold-glow-${g.sn}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#f0d878" stopOpacity="0.12"/>
                            <stop offset="100%" stopColor="#d4af37" stopOpacity="0"/>
                          </radialGradient>
                        </defs>

                        {/* Subtle inner glow */}
                        <ellipse cx="225" cy="50" rx="180" ry="35" fill={`url(#gold-glow-${g.sn})`}/>

                        {/* ── Main Cartouche Frame (Mosque arch / pointed-end shape) ── */}
                        <path d={`M 60,16 L 170,16 Q 180,16 185,10 L 195,4 Q 200,1 205,1 L 245,1 Q 250,1 255,4 L 265,10 Q 270,16 280,16 L 390,16
                          Q 405,16 415,22 Q 425,28 425,40 L 425,60
                          Q 425,72 415,78 Q 405,84 390,84 L 280,84 Q 270,84 265,90 L 255,96 Q 250,99 245,99 L 205,99 Q 200,99 195,96 L 185,90 Q 180,84 170,84 L 60,84
                          Q 45,84 35,78 Q 25,72 25,60 L 25,40
                          Q 25,28 35,22 Q 45,16 60,16 Z`}
                          fill={`url(#gold-h-${g.sn})`}
                          stroke={`url(#gold-stroke-${g.sn})`}
                          strokeWidth="1.5"
                        />
                        {/* Inner border trace */}
                        <path d={`M 64,21 L 172,21 Q 181,21 186,15.5 L 196,9.5 Q 200,7 205,7 L 245,7 Q 250,7 254,9.5 L 264,15.5 Q 269,21 278,21 L 386,21
                          Q 399,21 408,26 Q 417,31 419,42 L 419,58
                          Q 417,69 408,74 Q 399,79 386,79 L 278,79 Q 269,79 264,84.5 L 254,90.5 Q 250,93 245,93 L 205,93 Q 200,93 196,90.5 L 186,84.5 Q 181,79 172,79 L 64,79
                          Q 51,79 42,74 Q 33,69 31,58 L 31,42
                          Q 33,31 42,26 Q 51,21 64,21 Z`}
                          fill="none"
                          stroke={`url(#gold-stroke-${g.sn})`}
                          strokeWidth="0.6"
                          opacity="0.5"
                        />

                        {/* ── Decorative corner arabesque flourishes ── */}
                        {/* Top-left corner */}
                        <g opacity="0.7">
                          <path d="M 38,28 Q 32,34 38,40 Q 44,34 38,28 Z" fill={`url(#gold-v-${g.sn})`} opacity="0.6"/>
                          <circle cx="38" cy="34" r="1.5" fill="#d4af37" opacity="0.8"/>
                          <path d="M 30,34 Q 38,26 46,34" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4"/>
                        </g>
                        {/* Top-right corner */}
                        <g opacity="0.7">
                          <path d="M 412,28 Q 406,34 412,40 Q 418,34 412,28 Z" fill={`url(#gold-v-${g.sn})`} opacity="0.6"/>
                          <circle cx="412" cy="34" r="1.5" fill="#d4af37" opacity="0.8"/>
                          <path d="M 404,34 Q 412,26 420,34" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4"/>
                        </g>
                        {/* Bottom-left corner */}
                        <g opacity="0.7">
                          <path d="M 38,60 Q 32,66 38,72 Q 44,66 38,60 Z" fill={`url(#gold-v-${g.sn})`} opacity="0.6"/>
                          <circle cx="38" cy="66" r="1.5" fill="#d4af37" opacity="0.8"/>
                          <path d="M 30,66 Q 38,74 46,66" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4"/>
                        </g>
                        {/* Bottom-right corner */}
                        <g opacity="0.7">
                          <path d="M 412,60 Q 406,66 412,72 Q 418,66 412,60 Z" fill={`url(#gold-v-${g.sn})`} opacity="0.6"/>
                          <circle cx="412" cy="66" r="1.5" fill="#d4af37" opacity="0.8"/>
                          <path d="M 404,66 Q 412,74 420,66" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4"/>
                        </g>

                        {/* ── Side ornamental diamonds ── */}
                        <polygon points="25,50 30,44 35,50 30,56" fill="#d4af37" opacity="0.55"/>
                        <polygon points="425,50 420,44 415,50 420,56" fill="#d4af37" opacity="0.55"/>

                        {/* ── Top & Bottom center pointed arch ornaments ── */}
                        {/* Top center */}
                        <path d="M 215,3 L 220,0 L 225,3 L 230,0 L 235,3" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6"/>
                        {/* Bottom center */}
                        <path d="M 215,97 L 220,100 L 225,97 L 230,100 L 235,97" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6"/>

                        {/* ── Interlocking arch pattern along top edge ── */}
                        <g opacity="0.3">
                          <path d="M 80,21 Q 90,14 100,21" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 100,21 Q 110,14 120,21" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 120,21 Q 130,14 140,21" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 140,21 Q 150,14 160,21" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 290,21 Q 300,14 310,21" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 310,21 Q 320,14 330,21" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 330,21 Q 340,14 350,21" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 350,21 Q 360,14 370,21" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                        </g>

                        {/* ── Interlocking arch pattern along bottom edge ── */}
                        <g opacity="0.3">
                          <path d="M 80,79 Q 90,86 100,79" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 100,79 Q 110,86 120,79" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 120,79 Q 130,86 140,79" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 140,79 Q 150,86 160,79" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 290,79 Q 300,86 310,79" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 310,79 Q 320,86 330,79" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 330,79 Q 340,86 350,79" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                          <path d="M 350,79 Q 360,86 370,79" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                        </g>

                        {/* ── Decorative horizontal lines extending from cartouche ── */}
                        <line x1="8" y1="50" x2="24" y2="50" stroke="#d4af37" strokeWidth="0.8" opacity="0.4"/>
                        <line x1="426" y1="50" x2="442" y2="50" stroke="#d4af37" strokeWidth="0.8" opacity="0.4"/>
                        {/* Small end dots */}
                        <circle cx="7" cy="50" r="1.5" fill="#d4af37" opacity="0.5"/>
                        <circle cx="443" cy="50" r="1.5" fill="#d4af37" opacity="0.5"/>

                        {/* ── Inner side floral accents ── */}
                        <g opacity="0.35">
                          <path d="M 55,42 Q 50,50 55,58" fill="none" stroke="#d4af37" strokeWidth="0.6"/>
                          <path d="M 52,45 Q 48,50 52,55" fill="none" stroke="#d4af37" strokeWidth="0.6"/>
                          <path d="M 395,42 Q 400,50 395,58" fill="none" stroke="#d4af37" strokeWidth="0.6"/>
                          <path d="M 398,45 Q 402,50 398,55" fill="none" stroke="#d4af37" strokeWidth="0.6"/>
                        </g>
                      </svg>

                      {/* ── Surah Name Overlay (HTML for proper Arabic rendering) ── */}
                      <div className="absolute inset-0 flex items-center justify-center" style={{paddingBottom:'1px'}}>
                        <span className="font-quran text-2xl md:text-3xl font-bold tracking-wide" style={{color: colors.text, textShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
                          {g.sname.replace(/^سُورَةُ\s*/,'')}
                        </span>
                      </div>
                    </div>
                  </div>}
                  
                  {/* Basmala */}
                  {g.ayahs[0].nis===1&&g.sn!==9&&<div className="text-center my-3" dir="rtl">
                      <span onClick={()=>{if(!hifz){setSelVerse({sn:g.sn,nis:1,text:g.ayahs[0].orig});setShowOptions(true);}}}
                      className="font-quran transition-all duration-200 rounded cursor-pointer block" 
                      style={{
                        fontSize: isMobile ? 'clamp(17px, 4.8vw, 23px)' : 'clamp(19px, min(4.5vh, 5vw), 25px)',
                        fontWeight: 'normal',
                        color: (playingKey===`${g.sn}-1` && g.sn===1) ? '#16a34a' : colors.text,
                        background: (playingKey===`${g.sn}-1` && g.sn===1) ? colors.hi : 'transparent',
                        padding: (playingKey===`${g.sn}-1` && g.sn===1) ? '4px 12px' : '0',
                        lineHeight: '2'
                      }}>
                      بِسْمِ ٱللَّهِ ٱلرَّحْمَنِ ٱلرَّحِيمِ 
                      {g.sn===1 && (
                        <span className="inline-flex items-center justify-center mx-1.5 relative" data-v="1"
                          style={{
                            width: '2.2em',
                            height: '2.2em',
                            verticalAlign: 'middle'
                          }}>
                          {/* Ornate Circle Ayah Number — Premium style */}
                          <svg className="absolute inset-0 w-full h-full text-amber-600/60 dark:text-amber-500/50 transition-colors" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Outer dashed circle */}
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2,2" />
                            {/* Main ornate circle */}
                            <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.04" />
                            {/* Inner accent circle */}
                            <circle cx="16" cy="16" r="8.5" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5,1.5" />
                            {/* 4 small decorative dots at cardinal points */}
                            <circle cx="16" cy="3.5" r="1" fill="currentColor" opacity="0.5" />
                            <circle cx="16" cy="28.5" r="1" fill="currentColor" opacity="0.5" />
                            <circle cx="3.5" cy="16" r="1" fill="currentColor" opacity="0.5" />
                            <circle cx="28.5" cy="16" r="1" fill="currentColor" opacity="0.5" />
                          </svg>
                          <span className="relative z-10 font-bold" style={{
                            fontSize: '0.45em',
                            color: (playingKey===`${g.sn}-1` && g.sn===1) ? '#16a34a' : colors.text,
                            fontFamily: 'Tajawal, sans-serif',
                            lineHeight: '1',
                            paddingTop: '1px'
                          }}>
                            ١
                          </span>
                        </span>
                      )}
                    </span>
                  </div>}
                  
                  {/* Ayahs Grid — consistent font scaled to fit viewport height */}
                  <div className="text-justify font-quran select-text animate-fade-in" dir="rtl" style={{
                    fontSize: isMobile ? 'clamp(18px, 5.2vw, 25px)' : 'clamp(20px, min(4.8vh, 5.2vw), 28px)',
                    lineHeight: isMobile ? '2.15' : '2.55',
                    fontWeight: 'normal',
                    letterSpacing: '0.01em',
                    color: colors.text,
                    wordSpacing: isMobile ? '0.04em' : '0.12em',
                    textAlignLast: 'center',
                    direction: 'rtl',
                    textAlign: 'justify',
                    padding: '0 12px'
                  }}>
                    {g.ayahs.map(a=>{
                      if(a.nis===1 && g.sn===1) return null;
                      const k=`${g.sn}-${a.nis}`;const hr=hifzRes.get(k);const hidden=hifz&&!hr&&a.gi>=hifzIdx;const cur=hifz&&a.gi===hifzIdx;
                      const isP=playingKey===k;const isSel=selVerse?.sn===g.sn&&selVerse?.nis===a.nis;
 
                      if(cur){
                         const words = a.text.split(" ");
                         return <span key={k} className="inline" data-v="1" id={`verse-${g.sn}-${a.nis}`} 
                            style={{background:'rgba(245,158,11,0.12)',padding:'4px 10px',borderRadius:'10px'}}>
                            {words.map((w:string, wi:number)=>{
                               const ml = wi < wordMatchLevels.length ? wordMatchLevels[wi] : 0;
                               const nextIdx = wordMatchLevels.findIndex(x => x === 0 || x === 3);
                               const isNext = (ml === 0 || ml === 3) && (nextIdx === -1 ? wi === 0 : wi === nextIdx);
                               let clr = 'transparent';
                               if (ml === 1) clr = colors.text;
                               else if (ml === 2) clr = '#f59e0b';
                               else if (ml === 3) clr = '#ef4444';
                               return <span key={wi} style={{
                                 color: ml > 0 ? clr : 'transparent',
                                 borderBottom: ml === 0 && isNext ? '2px solid #22c55e' : ml === 3 ? '2px dashed #ef4444' : 'none',
                                 transition: 'all 0.3s',
                                 marginRight: '2px',
                                 opacity: ml > 0 ? 1 : (isNext ? 0.5 : 0)
                                }}>{w} </span>
                            })}
                            <span className="inline-flex items-center justify-center mx-1 opacity-50 relative" data-v="1"
                                style={{width:'2em',height:'2em', verticalAlign:'middle'}}>
                                <svg className="absolute inset-0 w-full h-full text-amber-600/60 dark:text-amber-500/50 transition-colors" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2,2" />
                                  <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.04" />
                                  <circle cx="16" cy="16" r="8.5" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5,1.5" />
                                  <circle cx="16" cy="3.5" r="1" fill="currentColor" opacity="0.5" />
                                  <circle cx="16" cy="28.5" r="1" fill="currentColor" opacity="0.5" />
                                  <circle cx="3.5" cy="16" r="1" fill="currentColor" opacity="0.5" />
                                  <circle cx="28.5" cy="16" r="1" fill="currentColor" opacity="0.5" />
                                </svg>
                                <span className="relative z-10 font-bold" style={{
                                  fontSize: '0.45em',
                                  color: colors.text,
                                  fontFamily: 'Tajawal, sans-serif',
                                  lineHeight: '1',
                                  paddingTop: '1px'
                                }}>
                                  ؟
                                </span>
                            </span>
                         </span>;
                      }
 
                      return<span key={k} className="inline" data-v="1" id={`verse-${g.sn}-${a.nis}`}>
                        <span onClick={e=>{e.stopPropagation();if(!hifz){setSelVerse({sn:g.sn,nis:a.nis,text:a.orig});setShowOptions(true);}}}
                          className="transition-all duration-300 rounded cursor-pointer"
                          style={{
                            color:isP?'#16a34a':hr==='err'?'#f87171':colors.text,
                            opacity:hidden?0.08:1,
                            filter:hidden?'blur(3.5px)':'none',
                            userSelect:hidden?'none':'auto',
                            pointerEvents:hidden?'none':'auto',
                            background:isP?colors.hi:isSel?colors.hi:cur?'rgba(245,158,11,0.12)':'transparent',
                            padding:(isP||isSel)?'2px 8px':'0',borderRadius:(isP||isSel)?'8px':'0',
                            WebkitBoxDecorationBreak:'clone',boxDecorationBreak:'clone'
                          }}>
                          {a.text}
                        </span>
                        <span className="inline-flex items-center justify-center mx-1 relative" data-v="1"
                          style={{
                            width: '2em',
                            height: '2em',
                            opacity: hidden ? 0 : 1,
                            verticalAlign: 'middle'
                          }}>
                          <svg className="absolute inset-0 w-full h-full transition-colors" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style={{color: isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : undefined}}>
                            {/* Outer dashed ring */}
                            <circle cx="16" cy="16" r="14" stroke={isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : 'currentColor'} strokeWidth="0.6" strokeDasharray="2,2" className={isP || bookmarks.has(k) ? '' : 'text-amber-600/60 dark:text-amber-500/50'} />
                            {/* Main circle */}
                            <circle cx="16" cy="16" r="11" stroke={isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : 'currentColor'} strokeWidth="1" fill={isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : 'currentColor'} fillOpacity={isP ? 0.15 : bookmarks.has(k) ? 0.1 : 0.04} className={isP || bookmarks.has(k) ? '' : 'text-amber-600/60 dark:text-amber-500/50'} />
                            {/* Inner dashed circle */}
                            <circle cx="16" cy="16" r="8.5" stroke={isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : 'currentColor'} strokeWidth="0.5" strokeDasharray="1.5,1.5" className={isP || bookmarks.has(k) ? '' : 'text-amber-600/60 dark:text-amber-500/50'} />
                            {/* Cardinal dots */}
                            <circle cx="16" cy="3.5" r="1" fill={isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : 'currentColor'} opacity="0.6" className={isP || bookmarks.has(k) ? '' : 'text-amber-600/60 dark:text-amber-500/50'} />
                            <circle cx="16" cy="28.5" r="1" fill={isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : 'currentColor'} opacity="0.6" className={isP || bookmarks.has(k) ? '' : 'text-amber-600/60 dark:text-amber-500/50'} />
                            <circle cx="3.5" cy="16" r="1" fill={isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : 'currentColor'} opacity="0.6" className={isP || bookmarks.has(k) ? '' : 'text-amber-600/60 dark:text-amber-500/50'} />
                            <circle cx="28.5" cy="16" r="1" fill={isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : 'currentColor'} opacity="0.6" className={isP || bookmarks.has(k) ? '' : 'text-amber-600/60 dark:text-amber-500/50'} />
                          </svg>
                          <span className="relative z-10 font-bold" style={{
                            fontSize: '0.45em',
                            color: isP ? '#16a34a' : bookmarks.has(k) ? '#ec4899' : colors.text,
                            fontFamily: 'Tajawal, sans-serif',
                            lineHeight: '1',
                            paddingTop: '1px'
                          }}>
                            {hidden ? '' : a.nis.toLocaleString('ar-EG')}
                          </span>
                        </span>
                        {SAJDA_VERSES.has(`${g.sn}:${a.nis}`)&&<span style={{color:isP?'#16a34a':'#c8a96e',fontSize:'0.8em',verticalAlign:'super',marginRight:2}} data-v="1">۩</span>}
                      </span>;
                    })}
                  </div>
                </div>
              })}
            </div>
            
            {/* Page Footer with Navigation */}
            <div className="mt-6 mb-12 flex flex-col items-center gap-8">
                <div className="flex justify-center items-center opacity-80">
                    <div className="relative flex items-center justify-center" style={{width:'50px', height:'50px'}}>
                      {/* Modern Minimalist Page Number Rub el Hizb Badge */}
                      {/* Premium Ornate Page Number Circle */}
                      <svg className="absolute inset-0 w-full h-full text-amber-600/60 dark:text-amber-500/50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Outermost dashed ring */}
                        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.5" />
                        {/* Main circle */}
                        <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" />
                        {/* Inner decorative circle */}
                        <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.6" />
                        {/* 4 decorative petal ornaments */}
                        <ellipse cx="50" cy="7" rx="3" ry="5" fill="currentColor" opacity="0.5" />
                        <ellipse cx="50" cy="93" rx="3" ry="5" fill="currentColor" opacity="0.5" />
                        <ellipse cx="7" cy="50" rx="5" ry="3" fill="currentColor" opacity="0.5" />
                        <ellipse cx="93" cy="50" rx="5" ry="3" fill="currentColor" opacity="0.5" />
                        {/* Diagonal ornament dots */}
                        <circle cx="22" cy="22" r="2" fill="currentColor" opacity="0.35" />
                        <circle cx="78" cy="22" r="2" fill="currentColor" opacity="0.35" />
                        <circle cx="22" cy="78" r="2" fill="currentColor" opacity="0.35" />
                        <circle cx="78" cy="78" r="2" fill="currentColor" opacity="0.35" />
                      </svg>
                      <span className="text-sm font-bold relative z-10 pt-1" style={{color:colors.text, fontFamily:'Tajawal, sans-serif'}}>{pg.toLocaleString('ar-EG')}</span>
                    </div>
                </div>
                {/* Desktop Navigation Buttons — highly visible */}
                <div className="hidden md:flex items-center gap-6 mt-4">
                    <button onClick={()=>{if(pg<604){setPg(p=>p+1);resetHifz();window.scrollTo(0,0);}}}
                        disabled={pg>=604}
                        className="flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-30 shadow-md bg-primary text-primary-foreground">
                        <ChevronRight className="w-5 h-5"/>
                        الصفحة التالية
                    </button>
                    <div className="flex flex-col items-center px-4">
                      <span className="text-lg font-bold" style={{color:colors.text}}>{pg} / 604</span>
                      <span className="text-xs opacity-40 mt-1" style={{color:colors.text}}>تصفح عبر الأسهم</span>
                    </div>
                    <button onClick={()=>{if(pg>1){setPg(p=>p-1);resetHifz();window.scrollTo(0,0);}}}
                        disabled={pg<=1}
                        className="flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-30 shadow-md bg-primary text-primary-foreground">
                        الصفحة السابقة
                        <ChevronLeft className="w-5 h-5"/>
                    </button>
                </div>
                <p className="md:hidden text-xs opacity-40 font-bold" style={{color:colors.text}}>اسحب للتنقل بين الصفحات</p>
            </div>
        </div>
      </div>
    )}

      {/* ═══ BOTTOM PLAYER ═══ */}
      {playingSn>0&&<div className="fixed left-0 right-0 bottom-0 z-50 bg-card/90 backdrop-blur-md border-t border-border shadow-[0_-4px_25px_rgba(0,0,0,0.15)]" style={{paddingBottom:'env(safe-area-inset-bottom,6px)'}}>
        <div className="w-full px-6 mb-1 mt-1">
          <input id="scrubBar" type="range" defaultValue="0" min="0" max="100" className="w-full h-1 bg-emerald-500/10 accent-emerald-500 rounded-full appearance-none cursor-pointer"
            onChange={(e) => {
              const a = getActiveAudio();
              if (a && a.duration && isFinite(a.duration)) {
                a.currentTime = (Number(e.target.value) / 100) * a.duration;
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between px-5 pt-1 pb-1 flex-row-reverse">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] text-muted-foreground">{playingName} |</span>
            <select value={recId} onChange={e=>handleReciterChange(e.target.value)} className="bg-transparent text-foreground text-[12px] font-bold border-0 outline-none max-w-[120px] truncate">
              {RECITERS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={skipPrev} className="p-1.5 text-muted-foreground hover:text-foreground"><SkipForward className="w-5 h-5"/></button>
            <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform active:scale-90">
              {isPlaying?<Pause className="w-5 h-5"/>:<Play className="w-5 h-5 ml-1"/>}</button>
            <button onClick={skipNext} className="p-1.5 text-muted-foreground hover:text-foreground"><SkipBack className="w-5 h-5"/></button>
            <button onClick={stopAudio} className="p-1.5"><Square className="w-4 h-4 text-red-500 opacity-60 hover:opacity-100"/></button>
          </div>
        </div>
      </div>}
    </div>
  );
}




