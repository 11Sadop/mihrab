import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function Support() {
  return (
    <div className="min-h-screen pb-32 bg-background">
      <Header title="دعم التطبيق" />
      
      <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        <Card className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">ادعم تطوير محراب</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            شكراً لاستخدامك تطبيق محراب. نعمل على تطوير التطبيق باستمرار لتقديم أفضل تجربة إسلامية.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-center">كيف تدعمنا؟</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>شارك التطبيق مع أصدقائك وعائلتك</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>قيّم التطبيق في متجر التطبيقات</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>أرسل لنا اقتراحاتك لتحسين التطبيق</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>ادعُ لنا بالتوفيق والسداد</span>
            </li>
          </ul>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          جزاكم الله خيراً على دعمكم
        </p>
      </main>
    </div>
  );
}
