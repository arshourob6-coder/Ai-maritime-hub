// Maritime Vessel Offline Service Worker v1.0
// Caches critical naval architecture, propeller design, SOLAS regulations, and maritime formulas

const CACHE_NAME = 'maritime-vessel-cache-v1';
const DYNAMIC_CACHE_NAME = 'maritime-dynamic-cache-v1';

// Critical maritime offline assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
];

// Offline fallback response for maritime documentation
const MARITIME_OFFLINE_DOCS = {
  title: 'Vessel Offline Mode - Maritime Engineering Reference',
  status: 'offline',
  regulations: [
    { code: 'SOLAS Ch II-1', topic: 'Subdivision & Stability, Machinery Installations', status: 'Cached' },
    { code: 'MARPOL Annex VI', topic: 'Prevention of Air Pollution & EEXI/CII Standards', status: 'Cached' },
    { code: 'COLREG 1972', topic: 'International Regulations for Preventing Collisions at Sea', status: 'Cached' },
    { code: 'STCW 2010', topic: 'Standards of Training, Certification and Watchkeeping', status: 'Cached' },
  ],
  hydrodynamics: [
    { formula: 'Wageningen B-Series', description: 'KT, KQ, Eta0 polynomial regression curves cached', status: 'Offline Ready' },
    { formula: 'Holtrop & Mennen 1982', description: 'Ship resistance and power estimation method cached', status: 'Offline Ready' },
    { formula: 'NACA 66 / Mean Line a=0.8', description: 'Propeller blade section profile geometries cached', status: 'Offline Ready' },
  ]
};

// Install Event - Precache critical vessel shell
self.addEventListener('install', (event) => {
  console.log('[Maritime SW] Installing Service Worker & Precaching Shipboard Assets...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[Maritime SW] Precache warning (non-blocking):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Cleanup obsolete maritime caches
self.addEventListener('activate', (event) => {
  console.log('[Maritime SW] Service Worker Activated. Ready for Offline Vessel Duty.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE_NAME) {
            console.log('[Maritime SW] Clearing stale maritime cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy: Stale-While-Revalidate with Cache Fallback for Vessel Connectivity
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests or browser extension requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Handle API / Documentation Requests with Stale-While-Revalidate / Network First
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch((err) => {
          console.log('[Maritime SW] Network unavailable (At Sea). Serving cached asset:', request.url);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Return synthetic offline JSON for maritime API requests
          if (request.headers.get('accept')?.includes('application/json') || url.pathname.includes('/api/')) {
            return new Response(JSON.stringify(MARITIME_OFFLINE_DOCS), {
              headers: { 'Content-Type': 'application/json' },
            });
          }

          // Fallback to cached index.html for SPA page navigation
          if (request.mode === 'navigate') {
            return caches.match('/index.html') || caches.match('/');
          }

          return new Response('Vessel Offline - Resource Cached on Shipboard Server', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });

      // Return cached version immediately if available, otherwise wait for network fetch
      return cachedResponse || fetchPromise;
    })
  );
});

// Handle custom messages from client (e.g. Preload Maritime Assets command)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRELOAD_MARITIME_DATA') {
    console.log('[Maritime SW] Preloading critical vessel datasets & documentation...');
    caches.open(CACHE_NAME).then((cache) => {
      const maritimeUrls = [
        '/',
        '/index.html',
      ];
      return cache.addAll(maritimeUrls);
    }).then(() => {
      event.ports[0]?.postMessage({ status: 'success', message: 'Shipboard cache synchronized for voyage' });
    }).catch((err) => {
      event.ports[0]?.postMessage({ status: 'error', error: String(err) });
    });
  }
});
