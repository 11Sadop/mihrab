import { Link, useLocation } from "wouter";
import { Home, Clock, BookOpen, Fingerprint, Settings, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "الرئيسية" },
    { href: "/prayer-times", icon: Clock, label: "الصلوات" },
    { href: "/tafseer", icon: BookOpen, label: "القرآن" },
    { href: "/tasbeeh", icon: Fingerprint, label: "التسبيح" },
    { href: "/assistant", icon: Bot, label: "المساعد" },
    { href: "/settings", icon: Settings, label: "الإعدادات" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border z-50" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))' }}>
      <div className="flex flex-row-reverse justify-around items-center h-16 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-4">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href} className="flex-1">
              <div
                className={cn(
                  "flex flex-col items-center justify-center h-full w-full space-y-1 transition-colors duration-200 cursor-pointer",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-xl transition-all",
                  isActive && "bg-primary/10"
                )}>
                  <Icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
