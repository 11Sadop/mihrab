import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, X, Play, Pause, SkipForward, SkipBack, Mic, MicOff, ChevronLeft, ChevronRight, BookOpen, Share2, Square, Settings, ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

interface Rec{id:string;name:string;server:string;ev?:string;}
const RECITERS:Rec[]=[
  // أ
  {id:"shatri",name:"أبو بكر الشاطري",server:"https://server11.mp3quran.net/shatri",ev:"Abu_Bakr_Ash-Shaatree_128kbps"},
  {id:"ajamy",name:"أحمد العجمي",server:"https://server10.mp3quran.net/ajm",ev:"Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net"},
  // ح-خ
  // م
  {id:"maher",name:"ماهر المعيقلي",server:"https://server12.mp3quran.net/maher",ev:"Maher_AlMuaiqly_128kbps"},
  {id:"afasy",name:"مشاري العفاسي",server:"https://server8.mp3quran.net/afs",ev:"Alafasy_128kbps"},
  {id:"husary",name:"محمود خليل الحصري",server:"https://server13.mp3quran.net/husr",ev:"Husary_128kbps"},
  {id:"minshawi",name:"محمد صديق المنشاوي",server:"https://server10.mp3quran.net/minsh",ev:"Minshawy_Murattal_128kbps"},
  {id:"jbrl",name:"محمد جبريل",server:"https://server8.mp3quran.net/jbrl",ev:"Muhammad_Jibreel_128kbps"},
  {id:"tablawi",name:"محمد الطبلاوي",server:"https://server12.mp3quran.net/tblawi",ev:"Mohammad_al_Tablaway_128kbps"},
  {id:"ayyub",name:"محمد أيوب",server:"https://server8.mp3quran.net/ayyub",ev:"Muhammad_Ayyoub_128kbps"},
  {id:"luhaidan",name:"محمد اللحيدان",server:"https://server8.mp3quran.net/lhdan",ev:"Muhammad_alLuhaidan_128kbps"},
  // ن
  {id:"qatami",name:"ناصر القطامي",server:"https://server10.mp3quran.net/qht",ev:"Nasser_Alqatami_128kbps"},
  // س-ص
  {id:"sudais",name:"عبدالرحمن السديس",server:"https://server11.mp3quran.net/sds",ev:"Abdurrahmaan_As-Sudais_192kbps"},
  {id:"basit",name:"عبدالباسط عبدالصمد",server:"https://server7.mp3quran.net/basit",ev:"Abdul_Basit_Murattal_192kbps"},
  {id:"bsfr",name:"عبدالله بصفر",server:"https://server6.mp3quran.net/bsfr",ev:"Abdullaah_3awwaad_Al-Juhaynee_128kbps"},
  {id:"shuraim",name:"سعود الشريم",server:"https://server7.mp3quran.net/shur",ev:"Saood_ash-Shuraym_128kbps"},
  {id:"ghamdi",name:"سعد الغامدي",server:"https://server7.mp3quran.net/s_gmd",ev:"Ghamadi_40kbps"},
  {id:"budair",name:"صلاح البدير",server:"https://server6.mp3quran.net/s_bud",ev:"Salah_Al_Budair_128kbps"},
  // ي
  {id:"dosari",name:"ياسر الدوسري",server:"https://server10.mp3quran.net/ibrahim_dosri",ev:"Yasser_Ad-Dussary_128kbps"},
];

const SURAHS=[{id:1,n:"الفاتحة",c:7},{id:2,n:"البقرة",c:286},{id:3,n:"آل عمران",c:200},{id:4,n:"النساء",c:176},{id:5,n:"المائدة",c:120},{id:6,n:"الأنعام",c:165},{id:7,n:"الأعراف",c:206},{id:8,n:"الأنفال",c:75},{id:9,n:"التوبة",c:129},{id:10,n:"يونس",c:109},{id:11,n:"هود",c:123},{id:12,n:"يوسف",c:111},{id:13,n:"الرعد",c:43},{id:14,n:"إبراهيم",c:52},{id:15,n:"الحجر",c:99},{id:16,n:"النحل",c:128},{id:17,n:"الإسراء",c:111},{id:18,n:"الكهف",c:110},{id:19,n:"مريم",c:98},{id:20,n:"طه",c:135},{id:21,n:"الأنبياء",c:112},{id:22,n:"الحج",c:78},{id:23,n:"المؤمنون",c:118},{id:24,n:"النور",c:64},{id:25,n:"الفرقان",c:77},{id:26,n:"الشعراء",c:227},{id:27,n:"النمل",c:93},{id:28,n:"القصص",c:88},{id:29,n:"العنكبوت",c:69},{id:30,n:"الروم",c:60},{id:31,n:"لقمان",c:34},{id:32,n:"السجدة",c:30},{id:33,n:"الأحزاب",c:73},{id:34,n:"سبأ",c:54},{id:35,n:"فاطر",c:45},{id:36,n:"يس",c:83},{id:37,n:"الصافات",c:182},{id:38,n:"ص",c:88},{id:39,n:"الزمر",c:75},{id:40,n:"غافر",c:85},{id:41,n:"فصلت",c:54},{id:42,n:"الشورى",c:53},{id:43,n:"الزخرف",c:89},{id:44,n:"الدخان",c:59},{id:45,n:"الجاثية",c:37},{id:46,n:"الأحقاف",c:35},{id:47,n:"محمد",c:38},{id:48,n:"الفتح",c:29},{id:49,n:"الحجرات",c:18},{id:50,n:"ق",c:45},{id:51,n:"الذاريات",c:60},{id:52,n:"الطور",c:49},{id:53,n:"النجم",c:62},{id:54,n:"القمر",c:55},{id:55,n:"الرحمن",c:78},{id:56,n:"الواقعة",c:96},{id:57,n:"الحديد",c:29},{id:58,n:"المجادلة",c:22},{id:59,n:"الحشر",c:24},{id:60,n:"الممتحنة",c:13},{id:61,n:"الصف",c:14},{id:62,n:"الجمعة",c:11},{id:63,n:"المنافقون",c:11},{id:64,n:"التغابن",c:18},{id:65,n:"الطلاق",c:12},{id:66,n:"التحريم",c:12},{id:67,n:"الملك",c:30},{id:68,n:"القلم",c:52},{id:69,n:"الحاقة",c:52},{id:70,n:"المعارج",c:44},{id:71,n:"نوح",c:28},{id:72,n:"الجن",c:28},{id:73,n:"المزمل",c:20},{id:74,n:"المدثر",c:56},{id:75,n:"القيامة",c:40},{id:76,n:"الإنسان",c:31},{id:77,n:"المرسلات",c:50},{id:78,n:"النبأ",c:40},{id:79,n:"النازعات",c:46},{id:80,n:"عبس",c:42},{id:81,n:"التكوير",c:29},{id:82,n:"الانفطار",c:19},{id:83,n:"المطففين",c:36},{id:84,n:"الانشقاق",c:25},{id:85,n:"البروج",c:22},{id:86,n:"الطارق",c:17},{id:87,n:"الأعلى",c:19},{id:88,n:"الغاشية",c:26},{id:89,n:"الفجر",c:30},{id:90,n:"البلد",c:20},{id:91,n:"الشمس",c:15},{id:92,n:"الليل",c:21},{id:93,n:"الضحى",c:11},{id:94,n:"الشرح",c:8},{id:95,n:"التين",c:8},{id:96,n:"العلق",c:19},{id:97,n:"القدر",c:5},{id:98,n:"البينة",c:8},{id:99,n:"الزلزلة",c:8},{id:100,n:"العاديات",c:11},{id:101,n:"القارعة",c:11},{id:102,n:"التكاثر",c:8},{id:103,n:"العصر",c:3},{id:104,n:"الهمزة",c:9},{id:105,n:"الفيل",c:5},{id:106,n:"قريش",c:4},{id:107,n:"الماعون",c:7},{id:108,n:"الكوثر",c:3},{id:109,n:"الكافرون",c:6},{id:110,n:"النصر",c:3},{id:111,n:"المسد",c:5},{id:112,n:"الإخلاص",c:4},{id:113,n:"الفلق",c:5},{id:114,n:"الناس",c:6}];

const PS:Record<number,number>={1:1,2:2,3:50,4:77,5:106,6:128,7:151,8:177,9:187,10:208,11:221,12:235,13:249,14:255,15:262,16:267,17:282,18:293,19:305,20:312,21:322,22:332,23:342,24:350,25:359,26:367,27:377,28:385,29:396,30:404,31:411,32:415,33:418,34:428,35:434,36:440,37:446,38:453,39:458,40:467,41:477,42:483,43:489,44:496,45:499,46:502,47:507,48:511,49:515,50:518,51:520,52:523,53:526,54:528,55:531,56:534,57:537,58:542,59:545,60:549,61:551,62:553,63:554,64:556,65:558,66:560,67:562,68:564,69:566,70:568,71:570,72:572,73:574,74:575,75:577,76:578,77:580,78:582,79:583,80:585,81:586,82:587,83:587,84:589,85:590,86:591,87:591,88:592,89:593,90:594,91:595,92:595,93:596,94:596,95:597,96:597,97:598,98:598,99:599,100:599,101:600,102:600,103:601,104:601,105:601,106:602,107:602,108:602,109:603,110:603,111:603,112:604,113:604,114:604};

const JUZ:Record<number,number>={1:1,22:2,42:3,62:4,82:5,102:6,121:7,142:8,162:9,182:10,201:11,222:12,242:13,262:14,282:15,302:16,322:17,342:18,362:19,382:20,402:21,422:22,442:23,462:24,482:25,502:26,522:27,542:28,562:29,582:30};
function juzForPage(p:number){let j=1;for(const pg of Object.keys(JUZ).map(Number).sort((a,b)=>a-b)){if(pg<=p)j=JUZ[pg];else break;}return j;}

// Normalize text - keep waqf marks (dots, pause signs)
const norm=(t:string)=>t.replace(/\u0671/g,'\u0627').replace(/\uFEFF/g,'');
// Add thin space between muqatta'at letters for better diacritic display
const spaceMuqattaat=(t:string)=>t.replace(/^([المركهيعطسحقنص][ًَُِّٓ-ٟ]*){2,}$/gm,(m)=>{
  // Only if text is short (muqattaat are 1-5 letters)
  if(m.replace(/[\u064B-\u065F\u0653\u0670]/g,'').length<=5)return m.split('').join('\u200A');
  return m;
});
const strip=(t:string)=>t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u0653]/g,'').replace(/[ٱإأآا]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,' ').trim();
const pad3=(n:number)=>String(n).padStart(3,'0');
function surahForPage(p:number){let s=1;for(const id of Object.keys(PS).map(Number)){if(PS[id]<=p)s=id;else break;}return SURAHS[s-1];}

// Robust bismillah removal: strip diacritics then compare
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
    let t=norm(a.text);
    // Strip bismillah from verse 1 of all surahs except Fatiha and Tawbah
    if(a.numberInSurah===1&&a.surah.number!==1&&a.surah.number!==9){
      t=removeBismillah(t);
    }
    return{num:a.number,nis:a.numberInSurah,sn:a.surah.number,sname:a.surah.name,text:spaceMuqattaat(t.trim()),juz:a.juz};
  });
};

const QBG:Record<string,{bg:string;text:string;border:string;hi:string}>={
  dark:{bg:'#1a2332',text:'#d4c5a0',border:'#3d5a3d',hi:'rgba(34,197,94,0.25)'},
  cream:{bg:'#F5ECD7',text:'#2c1810',border:'#c8a96e',hi:'rgba(34,150,94,0.2)'},
  white:{bg:'#ffffff',text:'#1a1a1a',border:'#ddd',hi:'rgba(34,197,94,0.15)'},
  green:{bg:'#1a3a2a',text:'#d4c5a0',border:'#3d5a3d',hi:'rgba(34,197,94,0.25)'},
};

export default function QuranPage(){
  useSeo({title:"القرآن الكريم - محراب",description:"القرآن الكريم",canonicalPath:"/tafseer"});
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
  const [qTheme,setQTheme]=useState<string>(()=>localStorage.getItem('q-theme')||'dark');
  const [showSettings,setShowSettings]=useState(false);

  const [isPlaying,setIsPlaying]=useState(false);
  const [playingKey,setPlayingKey]=useState("");
  const [playingSn,setPlayingSn]=useState(0);
  const audioRef=useRef<HTMLAudioElement|null>(null);
  const playQueueRef=useRef<{sn:number;nis:number;maxNis:number}|null>(null);
  const nextAudioRef=useRef<HTMLAudioElement|null>(null);
  const recIdRef=useRef(recId);
  const onEndedRef=useRef<()=>void>(()=>{});
  const onErrRef=useRef<()=>void>(()=>{});

  const [hifz,setHifz]=useState(false);
  const [recording,setRecording]=useState(false);
  const [hifzIdx,setHifzIdx]=useState(0);
  const [hifzRes,setHifzRes]=useState<Map<string,"ok"|"err">>(new Map());
  const [recTxt,setRecTxt]=useState("");
  const recRef=useRef<any>(null);
  const txRef=useRef(0);
  const searchRef=useRef<HTMLInputElement>(null);
  const pgRef=useRef(pg);

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

  const preloadNext=(sn:number,nis:number)=>{
    const rec=getReciter();if(!rec.ev)return;
    const maxNis=SURAHS.find(s=>s.id===sn)?.c||1;
    if(nis>=maxNis)return;
    const url=`https://everyayah.com/data/${rec.ev}/${pad3(sn)}${pad3(nis+1)}.mp3`;
    const a=new Audio(url);a.preload='auto';nextAudioRef.current=a;
  };

  const playVerse=(sn:number,nis:number)=>{
    const rec=getReciter();
    if(!rec.ev){
      if(!audioRef.current)audioRef.current=new Audio();
      audioRef.current.src=`${rec.server}/${pad3(sn)}.mp3`;audioRef.current.play().catch(()=>{});
      setIsPlaying(true);setPlayingKey(`${sn}-${nis}`);setPlayingSn(sn);return;
    }
    const url=`https://everyayah.com/data/${rec.ev}/${pad3(sn)}${pad3(nis)}.mp3`;
    if(nextAudioRef.current&&nextAudioRef.current.src.endsWith(`${pad3(sn)}${pad3(nis)}.mp3`)){
      if(audioRef.current){audioRef.current.onended=null;audioRef.current.pause();}
      const a=nextAudioRef.current;nextAudioRef.current=null;audioRef.current=a;
      a.onended=()=>onEndedRef.current();a.onerror=()=>onErrRef.current();a.play().catch(()=>{});
    }else{
      if(audioRef.current){audioRef.current.onended=null;audioRef.current.pause();}
      const a=new Audio(url);a.preload='auto';
      a.onended=()=>onEndedRef.current();a.onerror=()=>onErrRef.current();
      audioRef.current=a;a.play().catch(()=>{});
    }
    setIsPlaying(true);setPlayingKey(`${sn}-${nis}`);setPlayingSn(sn);
    preloadNext(sn,nis);
  };

  const playSurahFrom=(sn:number,startNis:number)=>{
    const maxNis=SURAHS.find(s=>s.id===sn)?.c||1;
    playQueueRef.current={sn,nis:startNis,maxNis};
    playVerse(sn,startNis);
  };

  const stopAudio=()=>{
    if(audioRef.current){audioRef.current.onended=null;audioRef.current.pause();}
    nextAudioRef.current=null;
    setIsPlaying(false);setPlayingKey("");setPlayingSn(0);playQueueRef.current=null;
  };

  const togglePlay=()=>{
    if(isPlaying){if(audioRef.current)audioRef.current.pause();setIsPlaying(false);}
    else if(audioRef.current&&audioRef.current.src){audioRef.current.play().catch(()=>{});setIsPlaying(true);}
    else playSurahFrom(surah.id,1);
  };

  const skipNext=()=>{const q=playQueueRef.current;if(q&&q.nis<q.maxNis){q.nis++;playVerse(q.sn,q.nis);}};
  const skipPrev=()=>{const q=playQueueRef.current;if(q&&q.nis>1){q.nis--;playVerse(q.sn,q.nis);}};

  const ensureVerseVisible=(sn:number,nis:number)=>{
    const data=qc.getQueryData<any[]>(["qp",pgRef.current]);
    if(data&&!data.some((a:any)=>a.sn===sn&&a.nis===nis)){
      if(pgRef.current>1)setPg(pgRef.current-1);
    }
  };

  onEndedRef.current=()=>{
    const q=playQueueRef.current;
    if(q&&q.nis<q.maxNis&&getReciter().ev){q.nis++;ensureVerseVisible(q.sn,q.nis);playVerse(q.sn,q.nis);}
    else stopAudio();
  };
  onErrRef.current=()=>{const q=playQueueRef.current;if(q&&q.nis<q.maxNis)skipNext();else stopAudio();};

  const handleReciterChange=(newId:string)=>{
    setRecId(newId);recIdRef.current=newId;
    const q=playQueueRef.current;
    if(q&&isPlaying){
      if(audioRef.current){audioRef.current.onended=null;audioRef.current.pause();}
      nextAudioRef.current=null;
      setTimeout(()=>playVerse(q.sn,q.nis),100);
    }
  };

  // Hifz
  const startHifz=useCallback(()=>{
    const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
    if(!SR){alert("جرب Chrome");return;}
    const r=new SR();r.lang="ar-SA";r.continuous=true;r.interimResults=true;r.maxAlternatives=5;
    r.onresult=(e:any)=>{
      let txt="";for(let i=e.resultIndex;i<e.results.length;i++)for(let j=0;j<e.results[i].length;j++)txt+=" "+e.results[i][j].transcript;
      setRecTxt(txt.trim());if(!pq.data)return;
      const exp=pq.data[hifzIdx];if(!exp)return;
      const ew=strip(exp.text).split(' ').filter((w:string)=>w.length>1);
      const sw=strip(txt).split(' ');
      let m=0;for(const w of ew)if(sw.some((s:string)=>s.includes(w)||w.includes(s)||(w.length>2&&s.length>2&&w.slice(0,3)===s.slice(0,3))))m++;
      const ratio=ew.length>0?m/ew.length:0;
      if(ew.length>0&&e.results[e.results.length-1].isFinal&&(ratio>=0.2||m>=2)){
        const k=`${exp.sn}-${exp.nis}`;
        setHifzRes(prev=>{const n=new Map(prev);n.set(k,ratio>=0.5?"ok":"err");return n;});
        setHifzIdx(prev=>Math.min(prev+1,(pq.data?.length||1)-1));setRecTxt("");
      }
    };
    r.onerror=()=>{};r.onend=()=>{if(recording)try{r.start();}catch{}};
    recRef.current=r;r.start();setRecording(true);
  },[hifzIdx,pq.data,recording]);

  const stopHifz=useCallback(()=>{if(recRef.current){recRef.current.onend=null;try{recRef.current.stop();}catch{}recRef.current=null;}setRecording(false);},[]);
  const reveal=(i:number)=>{if(!pq.data)return;const a=pq.data[i];setHifzRes(prev=>{const m=new Map(prev);m.set(`${a.sn}-${a.nis}`,"err");return m;});if(i===hifzIdx)setHifzIdx(prev=>Math.min(prev+1,(pq.data?.length||1)-1));};

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
    const c=QBG[qTheme]||QBG.dark;
    const cv=document.createElement('canvas');cv.width=800;cv.height=900;
    const ctx=cv.getContext('2d');if(!ctx)return;
    // Background matches theme
    ctx.fillStyle=c.bg;ctx.fillRect(0,0,800,900);
    // Ornamental border
    ctx.strokeStyle='#C8A96E';ctx.lineWidth=3;ctx.strokeRect(20,20,760,860);
    ctx.strokeStyle='#C8A96E40';ctx.lineWidth=1;ctx.strokeRect(30,30,740,840);
    // Surah name header
    const sname=SURAHS.find(s=>s.id===selVerse.sn)?.n||'';
    ctx.font='bold 22px sans-serif';ctx.fillStyle='#C8A96E';ctx.textAlign='center';
    ctx.fillText(`سورة ${sname}`,400,65);
    // Decorative line
    ctx.strokeStyle='#C8A96E60';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(150,80);ctx.lineTo(650,80);ctx.stroke();
    // Verse text
    ctx.font='32px "Amiri Quran","KFGQPC Uthmanic Script HAFS",serif';
    ctx.fillStyle=c.text;ctx.textAlign='center';ctx.direction='rtl';
    const words=text.split(' ');let line='';let y=140;
    for(const w of words){const test=line+w+' ';if(ctx.measureText(test).width>700&&line){ctx.fillText(line.trim(),400,y);y+=55;line=w+' ';}else line=test;}
    if(line)ctx.fillText(line.trim(),400,y);
    // Reference
    ctx.font='18px sans-serif';ctx.fillStyle='#C8A96E';ctx.fillText(`${sname}: ${refs}`,400,y+70);
    // Watermark
    ctx.font='12px sans-serif';ctx.fillStyle='#C8A96E40';ctx.fillText('mihrabapp.com',400,y+100);
    cv.toBlob(blob=>{
      if(!blob)return;
      const dl=document.createElement('a');dl.href=URL.createObjectURL(blob);dl.download=`Quran_${selVerse.sn}_${refs}.png`;
      const file=new File([blob],'ayah.png',{type:'image/png'});
      if(navigator.share&&navigator.canShare?.({files:[file]}))navigator.share({files:[file]}).catch(()=>dl.click());
      else dl.click();
    },'image/png');
  };

  const doShare=async()=>{
    if(!selVerse)return;const{text,refs}=await getShareRange();
    if(shareMode==='image'){shareAsImage(text,refs);return;}
    let t=text;if(shareMode==='noharakat')t=t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,'');
    const full=`${t}\n\n${SURAHS.find(s=>s.id===selVerse.sn)?.n}: ${refs}\nmihrabapp.com`;
    if(navigator.share)navigator.share({text:full}).catch(()=>{});
    else{navigator.clipboard.writeText(full);alert("تم النسخ!");}
    setShowSharePage(false);
  };

  // Groups
  const groups:{sn:number;sname:string;ayahs:{nis:number;text:string;gi:number}[]}[]=[];
  if(pq.data){let cur:typeof groups[0]|null=null;pq.data.forEach((a:any,i:number)=>{if(!cur||cur.sn!==a.sn){cur={sn:a.sn,sname:a.sname,ayahs:[]};groups.push(cur);}cur.ayahs.push({nis:a.nis,text:a.text,gi:i});});}
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
      {/* TOP BAR */}
      {showUI&&<div className="fixed top-0 left-0 right-0 z-50" style={{paddingTop:'env(safe-area-inset-top,0px)',background:colors.bg,borderBottom:`1px solid ${colors.border}40`}}>
        <div className="flex items-center justify-between px-3" style={{height:40}}>
          {/* Right side: Surah name */}
          <div className="flex items-center gap-2">
            <a href="/" className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><ArrowRight className="w-4 h-4"/></a>
            <span className="text-[13px] font-bold" style={{color:colors.text}}>{surah.n}</span>
          </div>
          {/* Center: controls */}
          <div className="flex items-center gap-1">
            <button onClick={()=>setShowSearch(true)} className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><Search className="w-3.5 h-3.5"/></button>
            <button onClick={()=>setShowSettings(!showSettings)} className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><Settings className="w-3.5 h-3.5"/></button>
            <button onClick={()=>{setHifz(!hifz);if(hifz)stopHifz();resetHifz();}} className={`p-1.5 rounded-lg ${hifz?'bg-amber-500 text-white':'opacity-60 hover:opacity-100'}`} style={hifz?{}:{color:colors.text}}>
              <Mic className="w-3.5 h-3.5"/></button>
          </div>
          {/* Left side: Juz */}
          <span className="text-[12px] font-bold" style={{color:colors.text+'90'}}>الجزء {juz}</span>
        </div>
      </div>}

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
          <div className="bg-primary p-3 shrink-0"><div className="relative">
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
              </div></div>
            <div><h3 className="text-xs font-bold mb-1.5 opacity-60">التفسير</h3>
              <div className="flex gap-2">
                <button onClick={async()=>{try{const r=await fetch(`https://api.alquran.cloud/v1/ayah/${selVerse.sn}:${selVerse.nis}/ar.muyassar`);const d=await r.json();alert(d.data.text);}catch{alert("فشل");}}} className="flex-1 py-2.5 rounded-xl bg-muted text-sm flex items-center justify-center gap-1"><BookOpen className="w-4 h-4 text-primary"/>الميسر</button>
                <button onClick={async()=>{try{const r=await fetch(`https://api.alquran.cloud/v1/ayah/${selVerse.sn}:${selVerse.nis}/ar.jalalayn`);const d=await r.json();alert(d.data.text);}catch{alert("فشل");}}} className="flex-1 py-2.5 rounded-xl bg-muted text-sm flex items-center justify-center gap-1"><BookOpen className="w-4 h-4 text-primary"/>الجلالين</button>
              </div></div>
            <button onClick={()=>{setShowOptions(false);setShowSharePage(true);}} className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-bold flex items-center justify-center gap-1"><Share2 className="w-4 h-4"/>مشاركة / حفظ كصورة</button>
          </div>
        </div>
      </div>}

      {/* HIFZ */}
      {hifz&&showUI&&<div className="fixed left-0 right-0 z-40 px-3 py-1.5" style={{top:'calc(48px + env(safe-area-inset-top,0px))',background:colors.bg,borderBottom:`1px solid ${colors.border}`}}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold">🎤 الحفظ</span>
          <div className="flex gap-1">
            <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">✓{[...hifzRes.values()].filter(v=>v==="ok").length}</span>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">✗{[...hifzRes.values()].filter(v=>v==="err").length}</span>
          </div></div>
        <div className="flex gap-1.5 mt-1">
          <button onClick={()=>recording?stopHifz():startHifz()} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 ${recording?"bg-red-500 text-white animate-pulse":"bg-amber-500 text-white"}`}>
            {recording?<><MicOff className="w-3 h-3"/>إيقاف</>:<><Mic className="w-3 h-3"/>ابدأ</>}</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:colors.border+'40',color:colors.text}}>كشف</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:colors.border+'40',color:colors.text}}>تخطي</button>
        </div>
      </div>}

      {/* ═══ MUSHAF ═══ */}
      <div className="overflow-y-auto"
        style={{height:`calc(100dvh - ${showUI?40:0}px - ${hifz&&showUI?46:0}px - ${playingSn?72:0}px - env(safe-area-inset-top,0px))`,
          marginTop:(showUI?40:0)+(hifz&&showUI?46:0),paddingTop:4}}
        onClick={e=>{if(!(e.target as HTMLElement).closest('[data-v]'))setShowUI(!showUI);}}
        onTouchStart={onTS} onTouchEnd={onTE}>
        {pq.isLoading?<div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" style={{color:colors.text}}/></div>
        :pq.error?<div className="h-full flex items-center justify-center flex-col gap-2"><p>فشل</p><Button onClick={()=>pq.refetch()} size="sm" variant="outline">إعادة</Button></div>
        :<div className="flex flex-col justify-center px-4 md:px-6" style={{maxWidth:680,margin:'0 auto',width:'100%',minHeight:'100%'}}>
          {groups.map((g,gi)=><div key={`${g.sn}-${gi}`}>
            {/* Decorated Surah Header - ornamental like Ayah */}
            {g.ayahs[0].nis===1&&<div className="text-center my-3">
              <div className="inline-block relative px-10 py-2" style={{background:`linear-gradient(135deg,${colors.border}15,${colors.border}08)`}}>
                <div className="absolute inset-0 border-2 rounded-xl" style={{borderColor:colors.border}}/>
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-lg" style={{color:colors.border}}>❁</div>
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-lg" style={{color:colors.border}}>❁</div>
                <span className="font-quran font-bold relative z-10" style={{fontSize:'clamp(18px,4.5vw,26px)',color:colors.text}}>سُورَةُ {g.sname.replace(/^سُورَةُ\s*/,'')}</span>
              </div>
            </div>}
            {/* Bismillah - once, separate (not for Fatiha where it's verse 1, not for Tawbah) */}
            {g.ayahs[0].nis===1&&g.sn!==9&&g.sn!==1&&<div className="text-center mb-1">
              <p className="font-quran" style={{fontSize:'clamp(16px,4vw,22px)',color:colors.text}}>بِسْمِ ٱللَّهِ ٱلرَّحْمَنِ ٱلرَّحِيمِ</p>
            </div>}
            {/* Verses */}
            <div className="text-center font-quran" dir="rtl" style={{fontSize:'clamp(20px,5vw,28px)',lineHeight:'2.2',color:colors.text}}>
              {g.ayahs.map(a=>{
                const k=`${g.sn}-${a.nis}`;const hr=hifzRes.get(k);const hidden=hifz&&!hr&&a.gi>=hifzIdx;const cur=hifz&&a.gi===hifzIdx;
                const isP=playingKey===k;const isSel=selVerse?.sn===g.sn&&selVerse?.nis===a.nis;
                return<span key={k} className="inline" data-v="1">
                  <span onClick={e=>{e.stopPropagation();if(!hifz){setSelVerse({sn:g.sn,nis:a.nis,text:a.text});setShowOptions(true);}}}
                    className="transition-all duration-200 rounded cursor-pointer"
                    style={{
                      color:hidden?'transparent':isP?'#fff':hr==='ok'?'#4ade80':hr==='err'?'#f87171':colors.text,
                      background:isP?colors.hi:isSel?colors.hi:cur?'rgba(245,158,11,0.12)':'transparent',
                      padding:(isP||isSel)?'2px 4px':'0',borderRadius:(isP||isSel)?'6px':'0',
                    }}>
                    {hidden?a.text.replace(/[^\s]/g,"\u00B7"):a.text}
                  </span>
                  {/* Golden verse marker */}
                  <span className="inline-flex items-center justify-center rounded-full align-middle font-sans font-bold mx-0.5"
                    style={{width:'2.4em',height:'2.4em',fontSize:'0.5em',verticalAlign:'middle',
                      border:`2px solid ${isP?'#22c55e':'#c8a96e'}`,
                      color:isP?'#22c55e':'#8b7355',
                      background:isP?'rgba(34,197,94,0.1)':'rgba(200,169,110,0.08)'
                    }}>{hidden?"؟":a.nis}</span>
                </span>;
              })}
            </div>
          </div>)}
          {/* Page number - centered with ornamental lines */}
          <div className="flex items-center justify-center gap-2 mt-2 mb-1">
            <div className="w-16 h-px" style={{background:`linear-gradient(to left,${colors.border},transparent)`}}/>
            <span className="text-[13px] font-bold font-sans" style={{color:'#c8a96e'}}>{pg}</span>
            <div className="w-16 h-px" style={{background:`linear-gradient(to right,${colors.border},transparent)`}}/>
          </div>
          {/* Desktop navigation */}
          {!isMobile&&showUI&&<div className="flex justify-center gap-3 mt-1 mb-3">
            <button onClick={()=>{if(pg>1)setPg(p=>p-1);}} disabled={pg<=1} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold disabled:opacity-30 flex items-center gap-1"><ChevronRight className="w-4 h-4"/>التالية</button>
            <button onClick={()=>{if(pg<604)setPg(p=>p+1);}} disabled={pg>=604} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold disabled:opacity-30 flex items-center gap-1">السابقة<ChevronLeft className="w-4 h-4"/></button>
          </div>}
        </div>}
      </div>

      {/* ═══ BOTTOM PLAYER ═══ */}
      {playingSn>0&&<div className="fixed left-0 right-0 bottom-0 z-50 bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.2)]" style={{paddingBottom:'env(safe-area-inset-bottom,4px)'}}>
        <div className="flex items-center justify-between px-3 pt-2 pb-1">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <select value={recId} onChange={e=>handleReciterChange(e.target.value)} className="bg-transparent text-foreground text-[12px] border-0 outline-none min-w-0 truncate max-w-[130px]">
              {RECITERS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
            <span className="text-[10px] text-muted-foreground">| {playingName}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={skipPrev} className="p-1 text-muted-foreground"><SkipForward className="w-4 h-4"/></button>
            <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
              {isPlaying?<Pause className="w-4 h-4"/>:<Play className="w-4 h-4 ml-0.5"/>}</button>
            <button onClick={skipNext} className="p-1 text-muted-foreground"><SkipBack className="w-4 h-4"/></button>
            <button onClick={stopAudio} className="p-1"><Square className="w-4 h-4 text-red-400"/></button>
          </div>
        </div>
      </div>}
    </div>
  );
}
