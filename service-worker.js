const CACHE_NAME = 'Bike-blog-cache-v1';
const urlsToCache = [
    '/',
    '/Bike.html',
    '/style.css',
    '/apps.js',
    '/manifest.json',
    '/images/bike1.1.jpg',
    '/images/Bike2.jpg',
    '/images/bike3.jpg'
];

// Install Service Worker and Cache Files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate Service Worker and Clean Old Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME)
                    .map(cache => caches.delete(cache))
            );
        })
    );
});

// Fetch Event - Serve Cached Content
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return new Response('Offline mode: Resource not found');
            })
    );
});
