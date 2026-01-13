import { X, Share2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface IOSInstallPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IOSInstallPrompt({ isOpen, onClose }: IOSInstallPromptProps) {
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
            <div className="bg-card rounded-2xl border border-border shadow-xl max-w-md mx-auto overflow-hidden">
              <div className="p-4 bg-gradient-to-l from-primary/10 to-primary/5 border-b border-border/50">
                <div className="flex items-center justify-between flex-row-reverse">
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <img src="/icon-192.png" alt="محراب" className="w-8 h-8 rounded-lg" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-lg">أضف محراب لجهازك</h3>
                      <p className="text-xs text-muted-foreground">للوصول السريع في أي وقت</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onClose}
                    className="shrink-0"
                    data-testid="button-close-ios-prompt"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="p-5 space-y-4 text-right">
                <div className="flex items-center gap-4 flex-row-reverse">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
                    ١
                  </div>
                  <div className="flex-1 flex items-center gap-2 flex-row-reverse flex-wrap">
                    <span className="text-sm">اضغط على زر</span>
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-lg">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">في الأسفل</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-row-reverse">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
                    ٢
                  </div>
                  <div className="flex-1 flex items-center gap-2 flex-row-reverse flex-wrap">
                    <span className="text-sm">اختر</span>
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted rounded-lg text-sm">
                      <Plus className="w-4 h-4" />
                      <span>إضافة للشاشة الرئيسية</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-row-reverse">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
                    ٣
                  </div>
                  <div className="flex-1">
                    <span className="text-sm">اضغط <span className="font-bold text-primary">إضافة</span> في الأعلى</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border/50 bg-muted/30">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onClose}
                  data-testid="button-dismiss-ios-prompt"
                >
                  فهمت، لا تظهر مرة أخرى
                </Button>
              </div>
            </div>

            <div className="flex justify-center mt-3">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-card"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
