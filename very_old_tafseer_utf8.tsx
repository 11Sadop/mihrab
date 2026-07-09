import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, X, Play, Pause, SkipForward, SkipBack, Mic, MicOff, ChevronLeft, ChevronRight, BookOpen, Share2, Square, Settings, ArrowRight, Volume2 } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

interface Rec{id:string;name:string;server:string;ev?:string;}
const RECITERS:Rec[]=[
  {id:"maher",name:"┘à╪º┘ç╪▒ ╪º┘ä┘à╪╣┘è┘é┘ä┘è",server:"https://server12.mp3quran.net/maher",ev:"Maher_AlMuaiqly_64kbps"},
  {id:"afasy",name:"┘à╪┤╪º╪▒┘è ╪º┘ä╪╣┘ü╪º╪│┘è",server:"https://server8.mp3quran.net/afs",ev:"Alafasy_128kbps"},
  {id:"sudais",name:"╪╣╪¿╪»╪º┘ä╪▒╪¡┘à┘å ╪º┘ä╪│╪»┘è╪│",server:"https://server11.mp3quran.net/sds",ev:"Abdurrahmaan_As-Sudais_192kbps"},
  {id:"hosary",name:"┘à╪¡┘à┘ê╪» ╪«┘ä┘è┘ä ╪º┘ä╪¡╪╡╪▒┘è",server:"https://server13.mp3quran.net/husr",ev:"Husary_128kbps"},
  {id:"minshawi",name:"┘à╪¡┘à╪» ╪╡╪»┘è┘é ╪º┘ä┘à┘å╪┤╪º┘ê┘è",server:"https://server10.mp3quran.net/minsh",ev:"Minshawy_Mujawwad_128kbps"},
  {id:"basit",name:"╪╣╪¿╪»╪º┘ä╪¿╪º╪│╪╖ ╪╣╪¿╪»╪º┘ä╪╡┘à╪»",server:"https://server7.mp3quran.net/basit",ev:"AbdulBasit_Mujawwad_128kbps"},
  {id:"ghamdi",name:"╪│╪╣╪» ╪º┘ä╪║╪º┘à╪»┘è",server:"https://server7.mp3quran.net/s_gmd",ev:"Ghamadi_40kbps"},
  {id:"ajamy",name:"╪ú╪¡┘à╪» ╪º┘ä╪╣╪¼┘à┘è",server:"https://server10.mp3quran.net/ajm",ev:"Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net"},
  {id:"luhaidan",name:"┘à╪¡┘à╪» ╪º┘ä┘ä╪¡┘è╪»╪º┘å",server:"https://server15.mp3quran.net/lhdan",ev:"Muhammad_Al-Luhaidan_128kbps"},
  {id:"dosari",name:"┘è╪º╪│╪▒ ╪º┘ä╪»┘ê╪│╪▒┘è",server:"https://server10.mp3quran.net/ibrahim_dosri",ev:"Yasser_Ad-Dussary_128kbps"},
]

const SURAHS=[{id:1,n:"╪º┘ä┘ü╪º╪¬╪¡╪⌐",c:7},{id:2,n:"╪º┘ä╪¿┘é╪▒╪⌐",c:286},{id:3,n:"╪ó┘ä ╪╣┘à╪▒╪º┘å",c:200},{id:4,n:"╪º┘ä┘å╪│╪º╪í",c:176},{id:5,n:"╪º┘ä┘à╪º╪ª╪»╪⌐",c:120},{id:6,n:"╪º┘ä╪ú┘å╪╣╪º┘à",c:165},{id:7,n:"╪º┘ä╪ú╪╣╪▒╪º┘ü",c:206},{id:8,n:"╪º┘ä╪ú┘å┘ü╪º┘ä",c:75},{id:9,n:"╪º┘ä╪¬┘ê╪¿╪⌐",c:129},{id:10,n:"┘è┘ê┘å╪│",c:109},{id:11,n:"┘ç┘ê╪»",c:123},{id:12,n:"┘è┘ê╪│┘ü",c:111},{id:13,n:"╪º┘ä╪▒╪╣╪»",c:43},{id:14,n:"╪Ñ╪¿╪▒╪º┘ç┘è┘à",c:52},{id:15,n:"╪º┘ä╪¡╪¼╪▒",c:99},{id:16,n:"╪º┘ä┘å╪¡┘ä",c:128},{id:17,n:"╪º┘ä╪Ñ╪│╪▒╪º╪í",c:111},{id:18,n:"╪º┘ä┘â┘ç┘ü",c:110},{id:19,n:"┘à╪▒┘è┘à",c:98},{id:20,n:"╪╖┘ç",c:135},{id:21,n:"╪º┘ä╪ú┘å╪¿┘è╪º╪í",c:112},{id:22,n:"╪º┘ä╪¡╪¼",c:78},{id:23,n:"╪º┘ä┘à╪ñ┘à┘å┘ê┘å",c:118},{id:24,n:"╪º┘ä┘å┘ê╪▒",c:64},{id:25,n:"╪º┘ä┘ü╪▒┘é╪º┘å",c:77},{id:26,n:"╪º┘ä╪┤╪╣╪▒╪º╪í",c:227},{id:27,n:"╪º┘ä┘å┘à┘ä",c:93},{id:28,n:"╪º┘ä┘é╪╡╪╡",c:88},{id:29,n:"╪º┘ä╪╣┘å┘â╪¿┘ê╪¬",c:69},{id:30,n:"╪º┘ä╪▒┘ê┘à",c:60},{id:31,n:"┘ä┘é┘à╪º┘å",c:34},{id:32,n:"╪º┘ä╪│╪¼╪»╪⌐",c:30},{id:33,n:"╪º┘ä╪ú╪¡╪▓╪º╪¿",c:73},{id:34,n:"╪│╪¿╪ú",c:54},{id:35,n:"┘ü╪º╪╖╪▒",c:45},{id:36,n:"┘è╪│",c:83},{id:37,n:"╪º┘ä╪╡╪º┘ü╪º╪¬",c:182},{id:38,n:"╪╡",c:88},{id:39,n:"╪º┘ä╪▓┘à╪▒",c:75},{id:40,n:"╪║╪º┘ü╪▒",c:85},{id:41,n:"┘ü╪╡┘ä╪¬",c:54},{id:42,n:"╪º┘ä╪┤┘ê╪▒┘ë",c:53},{id:43,n:"╪º┘ä╪▓╪«╪▒┘ü",c:89},{id:44,n:"╪º┘ä╪»╪«╪º┘å",c:59},{id:45,n:"╪º┘ä╪¼╪º╪½┘è╪⌐",c:37},{id:46,n:"╪º┘ä╪ú╪¡┘é╪º┘ü",c:35},{id:47,n:"┘à╪¡┘à╪»",c:38},{id:48,n:"╪º┘ä┘ü╪¬╪¡",c:29},{id:49,n:"╪º┘ä╪¡╪¼╪▒╪º╪¬",c:18},{id:50,n:"┘é",c:45},{id:51,n:"╪º┘ä╪░╪º╪▒┘è╪º╪¬",c:60},{id:52,n:"╪º┘ä╪╖┘ê╪▒",c:49},{id:53,n:"╪º┘ä┘å╪¼┘à",c:62},{id:54,n:"╪º┘ä┘é┘à╪▒",c:55},{id:55,n:"╪º┘ä╪▒╪¡┘à┘å",c:78},{id:56,n:"╪º┘ä┘ê╪º┘é╪╣╪⌐",c:96},{id:57,n:"╪º┘ä╪¡╪»┘è╪»",c:29},{id:58,n:"╪º┘ä┘à╪¼╪º╪»┘ä╪⌐",c:22},{id:59,n:"╪º┘ä╪¡╪┤╪▒",c:24},{id:60,n:"╪º┘ä┘à┘à╪¬╪¡┘å╪⌐",c:13},{id:61,n:"╪º┘ä╪╡┘ü",c:14},{id:62,n:"╪º┘ä╪¼┘à╪╣╪⌐",c:11},{id:63,n:"╪º┘ä┘à┘å╪º┘ü┘é┘ê┘å",c:11},{id:64,n:"╪º┘ä╪¬╪║╪º╪¿┘å",c:18},{id:65,n:"╪º┘ä╪╖┘ä╪º┘é",c:12},{id:66,n:"╪º┘ä╪¬╪¡╪▒┘è┘à",c:12},{id:67,n:"╪º┘ä┘à┘ä┘â",c:30},{id:68,n:"╪º┘ä┘é┘ä┘à",c:52},{id:69,n:"╪º┘ä╪¡╪º┘é╪⌐",c:52},{id:70,n:"╪º┘ä┘à╪╣╪º╪▒╪¼",c:44},{id:71,n:"┘å┘ê╪¡",c:28},{id:72,n:"╪º┘ä╪¼┘å",c:28},{id:73,n:"╪º┘ä┘à╪▓┘à┘ä",c:20},{id:74,n:"╪º┘ä┘à╪»╪½╪▒",c:56},{id:75,n:"╪º┘ä┘é┘è╪º┘à╪⌐",c:40},{id:76,n:"╪º┘ä╪Ñ┘å╪│╪º┘å",c:31},{id:77,n:"╪º┘ä┘à╪▒╪│┘ä╪º╪¬",c:50},{id:78,n:"╪º┘ä┘å╪¿╪ú",c:40},{id:79,n:"╪º┘ä┘å╪º╪▓╪╣╪º╪¬",c:46},{id:80,n:"╪╣╪¿╪│",c:42},{id:81,n:"╪º┘ä╪¬┘â┘ê┘è╪▒",c:29},{id:82,n:"╪º┘ä╪º┘å┘ü╪╖╪º╪▒",c:19},{id:83,n:"╪º┘ä┘à╪╖┘ü┘ü┘è┘å",c:36},{id:84,n:"╪º┘ä╪º┘å╪┤┘é╪º┘é",c:25},{id:85,n:"╪º┘ä╪¿╪▒┘ê╪¼",c:22},{id:86,n:"╪º┘ä╪╖╪º╪▒┘é",c:17},{id:87,n:"╪º┘ä╪ú╪╣┘ä┘ë",c:19},{id:88,n:"╪º┘ä╪║╪º╪┤┘è╪⌐",c:26},{id:89,n:"╪º┘ä┘ü╪¼╪▒",c:30},{id:90,n:"╪º┘ä╪¿┘ä╪»",c:20},{id:91,n:"╪º┘ä╪┤┘à╪│",c:15},{id:92,n:"╪º┘ä┘ä┘è┘ä",c:21},{id:93,n:"╪º┘ä╪╢╪¡┘ë",c:11},{id:94,n:"╪º┘ä╪┤╪▒╪¡",c:8},{id:95,n:"╪º┘ä╪¬┘è┘å",c:8},{id:96,n:"╪º┘ä╪╣┘ä┘é",c:19},{id:97,n:"╪º┘ä┘é╪»╪▒",c:5},{id:98,n:"╪º┘ä╪¿┘è┘å╪⌐",c:8},{id:99,n:"╪º┘ä╪▓┘ä╪▓┘ä╪⌐",c:8},{id:100,n:"╪º┘ä╪╣╪º╪»┘è╪º╪¬",c:11},{id:101,n:"╪º┘ä┘é╪º╪▒╪╣╪⌐",c:11},{id:102,n:"╪º┘ä╪¬┘â╪º╪½╪▒",c:8},{id:103,n:"╪º┘ä╪╣╪╡╪▒",c:3},{id:104,n:"╪º┘ä┘ç┘à╪▓╪⌐",c:9},{id:105,n:"╪º┘ä┘ü┘è┘ä",c:5},{id:106,n:"┘é╪▒┘è╪┤",c:4},{id:107,n:"╪º┘ä┘à╪º╪╣┘ê┘å",c:7},{id:108,n:"╪º┘ä┘â┘ê╪½╪▒",c:3},{id:109,n:"╪º┘ä┘â╪º┘ü╪▒┘ê┘å",c:6},{id:110,n:"╪º┘ä┘å╪╡╪▒",c:3},{id:111,n:"╪º┘ä┘à╪│╪»",c:5},{id:112,n:"╪º┘ä╪Ñ╪«┘ä╪º╪╡",c:4},{id:113,n:"╪º┘ä┘ü┘ä┘é",c:5},{id:114,n:"╪º┘ä┘å╪º╪│",c:6}];

const PS:Record<number,number>={1:1,2:2,3:50,4:77,5:106,6:128,7:151,8:177,9:187,10:208,11:221,12:235,13:249,14:255,15:262,16:267,17:282,18:293,19:305,20:312,21:322,22:332,23:342,24:350,25:359,26:367,27:377,28:385,29:396,30:404,31:411,32:415,33:418,34:428,35:434,36:440,37:446,38:453,39:458,40:467,41:477,42:483,43:489,44:496,45:499,46:502,47:507,48:511,49:515,50:518,51:520,52:523,53:526,54:528,55:531,56:534,57:537,58:542,59:545,60:549,61:551,62:553,63:554,64:556,65:558,66:560,67:562,68:564,69:566,70:568,71:570,72:572,73:574,74:575,75:577,76:578,77:580,78:582,79:583,80:585,81:586,82:587,83:587,84:589,85:590,86:591,87:591,88:592,89:593,90:594,91:595,92:595,93:596,94:596,95:597,96:597,97:598,98:598,99:599,100:599,101:600,102:600,103:601,104:601,105:601,106:602,107:602,108:602,109:603,110:603,111:603,112:604,113:604,114:604};

const JUZ:Record<number,number>={1:1,22:2,42:3,62:4,82:5,102:6,121:7,142:8,162:9,182:10,201:11,222:12,242:13,262:14,282:15,302:16,322:17,342:18,362:19,382:20,402:21,422:22,442:23,462:24,482:25,502:26,522:27,542:28,562:29,582:30};
function juzForPage(p:number){let j=1;for(const pg of Object.keys(JUZ).map(Number).sort((a,b)=>a-b)){if(pg<=p)j=JUZ[pg];else break;}return j;}

// Normalize text - keep ALL marks for display except zero-width spaces
const norm=(t:string)=>t.replace(/\uFEFF/g,'').replace(/[\u06DF\u06E0\u06EA\u06EB\u06EC\u06ED\u06E9█⌐]/g,'').replace(/┘ä┘Æ╪í┘Ä╪º/g, '┘ä┘Æ┘Ç┘Ä┘ö╪º').replace(/┘ä┘Æ╪í/g, '┘ä┘Æ┘Ç┘ö').replace(/╪¿╪º┘ä╪ó╪«╪▒╪⌐/g, '╪¿┘É╪º┘ä┘Æ┘Ç┘Ä┘ö╪º╪«┘É╪▒┘Ä╪⌐┘É');
// Add space between muqatta'at letters (e.g., ╪º┘ä┘à) for better diacritic display
const spaceMuqattaat=(t:string)=>{
  // Preserve spacing for display but don't strip the actual diacritics
  const base=t.replace(/[\u064B-\u065F\u0653\u0670\u200A\u06DE\u06D6-\u06ED]/g,'');
  if(base.length>=2&&base.length<=5&&/^[╪º┘ä┘à╪▒┘â┘ç┘è╪╣╪╖╪│╪¡┘é┘å╪╡┘ä]+$/.test(base)){
    return t.replace(/([\u0621-\u064A][\u064B-\u065F\u0653\u0670\u06D6-\u06ED]*)/g,'$1 ').trim();
  }
  return t;
};
const strip=(t:string)=>t.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u0653]/g,'').replace(/[┘▒╪Ñ╪ú╪ó╪º]/g,'╪º').replace(/┘ë/g,'┘è').replace(/╪⌐/g,'┘ç').replace(/\s+/g,' ').trim();
const pad3=(n:number)=>String(n).padStart(3,'0');
function surahForPage(p:number){let s=1;for(const id of Object.keys(PS).map(Number)){if(PS[id]<=p)s=id;else break;}return SURAHS[s-1];}
function pageForVerse(sn:number,nis:number){ return 1; }

// Robust bismillah removal
const BISM_PLAIN='╪¿╪│┘à ╪º┘ä┘ä┘ç ╪º┘ä╪▒╪¡┘à┘å ╪º┘ä╪▒╪¡┘è┘à';
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
      const nc=c.replace(/[┘▒╪Ñ╪ú╪ó╪º]/g,'╪º');
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

const TAFSEER_SOURCES=[{id:'ar.muyassar',name:'╪º┘ä╪¬┘ü╪│┘è╪▒ ╪º┘ä┘à┘è╪│╪▒'},{id:'ar.jalalayn',name:'╪¬┘ü╪│┘è╪▒ ╪º┘ä╪¼┘ä╪º┘ä┘è┘å'},{id:'ar.ibn-katheer',name:'╪¬┘ü╪│┘è╪▒ ╪º╪¿┘å ┘â╪½┘è╪▒'},{id:'ar.qurtubi',name:'╪¬┘ü╪│┘è╪▒ ╪º┘ä┘é╪▒╪╖╪¿┘è'},{id:'ar.baghawi',name:'╪¬┘ü╪│┘è╪▒ ╪º┘ä╪¿╪║┘ê┘è'},{id:'ar.saddi',name:'╪¬┘ü╪│┘è╪▒ ╪º┘ä╪│╪╣╪»┘è'},{id:'ar.tabari',name:'╪¬┘ü╪│┘è╪▒ ╪º┘ä╪╖╪¿╪▒┘è'},];

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
      
      // Swap to buffer if it's ready
      if (nextPreloadedKey.current === nextKey) {
        activeAudioRef.current = activeAudioRef.current === '1' ? '2' : '1';
        const a = currentAudio();
        if (a) {
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
    if (q && q.nis < q.maxNis && a.duration > 0 && a.duration - a.currentTime <= 1.5) {
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

  useSeo({title:"┘à╪¡╪▒╪º╪¿ - ╪▒┘ü┘è┘é┘â ╪º┘ä╪Ñ╪│┘ä╪º┘à┘è",description:"┘à╪¡╪▒╪º╪¿ ╪▒┘ü┘è┘é┘â ╪º┘ä╪Ñ╪│┘ä╪º┘à┘è - ╪º┘ä┘é╪▒╪ó┘å ╪º┘ä┘â╪▒┘è┘à ┘ê╪º┘ä╪¬┘ü╪│┘è╪▒ ┘ê┘à┘ê╪º┘é┘è╪¬ ╪º┘ä╪╡┘ä╪º╪⌐",canonicalPath:"/tafseer"});
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

  // ΓòÉΓòÉΓòÉ AUDIO ΓòÉΓòÉΓòÉ
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
        title:`╪│┘ê╪▒╪⌐ ${SURAHS.find(s=>s.id===sn)?.n||''}`,
        artist:rec.name,
        album:`╪ó┘è╪⌐ ${nis}`,
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
    if(rec.ev && a && !a.src.includes('mirrors.quranicaudio.com')){
      a.src=`https://mirrors.quranicaudio.com/everyayah/${rec.ev}/${pad3(q.sn)}${pad3(q.nis)}.mp3`;
      a.play().catch(()=>skipNext());
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
    if(!SR){alert("╪¼╪▒╪¿ Chrome");return;}
    const r=new SR();r.lang="ar-SA";r.continuous=true;r.interimResults=true;r.maxAlternatives=1;
    
    r.onresult=(e:any)=>{
      const normAr = (s:string) => s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u06DF\u06E0\u06E2\u06E3\u06E5\u06E6\u06E8\u06EA\u06EB\u06EC\u06ED]/g,'')
        .replace(/[╪ú╪Ñ╪ó╪í]/g, '╪º').replace(/╪⌐/g, '┘ç').replace(/┘ë/g, '┘è').replace(/╪ñ/g, '┘ê');
        
      if(!pq.data) return;
      const exp=pq.data[hifzIdx]; if(!exp) return;

      let transcript='';
      // Use only the latest results to avoid "carrying over" previous verse matches
      const latestIdx = e.results.length - 1;
      transcript = e.results[latestIdx][0].transcript;
      
      const sw=normAr(transcript).split(' ').filter(w=>w.length>1);
      hifzTxtRef.current = transcript;
      setRecTxt(transcript);

      const ew=normAr(exp.text).split(' ').filter(w=>w.length>1);
      // More robust matching: check if many words from current verse are present in the recent transcript
      let matchedCount=0;
      const recentWindow = sw.slice(-Math.min(sw.length, ew.length + 5));
      for(const targetWord of ew) {
        if(recentWindow.some(saidWord => saidWord.includes(targetWord) || targetWord.includes(saidWord))) {
          matchedCount++;
        }
      }
      
      const completeRatio = ew.length>0 ? matchedCount/ew.length : 0;
      
      // Higher threshold (0.75) for better accuracy, must be currently memorizing
      if(completeRatio >= 0.75 && !isAdvancingRef.current){
        isAdvancingRef.current = true;
        setHifzFeedback({type:'ok',msg:'╪ú╪¡╪│┘å╪¬! Γ£à'});
        setHifzStatus('ok');
        playLocalSound('ok');
        const k=`${exp.sn}-${exp.nis}`;
        setHifzRes(prev=>{const n=new Map(prev);n.set(k,'ok');return n;});
        
        setTimeout(()=>{
          setHifzIdx(prev=>{
            const next=Math.min(prev+1,(pq.data?.length||1)-1);
            const el=document.getElementById(`ayah-${pq.data[next].nis}`);
            if(el) el.scrollIntoView({behavior:'smooth',block:'center'});
            isAdvancingRef.current = false;
            return next;
          });
          setHifzFeedback(null);
          hifzTxtRef.current = '';
          setRecTxt('');
        }, 1200);
      }
    };

    r.onerror=()=>{};
    r.onend=()=>{if(recording)try{r.start();}catch{}};
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
      const combined=ayahs.map((a:any)=>`${norm(a.text)} ∩┤┐${a.numberInSurah}∩┤╛`).join(' ');
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
    hdr.innerHTML=`<span style="font-size:40px;color:${c.text};font-weight:bold;">╪│┘Å┘ê╪▒┘Ä╪⌐┘Å ${sname}</span>`;
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
    wm.textContent='╪¬╪╖╪¿┘è┘é ┘à╪¡╪▒╪º╪¿ - mihrabapp.com';
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
      ctx.font=`█₧`; ctx.fillText('█₧',245,boxY+40);ctx.fillText('█₧',835,boxY+40);
      ctx.font=`bold 42px ${fontQ}`;ctx.fillStyle=c.text;
      ctx.fillText(`╪│┘Å┘ê╪▒┘Ä╪⌐┘Å ${sname}`,540,boxY+42);
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
      ctx.fillText(`${selVerse.sn}:${refs}${pg ? `  |  ╪╡┘ü╪¡╪⌐ ${pg}` : ''}`, 540, y + 10);
      const wmY=Math.max(y+80,cv.height-40);
      ctx.font='16px sans-serif';ctx.fillStyle=c.border;
      ctx.fillText('╪¬╪┤╪▒┘ü╪¬ ╪¿╪º┘ä┘à╪┤╪º╪▒┘â╪⌐ ╪╣╪¿╪▒ ╪¬╪╖╪¿┘è┘é ┘à╪¡╪▒╪º╪¿ - mihrabapp.com',540,wmY);
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
    else{navigator.clipboard.writeText(full);alert("╪¬┘à ╪º┘ä┘å╪│╪«!");}
    setShowSharePage(false);
  };

  // Groups
  const groups:{sn:number;sname:string;ayahs:{nis:number;text:string;gi:number;orig:string}[]}[]=[];
  if(pq.data){let cur:typeof groups[0]|null=null;pq.data.forEach((a:any,i:number)=>{if(!cur||cur.sn!==a.sn){cur={sn:a.sn,sname:a.sname,ayahs:[]};groups.push(cur);}cur.ayahs.push({nis:a.nis,text:a.text,gi:i,orig:a.orig});});}
  const filteredS=search.trim()?SURAHS.filter(s=>s.n.includes(search)||s.id.toString()===search.trim()):SURAHS;
  const playingName=playingSn?SURAHS.find(s=>s.id===playingSn)?.n:"";
  const isMobile=typeof window!=='undefined'&&window.innerWidth<768;

  // ΓòÉΓòÉΓòÉ SHARE PAGE ΓòÉΓòÉΓòÉ
  if(showSharePage&&selVerse){
    const sname=SURAHS.find(s=>s.id===selVerse.sn)?.n||"";
    const maxNis=SURAHS.find(s=>s.id===selVerse.sn)?.c||1;
    const len=shareEndNis-selVerse.nis+1;
    return(
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border" style={{paddingTop:'calc(env(safe-area-inset-top,12px) + 8px)'}}>
          <button onClick={()=>setShowSharePage(false)} className="p-2"><X className="w-5 h-5"/></button>
          <span className="text-sm font-bold">┘à╪┤╪º╪▒┘â╪⌐ ╪º┘ä╪ó┘è╪º╪¬</span>
          <span className="text-sm text-primary font-bold">{sname}: {selVerse.nis}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-5" dir="rtl">
          <div><h3 className="text-sm font-bold mb-2">┘å┘ê╪╣ ╪º┘ä┘à╪┤╪º╪▒┘â╪⌐:</h3>
            <div className="space-y-2">{([["image","≡ƒô╖ ╪╡┘ê╪▒╪⌐ (╪¡┘ü╪╕/╪Ñ╪▒╪│╪º┘ä)"],["text","≡ƒô¥ ┘å╪╡"],["noharakat","≡ƒô¥ ┘å╪╡ ╪¿╪»┘ê┘å ╪¬╪┤┘â┘è┘ä"]] as const).map(([v,l])=>(
              <button key={v} onClick={()=>setShareMode(v)} className={`w-full flex items-center justify-between p-3 rounded-xl border ${shareMode===v?"border-primary bg-primary/5 font-bold":"border-border"}`}>
                <span className="text-sm">{l}</span>{shareMode===v&&<span className="text-primary text-lg">Γ£ô</span>}
              </button>))}</div></div>
          <div><h3 className="text-sm font-bold mb-2">╪º┘ä┘å╪╖╪º┘é (╪ú┘é╪╡┘ë 20 ╪ó┘è╪⌐)</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3"><span className="text-sm text-muted-foreground w-8">┘à┘å</span>
                <div className="flex-1 p-3 rounded-xl border border-border text-sm bg-card">{sname}: ╪ó┘è╪⌐ {selVerse.nis}</div></div>
              <div className="flex items-center gap-3"><span className="text-sm text-muted-foreground w-8">╪Ñ┘ä┘ë</span>
                <select value={shareEndNis} onChange={e=>setShareEndNis(Number(e.target.value))}
                  className="flex-1 p-3 rounded-xl border border-border text-sm bg-card outline-none">
                  {Array.from({length:Math.min(20,maxNis-selVerse.nis+1)}).map((_,i)=>{const n=selVerse.nis+i;return<option key={n} value={n}>╪ó┘è╪⌐ {n}</option>})}
                </select></div></div></div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="font-quran text-center leading-[2.5]" style={{fontSize:'clamp(16px,4vw,20px)'}}>
              {shareMode==='noharakat'?selVerse.text.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,''):selVerse.text}
            </p><p className="text-center text-xs text-muted-foreground mt-2">ΓÇö {sname}: {selVerse.nis}</p></div>
        </div>
        <div className="p-4 border-t border-border" style={{paddingBottom:'calc(env(safe-area-inset-bottom,12px) + 8px)'}}>
          <button onClick={doShare} disabled={isSharing} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base">
            {isSharing?<Loader2 className="w-5 h-5 animate-spin mx-auto"/>:shareMode==='image'?`≡ƒÆ╛ ╪¡┘ü╪╕/┘à╪┤╪º╪▒┘â╪⌐ ${len} ╪ó┘è╪⌐ ┘â╪╡┘ê╪▒╪⌐`:`≡ƒôñ ┘à╪┤╪º╪▒┘â╪⌐ ${len} ╪ó┘è╪⌐`}
          </button></div>
      </div>);
  }

  return(
    <div className="select-none overflow-hidden" style={{background:colors.bg,color:colors.text,height:'100dvh'}}>
      {/* ΓòÉΓòÉΓòÉ TOP BAR (Unified) ΓòÉΓòÉΓòÉ */}
      {showUI&&<div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4" style={{paddingTop:'env(safe-area-inset-top, 20px)',background:colors.bg+'ee',borderBottom:'1px solid '+colors.border+'40',height:55}}>
          <div className="flex items-center gap-2">
            <a href="/" className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><ArrowRight className="w-4 h-4"/></a>
          </div>
          
          {/* Hifz Indicators HUD */}
          {hifz && <div className="flex gap-2 items-center bg-black/5 px-3 py-1 rounded-full scale-90">
            <div className="flex flex-col items-center"><span className={`w-2 h-2 rounded-full transition-all duration-300 ${hifzStatus==='ok'?'bg-green-500 scale-125 shadow-[0_0_8px_rgba(34,197,94,0.6)]':'bg-green-500/20'}`}/><span className="text-[8px] opacity-40 mt-0.5">╪╡╪¡┘è╪¡</span></div>
            <div className="flex flex-col items-center"><span className={`w-2 h-2 rounded-full transition-all duration-300 ${hifzStatus==='wrong'?'bg-red-500 scale-125 shadow-[0_0_8px_rgba(239,68,68,0.6)]':'bg-red-500/20'}`}/><span className="text-[8px] opacity-40 mt-0.5">╪«╪╖╪ú</span></div>
            <div className="flex flex-col items-center"><span className={`w-2 h-2 rounded-full transition-all duration-300 ${hifzStatus==='pron'?'bg-amber-500 scale-125 shadow-[0_0_8px_rgba(245,158,11,0.6)]':'bg-amber-500/20'}`}/><span className="text-[8px] opacity-40 mt-0.5">┘å╪╖┘é</span></div>
          </div>}

          <div className="flex items-center gap-1">
            <button onClick={()=>setShowSearch(true)} className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><Search className="w-4 h-4"/></button>
            <button onClick={()=>setShowSettings(!showSettings)} className="p-1.5 rounded-lg opacity-60 hover:opacity-100" style={{color:colors.text}}><Settings className="w-4 h-4"/></button>
            <button onClick={()=>{setHifz(!hifz);if(hifz)stopHifz();resetHifz();}} className={`p-1.5 rounded-lg ${hifz?'bg-amber-500 text-white shadow-md':'opacity-60 hover:opacity-100'}`} style={hifz?{}:{color:colors.text}}>
              <Mic className="w-4 h-4"/></button>
            <button onClick={()=>setShowUI(false)} className="p-1.5 rounded-lg opacity-50 hover:opacity-100" style={{color:colors.text}}><ChevronLeft className="w-4 h-4" style={{transform:'rotate(90deg)'}}/></button>
          </div>
        </div>}
      {!showUI&&<button onClick={()=>setShowUI(true)} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full flex items-center justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity shadow-sm" style={{background:colors.bg+'ee',color:colors.text,border:'1px solid '+colors.border+'50',paddingTop:'calc(env(safe-area-inset-top,0px) + 4px)',fontSize:'11px',fontWeight:700}}><ChevronLeft className="w-3 h-3" style={{transform:'rotate(-90deg)'}}/> ╪Ñ╪╕┘ç╪º╪▒</button>}


      {/* SETTINGS */}
      {showSettings&&<div className="fixed inset-0 z-[58] flex items-end" onClick={()=>setShowSettings(false)}>
        <div className="w-full bg-card rounded-t-2xl p-4 border-t border-border shadow-2xl" onClick={e=>e.stopPropagation()}>
          <h3 className="text-sm font-bold mb-3 text-center text-foreground">┘ä┘ê┘å ╪╡┘ü╪¡╪⌐ ╪º┘ä┘é╪▒╪ó┘å</h3>
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
            <Input ref={searchRef} placeholder="╪º╪¿╪¡╪½ ╪¿╪º╪│┘à ╪º┘ä╪│┘ê╪▒╪⌐ ╪ú┘ê ┘å╪╡ ╪ó┘è╪⌐..." value={search} onChange={e=>handleSearch(e.target.value)}
              className="text-right pl-10 h-10 rounded-xl bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/40" dir="rtl"/>
            <button onClick={()=>setShowSearch(false)} className="absolute left-3 top-2.5"><X className="w-5 h-5 text-white/60"/></button>
          </div></div>
          <div className="flex-1 overflow-y-auto p-2">
            {isSearchingAyahs?<div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary"/></div>:
            ayahSearchResults.length>0?ayahSearchResults.map((m,i)=><button key={i} onClick={()=>goSurah(m.surah.number)}
              className="w-full text-right p-3 rounded-lg hover:bg-muted border-b border-border/50" dir="rtl">
              <div className="flex justify-between mb-1"><span className="text-xs font-bold text-primary">{m.surah.name}</span><span className="text-[10px] text-muted-foreground">╪ó┘è╪⌐ {m.numberInSurah}</span></div>
              <p className="text-sm font-quran leading-loose">{m.text}</p>
            </button>):
            filteredS.map(s=><button key={s.id} onClick={()=>goSurah(s.id)} className="w-full text-right p-3 rounded-lg hover:bg-muted flex items-center gap-3">
              <span className="w-7 h-7 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{s.id}</span>
              <span className="font-bold text-sm flex-1">{s.n}</span><span className="text-[11px] text-muted-foreground">{s.c} ╪ó┘è╪⌐</span>
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
            <div><h3 className="text-xs font-bold mb-1.5 opacity-60">╪º┘ä┘é╪º╪▒╪ª</h3>
              <select value={recId} onChange={e=>handleReciterChange(e.target.value)} className="w-full h-10 rounded-xl border border-border bg-muted/50 text-sm px-3 mb-2 outline-none">
                {RECITERS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
              <div className="flex gap-2">
                <button onClick={()=>{playSurahFrom(selVerse.sn,selVerse.nis);setShowOptions(false);}} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-1"><Play className="w-4 h-4"/>┘à┘å ┘ç┘å╪º</button>
                <button onClick={()=>{playQueueRef.current=null;playVerse(selVerse.sn,selVerse.nis);setShowOptions(false);}} className="flex-1 py-2.5 rounded-xl bg-muted text-sm font-bold flex items-center justify-center gap-1"><Play className="w-4 h-4"/>╪º┘ä╪ó┘è╪⌐</button>
                <button onClick={()=>{toggleBookmark(`${selVerse.sn}-${selVerse.nis}`);setShowOptions(false);}} className="flex-1 py-2.5 rounded-xl bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-sm font-bold flex items-center justify-center gap-1"><BookOpen className="w-4 h-4"/>{bookmarks.has(`${selVerse.sn}-${selVerse.nis}`)?"╪Ñ╪▓╪º┘ä╪⌐ ╪º┘ä╪¡┘ü╪╕":"╪¡┘ü╪╕ ╪º┘ä╪╣┘ä╪º┘à╪⌐"}</button>
              </div></div>
            <button onClick={()=>{setShowOptions(false);setShowTafseer(true);setTafseerText('');setTafseerLoading(true);fetch(`https://api.alquran.cloud/v1/ayah/${selVerse.sn}:${selVerse.nis}/${tafseerSource}`).then(r=>r.json()).then(d=>{setTafseerText(d.data.text);setTafseerLoading(false);}).catch(()=>{setTafseerText('┘ü╪┤┘ä ┘ü┘è ╪¬╪¡┘à┘è┘ä ╪º┘ä╪¬┘ü╪│┘è╪▒');setTafseerLoading(false);});}} className="w-full py-2.5 rounded-xl bg-muted text-sm font-bold flex items-center justify-center gap-1"><BookOpen className="w-4 h-4 text-primary"/>╪º┘ä╪¬┘ü╪│┘è╪▒</button>
            <button onClick={()=>{setShowOptions(false);setShowSharePage(true);}} className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-bold flex items-center justify-center gap-1"><Share2 className="w-4 h-4"/>┘à╪┤╪º╪▒┘â╪⌐ / ╪¡┘ü╪╕ ┘â╪╡┘ê╪▒╪⌐</button>
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
          <select value={tafseerSource} onChange={e=>{setTafseerSource(e.target.value);setTafseerLoading(true);setTafseerText('');            fetch(`https://api.alquran.cloud/v1/ayah/${selVerse.sn}:${selVerse.nis}/${e.target.value}`).then(r=>r.json()).then(d=>{setTafseerText(d.data.text);setTafseerLoading(false);}).catch(()=>{setTafseerText('┘ü╪┤┘ä');setTafseerLoading(false);});          }} className="w-full h-10 rounded-xl border px-3 text-sm outline-none" style={{borderColor:colors.border,background:colors.bg,color:colors.text}}>
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
          <button onClick={()=>{const t=tafseerText;const sn=SURAHS.find(s=>s.id===selVerse.sn)?.n||'';const full=selVerse.text+'\n\n'+t+'\n\n'+sn+': '+selVerse.nis;if(navigator.share)navigator.share({text:full}).catch(()=>{});else{navigator.clipboard.writeText(full);alert("╪¬┘à ╪º┘ä┘å╪│╪«!");}}} className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1" style={{background:colors.border+'30',color:colors.text}}><Share2 className="w-4 h-4"/>┘à╪┤╪º╪▒┘â╪⌐</button>
        </div>
      </div>}

      {/* HIFZ */}
      {hifz&&showUI&&<div className="fixed left-0 right-0 z-40 px-3 py-1.5" style={{top:'calc(48px + env(safe-area-inset-top,0px))',background:colors.bg,borderBottom:`1px solid ${colors.border}`}}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold">≡ƒÄñ ╪º┘ä╪¡┘ü╪╕</span>
          {recTxt&&<span className="text-[9px] opacity-60 mr-2 truncate max-w-[150px]">≡ƒùú∩╕Å {recTxt.split(" ").slice(-4).join(" ")}</span>}
          <div className="flex gap-1">
            <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">Γ£ô{Array.from(hifzRes.values()).filter(v=>v==="ok").length}</span>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">Γ£ù{Array.from(hifzRes.values()).filter(v=>v==="err").length}</span>
          </div></div>
        {hifzFeedback&&<div className="mt-1 px-2 py-1 rounded-lg text-[11px] font-bold text-center animate-pulse" style={{background:hifzFeedback.type==='ok'?'rgba(34,197,94,0.2)':hifzFeedback.type==='wrong_verse'?'rgba(239,68,68,0.2)':'rgba(245,158,11,0.2)',color:hifzFeedback.type==='ok'?'#4ade80':hifzFeedback.type==='wrong_verse'?'#f87171':'#fbbf24'}}>{hifzFeedback.msg}{hifzFeedback.details&&<span className="block text-[10px] opacity-80 mt-0.5">{hifzFeedback.details.join(' ΓÇó ')}</span>}</div>}
        <div className="flex gap-1.5 mt-1">
          <button onClick={()=>recording?stopHifz():startHifz()} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 ${recording?"bg-red-500 text-white animate-pulse":"bg-amber-500 text-white"}`}>
            {recording?<><MicOff className="w-3 h-3"/>╪Ñ┘è┘é╪º┘ü</>:<><Mic className="w-3 h-3"/>╪º╪¿╪»╪ú</>}</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:colors.border+'40',color:colors.text}}>┘â╪┤┘ü</button>
          <button onClick={()=>reveal(hifzIdx)} className="px-2 py-1.5 rounded-lg text-[10px] font-bold" style={{background:colors.border+'40',color:colors.text}}>╪¬╪«╪╖┘è</button>
        </div>
      </div>}

      {/* ΓòÉΓòÉΓòÉ MUSHAF ΓòÉΓòÉΓòÉ */}
      <div className="overflow-y-auto scrollbar-hide flex flex-col"
        style={{height:'calc(100dvh - env(safe-area-inset-top,0px))', marginTop:(showUI?55:0)+(hifz&&showUI?46:0)}}
        onTouchStart={onTS} onTouchEnd={onTE}>
        {pq.isLoading?<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" style={{color:colors.text}}/></div>
        :pq.error?<div className="flex-1 flex items-center justify-center flex-col gap-2"><p>┘ü╪┤┘ä ╪¬╪¡┘à┘è┘ä ╪º┘ä╪╡┘ü╪¡╪⌐</p><Button onClick={()=>pq.refetch()} size="sm" variant="outline">╪Ñ╪╣╪º╪»╪⌐ ╪º┘ä┘à╪¡╪º┘ê┘ä╪⌐</Button></div>
        :<div className="flex-1 w-full max-w-2xl mx-auto px-4 md:px-8 relative min-h-full">
            <div className={`flex flex-col pt-32 pb-32 ${groups.reduce((t,gg)=>t+gg.ayahs.length,0)<15?'justify-center min-h-[70vh]':''}`}>
              {groups.map((g,gi)=>{
                const allChars=groups.reduce((t,gg)=>t+gg.ayahs.reduce((s,a)=>s+a.text.length,0),0);
                const dynSize=allChars<350?'clamp(24px, 7vw, 36px)':
                               allChars<550?'clamp(22px, 6.5vw, 32px)':
                               allChars<800?'clamp(19px, 5.5vw, 28px)':
                               'clamp(17px, 4.5vw, 24px)';
                const dynLine=allChars<350?'2.8':allChars<600?'2.4':allChars<800?'2.2':'2.1';
                
                return <div key={`${g.sn}-${gi}`} className="relative w-full">
                  {/* Surah/Juz Header */}
                  <div className="flex justify-between items-center mb-6 px-2 opacity-50 font-bold" dir="rtl" style={{fontSize:'12px',color:colors.text}}>
                    <span>╪│┘Å┘ê╪▒┘Ä╪⌐┘Å {g.sname.replace(/^╪│┘Å┘ê╪▒┘Ä╪⌐┘Å\s*/,'')}</span>
                    <span>╪º┘ä┘Æ╪¼┘Å╪▓┘Æ╪í┘Å {juzForPage(pg).toLocaleString('ar-EG')}</span>
                  </div>

                  {/* Surah Frame (Only for verse 1) */}
                  {g.ayahs[0].nis===1&&<div className="text-center my-6 flex justify-center scale-110">
                    <div className="relative px-12 py-3 min-w-[220px]">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <path d="M10 5 L190 5 L195 10 L195 50 L190 55 L10 55 L5 50 L5 10 Z" fill={colors.border+'10'} stroke={colors.border} strokeWidth="1.5"/>
                        <circle cx="10" cy="30" r="3" fill={colors.border}/> <circle cx="190" cy="30" r="3" fill={colors.border}/>
                      </svg>
                      <span className="font-quran font-bold relative z-10 block" style={{fontSize:'clamp(20px, 4.5vw, 26px)',color:colors.text, paddingTop:'2px'}}>╪│┘Å┘ê╪▒┘Ä╪⌐┘Å {g.sname.replace(/^╪│┘Å┘ê╪▒┘Ä╪⌐┘Å\s*/,'')}</span>
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
                      ╪¿┘É╪│┘Æ┘à┘É ┘▒┘ä┘ä┘Ä┘æ┘ç┘É ┘▒┘ä╪▒┘Ä┘æ╪¡┘Æ┘à┘Ä┘å┘É ┘▒┘ä╪▒┘Ä┘æ╪¡┘É┘è┘à┘É 
                      {g.sn===1 && (
                        <span className="inline-flex items-center justify-center align-middle mx-3" 
                          style={{width:'1.7em',height:'1.7em',fontSize:'0.52em',verticalAlign:'middle',position:'relative'}}>
                          <svg viewBox="0 0 50 50" width="100%" height="100%" style={{position:'absolute',inset:0}}>
                            <circle cx="25" cy="25" r="23" fill="none" stroke={(playingKey===`${g.sn}-1`)?'#22c55e':'#c8a96e'} strokeWidth="1.5"/>
                            <circle cx="25" cy="25" r="19" fill="none" stroke={(playingKey===`${g.sn}-1`)?'#22c55e':'#c8a96e'} strokeWidth="0.8" opacity="0.6"/>
                          </svg>
                          <span style={{position:'relative',zIndex:1,fontSize:'0.85em',fontFamily:'sans-serif',fontWeight:800,color:(playingKey===`${g.sn}-1`)?'#22c55e':'#8b7355',lineHeight:1}}>1</span>
                        </span>
                      )}
                    </span>
                  </div>}
                  
                  {/* Ayahs Grid */}
                  <div className="text-justify font-quran" dir="rtl" style={{fontSize:dynSize,lineHeight:dynLine,fontWeight:'normal',letterSpacing:'0.01em',color:colors.text, wordSpacing:'0.05em', textAlignLast: 'center'}}>
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
                        <span className="inline-flex items-center justify-center align-middle mx-1.5" data-v="1"
                          style={{width:'1.7em',height:'1.7em',fontSize:'0.52em',verticalAlign:'middle',position:'relative',display:'inline-flex'}}>
                          <svg viewBox="0 0 50 50" width="100%" height="100%" style={{position:'absolute',inset:0}}>
                            <circle cx="25" cy="25" r="23" fill="none" stroke={isP?'#22c55e':'#c8a96e'} strokeWidth="1.5"/>
                            <circle cx="25" cy="25" r="19" fill="none" stroke={isP?'#22c55e':'#c8a96e'} strokeWidth="0.8" opacity="0.6"/>
                            {[0,45,90,135,180,225,270,315].map(deg=><circle key={deg} cx={25+21*Math.cos(deg*Math.PI/180)} cy={25+21*Math.sin(deg*Math.PI/180)} r="2" fill={isP?'#22c55e':'#c8a96e'}/>)}
                          </svg>
                          <span style={{position:'relative',zIndex:1,fontSize:'0.85em',fontFamily:'sans-serif',fontWeight:800,color:isP?'#22c55e':bookmarks.has(k)?'#ec4899':'#8b7355',lineHeight:1}}>{hidden?'╪ƒ':a.nis}</span>
                        </span>{SAJDA_VERSES.has(`${g.sn}:${a.nis}`)&&<span style={{color:isP?'#22c55e':'#c8a96e',fontSize:'0.8em',verticalAlign:'super',marginRight:2}} data-v="1">█⌐</span>}
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
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-40 mb-1" style={{color:colors.text}}>╪╡┘ü╪¡╪⌐</span>
                    <span className="text-sm font-bold tracking-widest" style={{color:colors.text}}>{pg.toLocaleString('ar-EG')}</span>
                </div>
                <div className="h-px flex-1 max-w-[80px]" style={{background:`linear-gradient(to left, transparent, ${colors.border})`}} />
            </div>
        </div>}
      </div>

      {/* ΓòÉΓòÉΓòÉ BOTTOM PLAYER ΓòÉΓòÉΓòÉ */}
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
