import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export function Header({ title, subtitle, showBack }: { title: string; subtitle?: string; showBack?: boolean }) {
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/50 pt-[env(safe-area-inset-top)]">
      <div className="grid grid-cols-3 items-center gap-3 px-4 sm:px-6 py-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <div className="flex items-center justify-start">
          {showBack && (
            <button
              onClick={() => setLocation("/")}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              data-testid="button-back"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold font-display text-primary tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center justify-end">
          {/* Theme toggle moved to Settings page */}
        </div>
      </div>
    </header>
  );
}

