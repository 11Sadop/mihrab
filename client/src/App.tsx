import { initializeFirebaseMessaging } from './lib/firebase-push';
import { Switch, Route } from "wouter";
import HadithPage from "@/pages/HadithPage";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { useAppUpdate } from "@/hooks/use-app-update";
import { DeviceInstallPrompt } from "@/components/DeviceInstallPrompt";
import { UpdateBanner } from "@/components/UpdateBanner";
import { Component, ErrorInfo, ReactNode, useEffect } from "react";

// Error Boundary to catch React errors
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0c4a3e',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          direction: 'rtl'
        }}>
          <h2 style={{ marginBottom: '10px' }}>حدث خطأ غير متوقع</h2>
          <p style={{ opacity: 0.8, marginBottom: '10px' }}>يرجى تحديث الصفحة أو مسح ذاكرة التخزين المؤقت</p>
          <p style={{ opacity: 0.5, fontSize: '12px', marginBottom: '20px', maxWidth: '300px' }}>
            {this.state.error?.message || 'خطأ غير معروف'}
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }}
            style={{
              padding: '12px 30px',
              background: 'white',
              color: '#0c4a3e',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            مسح الذاكرة وإعادة التحميل
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              color: 'white',
              border: '1px solid white',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            تحديث الصفحة فقط
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Pages
import Home from "@/pages/Home";
import PrayerTimes from "@/pages/PrayerTimes";
import AdhkarPage from "@/pages/Adhkar";
import DuasPage from "@/pages/Duas";
import TasbeehPage from "@/pages/Tasbeeh";
import SettingsPage from "@/pages/Settings";
import WardPage from "@/pages/Ward";
import ProtectionPage from "@/pages/Protection";
import ZakatPage from "@/pages/Zakat";
import QiblaPage from "@/pages/Qibla";
import HadithCollectionsPage from "@/pages/HadithCollections";
import HadithVerifyPage from "@/pages/HadithVerify";
import TafseerPage from "@/pages/Tafseer";
import SupportPage from "@/pages/Support";
import StatsPage from "@/pages/Stats";
import NotFound from "@/pages/not-found";
import AssistantPage from "@/pages/AssistantPage";

function Router() {
  useVisitorTracking();
  const { showInstallPrompt, deviceType, canInstall, promptInstall, dismissPrompt } = usePWAInstall();
  const { updateAvailable, applyUpdate } = useAppUpdate();

  return (
    <div className="relative min-h-screen font-sans antialiased text-foreground bg-background">
      <UpdateBanner show={updateAvailable} onUpdate={applyUpdate} />
      <Switch>

        <Route path="/" component={Home} />
        <Route path="/prayer-times" component={PrayerTimes} />
        <Route path="/adhkar" component={AdhkarPage} />
        <Route path="/duas" component={DuasPage} />
        <Route path="/hadith" component={HadithPage} />
        <Route path="/tasbeeh" component={TasbeehPage} />
        <Route path="/ward" component={WardPage} />
        <Route path="/protection" component={ProtectionPage} />
        <Route path="/zakat" component={ZakatPage} />
        <Route path="/qibla" component={QiblaPage} />
        <Route path="/hadith-collections" component={HadithCollectionsPage} />
        <Route path="/hadith-verify" component={HadithVerifyPage} />
        <Route path="/tafseer" component={TafseerPage} />
        <Route path="/support" component={SupportPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/assistant" component={AssistantPage} />
        <Route path="/admin/stats" component={StatsPage} />
        <Route component={NotFound} />
      </Switch>
      <Navigation />
      <DeviceInstallPrompt
        isOpen={showInstallPrompt}
        deviceType={deviceType}
        canInstall={canInstall}
        onInstall={promptInstall}
        onClose={dismissPrompt}
      />
    </div>
  );
}

function App() {
  useEffect(() => { initializeFirebaseMessaging(); }, []);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
