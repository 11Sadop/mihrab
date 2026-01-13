import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type DeviceType = 'ios' | 'android' | 'desktop' | 'unknown';

let deferredPromptGlobal: BeforeInstallPromptEvent | null = null;

function detectDeviceType(): DeviceType {
  const ua = navigator.userAgent.toLowerCase();
  
  if (/ipad|iphone|ipod/.test(ua) && !(window as any).MSStream) {
    return 'ios';
  }
  
  if (/android/.test(ua)) {
    return 'android';
  }
  
  if (/windows|macintosh|linux/.test(ua) && !/mobile/.test(ua)) {
    return 'desktop';
  }
  
  return 'unknown';
}

export function usePWAInstall() {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('unknown');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const device = detectDeviceType();
    setDeviceType(device);
    
    const checkIfInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                             (window.navigator as any).standalone === true;
    setIsInstalled(checkIfInstalled);

    if (!checkIfInstalled) {
      const dismissedKey = `pwa_prompt_dismissed_${device}`;
      const hasBeenDismissed = localStorage.getItem(dismissedKey);
      
      if (!hasBeenDismissed) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 2000);
      }
    }

    if (deferredPromptGlobal) {
      setCanInstall(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPromptGlobal = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setCanInstall(false);
      setIsInstalled(true);
      setShowInstallPrompt(false);
      deferredPromptGlobal = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPromptGlobal) return false;

    deferredPromptGlobal.prompt();
    const { outcome } = await deferredPromptGlobal.userChoice;

    if (outcome === 'accepted') {
      setCanInstall(false);
      setShowInstallPrompt(false);
      deferredPromptGlobal = null;
      return true;
    }
    return false;
  }, []);

  const dismissPrompt = useCallback(() => {
    setShowInstallPrompt(false);
    const dismissedKey = `pwa_prompt_dismissed_${deviceType}`;
    localStorage.setItem(dismissedKey, 'true');
  }, [deviceType]);

  return {
    canInstall,
    isInstalled,
    deviceType,
    showInstallPrompt,
    promptInstall,
    dismissPrompt,
  };
}
