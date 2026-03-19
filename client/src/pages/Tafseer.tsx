import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, X, Play, Pause, SkipForward, SkipBack, Mic, MicOff, ChevronLeft, ChevronRight, BookOpen, Menu } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Reciter { id:string; name:string; server:string; everyayah?:string; }

const R: Reciter[] = [
  { id:"maher",name:"ماهر المعيقلي",server:"https://server12.mp3quran.net/maher",everyayah:"Maher_AlMuaiqly_64kbps" },
  { id:"sudais",name:"عبدالرحمن السديس",server:"https://server11.mp3quran.net/sds",everyayah:"Abdurrahmaan_As-Sudais_192kbps" },
  { id:"afasy",name:"مشاري العفاسي",server:"https://server8.mp3quran.net/afs",everyayah:"Alafasy_128kbps" },
  { id:"minshawi",name:"محمد صديق المنشاوي",server:"https://server10.mp3quran.net/minsh",everyayah:"Minshawy_Murattal_128kbps" },
  { id:"shuraim",name:"سعود الشريم",server:"https://server7.mp3quran.net/shur",everyayah:"Saood_ash-Shuraym_128kbps" },
  { id:"husary",name:"محمود خليل الحصري",server:"https://server13.mp3quran.net/husr",everyayah:"Husary_128kbps" },
  { id:"qatami",name:"ناصر القطامي",server:"https://server10.mp3quran.net/qht",everyayah:"Nasser_Alqatami_128kbps" },
  { id:"dosari",name:"ياسر الدوسري",server:"https://server10.mp3quran.net/ibrahim_dosri/Rewayat-Hafs-A-n-Assem" },
  { id:"luhaidan",name:"محمد اللحيدان",server:"https://server8.mp3quran.net/lhdan" },
  { id:"basit",name:"عبدالباسط عبدالصمد",server:"https://server7.mp3quran.net/basit",everyayah:"Abdul_Basit_Murattal_192kbps" },
  { id:"ghamdi",name:"سعد الغامدي",server:"https://server7.mp3quran.net/s_gmd",everyayah:"Ghamadi_40kbps" },
  { id:"shatri",name:"أبو بكر الشاطري",server:"https://server11.mp3quran.net/shatri",everyayah:"Abu_Bakr_Ash-Shaatree_128kbps" },
  { id:"ajamy",name:"أحمد العجمي",server:"https://server10.mp3quran.net/ajm" },
  { id:"jbrl",name:"محمد جبريل",server:"https://server8.mp3quran.net/jbrl",everyayah:"Muhammad_Jibreel_128kbps" },
  { id:"tablawi",name:"محمد الطبلاوي",server:"https://server12.mp3quran.net/tblawi" },
  { id:"ayyub",name:"محمد أيوب",server:"https://server8.mp3quran.net/ayyub",everyayah:"Muhammad_Ayyoub_128kbps" },
  { id:"budair",name:"صلاح البدير",server:"https://server6.mp3quran.net/s_bud" },
  { id:"jleel",name:"خالد الجليل",server:"https://server10.mp3quran.net/jleel" },
  { id:"bsfr",name:"عبدالله بصفر",server:"https://server6.mp3quran.net/bsfr" },
  { id:"bukhatir",name:"صلاح بو خاطر",server:"https://server8.mp3quran.net/bu_khtr" },
  { id:"thubti",name:"عبدالبارئ الثبيتي",server:"https://server6.mp3quran.net/thubti" },
  { id:"kafi",name:"خالد عبدالكافي",server:"https://server11.mp3quran.net/kafi" },
];

const S=[{id:1,n:"الفاتحة",c:7},{id:2,n:"البقرة",c:286},{id:3,n:"آل عمران",c:200},{id:4,n:"النساء",c:176},{id:5,n:"المائدة",c:120},{id:6,n:"الأنعام",c:165},{id:7,n:"الأعراف",c:206},{id:8,n:"الأنفال",c:75},{id:9,n:"التوبة",c:129},{id:10,n:"يونس",c:109},{id:11,n:"هود",c:123},{id:12,n:"يوسف",c:111},{id:13,n:"الرعد",c:43},{id:14,n:"إبراهيم",c:52},{id:15,n:"الحجر",c:99},{id:16,n:"النحل",c:128},{id:17,n:"الإسراء",c:111},{id:18,n:"الكهف",c:110},{id:19,n:"مريم",c:98},{id:20,n:"طه",c:135},{id:21,n:"الأنبياء",c:112},{id:22,n:"الحج",c:78},{id:23,n:"المؤمنون",c:118},{id:24,n:"النور",c:64},{id:25,n:"الفرقان",c:77},{id:26,n:"الشعراء",c:227},{id:27,n:"النمل",c:93},{id:28,n:"القصص",c:88},{id:29,n:"العنكبوت",c:69},{id:30,n:"الروم",c:60},{id:31,n:"لقمان",c:34},{id:32,n:"السجدة",c:30},{id:33,n:"الأحزاب",c:73},{id:34,n:"سبأ",c:54},{id:35,n:"فاطر",c:45},{id:36,n:"يس",c:83},{id:37,n:"الصافات",c:182},{id:38,n:"ص",c:88},{id:39,n:"الزمر",c:75},{id:40,n:"غافر",c:85},{id:41,n:"فصلت",c:54},{id:42,n:"الشورى",c:53},{id:43,n:"الزخرف",c:89},{id:44,n:"الدخان",c:59},{id:45,n:"الجاثية",c:37},{id:46,n:"الأحقاف",c:35},{id:47,n:"محمد",c:38},{id:48,n:"الفتح",c:29},{id:49,n:"الحجرات",c:18},{id:50,n:"ق",c:45},{id:51,n:"الذاريات",c:60},{id:52,n:"الطور",c:49},{id:53,n:"النجم",c:62},{id:54,n:"القمر",c:55},{id:55,n:"الرحمن",c:78},{id:56,n:"الواقعة",c:96},{id:57,n:"الحديد",c:29},{id:58,n:"المجادلة",c:22},{id:59,n:"الحشر",c:24},{id:60,n:"الممتحنة",c:13},{id:61,n:"الصف",c:14},{id:62,n:"الجمعة",c:11},{id:63,n:"المنافقون",c:11},{id:64,n:"التغابن",c:18},{id:65,n:"الطلاق",c:12},{id:66,n:"التحريم",c:12},{id:67,n:"الملك",c:30},{id:68,n:"القلم",c:52},{id:69,n:"الحاقة",c:52},{id:70,n:"المعارج",c:44},{id:71,n:"نوح",c:28},{id:72,n:"الجن",c:28},{id:73,n:"المزمل",c:20},{id:74,n:"المدثر",c:56},{id:75,n:"القيامة",c:40},{id:76,n:"الإنسان",c:31},{id:77,n:"المرسلات",c:50},{id:78,n:"النبأ",c:40},{id:79,n:"النازعات",c:46},{id:80,n:"عبس",c:42},{id:81,n:"التكوير",c:29},{id:82,n:"الانفطار",c:19},{id:83,n:"المطففين",c:36},{id:84,n:"الانشقاق",c:25},{id:85,n:"البروج",c:22},{id:86,n:"الطارق",c:17},{id:87,n:"الأعلى",c:19},{id:88,n:"الغاشية",c:26},{id:89,n:"الفجر",c:30},{id:90,n:"البلد",c:20},{id:91,n:"الشمس",c:15},{id:92,n:"الليل",c:21},{id:93,n:"الضحى",c:11},{id:94,n:"الشرح",c:8},{id:95,n:"التين",c:8},{id:96,n:"العلق",c:19},{id:97,n:"القدر",c:5},{id:98,n:"البينة",c:8},{id:99,n:"الزلزلة",c:8},{id:100,n:"العاديات",c:11},{id:101,n:"القارعة",c:11},{id:102,n:"التكاثر",c:8},{id:103,n:"العصر",c:3},{id:104,n:"الهمزة",c:9},{id:105,n:"الفيل",c:5},{id:106,n:"قريش",c:4},{id:107,n:"الماعون",c:7},{id:108,n:"الكوثر",c:3},{id:109,n:"الكافرون",c:6},{id:110,n:"النصر",c:3},{id:111,n:"المسد",c:5},{id:112,n:"الإخلاص",c:4},{id:113,n:"الفلق",c:5},{id:114,n:"الناس",c:6}];

const PS:Record<number,number>={1:1,2:2,3:50,4:77,5:106,6:128,7:151,8:177,9:187,10:208,11:221,12:235,13:249,14:255,15:262,16:267,17:282,18:293,19:305,20:312,21:322,22:332,23:342,24:350,25:359,26:367,27:377,28:385,29:396,30:404,31:411,32:415,33:418,34:428,35:434,36:440,37:446,38:453,39:458,40:467,41:477,42:483,43:489,44:496,45:499,46:502,47:507,48:511,49:515,50:518,51:520,52:523,53:526,54:528,55:531,56:534,57:537,58:542,59:545,60:549,61:551,62:553,63:554,64:556,65:558,66:560,67:562,68:564,69:566,70:568,71:570,72:572,73:574,74:575,75:577,76:578,77:580,78:582,79:583,80:585,81:586,82:587,83:587,84:589,85:590,86:591,87:591,88:592,89:593,90:594,91:595,92:595,93:596,94:596,95:597,96:597,97:598,98:598,99:599,100:599,101:600,102:600,103:601,104:601,105:601,106:602,107:602,108:602,109:603,110:603,111:603,112:604,113:604,114:604};

const norm=(t:string)=>t.replace(/\u0671/g,'\u0627').replace(/\uFEFF/g,'');
const strip=(t:string)=>t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[ٱإأآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,' ').trim();
const pad3=(n:number)=>String(n).padStart(3,'0');

function getSurahForPage(p:number){let s=1;for(const id of Object.keys(PS).map(Number)){if(PS[id]<=p)s=id;else break;}return S[s-1];}

const fetchPage=async(p:number)=>{
  const r=await fetch(`https://api.alquran.cloud/v1/page/${p}/quran-uthmani`);
  if(!r.ok)throw new Error("Failed");const d=await r.json();
  return d.data.ayahs.map((a:any)=>({num:a.number,nis:a.numberInSurah,sn:a.surah.number,sname:a.surah.name,text:norm(a.text)}));
};

export default function QuranPage(){
  useSeo({title:"القرآن الكريم - محراب",description:"اقرأ القرآن الكريم بخط المصحف",keywords:"القرآن،قرآن،تلاوة",canonicalPath:"/tafseer"});

  const qc=useQueryClient();
  const [pg,setPg]=useState(1);
  const [rec,setRec]=useState("maher");
  const [showSearch,setShowSearch]=useState(false);
  const [search,setSearch]=useState("");
  const [showUI,setShowUI]=useState(true);
  const [sel,setSel]=useState<{sn:number;nis:number;text:string}|null>(null);
  const [playing,setPlaying]=useState(false);
  const [hifz,setHifz]=useState(false);
  const [recording,setRecording]=useState(false);
  const [hifzIdx,setHifzIdx]=useState(0);
  const [hifzRes,setHifzRes]=useState<Map<string,"ok"|"err">>(new Map());
  const [recTxt,setRecTxt]=useState("");

  const audioRef=useRef<HTMLAudioElement|null>(null);
  const recRef=useRef<any>(null);
  const txRef=useRef(0);
  const searchRef=useRef<HTMLInputElement>(null);

  const reciter=R.find(r=>r.id===rec)||R[0];
  const surah=getSurahForPage(pg);

  // Fetch current page
  const pq=useQuery({queryKey:["qp",pg],queryFn:()=>fetchPage(pg)});

  // Prefetch adjacent pages
  useEffect(()=>{
    if(pg<604)qc.prefetchQuery({queryKey:["qp",pg+1],queryFn:()=>fetchPage(pg+1)});
    if(pg>1)qc.prefetchQuery({queryKey:["qp",pg-1],queryFn:()=>fetchPage(pg-1)});
  },[pg,qc]);

  // Swipe
  const onTS=useCallback((e:React.TouchEvent)=>{txRef.current=e.touches[0].clientX;},[]);
  const onTE=useCallback((e:React.TouchEvent)=>{
    const d=txRef.current-e.changedTouches[0].clientX;
    if(d>50&&pg>1){setPg(p=>p-1);setHifzIdx(0);setHifzRes(new Map());setRecTxt("");}
    else if(d<-50&&pg<604){setPg(p=>p+1);setHifzIdx(0);setHifzRes(new Map());setRecTxt("");}
  },[pg]);

  // Audio
  const playVerse=(sn:number,nis:number)=>{
    if(audioRef.current){audioRef.current.pause();}
    const f=reciter.everyayah;
    const url=f?`https://everyayah.com/data/${f}/${pad3(sn)}${pad3(nis)}.mp3`:`${reciter.server}/${pad3(sn)}.mp3`;
    audioRef.current=new Audio(url);
    audioRef.current.onended=()=>setPlaying(false);
    audioRef.current.play().catch(()=>{});
    setPlaying(true);
  };
  const stopAudio=()=>{if(audioRef.current){audioRef.current.pause();setPlaying(false);}};

  // Hifz voice
  const startHifz=useCallback(()=>{
    const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
    if(!SR){alert("المتصفح لا يدعم التعرف على الصوت. جرب Chrome.");return;}
    const r=new SR();r.lang="ar-SA";r.continuous=true;r.interimResults=true;r.maxAlternatives=5;
    r.onresult=(e:any)=>{
      let txt="";for(let i=0;i<e.results.length;i++)for(let j=0;j<e.results[i].length;j++)txt+=" "+e.results[i][j].transcript;
      setRecTxt(txt.trim());
      if(!pq.data)return;
      const exp=pq.data[hifzIdx];if(!exp)return;
      const ew=strip(exp.text).split(' ').filter((w:string)=>w.length>1);
      const sw=strip(txt).split(' ');
      let m=0;for(const w of ew)if(sw.some((s:string)=>s.includes(w)||w.includes(s)||(w.length>2&&s.length>2&&w.slice(0,2)===s.slice(0,2))))m++;
      if(ew.length>0&&(m/ew.length>=0.25||m>=2)){
        const k=`${exp.sn}-${exp.nis}`;
        setHifzRes(prev=>{const n=new Map(prev);n.set(k,m/ew.length>=0.5?"ok":"err");return n;});
        setHifzIdx(prev=>Math.min(prev+1,(pq.data?.length||1)-1));
        setRecTxt("");
        try{r.stop();}catch(e){}setTimeout(()=>{try{r.start();}catch(e){}},200);
      }
    };
    r.onerror=()=>{};r.onend=()=>{if(recording)try{r.start();}catch(e){}};
    recRef.current=r;r.start();setRecording(true);
  },[hifzIdx,pq.data,recording]);

  const stopHifz=useCallback(()=>{if(recRef.current){recRef.current.onend=null;try{recRef.current.stop();}catch(e){}recRef.current=null;}setRecording(false);},[]);
  const reveal=(i:number)=>{if(!pq.data)return;const a=pq.data[i];setHifzRes(prev=>{const m=new Map(prev);m.set(`${a.sn}-${a.nis}`,"err");return m;});if(i===hifzIdx)setHifzIdx(prev=>Math.min(prev+1,(pq.data?.length||1)-1));};

  useEffect(()=>{return()=>{stopHifz();stopAudio();};},[]);
  useEffect(()=>{if(showSearch&&searchRef.current)setTimeout(()=>searchRef.current?.focus(),100);},[showSearch]);

  const goSurah=(id:number)=>{setPg(PS[id]||1);setShowSearch(false);setSearch("");setSel(null);setHifz(false);stopHifz();setHifzIdx(0);setHifzRes(new Map());};
  const filtered=search.trim()?S.filter(s=>s.n.includes(search)||s.id.toString()===search.trim()):S;

  // Group by surah
  const groups:{sn:number;sname:string;ayahs:{nis:number;text:string;gi:number}[]}[]=[];
  if(pq.data){let cur:typeof groups[0]|null=null;pq.data.forEach((a:any,i:number)=>{if(!cur||cur.sn!==a.sn){cur={sn:a.sn,sname:a.sname,ayahs:[]};groups.push(cur);}cur.ayahs.push({nis:a.nis,text:a.text,gi:i});});}

  return(
    <div className="min-h-screen bg-background select-none">
      {/* TOP BAR */}
      {showUI&&<div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-md" style={{height:44}}>
        <div className="flex items-center justify-between px-3 h-full">
          <button onClick={()=>setShowSearch(true)} className="p-2 hover:bg-white/10 rounded-lg"><Search className="w-5 h-5"/></button>
          <div className="text-center flex-1"><span className="text-sm font-bold">{surah.n}</span><span className="text-[10px] opacity-60 block">{pg}</span></div>
          <button onClick={()=>{setHifz(!hifz);if(hifz)stopHifz();setHifzIdx(0);setHifzRes(new Map());}} className={`p-2 rounded-lg ${hifz?"bg-amber-500":"hover:bg-white/10"}`}><Mic className="w-5 h-5"/></button>
        </div>
      </div>}

      {/* SEARCH */}
      {showSearch&&<div className="fixed inset-0 z-[60] bg-black/50" onClick={()=>setShowSearch(false)}>
        <div className="bg-card h-full w-full max-w-md ml-auto overflow-y-auto animate-in slide-in-from-right duration-200" onClick={e=>e.stopPropagation()}>
          <div className="sticky top-0 bg-primary p-3"><div className="relative">
            <Input ref={searchRef} placeholder="ابحث عن سورة..." value={search} onChange={e=>setSearch(e.target.value)} className="text-right pl-10 h-10 rounded-xl bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/40" dir="rtl"/>
            <button onClick={()=>setShowSearch(false)} className="absolute left-3 top-2.5"><X className="w-5 h-5 text-white/60"/></button>
          </div></div>
          <div className="p-2">{filtered.map(s=><button key={s.id} onClick={()=>goSurah(s.id)} className="w-full text-right p-3 rounded-lg hover:bg-muted flex items-center gap-3">
            <span className="w-7 h-7 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{s.id}</span>
            <span className="font-bold text-sm flex-1">{s.n}</span><span className="text-[11px] text-muted-foreground">{s.c} آية</span>
          </button>)}</div>
        </div>
      </div>}

      {/* VERSE POPUP */}
      {sel&&<div className="fixed inset-0 z-[55] flex items-end" onClick={()=>{setSel(null);stopAudio();}}>
        <div className="w-full bg-card rounded-t-2xl shadow-2xl p-4 border-t border-border animate-in slide-in-from-bottom duration-200" onClick={e=>e.stopPropagation()}>
          <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-3"/>
          <p className="text-right font-quran text-lg text-foreground leading-[2.2] mb-3" dir="rtl">{sel.text}</p>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-right">التلاوة</p>
            <div className="flex gap-2">
              <Select value={rec} onValueChange={setRec}><SelectTrigger className="flex-1 h-9 text-xs"><SelectValue/></SelectTrigger>
                <SelectContent className="max-h-[200px]">{R.map(r=><SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}</SelectContent></Select>
              <button onClick={()=>playing?stopAudio():playVerse(sel.sn,sel.nis)} className="w-10 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                {playing?<Pause className="w-4 h-4"/>:<Play className="w-4 h-4 ml-0.5"/>}
              </button>
            </div>
          </div>
          <button onClick={()=>{setSel(null);stopAudio();}} className="w-full mt-3 py-2 rounded-xl bg-muted text-muted-foreground text-sm">إغلاق</button>
        </div>
      </div>}

      {/* HIFZ BAR */}
      {hifz&&showUI&&<div className="fixed left-0 right-0 z-40 bg-amber-50 dark:bg-amber-950/90 border-b border-amber-200 dark:border-amber-800 px-3 py-2" style={{top:44}}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">🎤 الحفظ</span>
          <div className="flex gap-1">
            <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 px-2 py-0.5 rounded-full">✓{[...hifzRes.values()].filter(v=>v==="ok").length}</span>
            <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-700 px-2 py-0.5 rounded-full">✗{[...hifzRes.values()].filter(v=>v==="err").length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>recording?stopHifz():startHifz()} className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 ${recording?"bg-red-500 text-white animate-pulse":"bg-amber-500 text-white"}`}>
            {recording?<><MicOff className="w-3.5 h-3.5"/>إيقاف</>:<><Mic className="w-3.5 h-3.5"/>ابدأ</>}
          </button>
          <button onClick={()=>reveal(hifzIdx)} className="px-3 py-2 rounded-lg bg-amber-200 dark:bg-amber-800 text-xs font-bold">كشف</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-3 py-2 rounded-lg bg-amber-200 dark:bg-amber-800 text-xs font-bold">تخطي</button>
        </div>
        {recTxt&&<p className="text-[10px] text-amber-600 mt-1 text-right truncate" dir="rtl">🎙️ {recTxt}</p>}
      </div>}

      {/* ═══ MUSHAF PAGE ═══ */}
      <div style={{paddingTop:showUI?(hifz?100:44):0}} className="min-h-screen flex flex-col"
        onClick={e=>{if(!(e.target as HTMLElement).closest('[data-v]'))setShowUI(!showUI);}}
        onTouchStart={onTS} onTouchEnd={onTE}>

        {pq.isLoading?<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary"/></div>
        :pq.error?<div className="flex-1 flex items-center justify-center flex-col gap-2"><p className="text-muted-foreground text-sm">فشل التحميل</p><Button onClick={()=>pq.refetch()} size="sm" variant="outline">إعادة</Button></div>
        :<div className="flex-1 flex flex-col justify-center px-3 py-4 sm:px-6" style={{maxWidth:560,margin:'0 auto',width:'100%'}}>
          {groups.map((g,gi)=><div key={`${g.sn}-${gi}`}>
            {g.ayahs[0].nis===1&&<div className="text-center mb-3 mt-2">
              <div className="inline-block px-8 py-2 rounded-xl border-2 border-primary/20 bg-primary/5">
                <span className="text-primary font-bold font-quran" style={{fontSize:'clamp(18px,4vw,24px)'}}>{g.sname}</span>
              </div>
              {g.sn!==1&&g.sn!==9&&<p className="font-quran text-foreground/80 mt-2" style={{fontSize:'clamp(18px,4vw,22px)'}}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>}
            </div>}
            <div className="text-center font-quran" dir="rtl" style={{fontSize:'clamp(20px,5vw,28px)',lineHeight:'3'}}>
              {g.ayahs.map(a=>{
                const k=`${g.sn}-${a.nis}`;const hr=hifzRes.get(k);const hidden=hifz&&!hr&&a.gi>=hifzIdx;const cur=hifz&&a.gi===hifzIdx;
                return<span key={k} className="inline" data-v>
                  <span onClick={e=>{e.stopPropagation();if(!hifz)setSel({sn:g.sn,nis:a.nis,text:a.text});}}
                    className={`transition-colors duration-200 px-0.5 rounded-sm ${hidden?"text-transparent":"text-foreground"} ${hr==="ok"?"!text-green-600 dark:!text-green-400":""} ${hr==="err"?"!text-red-500 dark:!text-red-400":""} ${cur?"bg-amber-500/15 rounded":""} ${!hifz?"active:bg-primary/10 cursor-pointer":""}`}>
                    {hidden?a.text.replace(/[^\s]/g,"·"):a.text}
                  </span>
                  <span className="inline-flex items-center justify-center w-6 h-6 mx-0.5 rounded-full border border-primary/20 text-[10px] text-primary/50 font-sans align-middle">{hidden?"؟":a.nis}</span>
                </span>;
              })}
            </div>
          </div>)}
          <div className="flex items-center justify-center gap-3 mt-6 mb-4"><div className="w-12 h-px bg-border"/><span className="text-[11px] text-muted-foreground font-sans">{pg}</span><div className="w-12 h-px bg-border"/></div>
        </div>}
      </div>

      {/* Desktop nav */}
      {typeof window!=='undefined'&&window.innerWidth>=768&&showUI&&<div className="fixed bottom-16 left-0 right-0 z-40 flex justify-center gap-3 py-2">
        <button onClick={()=>{if(pg<604)setPg(p=>p+1);}} disabled={pg>=604} className="px-3 py-1.5 rounded-lg bg-primary/80 text-primary-foreground text-xs disabled:opacity-30 flex items-center gap-1"><ChevronRight className="w-3 h-3"/>السابقة</button>
        <button onClick={()=>{if(pg>1)setPg(p=>p-1);}} disabled={pg<=1} className="px-3 py-1.5 rounded-lg bg-primary/80 text-primary-foreground text-xs disabled:opacity-30 flex items-center gap-1">التالية<ChevronLeft className="w-3 h-3"/></button>
      </div>}
    </div>
  );
}
