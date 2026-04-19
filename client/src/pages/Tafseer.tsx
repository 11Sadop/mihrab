import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, X, Play, Pause, SkipForward, SkipBack, Mic, MicOff, ChevronLeft, ChevronRight, BookOpen, Share2, Square, Settings, ArrowRight, Volume2 } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

interface Rec{id:string;name:string;server:string;ev?:string;}
const RECITERS:Rec[]=[
  {id:"maher",name:"ماهر المعيقلي",server:"https://server12.mp3quran.net/maher",ev:"Maher_AlMuaiqly_128kbps"},
  {id:"afasy",name:"مشاري العفاسي",server:"https://server8.mp3quran.net/afs",ev:"Alafasy_128kbps"},
  {id:"sudais",name:"عبدالرحمن السديس",server:"https://server11.mp3quran.net/sds",ev:"Abdurrahmaan_As-Sudais_192kbps"},
  {id:"hosary",name:"محمود خليل الحصري",server:"https://server13.mp3quran.net/husr",ev:"Husary_128kbps"},
  {id:"minshawi",name:"محمد صديق المنشاوي",server:"https://server10.mp3quran.net/minsh",ev:"Minshawy_Mujawwad_128kbps"},
  {id:"basit",name:"عبدالباسط عبدالصمد",server:"https://server7.mp3quran.net/basit",ev:"AbdulBasit_Mujawwad_128kbps"},
  {id:"ghamdi",name:"سعد الغامدي",server:"https://server7.mp3quran.net/s_gmd",ev:"Sa_ood_ash-Shuraym_128kbps"},
  {id:"ajamy",name:"أحمد العجمي",server:"https://server10.mp3quran.net/ajm",ev:"Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net"},
  {id:"luhaidan",name:"محمد اللحيدان",server:"https://server15.mp3quran.net/lhdan",ev:"Muhammad_Al-Luhaidan_128kbps"},
  {id:"dosari",name:"ياسر الدوسري",server:"https://server10.mp3quran.net/ibrahim_dosri",ev:"Yasser_Ad-Dussary_128kbps"},
]

const SURAHS=[{id:1,n:"الفاتحة",c:7},{id:2,n:"البقرة",c:286},{id:3,n:"آل عمران",c:200},{id:4,n:"النساء",c:176},{id:5,n:"المائدة",c:120},{id:6,n:"الأنعام",c:165},{id:7,n:"الأعراف",c:206},{id:8,n:"الأنفال",c:75},{id:9,n:"التوبة",c:129},{id:10,n:"يونس",c:109},{id:11,n:"هود",c:123},{id:12,n:"يوسف",c:111},{id:13,n:"الرعد",c:43},{id:14,n:"إبراهيم",c:52},{id:15,n:"الحجر",c:99},{id:16,n:"النحل",c:128},{id:17,n:"الإسراء",c:111},{id:18,n:"الكهف",c:110},{id:19,n:"مريم",c:98},{id:20,n:"طه",c:135},{id:21,n:"الأنبياء",c:112},{id:22,n:"الحج",c:78},{id:23,n:"المؤمنون",c:118},{id:24,n:"النور",c:64},{id:25,n:"الفرقان",c:77},{id:26,n:"الشعراء",c:227},{id:27,n:"النمل",c:93},{id:28,n:"القصص",c:88},{id:29,n:"العنكبوت",c:69},{id:30,n:"الروم",c:60},{id:31,n:"لقمان",c:34},{id:32,n:"السجدة",c:30},{id:33,n:"الأحزاب",c:73},{id:34,n:"سبأ",c:54},{id:35,n:"فاطر",c:45},{id:36,n:"يس",c:83},{id:37,n:"الصافات",c:182},{id:38,n:"ص",c:88},{id:39,n:"الزمر",c:75},{id:40,n:"غافر",c:85},{id:41,n:"فصلت",c:54},{id:42,n:"الشورى",c:53},{id:43,n:"الزخرف",c:89},{id:44,n:"الدخان",c:59},{id:45,n:"الجاثية",c:37},{id:46,n:"الأحقاف",c:35},{id:47,n:"محمد",c:38},{id:48,n:"الفتح",c:29},{id:49,n:"الحجرات",c:18},{id:50,n:"ق",c:45},{id:51,n:"الذاريات",c:60},{id:52,n:"الطور",c:49},{id:53,n:"النجم",c:62},{id:54,n:"القمر",c:55},{id:55,n:"الرحمن",c:78},{id:56,n:"الواقعة",c:96},{id:57,n:"الحديد",c:29},{id:58,n:"المجادلة",c:22},{id:59,n:"الحشر",c:24},{id:60,n:"الممتحنة",c:13},{id:61,n:"الصف",c:14},{id:62,n:"الجمعة",c:11},{id:63,n:"المنافقون",c:11},{id:64,n:"التغابن",c:18},{id:65,n:"الطلاق",c:12},{id:66,n:"التحريم",c:12},{id:67,n:"الملك",c:30},{id:68,n:"القلم",c:52},{id:69,n:"الحاقة",c:52},{id:70,n:"المعارج",c:44},{id:71,n:"نوح",c:28},{id:72,n:"الجن",c:28},{id:73,n:"المزمل",c:20},{id:74,n:"المدثر",c:56},{id:75,n:"القيامة",c:40},{id:76,n:"الإنسان",c:31},{id:77,n:"المرسلات",c:50},{id:78,n:"النبأ",c:40},{id:79,n:"النازعات",c:46},{id:80,n:"عبس",c:42},{id:81,n:"التكوير",c:29},{id:82,n:"الانفطار",c:19},{id:83,n:"المطففين",c:36},{id:84,n:"الانشقاق",c:25},{id:85,n:"البروج",c:22},{id:86,n:"الطارق",c:17},{id:87,n:"الأعلى",c:19},{id:88,n:"الغاشية",c:26},{id:89,n:"الفجر",c:30},{id:90,n:"البلد",c:20},{id:91,n:"الشمس",c:15},{id:92,n:"الليل",c:21},{id:93,n:"الضحى",c:11},{id:94,n:"الشرح",c:8},{id:95,n:"التين",c:8},{id:96,n:"العلق",c:19},{id:97,n:"القدر",c:5},{id:98,n:"البينة",c:8},{id:99,n:"الزلزلة",c:8},{id:100,n:"العاديات",c:11},{id:101,n:"القارعة",c:11},{id:102,n:"التكاثر",c:8},{id:103,n:"العصر",c:3},{id:104,n:"الهمزة",c:9},{id:105,n:"الفيل",c:5},{id:106,n:"قريش",c:4},{id:107,n:"الماعون",c:7},{id:108,n:"الكوثر",c:3},{id:109,n:"الكافرون",c:6},{id:110,n:"النصر",c:3},{id:111,n:"المسد",c:5},{id:112,n:"الإخلاص",c:4},{id:113,n:"الفلق",c:5},{id:114,n:"الناس",c:6}];

const PS:Record<number,number>={1:1,2:2,3:50,4:77,5:106,6:128,7:151,8:177,9:187,10:208,11:221,12:235,13:249,14:255,15:262,16:267,17:282,18:293,19:305,20:312,21:322,22:332,23:342,24:350,25:359,26:367,27:377,28:385,29:396,30:404,31:411,32:415,33:418,34:428,35:434,36:440,37:446,38:453,39:458,40:467,41:477,42:483,43:489,44:496,45:499,46:502,47:507,48:511,49:515,50:518,51:520,52:523,53:526,54:528,55:531,56:534,57:537,58:542,59:545,60:549,61:551,62:553,63:554,64:556,65:558,66:560,67:562,68:564,69:566,70:568,71:570,72:572,73:574,74:575,75:577,76:578,77:580,78:582,79:583,80:585,81:586,82:587,83:587,84:589,85:590,86:591,87:591,88:592,89:593,90:594,91:595,92:595,93:596,94:596,95:597,96:597,97:598,98:598,99:599,100:599,101:600,102:600,103:601,104:601,105:601,106:602,107:602,108:602,109:603,110:603,111:603,112:604,113:604,114:604};

const JUZ:Record<number,number>={1:1,22:2,42:3,62:4,82:5,102:6,121:7,142:8,162:9,182:10,201:11,222:12,242:13,262:14,282:15,302:16,322:17,342:18,362:19,382:20,402:21,422:22,442:23,462:24,482:25,502:26,522:27,542:28,562:29,582:30};
function juzForPage(p:number){let j=1;for(const pg of Object.keys(JUZ).map(Number).sort((a,b)=>a-b)){if(pg<=p)j=JUZ[pg];else break;}return j;}

// Normalize text - keep ALL marks for display except zero-width spaces
const norm=(t:string)=>t.replace(/\uFEFF/g,'').replace(/[\u06E9۩]/g,'');
// Add space between muqatta'at letters (e.g., الم) for better diacritic display
const spaceMuqattaat=(t:string)=>{
  // Only add spacing for muqatta'at letters (الم, حم, etc.) - preserve all tashkeel
  const base=t.replace(/[\u064B-\u065F\u0653\u0670\u200A\u06DE\u06D6-\u06ED]/g,'').trim();
  if(base.length>=2&&base.length<=5&&/^[المركهيعطسحقنصل]+$/.test(base)){
    return t.replace(/([\u0621-\u064A][\u064B-\u065F\u0653\u0670\u06D6-\u06ED]*)/g,'$1\u200A').trim();
  }
  return t;
};
const strip=(t:string)=>t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u0653]/g,'').replace(/[ٱإأآا]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,' ').trim();
const pad3=(n:number)=>String(n).padStart(3,'0');
function surahForPage(p:number){let s=1;for(const id of Object.keys(PS).map(Number)){if(PS[id]<=p)s=id;else break;}return SURAHS[s-1];}
function pageForVerse(sn:number,nis:number){ return 1; }

// Robust bismillah removal
const BISM_PLAIN='بسم الله الرحمن الرحيم';
function removeBismillah(t:string):string{
  const s=strip(t);
  if(s.startsWith(BISM_PLAIN)){
    // Find where bismillah ends in original text by matching char count
    let plainIdx=0,origIdx=0;
    const plainTarget=BISM_PLAIN.replace(/\s/g,'');
    while(origIdx<t.length&&plainIdx<plainTarget.length){
      const c=t[origIdx];
      // Skip diacritics and special chars
      if(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u0653\u0654\u0655]/.test(c)){origIdx++;continue;}
      const nc=c.replace(/[ٱإأآا]/g,'ا');
      if(nc===plainTarget[plainIdx]||c===' '){if(c!==' ')plainIdx++;origIdx++;}
      else{origIdx++;plainIdx++;}
    }
    // Skip trailing whitespace
    while(origIdx<t.length&&t[origIdx]===' ')origIdx++;
    return t.slice(origIdx);
  }
  return t;
}

const fetchPage=async(p:number)=>{
  const r=await fetch(`https://api.alquran.cloud/v1/page/${p}/quran-uthmani`);
  if(!r.ok)throw new Error("Fail");const d=await r.json();
  return d.data.ayahs.filter((a:any)=>a.numberInSurah>0).map((a:any)=>{
    let t=a.text; // Use ORIGINAL text for display (fix Bil-Akhirah)
    // Strip bismillah from verse 1 of ALL surahs (so we can manually inject it gracefully at the top)
    // EXCEPT Tawbah which has no Bismillah.
    if(a.numberInSurah===1&&a.surah.number!==9){
      t=removeBismillah(t);
    }
    return{num:a.number,nis:a.numberInSurah,sn:a.surah.number,sname:a.surah.name,text:spaceMuqattaat(t.trim()),orig:norm(a.text),juz:a.juz};
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
  const activeAudioRef = useRef<'1'|'2'>('1');
  const nextPreloadedKey = useRef<string>("");

  useEffect(() => {
    audio1Ref.current = new Audio();
    audio2Ref.current = new Audio();
    
    const setup = (a: HTMLAudioElement) => {
      a.addEventListener('ended', handleEnded);
      a.addEventListener('timeupdate', handleTimeUpdate);
      a.addEventListener('error', handleErr);
    };
    if(audio1Ref.current) setup(audio1Ref.current);
    if(audio2Ref.current) setup(audio2Ref.current);

    return () => {
      audio1Ref.current?.pause();
      audio2Ref.current?.pause();
    };
  }, []);

  const playLocalSound = (type: 'ok'|'error') => {
    const urls = {
      ok: 'https://cdn.pixabay.com/audio/2022/03/15/audio_7833324f4e.mp3', // Short ding
      error: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bb6430386c.mp3' // Subtle error
    };
    new Audio(urls[type]).play().catch(()=>{});
  };

  const currentAudio = () => activeAudioRef.current === '1' ? audio1Ref.current : audio2Ref.current;
  const bufferAudio = () => activeAudioRef.current === '1' ? audio2Ref.current : audio1Ref.current;

  const handleEnded = () => {
    const q = playQueueRef.current;
    if (q && q.nis < q.maxNis) {
      const nextNis = q.nis + 1;
      const nextKey = `${q.sn}-${nextNis}`;
      
      // Small pause between verses for natural reading flow
      setTimeout(() => {
        // Swap to buffer if it's ready
        if (nextPreloadedKey.current === nextKey) {
          activeAudioRef.current = activeAudioRef.current === '1' ? '2' : '1';
          const a = currentAudio();
          if (a) {
            a.currentTime = 0;
            a.play().catch(() => setPlayingKey(""));
            setPlayingKey(nextKey);
            ensureVerseVisible(q.sn, nextNis);
            playQueueRef.current = { ...q, nis: nextNis };
            nextPreloadedKey.current = "";
          }
        } else {
          // Fallback if not preloaded
          const rec = getReciter();
          const url = rec.ev ? `https://everyayah.com/data/${rec.ev}/${pad3(q.sn)}${pad3(nextNis)}.mp3` : `${rec.server}/${pad3(q.sn)}${pad3(nextNis)}.mp3`;
          const a = currentAudio();
          if (a) {
            a.src = url;
            a.play().catch(() => setPlayingKey(""));
            setPlayingKey(nextKey);
            ensureVerseVisible(q.sn, nextNis);
            playQueueRef.current = { ...q, nis: nextNis };
          }
        }
      }, 300);
    } else {
      setPlayingKey("");
    }
  };

  const handleTimeUpdate = () => {
    const a = currentAudio();
    if (!a) return;
    
    // UI Progress
    const bar = document.getElementById('scrubBar') as HTMLInputElement;
    if (bar && a.duration) { bar.value = String((a.currentTime / a.duration) * 100); }
    
    // Preload Logic
    const q = playQueueRef.current;
    if (q && q.nis < q.maxNis && a.duration > 0 && a.duration - a.currentTime <= 2.5) {
      const nextNis = q.nis + 1;
      const nextKey = `${q.sn}-${nextNis}`;
      if (nextPreloadedKey.current !== nextKey) {
        const rec = getReciter();
        const url = rec.ev ? `https://everyayah.com/data/${rec.ev}/${pad3(q.sn)}${pad3(nextNis)}.mp3` : `${rec.server}/${pad3(q.sn)}${pad3(nextNis)}.mp3`;
        const b = bufferAudio();
        if (b) {
          b.src = url;
          b.load();
          nextPreloadedKey.current = nextKey;
        }
      }
    }
  };

  useSeo({title:"محراب - رفيقك الإسلامي",description:"محراب رفيقك الإسلامي - القرآن الكريم والتفسير ومواقيت الصلاة",canonicalPath:"/tafseer"});
  const qc=useQueryClient();
  const [pg,setPg]=useState(1);
  const [recId,setRecId]=useState("maher");
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

  const [hifz,setHifz]=useState(false);
  const [recording,setRecording]=useState(false);
  const [hifzIdx,setHifzIdx]=useState(0);
  const [hifzRes,setHifzRes]=useState<Map<string,"ok"|"err">>(new Map());
  const [recTxt,setRecTxt]=useState("");
  const recRef=useRef<any>(null);
  const txRef=useRef(0);
  
  useEffect(()=>{pgRef.current=pg;},[pg]);
  useEffect(()=>{recIdRef.current=recId;},[recId]);

  const reciter=RECITERS.find(r=>r.id===recId)||RECITERS[0];
  const surah=surahForPage(pg);
  const juz=juzForPage(pg);
  const pq=useQuery({queryKey:["qp",pg],queryFn:()=>fetchPage(pg)});
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
  const resetHifz=()=>{setHifzIdx(0);setHifzRes(new Map());setRecTxt("");};

  const searchTimeout=useRef<any>(null);
  const handleSearch=(val:string)=>{
    setSearch(val);
    if(searchTimeout.current)clearTimeout(searchTimeout.current);
    if(val.trim().length>2&&!SURAHS.some(s=>s.n.includes(val.trim()))){
      searchTimeout.current=setTimeout(async()=>{
        setIsSearchingAyahs(true);
        try{const r=await fetch(`https://api.alquran.cloud/v1/search/${val.trim()}/all/ar`);const d=await r.json();
          if(d.code===200){const u:any[]=[],seen=new Set();for(const m of d.data.matches){const k=`${m.surah.number}-${m.numberInSurah}`;if(!seen.has(k)){seen.add(k);u.push(m);if(u.length>=20)break;}}setAyahSearchResults(u);}
          else setAyahSearchResults([]);
        }catch{setAyahSearchResults([]);}setIsSearchingAyahs(false);
      },400);
    }else setAyahSearchResults([]);
  };
  const goSurah=(id:number)=>{setPg(PS[id]||1);setShowSearch(false);setSearch("");setSelVerse(null);setShowOptions(false);setHifz(false);stopHifz();resetHifz();setAyahSearchResults([]);};

  // ═══ AUDIO ═══
  const getReciter=()=>RECITERS.find(r=>r.id===recIdRef.current)||RECITERS[0];

  const ensureVerseVisible=(sn:number,nis:number)=>{
    const data=qc.getQueryData<any[]>(["qp",pgRef.current]);
    if(data&&!data.some((a:any)=>a.sn===sn&&a.nis===nis)){
      fetch(`https://api.alquran.cloud/v1/ayah/${sn}:${nis}`).then(r=>r.json()).then(d=>{if(d?.data?.page)setPg(d.data.page);}).catch(()=>{});
    } else {
      setTimeout(()=>{const el=document.getElementById(`verse-${sn}-${nis}`);if(el)el.scrollIntoView({behavior:'smooth',block:'center'});}, 100);
    }
  };

  const playVerse=(sn:number,nis:number)=>{
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

    const url = rec.ev ? `https://everyayah.com/data/${rec.ev}/${pad3(sn)}${pad3(nis)}.mp3` : `${rec.server}/${pad3(sn)}${pad3(nis)}.mp3`;
    a.src=url;
    a.play().then(()=>{if('mediaSession' in navigator)navigator.mediaSession.playbackState='playing';}).catch(()=>{});
    
    setIsPlaying(true);setPlayingKey(`${sn}-${nis}`);setPlayingSn(sn);
    ensureVerseVisible(sn,nis);
  };

  const playSurahFrom=(sn:number,startNis:number)=>{
    const maxNis=SURAHS.find(s=>s.id===sn)?.c||1;
    playQueueRef.current={sn,nis:startNis,maxNis};
    playVerse(sn,startNis);
  };

  const stopAudio=()=>{
    audio1Ref.current?.pause();
    if(audio1Ref.current) audio1Ref.current.src = "";
    audio2Ref.current?.pause();
    if(audio2Ref.current) audio2Ref.current.src = "";
    
    setIsPlaying(false);setPlayingKey("");setPlayingSn(0);playQueueRef.current=null;
    if('mediaSession' in navigator)navigator.mediaSession.playbackState='none';
  };

  const togglePlay=()=>{
    const a=currentAudio();
    if(isPlaying){
      if(a)a.pause();
      setIsPlaying(false);
      if('mediaSession' in navigator)navigator.mediaSession.playbackState='paused';
    }
    else if(a&&a.src){
      a.play().then(()=>{if('mediaSession' in navigator)navigator.mediaSession.playbackState='playing';}).catch(()=>{});
      setIsPlaying(true);
    }
    else playSurahFrom(surah.id,1);
  };

  const skipNext=()=>{const q=playQueueRef.current;if(q&&q.nis<q.maxNis){q.nis++;playVerse(q.sn,q.nis);}};
  const skipPrev=()=>{const q=playQueueRef.current;if(q&&q.nis>1){q.nis--;playVerse(q.sn,q.nis);}};

  const handleErr=()=>{
    const q=playQueueRef.current;if(!q)return;
    const rec=getReciter();
    const a = currentAudio();
    // Try mirror first, then mp3quran server, then skip
    if(rec.ev && a && !a.src.includes('mirrors.quranicaudio.com')){
      a.src=`https://mirrors.quranicaudio.com/everyayah/${rec.ev}/${pad3(q.sn)}${pad3(q.nis)}.mp3`;
      a.play().catch(()=>{
        // Try mp3quran server as final fallback
        if(rec.server){
          a.src=`${rec.server}/${pad3(q.sn)}.mp3`;
          a.play().catch(()=>skipNext());
        } else skipNext();
      });
      return;
    }
    skipNext();
  };

  const handleReciterChange=(newId:string)=>{
    setRecId(newId);recIdRef.current=newId;
    const q=playQueueRef.current;
    if(q&&isPlaying){
      currentAudio()?.pause();
      setTimeout(()=>playVerse(q.sn,q.nis),50);
    }
  };

  // Hifz
  const startHifz=useCallback(()=>{
    const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
    if(!SR){alert("المتصفح لا يدعم التعرف على الصوت. استخدم Chrome");return;}
    const r=new SR();
    r.lang="ar-SA";
    r.continuous=true;
    r.interimResults=true;
    r.maxAlternatives=3; // More alternatives = better accuracy
    
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
    
    // Calculate word-level similarity (Levenshtein-like)
    const wordSimilarity = (a:string, b:string):number => {
      if(a === b) return 1;
      if(a.includes(b) || b.includes(a)) return 0.9;
      // Check if first 3 chars match (common root)
      if(a.length >= 3 && b.length >= 3 && a.substring(0,3) === b.substring(0,3)) return 0.7;
      // Check if 70%+ of chars match
      let matches = 0;
      const shorter = a.length < b.length ? a : b;
      const longer = a.length >= b.length ? a : b;
      for(const c of shorter) { if(longer.includes(c)) matches++; }
      return matches / longer.length;
    };
    
    let allTranscripts:string[] = []; // Accumulate all heard words
    let lastResultCount = 0;
    
    r.onresult=(e:any)=>{
      if(!pq.data) return;
      const exp=pq.data[hifzIdx]; if(!exp) return;
      if(isAdvancingRef.current) return;

      // Collect ALL results (not just latest) for better coverage
      let fullTranscript = '';
      let newWords:string[] = [];
      
      for(let i = 0; i < e.results.length; i++) {
        const result = e.results[i];
        // Check all alternatives for best match
        let bestText = result[0].transcript;
        if(result.length > 1) {
          // Use the alternative that best matches expected verse
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
      
      // Add new words to accumulated list
      if(newWords.length > 0) {
        allTranscripts.push(...newWords);
      }
      
      lastResultCount = e.results.length;
      hifzTxtRef.current = fullTranscript;
      setRecTxt(fullTranscript.split(' ').slice(-6).join(' '));

      // Compare accumulated words against expected verse
      const ew = normAr(exp.text).split(' ').filter((w:string) => w.length > 1);
      const spokenWords = allTranscripts.slice(-Math.max(ew.length * 2, 20)); // Use recent window
      
      // Word-by-word matching with similarity scoring
      let matchedWords:string[] = [];
      let wrongWords:string[] = [];
      let matchedCount = 0;
      
      for(let wi = 0; wi < ew.length; wi++) {
        const target = ew[wi];
        let bestMatch = 0;
        let bestWord = '';
        
        for(const said of spokenWords) {
          const sim = wordSimilarity(said, target);
          if(sim > bestMatch) { bestMatch = sim; bestWord = said; }
        }
        
        if(bestMatch >= 0.7) {
          matchedCount++;
          matchedWords.push(target);
          if(bestMatch < 0.95) {
            // Pronunciation issue - close but not exact
            wrongWords.push(`"${target}" ← نطقت "${bestWord}"`);
          }
        } else {
          wrongWords.push(`❌ "${target}"`);
        }
      }
      
      const completeRatio = ew.length > 0 ? matchedCount / ew.length : 0;
      
      // Show real-time feedback on progress
      if(completeRatio > 0.3 && completeRatio < 0.7) {
        setHifzFeedback({type:'ok', msg:`⏳ ${Math.round(completeRatio*100)}% من الآية...`});
      }
      
      // Pronunciation errors detected (matched words but with differences)
      if(wrongWords.length > 0 && completeRatio >= 0.5 && completeRatio < 0.7) {
        setHifzFeedback({type:'wrong_pron', msg:'⚠️ تحقق من النطق', details:wrongWords.slice(0,3)});
        setHifzStatus('pron');
      }
      
      // ✅ Verse completed successfully
      if(completeRatio >= 0.70 && !isAdvancingRef.current) {
        isAdvancingRef.current = true;
        
        const hasErrors = wrongWords.length > 0;
        const isPerfect = completeRatio >= 0.95 && wrongWords.filter(w=>w.startsWith('❌')).length === 0;
        
        if(isPerfect) {
          setHifzFeedback({type:'ok', msg:'ممتاز! أحسنت ✅'});
          setHifzStatus('ok');
        } else if(hasErrors && wrongWords.some(w=>w.startsWith('❌'))) {
          setHifzFeedback({type:'wrong_verse', msg:'⚠️ صحيح مع ملاحظات', details:wrongWords.filter(w=>w.startsWith('❌')).slice(0,3)});
          setHifzStatus('pron');
        } else {
          setHifzFeedback({type:'ok', msg:'أحسنت ✅'});
          setHifzStatus('ok');
        }
        
        playLocalSound('ok');
        const k=`${exp.sn}-${exp.nis}`;
        setHifzRes(prev=>{const n=new Map(prev);n.set(k, isPerfect ? 'ok' : 'ok');return n;});
        
        // Auto-advance to next verse
        setTimeout(()=>{
          allTranscripts = []; // Reset accumulated words for next verse
          lastResultCount = 0;
          
          setHifzIdx(prev=>{
            const next=Math.min(prev+1,(pq.data?.length||1)-1);
            setTimeout(()=>{
              const el=document.getElementById(`verse-${pq.data![next].sn}-${pq.data![next].nis}`);
              if(el) el.scrollIntoView({behavior:'smooth',block:'center'});
            }, 200);
            isAdvancingRef.current = false;
            return next;
          });
          setHifzFeedback(null);
          setHifzStatus('none');
          hifzTxtRef.current = '';
          setRecTxt('');
          
          // Restart recognition fresh for new verse
          try { r.stop(); } catch {}
          setTimeout(() => { try { r.start(); } catch {} }, 300);
        }, 1500);
      }
    };

    r.onerror=(e:any)=>{
      console.log('Speech error:', e.error);
      // Auto-restart on non-fatal errors
      if(e.error === 'no-speech' || e.error === 'audio-capture') {
        setTimeout(() => { try { r.start(); } catch {} }, 500);
      }
    };
    r.onend=()=>{if(recording && !isAdvancingRef.current) try{r.start();}catch{}};
    recRef.current=r;
    r.start();
    setRecording(true);
  },[hifzIdx,pq.data,recording]);

  const stopHifz=useCallback(()=>{if(recRef.current){recRef.current.onend=null;try{recRef.current.stop();}catch{}recRef.current=null;}setRecording(false);},[]);
  const reveal=(i:number)=>{
    if(!pq.data)return;
    const a=pq.data[i];
    playLocalSound('error');
    setHifzRes(prev=>{const m=new Map(prev);m.set(`${a.sn}-${a.nis}`,"err");return m;});
    if(i===hifzIdx)setHifzIdx(prev=>Math.min(prev+1,(pq.data?.length||1)-1));
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
    const wrap=document.createElement('div');
    wrap.style.cssText=`position:fixed;left:-9999px;top:0;width:1080px;padding:80px 60px;background:${c.bg};direction:rtl;text-align:center;font-family:'KFGQPC HAFS Uthmanic Script','Amiri Quran','Amiri',serif;`;
    const hdr=document.createElement('div');
    hdr.style.cssText=`display:inline-block;border:2px solid ${c.border};padding:16px 60px;margin-bottom:40px;position:relative;`;
    hdr.innerHTML=`<span style="font-size:40px;color:${c.text};font-weight:bold;">سُورَةُ ${sname}</span>`;
    wrap.appendChild(hdr);
    const txt=document.createElement('p');
    txt.style.cssText=`font-size:42px;line-height:2.2;color:${c.text};margin:20px 0 40px;padding:0 20px;`;
    txt.textContent=text;
    wrap.appendChild(txt);
    const divider=document.createElement('div');
    divider.style.cssText=`display:flex;align-items:center;justify-content:center;gap:12px;margin-top:20px;`;
    divider.innerHTML=`<div style="width:80px;height:1px;background:${c.border}"></div><span style="font-size:20px;color:${c.border};font-family:sans-serif;font-weight:bold;">${selVerse.sn}:${refs}</span><div style="width:80px;height:1px;background:${c.border}"></div>`;
    wrap.appendChild(divider);
    const wm=document.createElement('div');
    wm.style.cssText=`margin-top:40px;font-size:16px;color:${c.border};font-family:sans-serif;direction:ltr;`;
    wm.textContent='تطبيق محراب - mihrabapp.com';
    wrap.appendChild(wm);
    document.body.appendChild(wrap);
    try{
      const cv=document.createElement('canvas');
      const rect=wrap.getBoundingClientRect();
      cv.width=1080;cv.height=Math.max(1080,rect.height+40);
      const ctx=cv.getContext('2d');if(!ctx){document.body.removeChild(wrap);return;}
      ctx.fillStyle=c.bg;ctx.fillRect(0,0,cv.width,cv.height);
      const fontQ="'KFGQPC HAFS Uthmanic Script','Amiri Quran','Amiri',serif";
      ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='rtl';
      const boxY=100;
      ctx.strokeStyle=c.border;ctx.lineWidth=2.5;
      ctx.strokeRect(290,boxY,500,80);
      ctx.font=`۞`; ctx.fillText('۞',245,boxY+40);ctx.fillText('۞',835,boxY+40);
      ctx.font=`bold 42px ${fontQ}`;ctx.fillStyle=c.text;
      ctx.fillText(`سُورَةُ ${sname}`,540,boxY+42);
      ctx.font=`42px ${fontQ}`;ctx.fillStyle=c.text;
      const maxW=920;const words=text.split(' ');
      let line='',y=280;
      for(const w of words){
        const test=line+w+' ';
        if(ctx.measureText(test).width>maxW&&line){ctx.fillText(line.trim(),540,y);y+=88;line=w+' ';}
        else line=test;
      }
      if(line){ctx.fillText(line.trim(),540,y);y+=88;}
      ctx.strokeStyle=c.border;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(340,y+10);ctx.lineTo(740,y+10);ctx.stroke();
      ctx.font='bold 20px sans-serif';ctx.fillStyle=c.text;
      ctx.fillText(`${selVerse.sn}:${refs}${pg ? `  |  صفحة ${pg}` : ''}`, 540, y + 10);
      const wmY=Math.max(y+80,cv.height-40);
      ctx.font='16px sans-serif';ctx.fillStyle=c.border;
      ctx.fillText('تشرفت بالمشاركة عبر تطبيق محراب - mihrabapp.com',540,wmY);
      if(y+120<cv.height){
        const finalH=y+120;
        const imgData=ctx.getImageData(0,0,cv.width,finalH);
        cv.height=finalH;
        ctx.putImageData(imgData,0,0);
      }
      document.body.removeChild(wrap);
      cv.toBlob(blob=>{
        if(!blob)return;
        const dl=document.createElement('a');dl.href=URL.createObjectURL(blob);dl.download=`Quran_${selVerse.sn}_${refs}.png`;
        const file=new File([blob],'ayah.png',{type:'image/png'});
        if(navigator.share&&navigator.canShare?.({files:[file]}))navigator.share({files:[file]}).catch(()=>dl.click());
        else dl.click();
      },'image/png');
    }catch{document.body.removeChild(wrap);}
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
            <a href="/" className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><ArrowRight className="w-4 h-4"/></a>
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
            <button onClick={()=>{setHifz(!hifz);if(hifz)stopHifz();resetHifz();}} className={`p-1.5 rounded-lg ${hifz?'bg-amber-500 text-white shadow-md':'opacity-60 hover:opacity-100'}`} style={hifz?{}:{color:colors.text}}>
              <Mic className="w-4 h-4"/></button>
            <button onClick={()=>setShowUI(false)} className="p-1.5 rounded-lg opacity-50 hover:opacity-100" style={{color:colors.text}}><ChevronLeft className="w-4 h-4" style={{transform:'rotate(90deg)'}}/></button>
          </div>
        </div>}
      {!showUI&&<button onClick={()=>setShowUI(true)} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full flex items-center justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity shadow-sm" style={{background:colors.bg+'ee',color:colors.text,border:'1px solid '+colors.border+'50',paddingTop:'calc(env(safe-area-inset-top,0px) + 4px)',fontSize:'11px',fontWeight:700}}><ChevronLeft className="w-3 h-3" style={{transform:'rotate(-90deg)'}}/> إظهار</button>}


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
          </div></div>
        {hifzFeedback&&<div className="mt-1 px-2 py-1 rounded-lg text-[11px] font-bold text-center animate-pulse" style={{background:hifzFeedback.type==='ok'?'rgba(34,197,94,0.2)':hifzFeedback.type==='wrong_verse'?'rgba(239,68,68,0.2)':'rgba(245,158,11,0.2)',color:hifzFeedback.type==='ok'?'#4ade80':hifzFeedback.type==='wrong_verse'?'#f87171':'#fbbf24'}}>{hifzFeedback.msg}{hifzFeedback.details&&<span className="block text-[10px] opacity-80 mt-0.5">{hifzFeedback.details.join(' • ')}</span>}</div>}
        <div className="flex gap-1.5 mt-1">
          <button onClick={()=>recording?stopHifz():startHifz()} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 ${recording?"bg-red-500 text-white animate-pulse":"bg-amber-500 text-white"}`}>
            {recording?<><MicOff className="w-3 h-3"/>إيقاف</>:<><Mic className="w-3 h-3"/>ابدأ</>}</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:colors.border+'40',color:colors.text}}>كشف</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:colors.border+'40',color:colors.text}}>تخطي</button>
        </div>
      </div>}

      {/* ═══ MUSHAF ═══ */}
      <div className="overflow-y-auto scrollbar-hide flex flex-col"
        style={{height:'calc(100dvh - env(safe-area-inset-top,0px))', marginTop:(showUI?55:0)+(hifz&&showUI?46:0)}}
        onTouchStart={onTS} onTouchEnd={onTE}>
        {pq.isLoading?<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" style={{color:colors.text}}/></div>
        :pq.error?<div className="flex-1 flex items-center justify-center flex-col gap-2"><p>فشل تحميل الصفحة</p><Button onClick={()=>pq.refetch()} size="sm" variant="outline">إعادة المحاولة</Button></div>
        :<div className="flex-1 w-full max-w-2xl mx-auto px-4 md:px-8 relative min-h-full">
            <div className={`flex flex-col pt-32 pb-32 ${groups.reduce((t,gg)=>t+gg.ayahs.length,0)<15?'justify-center min-h-[70vh]':''}`}>
              {groups.map((g,gi)=>{
                const allChars=groups.reduce((t,gg)=>t+gg.ayahs.reduce((s,a)=>s+a.text.length,0),0);
                const dynSize=allChars<350?'clamp(22px, 6vw, 32px)':
                               allChars<550?'clamp(20px, 5.5vw, 28px)':
                               allChars<800?'clamp(18px, 5vw, 26px)':
                               'clamp(16px, 4.5vw, 24px)';
                const dynLine=allChars<350?'3.0':allChars<600?'2.6':allChars<800?'2.4':'2.2';
                
                return <div key={`${g.sn}-${gi}`} className="relative w-full">
                  {/* Surah/Juz Header */}
                  <div className="flex justify-between items-center mb-6 px-2 opacity-50 font-bold" dir="rtl" style={{fontSize:'12px',color:colors.text}}>
                    <span>سُورَةُ {g.sname.replace(/^سُورَةُ\s*/,'')}</span>
                    <span>الْجُزْءُ {juzForPage(pg).toLocaleString('ar-EG')}</span>
                  </div>

                  {/* Surah Frame (Only for verse 1) */}
                  {g.ayahs[0].nis===1&&<div className="text-center my-6 flex justify-center scale-110">
                    <div className="relative px-12 py-3 min-w-[220px]">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <path d="M10 5 L190 5 L195 10 L195 50 L190 55 L10 55 L5 50 L5 10 Z" fill={colors.border+'10'} stroke={colors.border} strokeWidth="1.5"/>
                        <circle cx="10" cy="30" r="3" fill={colors.border}/> <circle cx="190" cy="30" r="3" fill={colors.border}/>
                      </svg>
                      <span className="font-quran font-bold relative z-10 block" style={{fontSize:'clamp(20px, 4.5vw, 26px)',color:colors.text, paddingTop:'2px'}}>سُورَةُ {g.sname.replace(/^سُورَةُ\s*/,'')}</span>
                    </div>
                  </div>}
                  
                  {/* Basmala */}
                  {g.ayahs[0].nis===1&&g.sn!==9&&<div className="text-center mt-2 mb-8" dir="rtl">
                    <span onClick={()=>{if(!hifz){setSelVerse({sn:g.sn,nis:1,text:g.ayahs[0].orig});setShowOptions(true);}}}
                      className="font-quran transition-all duration-200 rounded cursor-pointer leading-[2.5] block" 
                      style={{
                        fontSize: dynSize,
                        color: (playingKey===`${g.sn}-1` && g.sn===1) ? '#fff' : colors.text,
                        background: (playingKey===`${g.sn}-1` && g.sn===1) ? colors.hi : 'transparent',
                        padding: (playingKey===`${g.sn}-1` && g.sn===1) ? '4px 12px' : '0'
                      }}>
                      بِسْمِ ٱللَّهِ ٱلرَّحْمَنِ ٱلرَّحِيمِ 
                      {g.sn===1 && (
                        <span className="inline-flex items-center justify-center align-middle"
                          style={{width:'1.6em',height:'1.6em',fontSize:'0.5em',verticalAlign:'middle',position:'relative',margin:'0 0.15em'}}>
                          <span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4em',color:(playingKey===`${g.sn}-1`)?'#22c55e':'#c8a96e',opacity:0.9,lineHeight:1}}>۝</span>
                          <span style={{position:'relative',zIndex:1,fontSize:'0.8em',fontFamily:'sans-serif',fontWeight:700,color:(playingKey===`${g.sn}-1`)?'#22c55e':'#8b7355',lineHeight:1}}>1</span>
                        </span>
                      )}
                    </span>
                  </div>}
                  
                  {/* Ayahs Grid */}
                  <div className="text-justify font-quran" dir="rtl" style={{fontSize:dynSize,lineHeight:dynLine,fontWeight:'normal',letterSpacing:'0.02em',color:colors.text, wordSpacing:'0.08em', textAlignLast:'center'}}>
                    {g.ayahs.map(a=>{
                      if(a.nis===1 && g.sn===1) return null;
                      const k=`${g.sn}-${a.nis}`;const hr=hifzRes.get(k);const hidden=hifz&&!hr&&a.gi>=hifzIdx;const cur=hifz&&a.gi===hifzIdx;
                      const isP=playingKey===k;const isSel=selVerse?.sn===g.sn&&selVerse?.nis===a.nis;
                      return<span key={k} className="inline" data-v="1" id={`verse-${g.sn}-${a.nis}`}>
                        <span onClick={e=>{e.stopPropagation();if(!hifz){setSelVerse({sn:g.sn,nis:a.nis,text:a.orig});setShowOptions(true);}}}
                          className="transition-all duration-200 rounded cursor-pointer"
                          style={{
                            color:hidden?'transparent':isP?'#fff':hr==='err'?'#f87171':colors.text,
                            background:isP?colors.hi:isSel?colors.hi:cur?'rgba(245,158,11,0.12)':'transparent',
                            padding:(isP||isSel)?'4px 10px':'0',borderRadius:(isP||isSel)?'10px':'0',
                          }}>
                          {a.text}
                        </span>
                        <span className="inline-flex items-center justify-center align-middle" data-v="1"
                          style={{width:'1.6em',height:'1.6em',fontSize:'0.5em',verticalAlign:'middle',position:'relative',display:'inline-flex',margin:'0 0.15em'}}>
                          <span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4em',color:isP?'#22c55e':'#c8a96e',opacity:0.9,lineHeight:1}}>۝</span>
                          <span style={{position:'relative',zIndex:1,fontSize:'0.8em',fontFamily:'sans-serif',fontWeight:700,color:isP?'#22c55e':bookmarks.has(k)?'#ec4899':'#8b7355',lineHeight:1}}>{hidden?'؟':a.nis}</span>
                        </span>{SAJDA_VERSES.has(`${g.sn}:${a.nis}`)&&<span style={{color:isP?'#22c55e':'#c8a96e',fontSize:'0.8em',verticalAlign:'super',marginRight:2}} data-v="1">۩</span>}
                      </span>;
                    })}
                  </div>
                </div>
              })}
            </div>
            
            {/* Elegant Fixed Page Footer */}
            <div className="mt-12 mb-20 flex justify-center items-center gap-6 opacity-60">
                <div className="h-px flex-1 max-w-[80px]" style={{background:`linear-gradient(to right, transparent, ${colors.border})`}} />
                <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-40 mb-1" style={{color:colors.text}}>صفحة</span>
                    <span className="text-sm font-bold tracking-widest" style={{color:colors.text}}>{pg.toLocaleString('ar-EG')}</span>
                </div>
                <div className="h-px flex-1 max-w-[80px]" style={{background:`linear-gradient(to left, transparent, ${colors.border})`}} />
            </div>
        </div>}
      </div>

      {/* ═══ BOTTOM PLAYER ═══ */}
      {playingSn>0&&<div className="fixed left-0 right-0 bottom-0 z-50 bg-card/90 backdrop-blur-md border-t border-border shadow-[0_-4px_25px_rgba(0,0,0,0.15)]" style={{paddingBottom:'env(safe-area-inset-bottom,6px)'}}>
        <div className="w-full px-6 mb-1 mt-1">
          <input id="scrubBar" type="range" defaultValue="0" min="0" max="100" className="w-full h-1 bg-emerald-500/10 accent-emerald-500 rounded-full appearance-none cursor-pointer"/>
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
