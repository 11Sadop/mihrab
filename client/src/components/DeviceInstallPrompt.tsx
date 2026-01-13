import { X, Download, Share2, Plus, MoreVertical, Settings, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

type DeviceType = 'ios' | 'android' | 'desktop' | 'unknown';

interface DeviceInstallPromptProps {
  isOpen: boolean;
  deviceType: DeviceType;
  canInstall: boolean;
  onInstall: () => Promise<boolean>;
  onClose: () => void;
}

export function DeviceInstallPrompt({ 
  isOpen, 
  deviceType, 
  canInstall, 
  onInstall, 
  onClose 
}: DeviceInstallPromptProps) {
  const [, setLocation] = useLocation();

  const handleInstallClick = async () => {
    const success = await onInstall();
    if (success) {
      onClose();
    }
  };

  const goToSettings = () => {
    onClose();
    setLocation('/settings');
  };

  const getDeviceContent = () => {
    switch (deviceType) {
      case 'ios':
        return {
          title: 'أضف محراب لجهازك',
          subtitle: 'للوصول السريع من الشاشة الرئيسية',
          steps: [
            { icon: <Share2 className="w-4 h-4" />, text: 'اضغط على زر المشاركة في الأسفل', highlight: true },
            { icon: <Plus className="w-4 h-4" />, text: 'اختر "إضافة للشاشة الرئيسية"', highlight: false },
            { icon: null, text: 'اضغط "إضافة" للتأكيد', highlight: false },
          ],
        };
      case 'android':
        return {
          title: 'ثبّت تطبيق محراب',
          subtitle: 'أضفه لشاشتك الرئيسية للوصول السريع',
          steps: [],
          showSettingsButton: true,
        };
      case 'desktop':
        return {
          title: 'ثبّت تطبيق محراب',
          subtitle: 'أضفه لسطح المكتب للوصول السريع',
          steps: canInstall ? [] : [
            { icon: <Download className="w-4 h-4" />, text: 'اضغط على أيقونة التثبيت في شريط العنوان', highlight: true },
            { icon: null, text: 'أو اضغط على القائمة ← تثبيت التطبيق', highlight: false },
          ],
        };
      default:
        return {
          title: 'ثبّت تطبيق محراب',
          subtitle: 'للوصول السريع في أي وقت',
          steps: [],
        };
    }
  };

  const content = getDeviceContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8"
          >
            <div className="bg-background rounded-2xl border border-border shadow-xl max-w-md mx-auto overflow-hidden">
              <div className="p-4 bg-primary/10 border-b border-border/50">
                <div className="flex items-center justify-between flex-row-reverse gap-3">
                  <div className="flex items-center gap-3 flex-row-reverse flex-1">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                      <Smartphone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-base">{content.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{content.subtitle}</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onClose}
                    className="shrink-0"
                    data-testid="button-close-install-prompt"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {deviceType === 'android' ? (
                <div className="p-5">
                  <Button 
                    onClick={goToSettings}
                    className="w-full gap-2 text-base py-6"
                    data-testid="button-android-settings"
                  >
                    <Settings className="w-5 h-5" />
                    عرض خطوات التثبيت
                  </Button>
                </div>
              ) : canInstall && deviceType === 'desktop' ? (
                <div className="p-5">
                  <Button 
                    onClick={handleInstallClick}
                    className="w-full gap-2 text-base py-6"
                    data-testid="button-install-now"
                  >
                    <Download className="w-5 h-5" />
                    تثبيت التطبيق الآن
                  </Button>
                </div>
              ) : content.steps.length > 0 ? (
                <div className="p-4 space-y-3">
                  {content.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 flex-row-reverse">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                        <span className="text-sm">{step.text}</span>
                        {step.icon && (
                          <div className="inline-flex items-center justify-center w-7 h-7 bg-muted rounded-md">
                            {step.icon}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="p-4 border-t border-border bg-secondary">
                {deviceType !== 'android' && (
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 mb-2"
                    onClick={goToSettings}
                    data-testid="button-go-to-settings"
                  >
                    <Settings className="w-4 h-4" />
                    عرض الخطوات الكاملة في الإعدادات
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground"
                  onClick={onClose}
                  data-testid="button-dismiss-prompt"
                >
                  لاحقاً
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
