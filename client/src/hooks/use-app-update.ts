import { useEffect, useState } from 'react';

export function useAppUpdate() {
    // ===== FIX: Always return false to disable update prompts completely =====
    // Updates happen automatically via the service worker's skipWaiting()
    // Users don't need to be notified - they get the new version on next visit
    const [updateAvailable] = useState(false);

    const applyUpdate = () => {
        // Just reload the page silently
        window.location.reload();
    };

    return { updateAvailable, applyUpdate };
}
