const CACHE_NAME = 'temp-chart-v2.1';

// All local and external resources to be cached for offline use
const assets = [
  // Core App Files
  './',
  './Sign%20in.html',
  './Temperature%20chart.html',
  './manifest.json',
  
  // Local Project Files (HTML)
  './Convert%20to%20fahrenheit.html',
  './Day%201.html',
  './Day%202.html',
  './Day%204.html',
  './Devoloper.html',
  './Getting%20started.html',
  './Temperatures%20recorded%20in%20all%20five%20days.html',
  './about.html',
  './account.html',
  './new-chart.html',
  
  // Local Assets (JS, CSS, Images)
  './site.css',
  './site.js',
  './script.js',
  './highcharts.js',
  './heart.png',
  './as.jpg',
  './Temperature%20Chart.png',

  // External CSS & Icons
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',

  // External Libraries (Highcharts & Firebase)
  'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.3.0/highcharts.js',
  'https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.11.0/firebase-database-compat.js'
];

// 1. Install Event - Caching everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('App: Caching all assets');
      return cache.addAll(assets);
    })
  );
});

// 2. Activate Event - Cleaning up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event - Serving assets from cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests for videos (large mp4 files)
  if (event.request.url.includes('.mp4')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Fallback for when both cache and network fail
        if (event.request.mode === 'navigate') {
          return caches.match('./Sign%20in.html');
        }
      });
    })
  );
});