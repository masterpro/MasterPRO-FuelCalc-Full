const CACHE_NAME = 'fuelcalc-cache-v1';
const TO_CACHE = [
  '/calc.html',
  '/manifest.json',
  // перечисли CSS/JS/иконки, которые нужны офлайн
  'https://i.postimg.cc/vTjRFj9f/icon-192.png',
  'https://i.postimg.cc/2yJpRJvQ/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request))
  );

});
