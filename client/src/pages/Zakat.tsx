import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Calculator, Coins, DollarSign, TrendingUp, RefreshCw, Info, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSeo } from "@/hooks/use-seo";

type AssetType = "gold" | "silver" | "money" | "stocks";

interface GoldKarat {
  karat: number;
  purity: number;
  pricePerGram: number;
  grams: string;
}

interface SilverGrade {
  grade: string;
  purity: number;
  pricePerGram: number;
  grams: string;
}

export default function Zakat() {
  useSeo({
    title: "حاسبة الزكاة - احسب زكاتك الآن",
    description: "احسب زكاة مالك وذهبك وفضتك وأسهمك بسهولة ودقة. حاسبة زكاة مجانية مع أسعار الذهب المحدثة وحساب النصاب تلقائياً.",
    keywords: "حاسبة الزكاة، حساب الزكاة، زكاة الذهب، زكاة المال، نصاب الزكاة، زكاة الفضة، زكاة الأسهم، zakat calculator",
    canonicalPath: "/zakat",
  });
  const [activeTab, setActiveTab] = useState<AssetType>("money");
  const [moneyAmount, setMoneyAmount] = useState("");
  const [stockShares, setStockShares] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [zakatResult, setZakatResult] = useState<{ amount: number; nisabMet: boolean } | null>(null);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [goldKarats, setGoldKarats] = useState<GoldKarat[]>([
    { karat: 24, purity: 1.0, pricePerGram: 310, grams: "" },
    { karat: 22, purity: 0.916, pricePerGram: 285, grams: "" },
    { karat: 21, purity: 0.875, pricePerGram: 272, grams: "" },
    { karat: 18, purity: 0.75, pricePerGram: 233, grams: "" },
  ]);

  const [silverGrades, setSilverGrades] = useState<SilverGrade[]>([
    { grade: "999", purity: 0.999, pricePerGram: 3.5, grams: "" },
    { grade: "925", purity: 0.925, pricePerGram: 3.2, grams: "" },
    { grade: "900", purity: 0.900, pricePerGram: 3.1, grams: "" },
    { grade: "800", purity: 0.800, pricePerGram: 2.8, grams: "" },
  ]);

  const NISAB_GOLD_GRAMS = 85;
  const NISAB_SILVER_GRAMS = 595;
  const ZAKAT_RATE = 0.025;

  const fetchGoldPrices = async () => {
    setIsLoadingPrices(true);
    try {
      const response = await fetch('https://api.gold-api.com/price/XAU');
      if (response.ok) {
        const data = await response.json();
        const pricePerOunce = data.price || 2650;
        const pricePerGramUSD = pricePerOunce / 31.1035;
        const sarRate = 3.75;
        const price24k = pricePerGramUSD * sarRate;

        setGoldKarats(prev => prev.map(k => ({
          ...k,
          pricePerGram: Math.round(price24k * k.purity * 100) / 100
        })));

        const silverResponse = await fetch('https://api.gold-api.com/price/XAG');
        if (silverResponse.ok) {
          const silverData = await silverResponse.json();
          const silverPricePerOunce = silverData.price || 30;
          const silverPricePerGramUSD = silverPricePerOunce / 31.1035;
          const silverPrice999 = silverPricePerGramUSD * sarRate;

          setSilverGrades(prev => prev.map(g => ({
            ...g,
            pricePerGram: Math.round(silverPrice999 * g.purity * 100) / 100
          })));
        }

        setLastUpdated(new Date());
      }
    } catch (error) {
      console.log("Using default prices");
    } finally {
      setIsLoadingPrices(false);
    }
  };

  useEffect(() => {
    fetchGoldPrices();
  }, []);

  const updateGoldGrams = (index: number, value: string) => {
    setGoldKarats(prev => prev.map((k, i) =>
      i === index ? { ...k, grams: value } : k
    ));
  };

  const updateSilverGrams = (index: number, value: string) => {
    setSilverGrades(prev => prev.map((g, i) =>
      i === index ? { ...g, grams: value } : g
    ));
  };

  const calculateGoldZakat = () => {
    let totalGoldValue = 0;
    let totalPureGoldGrams = 0;

    goldKarats.forEach(k => {
      const grams = parseFloat(k.grams) || 0;
      totalGoldValue += grams * k.pricePerGram;
      totalPureGoldGrams += grams * k.purity;
    });

    const nisabMet = totalPureGoldGrams >= NISAB_GOLD_GRAMS;

    if (nisabMet) {
      setZakatResult({ amount: totalGoldValue * ZAKAT_RATE, nisabMet: true });
    } else {
      setZakatResult({ amount: 0, nisabMet: false });
    }
  };

  const calculateSilverZakat = () => {
    let totalSilverValue = 0;
    let totalPureSilverGrams = 0;

    silverGrades.forEach(g => {
      const grams = parseFloat(g.grams) || 0;
      totalSilverValue += grams * g.pricePerGram;
      totalPureSilverGrams += grams * g.purity;
    });

    const nisabMet = totalPureSilverGrams >= NISAB_SILVER_GRAMS;

    if (nisabMet) {
      setZakatResult({ amount: totalSilverValue * ZAKAT_RATE, nisabMet: true });
    } else {
      setZakatResult({ amount: 0, nisabMet: false });
    }
  };

  const calculateMoneyZakat = () => {
    const amount = parseFloat(moneyAmount) || 0;
    const nisabValue = NISAB_GOLD_GRAMS * goldKarats[0].pricePerGram;
    const nisabMet = amount >= nisabValue;

    if (nisabMet) {
      setZakatResult({ amount: amount * ZAKAT_RATE, nisabMet: true });
    } else {
      setZakatResult({ amount: 0, nisabMet: false });
    }
  };

  const calculateStocksZakat = () => {
    const shares = parseFloat(stockShares) || 0;
    const price = parseFloat(stockPrice) || 0;
    const totalValue = shares * price;
    const nisabValue = NISAB_GOLD_GRAMS * goldKarats[0].pricePerGram;
    const nisabMet = totalValue >= nisabValue;

    if (nisabMet) {
      setZakatResult({ amount: totalValue * ZAKAT_RATE, nisabMet: true });
    } else {
      setZakatResult({ amount: 0, nisabMet: false });
    }
  };

  const handleCalculate = () => {
    switch (activeTab) {
      case "gold":
        calculateGoldZakat();
        break;
      case "silver":
        calculateSilverZakat();
        break;
      case "money":
        calculateMoneyZakat();
        break;
      case "stocks":
        calculateStocksZakat();
        break;
    }
  };

  const handleShare = () => {
    if (!zakatResult) return;
    const text = `حسبت زكاة مالي عبر حاسبة موقع "محراب" الدقيقة ⚖️\nالمبلغ المستحق كزكاة هو: ${zakatResult.amount.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ريال\n\nاحسب زكاة مالك ومعادن الطيبة الآن:\nhttps://mihrabapp.com/zakat`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const nisabMoneyValue = NISAB_GOLD_GRAMS * goldKarats[0].pricePerGram;

  const zakatInfo = {
    money: {
      title: "زكاة المال",
      points: [
        "تجب الزكاة في النقود إذا بلغت النصاب وحال عليها الحول",
        "النصاب يُحسب بما يعادل 85 جرام من الذهب الخالص",
        "تشمل: المدخرات البنكية، الأموال النقدية، الديون المرجوة السداد",
        "نسبة الزكاة: 2.5% (ربع العشر) من إجمالي المال"
      ]
    },
    gold: {
      title: "زكاة الذهب",
      points: [
        "نصاب الذهب: 85 جرام من الذهب الخالص (عيار 24)",
        "تجب الزكاة في الذهب المُعد للادخار أو التجارة",
        "ذهب الزينة للنساء فيه خلاف بين العلماء",
        "يُحسب الذهب المخلوط بنسبة الذهب الصافي فيه"
      ]
    },
    silver: {
      title: "زكاة الفضة",
      points: [
        "نصاب الفضة: 595 جرام من الفضة الخالصة",
        "تجب الزكاة في الفضة المُعدة للادخار أو التجارة",
        "نسبة الزكاة: 2.5% من قيمة الفضة",
        "عيار 999: فضة نقية | عيار 925: فضة الحُلي | عيار 800: فضة مخلوطة"
      ]
    },
    stocks: {
      title: "زكاة الأسهم",
      points: [
        "تجب الزكاة على الأسهم المُعدة للمتاجرة بقيمتها السوقية",
        "الأسهم المُقتناة للاستثمار طويل المدى: زكاة على الأرباح فقط",
        "يُحسب نصاب الأسهم كنصاب المال (ما يعادل 85 جرام ذهب)",
        "القيمة = عدد الأسهم × سعر السهم الحالي"
      ]
    }
  };

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-b from-background to-secondary/20">
      <Header title="حاسبة الزكاة" showBack />

      <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 space-y-6 pt-4">
        <Card className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Calculator className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold">احسب زكاة مالك</h2>
            <p className="text-sm text-muted-foreground">
              اختر نوع المال لحساب الزكاة
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as AssetType); setZakatResult(null); }}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="money" className="text-xs" data-testid="tab-money">
                <DollarSign className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="gold" className="text-xs" data-testid="tab-gold">
                <Coins className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="silver" className="text-xs" data-testid="tab-silver">
                <span className="text-xs">فضة</span>
              </TabsTrigger>
              <TabsTrigger value="stocks" className="text-xs" data-testid="tab-stocks">
                <TrendingUp className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="money" className="space-y-4 mt-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-right">
                <div className="flex items-start gap-2 flex-row-reverse">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-blue-800 dark:text-blue-200 mb-2">{zakatInfo.money.title}</h4>
                    <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                      {zakatInfo.money.points.map((point, i) => (
                        <li key={i}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-right block">
                  إجمالي المال (ريال)
                </label>
                <Input
                  type="number"
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                  className="text-right text-lg"
                  dir="ltr"
                  data-testid="input-money-amount"
                />
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">نصاب الزكاة</p>
                <p className="text-lg font-bold text-primary">
                  {nisabMoneyValue.toLocaleString("ar-SA")} ريال
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (ما يعادل 85 جرام ذهب عيار 24)
                </p>
              </div>
            </TabsContent>

            <TabsContent value="gold" className="space-y-4 mt-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-right">
                <div className="flex items-start gap-2 flex-row-reverse">
                  <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-amber-800 dark:text-amber-200 mb-2">{zakatInfo.gold.title}</h4>
                    <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                      {zakatInfo.gold.points.map((point, i) => (
                        <li key={i}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchGoldPrices}
                  disabled={isLoadingPrices}
                  data-testid="button-refresh-gold-prices"
                >
                  <RefreshCw className={`w-4 h-4 ml-1 ${isLoadingPrices ? 'animate-spin' : ''}`} />
                  تحديث الأسعار
                </Button>
                {lastUpdated && (
                  <span className="text-xs text-muted-foreground">
                    آخر تحديث: {lastUpdated.toLocaleTimeString('ar-SA')}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {goldKarats.map((karat, index) => (
                  <div key={karat.karat} className="bg-secondary/30 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2 flex-row-reverse">
                      <span className="font-bold text-sm">عيار {karat.karat}</span>
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-1 rounded" data-testid={`text-gold-price-${karat.karat}`}>
                        {karat.pricePerGram.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر/ج
                      </span>
                    </div>
                    <Input
                      type="number"
                      value={karat.grams}
                      onChange={(e) => updateGoldGrams(index, e.target.value)}
                      placeholder="عدد الجرامات"
                      className="text-right"
                      dir="ltr"
                      data-testid={`input-gold-${karat.karat}`}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/30 rounded-xl p-4 text-center">
                <p className="text-xs text-amber-800 dark:text-amber-200 mb-1">نصاب الذهب</p>
                <p className="text-lg font-bold text-amber-700 dark:text-amber-300">
                  85 جرام (ذهب خالص)
                </p>
              </div>
            </TabsContent>

            <TabsContent value="silver" className="space-y-4 mt-4">
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 text-right">
                <div className="flex items-start gap-2 flex-row-reverse">
                  <Info className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">{zakatInfo.silver.title}</h4>
                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      {zakatInfo.silver.points.map((point, i) => (
                        <li key={i}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchGoldPrices}
                  disabled={isLoadingPrices}
                  data-testid="button-refresh-silver-prices"
                >
                  <RefreshCw className={`w-4 h-4 ml-1 ${isLoadingPrices ? 'animate-spin' : ''}`} />
                  تحديث الأسعار
                </Button>
                {lastUpdated && (
                  <span className="text-xs text-muted-foreground">
                    آخر تحديث: {lastUpdated.toLocaleTimeString('ar-SA')}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {silverGrades.map((grade, index) => (
                  <div key={grade.grade} className="bg-secondary/30 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2 flex-row-reverse">
                      <span className="font-bold text-sm">عيار {grade.grade}</span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 px-2 py-1 rounded" data-testid={`text-silver-price-${grade.grade}`}>
                        {grade.pricePerGram.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر/ج
                      </span>
                    </div>
                    <Input
                      type="number"
                      value={grade.grams}
                      onChange={(e) => updateSilverGrams(index, e.target.value)}
                      placeholder="عدد الجرامات"
                      className="text-right"
                      dir="ltr"
                      data-testid={`input-silver-${grade.grade}`}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">نصاب الفضة</p>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                  595 جرام (فضة خالصة)
                </p>
              </div>
            </TabsContent>

            <TabsContent value="stocks" className="space-y-4 mt-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-right">
                <div className="flex items-start gap-2 flex-row-reverse">
                  <Info className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-green-800 dark:text-green-200 mb-2">{zakatInfo.stocks.title}</h4>
                    <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                      {zakatInfo.stocks.points.map((point, i) => (
                        <li key={i}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">
                    عدد الأسهم
                  </label>
                  <Input
                    type="number"
                    value={stockShares}
                    onChange={(e) => setStockShares(e.target.value)}
                    placeholder="أدخل عدد الأسهم"
                    className="text-right text-lg"
                    dir="ltr"
                    data-testid="input-stock-shares"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">
                    سعر السهم (ريال)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={stockPrice}
                    onChange={(e) => setStockPrice(e.target.value)}
                    placeholder="أدخل سعر السهم الحالي"
                    className="text-right text-lg"
                    dir="ltr"
                    data-testid="input-stock-price"
                  />
                </div>

                {stockShares && stockPrice && (
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">إجمالي قيمة الأسهم</p>
                    <p className="text-lg font-bold text-foreground">
                      {((parseFloat(stockShares) || 0) * (parseFloat(stockPrice) || 0)).toLocaleString("ar-SA")} ريال
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">نصاب الزكاة</p>
                <p className="text-lg font-bold text-primary">
                  {nisabMoneyValue.toLocaleString("ar-SA")} ريال
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleCalculate}
            className="w-full"
            size="lg"
            data-testid="button-calculate-zakat"
          >
            احسب الزكاة
          </Button>

          {zakatResult !== null && (
            <div className={`rounded-2xl p-6 text-center space-y-2 ${zakatResult.nisabMet ? 'bg-primary/10' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
              <p className="text-sm text-muted-foreground">مقدار الزكاة</p>
              <p className={`text-4xl font-bold ${zakatResult.nisabMet ? 'text-primary' : 'text-orange-600 dark:text-orange-400'}`}>
                {zakatResult.amount.toLocaleString("ar-SA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm text-muted-foreground mb-4">ريال</p>

              {!zakatResult.nisabMet && (
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                  المبلغ أقل من النصاب - لا تجب الزكاة
                </p>
              )}

              {zakatResult.nisabMet && (
                <div className="pt-4 flex justify-center border-t border-primary/20">
                  <Button
                    variant="outline"
                    className="gap-2 bg-transparent hover:bg-primary/10 border-primary/20 text-primary"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                    مشاركة النتيجة
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
