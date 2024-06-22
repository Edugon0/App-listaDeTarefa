self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('sensor-test-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/manifest.json',
                '/app.js'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});