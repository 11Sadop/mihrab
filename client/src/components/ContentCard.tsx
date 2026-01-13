import { motion } from "framer-motion";
import { Copy, Bookmark, ChevronDown, ChevronUp, Repeat } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContentCardProps {
  arabic: string;
  translation: string;
  transliteration?: string | null;
  reference?: string | null;
  virtueHadith?: string | null;
  virtueSource?: string | null;
  count?: number;
  countLabel?: string | null;
  category?: string;
  index?: number;
}

export function ContentCard({ arabic, translation, transliteration, reference, virtueHadith, virtueSource, count, countLabel, index = 0 }: ContentCardProps) {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showVirtue, setShowVirtue] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${arabic}\n\n${translation}`);
    toast({
      title: "تم النسخ",
      description: "يمكنك الآن مشاركته مع الآخرين",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative group"
      data-testid={`card-content-${index}`}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full" />
        
        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            {(count || countLabel) && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Repeat className="w-3 h-3" />
                <span>{countLabel ? countLabel : count === 1 ? "مرة واحدة" : `${count} مرات`}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 mr-auto">
              <button 
                onClick={handleCopy} 
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                data-testid={`button-copy-${index}`}
              >
                <Copy className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)} 
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                data-testid={`button-bookmark-${index}`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative">
              <div className="absolute -right-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
              <p className="text-right font-arabic text-xl sm:text-2xl md:text-3xl leading-[2] text-foreground pr-4">
                {arabic}
              </p>
            </div>

            {transliteration && (
              <p className="text-sm text-muted-foreground/80 italic text-right pr-4">
                {transliteration}
              </p>
            )}

            <div className="bg-muted/30 rounded-xl p-4 text-right">
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                {translation}
              </p>
            </div>

            {reference && (
              <div className="flex justify-end">
                <span className="inline-flex items-center gap-1 text-xs text-primary/80 font-medium">
                  <span className="w-1 h-1 rounded-full bg-primary/60" />
                  {reference}
                </span>
              </div>
            )}

            {virtueHadith && (
              <div className="pt-3 border-t border-border/30">
                <button 
                  onClick={() => setShowVirtue(!showVirtue)}
                  className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors flex-row-reverse w-full justify-end"
                  data-testid={`button-virtue-${index}`}
                >
                  <span className="font-medium">فضل هذا الذكر</span>
                  {showVirtue ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {showVirtue && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/10"
                  >
                    <p className="text-sm font-arabic text-right leading-relaxed text-foreground/80">
                      {virtueHadith}
                    </p>
                    {virtueSource && (
                      <p className="text-xs text-primary font-medium mt-3 text-right">
                        — {virtueSource}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
