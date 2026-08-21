// Register Maritime Vessel Service Worker for Offline Duty
export interface ServiceWorkerState {
  isRegistered: boolean;
  isOnline: boolean;
  isUpdateAvailable: boolean;
  isPreloading: boolean;
  lastSyncTime: string | null;
}

export function registerMaritimeServiceWorker(
  onStateChange?: (state: Partial<ServiceWorkerState>) => void
): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('[Maritime SW] Service Workers not supported in this environment.');
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[Maritime SW] Registered successfully with scope:', registration.scope);
      if (onStateChange) {
        onStateChange({
          isRegistered: true,
          lastSyncTime: new Date().toLocaleTimeString(),
        });
      }

      // Detect updates
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('[Maritime SW] New vessel software update available for caching.');
                if (onStateChange) onStateChange({ isUpdateAvailable: true });
              } else {
                console.log('[Maritime SW] Vessel assets cached for offline duty.');
              }
            }
          };
        }
      };
    } catch (error) {
      console.warn('[Maritime SW] Registration failed:', error);
    }
  });

  // Track Online / Offline Status
  window.addEventListener('online', () => {
    console.log('[Maritime SW] Vessel reconnected to Satellite / Shore Network.');
    if (onStateChange) onStateChange({ isOnline: true });
  });

  window.addEventListener('offline', () => {
    console.log('[Maritime SW] Vessel in Offline Mode (At Sea). Caching active.');
    if (onStateChange) onStateChange({ isOnline: false });
  });
}

// Function to trigger manual asset preloading for upcoming voyage
export function preloadMaritimeAssetsForVoyage(): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
      resolve({
        success: false,
        message: 'Service Worker active in fallback offline mode.',
      });
      return;
    }

    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data && event.data.status === 'success') {
        resolve({ success: true, message: 'All critical maritime assets and formulas cached for voyage.' });
      } else {
        resolve({ success: false, message: event.data?.error || 'Preload error' });
      }
    };

    navigator.serviceWorker.controller.postMessage(
      { type: 'PRELOAD_MARITIME_DATA' },
      [messageChannel.port2]
    );
  });
}
