import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UpdateBannerProps {
  show: boolean;
  onUpdate: () => void;
}

export function UpdateBanner({ show, onUpdate }: UpdateBannerProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-primary text-primary-foreground p-3 shadow-lg"
        >
          <div className="container max-w-md mx-auto flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-right flex-1">
              يتوفر تحديث جديد للتطبيق
            </p>
            <Button
              size="sm"
              variant="secondary"
              onClick={onUpdate}
              className="gap-2 shrink-0"
              data-testid="button-apply-update"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
