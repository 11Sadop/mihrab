import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ChevronLeft, BookOpen, Loader2, Search, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Return text as-is - Amiri font supports all Quranic characters
const normalizeQuranText = (text: string): string => {
  return text.replace(/\uFEFF/g, ''); // Only remove BOM
};

interface Surah {
  id: number;
  name: string;
  ayahs_count: number;
}

interface Mufassir {
  id: number;
  name: string;
  edition: string;
}

const MUFASSIREEN: Mufassir[] = [
  { id: 1, name: "التفسير الميسر", edition: "ar.muyassar" },
  { id: 2, name: "تفسير الجلالين", edition: "ar.jalalayn" },
];

const SURAHS: Surah[] = [
  { id: 1, name: "الفاتحة", ayahs_count: 7 },
  { id: 2, name: "البقرة", ayahs_count: 286 },
  { id: 3, name: "آل عمران", ayahs_count: 200 },
  { id: 4, name: "النساء", ayahs_count: 176 },
  { id: 5, name: "المائدة", ayahs_count: 120 },
  { id: 6, name: "الأنعام", ayahs_count: 165 },
  { id: 7, name: "الأعراف", ayahs_count: 206 },
  { id: 8, name: "الأنفال", ayahs_count: 75 },
  { id: 9, name: "التوبة", ayahs_count: 129 },
  { id: 10, name: "يونس", ayahs_count: 109 },
  { id: 11, name: "هود", ayahs_count: 123 },
  { id: 12, name: "يوسف", ayahs_count: 111 },
  { id: 13, name: "الرعد", ayahs_count: 43 },
  { id: 14, name: "إبراهيم", ayahs_count: 52 },
  { id: 15, name: "الحجر", ayahs_count: 99 },
  { id: 16, name: "النحل", ayahs_count: 128 },
  { id: 17, name: "الإسراء", ayahs_count: 111 },
  { id: 18, name: "الكهف", ayahs_count: 110 },
  { id: 19, name: "مريم", ayahs_count: 98 },
  { id: 20, name: "طه", ayahs_count: 135 },
  { id: 21, name: "الأنبياء", ayahs_count: 112 },
  { id: 22, name: "الحج", ayahs_count: 78 },
  { id: 23, name: "المؤمنون", ayahs_count: 118 },
  { id: 24, name: "النور", ayahs_count: 64 },
  { id: 25, name: "الفرقان", ayahs_count: 77 },
  { id: 26, name: "الشعراء", ayahs_count: 227 },
  { id: 27, name: "النمل", ayahs_count: 93 },
  { id: 28, name: "القصص", ayahs_count: 88 },
  { id: 29, name: "العنكبوت", ayahs_count: 69 },
  { id: 30, name: "الروم", ayahs_count: 60 },
  { id: 31, name: "لقمان", ayahs_count: 34 },
  { id: 32, name: "السجدة", ayahs_count: 30 },
  { id: 33, name: "الأحزاب", ayahs_count: 73 },
  { id: 34, name: "سبأ", ayahs_count: 54 },
  { id: 35, name: "فاطر", ayahs_count: 45 },
  { id: 36, name: "يس", ayahs_count: 83 },
  { id: 37, name: "الصافات", ayahs_count: 182 },
  { id: 38, name: "ص", ayahs_count: 88 },
  { id: 39, name: "الزمر", ayahs_count: 75 },
  { id: 40, name: "غافر", ayahs_count: 85 },
  { id: 41, name: "فصلت", ayahs_count: 54 },
  { id: 42, name: "الشورى", ayahs_count: 53 },
  { id: 43, name: "الزخرف", ayahs_count: 89 },
  { id: 44, name: "الدخان", ayahs_count: 59 },
  { id: 45, name: "الجاثية", ayahs_count: 37 },
  { id: 46, name: "الأحقاف", ayahs_count: 35 },
  { id: 47, name: "محمد", ayahs_count: 38 },
  { id: 48, name: "الفتح", ayahs_count: 29 },
  { id: 49, name: "الحجرات", ayahs_count: 18 },
  { id: 50, name: "ق", ayahs_count: 45 },
  { id: 51, name: "الذاريات", ayahs_count: 60 },
  { id: 52, name: "الطور", ayahs_count: 49 },
  { id: 53, name: "النجم", ayahs_count: 62 },
  { id: 54, name: "القمر", ayahs_count: 55 },
  { id: 55, name: "الرحمن", ayahs_count: 78 },
  { id: 56, name: "الواقعة", ayahs_count: 96 },
  { id: 57, name: "الحديد", ayahs_count: 29 },
  { id: 58, name: "المجادلة", ayahs_count: 22 },
  { id: 59, name: "الحشر", ayahs_count: 24 },
  { id: 60, name: "الممتحنة", ayahs_count: 13 },
  { id: 61, name: "الصف", ayahs_count: 14 },
  { id: 62, name: "الجمعة", ayahs_count: 11 },
  { id: 63, name: "المنافقون", ayahs_count: 11 },
  { id: 64, name: "التغابن", ayahs_count: 18 },
  { id: 65, name: "الطلاق", ayahs_count: 12 },
  { id: 66, name: "التحريم", ayahs_count: 12 },
  { id: 67, name: "الملك", ayahs_count: 30 },
  { id: 68, name: "القلم", ayahs_count: 52 },
  { id: 69, name: "الحاقة", ayahs_count: 52 },
  { id: 70, name: "المعارج", ayahs_count: 44 },
  { id: 71, name: "نوح", ayahs_count: 28 },
  { id: 72, name: "الجن", ayahs_count: 28 },
  { id: 73, name: "المزمل", ayahs_count: 20 },
  { id: 74, name: "المدثر", ayahs_count: 56 },
  { id: 75, name: "القيامة", ayahs_count: 40 },
  { id: 76, name: "الإنسان", ayahs_count: 31 },
  { id: 77, name: "المرسلات", ayahs_count: 50 },
  { id: 78, name: "النبأ", ayahs_count: 40 },
  { id: 79, name: "النازعات", ayahs_count: 46 },
  { id: 80, name: "عبس", ayahs_count: 42 },
  { id: 81, name: "التكوير", ayahs_count: 29 },
  { id: 82, name: "الانفطار", ayahs_count: 19 },
  { id: 83, name: "المطففين", ayahs_count: 36 },
  { id: 84, name: "الانشقاق", ayahs_count: 25 },
  { id: 85, name: "البروج", ayahs_count: 22 },
  { id: 86, name: "الطارق", ayahs_count: 17 },
  { id: 87, name: "الأعلى", ayahs_count: 19 },
  { id: 88, name: "الغاشية", ayahs_count: 26 },
  { id: 89, name: "الفجر", ayahs_count: 30 },
  { id: 90, name: "البلد", ayahs_count: 20 },
  { id: 91, name: "الشمس", ayahs_count: 15 },
  { id: 92, name: "الليل", ayahs_count: 21 },
  { id: 93, name: "الضحى", ayahs_count: 11 },
  { id: 94, name: "الشرح", ayahs_count: 8 },
  { id: 95, name: "التين", ayahs_count: 8 },
  { id: 96, name: "العلق", ayahs_count: 19 },
  { id: 97, name: "القدر", ayahs_count: 5 },
  { id: 98, name: "البينة", ayahs_count: 8 },
  { id: 99, name: "الزلزلة", ayahs_count: 8 },
  { id: 100, name: "العاديات", ayahs_count: 11 },
  { id: 101, name: "القارعة", ayahs_count: 11 },
  { id: 102, name: "التكاثر", ayahs_count: 8 },
  { id: 103, name: "العصر", ayahs_count: 3 },
  { id: 104, name: "الهمزة", ayahs_count: 9 },
  { id: 105, name: "الفيل", ayahs_count: 5 },
  { id: 106, name: "قريش", ayahs_count: 4 },
  { id: 107, name: "الماعون", ayahs_count: 7 },
  { id: 108, name: "الكوثر", ayahs_count: 3 },
  { id: 109, name: "الكافرون", ayahs_count: 6 },
  { id: 110, name: "النصر", ayahs_count: 3 },
  { id: 111, name: "المسد", ayahs_count: 5 },
  { id: 112, name: "الإخلاص", ayahs_count: 4 },
  { id: 113, name: "الفلق", ayahs_count: 5 },
  { id: 114, name: "الناس", ayahs_count: 6 },
];

interface SearchResult {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  tafseerText: string;
}

export default function TafseerPage() {
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [selectedAyah, setSelectedAyah] = useState<number>(1);
  const [selectedMufassir, setSelectedMufassir] = useState<number>(1);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const currentSurah = SURAHS.find(s => s.id === selectedSurah) || SURAHS[0];
  const currentMufassir = MUFASSIREEN.find(m => m.id === selectedMufassir) || MUFASSIREEN[0];

  // Fix ALEF WASLA (U+0671) rendering on Android by replacing with regular ALEF
  const normalizeQuranText = (text: string): string => {
    return text.replace(/\u0671/g, '\u0627');
  };

  const surahQuery = useQuery<{ number: number; text: string }[]>({
    queryKey: ["/api/quran/surah", selectedSurah],
    queryFn: async () => {
      // Use quran-uthmani edition (original with full diacritics)
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/quran-uthmani`);
      if (!res.ok) throw new Error("Failed to fetch surah");
      const data = await res.json();
      return data.data.ayahs.map((a: any) => ({ 
        number: a.numberInSurah, 
        text: normalizeQuranText(a.text) 
      }));
    },
  });

  const tafseerQuery = useQuery<{ number: number; text: string }[]>({
    queryKey: ["/api/tafseer", currentMufassir.edition, selectedSurah],
    queryFn: async () => {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/${currentMufassir.edition}`);
      if (!res.ok) throw new Error("Failed to fetch tafseer");
      const data = await res.json();
      return data.data.ayahs.map((a: any) => ({ number: a.numberInSurah, text: a.text }));
    },
  });

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    
    const searchLower = searchText.trim();
    
    for (const surah of SURAHS) {
      if (surah.name.includes(searchLower)) {
        setSelectedSurah(surah.id);
        setSelectedAyah(1);
        setShowSearchResults(false);
        return;
      }
    }
    
    const ayahNum = parseInt(searchText);
    if (!isNaN(ayahNum) && ayahNum >= 1 && ayahNum <= currentSurah.ayahs_count) {
      setSelectedAyah(ayahNum);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    setShowSearchResults(true);
    setSearchResults([]);
    
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(searchLower)}/all/ar`);
      if (res.ok) {
        const data = await res.json();
        if (data.data && data.data.matches) {
          const results: SearchResult[] = [];
          for (const match of data.data.matches.slice(0, 15)) {
            const surah = SURAHS.find(s => s.id === match.surah.number);
            if (surah) {
              const tafseerRes = await fetch(`https://api.alquran.cloud/v1/ayah/${match.number}/${currentMufassir.edition}`);
              let tafseerText = "";
              if (tafseerRes.ok) {
                const tafseerData = await tafseerRes.json();
                tafseerText = tafseerData.data?.text || "";
              }
              results.push({
                surahId: surah.id,
                surahName: surah.name,
                ayahNumber: match.numberInSurah,
                ayahText: match.text,
                tafseerText
              });
            }
          }
          setSearchResults(results);
        }
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (result: SearchResult) => {
    setSelectedSurah(result.surahId);
    setSelectedAyah(result.ayahNumber);
    setShowSearchResults(false);
    setSearchText("");
  };

  const goToNext = () => {
    if (selectedAyah < currentSurah.ayahs_count) {
      setSelectedAyah(selectedAyah + 1);
    } else if (selectedSurah < 114) {
      setSelectedSurah(selectedSurah + 1);
      setSelectedAyah(1);
    }
  };

  const goToPrev = () => {
    if (selectedAyah > 1) {
      setSelectedAyah(selectedAyah - 1);
    } else if (selectedSurah > 1) {
      const prevSurah = SURAHS.find(s => s.id === selectedSurah - 1);
      if (prevSurah) {
        setSelectedSurah(selectedSurah - 1);
        setSelectedAyah(prevSurah.ayahs_count);
      }
    }
  };

  const handleSurahChange = (value: string) => {
    setSelectedSurah(parseInt(value));
    setSelectedAyah(1);
  };

  const handleAyahChange = (value: string) => {
    setSelectedAyah(parseInt(value));
  };

  const currentAyahText = normalizeQuranText(surahQuery.data?.find(a => a.number === selectedAyah)?.text || "");
  const currentTafseerText = tafseerQuery.data?.find(a => a.number === selectedAyah)?.text || "";

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-b from-background to-muted/30">
      <Header title="تفسير القرآن" showBack />
      
      <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 space-y-4 pt-4">
        <Card className="p-4 shadow-sm">
          <div className="space-y-3">
            <Select value={selectedMufassir.toString()} onValueChange={(v) => setSelectedMufassir(parseInt(v))}>
              <SelectTrigger data-testid="select-mufassir" className="text-right">
                <SelectValue placeholder="اختر المفسر" />
              </SelectTrigger>
              <SelectContent>
                {MUFASSIREEN.map(mufassir => (
                  <SelectItem key={mufassir.id} value={mufassir.id.toString()}>
                    {mufassir.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                placeholder="ابحث عن كلمة في القرآن..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="text-right"
                data-testid="input-search-quran"
              />
              <Button onClick={handleSearch} size="icon" variant="outline" data-testid="button-search-quran">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Select value={selectedSurah.toString()} onValueChange={handleSurahChange}>
                <SelectTrigger className="flex-1 text-right" data-testid="select-surah">
                  <SelectValue placeholder="اختر السورة" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-60">
                    {SURAHS.map(surah => (
                      <SelectItem key={surah.id} value={surah.id.toString()}>
                        {surah.id}. {surah.name}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
              
              <Select value={selectedAyah.toString()} onValueChange={handleAyahChange}>
                <SelectTrigger className="w-28 text-right" data-testid="select-ayah">
                  <SelectValue placeholder="الآية" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-60">
                    {Array.from({ length: currentSurah.ayahs_count }, (_, i) => i + 1).map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        آية {num}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToPrev}
                disabled={selectedSurah === 1 && selectedAyah === 1}
                className="flex-1"
                data-testid="button-prev-ayah"
              >
                <ChevronRight className="w-4 h-4 ml-1" />
                السابق
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToNext}
                disabled={selectedSurah === 114 && selectedAyah === currentSurah.ayahs_count}
                className="flex-1"
                data-testid="button-next-ayah"
              >
                التالي
                <ChevronLeft className="w-4 h-4 mr-1" />
              </Button>
            </div>
          </div>
        </Card>

        {showSearchResults && (
          <Card className="p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="font-bold">نتائج البحث</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowSearchResults(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">جاري البحث...</span>
              </div>
            ) : searchResults.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">لا توجد نتائج</p>
            ) : (
              <ScrollArea className="h-96">
                <div className="space-y-3" dir="rtl">
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectSearchResult(result)}
                      className="w-full text-right p-4 rounded-xl border bg-card hover:bg-muted/50 transition-all duration-200 shadow-sm"
                      data-testid={`button-search-result-${idx}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium bg-primary text-primary-foreground px-3 py-1 rounded-full">
                          {result.surahName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          الآية {result.ayahNumber}
                        </span>
                      </div>
                      <p className="text-lg font-quran leading-loose mb-3 text-foreground">{normalizeQuranText(result.ayahText)}</p>
                      {result.tafseerText && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{result.tafseerText}</p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </Card>
        )}

        {!showSearchResults && (
          <>
            <Card className="p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-bold">سورة {currentSurah.name}</h3>
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{currentSurah.ayahs_count} آية</span>
              </div>
              
              {surahQuery.isLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : surahQuery.error ? (
                <p className="text-sm text-muted-foreground text-center py-4">فشل تحميل السورة</p>
              ) : (
                <ScrollArea className="h-52">
                  <div className="space-y-1 pr-1" dir="rtl">
                    {surahQuery.data?.map((ayah) => (
                      <button
                        key={ayah.number}
                        onClick={() => setSelectedAyah(ayah.number)}
                        className={`w-full text-right p-3 rounded-lg transition-all duration-200 flex items-start gap-2 ${
                          selectedAyah === ayah.number 
                            ? "bg-primary/10 border-r-4 border-primary" 
                            : "hover:bg-muted/50"
                        }`}
                        data-testid={`button-ayah-${ayah.number}`}
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-1">
                          {ayah.number}
                        </span>
                        <span className="text-base font-quran leading-loose flex-1">
                          {normalizeQuranText(ayah.text)}
                        </span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Card>

            <Card className="p-0 overflow-hidden shadow-md">
              <div className="bg-gradient-to-l from-emerald-600 to-emerald-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">سورة {currentSurah.name}</h3>
                      <span className="text-sm text-white/80">الآية {selectedAyah}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                {surahQuery.isLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : surahQuery.error ? (
                  <p className="text-sm text-muted-foreground text-center">فشل تحميل الآية</p>
                ) : (
                  <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-5 border">
                    <p className="text-2xl font-quran leading-loose text-center" dir="rtl" data-testid="text-ayah">
                      {currentAyahText}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-0 overflow-hidden shadow-md">
              <div className="bg-gradient-to-l from-amber-600 to-amber-700 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{currentMufassir.name}</h3>
                    <span className="text-sm text-white/80">تفسير الآية {selectedAyah}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                {tafseerQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : tafseerQuery.error ? (
                  <p className="text-sm text-muted-foreground text-center">فشل تحميل التفسير</p>
                ) : (
                  <p className="text-base leading-loose text-right" dir="rtl" data-testid="text-tafseer">
                    {currentTafseerText}
                  </p>
                )}
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
