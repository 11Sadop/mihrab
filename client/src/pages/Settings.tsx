import { Header } from "@/components/Header";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Globe, Users, Bell, Volume2, VolumeX, Sun, Moon, Clock, AlarmClock, Heart, Landmark, Mail, Copy, Check, Save, Download, Share2, Plus, MoreVertical, Smartphone, ChevronDown, ChevronUp, Navigation, Loader2, Search, ChevronsUpDown } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";
import { requestNotificationPermission } from "@/lib/firebase-push";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { cities, citiesByCountry, countryOrder } from "@/data/cities";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const { toast } = useToast();
  const [location, setLocation] = useLocalStorage<{ city?: string, country?: string, latitude?: number, longitude?: number, isManual?: boolean } | null>("user_location", null);
  const [method, setMethod] = useLocalStorage("calculation_method", "4");
  const [isAdmin, setIsAdmin] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [notificationsExpanded, setNotificationsExpanded] = useLocalStorage("notifications_section_expanded", true);
  const [locationType, setLocationType] = useLocalStorage<"auto" | "manual">("location_type", "auto");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [citySearchOpen, setCitySearchOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();

  const filteredCitiesByCountry = useMemo(() => {
    if (!citySearchQuery.trim()) {
      return citiesByCountry;
    }
    const query = citySearchQuery.toLowerCase();
    const result: Record<string, typeof cities> = {};
    for (const country of countryOrder) {
      const countryCities = citiesByCountry[country];
      if (!countryCities) continue;
      const matchingCities = countryCities.filter(city =>
        city.name.toLowerCase().includes(query) ||
        city.country.toLowerCase().includes(query)
      );
      if (matchingCities.length > 0 || country.toLowerCase().includes(query)) {
        result[country] = country.toLowerCase().includes(query) ? countryCities : matchingCities;
      }
    }
    return result;
  }, [citySearchQuery]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adminKey = urlParams.get('admin');
    if (adminKey === 'mihrab2024') {
      setIsAdmin(true);
    }
    const storedAdmin = localStorage.getItem('is_admin');
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('is_admin', 'true');
    }
  }, [isAdmin]);

  const {
    permission,
    settings,
    hasUnsavedChanges,
    requestPermission,
    updateSettings,
    saveSettings,
    discardChanges,
    isSupported,
    sendNotification
  } = useNotifications();

  const { data: visitorData } = useQuery<{ count: number }>({
    queryKey: ["/api/stats/visitors"],
    queryFn: async () => {
      const res = await fetch("/api/stats/visitors?key=mihrab2024");
      if (!res.ok) return { count: 0 };
      return res.json();
    },
    enabled: isAdmin,
  });

  const handleEnableNotifications = async () => {
    if (permission === 'granted') {
      const newEnabled = !settings.enabled;
      updateSettings({ enabled: newEnabled });

      // ===== FIX: Register FCM token when enabling notifications =====
      if (newEnabled) {
        try {
          const token = await requestNotificationPermission();
          if (token) {
            console.log('✅ FCM Token registered successfully');
          } else {
            console.warn('⚠️ Could not get FCM token');
          }
        } catch (error) {
          console.error('❌ Failed to register FCM token:', error);
        }
      }

      toast({
        title: newEnabled ? "تم تفعيل الإشعارات" : "تم إيقاف الإشعارات",
      });
    } else {
      const granted = await requestPermission();
      if (granted) {
        toast({
          title: "تم تفعيل الإشعارات",
          description: "ستصلك تذكيرات الصلاة والأذكار",
        });
      } else {
        toast({
          title: "لم يتم منح الإذن",
          description: "يرجى السماح بالإشعارات من إعدادات المتصفح",
          variant: "destructive",
        });
      }
    }
  };

  const testNotification = () => {
    sendNotification("اختبار الإشعارات", "هذا إشعار تجريبي من تطبيق محراب");
  };

  const handleSaveSettings = () => {
    saveSettings();
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الإشعارات بنجاح",
    });
  };

  const methods = [
    { id: "2", name: "ISNA (North America)" },
    { id: "3", name: "Muslim World League" },
    { id: "4", name: "Umm Al-Qura (Makkah)" },
    { id: "5", name: "Egyptian General Authority" },
  ];

  const handleResetLocation = () => {
    setLocation(null);
    setLocationType("auto");
    window.location.reload();
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "غير مدعوم",
        description: "المتصفح لا يدعم تحديد الموقع التلقائي",
        variant: "destructive",
      });
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isManual: false,
        });
        setLocationType("auto");
        setIsDetectingLocation(false);
        toast({
          title: "تم تحديد الموقع",
          description: "تم تحديد موقعك تلقائياً",
        });
      },
      (error) => {
        setIsDetectingLocation(false);
        toast({
          title: "فشل تحديد الموقع",
          description: "يرجى السماح بتحديد الموقع أو اختيار مدينة يدوياً",
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSelectCity = (cityId: string) => {
    const city = cities.find(c => c.id === cityId);
    if (city) {
      setLocation({
        city: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
        isManual: true,
      });
      setLocationType("manual");
      toast({
        title: "تم اختيار المدينة",
        description: city.name === city.country ? city.name : `${city.name}، ${city.country}`,
      });
    }
  };

  const getSelectedCityId = () => {
    if (!location?.isManual) return undefined;
    const city = cities.find(c =>
      c.latitude === location.latitude &&
      c.longitude === location.longitude
    );
    return city?.id;
  };

  const handleInstallClick = async () => {
    const success = await promptInstall();
    if (success) {
      toast({
        title: "تم التثبيت بنجاح",
        description: "يمكنك الآن الوصول للتطبيق من شاشتك الرئيسية",
      });
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المعلومات بنجاح",
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen pb-32 bg-background">
      <Header title="الإعدادات" />

      <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-8">

        <section>
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">الموقع والوقت</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-right flex-1">
                  <p className="font-medium text-sm">تحديد الموقع</p>
                  <p className="text-xs text-muted-foreground">
                    {location?.isManual && location.city
                      ? (location.city === location.country ? location.city : `${location.city}، ${location.country}`)
                      : location
                        ? `إحداثيات: ${location.latitude?.toFixed(4)}, ${location.longitude?.toFixed(4)}`
                        : "لم يتم تحديد الموقع بعد"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mb-3">
                <Button
                  variant={locationType === "auto" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  data-testid="button-auto-location"
                >
                  {isDetectingLocation ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Navigation className="w-4 h-4" />
                  )}
                  تلقائي (GPS)
                </Button>
                <Button
                  variant={locationType === "manual" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => setLocationType("manual")}
                  data-testid="button-manual-location"
                >
                  <MapPin className="w-4 h-4" />
                  اختيار مدينة
                </Button>
              </div>

              {locationType === "manual" && (
                <Popover open={citySearchOpen} onOpenChange={setCitySearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={citySearchOpen}
                      className="w-full justify-between text-right"
                      data-testid="select-city"
                    >
                      {location?.city
                        ? (location.city === location.country ? location.city : `${location.city}، ${location.country}`)
                        : "اختر المدينة..."}
                      <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-card dark:bg-card border border-border shadow-xl" align="start">
                    <div className="p-2 border-b border-border">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="ابحث عن الدولة أو المدينة..."
                          value={citySearchQuery}
                          onChange={(e) => setCitySearchQuery(e.target.value)}
                          className="pr-10 text-right"
                          data-testid="input-city-search"
                        />
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {Object.keys(filteredCitiesByCountry).length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                          لا توجد نتائج
                        </div>
                      ) : (
                        countryOrder.map(country => {
                          const countryCities = filteredCitiesByCountry[country];
                          if (!countryCities || countryCities.length === 0) return null;
                          return (
                            <div key={country}>
                              <div className="px-3 py-2 text-xs font-bold text-muted-foreground bg-muted/50 text-right sticky top-0">
                                {country}
                              </div>
                              {countryCities.map(city => (
                                <button
                                  key={city.id}
                                  onClick={() => {
                                    handleSelectCity(city.id);
                                    setCitySearchOpen(false);
                                    setCitySearchQuery("");
                                  }}
                                  className="w-full px-4 py-2 text-right text-sm hover:bg-muted transition-colors flex items-center justify-between"
                                  data-testid={`city-option-${city.id}`}
                                >
                                  <Check className={`w-4 h-4 ${getSelectedCityId() === city.id ? 'opacity-100' : 'opacity-0'}`} />
                                  <span>{city.name}</span>
                                </button>
                              ))}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-3 mb-2 flex-row-reverse">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">طريقة الحساب</p>
                </div>
              </div>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full mt-2 p-2 rounded-lg bg-secondary/30 text-sm border-none focus:ring-1 focus:ring-primary text-right"
                data-testid="select-calculation-method"
              >
                {methods.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {isSupported && (
          <section>
            <div className="flex items-center justify-between mb-3 px-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotificationsExpanded(!notificationsExpanded)}
                className="gap-1 text-muted-foreground"
                data-testid="button-toggle-notifications"
              >
                {notificationsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {notificationsExpanded ? "طي" : "توسيع"}
              </Button>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider text-right">الإشعارات</h3>
            </div>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/20 text-amber-600 rounded-lg">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">تفعيل الإشعارات</p>
                    <p className="text-xs text-muted-foreground">تذكيرات الصلاة والأذكار</p>
                  </div>
                </div>
                <Switch
                  checked={settings.enabled && permission === 'granted'}
                  onCheckedChange={handleEnableNotifications}
                  className="data-[state=checked]:bg-primary"
                  data-testid="switch-notifications"
                />
              </div>

              {settings.enabled && permission === 'granted' && notificationsExpanded && (
                <>
                  <div className="p-3 bg-muted/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground text-right">تنبيهات الصلاة</p>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">إشعار قبل الأذان</p>
                        <p className="text-xs text-muted-foreground">تنبيه قبل حلول وقت الصلاة</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={settings.reminderMinutes.toString()}
                        onValueChange={(value) => updateSettings({ reminderMinutes: parseInt(value) })}
                        disabled={!settings.prayerReminder}
                      >
                        <SelectTrigger className="w-24" data-testid="select-reminder-time">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 دقائق</SelectItem>
                          <SelectItem value="10">10 دقائق</SelectItem>
                          <SelectItem value="15">15 دقيقة</SelectItem>
                          <SelectItem value="30">30 دقيقة</SelectItem>
                        </SelectContent>
                      </Select>
                      <Switch
                        checked={settings.prayerReminder}
                        onCheckedChange={(checked) => updateSettings({ prayerReminder: checked })}
                        className="data-[state=checked]:bg-primary"
                        data-testid="switch-prayer-reminder"
                      />
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900/20 text-teal-600 rounded-lg">
                        <AlarmClock className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">تنبيه الإقامة</p>
                        <p className="text-xs text-muted-foreground">إشعار عند حلول وقت الإقامة</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.iqamaReminder || false}
                      onCheckedChange={(checked) => updateSettings({ iqamaReminder: checked })}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-iqama-reminder"
                    />
                  </div>

                  <div className="p-3 bg-muted/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground text-right">تنبيهات الأذكار</p>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-lg">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">أذكار الصباح</p>
                        <p className="text-xs text-muted-foreground">تُرسل تلقائياً بعد صلاة الفجر</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.morningAdhkar}
                      onCheckedChange={(checked) => updateSettings({ morningAdhkar: checked })}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-morning-adhkar"
                    />
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
                        <Moon className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">أذكار المساء</p>
                        <p className="text-xs text-muted-foreground">تُرسل تلقائياً بعد صلاة المغرب</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.eveningAdhkar}
                      onCheckedChange={(checked) => updateSettings({ eveningAdhkar: checked })}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-evening-adhkar"
                    />
                  </div>

                  <div className="p-3 bg-muted/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground text-right">إعدادات عامة</p>
                  </div>

                  <div className="p-4 flex items-center justify-between border-b border-border/50 flex-row-reverse">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                        {settings.sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">صوت الإشعارات</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.sound}
                      onCheckedChange={(checked) => updateSettings({ sound: checked })}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-sound"
                    />
                  </div>

                  <div className="p-4 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={testNotification}
                      data-testid="button-test-notification"
                    >
                      اختبار الإشعارات
                    </Button>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <AnimatePresence>
          {hasUnsavedChanges && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50"
            >
              <div className="bg-card border border-border rounded-2xl shadow-lg p-4">
                <p className="text-sm text-center mb-3 text-muted-foreground">لديك تغييرات غير محفوظة</p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={discardChanges}
                    data-testid="button-discard-changes"
                  >
                    تجاهل
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={handleSaveSettings}
                    data-testid="button-save-settings"
                  >
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isAdmin && (
          <section>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">إحصائيات</h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/20 text-teal-600 rounded-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">عدد الزوار</p>
                    <p className="text-xs text-muted-foreground">إجمالي زيارات الموقع</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary" data-testid="text-visitor-count">
                  {visitorData?.count?.toLocaleString('ar-SA') || '0'}
                </span>
              </div>
            </div>
          </section>
        )}

        {!isInstalled && (
          <section>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">تثبيت التطبيق</h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 bg-gradient-to-l from-primary/10 to-primary/5 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="p-2 bg-primary/20 text-primary rounded-full">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="text-right flex-1">
                    <p className="font-bold text-sm">حوّل الموقع إلى تطبيق</p>
                    <p className="text-xs text-muted-foreground mt-1">أضف محراب إلى شاشتك الرئيسية للوصول السريع</p>
                  </div>
                </div>
              </div>

              {canInstall && (
                <div className="p-4 border-b border-border/50">
                  <Button
                    onClick={handleInstallClick}
                    className="w-full gap-2"
                    data-testid="button-install-app"
                  >
                    <Download className="w-5 h-5" />
                    تثبيت التطبيق الآن
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    اضغط هنا لإضافة التطبيق مباشرة إلى جهازك
                  </p>
                </div>
              )}

              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse mb-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">للآيفون (iOS)</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 space-y-3 text-right">
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">١</div>
                    <div className="flex-1">
                      <p className="text-sm">افتح الموقع في متصفح <span className="font-bold">Safari</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٢</div>
                    <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                      <p className="text-sm">اضغط على زر</p>
                      <div className="inline-flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-md">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <p className="text-sm">(المشاركة)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٣</div>
                    <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                      <p className="text-sm">اختر</p>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                        <Plus className="w-3 h-3" />
                        <span>إضافة للشاشة الرئيسية</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٤</div>
                    <div className="flex-1">
                      <p className="text-sm">اضغط <span className="font-bold text-primary">إضافة</span> في الأعلى</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3 flex-row-reverse mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 2H6.477C5.1 2 4 3.1 4 4.477v15.046C4 20.9 5.1 22 6.477 22h11.046C18.9 22 20 20.9 20 19.523V4.477C20 3.1 18.9 2 17.523 2zM12 20.5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm5-3.5H7V5h10v12z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">للأندرويد (Android)</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 space-y-3 text-right">
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">١</div>
                    <div className="flex-1">
                      <p className="text-sm">افتح الموقع في متصفح <span className="font-bold">Chrome</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٢</div>
                    <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                      <p className="text-sm">اضغط على</p>
                      <div className="inline-flex items-center justify-center w-7 h-7 bg-muted rounded-md">
                        <MoreVertical className="w-4 h-4" />
                      </div>
                      <p className="text-sm">(القائمة)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٣</div>
                    <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                      <p className="text-sm">اختر</p>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                        <Download className="w-3 h-3" />
                        <span>تثبيت التطبيق</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">٤</div>
                    <div className="flex-1">
                      <p className="text-sm">اضغط <span className="font-bold text-primary">تثبيت</span> للتأكيد</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {isInstalled && (
          <section>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2 text-right">ادعمنا</h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 bg-gradient-to-l from-primary/10 to-primary/5 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="p-2 bg-primary/20 text-primary rounded-full">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="text-right flex-1">
                    <p className="font-bold text-sm">ساهم في دعم التطبيق</p>
                    <p className="text-xs text-muted-foreground mt-1">جزاكم الله خيراً على دعمكم ومساهمتكم في استمرار هذا العمل</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse mb-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">تحويل بنكي - الراجحي</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">الاسم</p>
                      <p className="font-medium text-sm">عبدالله المواش</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-row-reverse gap-2">
                    <div className="text-right flex-1">
                      <p className="text-xs text-muted-foreground">رقم الآيبان</p>
                      <p className="font-mono text-sm font-medium break-all" dir="ltr">SA82 8000 0142 6080 1614 8941</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard("SA8280000142608016148941", "iban")}
                      data-testid="button-copy-iban"
                    >
                      {copiedField === "iban" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3 flex-row-reverse mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">باي بال (PayPal)</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center justify-between flex-row-reverse gap-2">
                    <div className="text-right flex-1">
                      <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                      <p className="font-mono text-sm font-medium" dir="ltr">aboodgamer0192@gmail.com</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard("aboodgamer0192@gmail.com", "paypal")}
                      data-testid="button-copy-paypal"
                    >
                      {copiedField === "paypal" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <a
                  href="/support"
                  className="flex items-center gap-3 flex-row-reverse p-4 bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors"
                  data-testid="link-support-card"
                >
                  <div className="p-2 bg-primary/20 text-primary rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <div className="text-right flex-1">
                    <p className="font-bold text-sm">دعم التطبيق</p>
                    <p className="text-xs text-muted-foreground">ساهم في تطوير التطبيق</p>
                  </div>
                </a>
              </div>
            </div>
          </section>
        )}

        <div className="text-center text-xs text-muted-foreground pt-8">
          <p>الإصدار 1.0.0</p>
        </div>


      </main>
    </div>
  );
}
