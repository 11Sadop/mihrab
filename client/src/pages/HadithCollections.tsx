import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, Search, ChevronDown, ChevronUp, Loader2, Book } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSeo } from "@/hooks/use-seo";

interface Hadith {
  id: number;
  hadithNumber: number;
  bookNumber: number;
  bookName: string;
  text: string;
}

interface BookInfo {
  bookNumber: number;
  bookName: string;
  count: number;
}

interface HadithQueryResult {
  hadiths: Hadith[];
  total: number;
  books: BookInfo[];
}

export default function HadithCollections() {
  useSeo({
    title: "كتب الحديث الصحيحة - صحيح البخاري ومسلم",
    description: "تصفح أحاديث صحيح البخاري وصحيح مسلم كاملاً مع إمكانية البحث. أصح كتابين في السنة النبوية الشريفة بترقيم الأحاديث والأبواب.",
    keywords: "صحيح البخاري، صحيح مسلم، كتب الحديث، أحاديث البخاري، أحاديث مسلم، السنة النبوية، الحديث النبوي الشريف",
    canonicalPath: "/hadith-collections",
  });
  const [selectedCollection, setSelectedCollection] = useState<"bukhari" | "muslim" | null>(null);
  const [expandedBook, setExpandedBook] = useState<number | null>(null);
  const [expandedHadith, setExpandedHadith] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [bookPage, setBookPage] = useState<Record<number, number>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const buildQueryUrl = (collection: string, book: number | null, p: number, search: string) => {
    const params = new URLSearchParams();
    params.set('page', p.toString());
    params.set('limit', '50');
    if (book !== null) params.set('book', book.toString());
    if (search) params.set('search', search);
    return `/api/hadith/${collection}?${params.toString()}`;
  };

  const booksQuery = useQuery<BookInfo[]>({
    queryKey: ['hadith-books', selectedCollection],
    queryFn: async () => {
      const res = await fetch(`/api/hadith/${selectedCollection}/books`);
      if (!res.ok) throw new Error('Failed to fetch books');
      return res.json();
    },
    enabled: !!selectedCollection && !debouncedSearch,
  });

  const hadithCountQuery = useQuery<HadithQueryResult>({
    queryKey: ['hadith-count', selectedCollection],
    queryFn: async () => {
      const res = await fetch(`/api/hadith/${selectedCollection}?page=1&limit=1`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !!selectedCollection && !debouncedSearch,
  });

  const searchResultsQuery = useQuery<HadithQueryResult>({
    queryKey: ['hadith-search', selectedCollection, debouncedSearch],
    queryFn: async () => {
      const res = await fetch(buildQueryUrl(selectedCollection!, null, 1, debouncedSearch));
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !!selectedCollection && !!debouncedSearch,
  });

  const bookHadithsQuery = useQuery<HadithQueryResult>({
    queryKey: ['hadith-book', selectedCollection, expandedBook, bookPage[expandedBook || 0] || 1],
    queryFn: async () => {
      const page = bookPage[expandedBook || 0] || 1;
      const res = await fetch(buildQueryUrl(selectedCollection!, expandedBook, page, ''));
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !!selectedCollection && expandedBook !== null,
  });

  const bukhariStatsQuery = useQuery<HadithQueryResult>({
    queryKey: ['hadith-bukhari-stats'],
    queryFn: async () => {
      const res = await fetch('/api/hadith/bukhari?page=1&limit=1');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !selectedCollection,
  });

  const muslimStatsQuery = useQuery<HadithQueryResult>({
    queryKey: ['hadith-muslim-stats'],
    queryFn: async () => {
      const res = await fetch('/api/hadith/muslim?page=1&limit=1');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !selectedCollection,
  });

  const books = booksQuery.data || [];
  const isLoadingBooks = booksQuery.isLoading;

  const toggleBook = (bookNum: number) => {
    if (expandedBook === bookNum) {
      setExpandedBook(null);
    } else {
      setExpandedBook(bookNum);
      if (!bookPage[bookNum]) {
        setBookPage(prev => ({ ...prev, [bookNum]: 1 }));
      }
    }
  };

  const loadMoreInBook = (bookNum: number) => {
    setBookPage(prev => ({ ...prev, [bookNum]: (prev[bookNum] || 1) + 1 }));
  };

  if (!selectedCollection) {
    return (
      <div className="min-h-screen pb-32 bg-gradient-to-b from-background to-secondary/20">
        <Header title="كتب الحديث" showBack />
        
        <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 space-y-4 pt-4">
          <Card 
            className="p-6 cursor-pointer hover-elevate"
            onClick={() => setSelectedCollection("bukhari")}
            data-testid="card-bukhari"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">صحيح البخاري</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  أصح كتاب بعد كتاب الله
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {bukhariStatsQuery.data?.total || "..."} حديث • {bukhariStatsQuery.data?.books?.length || "..."} كتاب
                </p>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover-elevate"
            onClick={() => setSelectedCollection("muslim")}
            data-testid="card-muslim"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">صحيح مسلم</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  ثاني أصح كتاب بعد صحيح البخاري
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {muslimStatsQuery.data?.total || "..."} حديث • {muslimStatsQuery.data?.books?.length || "..."} كتاب
                </p>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-b from-background to-secondary/20">
      <Header 
        title={selectedCollection === "bukhari" ? "صحيح البخاري" : "صحيح مسلم"} 
        showBack 
      />
      
      <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 space-y-3 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedCollection(null);
            setSearchQuery("");
            setExpandedBook(null);
          }}
          className="mb-2"
          data-testid="button-back-collections"
        >
          <ChevronLeft className="w-4 h-4 ml-1 rotate-180" />
          العودة للقائمة
        </Button>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ابحث في الأحاديث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
            dir="rtl"
            data-testid="input-search-hadith"
          />
        </div>

        {isLoadingBooks && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {debouncedSearch && (
          <>
            {searchResultsQuery.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground text-center">
                  نتائج البحث: {searchResultsQuery.data?.total || 0}
                </p>
                {searchResultsQuery.data?.hadiths.length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-muted-foreground">لا توجد نتائج</p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {searchResultsQuery.data?.hadiths.map((hadith) => (
                      <Card 
                        key={hadith.id} 
                        className="p-4 cursor-pointer hover-elevate"
                        onClick={() => setExpandedHadith(expandedHadith === hadith.id ? null : hadith.id)}
                        data-testid={`card-hadith-search-${hadith.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            {hadith.hadithNumber}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">{hadith.bookName}</p>
                            <p 
                              className={`font-arabic text-base leading-relaxed ${expandedHadith === hadith.id ? '' : 'line-clamp-2'}`}
                              dir="rtl"
                            >
                              {hadith.text}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!debouncedSearch && !isLoadingBooks && (
          <>
            <p className="text-sm text-muted-foreground text-center">
              {hadithCountQuery.data?.total || 0} حديث في {books.length} كتاب
            </p>
            
            <div className="space-y-2">
              {books.map((book) => (
                <Collapsible 
                  key={book.bookNumber} 
                  open={expandedBook === book.bookNumber}
                  onOpenChange={() => toggleBook(book.bookNumber)}
                >
                  <CollapsibleTrigger asChild>
                    <Card 
                      className="p-4 cursor-pointer hover-elevate"
                      data-testid={`card-book-${book.bookNumber}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <Book className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm">{book.bookName}</p>
                          <p className="text-xs text-muted-foreground">{book.count} حديث</p>
                        </div>
                        {expandedBook === book.bookNumber ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </Card>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="mt-2 space-y-2 pr-4">
                    {bookHadithsQuery.isLoading && expandedBook === book.bookNumber ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : expandedBook === book.bookNumber && bookHadithsQuery.data?.hadiths ? (
                      <>
                        {bookHadithsQuery.data.hadiths.map((hadith) => (
                          <Card 
                            key={hadith.id} 
                            className="p-3 cursor-pointer hover-elevate"
                            onClick={() => setExpandedHadith(expandedHadith === hadith.id ? null : hadith.id)}
                            data-testid={`card-hadith-${selectedCollection}-${hadith.id}`}
                          >
                            <div className="flex items-start gap-2">
                              <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                {hadith.hadithNumber}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p 
                                  className={`font-arabic text-sm leading-relaxed ${expandedHadith === hadith.id ? '' : 'line-clamp-2'}`}
                                  dir="rtl"
                                >
                                  {hadith.text}
                                </p>
                                {hadith.text.length > 100 && (
                                  <button className="text-xs text-primary mt-1">
                                    {expandedHadith === hadith.id ? "عرض أقل" : "عرض المزيد"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        {bookHadithsQuery.data.hadiths.length < bookHadithsQuery.data.total && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              loadMoreInBook(book.bookNumber);
                            }}
                            data-testid={`button-load-more-${book.bookNumber}`}
                          >
                            تحميل المزيد
                          </Button>
                        )}
                      </>
                    ) : null}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
