/**
 * iOS PWA Notification Helper
 */

export function isIOSPWA(): boolean {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = (window.navigator as any).standalone === true;
    return isIOS && isStandalone;
}

export function supportsNotifications(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
}

export function getIOSVersion(): number | null {
    const match = navigator.userAgent.match(/OS (\d+)_/);
    return match ? parseInt(match[1], 10) : null;
}

export function supportsIOSNotifications(): boolean {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const version = getIOSVersion();
    const isStandalone = (window.navigator as any).standalone === true;
    return isIOS && version !== null && version >= 16 && isStandalone;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!supportsNotifications()) {
          return 'denied';
    }
    try {
          return await Notification.requestPermission();
    } catch (error) {
          return 'denied';
    }
}
